import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBlogPostList } from '@/api/blog-post-list'
import type { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import Loading from '@/components/Loading'

export default function BlogPostList() {
  const [blogPosts, setBlogPosts] = useState<BlogPostListType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPostList()
        setBlogPosts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <Seo templateTitle="Blog Post List" />
      {loading && <Loading />}
      <div className={`${loading ? 'hidden' : ''}`}>
        <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 font-bold text-2xl lg:text-5xl">SYNAPSIS Blog</p>
          <p className="text-lg lg:text-2xl">
            Welcome to Synapsis Blog Post List!
          </p>
        </div>
        <div className="grid md:grid-cols-3 px-5 md:px-36 gap-3">
          {blogPosts &&
            blogPosts.map((post) => (
              <div key={post.id}>
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
                <p className="font-bold text-xl text-gray-800">{post.title}</p>
                <p className="pb-10 text-justify font-medium text-lg text-gray-500">
                  {post.body}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}
