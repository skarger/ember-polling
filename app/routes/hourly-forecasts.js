import Route from '@ember/routing/route';

export default Route.extend({
    async model() {
        const [forecasts, analysisRuns] = await Promise.all([
            this.store.findAll('hourly-forecast', { reload: true }),
            this.store.findAll('analysis-run', { reload: true }),
        ]);

        return { forecasts, analysisRuns };
    },

    setupController(controller) {
        this._super(...arguments);

        if (controller.activeAnalysisRuns.length) {
          controller.pollAnalysisRuns.perform();
        }
    },

    actions: {
      reload() {
        this.refresh();
      }
    }
});
