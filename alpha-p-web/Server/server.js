//server setup here
const express = require('express');
const app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(5000, () => {
   console.log(`server listening on port ${5000}`);
});