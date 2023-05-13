import { loadQueries } from './load-queries.js';
import { fetchData } from './fetch-data.js';
import { filter } from './filter.js';
import { parse } from './parse-results.js';
import notifier from 'node-notifier';


const queries = loadQueries('queries.json');

async function search() {
  console.log('Searching for campsites...');
  for (const query of queries) {
    const queryCriteria = query.queryCriteria;
    const filterCriteria = query.filterCriteria;
    console.log(`Searching for campsites at ${queryCriteria.campGroundName}...`);
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

let intervalId
const maxRetries = 10
let retries = 0

try {
  // run search on startup
  search();
  // run search every minute
  intervalId = setInterval(async () => search(), 1000 * 60)
} catch (error) {
  console.error(`Search failed because of ${JSON.stringify(error)}`);
  clearInterval(intervalId);
  if (retries < maxRetries) {
    retries++;
    console.log(`Starting retry ${retries} of ${maxRetries}...`);
    intervalId = setInterval(async () => search(), 1000 * 60)
  }
}
// keep process running by doing nothing once every 24 hours
setInterval(() => { }, 24 * 60 * 60 * 1000);

