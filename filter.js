function datesMatch(date, desiredDate) {
  return date === `${desiredDate}T00:00:00Z`;
}

function dateAvailable(campSite, date) {
  return campSite["availabilities"][date] === "Available"
}

export function filter(fetchedData, filterCriteria) {
  const filteredCampSites = [];
  for (const data of fetchedData) {
    for (const campSiteId of Object.keys(data)) {
      if (!campSiteId) {
        console.warn("No campsite id found");
      }
      const campSite = data[campSiteId];
      for (const date of Object.keys(campSite["availabilities"])) {
        for (const desiredDate of filterCriteria.desiredDates) {
          if (datesMatch(date, desiredDate) && dateAvailable(campSite, date)) {
            filteredCampSites.push(campSite);
          }
        }
      }
    }
  }
  return filteredCampSites;
}
