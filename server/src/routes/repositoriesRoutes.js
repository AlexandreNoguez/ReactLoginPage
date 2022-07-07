const express = require('express')
const routes = express.Router()

const authMiddleware = require('../middlewares/auth')

const {
    registerNewRepository,
    listUserRepositories,
    deleteRepositoryById
} = require('../controllers/repositoriesController')

routes.use(authMiddleware);
routes.post('/:user_id/repositories', registerNewRepository)
routes.get('/:user_id/repositories', listUserRepositories)
routes.delete('/:user_id/repositories/:id', deleteRepositoryById)
// routes.put('/:id', editUserRegister)
// routes.get('/', listAllUser)

module.exports = routes
