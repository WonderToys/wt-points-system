const pointsStore = require('../../providers/pointsStore');

// Exports
module.exports = {
  add: {
    value(command) {
      const commandId = command.command.replace(/[\W]/g, '');
      
      if ( command.metadata.pointsCost == null ) {
        command.metadata.pointsCost = 0;
      }

      $('body').on('blur', `#PointsSystem_${ commandId }_pointsCost`, function() {
        const $this = $(this);
        let cost = parseInt($this.val());

        if ( cost < 0 ) cost = 0;
        command.metadata.pointsCost = cost;
        $this.val(cost);

        command.save();
      });

      return `
        <div class="input-field col s12">
          <input id="PointsSystem_${ commandId }_pointsCost" type="number" min="0" value="${ command.metadata.pointsCost }" />
          <label class="active" for="PointsSystem_${ commandId }_pointsCost">
            Points Cost
          </label>
        </div>`;
    }
  }
};