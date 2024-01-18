import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBlogPostList } from '@/api/blog-post-list'
import type { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import Image from 'next/image'

export default function BlogPostList() {
  const [blogPosts, setBlogPosts] = useState<BlogPostListType[]>([])

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

  return (
    <Layout>
      <Seo templateTitle="List Blog" />
      <div className="pt-16 pb-20 text-center text-black">
        <p className="pb-2 font-bold text-5xl  ">SYNAPSIS Blog</p>
        <p className="text-2xl">Welcome to Synapsis Blog Post List!</p>
      </div>
      <div className="grid md:grid-cols-3 px-36 gap-3">
        {blogPosts &&
          blogPosts.map((post) => (
            <div key={post.id}>
              <Image
                src="/images/logo.png"
                alt="Logo synapsis"
                width={400}
                height={400}
                priority
                className="mx-auto pb-3"
              />
              <p className="font-bold text-xl text-gray-800">{post.title}</p>
              <p className="pb-5 font-medium text-lg text-gray-500">
                {post.body}
              </p>
            </div>
          ))}
      </div>
    </Layout>
  )
}