import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'

function Posts() {
  const { homePost } = useSelector((state) => state)

  return (
    <>
      <ul className="list-none">
        {homePost &&
          homePost.posts.map((item, idx) => (
            <PostCard key={item._id} post={item} />
          ))}
      </ul>
    </>
  )
}

export default Posts
