const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const router = express.Router();

// Setup for LRU Cache
let LRU = require("lru-cache");
const lruOptions = {
  max: 500, // maximum cache size
  maxAge: 24 * 60 * 60 * 1000 // 1day
}
let cache = new LRU(lruOptions);
const key = 'user_001';
let lruvalue = {
  history: new Map()
}

// Setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // upload to directory
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
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
router.use('/', function(req, res, next){
  // Allow Access-Control-Allow-Origin
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,DELETE,OPTIONS');
  next();
});

// Delete History from Cache
function deleteHistory(v, id) {
  v.history.delete(id)
  cache.set(key, v)
}

// Set Cache each key
function setCache(r) {
  lruvalue.history.set(
    uuid.v4(),
    {
      date: new Date(),
      result: r
    })
  cache.set(key, lruvalue);
}

router.get('/history', function(req, res, next) {
  try{
    v = cache.get(key);
    if (v){
      res.status(200).json([...v.history]);
    } else {
      res.status(200).end();
    }
  } catch(e) {
    console.log(e);
  }
});

router.delete('/history/:uuid', function(req, res, next) {
  try{
    v = cache.get(key);
    deleteHistory(v, req.params.uuid);
    setCache('history delete: success!')
    res.status(204).end();
  } catch(e) {
    res.status(500).end();
  }
});

router.post('/update', upload.single('profilePic'), function(req, res, next) {
  try {
    setCache('profile update: success!')
    res.json({
      "imagePath": (req.file) ? req.file.path : "",
      "name": (req.body.name) ? req.body.name : "",
      "email": (req.body.email) ? req.body.email : ""
    });
  } catch(e) {
    console.log(e);
    setCache('profile update: failed');
    res.status(500);
  }
});

module.exports = router;