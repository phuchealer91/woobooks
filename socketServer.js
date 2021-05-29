let users = []
const EditData = (data, id, call) => {
  const newData = data.map((item) =>
    item.id === id ? { ...item, call } : item
  )
  return newData
}
const SocketServer = (socket) => {
  socket.on('joinUsers', (user) => {
    users.push({ id: user._id, socketId: socket.id })
  })
  socket.on('disconnect', () => {
    const data = users.find((user) => user.socketId === socket.id)
    users = users.filter((user) => user.socketId !== socket.id)
    if (data && data.call) {
      const userCall = users.find((user) => user.id === data.call)
      if (userCall) {
        users = EditData(users, userCall.id, null)
        socket.to(`${userCall.socketId}`).emit('callerDisconect')
      }
    }
  })
  socket.on('addMessage', (msg) => {
    const user = users.find((user) => user.id === msg.recipient)
    user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
  })
  // Call
  socket.on('callUser', (data) => {
    users = EditData(users, data.sender, data.recipient)
    const client = users.find((item) => item.id === data.recipient)
    if (client) {
      if (client.call) {
        users = EditData(users, data.sender, null)
        socket.emit('userBusy', data)
      } else {
        users = EditData(users, data.recipient, data.sender)
        socket.to(`${client.socketId}`).emit('callUserToClient', data)
      }
    }
    console.log(users)
  })
  // End Call
  socket.on('endCall', (data) => {
    const client = users.find((user) => user.id === data.sender)
    if (client) {
      socket.to(`${client.socketId}`).emit('endCallToClient', data)
      users = EditData(users, client.id, null)
      if (client.call) {
        const clientCall = users.find((user) => user.id === client.call)
        clientCall &&
          socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)
        users = EditData(users, client.call, null)
      }
    }
  })
}

module.exports = SocketServer
