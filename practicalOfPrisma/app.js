const express = require("express")
const cookieParser = require("cookie-parser")
const routes = require("./routes/routes")
require('dotenv').config()
const app = express()

//regular middleawre
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookie moddleware
app.use(cookieParser())
app.use('/', routes)
app.get('/', (req, res) => {
    res.send("you did it")
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});