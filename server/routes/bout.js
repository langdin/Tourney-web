let express = require('express');
let router = express.Router();

let passport = require('passport');

let boutController = require('../controllers/bout');

/* GET - get Bout List */
router.get('/', passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), boutController.GetBoutList);

/* GET - get Bout by ID */
router.get('/:id', passport.authenticate('jwt', {session: false}), boutController.GetBoutById);

/* POST - processes the add bout */
router.post('/add', passport.authenticate('jwt', {session: false}), boutController.ProcessAddBout);

/* GET - get Bout List by tourneyID */
router.get('/by_tourney/:id', boutController.GetBoutsByTourneyId);

/* GET - process delete Bout */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), boutController.PerformDelete);

module.exports = router;
