import {
  create,
  visitable,
  text,
  collection
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/hourly-forecasts'),

  header: text('[data-role=page-header]'),

  forecastItems: collection("ul[data-role=forecasts] li", {

  }),
});
