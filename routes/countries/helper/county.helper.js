const CONSTANTS = require('../country.constants');

module.exports = {
	/**
	 * Transforms the given data to a slimmer and meaningful response.
	 * @param {object} data Provided data that in the format of restcountries response.
	 * @returns {object} Transformed and fitered data for response
	 */
	transformToCountryResponse(data) {
		return data
			? {
				commonName: data.name.common,
				officialName: data.name.official,
				nativeNames: Object.values(data.name.nativeName || {})?.map(
					nativeName => nativeName.official,
				),
				domains: data.tld,
				isIndependent: data.independent,
				status: data.status,
				currencies: Object.entries(data.currencies || {})?.map(
					([code, currency]) => ({
						name: currency.name,
						code,
						symbol: currency.symbol,
					}),
				),
				countryCode: getCountryCodes(data.idd),
				capitals: data.capital,
				alternativeSpellings: data.altSpellings,
				region: data.region,
				subRegion: data.subregion,
				languages: Object.keys(data.languages)?.map(code => ({ name: data.languages[code], code })),
				isLandlocked: data.landlocked,
				neighbours: data.borders ?? [],
				areaInkm: data.area,
				mapLink: data.maps.openStreetMaps,
				population: data.population,
				timeZonesInMinutes: data.timezones.map(getTimezonInMinutes),
				continents: data.continents,
				flagLink: data.flags.svg,
				coatOfArmsLink: data.coatOfArms?.svg,
				startOfWeek: data.startOfWeek,
				isDrivingRightHanded: data.car.side === 'right',
				citizenDemonyms: {
					male: data.demonyms?.eng?.m,
					female: data.demonyms?.eng?.f,
				},
			}
			: data;
	},
};

/**
 * Converts the timezon in string to timezone in minutes
 * with respect to UTC.
 * ASSUMPTION: Timezon provided is in format UTC+XX:XX
 * @param {string} timezone Timezon provided in string format
 * @returns {number} Timezone in minutes with respect to UTC
 */
function getTimezonInMinutes(timezone) {
	const [timezoneHour, timezoneMinutes] = timezone
		.replace('UTC', '')
		.split(':');
	return (parseInt(timezoneHour) * CONSTANTS.MINUTES_IN_HOUR) + parseInt(timezoneMinutes);
}

/**
 * Gets the telephone code for a country.
 * @param {object} countryIdd countryIdd object based on restcountries format.
 * @returns {number[]} list of country codes dialable.
 */
function getCountryCodes(countryIdd) {
	return countryIdd.suffixes?.map(suffix =>
		parseInt(countryIdd.root + suffix, CONSTANTS.RADIX.DECIMAL),
	);
}
