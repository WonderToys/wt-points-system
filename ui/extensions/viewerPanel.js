const pointsStore = require('../../providers/pointsStore');

// Exports
module.exports = {
  add: {
    title: 'Points',
    value(viewer) {
      return pointsStore.getOne(viewer.username)
        .then((points) => {
          $('body').on('blur.pointsSystem', `#PointsSystem_${ points._id }Editor`, function() {
            const $this = $(this);
            let amount = parseInt($this.val());

            if ( amount < 0 ) amount = 0;

            points.amount = amount;
            $this.val(points.amount);

            $this.attr('disabled', 'disabled');
            points.save()
              .then(() => $this.removeAttr('disabled'));
          });

          // Return template
          return `<input id="PointsSystem_${ points._id }Editor" type="number" value="${ points.amount }" min="0" style="margin-bottom: 0px;" />`;
        });
    }
  }
};