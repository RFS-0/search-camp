import { loadQueries } from './load-queries.js';
import { fetchData } from './fetch-data.js';
import { filter } from './filter.js';
import { parse } from './parse-results.js';
import notifier from 'node-notifier';


const queries = loadQueries('queries.json');

async function search() {
  for (const query of queries) {
    const queryCriteria = query.queryCriteria;
    const filterCriteria = query.filterCriteria;
    const fetchedData = await fetchData(queryCriteria);
    const results = filter(fetchedData, filterCriteria);
    const notifications = parse(results)
    for (const notification of notifications) {
      notifier.notify(
        notification,
        function(error, response) {
          console.log(error);
          console.log(response);
        }
      );
    }
  }
}
// run search on startup
search();
// run search every minute
setInterval(async () => search(), 1000 * 60)
// keep process running by doing nothing once every 24 hours
setInterval(() => { }, 24 * 60 * 60 * 1000);

