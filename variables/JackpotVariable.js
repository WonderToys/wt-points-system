const Variable = require('wtools/Variable');

const jackpotStore = require('../providers/jackpotStore');

// -----
//  JackpotVariable
// -----

class JackpotVariable extends Variable {
  // -----
  //  Properties
  // -----

  get name() {
    return '$jackpot';
  }

  get description() {
    return 'Get, add, or remove from a jackpot. Action defaults to get. NAME defaults to the called command. USER defaults to the user who called the command.';
  }

  get usage() {
    return '$jackpot([get|add|remove|empty], NAME, USER, [AMOUNT])';
  }

  // -----
  //  Private
  // -----

  _handle(pot, command, username, amount) {
    switch ( command ) {
      case 'add': {
        pot.addEntry(username, amount);
        return Promise.resolve(pot.total);
      }

      case 'remove': {
        pot.removeEntry(username);
        return Promise.resolve(pot.total);
      }

      case 'empty': {
        return pot.empty();
      }
    }
  }

  // -----
  //  Public
  // -----

  resolve(args, request) {
    let potCommand = 'get';
    let potName = request.command;
    let potUser = (request.viewer.displayName || request.viewer.username).toLowerCase();
    let potAmount = 0;

    if ( args.length === 1 ) {
      potName = args[0];
    }
    else if ( args.length === 2 ) {
      potCommand = args[0];
      potAmount = parseInt(args[1]);
    }
    else if ( args.length === 3 ) {
      potCommand = args[0];
      potUser = args[1];
      potAmount = parseInt(args[2]);
    }
    else if ( args.length === 4 ) {
      potCommand = args[0];
      potName = args[1];
      potUser = args[2];
      potAmount = parseInt(args[3]);
    }
    else {
      return null;
    }

    if ( isNaN(potAmount) ) return null;
    if ( potName == null || potName == '' ) return null;
    if ( potUser == null || potUser == '' ) return null;

    return jackpotStore.getOne(potName)
      .then((pot) => {
        return this._handle(pot, potCommand, potUser, potAmount);
      });
  }
}

// Exports
module.exports = JackpotVariable;