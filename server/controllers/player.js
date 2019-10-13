let playerModel = require("../models/player");

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

module.exports.ProcessAddPlayer = (req, res, next) => {
  // new
  let newPlayer = playerModel({
    name: req.body.name,
    points: req.body.points,
    boutId: req.body.boutId
  });

  // save
  newPlayer.save((err, playerModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Successfully Added New Player" });
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
    boutId: req.body.boutId
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
  playerModel.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.json({success: true, msg: 'Successfully Deleted Player'});
      }
  });
}
