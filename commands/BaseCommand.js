const Command = require('wtools/Command');

const PointsConfig = require('../PointsConfig');

// -----
//  BaseCommand
// -----

class BaseCommand extends Command {
  constructor() {
    super();
  }

  // -----
  //  Public
  // -----
  
  loadConfig() {
    return Command.prototype.loadConfig.call(this)
      .then(() => {
        return PointsConfig.findOne({})
          .then((config) => {
            if ( config == null ) {
              config = PointsConfig.create();
              config.save();
            }

            this._pointsConfig = config;
          });
      });
  }
};

// Exports
module.exports = BaseCommand;