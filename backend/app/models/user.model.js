const mongoose = require('mongoose');

const UserChema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: String,
    password: String,        
    name: String,
    address: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]   
}, {timestamps: true})


UserChema.virtual('theroles', {
    ref: 'Role', // The model to use
    localField: 'username', // Find people where `localField`
    foreignField: 'name', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
    //options: { select: 'name -_id' } // Query options, see http://bit.ly/mongoose-query-options
    options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });

const User = mongoose.model("User", UserChema);

module.exports = User;