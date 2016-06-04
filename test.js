var fs = require('fs');
var path = require('path');

var read = require('./readability');

fs.readFile(path.join(__dirname, 'test.html'), { encoding: 'utf-8' }, function (err, html) {
  read(html, function (err, read) {
    console.log(read.content.lenght);
    fs.writeFile("test_result.html", read.content, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
});
