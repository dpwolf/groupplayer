// include dependencies
var _ = require('underscore')._
, Backbone = require('backbone');
    
// include custom modules
var gp_models = require('./models/gp_models');

// include redis and connect
// var redis = require('redis')
// , rc = redis.createClient();
// 
// rc.on('error', function (err) {
//     console.log('Error ' + err);
// });

// include express, jade and socket.io
var express = require('express')
, app = express.createServer()
// , connect = require('connect')
// , jade = require('jade')
// , socket = require('socket.io').listen(app);

app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.bodyParser());


app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

// warning this will make all js,css and html files public
app.get('/*.(js|css|html)', function (req, res) {
    res.sendfile('./' + req.url);
});

app.listen(8080);