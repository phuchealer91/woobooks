import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { EmptyBox } from '../../../helpers/icons'
import UserCard from '../UserCard'
import FollowBtn from './FollowBtn'

function Following({ visible2, users, handleCancel2, setShowFollowing }) {
  const { user } = useSelector((state) => state)
  return (
    <div>
      <Modal
        title="Theo dõi"
        visible={visible2}
        footer={null}
        onCancel={handleCancel2}
      >
        {users.length > 0 ? (
          <div>
            {users.map((item) => (
              <UserCard
                key={item._id}
                user={item}
                setShowFollowing={setShowFollowing}
              >
                {user.userDatas?._id !== item._id && (
                  <div className="pl-3">
                    <FollowBtn userx={item} />
                  </div>
                )}
              </UserCard>
            ))}
          </div>
        ) : (
          <div className="w-full grid place-items-center ">
            <EmptyBox />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Following
