const Module = require('wtools/Module');
const Viewer = require('wtools/Viewer');

const Points = require('./Points');
const PointsConfig = require('./PointsConfig');
const pointsStore = require('./providers/pointsStore');

const jackpotStore = require('./providers/jackpotStore');

// -----
//  PointsSystemModule
// -----

class PointsSystemModule extends Module {
  constructor() {
    super();

    this._interval = null;

    PointsConfig.findOne({})
      .then((config) => {
        if ( config == null ) {
          config = PointsConfig.create();
          config.save();
        }

        this._config = config;
        this._configUpdated();
      });
  }

  // -----
  //  Private
  // -----

  _tick() {
    Viewer.find({ isActive: true })
      .then((viewers) => {
        viewers.forEach((viewer) => {
          pointsStore.getOne(viewer.username)
            .then((points) => {
              points.add(this._config.awardAmount);
              points.save();
            });
        });
      });
  }

  _configUpdated() {
    if ( this._interval != null ) {
      clearInterval(this._interval);
    }

    this._interval = setInterval(() => {
      this._tick();
    }, this._config.updateInterval);
  }

  // -----
  //  Public
  // -----

  validateCommand(request) {
    const command = request.command;
    if ( command == null || command.metadata.pointsCost == null || command.metadata.pointsCost === 0 ) {
      return Promise.resolve(true);
    }

    return pointsStore.getOne(request.username)
      .then((points) => {
        if ( points.amount < command.metadata.pointsCost ) {
          throw new Error(`$user is broke. Needs ${ command.metadata.pointsCost } $pointsName but only has ${ points.amount }. Loser!`);
        }
      });
  }

  postCommand(request) {
    const command = request.command;
    if ( command == null || command.metadata.pointsCost == null || command.metadata.pointsCost === 0 ) {
      return Promise.resolve(true);
    }

    return pointsStore.getOne(request.username)
      .then((points) => points.remove(command.metadata.pointsCost));
  }

  unload() {
    if ( this._interval != null ) {
      clearInterval(this._interval);
    }
  }
};

// Exports
module.exports = PointsSystemModule;