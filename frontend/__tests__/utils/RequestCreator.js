const requestCreator = require("../../src/utils/RequestCreator");

const { createGetRequest } = requestCreator;

describe("Request creator that", function() {
  describe("has createGetRequest method that", function() {
    it("should create get request if there is no options", async () => {
      const fooUrl = "http://fooUrl";
      const request = createGetRequest(fooUrl);

      expect(request).toEqual(fooUrl);
    });

    it("should create get request with filter", async () => {
      const fooUrl = "http://fooUrl";
      const filter = {
        foo: "bar",
        baz: "qux"
      };
      const expectedFilter = "foo=bar&baz=qux";
      const expectedUrl = `${fooUrl}?${expectedFilter}`;
      const request = createGetRequest(fooUrl, filter);

      expect(request).toEqual(expectedUrl);
    });

    it("should create get request with fields", async () => {
      const fooUrl = "http://fooUrl";
      const fields = ["foo", "bar"];
      const expectedFields = "restrictSearchableAttributes=foo,bar";
      const expectedUrl = `${fooUrl}?${expectedFields}`;
      const request = createGetRequest(fooUrl, null, fields, null, null);

      expect(request).toEqual(expectedUrl);
    });

    it("should create get request with filter, fields, page and rows per page", async () => {
      const fooUrl = "http://fooUrl";
      const filter = {
        foo: "bar",
        baz: "qux"
      };
      const fields = ["foo", "bar"];
      const page = 20;
      const rowsPerPage = 20;

      const expectedOptions =
        "foo=bar&baz=qux&restrictSearchableAttributes=foo,bar&page=20&hitsPerPage=20";
      const expectedUrl = `${fooUrl}?${expectedOptions}`;
      const request = createGetRequest(
        fooUrl,
        filter,
        fields,
        page,
        rowsPerPage
      );

      expect(request).toEqual(expectedUrl);
    });
  });
});
