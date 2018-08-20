const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'pedro@example.com',
    password: 'password1!',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId.toHexString(), access: 'auth' }, 'abc123')
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'peter@example.com',
    password: 'password2@',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId.toHexString(), access: 'auth' }, 'abc123')
          .toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first test todo',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
