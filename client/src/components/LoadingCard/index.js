import React from 'react'
import { Card, Col, Row, Skeleton } from 'antd'

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = []

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col xs={24} sm={24} md={12} lg={6} key={i}>
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        </Col>
      )
    }

    return totalCards
  }

  return <Row gutter={[2, 12]}>{cards()}</Row>
}

export default LoadingCard
