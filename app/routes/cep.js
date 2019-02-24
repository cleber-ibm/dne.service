module.exports = function(app){
    var controller = app.controllers.cep;
    
    app.route('/cep/:id')
    .get(controller.getCep);

    app.route('/cep/search/:estado/:term')
    .get(controller.search);

    app.route('/cep')
    .post(controller.save);

    app.route('/cep/bulk')
    .post(controller.addDocuments);
};