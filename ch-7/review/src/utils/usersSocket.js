class UsersSocket {
  constructor() {
    this.users = []
  }

  // Join user to chat
  userJoin(username, room) {
    const user = { username, room, picker: null }
    this.users.push(user)
    return user
  }

  // Get current user
  getCurrentUser(id, pick) {
    const index = this.users.findIndex((user) => user.username === id)
    this.users[index].picker = pick
    return {
      room: this.users.find((user) => user.username === id).room,
      users: this.users,
    }
  }

  // User leaves chat
  userLeave(id) {
    const index = this.users.findIndex((user) => user.id === id)

    if (index !== -1) {
      return this.users.splice(index, 1)[0]
    }
  }

  // Get room users
  getRoomUsers(room) {
    return this.users.filter((user) => user.room === room)
  }
  formatMessage(username, text) {
    return {
      username,
      text,
    }
  }
}

module.exports = new UsersSocket()
