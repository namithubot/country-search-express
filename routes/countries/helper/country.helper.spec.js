const countryHelper = require('./county.helper');

describe(countryHelper.transformToCountryResponse.name, () => {
	test('should return empty array for empty responses', () => {
		expect(countryHelper.transformToCountryResponse(undefined)).toBe(undefined);
	});

	test('should return correct array for a responses', () => {
		const data = require('./countries.mock.json')[0];

		const expected = {
			alternativeSpellings: [
				'MH',
				'Republic of the Marshall Islands',
				'Aolepān Aorōkin M̧ajeļ',
			],
			areaInkm: 181,
			capitals: ['Majuro'],
			citizenDemonyms: {female: 'Marshallese', male: 'Marshallese'},
			coatOfArmsLink: 'https://mainfacts.com/media/images/coats_of_arms/mh.svg',
			commonName: 'Marshall Islands',
			continents: ['Oceania'],
			countryCode: [692],
			currencies: [{code: 'USD', name: 'United States dollar', symbol: '$'}],
			domains: ['.mh'],
			flagLink: 'https://flagcdn.com/mh.svg',
			isDrivingRightHanded: true,
			isIndependent: true,
			isLandlocked: false,
			languages: {code: ['eng', 'mah'], name: ['English', 'Marshallese']},
			mapLink: 'https://www.openstreetmap.org/relation/571771',
			nativeNames: [
				'Republic of the Marshall Islands',
				'Republic of the Marshall Islands',
			],
			neighbours: undefined,
			officialName: 'Republic of the Marshall Islands',
			population: 59194,
			region: 'Oceania',
			startOfWeek: 'monday',
			status: 'officially-assigned',
			subRegion: 'Micronesia',
			timeZonesInMinutes: ['72000'],
		};

		expect(countryHelper.transformToCountryResponse(data)).toStrictEqual(
			expected,
		);
	});

	test('should not fail on certain undefined responses', () => {
		const data = require('./countries.mock.json')[0];
		data.demonyms = undefined;

		const expected = {
			alternativeSpellings: [
				'MH',
				'Republic of the Marshall Islands',
				'Aolepān Aorōkin M̧ajeļ',
			],
			areaInkm: 181,
			capitals: ['Majuro'],
			citizenDemonyms: {
				female: undefined,
				male: undefined,
			},
			coatOfArmsLink: 'https://mainfacts.com/media/images/coats_of_arms/mh.svg',
			commonName: 'Marshall Islands',
			continents: ['Oceania'],
			countryCode: [692],
			currencies: [{code: 'USD', name: 'United States dollar', symbol: '$'}],
			domains: ['.mh'],
			flagLink: 'https://flagcdn.com/mh.svg',
			isDrivingRightHanded: true,
			isIndependent: true,
			isLandlocked: false,
			languages: {code: ['eng', 'mah'], name: ['English', 'Marshallese']},
			mapLink: 'https://www.openstreetmap.org/relation/571771',
			nativeNames: [
				'Republic of the Marshall Islands',
				'Republic of the Marshall Islands',
			],
			neighbours: undefined,
			officialName: 'Republic of the Marshall Islands',
			population: 59194,
			region: 'Oceania',
			startOfWeek: 'monday',
			status: 'officially-assigned',
			subRegion: 'Micronesia',
			timeZonesInMinutes: ['72000'],
		};

		expect(countryHelper.transformToCountryResponse(data)).toStrictEqual(
			expected,
		);
	});
});
