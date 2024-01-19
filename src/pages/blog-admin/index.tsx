import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getUserBlogAdmin } from '@/api/blog-admin'
import { Users } from '@/utils/interfaces/Users'
import { getUsers } from '@/api/blog-detail'
import Button from '@/components/Button'
import { RiFileSearchLine } from 'react-icons/ri'
import Loading from '@/components/Loading'

export default function BlogAdmin() {
  const [users, setUsers] = useState<Users[]>([])
  const [selectedUserDetails, setSelectedUserDetails] = useState<Users | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [])

  const handleCheckDetail = async (userId: number) => {
    try {
      const userDetails = await getUserBlogAdmin(userId)
      setSelectedUserDetails(userDetails)
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  return (
    <Layout>
      <Seo templateTitle="Blog Admin" />
      {loading && <Loading />}
      <div className={`px-5 md:px-36 pb-10 gap-5 ${loading ? 'hidden' : ''}`}>
        <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 text-2xl lg:text-5xl font-bold">SYNAPSIS Blog</p>
          <p className="text-lg lg:text-2xl">Welcome to Synapsis Blog Admin!</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-black mb-5">
            User Synapsis Blog
          </p>
          {selectedUserDetails && (
            <div className="mt-8 border rounded p-6 bg-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-lg">
                  <span className="font-semibold text-gray-700">Name:</span>{' '}
                  {selectedUserDetails.name}
                </div>
                <div className="text-lg">
                  <span className="font-semibold text-gray-700">Gender:</span>{' '}
                  {selectedUserDetails.gender}
                </div>
                <div className="text-lg">
                  <span className="font-semibold text-gray-700">Email:</span>{' '}
                  {selectedUserDetails.email}
                </div>
                <div className="text-lg">
                  <span className="font-semibold text-gray-700">Status:</span>{' '}
                  {selectedUserDetails.status}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between border border-gray-200 p-4"
              >
                <p className="text-lg font-semibold mb-2">{user.name}</p>
                <Button
                  onClick={() => handleCheckDetail(user.id)}
                  className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded focus:outline-none"
                >
                  <RiFileSearchLine className="text-xl mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
