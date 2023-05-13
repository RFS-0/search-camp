function datesMatch(date, desiredDate) {
  return date === `${desiredDate}T00:00:00Z`;
}

function dateAvailable(campSite, date) {
  return campSite["availabilities"][date] === "Available"
}

function isGroupSite(campSite) {
  const campsiteType = campSite["campsite_type"]
  if (typeof campsiteType !== "string") {
    console.warn("campsiteType is not a string", campsiteType)
    return false
  }
  return campsiteType.toUpperCase().includes("GROUP")
}

function isNotGroupSite(campSite) {
  return !isGroupSite(campSite)
}

function isTentOnly(campSite) {
  const campsiteType = campSite["campsite_type"]
  if (typeof campsiteType !== "string") {
    console.warn("campsiteType is not a string", campsiteType)
    return false
  }
  return campsiteType.toUpperCase().includes("TENT ONLY")
}

function isNotTentOnly(campSite) {
  return !isTentOnly(campSite)
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
          if (
            datesMatch(date, desiredDate) &&
            dateAvailable(campSite, date) &&
            (!!filterCriteria.includeGroup || isNotGroupSite(campSite)) &&
            (!!filterCriteria.includeTentOnly || isNotTentOnly(campSite))
          ) {
            filteredCampSites.push(campSite);
          }
        }
      }
    }
  }
  if (filteredCampSites.length === 0) {
    console.log("No campsites found :(");
  }
  return filteredCampSites;
}
