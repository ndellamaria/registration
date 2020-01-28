require("dotenv").load();
var mongoose = require("mongoose");
var database = process.env.DATABASE || "mongodb://localhost:27017";
mongoose.connect(database);
var User = require("../app/server/models/User");
var Utils = require("./utils");

let dataToWrite = "\n";
User.find().then(users => {
  users.forEach(function(user) {
    // const condition = user.status.name == "confirmed"
    const condition = true;
    if (condition) {
      const { profile, email, teamCode, confirmation } = user;
      const profileString = Object.keys(profile)
        .map(function(k) {
          return profile[k];
        })
        .join("\t")
        .replace(/(?:\r\n|\r|\n)/g, " ");
      const addressString = Object.keys(confirmation.address)
        .map(function(k) {
          return confirmation.address[k];
        })
        .join("\t")
        .replace(/(?:\r\n|\r|\n)/g, " ");
      delete confirmation.address;
      const confirmationString = Object.keys(confirmation)
        .map(function(k) {
          return confirmation[k];
        })
        .join("\t")
        .replace(/(?:\r\n|\r|\n)/g, " ");
      const str = `${email}\t${teamCode}\t${profileString}\t${confirmationString}\t${addressString}\r\n`;
      dataToWrite += str;

      console.log(str);
    }
  });
  Utils.saveToFile(dataToWrite);
});
