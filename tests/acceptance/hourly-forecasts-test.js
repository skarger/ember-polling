import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
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

    assert.equal(page.analysisRuns, "");
  });

  test('when there are only finalized analysis runs it does not show an indicator', async function(assert) {
    server.create('analysis-run', { status: 'finalized' });

    await page.visit();

    assert.equal(page.analysisRuns, "");
  });

  test('when there are in-progress analysis runs it shows an indicator', async function(assert) {
    server.create('analysis-run', { status: 'processing' });

    await page.visit();

    assert.equal(page.analysisRuns, "Currently analyzing data");
  });
});
