var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('dashboard/index.hbs', {
    layout: "dashboard/layout.hbs",
    title: 'Ximivogue - Dashboard'
  });
});

module.exports = router;
