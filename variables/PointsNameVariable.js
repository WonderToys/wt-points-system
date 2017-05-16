const Variable = require('wtools/Variable');

const PointsConfig = require('../PointsConfig');

// -----
//  PointsNameVariable
// -----

class PointsNameVariable extends Variable {
  // -----
  //  Properties
  // -----

  get name() {
    return '$pointsName';
  }

  get description() {
    return 'Gets the configured name of the points.';
  }

  get usage() {
    return '$pointsName';
  }

  // -----
  //  Public
  // -----

  resolve(args, request) {
    return PointsConfig.findOne({})
      .then((doc) => {
        if ( doc == null ) {
          doc = doc.create();
          doc.save();
        }

        return doc.pointsName;
      });
  }
}

// Exports
module.exports = PointsNameVariable;