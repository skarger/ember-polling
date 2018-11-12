import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { milestone } from 'ember-milestones';

export const AnalysisTimeout = Symbol('hourly-forecasts#poll-analysis-timeout');

export default Controller.extend({
    sortedForecasts: computed('model.forecasts', function() {
        return this.get('model.forecasts').sortBy('startingAt');
    }),

    analysisRuns: alias('model.analysisRuns'),

    activeAnalysisRuns: computed('analysisRuns.@each.status', function() {
        return this.get('analysisRuns').filter((run) => { return (run.status === 'processing'); })
    }),

    analysisRunsIndicator: computed('activeAnalysisRuns', function() {
        return this.activeAnalysisRuns.length ? "Currently analyzing data" : "";
    }),

    pollAnalysisRuns: task(function*() {
        while (this.activeAnalysisRuns.length) {
            yield milestone(AnalysisTimeout, () => timeout(2000));
            yield this.loadAnalysisRuns.perform();
        }
        this.send('reload');
    }).drop(),

    loadAnalysisRuns: task(function*() {
        this.set('analysisRuns', yield this.store.findAll('analysis-run', { reload: true }));
    }).drop(),
});
