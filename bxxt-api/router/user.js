const express = require('express')
const router = express.Router()

const formHandler = require('../router_handler/user')

router.post('/login', formHandler.login)

router.post('/register', formHandler.register)

module.exports = router