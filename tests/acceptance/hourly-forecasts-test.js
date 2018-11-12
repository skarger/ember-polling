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

  // test('when there are no analysis runs it does not show an indicator', async function(assert) {
  //   assert.equal(server.schema.analysisRuns.all().models.length, 0);

  //   await visit('/hourly-forecasts');
  // });
});
