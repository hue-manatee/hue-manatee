const fs = require('fs');

function checkDirectory(directory) {
  fs.stat(directory, (err) => {
    if (err) {
      fs.mkdir(directory);
      return console.log('made directory');
    }
    console.log('dir exists');
  });
}

checkDirectory('./db/');
