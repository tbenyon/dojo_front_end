var express = require('express');
var app = express();
const dojo_db = require('./server/register/mySQL.js');
const favicon = require('serve-favicon');

app.use(favicon(__dirname + '/assets/images/favicon.ico'));

app.set('view engine', 'pug');
app.set('views', __dirname+'/assets/views');

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.render('index.jade');
});

app.get('/contact-us', function(req, res){
    res.render('contact_us.jade');
});

app.get('/faq', function(req, res){
    res.render('FAQ.jade');
});

app.get('/resources', function(req, res){
    res.render('resources.jade');
});

app.get('/us', function(req, res){
    dojo_db.getUsers().then(function (data) {
        res.render('us.jade', {'users': data});
    });
});



var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});