let express = require('express');
let router = express.Router();

let passport = require('passport');

let tourneyController = require('../controllers/tourney');

/* GET - get tourneys List */
router.get('/', tourneyController.GetTourneysList);

/* POST - processes the add tourney */
router.post('/add', tourneyController.ProcessAddTourney);

/* GET - get tourney by id */
router.get('/:id', tourneyController.GetTourneyById);

/* POST - processes the add tourney */
router.post('/edit/:id', tourneyController.ProcessEditTourney);

/* POST - processes the delete tourney */
router.post('/delete/:id', tourneyController.ProcessEditTourney);

module.exports = router;
