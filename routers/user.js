const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = require('../middleware/database')

function getDate() {
    var dateObj = new Date()

    var date = dateObj.getDate() + ". "

    switch (dateObj.getMonth()) {
        case 0: date += 'Jan. '
            break
        case 1: date += 'Feb. '
            break
        case 2: date += 'Mar. '
            break
        case 3: date += 'Apr. '
            break
        case 4: date += 'May '
            break
        case 5: date += 'Jun. '
            break
        case 6: date += 'Jul. '
            break
        case 7: date += 'Aug. '
            break
        case 8: date += 'Sep. '
            break
        case 9: date += 'Oct. '
            break
        case 10: date += 'Nov. '
            break
        case 11: date += 'Dec. '
            break
    }

    date += dateObj.getFullYear() + "."

    return date
}

router.get('/user', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }
    var sql = `SELECT events_created FROM users WHERE username = '${user.username}'`
    connection.query(sql, (error, result) => {
        if (error) throw error
        res.render('user', { user, resPoints: result[0].events_created })
    })
})

router.post('/user', (req, res) => {
    var sql = `SELECT points FROM redeem_codes WHERE code = '${req.body.code}' AND used = 'FALSE'`
    connection.query(sql, (error, result) => {
        if (error) throw error
        if (result.length !== 0) {
            var points = result[0].points
            sql = `UPDATE redeem_codes SET used = 'TRUE' WHERE code = '${req.body.code}'`
            connection.query(sql, (error, result) => {
                if (error) throw error
                sql = `UPDATE users SET points = points + ${points} WHERE username = '${req.body.query[1]}'`
                connection.query(sql, (error, result) => {
                    if (error) throw error
                    var sql = `INSERT INTO points_log (username, transaction, date, time, event, points) VALUES (
                            '${req.body.query[1]}', 
                            'code', 
                            '${getDate()}', 
                            '${new Date().getHours() + " : " + new Date().getMinutes()}', 
                            'Redeem code', 
                            ${points}
                            )`
                    connection.query(sql, (error, result) => {
                        if (error) throw error
                        sql = `SELECT points FROM users WHERE username = '${req.body.query[1]}'`
                        connection.query(sql, (error, result) => {
                            if (error) throw error
                            var user = { username: req.body.query[1], points: result[0].points }
                            res.render('user', { user })
                        })
                    })
                })
            })
        }
    })
})

router.get('/users/awards', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }

    res.render('awards', { user })
})

module.exports = router