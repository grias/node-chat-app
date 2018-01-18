const expect = require('expect');

const {Users} = require('./users');

let users;

beforeEach(() => {
  users = new Users;
  users.userList = [{
    id: 228
  , name: 'Small guy'
  , room: 'aircraft'
  },{
    id: 444
  , name: 'Bane'
  , room: 'aircraft'
  },{
    id: 322
  , name: 'Hired gun'
  , room: 'midair'
  }];
});

describe('Users', () => {
  it('Should add new User', () => {
    let users = new Users;
    let user = {
      id: '123123'
    , name: 'Alex'
    , room: 'test-room'
    };

    let res = users.addUser(user.id, user.name, user.room);
    expect(users.userList).toEqual([user]);
  });

  it('Should add new User when object provided', () => {
    let users = new Users;
    let user = {
      id: '123123'
    , name: 'Alex'
    , room: 'test-room'
    };

    let res = users.addUser(user);
    expect(users.userList).toEqual([user]);
  });

  it('Should remove the user', () => {
    user = users.removeUser(228);
    expect(user.name).toBe('Small guy');
    expect( users.userList.length).toBe(2);
  });

  it('Should not remove the user', () => {
    user = users.removeUser(9876);
    expect( users.userList.length).toBe(3);
  });

  it('Should find the user', () => {
    user = users.getUser(444);
    expect(user).toEqual(users.userList[1]);
  });

  it('Should not find the user', () => {
    user = users.getUser(9876);
    expect(user).toNotExist();
  });

  it('Should return names of people in aircraft', () => {
    let list = users.getUserList('aircraft');
    expect(list.length).toBe(2);
  });
});
