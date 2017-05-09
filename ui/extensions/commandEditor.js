const pointsStore = require('../../providers/pointsStore');

// Exports
module.exports = {
  add: {
    value(command) {
      if ( command.metadata.pointsCost == null ) {
        command.metadata.pointsCost = 0;
      }

      $('body').on('blur', `#PointsStore_${ command.command.replace('!', '') }_pointsCost`, function() {
        const $this = $(this);
        let cost = parseInt($this.val());

        if ( cost < 0 ) cost = 0;
        command.metadata.pointsCost = cost;
        $this.val(cost);

        command.save();
      });

      return `
        <div class="input-field col s12">
          <input id="PointsStore_${ command.command.replace('!', '') }_pointsCost" type="number" min="0" value="${ command.metadata.pointsCost }" />
          <label class="active" for="PointsStore_${ command.command.replace('!', '') }_pointsCost">
            Points Cost
          </label>
        </div>`;
    }
  }
};