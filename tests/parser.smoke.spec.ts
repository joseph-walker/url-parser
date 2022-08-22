import { parseUrl } from "../src/parseUrl";

const validUrls = [
	"georgia/atlanta-apartments",
	"new-york/new-york-apartments"
];

const invalidUrls = [
	"georgia/atlanta"
];

describe("parser smoke test", function () {
	for (const url of validUrls) {
		it(`correctly parses the URL ${url}`, function () {
			expect(() => parseUrl(url)).not.toThrow();
		});
	}

	for (const url of invalidUrls) {
		it(`correctly rejects the URL ${url}`, function () {
			expect(() => parseUrl(url)).toThrow();
		});
	}
});
