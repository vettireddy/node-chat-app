const expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'venky',
      room: 'Node'
    },
    {
      id: 2,
      name: 'Mrunalini',
      room: 'Angular'
    },
    {
      id: 3,
      name: 'Vivan',
      room: 'Node'
    }]
  });

  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'venky',
      room: 'rokz'
    };
    var res = users.addUser(user.id, user.name, user.room);
    expect(res.id).toBe(123);
    expect(res.name).toBe('venky');
    expect(res.room).toBe('rokz');
    expect(res).toBeAn('object');
    expect(users.users).toEqual([user]);
  });

  it('Should list all the users in a room Node', () => {
    var room = 'Node';
    var userList = users.getUserList(room);
    expect(userList).toEqual(['venky','Vivan']);
  });
  it('Should not list any users in a room gala', () => {
    var room = 'gala';
    var userList = users.getUserList(room);
    expect(userList.length).toBe(0);
  });
  it('Should find a user using an id 1', () => {
    var id = 1;
    var user = users.getUser(id);
    expect(user.name).toBe('venky');
  });
  it('Should not find a user using an id 1111', () => {
    var id = 1111;
    var user = users.getUser(id);
    expect(user).toNotExist();
  })
  it('Should remove a user using id 1', () => {
    var id = 1;
    var user = users.removeUser(id);
    expect(users.users).toNotContain(user);
  });
  it('Should not remove a user using id 1111', () => {
    var id = 1111;
    var user = users.removeUser(id);
    expect(user).toNotExist();
  })
});