var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        _id:{
            type: String,
            required: true,
           // trim: true,
           minlength:8,
           maxlength:8
        },
        tipo_logr: {
            type: String
        },
        lograd: {
            type: String
        },
        bairro:{
            type: String
        },
        cidade:{
            type: String
        },
        estado:{
            type: String
        },
        logrcompl:{
            type: String
        },
        dcod:{
            type: String
        },
        complem:{
            type: String
        },
        cep_calc:{
            type: String
        }
    });

    schema.virtual('cep').get(function(){
        return this._id;
    })
    .set(function(v){
        this._id = v;
    });

    return mongoose.model('Cep', schema);
}