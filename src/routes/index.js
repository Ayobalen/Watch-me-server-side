const { router } = require('express')
const userRoutes = require('./user')


const router = new Router()
router.use('/', userRoutes);