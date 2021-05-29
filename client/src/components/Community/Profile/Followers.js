import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { EmptyBox } from '../../../helpers/icons'
import UserCard from '../UserCard'
import FollowBtn from './FollowBtn'

function Followers({ visible1, users, handleCancel1, setShowFollowers }) {
  const { user } = useSelector((state) => state)
  return (
    <div>
      <Modal
        title="Người theo dõi"
        visible={visible1}
        footer={null}
        onCancel={handleCancel1}
      >
        {users.length > 0 ? (
          <div>
            {users.map((item) => (
              <UserCard
                key={item._id}
                user={item}
                setShowFollowers={setShowFollowers}
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

export default Followers
