require('dotenv').config();
const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
var cors = require('cors');


mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log("DB connected");
});

const app=express();

const authRoutes=require("./routes/auth");
app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);



const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});