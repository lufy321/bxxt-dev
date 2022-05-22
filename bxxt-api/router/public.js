const express = require('express')
const router = express.Router()

const formHandler = require('../router_handler/public')

router.get('/getMaintainersData', formHandler.getMaintainersData)

module.exports = router