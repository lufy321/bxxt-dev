const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    console.log(req.user.username);
    // 定义查询用户信息的 SQL 语句
    const sql = `select identity, username from user where username = ?`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0],
        })
    })
}

// 账户登出
exports.logOut = (req, res) => {
    res.send({
        status: 204,
        message: '登出成功',
    })
}