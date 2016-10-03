var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));
app.use(session({
    secret: 'asldjfhaksjdfhkjasdhf',
    proxy: true,
    cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.get('/', function (req, res) {
    var sess = req.session
    if (sess.loggedIn) {
        res.sendFile(__dirname + '/pages/information.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/pages/login.html');
});

app.post('/login', function(req, res) {
    if (!req.body.password
        || req.body.password.toLowerCase().replace(/[ ]/g, '') != 'universalpassword') {
            res.sendFile(__dirname + '/pages/loginWithError.html');
        } else {
            var sess = req.session;
            sess.loggedIn = true;
            res.redirect('/');
        }
});

app.post('/protected-endpoint', function(req, res) {
    var sesh = req.session;
    if (sesh.loggedIn) {
        if (!req.body.param1 || !req.body.param2) {
            res.status(401).send();
        } else {
            res.send('worked fine m8');
        }
    } else {
        res.status(403).send();
    }
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
