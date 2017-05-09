const Persistable = require('wtools/Persistable');

// -----
//  PointsConfig
// -----

class PointsConfig extends Persistable {
  constructor() {
    super();

    this.pointsName = {
      type: String,
      default: 'points'
    };

    this.updateInterval = {
      type: Number,
      default: (60 * 1000)
    };

    this.awardAmount = {
      type: Number,
      default: 1
    };

    this.subscriberBonus = {
      type: Number,
      default: 0
    };
  }

  // -----
  //  Static
  // -----

  static collectionName() {
    return 'pointsconfig';
  }
};

// Exports
module.exports = PointsConfig;