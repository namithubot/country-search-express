const https = require('https');
const request = require("supertest");
const app = require("../../app");
const countryMockRestCoutnries = require('./helper/countries.mock.json');
const responseCountry = require('./helper/cuntries-response.mock.json');

jest.mock('https');

describe("Test country search", () => {
  test("It should response the GET method with a proper mock for a correct country", () => {
	https.get.mockResolvedValue(countryMockRestCoutnries);
    return request(app)
      .get("/countries/marshall")
      .expect(200);
  });
});