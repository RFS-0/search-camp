import fs from 'fs';

export function loadQueries(fileName) {
  let rawdata = fs.readFileSync(fileName);
  let queries = JSON.parse(rawdata);
  return queries;
}
