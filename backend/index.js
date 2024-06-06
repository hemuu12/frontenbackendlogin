const express = require('express')
const app = express()
const db = require('./dbConnection/db')
require('dotenv').config()
const router = require('./routes/router')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hompage")
})
app.use('/app', router)

app.listen(process.env.port, () => console.log(`Server is running ${process.env.port}`))