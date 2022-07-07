const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            index:{
                unique: true
            }
        },
        password: {
            type: String,
            require: true
        }
    }, { timestamps: true });

UsersSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
