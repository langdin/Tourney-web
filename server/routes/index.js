let express = require('express');
let router = express.Router();

let passport = require('passport');

let indexController = require('../controllers/index');

/* POST - processes the Login Page */
router.post('/login', indexController.processLoginPage);

module.exports = router;
