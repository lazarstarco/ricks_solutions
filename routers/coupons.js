const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = require('../middleware/database')

router.get('/coupons', (req, res) => {
    const sql = `SELECT * FROM coupons`
    connection.query(sql, (error, result) => {
        if (error) throw error
        var user = { username: req.query.username, points: req.query.points }
        res.render('coupons', { coupon: result, user })
    })
})

router.post('/coupons', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }

    var sql = `INSERT INTO points_log (username, transaction, date, time, event, points) VALUES (
            '${req.body.username}', 
            '${req.body.transaction}', 
            '${req.body.date}', 
            '${req.body.time}', 
            ${req.body.event === null ? null : "'" + req.body.event + "'"}, 
            ${req.body.points}
            )`
    connection.query(sql, (error, result) => {
        if (error) throw error
        sql = `UPDATE users SET points = points - ${req.body.points} WHERE username = '${req.body.username}'`
        connection.query(sql, (error, result) => {
            if (error) throw error
            res.redirect(`/events?username=${req.body.username}`)
        })
    })
})


module.exports = router
