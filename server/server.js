require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const port = process.env.PORT;

//save new something
//Mongoose schema/validators
//  cd Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath /Users/peter.kang/mongo-data

const app = express();

app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  try {
    const doc = await todo.save();
    res.status(200).send(doc);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send({ todos });
  } catch (e) {
    res.status(400).send(err);
  }
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).send();
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/todos/:id', async (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  try {
    const todo = await Todo.findByIdAndRemove(id);
    if (!todo) return res.status(404).send();
    res.status(200).send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/todos/:id', async (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!todo) return res.status(404).send();
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Server started on Port: ${port}`);
});

module.exports = {
  app
};
