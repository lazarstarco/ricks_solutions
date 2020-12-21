const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/earn_points', (req, res) => {
    var user = { username: req.query.username, points: req.query.points }
    return res.render('earn_points', {user})
})

module.exports = router