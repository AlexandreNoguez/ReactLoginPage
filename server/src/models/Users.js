const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        surname: {
            type: String,
            require: true
        },
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
        },
        password2: {
            type: String,
            require: true
        }
    }, { timestamps: true });

UsersSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.password, 10);
    const hash2 = await bcrypt.hash(this.password2, 10);
    this.password = hash;
    this.password2 = hash2;

    next();
});

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
