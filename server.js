var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    middleware = require('./middeware');
 
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var options = {
    useMongoClient: true
};
mongoose.connect('mongodb://localhost/Tododb', options);

// Deploy URI
// mongoose.connect('mongodb://gilles:poitou@ds239127.mlab.com:39127/tododb', options);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Enable CORS (Cross-origin resource sharing)
// for allowing requests from other ports
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); //Add other headers used in your requests
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

var routes = require('./api/routes/todoListRoutes');
routes(app); //register the routes

app.listen(port);

app.use(middleware);

console.log('todo list RESTFul API server started on : ' + port);