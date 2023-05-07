const express = require("express")
const mongoose = require("mongoose")
const itemRoutes = require('./controller/itemController')
const cartItemRoutes = require('./controller/cartItemController')
const shipmentRoutes = require('./controller/shipmentController')

const cors = require('cors');

const connectionString = "mongodb+srv://rusiru:rusiru123@medixo.is6j3xo.mongodb.net/medixo?retryWrites=true&w=majority"

mongoose.connect(connectionString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', itemRoutes)
app.use('/api', cartItemRoutes)
app.use('/api', shipmentRoutes)

app.listen(3001, () => { console.log("Server running on port 3001...") })