const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

exports.getMaintainersData = (req, res) => {
    const sql = `select * from maintainers`
    db.query(sql, req.body.type, (err,  results) => {
        res.send({
            status: 0,
            messages: "获取成功!",
            data: results
        })
    })
}