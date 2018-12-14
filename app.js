const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

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
