# ember-polling

## Overview
This app exists to explore HTTP polling in Ember, and automated testing to verify it.

The goal is to develop an approach to polling an API endpoint for updates, with a timeout between each request, and reacting when the response changes in a meaningful way.
In the basic version polling continues infinitely, but in other use-cases we may want polling to terminate after obtaining some sentinel value.

In this example app and in common real-world cases, we want a route to refresh when the poller obtains a particular response. This adds a testing challenge because we wish to `await` the page load when the router refreshes, but unlike standard `page.visit()` in acceptance tests, we do not have direct control over the poll-prompted refresh. The test suite includes a failing acceptance test that suffers from that problem.

This example app utilizes a few key libraries:

* [ember-concurrency](http://ember-concurrency.com/docs/introduction/) to help manage the polling
* [ember-cli-mirage](http://www.ember-cli-mirage.com/) to provide a fake API for acceptance tests
* [ember-cli-page-object](http://ember-cli-page-object.js.org/docs/v1.14.x/) to make assertions on page content in acceptance tests

Any changes to the approach and implementation are welcome, but the acceptance tests should still pass. That said, alternative ways to test that still convincingly verify the behavior are also welcome.

### Example Domain

The example app displays weather information. We have a route that shows hourly weather forecasts. When users visit that page, the route model fetches the existing forecasts from the server and displays them in rows.

In the background, the server continually ingests large amounts of weather data and analyzes it in batch runs. These analysis runs compute various different metrics, including hourly forecasts. Reasons other than direct user interaction on the hourly forecasts page prompt analysis runs. For example, the server may kick off an analysis run because it just received a certain kind of data, or because it reached a scheduled time, or because another user manually started an analysis from a different page.

Therefore we need the hourly forecasts page to poll. When a user first views this page, the app should check if there are any in-progress analysis runs. If there are, it should show an indicator so that the user knows that new forecasts may appear soon. After initial load it should poll for active analysis runs. When runs become finalized the page should remove the indicator, and automatically refresh in case the server has new forecasts we can display.

### Implementation

The route in question is `/hourly-forecasts`. The page fetches data from two distinct endpoints:

* `/api/hourly-forecasts`
* `/api/analysis-runs`

### Testing

We want to test this behavior using an acceptance test. In particular we want to verify these details:

* When a user visits the `/hourly-forecasts` page, it shows an indicator conditionally on whether there are active analysis runs.
* When analysis runs become finalized sometime after the page loads, it should refresh and show new forecasts if present.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-polling`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

