const express = require('express')
const router = express.Router()

const formHandler = require('../router_handler/userInfo')

router.post('/logOut', formHandler.logOut)

router.get('/getUserInfo', formHandler.getUserInfo)

module.exports = router