const express = require('express')
const path = require('path')
const formidable = require('formidable')
const fs = require('fs')
const {json,getNowTime} = require('./module/tools')
const db = require('./module/db')
const upPic = require('./module/upPic')
const app = express()
app.use(express.static(path.resolve(__dirname, '../manage')))
app.use(express.static(__dirname + "/upload"))
app.use(express.static(path.resolve(__dirname, '../site')))
app.post('/adv', (req, res) => {
    upPic(req,'advPic',({code,msg,params}) => {
        if (code === 1) {
            db.insertOne('advList', {
                advTitle: params.advTitle,
                advType: params.advType / 1,
                advPic: params.newPicName,
                orderBy: params.orderBy / 1,
                advHref: params.advHref,
                addTime: getNowTime(),
                upTime: getNowTime()
            }, err => {
                !err ? json(res, 1, '添加广告图成功') : json(res)
            })
        } else {
            json(res)
        }
    })
})
// 获取
app.get('/adv', (req, res) => {
    let pageIndex = req.query.pageIndex / 1
    const limit = 3
    let pageSum = 1
    let advType = req.query.advType / 1
    let keyword = req.query.keyword
    const whereObj = {}
    if (advType > 0) whereObj.advType = advType
    if (keyword) whereObj.keyword = new RegExp(keyword)
    db.count('advList', whereObj, count => {
        pageSum = Math.ceil(count / limit)
        if (pageSum < 1) pageSum = 1
        if (pageIndex < 1) pageIndex = 1
        if (pageIndex > pageSum) pageIndex = pageSum
        db.find('advList', {
            limit,
            skip: (pageIndex - 1) * limit,
            whereObj,
            sort: {
                orderBy: -1,
                addTime: -1
            }
        }, (err, advList) => {
            !err ? res.json({
                code: 1,
                msg: '成功',
                advList,
                pageIndex,
                pageSum
            }) : json(res)
        })
    })
})
app.get('/adv/:id', (req, res) => {
    const id = req.params.id
    db.findOneById('advList', id, (err, advInfo) => {
        !err ? res.json({
            code: 1,
            msg: '查找成功',
            advInfo
        }) : json(res)
    })
})
app.put('/adv', (req, res) => {
    upPic(req,'advPic',({code,params,msg}) => {
        if (code === 2) json(res,0,msg)
        else {
            const $set = {
                advTitle: params.advTitle,
                advType: params.advType / 1,
                orderBy: params.orderBy / 1,
                advHref: params.advHref,
                upTime: getNowTime()
            }
            if (params.newPicName) $set.advPic = params.newPicName
            db.upDateOneById('advList', params.id, {$set}, err => !err ? json(res, 1, msg) : json(res))
        }
    })
})
app.get("/adv/:advType/:limit", (req, res) => {
    const advType = req.params.advType / 1; // 广告类别
    const limit = req.params.limit / 1; // 指定的条数
    db.find("advList", {
        whereObj: {
            advType
        },
        limit,
        sort: {
            orderBy: -1,
            addTime: -1
        }
    }, (err, advList) => {
        if (err) json(res);
        else {
            res.json({
                code: 1,
                msg: "成功",
                advList
            })
        }
    })
})
app.post('/good', (req, res) => {
    upPic(req,'goodPic',({code,msg,params}) => {
        if (code === 1) {
            db.insertOne('goodList', {
                goodTitle: params.goodTitle,
                goodType: params.goodType / 1,
                goodPic: params.newPicName,
                orderBy: params.orderBy / 1,
                goodHref: params.goodHref,
                addTime: getNowTime(),
                upTime: getNowTime()
            }, err => {
                !err ? json(res, 1, '添加广告图成功') : json(res)
            })
        } else {
            json(res)
        }
    })
})
// 获取
app.get('/good', (req, res) => {
    let pageIndex = req.query.pageIndex / 1
    const limit = 3
    let pageSum = 1
    let goodType = req.query.goodType / 1
    let keyword = req.query.keyword
    const whereObj = {}
    if (goodType > 0) whereObj.goodType = goodType
    if (keyword) whereObj.keyword = new RegExp(keyword)
    db.count('goodList', whereObj, count => {
        pageSum = Math.ceil(count / limit)
        if (pageSum < 1) pageSum = 1
        if (pageIndex < 1) pageIndex = 1
        if (pageIndex > pageSum) pageIndex = pageSum
        db.find('goodList', {
            limit,
            skip: (pageIndex - 1) * limit,
            whereObj,
            sort: {
                orderBy: -1,
                addTime: -1
            }
        }, (err, goodList) => {
            !err ? res.json({
                code: 1,
                msg: '成功',
                goodList,
                pageIndex,
                pageSum
            }) : json(res)
        })
    })
})
app.get('/good/:id', (req, res) => {
    const id = req.params.id
    db.findOneById('goodList', id, (err, goodInfo) => {
        !err ? res.json({
            code: 1,
            msg: '查找成功',
            goodInfo
        }) : json(res)
    })
})
app.put('/good', (req, res) => {
    upPic(req,'goodPic',({code,params,msg}) => {
        if (code === 2) json(res, 0, msg)
        else {
            const $set = {
                goodTitle: params.goodTitle,
                goodType: params.goodType / 1,
                orderBy: params.orderBy / 1,
                goodHref: params.goodHref,
                upTime: getNowTime()
            }
            if (params.newPicName) $set.goodPic = params.newPicName
            db.upDateOneById('goodList', params.id, {
                $set
            }, err => !err ? json(res, 1, msg) : json(res))
        }
    })
})
app.get("/good/:goodType/:limit", (req, res) => {
    const goodType = req.params.goodType / 1; // 广告类别
    const limit = req.params.limit / 1; // 指定的条数
    db.find("goodList", {
        whereObj: {
            goodType
        },
        limit,
        sort: {
            orderBy: -1,
            addTime: -1
        }
    }, (err, goodList) => {
        if (err) json(res);
        else {
            res.json({
                code: 1,
                msg: "成功",
                goodList
            })
        }
    })
})
app.listen(80, () => {
    console.log('Listening on port 80!')
})