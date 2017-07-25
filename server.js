var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var serveStatic = require('serve-static')


var app = express();
var PORT = process.env.PORT || 3050;

var profiles = [];
var matches = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "app/public/home.html"));
// });

// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "app/public/survey.html"));
// });


// app.post("/api/profiles", function(req, res) {
//     profiles.push(req.body);
// });

// app.get("/api/profiles", function(req, res) {
//     res.json(profiles);
// });

var newProfile = {};


app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.use(('/static'), express.static('app/public'));

app.post("/api/profiles", function(req, res) {
    profiles.push(req.body);
});

app.get("/api/profiles", function(req, res) {
    res.json(profiles);
});

// var htmlRoute = require('./app/routing/htmlRouting.js')(app);
var apiRoute = require('./app/routing/apiRouting.js')(app, newProfile);

app.use(express.static(__dirname + '/app/public'));


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});