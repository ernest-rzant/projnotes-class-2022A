/* eslint-disable no-console */

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // render manda a renderizar (generar y entregar)
  // la vista al cliente
  // Este es el View-Model
  res.render('about', {
    name: 'Ernest Rodriguez',
    email: 'ernestorodriguez643@gmail.com',
    url: 'www.ernes_rzan.com',
  });
});

module.exports = router;
