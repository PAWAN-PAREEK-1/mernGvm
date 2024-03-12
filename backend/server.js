const express = require('express');
const connectDb = require('./config/connectDb');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
port = process.env.PORT || 5000;

connectDb();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use("/api/vendor" , require("./routes/vendorRoute"))
app.use("/api/user" , require("./routes/userRoute"))

app.listen(port,()=>{
    console.log(port)

});