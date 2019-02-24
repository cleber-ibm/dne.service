module.exports = function(app){
    var controller = {};
    var Cep = app.models.cepmodel;

    controller.getCep = function(req,res){
        Cep.find({_id: new RegExp('^'+req.params.id)}, function(error,ceps){
            if(error){
                res.status(500).end();
                console.log(error);
            }else{
                if(ceps.length == 0){    
                                  
                    res.status(400).json({message:'Cep não encontrado'});
                }else{
                    res.json(ceps);
                }              
                
            }
        });
    };

    controller.search = function(req,res){

        var regex = new RegExp(req.params.term,'i');
        Cep.find({estado:req.params.estado,$or:[{lograd: regex},{bairro:regex},{cidade:regex}]}, function(error,ceps){
            if(error){
                res.status(500).end();
                console.log(error);
            }else{
                res.json(ceps);
            }
        });
    };

    controller.save = function(req,res){
        var cep = new Cep(req.body);

        Cep.updateOne({
            _id:cep._id
        },cep,
            {
                upsert: true,
                new: true,
                overwrite: true // works if you comment this out
            },
            function(erro, cep){
                if(erro){
                    res.status(500).end();
                    console.log(erro);
                }else{
                    res.json(cep)
                }
            }
        );
    };

    controller.addDocuments = async function(req,res){
        let docs = req.body;

        const bulk = Cep.collection.initializeOrderedBulkOp();

        for (let index = 0; index < docs.length; index++) {
            const doc = new Cep(docs[index]);
            bulk.insert(doc);  
        }
        
        try {

           
            let result = await bulk.execute();

            if(result){
                res.json(result);
                res.status(200).end();
                console.log(result);
            }   
         
            
        } catch (error) {
            res.status(500).end();
            console.log(erro);
        }          
    };

    return controller;
};