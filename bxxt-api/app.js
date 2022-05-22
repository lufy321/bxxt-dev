const express = require('express')
const app = express()
const form_router = require('./router/form')
const user_router = require('./router/user')
const userInfo_router = require('./router/userInfo')
const public_router = require('./router/public')
const bodyParser = require('body-parser')
const joi = require('joi')

// 导入cors中间件
const cors = require('cors')
const net = require("net");

// 将cors注册为全局中间件
app.use(cors({
    origin: ['http://nxbx.ejianlong.com:8086'], //可设置多个跨域域名
    credentials: true //允许客户端携带验证信息
}))


// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({
    extended: false
}))

// json解析中间件
app.use(bodyParser.json())

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 导入配置文件
const config = require('./config')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use("/my", expressJWT({
    secret: config.jwtSecretKey
}))

app.use('/assets', express.static(__dirname + '/assets'))
app.use('/', express.static(__dirname + "/web"))

app.use('/my', form_router)
app.use('/api', user_router)
app.use('/my', userInfo_router)
app.use('/api', public_router)


app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})