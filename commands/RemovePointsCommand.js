const Viewer = require('wtools/Viewer');

const BaseCommand = require('./BaseCommand');
const pointsStore = require('../providers/pointsStore');

// -----
//  RemovePointsCommand
// -----

class RemovePointsCommand extends BaseCommand {
  // -----
  //  Properties
  // -----

  get command() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!remove${ pointsName }`;
  }

  get usage() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!remove${ pointsName } [target] [amount]`;
  }

  get name() {
    return 'RemovePoints';
  }

  get description() {
    return 'Remove points from a user.';
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

    pointsStore.getOne(target)
      .then((points) => {
        if ( points.amount < amount ) {
          amount = points.amount;
        }
        
        points.remove(amount)
          .then(() => {
            reply(`I've removed ${ amount } $pointsName from ${ target }!`);
          })
          .catch((error) => {
            reply("I'm sorry, something went wrong. FeelsBadMan");
            throw error;
          });
      });
  }
};

// Exports
module.exports = RemovePointsCommand;