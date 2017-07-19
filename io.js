const createIo = require('socket.io')

module.exports = function connectIo (server) {
  const io = createIo(server)
  const ioState = { blueprints: [], io }
  io.on('connection', (socket) => {
    socket.on('client:requestBlueprintUrl', () => {
      ioState.blueprints = ioState.blueprints.concat([socket.id])
      console.log('blueprint url requested', socket.id)
      socket.emit('server:allocatedBlueprintUrl')
    })
    socket.on('disconnect', () => {
      ioState.blueprints.splice(ioState.blueprints.indexOf(socket.id), 1)
    })
  })
  return ioState
}