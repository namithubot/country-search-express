const expressRouter = require('express').Router;
const https = require('https');
const cache = require('apicache').middleware;
const helper = require('./helper/county.helper');

const router = expressRouter({mergeParams: true});

/* GET Countries listing. */
router.get('/countries/:name', cache('1 day'), (req, res) => {
	const countrySearchKey = req.params.name.toLowerCase();
	https.get(`https://restcountries.com/v3.1/name/${countrySearchKey}`, rcResponse => {
		const countryDetails = [];
		const headerDate = rcResponse.headers && rcResponse.headers.date ? rcResponse.headers.date : 'no response date';
		console.log('Status Code:', rcResponse.statusCode);
		console.log('Date in Response header:', headerDate);

		rcResponse.on('data', chunk => {
			countryDetails.push(chunk);
		});

		rcResponse.on('end', () => {
			const countryList = JSON.parse(Buffer.concat(countryDetails).toString());
			res.setHeader('Access-Control-Allow-Origin', '*');
			if (!countryList?.length) {
				res.sendStatus(404);
			} else {
				res.json(countryList?.map(helper.transformToCountryResponse));
			}
		});
	}).on('error', err => {
		console.log('Error: ', err.message);
	});
});

router.get('/countries', (req, res) => {
	const countrySearchKey = req.query.countryCodes || '';
	https.get(`https://restcountries.com/v3.1/alpha?codes=${countrySearchKey}`, rcResponse => {
		const countryDetails = [];
		const headerDate = rcResponse.headers && rcResponse.headers.date ? rcResponse.headers.date : 'no response date';
		console.log('Status Code:', rcResponse.statusCode);
		console.log('Date in Response header:', headerDate);

		rcResponse.on('data', chunk => {
			countryDetails.push(chunk);
		});

		rcResponse.on('end', () => {
			const countryList = JSON.parse(Buffer.concat(countryDetails).toString());
			res.setHeader('Access-Control-Allow-Origin', '*');
			if (!countryList?.length) {
				res.sendStatus(404);
			} else {
				res.json(countryList?.map(helper.transformToCountryResponse));
			}
		});
	}).on('error', err => {
		console.log('Error: ', err.message);
	});
});

module.exports = router;
