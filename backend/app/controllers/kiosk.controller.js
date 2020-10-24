const db = require('../models');
const execHelper = require('../helper/exec.helper');
const Sequence = db.sequence_ticket;
const Ticket = db.ticket;
const Service = db.service;

var app = require('express')();
//var io = require('../../socketio');
//app.set('io', io);

exports.allService = (req, res) => {
    Service.find({status: true})
        .lean()
        .exec((err, service)=>{
            //execHelper.findAllReturn(res, err, service, "Service not found");
            if(!service) {
                return res.status(404).send({ message: "Service not found"});
            }  
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            var showDefaultServiceKiosk = true;
            var defaultServiceKioskName = "Default Service";
            if(showDefaultServiceKiosk){
                var defaultService={
                    name: defaultServiceKioskName
                }
                service.push(defaultService);

            }
            
            //console.log(service);
            res.status(200).send(service);
        });
};

exports.makeTicket = async (req, res) => {
        Sequence.findOneAndUpdate(
            {service: req.body.serviceId},
            { $inc: { sequence_value: 1 } },
            {new: true}
        ).exec((err, sequence) => {
            //console.log('serviceID: ', req.body.serviceId);
            const io = req.app.get('io');
            //console.log("emiting newTicket with halo message");
            io.to('ticketing').emit("TicketCountUpdate","Queue Updated")
            if(err) {
                console.log("Error: ", err);
                res.status(500).send({ message: err});
                return;
            }
            if(!sequence){
                //console.log("no sequence service found");
                //console.log("serviceId: " + req.body.serviceId);
                newServiceSequence(res, req.body.serviceId);
                //res.status(200).send({message: 'no sequence found'});
                return;

            }else {
                //console.log("sequence found");  
                //console.log(sequence);
                createTicketDoc(res, sequence);
                
            }

        })
}
const newServiceSequence = (res, serviceId) => {
    Service.findById(serviceId).exec((err, service)=> {
        if(err){
            console.log("Error: ", err);
            res.status(500).send({ message: err});
            return;                        
        }
        if(!service){
            return res.status(404).send({ message: "Service not found"});                        
        }
        const newSequence = new Sequence({
            service: service,
            sequence_value: 1   
        })
        newSequence.save((err, newsequence) => {
            if(err) {
                console.log("Error: ", err);
                res.status(500).send({ message: err});
                return;
            }  
            createTicketDoc(res, newsequence);
            
        })
    });
}
const createTicketDoc = (res, sequence) => {
    const ticket = new Ticket({
        ticket_number: sequence.sequence_value,
        service: sequence.service,       
    })
    ticket.save((err, newTicket) => {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send({ message: err});
            return;
        }  
        //console.log(newTicket);        
        res.status(200).send(newTicket);
    })

}
const createTicketDocBU = async (sequence) => {
        const ticket = new Ticket({
        ticket_number: sequence.sequence_value,
        service: sequence.service,          
        })
    
        await ticket.save((err, newTicket) => {
            if(err) {
                console.log(err); 
                return err;
            }  
            console.log(newTicket);
            return newTicket      
        })
}