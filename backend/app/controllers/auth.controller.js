const db = require('../models');
const User = db.user;
const Roles = db.role;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../models');
require('dotenv').config();

exports.test = (req, res) => {
    return res.status(200).send({ message: "Halo saudara"});    
}
exports.getRoles = (req, res) => {
    Roles.find()
        .select({'name':1, '_id':0})
        .exec((err, roles) => {
            if(err) {
                res.status(500).send({ message: err});
                return;
            }

            if(!roles) {
                return res.status(404).send({ message: "Roles not found"});
            }
            console.log();         
            
            res.status(200).send(roles);
        })

};
exports.signUp = (req, res) => {    
    const user = new User({
        username: req.body.username,        
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.fullname 
    })

    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if(req.body.roles) {            
            //console.log("req.body.roles:" + req.body.roles);
            Roles.find(
                {
                    name: { $in: req.body.roles }                
                },
                (err, roles) => {
                    if (err){
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    //console.log(user);
                    user.save(err => {
                        if (err){
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!" })
                    });
                }
            );
        } else {
            //console.log("no role posted");
            Roles.find({ name: "user"}, (err, role) => {
                //console.log("role default:");                
                //console.log(role[0]);
                if (err){
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role[0]._id]
                console.log(user);
                
                user.save(err => {
                    if (err){
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" })
                });
            });
        }   
        
    });
    //res.status(200).send("auth signUp");
};

exports.signIn = (req, res) => {
    User.findOne({username: req.body.username})
        .populate("roles", "-__v")
        .exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err});
                return;
            }

            if(!user) {
                return res.status(404).send({ message: "Username not found"});
            }

            var passwordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // 1 day
                //expiresIn: 30
            })

            var authorities = [];

            for(let i = 0; i < user.roles.length; i++){
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send({
                id: user._id,
                fullname: user.name,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,                
            });
        });
    //res.status(200).send("auth signIn");
};
exports.updateToken = (req, res) => {
    //console.log(req.body);
    let token = req.body.accessToken;
    try {
        var decoded = jwt.verify(token, process.env.SECRET, {
            ignoreExpiration: true //handled by OAuth2 server implementation
        });
        var newtoken = jwt.sign({ id: decoded.id }, process.env.SECRET, {
            expiresIn: 86400 // 1 day
            //expiresIn: 30
        })
        //console.log(newtoken);
        return res.status(200).send({
            accessToken: newtoken,
            message: "tokenUpdated"
        });
    } catch (error) {
        console.log('error');
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Token!"
        });
        
    }
    //var decoded = jwt.decode(token, {complete: true});
    //const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    //res.status(200).send("halo");

}