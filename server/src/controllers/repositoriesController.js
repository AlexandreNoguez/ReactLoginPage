const User = require('../models/Users');
const Repository = require('../models/Repository');

exports.registerNewRepository = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, url } = req.body;
        
        const user = await User.findById(user_id)
        console.log('user', user)
        console.log('name', name)
        // if(!user) return res.status(404).send()
        
        const repository = await Repository.findOne({
            userId: user_id,
            url,
            
        })
        console.log('repository', repository)

        const newRepository = await Repository.create({
            userId: user_id,
            name,
            url
        })
        // if(user && name && url){
        //     console.log('if DENTRO', user, url)
        //     return res.status(422).send({ message: `Repository ${name} already exists`})
        // }
        // console.log(newRepository)
        // user.password = undefined
        // user.password2 = undefined
        return res.status(201).send(newRepository)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed creating repository' })
    }
}

// exports.authenticateUser = async (req, res) => {
//     try {
//     const  { email, password }  = req.body;
//     const user = await User.findOne({ email }).select('+password');
    
//     if(!user){
//         return res.status(400).send({ error: 'User and password do not match' })
//     }
    
//     if(!(await bcrypt.compare(password, user.password))){
//         console.log('depois do b', password)
//         return res.status(400).send({error: 'User and password do not match'});
//     }
//     // user.password = undefined;

//     res.send({ 
//         user, 
//         token: generateToken({ id: user._id }),
//         message: 'User logged in successfuly',
//     });
// } catch (err) {
//     console.log(err)
//     return res.status(400).send({error: 'User and password do not match'});
// }
// }



// exports.listAllUser = async (req, res) => {
//     try {
//         const { user_id } = req.params;

//         const users = await User.find()
//         users.password = undefined

//         return res.status(200).send(users)
//     } catch (err) {
//         return res.status(400).send({ error: 'Failed listing all' })
//     }
// }

exports.listUserRepositories = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { q } = req.query
        const user = await User.findById(user_id)
        if(!user) {
            return res.status(404).send()
        }
        
        let query = {};

        if(q){
            query = {url: { $regex: q }}
        }
        const repositories = await Repository.find({
            userId: user_id,
            ...query
        })
        user.password = undefined
        user.password2 = undefined
        return res.status(200).send(repositories)
    } catch (err) {
        return res.status(400).send({ error: 'Failed listing by id' })
    }
}

// exports.editUserRegister = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const { email, password } = req.body

//         const userDetails = {
//             email,
//             password
//         }
//         if (!userId) {
//             return res.status(422).send({ error: 'User not found' })
//         }

//         const updatedUser = await User.findByIdAndUpdate({
//                 _id: userId
//             },
//             userDetails,
//             { new: true }
//         )

//         updatedUser.save(userId)
//         return res.status(200).send({
//             updatedUser,
//             message: 'User details updated successfuly'
//         })
//     } catch (err) {
//         console.log(err)
//         return res.status(400).send({ error: 'Failed to update details' })
//     }
// }

exports.deleteRepositoryById = async (req, res) => {
    try {
        const { user_id, id } = req.params
        const user = await User.findById(user_id)
        if(!user){
            return res.status(404).send()
        }
        
        const repository = await Repository.findOne({
            userId: user_id,
            id
        })
        
        if(!repository){
            return res.status(404).send()
        }
        
        await Repository.findOneAndDelete({ _id: id })

        return res.status(200).send({ message: 'Removed successfuly' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed deleting by id' })
    }
}
