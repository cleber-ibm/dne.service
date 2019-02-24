var http = require('http');
var app = require('./config/express')();
require('./config/database')(process.env.DNE_DB);

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening to port '+app.get('port'));
});