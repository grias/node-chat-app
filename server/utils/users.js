const _ = require('lodash');


class Users {
  constructor () {
    this.userList = [];
  }

  addUser (idOrObj, name, room) {
    let user = {};
    if (typeof arguments[0] === 'object') {
      user = arguments[0];
    } else {
      user = {id: idOrObj, name, room};

    }
    this.userList.push(user);
    return user;
  }

  removeUser (id) {
    return _.remove(this.userList, (user) => user.id === id)[0];
  }

  getUser (id) {
    return _.find(this.userList, (user) => user.id === id);
  }

  getUserList (room) {
    let users = this.userList.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
