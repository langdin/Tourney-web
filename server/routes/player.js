let express = require('express');
let router = express.Router();

let passport = require('passport');

let playerController = require('../controllers/player');

/* GET - get Players List */
router.get('/', playerController.GetPlayersList);

/* GET - get Players by Bout ID */
router.get('/by_bout/:id', playerController.GetPlayersByBout);

/* POST - processes the add player */
router.post('/add/:boutnum', playerController.ProcessAddPlayer);

/* GET - get player by id */
router.get('/:id', playerController.GetPlayerById);

/* POST - processes the update player */
router.post('/edit/:id', playerController.ProcessEditPlayer);

/* GET - perform delete player */
router.get('/delete/:id', playerController.PerformDelete);

module.exports = router;
