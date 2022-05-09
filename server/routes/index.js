const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // render manda a renderizar (generar y entregar)
  // la vista al cliente
  // Este es el View-Model
  res.render('index', { title: 'Projnotes', author: 'Ernest Rodriguez' });
});

module.exports = router;
