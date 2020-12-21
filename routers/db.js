const express = require('express')

const connection = require('../middleware/database')

const router = new express.Router()

router.get('/db', (req, res) => {
    const sql = `SHOW TABLES`
    connection.query(sql, (error, result) => {
        if (error) throw error
        var html = "Select table below:<br>"
        result.forEach(element => {
            var table = element.Tables_in_ricks_solutions
            html += `<a href="/db/${table}">${table}</a><br>`
        });
        res.send(html)
    })
})


router.get('/db/:name', (req, res) => {
    const sql = `DESCRIBE ${req.params.name}`
    connection.query(sql, (error, result) => {
        if (error) return res.redirect('/db')
        res.send(`<pre>${JSON.stringify(result, null, "  ")}</pre>`)
    })
})

module.exports = router