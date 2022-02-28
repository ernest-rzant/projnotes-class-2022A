var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // render manda a renderizar (generar y entregar)
  // la vista al cliente
  // Este es el View-Model
  res.render('index', { title: 'Express', author: 'Ernest Rodriguez' });
});

module.exports = router;
