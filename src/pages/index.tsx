import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBlogPostList } from '@/api/blog-post-list'
import type { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import Button from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPostListType[]>([])

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(' ')
    const truncated = words.slice(0, maxWords).join(' ')
    return words.length > maxWords ? `${truncated} ...` : truncated
  }

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
      <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
        <p className="pb-2 font-bold text-2xl lg:text-5xl">SYNAPSIS Blog</p>
        <p className="text-lg lg:text-2xl">Welcome to Synapsis Blog!</p>
      </div>
      <div className="grid md:grid-cols-3 px-5 md:px-36 pb-10 gap-3">
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
              <p className="pb-5 text-justify font-medium text-lg text-gray-500">
                {truncateText(post.body, 10)}
              </p>
              <Button variant="primary">
                <a href={`/blog-post-list`}>Read more</a>
              </Button>
            </div>
          ))}
      </div>
    </Layout>
  )
}
