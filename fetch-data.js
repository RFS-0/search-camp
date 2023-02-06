import fetch from 'node-fetch';

export async function fetchData(queryCriteria) {
  const fetchedData = [];
  const campGroundId = queryCriteria.campGroundId;
  for (const month of queryCriteria.months) {
    const response = await fetch(
      `https://www.recreation.gov/api/camps/availability/campground/${campGroundId}/month?start_date=2023-${month}-01T00%3A00%3A00.000Z`
    );
    const data = await response.json();
    fetchedData.push(data.campsites);
  }
  return fetchedData;
}
