import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBlogPostList } from '@/api/blog-post-list'
import Image from 'next/image'
import type { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import { Users } from '@/utils/interfaces/Users'
import { getComments, getUsers } from '@/api/blog-detail'
import { Comments } from '@/utils/interfaces/Comments'

export default function BlogDetail() {
  const [blogPosts, setBlogPosts] = useState<BlogPostListType[]>([])
  const [users, setUsers] = useState<Users[]>([])
  const [comments, setComments] = useState<Comments[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPostList()
        setBlogPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchDataUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchDataUsers()
  }, [])

  useEffect(() => {
    const fetchDataComments = async () => {
      try {
        const data = await getComments()
        setComments(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchDataComments()
  }, [])

  const getUserDetails = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    return user
      ? { name: user.name, email: user.email }
      : { name: 'User Inactive', email: 'Email Inactive' }
  }

  const getCommentDetails = (postId: number) => {
    const comment = comments.find((c) => c.post_id === postId)
    return comment
      ? { name: comment.name, email: comment.email, body: comment.body }
      : { name: 'No User', email: 'No Email', body: 'No Message' }
  }

  return (
    <Layout>
      <Seo templateTitle="List Blog" />
      <div className="pb-10">
        <div className="pt-16  pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 text-2xl lg:text-5xl">SYNAPSIS Blog</p>
          <p className="text-lg lg:text-2xl">
            Welcome to Synapsis Blog Detail!
          </p>
        </div>
        <div className="grid md:grid-cols-2 px-5 md:px-36 gap-5">
          {blogPosts &&
            blogPosts.map((post) => (
              <div key={post.id} className="space-y-2">
                <Image
                  src="/images/logo.png"
                  alt="Logo synapsis"
                  width={400}
                  height={400}
                  priority
                  className="hidden lg:block mx-auto pb-3"
                />
                <Image
                  src="/images/logo.png"
                  alt="Logo synapsis"
                  width={200}
                  height={200}
                  priority
                  className="lg:hidden mx-auto pb-3"
                />
                <div className="text-justify space-y-1 gap-5">
                  <p className="font-bold text-xl text-gray-800">
                    {post.title}
                  </p>
                  <p className="font-bold text-lg text-gray-600">Author: </p>
                  <p className="font-normal text-lg text-gray-500">
                    {getUserDetails(post.user_id).name}
                  </p>
                  <p className="font-normal text-lg text-gray-500">
                    {getUserDetails(post.user_id).email}
                  </p>
                  <p className="pb-2 font-medium text-lg text-gray-500">
                    {post.body}
                  </p>
                  <p className="font-bold text-lg text-gray-600">
                    Comment from:{' '}
                  </p>
                  <p className="font-normal text-lg text-gray-500">
                    {getCommentDetails(post.id).name}
                  </p>
                  <p className="font-normal text-lg text-gray-500">
                    {getCommentDetails(post.id).email}
                  </p>
                  <p className="font-normal text-lg text-gray-500">
                    <span className="font-bold">Message:</span>{' '}
                    {getCommentDetails(post.id).body}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}
