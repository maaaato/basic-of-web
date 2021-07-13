const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    extension = "jpg";
    switch(file.mimetype){
      case "image/png":
        extension = "png";
        break
      default:
        break
    }
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
});
const upload = multer({storage: storage});

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({});
});

router.post('/upload', upload.single('profile'), function(req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({
      "path": req.file.path
    });
  } catch(e) {
    console.log(e);
    console.log(req.body.filename);
    res.status(500).json(e);
  }
});

module.exports = router;






