const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("Database connected successfully"))
    .catch(err=>console.log(err));
  


app.listen(5000, () => {
    console.log('Server is running on port perfectly');
});