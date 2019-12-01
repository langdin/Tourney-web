let express = require('express');
let router = express.Router();

let passport = require('passport');

let playerController = require('../controllers/player');

/* GET - get Players List */
router.get('/', playerController.GetPlayersList);

/* GET - get Players by Bout ID */
router.get('/by_bout/:id', passport.authenticate('jwt', {session: false}), playerController.GetPlayersByBout);

/* GET - get Players by Bout ID */
router.get('/by_tourney/:id', playerController.GetPlayersByTourney);

/* POST - processes the add player */
router.post('/add/:boutnum', passport.authenticate('jwt', {session: false}), playerController.ProcessAddPlayer);

/* GET - get player by id */
router.get('/:id', passport.authenticate('jwt', {session: false}), playerController.GetPlayerById);

/* POST - processes the update player */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), playerController.ProcessEditPlayer);

/* GET - perform delete player */
router.get('/delete/:id', playerController.PerformDelete);

module.exports = router;
