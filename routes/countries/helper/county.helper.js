module.exports = {
/**
 * Transforms the given data to a slimmer and meaningful response.
 *
 * @param {object} data 
 * @returns Transformed and fitered data for response
 */
transformToCountryResponse: function(data) {
  return data ? {
    commonName: data.name.common,
    officialName: data.name.official,
    nativeNames: Object.values(data.name.nativeName)?.map(
      (nativeName) => nativeName.official
    ),
    domains: data.tld,
    isIndependent: data.independent,
    status: data.status,
    currencies: Object.entries(data.currencies)?.map(([code, currency]) => ({
      name: currency.name,
      code,
      symbol: currency.symbol,
    })),
    countryCode: getCountryCodes(data.idd),
    capitals: data.capital,
    alternativeSpellings: data.altSpellings,
    region: data.region,
    subRegion: data.subregion,
    languages: {
      name: Object.values(data.languages),
      code: Object.keys(data.languages),
    },
    isLandlocked: data.landlocked,
    neighbours: data.borders,
    areaInkm: data.area,
    mapLink: data.maps.openStreetMaps,
    population: data.population,
    timeZonesInMinutes: data.timezones.map(getTimezonInMinutes),
    continents: data.continents,
    flagLink: data.flags.svg,
    coatOfArmsLink: data.coatOfArms?.svg,
    startOfWeek: data.startOfWeek,
    isDrivingRightHanded: data.car.side === "right",
    citizenDemonyms: {
      male: data.demonyms?.eng?.m,
      female: data.demonyms?.eng?.f,
    },
  }
  : data;
}
}

/**
 * Converts the timezon in string to timezone in minutes
 * with respect to UTC.
 * ASSUMPTION: Timezon provided is in format UTC+XX:XX
 *
 * @param {string} timezone 
 * @returns Timezone in minutes with respect to UTC
 */
function getTimezonInMinutes(timezone) {
  const [timezoneHour, timezoneMinutes] = timezone
    .replace("UTC", "")
    .split(":");
  return timezoneHour * 60 + timezoneMinutes;
}

/**
 * Gets the telephone code for a country.
 *
 * @param {object} countryIdd 
 * @returns list of country codes dialable.
 */
function getCountryCodes(countryIdd) {
  return countryIdd.suffixes.map((suffix) =>
    parseInt(countryIdd?.root + suffix)
  );
}
