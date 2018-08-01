const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

const id = "5b61102908d58f879037c1b8";
User.findById(id)
  .then(user => {
    if (!user) return console.log(`ID not found`);
    console.log(user);
  })
  .catch(err => {
    console.log(err);
  });

// var id = "5b6105aca1abe705d43091901234";

// if (!ObjectID.isValid(id)) {
//   console.log(`ID not valid`);
// }
// array struct and empty arr
// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log(`Todos:`, todos);
// });

//returns null if none found
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log(`Todo:`, todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) return console.log(`Id not found`);
//     console.log(`TodoByID:`, todo);
//   })
//   .catch(err => {
//     console.log(err);
//   });
