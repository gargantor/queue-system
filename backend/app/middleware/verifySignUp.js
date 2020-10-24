const db = require('../models');
//const ROLES = db.ROLES;
const User = db.user;

checkInputSignup = (req, res, next) => {
    if(!req.body.username){
        res.status(400).send({ message: "Username is required"});
        return;
    }
    /*if(!req.body.email){
        res.status(400).send({ message: "Email is required"});
        return;
    }
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!req.body.email.match(mailformat)){
        res.status(400).send({ message: "Not valid email address"});
        return;        
    }*/
    if(!req.body.password){
        res.status(400).send({ message: "Password is required"});
        return;
    }
    if(req.body.password.length<3){
        res.status(400).send({ message: "Password length min 3 character"});
        return;        
    }
    next();

};
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            res.status(400).send({ message: "Failed! Username is already in use!"});
            return;
        }

        // Email
        if(req.body.email){
            User.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
        
                if(user) {
                    res.status(400).send({ message: "Failed! Email is already in use!"});
                    return;
                }
    
                next();
    
            });
        }else{
            next();
        }
        
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.leght; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkInputSignup,
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;