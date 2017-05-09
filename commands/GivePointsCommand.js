const BaseCommand = require('./BaseCommand');
const pointsStore = require('../providers/pointsStore');

// -----
//  GivePointsCommand
// -----

class GivePointsCommand extends BaseCommand {
  // -----
  //  Properties
  // -----

  get command() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!give${ pointsName }`;
  }

  get usage() {
    const pointsConfig = (this._pointsConfig || {});
    const pointsName = (pointsConfig.pointsName || 'points').toLowerCase();

    return `!give${ pointsName } [target] [amount]`;
  }

  get name() {
    return 'GivePoints';
  }

  get description() {
    return 'Give user points to the target.';
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

    const username = request.viewer.username;
    return pointsStore.getOne(username)
      .then((userPoints) => {
        if ( userPoints.amount < amount ) {
          amount = userPoints.amount;
        }

        return pointsStore.getOne(target)
          .then((targetPoints) => {
            return Promise.all([ 
              targetPoints.add(amount), 
              userPoints.remove(amount) 
            ]);
          })
          .then(() => {
            reply(`$user has given ${ target } ${ amount } $pointsName!`);
          })
          .catch((error) => {
            reply("I'm sorry, something went wrong. FeelsBadMan");
            throw error;
          });
      });
  }
};

// Exports
module.exports = GivePointsCommand;