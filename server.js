var fs = require("fs");
var express = require('express');
var app = express();


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

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

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});