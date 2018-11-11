import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    sortedForecasts: computed('model.forecasts', function() {
        return this.get('model.forecasts').sortBy('startingAt');
    }),
});
