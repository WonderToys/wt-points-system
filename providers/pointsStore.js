const Points = require('../Points');

// -----
//  PointsStore
// -----

class PointsStore {
  // -----
  //  Public
  // -----
  getOne(username) {
    username = username.toLowerCase();
    return Points.findOne({ username })
      .then((doc) => {
        if ( doc == null ) {
          const newPoints = Points.create({
            amount: 0,
            username,
          });

          return newPoints.save()
        }
        
        return doc;
      });
  }
};

// Exports
module.exports = new PointsStore();