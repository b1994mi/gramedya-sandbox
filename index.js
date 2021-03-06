const express = require('express')
const cors = require("cors");
const { sequelize } = require('./models')
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()
const port = process.env.PORT || 8000

// It is important to make sure that you sync with no accosiation
// in the models so that there will be no conflict on FK/Index in MySQL.
// BUT, it seems that PostgreSQL is okay with those associations.
// sequelize.sync()

app.use(express.json())

app.use(cors());

app.use(userRoutes)

app.use(bookRoutes)

app.use(orderRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
