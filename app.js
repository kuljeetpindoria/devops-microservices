const http = require('http');
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./api/routes/user')

mongoose.connect('mongodb+srv://kuljeetpindoria:Stkh%401895@cluster0.vwaptb9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

mongoose.connection.on('error', err => {
    console.log('connection failed');
})

mongoose.connection.on('connected', connected => {
    console.log('connected successfully',  connected)

})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());
app.use('/user', userRoute)

app.get('/', (req, res, next) => {
    res.send("Hello World")
})
  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const server = http.createServer(app);
  
server.listen(port, console.log('app is running...'))