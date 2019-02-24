var express = require('express');
var load = require('consign');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(){
    var app = express();

    //environment variable
    app.set('port',3000);

    //middleware
    app.use(express.static('./public'));

    //body-parser fills req.body with params from POST method
    app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));
    app.use(bodyParser.json({limit: '100mb', extended: true}));
    app.use(methodOverride());

    //loading controllers and routes into app
    load({cwd:'app'})
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app);  
    return app;
};
