const db = require('../models')
const Counter = db.counter;
const User = db.user;
const execHelper = require('../helper/exec.helper');

exports.all = (req, res) => {
    Counter.find()
        //.populate("user services", "user.username services.name")
        //.populate("user services")
        .populate("user", "username")
        .populate("services", "name")
        .exec((err, counter) => {
            execHelper.findAllReturn(res, err, counter, "Counter not found");
        });
};
exports.create = (req, res) => {
    //console.log(req.body);
    const counter = new Counter({
        counter_code: req.body.counter_code,
        name: req.body.name,  
        status: req.body.status, 
        services: req.body.services         
    })

    counter.save((err) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        res.send({ message: "Counter was registered successfully!" })
    })

}

exports.findOne = (req, res) => {    
    Counter.findOne({_id:req.params.id})
        .exec((err, counter) => {            
            if(!counter) {
                return res.status(404).send({ message: "Counter not found"});
            } 
            if(err) {
                console.log(err);
                res.status(500).send({ message: err});
                return;
            }
            res.status(200).send(counter);            
        })
}

exports.store = (req, res) => {  
    //console.log(req.params);  
    //res.send({ message: "Halo"});
    Counter.findById(req.params.id, function(err, counter){
        if(!counter){
            res.status(404).send({ message: "Counter not found"});
        } else {
            counter.counter_code= req.body.counter_code;
            counter.name= req.body.name;        
            counter.status= req.body.status;  
            counter.services= req.body.services
            

            counter.save().then(counter => {
                res.send({ message: "Counter was updated successfully!" })
            })
            .catch(err => {
                res.status(400).send({ message: err});
            });
        }
    });
}

exports.delete = (req, res) => {
    Counter.findByIdAndDelete(req.params.id, function(err, counter){
        if(!counter){
            res.status(404).send({ message: "Counter not found"});
        }
        if(err){
            res.status(400).send({ message: 'Delete not possible'})
        } else {
            res.send({ message: "Counter was deleted successfully!" })            
        }
    });   
}

exports.availableDesk = (req, res) => {
    Counter.find({user: null, status: true})
    .exec((err, counter) => {
        execHelper.findAllReturn(res, err, counter, "Counter not found");
    });
    //res.send({message: "available desk!"})
}
exports.selectDesk =(req, res) => {
    Counter.findOne({_id:req.body.deskId, status: true})
        .exec((err, counter) => {
            if(!counter){
                res.status(404).send({ message: "Counter not found"});
            }
            User.findOne({_id: req.userId})
            .exec((err, user) => {
                if(!user){
                    res.status(404).send({ message: "User not found"});                    
                }
                counter.user = user;
                counter.save().then(response => {
                    res.send({ message: "Desk selected!", counter  })
                })
                .catch(err => {
                    res.status(400).send({ message: 'Desk Select not posible!'});
                });
            })
        })

    //res.send({message: req.userId})
}
exports.checkChosenDesk = (req, res) => {
    Counter.findOne({user: req.userId})
        .exec((err, counter) => {
            if(!counter) {
                return res.status(202).send({ message: "not choose desk yet"});
            }  
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            res.status(200).send({message: "Desk selected!", counter});
        });
}
exports.closeDesk = (req, res) => {
    Counter.updateMany({user: req.userId}, { $unset: {"user": ""} })
    .exec((err, counter) => {
        if(!counter){
            res.status(404).send({ message: "Counter not found"});
        }
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        //console.log(counter);
        res.send({ message: "Desk closed!"  })
    });
}