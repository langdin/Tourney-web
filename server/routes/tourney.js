let express = require('express');
let router = express.Router();

let passport = require('passport');

let tourneyController = require('../controllers/tourney');

/* GET - get tourneys List */
router.get('/', tourneyController.GetTourneysList);

/* POST - get user tourneys List */
router.post('/my', passport.authenticate('jwt', {session: false}), tourneyController.GetUserTourneysList);

/* POST - processes the add tourney */
router.post('/add', passport.authenticate('jwt', {session: false}), tourneyController.ProcessAddTourney);

/* GET - get tourney by id */
router.get('/:id', tourneyController.GetTourneyById);

/* POST - processes the add tourney */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), tourneyController.ProcessEditTourney);

/* GET - processes the delete tourney */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}),  tourneyController.PerformDelete);

module.exports = router;
