var express = require('express');
var router = express.Router();
var

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('post');

module.exports = router;
