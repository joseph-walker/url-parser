import { matchIdentifier } from "../src/tokens/tokens"

describe("matchIdentifier", function () {
	it("consumes simple identifiers", function () {
		const result = matchIdentifier("foo", 0);

		expect(result).toEqual(["foo"]);
	});

	it("consumes identifiers with 'whitespace'", function () {
		const result = matchIdentifier("foo-bar", 0);

		expect(result).toEqual(["foo-bar"]);
	});

	it("does not consume reserved words as identifiers", function () {
		const result = matchIdentifier("foo-apartments", 0);

		expect(result).toEqual(["foo"]);
	});

	it("does consume reserved word look-alikes as identifiers", function () {
		const result = matchIdentifier("foo-condosville", 0);

		expect(result).toEqual(["foo-condosville"]);
	});

	it("does not consume identifiers past delimiters", function () {
		const result = matchIdentifier("foo/bar", 0);

		expect(result).toEqual(["foo"]);
	});

	it("does not consume dashed identifiers past delimiters", function () {
		const result = matchIdentifier("foo-bar/baz-bing", 0);

		expect(result).toEqual(["foo-bar"]);
	});

	it("does consume dashed identifiers with reserved words included and delimiters", function () {
		const result = matchIdentifier("new-york-apartments/baz-bing", 0);

		expect(result).toEqual(["new-york"]);
	});

	it("returns null for invalid tokens", function () {
		const result = matchIdentifier("2-bedrooms", 0);

		expect(result).toEqual(null);
	});

	it("only consumes starting at an offset", function () {
		const result = matchIdentifier("new-york-apartments/baz-bing", 20);

		expect(result).toEqual(["baz-bing"]);
	});
});
