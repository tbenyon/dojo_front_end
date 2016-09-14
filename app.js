var express = require('express');
var app = express();
const dojo_db = require('./server/register/mySQL.js');
const favicon = require('serve-favicon');
const calendar = require("./server/google_calendar_api/calendarQueries.js");
var session = require('client-sessions');
var bodyParser = require('body-parser');

app.use(favicon(__dirname + '/assets/images/favicon.ico'));

app.set('view engine', 'pug');
app.set('views', __dirname+'/assets/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static(__dirname + '/assets'));
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.get('/', function(req, res) {
    calendar.listCalendarEvents().then(function (events) {
        res.render('index.jade', {dojoEvents: events});
    }).catch(function (err) {
        console.error("Couldn't retrieve calendar.\n", err);
        res.render('index.jade');
    });
});

app.get('/login', function(req, res){
    res.render('login.jade');
});

app.post('/login', function(req, res){
    dojo_db.login(req.body.nickName, req.body.password).then(function (data) {
        if (typeof data === "undefined") {
            res.render('login.jade', {'error': "Username or Password not found."});
        } else if (data.UserType !== "Mentor") {
            res.render('login.jade', {'error': "Only mentors can login!"});
        } else {
            req.session.user = data;

            res.redirect('/register');

        }

    }).catch(function (err) {
        console.log(err);
        console.error("Failed to login.");
        res.send(err);
    });
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

app.get('/register', function(req, res){
    if (req.session && req.session.user) {
        dojo_db.nickNameCheck(req.session.user.NickName).then(function (user) {
            if (!user) {
                req.session.reset();
                res.redirect('/login');
            } else {
                res.locals.user = user;
                dojo_db.getUsers().then(function (data) {
                    res.render('register.jade', {'users': data});
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res){
    if (req.session && req.session.user) {
        req.session.reset();
    }
    res.redirect('/login');
});

app.get('/members', function(req, res){
    dojo_db.getUsers().then(function (data) {
        res.render('us.jade', {'users': data});
    });
});

app.get('/oauth2callback', function(req, res){
        res.send(req.query.code);
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
