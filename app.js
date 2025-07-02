const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-connnection');

const ownersRouter = require('./routes/ownersRoutes')
const usersRouter = require('./routes/usersRoutes')
const productsRouter = require('./routes/productsRoutes')
const index = require('./routes/index')
require('dotenv').config();  //iska altenrnative was first tareeka .. hamne config package use kra tha...(check mongodb connection  )

const expressSession = require('express-session')
const flash = require('connect-flash');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public'))); 
app.use(cookieParser()); //to read cookies
app.set('view engine', 'ejs');

app.use(
    expressSession({
        resave : false ,
        saveUninitialized : false ,
        secret : process.env.EXPRESS_SESSION_SECRET || 'mydefaultsecret',
    })
)

app.use(flash());

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/',index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port http://localhost:${PORT}`);
});
