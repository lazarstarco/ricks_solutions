const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = require('../middleware/database')

router.get('/events', (req, res) => {
    var sql = `SELECT points FROM users WHERE username = '${req.query.username}'`
    connection.query(sql, (error, result) => {
        if (error) throw error
        var user = { username: req.query.username, points: result[0].points }
        sql = `SELECT * FROM events`
        connection.query(sql, (error, result) => {
            if (error) throw error
            res.render('events', { event: result, user })
        })
    })
})

module.exports = router