import Route from '@ember/routing/route';

export default Route.extend({
    async model() {
        const forecasts = await this.store.findAll('hourly-forecast');
        const analysisRuns = await this.store.findAll('analysis-run');

        return { forecasts, analysisRuns };
    },
});
