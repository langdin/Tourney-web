let boutModel = require("../models/bout");
let tourneyModel = require("../models/tourney");

module.exports.GetBoutList = (req, res, next) => {
  // find all
  boutModel.find((err, boutList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Bout List Displayed Successfully",
        boutList: boutList
      });
    }
  });
};

module.exports.GetBoutById = (req, res, next) => {
  let id = req.params.id;
  // find by tourney id
  boutModel.findById(id, (err, boutObj) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Got Bouts by Tourney ID",
        bout: boutObj
      });
    }
  });
};

module.exports.GetBoutsByTourneyId = (req, res, next) => {
  let id = req.params.id;
  // find by tourney id
  boutModel.find({tourneyId: id}, (err, boutList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Got Bouts by Tourney ID",
        boutList: boutList
      });
    }
  });
};

// TODO should check the number of bout
module.exports.ProcessAddBout = (req, res, next) => {
  // create new
  let newBout = boutModel({
    number:  req.body.number,
    maxNumOfPlayers: req.body.maxNumOfPlayers,
    tourneyId: req.body.tourneyId
  });
  // save
  newBout.save((err, boutModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Successfully Added New Bout" });
    }
  });
}

module.exports.PerformDelete = (req, res, next) => {
  // get id
  let id = req.params.id;

  // delete
  boutModel.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.json({success: true, msg: 'Successfully Deleted Bout'});
      }
  });
}
