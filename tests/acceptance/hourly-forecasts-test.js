import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | hourly forecasts', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  
  test('visiting /hourly-forecasts', async function(assert) {
    await visit('/hourly-forecasts');

    assert.equal(currentURL(), '/hourly-forecasts');
  });
});
