const Jackpot = require('../Jackpot');

// -----
//  JackpotStore
// -----

class JackpotStore {
  // -----
  //  Public
  // -----
  getOne(name) {
    name = name.toLowerCase();
    
    return Jackpot.findOne({ name })
      .then((doc) => {
        if ( doc == null ) {
          const newPot = Jackpot.create({ name });

          return newPot.save();
        }

        return doc;
      });
  }
};

// Exports
module.exports = new JackpotStore();