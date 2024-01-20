import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { deleteUser, getUser, storeUser, updateUser } from '@/api/blog-admin'
import { UsersInterface } from '@/utils/interfaces/Users'
import { getUsers } from '@/api/blog-detail'
import Button from '@/components/Button'
import { RiAddFill, RiEditFill, RiFileSearchLine } from 'react-icons/ri'
import Loading from '@/components/Loading'
import { FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'
import DeleteUserModal from '@/components/BlogAdmin/Delete Data'
import UpdateUserModal from '@/components/BlogAdmin/UpdateData'
import AddUserModal from '@/components/BlogAdmin/CreateData'

export default function BlogAdmin() {
  const [users, setUsers] = useState<UsersInterface[]>([])
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UsersInterface | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState<
    number | null
  >(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleCheckDetail = async (userId: number) => {
    try {
      const userDetails = await getUser(userId)

      if (Array.isArray(userDetails) && userDetails.length > 0) {
        setSelectedUserDetails(userDetails[0])
      } else if (!Array.isArray(userDetails)) {
        setSelectedUserDetails(userDetails)
      } else {
        setSelectedUserDetails(null)
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  const openDeleteModal = (userId: number) => {
    setSelectedUserIdToDelete(userId)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedUserIdToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const openUpdateModal = (userId: number) => {
    handleCheckDetail(userId)
    setIsUpdateModalOpen(true)
  }

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false)
  }

  const handleAddUser = async (userData: any) => {
    try {
      const response = await storeUser(userData)
      fetchData()
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleDeleteUser = async (userId: number | null) => {
    try {
      if (userId !== null) {
        await deleteUser(userId)
        fetchData()
        closeDeleteModal()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleUpdateUser = async (userId: number | null, updatedData: any) => {
    try {
      if (userId !== null) {
        await updateUser(userId, updatedData)
        toast.success('User updated successfully')
        fetchData()
        closeUpdateModal()
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  useEffect(() => {
    Modal.setAppElement(document.getElementById('root') || document.body)
  }, [])

  return (
    <Layout>
      <Seo templateTitle="Blog Admin" />
      {loading && <Loading />}
      <div
        className={`px-5 md:px-36 pb-10 gap-5 lg:h-screen ${
          loading ? 'hidden' : ''
        }`}
      >
        <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 text-2xl lg:text-5xl font-bold">SYNAPSIS Blog</p>
          <p className="text-lg lg:text-2xl">Welcome to Synapsis Blog Admin!</p>
        </div>
        <div>
          <div className="flex flex-row gap-4 justify-end">
            <Button variant="primary" onClick={openAddModal}>
              <RiAddFill className="text-xl" />
            </Button>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <div className="border border-gray-200 p-4" key={user.id}>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <div className="space-x-1 lg:space-x-3">
                    <Button
                      variant="primary"
                      onClick={() => handleCheckDetail(user.id)}
                    >
                      <RiFileSearchLine className="text-sm" />
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => openUpdateModal(user.id)}
                    >
                      <RiEditFill className="text-sm" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => openDeleteModal(user.id)}
                    >
                      <FaTrash className="text-sm" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onAddUser={handleAddUser}
        />

        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => handleDeleteUser(selectedUserIdToDelete)}
        />

        <UpdateUserModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          onUpdate={(updatedData) =>
            handleUpdateUser(selectedUserDetails?.id || null, updatedData)
          }
          userData={selectedUserDetails}
        />
      </div>
    </Layout>
  )
}
