var { mongoose } = require("../db/mongoose");

var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = { Todo };

// var newTodo = new Todo({ text: "Cook Dinner" });

// newTodo.save().then(
//   doc => {
//     console.log(`Save Todo`, doc);
//   },
//   e => {
//     console.log(`unable to save todo`);
//   }
// );

//typecasting happens in mongoose

// var nextTodo = new Todo({ text: "true" });

// nextTodo.save().then(
//   doc => {
//     console.log("Todo Save", doc);
//   },
//   err => {
//     console.log("Unable to Save Todo");
//   }
// );

//new user model - authentication associated to todos - trim, required, type: string, minlength - 1
