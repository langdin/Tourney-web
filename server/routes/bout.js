let express = require('express');
let router = express.Router();

let passport = require('passport');

let boutController = require('../controllers/bout');

/* GET - get Bout List */
router.get('/', boutController.GetBoutList);

/* POST - processes the add bout */
router.post('/add', boutController.ProcessAddBout);

module.exports = router;
