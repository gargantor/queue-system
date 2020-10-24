const db = require('../models');
const User = db.user;
const Roles = db.role;

const bcrypt = require('bcryptjs');
const execHelper = require('../helper/exec.helper')

exports.all = (req, res) => {
    User.find()
        .populate({path: 'roles', select: {'name': 1, '_id': 0}})
        .select({'password': 0})
        .exec((err, user) => {
            //console.log(user);
            execHelper.findAllReturn(res, err, user, "Username not found");
        })
};
exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,        
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })
    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if(req.body.roles) {                        
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
            Roles.find({ name: "user"}, (err, role) => {
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
    //res.send({ message: "Create!" })  
}
exports.findOne = (req, res) => {
    User.findOne({_id:req.params.id})
        .select({'password': 0})
        .populate({path: 'roles', select: {'name': 1, '_id': 0}})        
        //.populate({'roles.name', 'name'})
        //.populate('roles')
        //.populate('theroles')
        .lean()
        .exec((err, user) => {            
            if(!user) {
                return res.status(404).send({ message: "User not found"});
            } 
            if(err) {
                console.log(err);
                res.status(500).send({ message: err});
                return;
            }
            var temp = []           
            user.roles.map((role)=>{
                temp.push(role.name);
            })
            user.roles = temp;
            
            //console.log(user);            
            res.status(200).send(user);            
        })
    //res.send({ message: "find!" }) 
    

}
exports.store = (req, res) => {  
    User.findById(req.params.id, function(err, user){
        if(!user){
            res.status(404).send({ message: "User not found"});
        } else {
            user.name= req.body.name,
            user.email= req.body.email,
            user.address= req.body.address
            

            user.save((err) => {
                if(err) {
                    res.status(500).send({ message: err});
                    return;
                }
                if(req.body.roles && req.body.roles.length > 0) {  
                    //console.log("Roles:", req.body.roles.length  );                      
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
        
                                res.send({ message: "User was updated successfully!" })
                            });
                        }
                    );
                } else { 
                    //console.log("no Roles:", req.body.roles );                                 
                    Roles.find({ name: "user"}, (err, role) => {
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
        
                            res.send({ message: "User was updated successfully!" })
                        });
                    });
                }   
                
            });
        }
    });  
    //res.send({ message: "store!" })  
}
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id, function(err, user){
        if(!user){
            res.status(404).send({ message: "User not found"});
        }
        if(err){
            res.status(400).send({ message: 'Delete not possible'})
        } else {
            res.send({ message: "User was deleted successfully!" })            
        }
    });
}
exports.getProfile = (req, res) => {
    User.findOne({_id:req.body.id})
        .select({'password': 0})          
        .exec((err, user) => {            
            if(!user) {
                return res.status(404).send({ message: "User not found"});
            } 
            if(err) {
                console.log(err);
                res.status(500).send({ message: err});
                return;
            }                        
            res.status(200).send(user);            
        })
    //res.send({ message: "find!" }) 
    

}

exports.profileUpdate = (req, res) => { 
    User.findById(req.body.id, function(err, user){
        if(!user){
            res.status(404).send({ message: "User not found"});
        } else {
            user.name= req.body.name,
            user.email= req.body.email,
            user.address= req.body.address

            user.save().then(service => {
                res.send({ message: "Profile was updated successfully!" })
            })
            .catch(err => {
                res.status(400).send({ message: 'Update not possible'});
            });
        }
    })
    
}
exports.passwordUpdate = (req, res) => { 
    User.findById(req.body.id, function(err, user){
        if(!user){
            res.status(404).send({ message: "User not found"});
        } else {
            user.password= bcrypt.hashSync(req.body.password, 8)            

            user.save().then(service => {
                res.send({ message: "Password was updated successfully!" })
            })
            .catch(err => {
                res.status(400).send({ message: 'Update not possible'});
            });
        }
    })
    
}