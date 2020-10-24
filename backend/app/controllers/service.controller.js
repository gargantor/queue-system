const db = require('../models')
const Service = db.service;
const execHelper = require('../helper/exec.helper');
const { service } = require('../models');

exports.all = (req, res) => {
    Service.find()
        .exec((err, service) => {
            execHelper.findAllReturn(res, err, service, "Service not found");
        });
};

exports.create = (req, res) => {
    console.log(req.body);
    const service = new Service({
        name: req.body.name,        
        status: req.body.status,        
    })

    service.save((err) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        res.send({ message: "Services was registered successfully!" })
    })

}

exports.findOne = (req, res) => {    
    Service.findOne({_id:req.params.id})
        .exec((err, service) => {
            //console.log("params:"  +req.params.id);
            if(!service) {
                return res.status(404).send({ message: "Service not found"});
            } 
            if(err) {
                console.log(err);
                res.status(500).send({ message: err});
                return;
            }
        
                    
            
            res.status(200).send(service);
            //execHelper.findAllReturn(res, err, service, "Service not found");
        })
}
exports.store = (req, res) => {    
    Service.findById(req.params.id, function(err, service){
        if(!service){
            res.status(404).send({ message: "Service not found"});
        } else {
            service.name= req.body.name;        
            service.status= req.body.status;            

            service.save().then(service => {
                res.send({ message: "Service was updated successfully!" })
            })
            .catch(err => {
                res.status(400).send({ message: 'Update not possible'});
            });
        }
    });    
}

exports.delete = (req, res) => {
    Service.findByIdAndDelete(req.params.id, function(err, service){
        if(!service){
            res.status(404).send({ message: "Service not found"});
        }
        if(err){
            res.status(400).send({ message: 'Delete not possible'})
        } else {
            res.send({ message: "Services was deleted successfully!" })            
        }
    });
    //res.send({ message: "Deleted" })    
}