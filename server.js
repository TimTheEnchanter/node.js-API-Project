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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/listRecords', function (req, res) {
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addRecord/:fullName:phone:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
	var test = "\""+req.params.id+"\"";   
	var user = {
	  test : {
      "fullName" : ""+req.params.fullName+"",
      "phone" : ""+req.params.phone+"",
      "id": ""+req.params.id+""
      }
	}   
	   
      data = JSON.parse( data );
      data[req.params.id] = user[req.params.id];
      console.log( data );
      res.end( JSON.stringify(data));
   });
    backURL=req.header('Referer') || '/';
  // do your thang
  res.redirect(backURL);
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

app.delete('/deleteRecord/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "records.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data[req.params.id];
       
      console.log( data );
      res.end( JSON.stringify(data));
	  
	   
   });
   backURL=req.header('Referer') || '/';
		// do your thang
		res.redirect(backURL);
})

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});