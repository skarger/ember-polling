export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  server.createList('hourlyForecast', 3);
  server.createList('analysisRun', 1, { status: 'processing' });
}
