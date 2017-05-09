const { EmbeddedDocument } = require('camo');
const Persistable = require('wtools/Persistable');

// -----
//  JackpotEntry
// -----

class JackpotEntry extends EmbeddedDocument {
  constructor() {
    super();

    this.username = String;
    this.amount = Number;
  }
}

// -----
//  Jackpot
// -----

class Jackpot extends Persistable {
  constructor() {
    super();

    this.name = String;

    this.entries = {
      type: [ JackpotEntry ],
      default: []
    };
  }

  // -----
  //  Properties
  // -----

  get total() {
    return this.entries.reduce((a, b) => {
      return a + b.amount;
    }, 0);
  }

  // -----
  //  Public
  // -----

  removeEntry(username) {
    this.entries = this.entries.filter((item) => {
      return item.username.toLowerCase() !== username.toLowerCase();
    });

    return this.save();
  }

  addEntry(username, amount) {
    let entry = this.entries.find((entry) => {
      return entry.username.toLowerCase() === username.toLowerCase();
    })
    
    if ( entry == null ) {
      entry = JackpotEntry.create({ username, amount: 0 })
      this.entries.push(entry);
    }

    entry.amount += amount;

    return this.save();
  }

  empty() {
    const total = this.total;
    this.entries = [];

    return this.save()
      .then(() => {
        return Jackpot.deleteOne({ name: this.name })
      })
      .then((count) => {
        return Promise.resolve(total); 
      });
  }
};

// Exports
module.exports = Jackpot;