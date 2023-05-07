const express = require("express")
const mongoose = require("mongoose")
const itemRoutes = require('./controller/itemController')
const cartItemRoutes = require('./controller/cartItemController')
const shipmentRoutes = require('./controller/shipmentController')

const cors = require('cors');

// const connectionString = "mongodb+srv://rusiru:rusiru123@medixo.is6j3xo.mongodb.net/medixo?retryWrites=true&w=majority"
const connectionString = "mongodb://Dimuth:z9wn0fBpJEgTHBXI@ac-xjhhhyo-shard-00-00.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-01.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-02.quiz4be.mongodb.net:27017/test?replicaSet=atlas-kp5b32-shard-0&ssl=true&authSource=admin"

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