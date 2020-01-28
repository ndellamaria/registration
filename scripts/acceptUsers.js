require("dotenv").load();
var mongoose = require("mongoose");
var database = process.env.DATABASE || "mongodb://localhost:27017";
var jwt = require("jsonwebtoken");
mongoose.connect(database);
var User = require("../app/server/models/User");
var UserController = require("../app/server/controllers/UserController");
var Utils = require("./utils");

const condition = user => {
  let canAccept = user.status.name === "submitted";
  if (canAccept && user.profile.essay && user.profile.essay.length > 10) {
    return true;
  }
  return false;
};

let accepting = 0;
var count = 0;
User.find().then(users => {
  users.forEach(function(user) {
    // if (
    //   condition(user) ||
    //   (user.status.admitted && !user.status.confirmed && !user.status.declined)
    // ) {
    if (condition(user)) {
      console.log(user.email);
      accepting += 1;
      // UserController.admitUser(user.id, user, function() {
      //   count += 1;
      //   if (count == users.length) {
      //     console.log("\n\nDone");
      //   }
      // });
    }
  });
  console.log(accepting);
});

const certUsers = [];
User.find().then(users => {
  users.forEach(function(user) {
    if (user.profile.name) {
      const emailPaths = user.email.split("@");
      const redacted = `${emailPaths[0]}@*****.**`;
      const u = {
        email: redacted,
        name: user.profile.name
      };
      certUsers.push(u);
    }
    count += 1;
    if (count == users.length) {
      console.log("\n\nDone");
      console.log(certUsers);
      Utils.saveToFile(JSON.stringify(certUsers), "redactedUsers.json");
    }
  });
  console.log(accepting);
});

// const users = await User.find()
// var user = { email: process.env.ADMIN_EMAIL };

// var userArray = require("fs")
//   .readFileSync("accepted.txt")
//   .toString()
//   .split("\n");
// var count = 0;
// userArray.forEach(function(id) {
//   UserController.admitUser(id, user, function() {
//     count += 1;
//     if (count == userArray.length) {
//       console.log("Done");
//     }
//   });
// });
