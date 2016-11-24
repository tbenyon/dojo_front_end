var express = require('express');
var app = express();
const dojo_db = require('./server/register/mySQL.js');
const favicon = require('serve-favicon');
const calendar = require("./server/google_calendar_api/calendarQueries.js");
var session = require('client-sessions');
var bodyParser = require('body-parser');
const crypto = require('crypto');
const utf8 = require('utf8');
const csrf = require('csurf');
const merchPopulate = require('./merchandiseAutopopulate.js');

app.use(favicon(__dirname + '/assets/images/favicon.ico'));

app.set('view engine', 'pug');
app.set('views', __dirname+'/assets/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static(__dirname + '/assets'));
app.use(session({
    cookieName: 'session',
    secret: process.env.dojo_session_secret,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    ephemeral: true
}));
app.use(csrf());

app.use(function (req, res, next) {
    if (req.session && req.session.user) {
        dojo_db.nickNameCheck(req.session.user.NickName).then(function (user) {
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = req.user;
                res.locals.user = req.user;
            }
            next();
        });
    } else {
        next();
    }
});

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

function hash(password) {
    const hash = crypto.createHash('sha512');
    hash.update(password + utf8.encode(process.env.dojo_hash_password_salt));
    return hash.digest('hex');
}

app.get('/', function(req, res) {
    calendar.listCalendarEvents().then(function (events) {
        res.render('index.jade', {dojoEvents: events});
    }).catch(function (err) {
        console.error("Couldn't retrieve calendar.\n", err);
        res.render('index.jade');
    });
});

app.get('/login', function(req, res){
    if (req.session && req.session.user) {
        req.session.reset();
    }
    res.render('login.jade', {csrfToken: req.csrfToken()});
});

app.post('/login', function(req, res){
    dojo_db.login(req.body.nickName, hash(req.body.password)).then(function (data) {
        if (typeof data === "undefined") {
            res.render('login.jade', {csrfToken: req.csrfToken(), 'error': "Username or Password not found."});
        } else if (data.UserType !== "Mentor") {
            res.render('login.jade', {csrfToken: req.csrfToken(), 'error': "Only mentors can login!"});
        } else {
            req.session.user = data;

            res.redirect('/mentor');

        }

    }).catch(function (err) {
        console.log(err);
        console.error("Failed to login.");
        res.send(err);
    });
});

app.get('/merchandise', function(req, res){
    var item = req.param('item');
    if (!item) {
        res.render('merchandise.jade');
    } else {
        var data = merchPopulate.getAutocompleteData(item);
        data.item = item;
        res.render('merchandise.jade', {csrfToken: req.csrfToken(), data: data});
    }

});

app.post('/merchandise/add', function(req, res){
    console.log(req.body);
    res.render('merchandise.jade', {csrfToken: req.csrfToken()});
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

app.get('/mentor', requireLogin, function(req, res){
    Promise.all([dojo_db.getDojoAttendance(), dojo_db.getAttendanceTopScores()]).then(function (data) {
        res.render('mentorDashboard.jade', {
            attendanceTopScoresData: data[1],
            attendanceData:
                {
                    all: data[0][0],
                    student: data[0][1],
                    mentor: data[0][2]
                }
        });
    }).catch(function (err) {
        console.error("Error getting attendance data.\n" + err);
        res.render('mentorDashboard.jade');
    });

});

app.get('/mentor/register', requireLogin, function(req, res){
    dojo_db.getUsers("register").then(function (data) {
        res.render('register.jade', {'users': data});
    });
});

app.get('/mentor/registerDetailed', requireLogin, function(req, res){
    dojo_db.getUsers("registerDetailed").then(function (data) {
        res.render('register.jade', {'users': data});
    });
});

app.get('/mentor/logout', function(req, res){
    if (req.session && req.session.user) {
        req.session.reset();
    }
    res.redirect('/');
});

app.get('/members', function(req, res){
    dojo_db.getUsers("members").then(function (data) {
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
