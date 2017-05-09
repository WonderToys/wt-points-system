const BaseCommand = require('./BaseCommand');

const PointsConfig = require('../PointsConfig');

// -----
//  PointsCommand
// -----

class PointsCommand extends BaseCommand {
  constructor() {
    super();
  }

  // -----
  //  Properties
  // -----

  get command() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!${ pointsName }`;
  }

  get name() {
    return 'Points';
  }

  get description() {
    return 'Check how many points you have';
  }

  get userCooldown() {
    return 5000;
  }

  // -----
  //  Public
  // -----

  action(request, reply) {
    reply(`$user has $points $pointsName!`);
  }
};

// Exports
module.exports = PointsCommand;