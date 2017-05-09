const { debounce } = require('lodash');

const PointsConfig = require('../../PointsConfig');

module.exports = {
  data() {
    return {
      title: 'Points System',
      description: 'Configure the Points System',
      pointsName: null,
      updateInterval: null,
      awardAmount: null,
      subscriberBonus: null
    }
  },
  methods: {
    loadConfig() {
      return PointsConfig.findOne({})
        .then((config) => {
          this._config = config;

          this.pointsName = config.pointsName;
          this.updateInterval = config.updateInterval / (60 * 1000);
          this.awardAmount = config.awardAmount;
          this.subscriberBonus = config.subscriberBonus || 0;
        });
    },
    updateConfig: debounce(function() {
      if ( this.pointsName.length === 0 ) {
        this.pointsName = this._config.pointsName;
      }

      this._config.pointsName = this.pointsName;
      this._config.updateInterval = parseInt(this.updateInterval) * (60 * 1000);
      this._config.awardAmount = parseInt(this.awardAmount);
      this._config.subscriberBonus = parseInt(this.subscriberBonus);

      if ( this._config.updateInterval < 1.0 ) this._config.updateInterval = 60 * 1000;
      if ( this._config.awardAmount < 1.0 ) this._config.awardAmount = 1;

      this._config.save()
        .then(() => Promise.all(this.commands.map((cmd) => cmd.loadConfig())))
        .then(() => this.loadConfig());
    }, 500)
  },
  updated() {
    const $element = $(this.$el);
    $element.find('[data-tooltip]').tooltip({ delay: 1000 });
  },
  mounted() {
    this.loadConfig()
      .then(() => {
        this.$nextTick(() => {
          const $element = $(this.$el);

          $element.find('.collapsible').collapsible();
          $element.find('[data-tooltip]').tooltip({ delay: 1000 });
        });
      });
  }
};