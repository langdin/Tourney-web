let playerModel = require("../models/player");

module.exports.GetPlayersList = (req, res, next) => {
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
  let newPlayer = playerModel({
    name: req.body.name,
    points: req.body.points
  });

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
  let id = req.params.id;
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
  let id = req.params.id;

  let updatedPLayer = playerModel({
    _id: id,
    name: req.body.name,
    points: req.body.points
  });

  playerModel.updateOne({ _id: id }, updatedPLayer, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Added New Player",
        player: updatedPLayer
      });
    }
  });
};
