const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword =
  "$2a$10$SDt6Abx4x3dVLUFwEVwM8e7Ts2pIMUCHpZbPJ.Ol0xRj2dey1eU8q";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
