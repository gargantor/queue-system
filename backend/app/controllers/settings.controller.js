const db = require('../models');
const Sequence = db.sequence_ticket;

exports.resetCounter = (req, res) => {
    Sequence.updateMany({}, { $set: { sequence_value: 0 }} )
        .exec((err, result)=>{
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            console.log(result);
            res.send({ message: "Ticket Count Reseted!" })
        }); 
}
exports.getCounter = (req, res) => {
    Sequence.find()
        .populate("service", "name")
        .exec((err, sequence)=>{
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            console.log(sequence);  
            res.send(sequence);
        })

}