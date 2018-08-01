var { mongoose } = require("../db/mongoose");

var User = mongoose.model("User", {
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true
  }
});

module.exports = { User };
// var newUser = new User({ email: "pedrotest@gmail.com" });
// newUser.save().then(
//   doc => {
//     console.log("User has been saved", doc);
//   },
//   err => {
//     console.log("Unable to save User");
//   }
// );
