const Viewer = require('wtools/Viewer');

const BaseCommand = require('./BaseCommand');
const pointsStore = require('../providers/pointsStore');

// -----
//  AddPointsCommand
// -----

class AddPointsCommand extends BaseCommand {
  constructor() {
    super();
  }

  // -----
  //  Properties
  // -----

  get command() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!add${ pointsName }`;
  }

  get usage() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!add${ pointsName } [target] [amount]`;
  }

  get name() {
    return 'AddPoints';
  }

  get description() {
    return 'Add points to a user.';
  }

  get accessLevel() {
    return Viewer.LEVEL_MOD;
  }

  // -----
  //  Public
  // -----

  action(request, reply) {
    const target = request.params[0];
    let amount = parseInt(request.params[1]);
    
    if ( isNaN(amount) ) {
      reply("That's not a number, what am I supposed to do with that?");
      return;
    }

    return pointsStore.getOne(target)
      .then((points) => {
        points.add(amount)
          .then(() => {
            reply(`I've added ${ amount } $pointsName to ${ target }!`);
          })
          .catch((error) => {
            reply("I'm sorry, something went wrong. FeelsBadMan");
            throw error;
          });
      });
  }
};

// Exports
module.exports = AddPointsCommand;