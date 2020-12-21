const express = require('express')
const exphbs = require('express-handlebars')

// database pool
const mysql = require('./middleware/database')

// app init
const app = express()
const port = process.env.PORT || 3000

// setting hbs up
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// static folder for assets
app.use('/', express.static(__dirname + '/src'))

// routers
const loginRouter = require('./routers/login')
const eventsRouter = require('./routers/events')
const dbRouter = require('./routers/db')
const couponsRouter = require('./routers/coupons')
const eventsNewRouter = require('./routers/events_new')
const recycleMachineSimulatorRouter = require('./routers/recycle_machine_simulator')
const userRouter = require('./routers/user')
const earnPointsRouter = require('./routers/earn_points')
const pointsLogRouter = require('./routers/points_log')

// usage of routers
app.use(loginRouter)
app.use(eventsRouter)
app.use(dbRouter)
app.use(couponsRouter)
app.use(eventsNewRouter)
app.use(recycleMachineSimulatorRouter)
app.use(userRouter)
app.use(earnPointsRouter)
app.use(pointsLogRouter)

// server run
app.listen(port, () => {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    const currentdate = new Date();
    const datetime =
        `Started: ${(currentdate.getDate() + 1)}/${(currentdate.getMonth() + 1)}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
    console.log(datetime)

    console.log(`Server running on port ${port}`)
})