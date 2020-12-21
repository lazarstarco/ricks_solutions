const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/login/index.html');
})

router.get('/login', (req, res) => {
    res.render('events')
})

module.exports = router