const express = require('express')
const { sequelize } = require('./models')
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()
const port = 8080

// sequelize.sync()

app.use(express.json())

app.use(userRoutes)

app.use(bookRoutes)

app.use(orderRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})