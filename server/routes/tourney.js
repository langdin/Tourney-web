let express = require('express');
let router = express.Router();

let passport = require('passport');

let tourneyController = require('../controllers/tourney');

/* GET - get tourneys List */
router.get('/', tourneyController.GetTourneysList);

/* POST - get user tourneys List */
router.post('/my', tourneyController.GetUserTourneysList);

/* POST - processes the add tourney */
router.post('/add', tourneyController.ProcessAddTourney);

/* GET - get tourney by id */
router.get('/:id', tourneyController.GetTourneyById);

/* POST - processes the add tourney */
router.post('/edit/:id', tourneyController.ProcessEditTourney);

/* POST - processes the delete tourney */
router.get('/delete/:id', tourneyController.PerformDelete);

module.exports = router;
