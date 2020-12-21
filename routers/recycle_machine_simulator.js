const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = require('../middleware/database')

router.get('/recycle_machine_simulator', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }

    res.render('recycle_machine_simulator', { user })
})

router.post('/recycle_machine_simulator', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }
    var sql = `INSERT INTO points_log (username, transaction, date, time, event, points) VALUES (
            '${req.body.username}', 
            '${req.body.transaction}', 
            '${req.body.date}', 
            '${req.body.time}', 
            '${req.body.event}', 
            ${req.body.points}
            )`
    connection.query(sql, (error, result) => {
        if (error) throw error
        sql = `UPDATE users SET points = points + ${req.body.points} WHERE username = '${req.body.username}'`
        connection.query(sql, (error, result) => {
            if (error) throw error
            res.render('events', { user })
        })
    })
})


module.exports = router