const Persistable = require('wtools/Persistable');

// -----
//  Points
// -----

class Points extends Persistable {
  constructor() {
    super();

    this.username = String;
    this.amount = {
      type: Number,
      default: 0
    };
  }

  // -----
  //  Public
  // -----

  add(amount) {
    if ( typeof(amount) === 'string' ) amount = parseInt(amount);
    if ( isNaN(amount) ) return Promise.resolve(this);

    this.amount += amount;

    return this.save();
  }

  remove(amount) {
    if ( typeof(amount) === 'string' ) amount = parseInt(amount);
    if ( isNaN(amount) ) return Promise.resolve(this);
    
    this.amount -= amount;
    if ( this.amount < 0 ) this.amount = 0;

    return this.save();
  }

  // -----
  //  Static
  // -----

  static collectionName() {
    return 'points';
  }
};

// Exports
module.exports = Points;