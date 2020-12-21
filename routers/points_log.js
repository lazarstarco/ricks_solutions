const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = require('../middleware/database')

router.get('/points_log', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }
    var sql = `SELECT * FROM points_log WHERE username = '${user.username}'`
    connection.query(sql, (error, result) => {
        if (error) throw error
        for (let i = 0; i < result.length; i++) {
            if (result[i].transaction === 'code') {
                result[i].condition = false
            } else {
                result[i].points *= -1
                result[i].condition = true
            }
        }
        res.render('points_log', { user, log: result })
    })
})

module.exports = router