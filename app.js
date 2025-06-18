const express = require('express');
const path = require("path");
const db = require('./config/mongoose-connnection');

const ownersRouter = require('./routes/ownersRoutes')
const usersRouter = require('./routes/usersRoutes')
const productsRouter = require('./routes/productsRoutes')

const app = express();

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(3000, ()=>{
    console.log(`Running on port http://localhost:3000`);
});