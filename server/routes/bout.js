let express = require('express');
let router = express.Router();

let passport = require('passport');

let boutController = require('../controllers/bout');

/* GET - get Bout List */
router.get('/', boutController.GetBoutList);

/* GET - get Bout by ID */
router.get('/:id', boutController.GetBoutById);

/* POST - processes the add bout */
router.post('/add', boutController.ProcessAddBout);

/* GET - get Bout List by tourneyID */
router.get('/by_tourney/:id', boutController.GetBoutsByTourneyId);

/* GET - process delete Bout */
router.get('/delete/:id', boutController.PerformDelete);

module.exports = router;
