const express = require('express');
const dotenv = require('dotenv');
const port = 5000
const cors = require('cors');
const mongoDB = require('./db');


//dot config
dotenv.config();

//mongodb connection
mongoDB();

//rest object
const app = express()

//Corse policy
app.use(express.json());
app.use(cors());

// app.use(express.json())

//routes
app.use('/api', require("../backend/Routes/CreateUser"));
app.use('/api', require("../backend/Routes/DisplayData"));
app.use('/api', require("../backend/Routes/OrderData"));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//listen
app.listen(port, () => {
  console.log(`Connection established listening on port ${port}`)
})