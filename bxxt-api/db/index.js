const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'zhengchao0918',
    database: 'ssbx'
})

module.exports = db