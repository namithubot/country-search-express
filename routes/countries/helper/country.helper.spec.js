const countryHelper = require("./county.helper");
const restcountriesResp = require("./countries.mock.json")[0];
const response = require("./cuntries-response.mock.json");

describe(countryHelper.transformToCountryResponse.name, () => {
  test("should return empty array for empty responses", () => {
    expect(countryHelper.transformToCountryResponse(undefined)).toBe(undefined);
  });

  test("should return correct array for a responses", () => {
    const data = { ...restcountriesResp };
    const expected = { ...response };

    expect(countryHelper.transformToCountryResponse(data)).toStrictEqual(
      expected
    );
  });

  test("should not fail on certain undefined responses", () => {
    const data = { ...restcountriesResp };
    const expected = { ...response };
    data.demonyms = undefined;

    expected.citizenDemonyms = {
      female: undefined,
      male: undefined,
    };

    expect(countryHelper.transformToCountryResponse(data)).toStrictEqual(
      expected
    );
  });
});
