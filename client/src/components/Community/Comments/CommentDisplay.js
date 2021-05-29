import React from 'react'
import CommentCard from './CommentCard'

CommentDisplay.propTypes = {}

function CommentDisplay({ comment, post }) {
  return (
    <>
      <CommentCard comment={comment} post={post}></CommentCard>
    </>
  )
}

export default CommentDisplay
