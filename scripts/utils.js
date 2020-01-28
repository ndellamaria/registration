var fs = require("fs");

const saveToFile = (dataToWrite, filename = "users.csv") => {
  fs.writeFile(filename, dataToWrite, "utf8", function(err) {
    if (err) {
      console.log(
        "Some error occured - file either not saved or corrupted file saved."
      );
    } else {
      console.log("It's saved!");
    }
  });
};
module.exports = { saveToFile };
