const express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.status(200).json({
        text: "hello world"
    });
});

router.post('/', function(req, res){
    if (!req.is('json')) {
        res.status(400).end();
    }else{
        res.status(201).json(req.body);
    }
});

module.exports = router;