let express = require('express');
let router = express.Router();

let mailController = require('../controllers/mail');


/* POST - processes the Login Page */
router.post('/', mailController.sendMail);

module.exports = router;
