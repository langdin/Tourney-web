let express = require('express');
let router = express.Router();

let passport = require('passport');

let playerController = require('../controllers/player');

/* GET - get Players List */
router.get('/', playerController.GetPlayersList);

/* POST - processes the add player */
router.post('/add', playerController.ProcessAddPlayer);

/* GET - get player by id */
router.get('/:id', playerController.GetPlayerById);

/* POST - processes the add player */
router.post('/edit/:id', playerController.ProcessEditPlayer);

/* GET - perform delete player */
router.get('/delete/:id', playerController.PerformDelete);

module.exports = router;
