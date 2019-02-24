var mongoose = require('mongoose');

module.exports = function(uri){
    mongoose.connect(uri,{server:{poolSize:15, useNewUrlParser:true }});

    mongoose.connection.on('connected',function(){
        console.log('Mongoose! Connected.');
    });

    mongoose.connection.on('disconnected',function(){
        console.log('Mongoose! Disconnected.');
    });

    mongoose.connection.on('error',function(error){
        console.log('Mongoose! Connection error: '+error);
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose! Connection closed by application');

            process.exit(0);
        });
    });
}