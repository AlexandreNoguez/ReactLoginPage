const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = require('../models/Users')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 40000,
    });
}

exports.registerNewUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send({ error: 'Invalid user name' })
        }
        if (!password) {
            return res
                .status(400)
                .send({ error: 'Invalid user description' })
        }

        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Already exists' })
        }
        const user = await User.create(req.body);
        user.password = undefined
        
        return res.send({ 
            user,
            token: generateToken({ loggedUser: user._id })
         })
    } catch (err) {
        return res.status(400).send({ error: 'Failed on registration' })
    }
}

exports.authenticateUser = async (req, res) => {
    try {
    const  { email, password }  = req.body;
    const user = await User.findOne({ email }).select('+password');
    console.log(user)
    if(!user){
        return res.status(400).send({ error: 'User and password do not match1' })
    }
    
    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).send({error: 'User and password do not match2'});
    }
    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user._id }),
        message: 'User logged in successfuly',
    });
} catch (err) {
    console.log(err)
    return res.status(400).send({error: 'User and password do not match3'});
}
}

exports.listAllUser = async (req, res) => {
    try {
        console.log(req.params)
        const users = await User.find()
        users.password = undefined

        return res.status(200).send(users)
    } catch (err) {
        return res.status(400).send({ error: 'Failed listing all' })
    }
}

exports.listOneUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId})
        user.password = undefined

        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send({ error: 'Failed listing by id' })
    }
}

exports.editUserRegister = async (req, res) => {
    try {
        const userId = req.params.id
        const { email, password } = req.body

        const userDetails = {
            email,
            password
        }
        if (!userId) {
            return res.status(422).send({ error: 'User not found' })
        }

        const updatedUser = await User.findByIdAndUpdate({
                _id: userId
            },
            userDetails,
            { new: true }
        )

        updatedUser.save(userId)
        return res.status(200).send({
            updatedUser,
            message: 'User details updated successfuly'
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed to update details' })
    }
}

exports.deleUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = User.findById({ _id: userId })

        if (!user) {
            return res.status(400).send({ error: 'Failed on delete by id' })
        }
        await User.findOneAndDelete({ _id: userId })

        user.password = undefined

        return res.status(200).send({ message: 'Removed successfuly' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed deleting by id' })
    }
}
