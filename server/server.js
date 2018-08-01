var express = require("express");
var bodyParser = require("body-parser");

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

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    doc => {
      res.send({ doc });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findById(id)
    .then(todo => {
      if (!todo) return console.log(`Todo not found`);
      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send(todo);
    })
    .catch(e => {
      res.status(400).send();
    });

  //remove todo by id
  //if err return 400 wit empty
  //if no doc return 200
  //
});

app.listen(port, () => {
  console.log(`Server started on Port: ${port}`);
});

module.exports = {
  app
};
