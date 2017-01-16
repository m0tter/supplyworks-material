"use strict";
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var router = require("./server/routes/default.route");
var dbConfig = require("./server/config/db.config");
var app = express();
mongoose.connect(dbConfig.connectionStringLocalDB);
app.use(morgan('dev'));
router.registerRoutes(app);
app.use(express.static(__dirname + '/client'));
app.get('/|/dashboard', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.listen(3000, function () {
    console.log('Magic is happening on port 3000');
});
