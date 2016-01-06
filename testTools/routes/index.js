var express = require('express');
var router = express.Router();
var index = require('../controllers/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('post', index.post);

module.exports = router;
