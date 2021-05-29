import React from 'react'
import CommentDisplay from './CommentDisplay'

Comments.propTypes = {}

function Comments({ post }) {
  return (
    <div>
      {post.comments.map((comment, idx) => (
        <CommentDisplay key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
