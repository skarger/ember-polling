import {
  create,
  visitable,
  text,
  collection
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/hourly-forecasts'),

  header: text('[data-role=page-header]'),

  analysisRunsIndicator: text('[data-role=analysis-runs-indicator]'),

  forecastItems: collection("ul[data-role=forecasts] li"),
});
