let playerModel = require("../models/player");
let boutModel = require("../models/bout");

module.exports.GetPlayersList = (req, res, next) => {
  // find all
  playerModel.find((err, playersList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Players List Displayed Successfully",
        playersList: playersList,
        user: req.user
      });
    }
  });
};

module.exports.GetPlayersByBout = (req, res, next) => {
  let boutId = req.params.id;
  // find all
  playerModel.find({bouts: {'$elemMatch': {boutId: {'$in' : boutId}}}}, (err, playersList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Players List Displayed Successfully",
        playersList: playersList,
        user: req.user
      });
    }
  });
};

module.exports.ProcessAddPlayer = (req, res, next) => {

  const boutNum = req.params.boutnum;

  // new
  let newPlayer = playerModel({
    name: req.body.name,
    points: req.body.points,
    bouts: req.body.bouts
  });

  // find players in bout
  boutModel.findOne({ _id: newPlayer.bouts[boutNum].boutId }, (err, bout) => {
    if (err) {
      return console.error(err);
    } else {
      // find all players by bout
      playerModel.find({ boutId: newPlayer.bouts[boutNum].boutId}, (err, playersList) => {
        if (err) {
          return console.error(err);
        } else {
          // if number of players in the bout is equal maxNumOfPlayers => return
          if (playersList.length == bout.maxNumOfPlayers) {
            res.json({ success: false, msg: "The Bout is Full" });
          } else {
            // add new player
            newPlayer.save(err => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                res.json({ success: true, msg: "Successfully Added New Player" });
              }
            });
          }
        }
      });


    }
  });
};

module.exports.GetPlayerById = (req, res, next) => {
  // get id
  let id = req.params.id;

  // find
  playerModel.findById(id, (err, playerObject) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Player Displayed Successfully",
        player: playerObject
      });
    }
  });
};

module.exports.ProcessEditPlayer = (req, res, next) => {
  // get id
  let id = req.params.id;

  // get updated player
  let updatedPLayer = playerModel({
    _id: id,
    name: req.body.name,
    points: req.body.points,
    bouts: req.body.boutId
  });

  // update
  playerModel.updateOne({ _id: id }, updatedPLayer, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Updated Player",
        player: updatedPLayer
      });
    }
  });
};

module.exports.PerformDelete = (req, res, next) => {
  // get id
  let id = req.params.id;

  // delete
  playerModel.remove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Successfully Deleted Player" });
    }
  });
};
