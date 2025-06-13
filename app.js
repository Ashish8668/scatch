const express = require('express');
const path = require("path");

const app = express();

app.get('/', (req, res)=>{
    res.send("API is working");
})

app.listen(3000, ()=>{
    console.log(`Running on port http://localhost:3000`);
});