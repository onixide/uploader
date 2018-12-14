const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());



app.get("/", (req, res, next) => {
  
    console.log("get dziala");
    res.send("dz");

});

app.post("/", (req, res) => {
    
    console.log(req.body);
    res.json("dzialas");

});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening ${port}!`));
