import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import { setupMilestones, advanceTo } from 'ember-milestones';
import { AnalysisTimeout } from 'ember-polling/controllers/hourly-forecasts';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import page from '../pages/hourly-forecasts';

module('Acceptance | hourly forecasts', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('displays a header', async function(assert) {
    await page.visit();

    assert.equal(page.header, 'Hourly Forecasts');
  });

  test('displays hourly forecast items', async function(assert) {
    server.createList('hourly-forecast', 2);

    await page.visit();

    assert.equal(page.forecastItems.length, 2);
  });

  test('when there are no analysis runs it does not show an indicator', async function(assert) {
    assert.equal(server.schema.analysisRuns.all().models.length, 0);

    await page.visit();

    assert.equal(page.analysisRunsIndicator, "");
  });

  test('when there are only finalized analysis runs it does not show an indicator', async function(assert) {
    server.create('analysis-run', { status: 'finalized' });

    await page.visit();

    assert.equal(page.analysisRunsIndicator, "");
  });

  module('when there are in-progress analysis runs', function(hooks) {
    setupMilestones(hooks, [AnalysisTimeout]);

    test('it shows an indicator', async function(assert) {
      server.create('analysis-run', { status: 'processing' });

      await page.visit();
      await advanceTo(AnalysisTimeout).andCancel();

      assert.equal(page.analysisRunsIndicator, "Currently analyzing data");
    });

    test('when they become final it refreshes the page and removes the indicator', async function(assert) {
      const analysisRun = server.create('analysis-run', { status: 'processing' });
      server.create('hourly-forecast');

      await page.visit();

      assert.equal(page.analysisRunsIndicator, "Currently analyzing data");
      assert.equal(page.forecastItems.length, 1);

      analysisRun.status = "finalized";
      analysisRun.save();
      // assume that the analysis run produced a new forecast that the page should display
      server.create('hourly-forecast');

      await advanceTo(AnalysisTimeout).andReturn();
      await settled();

      assert.equal(page.analysisRunsIndicator, '');
      assert.equal(page.forecastItems.length, 2);
    });
  });
});
