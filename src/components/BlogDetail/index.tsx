import React from 'react'
import Image from 'next/image'
import { BlogPostList as BlogPostListType } from '@/utils/interfaces/BlogPostList'
import { UsersInterface } from '@/utils/interfaces/Users'

interface BlogPostProps {
  post: BlogPostListType
  user: Pick<UsersInterface, 'name' | 'email'>
  commentName: string
  commentEmail: string
  commentBody: string
}

const BlogDetailComponent: React.FC<BlogPostProps> = ({
  post,
  user,
  commentName,
  commentEmail,
  commentBody
}) => {
  const hasComment =
    commentName !== 'No User' ||
    commentEmail !== 'No Email' ||
    commentBody !== 'No Message'
  return (
    <div className="space-y-2">
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
        <p className="font-bold text-xl text-gray-800">{post.title}</p>
        <p className="font-medium text-lg text-gray-600">
          {user.name} - {user.email}
        </p>
        <p className="pb-2 text-justify font-medium text-xl text-gray-500">
          {post.body}
        </p>
        <p className="font-bold text-lg text-gray-600">Comment from: </p>
        {hasComment ? (
          <>
            <p className="font-normal text-lg text-gray-500">{commentName}</p>
            <p className="font-normal text-lg text-gray-500">{commentEmail}</p>
            <p className="font-normal text-lg text-gray-500">
              <span className="font-bold">Message:</span> {commentBody}
            </p>
          </>
        ) : (
          <p className="font-normal text-lg text-gray-500">No Comment</p>
        )}
      </div>
    </div>
  )
}

export default BlogDetailComponent
