import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import Ember from 'ember';

export default Controller.extend({
    sortedForecasts: computed('model.forecasts', function() {
        return this.get('model.forecasts').sortBy('startingAt');
    }),

    analysisRuns: alias('model.analysisRuns'),

    activeAnalysisRuns: computed('analysisRuns', function() {
        return this.get('analysisRuns').filter((run) => { return (run.status === 'processing'); })
    }),

    analysisRunsIndicator: computed('activeAnalysisRuns', function() {
        return this.activeAnalysisRuns.length ? "Currently analyzing data" : "";
    }),

    pollAnalysisRuns: task(function*() {
        while (this.activeAnalysisRuns.length) {
            this.loadAnalysisRuns.perform();
            if (Ember.testing) { return; }
            yield timeout(2000);
        }
    }).restartable(),

    loadAnalysisRuns: task(function*() {
        this.set('analysisRuns', yield this.store.findAll('analysis-run'));
    }).drop(),
});
