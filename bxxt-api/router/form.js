const express = require('express')
const router = express.Router()
const multer = require('multer')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/upload') // 保存的路径
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳 + 后缀名
        let fileFormat = (file.originalname).split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage: storage })

const formHandler = require('../router_handler/form')

router.get('/selectForm', formHandler.selectForm)

router.post('/addForm', formHandler.addForm)

router.post('/upLoad', upload.array('images', 10), formHandler.upImages)

router.get('/goods/:id', formHandler.getGoodsById)

router.get('/stausChange', formHandler.formStausChange)

router.get('/getOption', formHandler.getOption)

router.post('/updateForm', formHandler.updateForm)

router.get('/getMaterialOption', formHandler.getMaterialOption)

router.post('/updateAcceptData', formHandler.updateAcceptData)

router.get('/getSiteOption', formHandler.getSiteOption)

router.get('/addbx', formHandler.addbx)

module.exports = router


