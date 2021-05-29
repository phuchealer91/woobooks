import React from 'react'
import StarRating from 'react-star-ratings'
const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="#FADB14"
      starEmptyColor="#FADB14"
    />

    <br />
  </>
)

export default Star
