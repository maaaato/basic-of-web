const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    {
      title: 'Account overview',
      email: 'test@example.com',
      name: "guest user"
    });
});



module.exports = router;
