const Variable = require('wtools/Variable');

const pointsStore = require('../providers/pointsStore');

// -----
//  PointsVariable
// -----

class PointsVariable extends Variable {
  // -----
  //  Properties
  // -----

  get name() {
    return '$points';
  }

  // -----
  //  Public
  // -----

  resolve(args, request) {
    const username = request.viewer.username;
    return pointsStore.getOne(username)
      .then((points) => {
        return points.amount;
      });
  }
}

// Exports
module.exports = PointsVariable;