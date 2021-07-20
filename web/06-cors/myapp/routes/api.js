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
    cb(null, 'profile' + '.' + extension)
  }
});
const upload = multer({storage: storage});

// Add Header
router.use('/update', function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({});
});

router.post('/update', upload.single('profilePic'), function(req, res, next) {
  console.log(req.file)
  try {
    res.json({
      "imagePath": (req.file) ? req.file.path : "",
      "name": (req.body.name) ? req.body.name : "",
      "email": (req.body.email) ? req.body.email : ""
    });
  } catch(e) {
    console.log(e);
    console.log(req.body.filename);
    res.status(500).json(e);
  }
});

module.exports = router;






