var express = require('express');
var app = express();
var fs = require("fs");



app.get('/listRecords', function (req, res) {
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addRecord', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data[""] = user[""];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.delete('/deleteRecord', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Records app listening at http://%s:%s", host, port)
})