//server setup here
const express = require('express'); // web application framework package
const cors = require('cors'); // allows to access something from outside our server to our server
const mongoose = require('mongoose');

require('dotenv').config(); // saves env variables in files rather than own pc

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =process.env.ATLAS_URI //global env variable which defined in .env file

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }// connection with mongo db 
   );
   const connection = mongoose.connection;
   connection.once('open', () => {
     console.log("MongoDB database connection established successfully");  //test of connection established
   })

 app.get('/', function(req, res){
   res.send("Hello world!");        //test post
 });         

app.listen(port, () => {
   console.log(`server listening on port ${port}`); // start the server
});