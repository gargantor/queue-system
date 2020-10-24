const db = require('../models');
const Counter = db.counter;
checkDuplicateCounterCode = (req, res, next) => {
    //console.log(req.body);
    Counter.findOne({
        counter_code: req.body.counter_code
    }).exec((err, counter) => {
        //console.log(counter);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(counter) {
            if(req.params.id != counter.id){
                //console.log('different id');
                res.status(400).send({ message: "Failed! Code is already in use!"});
                return;
            }            
            
        }
        next();
    });

}
const verifyCounter = {
    checkDuplicateCounterCode
};

module.exports = verifyCounter;