const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }



app.get("/", (req, res, next) => {

    console.log("get dziala");
    res.send("xz");

});

app.post("/", (req, res) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    console.log('handling upload image');
    console.log(req.file);
    upload(req, res, (err) => {
      if(err){
        console.log('first err', err);
        res.send({
          msg: err
        });
      } else {
        if(req.file == undefined){
          console.log('Error: No File Selected!')
          res.send({
            msg: 'Error: No File Selected!'
          });
        } else {
          console.log('File Uploaded!')
          res.send({
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });


    console.log(req.body);
    // res.json("xdzialas");

});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening ${port}!`));
