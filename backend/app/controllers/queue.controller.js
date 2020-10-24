const { ticket } = require('../models');
const db = require('../models');
const Ticket = db.ticket;
const Counter = db.counter;

exports.queueCount = async(req, res) => {
    var serviceExist = req.body.services.length>0
    var serviceQuery = {
        $exists: serviceExist,        
        $in: req.body.services
                 
    }
    if(!serviceExist){
        serviceQuery = {
            $exists: false
        }
    }
    
    const waitingCount = await Ticket.countDocuments({        
        service: serviceQuery,
        status: "waiting"})
    const missedCount = await Ticket.countDocuments({        
        service: serviceQuery,
        status: "missed"})
    Promise.all([waitingCount, missedCount]).then((value1, value2) => {
        //console.log(waitingCount, missedCount);
        res.send({waitingCount, missedCount})
      });
    
    /*
    Ticket.countDocuments({        
        service: serviceQuery,
        status: "waiting"})
    .exec((err, ticket) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if(!ticket) {
            return res.status(200).send("0");
        }  
        
        //console.log(ticket.length);
        res.status(200).send(ticket.toString());
    });
    */
        
}
exports.getCurrentTicket = (req, res) => {
    Ticket.findOne({        
        counter: req.body.deskID,
        status: "process"})
    .sort('updatedAt')
    .exec((err, ticket) =>{
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if(!ticket) {
            res.status(204).send({});
            return;
        }
        res.send(ticket);
    })
    //res.status(200).send("halo");

}

exports.nextCall = (req, res) => {
    var currentTicket = req.body.currentTicket;
    //var theCurrentTicket = null;
    if(currentTicket){
        Ticket.findById(currentTicket)
        .exec((err, ticket) => {
            ticket.status="done";            
            ticket.timeDone= Date.now();
            ticket.save();
        })     
    }
    var serviceExist = req.body.services.length>0
    var serviceQuery = {
        $exists: serviceExist,        
        $in: req.body.services
                 
    }
    if(!serviceExist){
        serviceQuery = {
            $exists: false
        }
    }
    Ticket.findOne({        
        service: serviceQuery,
        status: "waiting"})
    .sort('updatedAt')
    .exec((err, ticket) => {         
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if(!ticket) {
            return res.status(200).send({message: "no ticket available"});
        } 

        ticket.status= "process"; 
        Counter.findById(req.body.deskID)
        .exec((err, counter) => {
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            ticket.counter = counter;  
            ticket.save().then(response => {
                res.status(200).send(ticket);
            })
            .catch(err => {
                res.status(400).send({ message: 'Update not possible'});
            });          
        })
        
        
        
    });
}
exports.setDone = (req, res)=> {    
    Ticket.findById(req.body.currentTicket)
        .exec((err, ticket) => {
            ticket.status="done";            
            ticket.timeDone= Date.now();
            ticket.save().then((ticket)=>{
                res.status(200).send(ticket);
            })            
        })
}
exports.setMissed = (req, res)=> {    
    Ticket.findById(req.body.currentTicket)
        .exec((err, ticket) => {
            ticket.status="missed";            
            
            ticket.save().then((ticket)=>{
                res.status(200).send(ticket);
            })            
        })
}

