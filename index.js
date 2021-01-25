const express = require('express')
const { sequelize } = require('./models')
const userRoutes = require("./routes/userRoutes");

const app = express()
const port = 8080

// sequelize.sync()

app.use(express.json())

app.use(userRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})