import Route from '@ember/routing/route';

export default Route.extend({
    async model() {
        const [forecasts, analysisRuns] = await Promise.all([
            this.store.findAll('hourly-forecast'),
            this.store.findAll('analysis-run'),
        ]);

        return { forecasts, analysisRuns };
    },

    setupController(controller) {
        this._super(...arguments);
        controller.pollAnalysisRuns.perform();
    }
});
