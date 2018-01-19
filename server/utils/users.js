class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // return the user that was removed.
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((usr) => usr.id != id);
    }
    return user;
  }
  getUser (id) {
    // return the user.
    var user = this.users.filter((user) => user.id === id);
    return user[0];
  }
  getUserList (room) {
    // return the users in a room
    var users = this.users.filter((user) => user.room === room );
    return users.map( (user) => user.name );
  }
}

module.exports = {Users}