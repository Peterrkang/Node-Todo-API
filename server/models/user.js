const { mongoose } = require("../db/mongoose");
const validator = require("validator");

/*
  {
    email: 'kjasld@gmail.com',
    password: 'bcrypt algo',
    tokens: [{
      access: 'auth'
      token: 'encrypted string'
    }]
  }
*/

var User = mongoose.model("User", {
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  token: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
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
