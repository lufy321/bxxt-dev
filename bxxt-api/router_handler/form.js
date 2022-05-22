const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 新增报修
exports.addForm = (req, res) => {
    console.log(req.body)
    const sql = `INSERT INTO form_data (dormitory, name, tel, reportContent, message, imagesUrl, staus, createTime, repairsUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.query(sql, [req.body.dormitory, req.body.name, req.body.tel, req.body.reportContent, req.body.message, req.body.imagesUrl, req.body.staus, req.body.createTime, req.body.repairsUser], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '添加成功!',
            data: results,
        })
    })
}

// 更新报修
exports.updateForm = (req, res) => {
    console.log(req.body)
    const sql = `UPDATE form_data set endImagesUrl = ?, usedMaterial = ?, usedDetail = ?, endTime = ? where id = ?`
    db.query(sql, [req.body.endImagesUrl, req.body.usedMaterial, req.body.usedDetail, req.body.endTime, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '更新成功!',
            data: results,
        })
    })
}

// 展示表单
exports.selectForm = (req, res) => {
    console.log(req.query.staus + "状态");
    console.log(req.query.page);
    console.log(req.query.username);
    console.log(req.query.identity);
    // 管理员身份获取信息
    if (req.query.identity == 0) {
        switch (req.query.staus) {
            case "0":
                const sql = `select * from form_data where staus = ? ORDER BY createTime DESC`
                db.query(sql, req.query.staus, (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;

            case "1":
                const sql1 = `select * from form_data where staus = ? ORDER BY acceptTime DESC`
                db.query(sql1, req.query.staus, (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;

            case "2":
                const sql2 = `select * from form_data where staus = ? ORDER BY endTime DESC`
                db.query(sql2, req.query.staus, (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;
        }

    } else {
        // 普通用户身份获取信息

        switch (req.query.staus) {
            case "0":
                const sql = `select * from form_data where staus = ? and repairsUser = ? ORDER BY createTime DESC`
                db.query(sql, [req.query.staus, req.query.username], (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;

            case "1":
                const sql1 = `select * from form_data where staus = ? and repairsUser = ? ORDER BY acceptTime DESC`
                db.query(sql1, [req.query.staus, req.query.username], (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;

            case "2":
                const sql2 = `select * from form_data where staus = ? and repairsUser = ? ORDER BY endTime DESC`
                db.query(sql2, [req.query.staus, req.query.username], (err, results) => {
                    if (err) return res.cc(err)
                    let curpage = Number(req.query.page) //当前页，前端传的页码
                    let pagesize = 12 //每页显示的数量
                    let sumpage = Math.ceil(results.length / pagesize) //返一个总页码
                    if (curpage == '') {
                        //这里是前端未传参数默认返第一页数据
                        let data = results.splice(0, pagesize) //利用数组方法截取数据
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,

                        })
                    } else {
                        //这里是前端传参数返回的数据
                        let data = results.splice((curpage - 1) * 12, pagesize) //利用数组方法截取数据
                        console.log(data);
                        res.send({
                            sumpage: sumpage,
                            status: 200,
                            message: '获取用户基本信息成功！',
                            data: data,
                        })
                    }
                })
                break;
        }
    }
}

// 图片上传
exports.upImages = (req, res) => {
    const files = req.files
    res.send({
        status: 0,
        message: '上传照片成功！',
        data: files,
    })
}

// 按ID查询报修项
exports.getGoodsById = (req, res) => {
    console.log(req.params.id);
    const sql = `select * from form_data where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取失败')
        res.send({
            status: 0,
            messages: "获取报修信息成功!",
            data: results[0]
        })
    })
}

// 接单更新接单时间与接单人
exports.updateAcceptData = (req, res) => {
    const sql = `update form_data set acceptTime = ?, pickUser = ? where id = ?`
    db.query(sql, [req.body.acceptTime, req.body.pickUser, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            messages: "变更成功!",
            data: results
        })
    })
}

// 状态变更
exports.formStausChange = (req, res) => {
    console.log(req.params.id);
    const sql = `UPDATE form_data SET staus = ? WHERE id = ?`
    db.query(sql, [req.query.staus, req.query.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            messages: "变更成功!",
            data: results
        })
    })
}

// 获取选项卡数据异步处理
option = (type) => {
    return new Promise((resolve, reject) => {
        const sql = `select text, value from select_options where type = ?`;
        db.query(sql, type, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            let dataString = JSON.stringify(result);
            let data = JSON.parse(dataString);
            resolve(data)
        })
    })
}

// 获取选项卡列表
exports.getOption = async (req, res) => {
    const type = ['电气类', '洁具类', '门窗类', '家具类', '其他类']
    let list = []
    for (let i = 0; i < type.length; i++) {
        await option(type[i]).then(res => {
            let item = {
                text: type[i],
                value: i + 1,
                children: res
            }
            list.push(item)
        }).catch(err => {
            console.log("操作失败!");
        })
    }
    res.send({
        status: 0,
        messages: "获取成功!",
        data: list
    })
}

// 获取选项卡数据异步处理
materialOption = (type) => {
    return new Promise((resolve, reject) => {
        const sql = `select text, value from material_options where type = ?`;
        db.query(sql, type, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            let dataString = JSON.stringify(result);
            let data = JSON.parse(dataString);
            resolve(data)
        })
    })
}

// 获取材料选项数据
exports.getMaterialOption = async (req, res) => {
    const type = ['电气类', '洁具类', '门窗类']
    let list = []
    for (let i = 0; i < type.length; i++) {
        await materialOption(type[i]).then(res => {
            let item = {
                text: type[i],
                value: i + 1,
                children: res
            }
            list.push(item)
        }).catch(err => {
            console.log("操作失败!");
        })
    }
    res.send({
        status: 0,
        messages: "获取成功!",
        data: list
    })
}

// 获取根据地点获取楼层异步处理
siteOption = () => {
    return new Promise((resolve, reject) => {
        const sql = `select site from room_options GROUP BY site`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            let dataString = JSON.stringify(result).replace(/site/g, "text");
            let data = JSON.parse(dataString);
            resolve(data)
        })
    })
}

// 获取报修地点选项卡数据异步处理
buildingOption = (site) => {
    return new Promise((resolve, reject) => {
        const sql = `select buildingNo from room_options WHERE site = ?  GROUP BY buildingNo`;
        db.query(sql, site, async (err, result) => {
            if (err) {
                reject(err)
                return
            }
            let dataString = JSON.stringify(result).replace(/buildingNo/g, "text");
            let data = JSON.parse(dataString);
            resolve(data)
        })
    })
}

// 获取room数据异步处理
roomOption = (buildingNo, site) => {
    return new Promise((resolve, reject) => {
        const sql = `select text, value from room_options where buildingNo = ? and site = ?`;
        db.query(sql, [buildingNo, site], async (err, result) => {
            if (err) {
                reject(err)
                return
            }
            let dataString = JSON.stringify(result);
            let data = JSON.parse(dataString);
            resolve(data)
        })
    })
}

// 获取报修地点选项数据
exports.getSiteOption = async (req, res) => {
    let site = []
    let list = []
    let children = []

    await siteOption().then(res => {
        site = res
    }).catch(err => {
        console.log("site操作失败!");
    })
    for (let i = 0; i < site.length; i++) {
        await buildingOption(site[i]["text"]).then(async res => {
            for (let j = 0; j < res.length; j++) {
                await roomOption(res[j]["text"], site[i]["text"]).then(res1 => {
                    res[j].children = res1
                    res[j].value = i + "-" + j
                }).catch(err => {
                    console.log("操作失败!");
                })
            }
            list.push({
                text: site[i]["text"],
                value: i,
                children: res
            })
        }).catch(err => {
            console.log("building操作失败!");
        })
    }

    res.send({
        status: 0,
        messages: "获取成功!",
        data: list
    })
}

// 增加报修地点数据
exports.addbx = (req, res) => {
    ceng = ['1层', '2层', '3层', '4层', '5层', '6层']
    room = [
        ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '140', '142', '144', '146', '148', '150', '152'],
        ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241', '242', '244', '246', '248', '250', '252'],
        ['301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '340', '341', '342', '344', '346', '348', '350', '352'],
        ['401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429', '430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '444', '446', '448', '450', '452'],
        ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526', '527', '528', '529', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540', '541', '542', '544', '546', '548', '550', '552'],
        ['601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '631', '632', '633', '634', '635', '636', '637', '638', '639', '640', '641', '642', '644', '646', '648', '650', '652']
    ]
    const sql = `INSERT INTO room_options (site, buildingNo, text, value) VALUES ('建龙公寓', ?, ?, ?)`
    for (let i = 0; i < room.length; i++) {
        for (let j = 0; j < room[i].length; j++) {
            db.query(sql, [ceng[i], room[i][j], "gy-" + room[i][j]], (err, results) => {})
        }
    }
    res.send({
        status: '正常'
    })
}