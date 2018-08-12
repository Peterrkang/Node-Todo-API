const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const port = process.env.PORT || 3000;

//save new something
//Mongoose schema/validators
//  cd Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath /Users/peter.kang/mongo-data

var app = express();

app.use(bodyParser.json());

app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text
    });
    const doc = await todo.save();
    res.status(200).send(doc);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send({ todos });
  } catch (e) {
    res.status(400).send(err);
  }
});

app.get("/todos/:id", async (req, res) => {
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

app.delete("/todos/:id", async (req, res) => {
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

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) return res.status(404).send();
      return res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Server started on Port: ${port}`);
});

module.exports = {
  app
};
