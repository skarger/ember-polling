import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | hourly-forecasts', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:hourly-forecasts');
    assert.ok(route);
  });
});
