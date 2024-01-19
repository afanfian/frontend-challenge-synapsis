import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBlogPostList } from '@/api/blog-post-list'
import { getUsers } from '@/api/blog-detail'
import { getComments } from '@/api/blog-detail'
import { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import { Users } from '@/utils/interfaces/Users'
import { Comments } from '@/utils/interfaces/Comments'
import BlogDetailComponent from '@/components/BlogDetail'
import SearchInput from '@/components/SearchInput'
import PageSizeSelect from '@/components/PageSizeSelect'
import SortOrderSelect from '@/components/SortOrderSelect'
import SortBySelect from '@/components/SortBySelect'
import Loading from '@/components/Loading'

const BlogDetail: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostListType[]>([])
  const [users, setUsers] = useState<Users[]>([])
  const [comments, setComments] = useState<Comments[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<BlogPostListType[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortProperty, setSortProperty] = useState<
    'title' | 'userName' | 'commentName'
  >('title')
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

  useEffect(() => {
    const filteredPosts = blogPosts
      .filter((post) => {
        const user = getUserDetails(post.user_id)
        const comment = getCommentDetails(post.id)
        const searchableContent = `${post.title} ${user.name} ${user.email} ${post.body} ${comment.name} ${comment.email} ${comment.body}`
        return searchableContent
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
      .slice(0, pageSize)

    const sortedPosts = sortResults(filteredPosts)

    setSearchResults(sortedPosts)
  }, [searchQuery, blogPosts, pageSize, sortOrder, sortProperty])

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

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
  }

  const handleSortOrderChange = (value: 'asc' | 'desc') => {
    setSortOrder(value)
  }

  const handleSortPropertyChange = (
    value: 'title' | 'userName' | 'commentName'
  ) => {
    setSortProperty(value)
  }

  const sortResults = (data: BlogPostListType[]): BlogPostListType[] => {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
      const aValue = getProperty(a, sortProperty)
      const bValue = getProperty(b, sortProperty)

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })

    return sortedData
  }

  const getProperty = (obj: any, prop: string): string => {
    if (prop === 'userName') {
      const user = getUserDetails(obj.user_id)
      return user.name.toLowerCase()
    } else if (prop === 'commentName') {
      const comment = getCommentDetails(obj.id)
      return comment.name.toLowerCase()
    } else {
      return obj[prop].toLowerCase()
    }
  }

  return (
    <Layout>
      <Seo templateTitle="Blog Detail" />
      {loading && <Loading />}
      <div className={`pb-10 ${loading ? 'hidden' : ''}`}>
        {' '}
        <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 text-2xl lg:text-5xl">SYNAPSIS Blog</p>
          <p className="text-lg lg:text-2xl">
            Welcome to Synapsis Blog Detail!
          </p>
        </div>
        <div className="px-5 md:px-36 gap-5">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center mb-10">
            <div className="pb-5 lg:pb-0">
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0">
              <div>
                <label className="mr-2">Show Data:</label>
                <PageSizeSelect
                  value={pageSize}
                  onChange={handlePageSizeChange}
                />
              </div>
              <div>
                <label className="mr-2 ml-0 lg:ml-4">Sort Order:</label>
                <SortOrderSelect
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                />
              </div>
              <div>
                <label className="mr-2 ml-0 lg:ml-4">Sort By:</label>
                <SortBySelect
                  value={sortProperty}
                  onChange={handleSortPropertyChange}
                />
              </div>
            </div>
          </div>
          {searchResults.length === 0 ? (
            <p className="text-2xl font-bold text-center text-red-500">
              The data you are looking for does not exist!
            </p>
          ) : (
            searchResults.map((post) => {
              const user = getUserDetails(post.user_id)
              const comment = getCommentDetails(post.id)
              return (
                <BlogDetailComponent
                  key={post.id}
                  post={post}
                  user={user}
                  commentName={comment.name}
                  commentEmail={comment.email}
                  commentBody={comment.body}
                />
              )
            })
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogDetail
