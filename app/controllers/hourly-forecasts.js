import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    sortedForecasts: computed('model.forecasts', function() {
        return this.get('model.forecasts').sortBy('startingAt');
    }),

    activeAnalysisRuns: computed('model.analysisRuns', function() {
        return this.get('model.analysisRuns').filter((run) => { return (run.status === 'processing'); })
    }),

    analysisRunsIndicator: computed('activeAnalysisRuns', function() {
        return this.activeAnalysisRuns.length ? "Currently analyzing data" : "";
    })
});
