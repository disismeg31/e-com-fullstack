const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv/config');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongoose.js');

const CONSTANTS = require('./shared/constants');
const app = express();
const port = CONSTANTS.PORT || 4000;
connectDB();
app.use(express.json());
app.use(cookieParser());
//⬇️ so that we can send the cookies in the response from the express app
app.use(cors({origin: 'http://localhost:5173',credentials:true})); 


let indexRouter = require('./routes/index.routes');
app.use('',indexRouter);


app.listen(port,()=>console.log(`Express app listening at port: ${port}`));