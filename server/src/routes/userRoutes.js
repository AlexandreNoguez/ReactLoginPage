const express = require('express')
const routes = express.Router()

const authMiddleware = require('../middlewares/auth')


const {
    registerNewUser,
    authenticateUser,
    listAllUser,
    listOneUserById,
    editUserRegister,
    deleUserById
} = require('../controllers/userController')

routes.post('/', registerNewUser)
routes.post('/authenticate', authenticateUser)
routes.use(authMiddleware);
routes.get('/', listAllUser)
routes.get('/:id', listOneUserById)
routes.put('/:id', editUserRegister)
routes.delete('/:id', deleUserById)

module.exports = routes
