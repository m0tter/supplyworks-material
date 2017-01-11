"use strict";
var express = require("express");
var morgan = require("morgan");
var router = require("./server/routes/default.route");
var app = express();
app.use(morgan('dev'));
router.registerRoutes(app);
app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.listen(3000, function () {
    console.log('Magic is happening on port 3000');
});
