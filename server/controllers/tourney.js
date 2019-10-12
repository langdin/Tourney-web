let tourneyModel = require("../models/tourney");

module.exports.GetTourneysList = (req, res, next) => {
  // find all
  tourneyModel.find((err, tourneyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "tourneys List Displayed Successfully",
        tourneysList: tourneyList,
        user: req.user
      });
    }
  });
};

module.exports.GetUserTourneysList = (req, res, next) => {
  let userId = req.body.userId;
  // find user tourneys
  tourneyModel.find({ownerId: userId}, (err, tourneyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "tourneys List Displayed Successfully",
        tourneysList: tourneyList,
        user: req.user
      });
    }
  });
};

module.exports.ProcessAddTourney = (req, res, next) => {
  // new
  let newTourney = tourneyModel({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    numberOfPlayers: req.body.numberOfPlayers,
    ownerId: req.body.ownerId,
  });

  // save
  newTourney.save((err, tourneyModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Successfully Added New Tourney" });
    }
  });
};

module.exports.GetTourneyById = (req, res, next) => {
  // get id
  let id = req.params.id;

  // find
  tourneyModel.findById(id, (err, tourneyObject) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Tourney Displayed Successfully",
        tourney: tourneyObject
      });
    }
  });
};

module.exports.ProcessEditTourney = (req, res, next) => {
  // get id
  let id = req.params.id;

  // get updated tourney
  let updatedTourney = tourneyModel({
    _id: id,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    numberOfPlayers: req.body.numberOfPlayers,
    ownerId: req.body.ownerId,
  });

  // update
  tourneyModel.updateOne({ _id: id }, updatedTourney, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Updated Tourney",
        tourney: updatedTourney
      });
    }
  });
};


module.exports.PerformDelete = (req, res, next) => {
  // get id
  let id = req.params.id;

  // delete
  tourneyModel.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.json({success: true, msg: 'Successfully Deleted Tourney'});
      }
  });
}
