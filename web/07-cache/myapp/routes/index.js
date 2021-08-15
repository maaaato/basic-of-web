const express = require('express');
const router = express.Router();

// // Add Header
// router.use(function(req, res, next){
//   // Cache headers
//   // res.removeHeader('Cache-Control');
//   // if (req.url.indexOf('/css/') === 0) {
//   //     res.setHeader('Cache-Control', 'public, max-age=345600'); // 4 days
//   //     res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
//   // }
//   res.setHeader('Expires', new Date(Date.now() + 300000).toUTCString());
//   console.log(res)
//   res.set
//   next();
// });

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
