const express = require('express');
const config = require('./config/mongoose');
const CONSTANTS = require('./shared/constants');
const app = express();
app.use(express.json());
const port = CONSTANTS.PORT;
let indexRouter = require('./routes/index.routes');
app.use('',indexRouter);
app.listen(port,()=>{
    console.log(`Express app listening at port ${port}`);
})