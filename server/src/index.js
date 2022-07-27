const express = require('express')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const repositoriesRoutes = require('./routes/repositoriesRoutes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 3333;

//Routes
app.use('/api/user', userRoutes)
app.use('/api/user', repositoriesRoutes)

app.listen(port)
