import { parseUrl } from "../src/parseUrl";

const validUrls = [
	"georgia/atlanta-apartments/buckhead-neighborhood",
	"georgia/atlanta-apartments/buckhead-neighborhood/2-bedroom",
	"georgia/atlanta/buckhead-neighborhood/apartments_houses",
	"georgia/atlanta/buckhead-neighborhood/apartments_houses_2-bedroom",
	"georgia/atlanta-apartments",
	"georgia/atlanta-apartments/studio_2-bedroom",
	"georgia/atlanta/apartments_condos_houses_townhouses",
	"georgia/atlanta/apartments_condos_houses_townhouses_2-bedroom",
	"p/texas/arlington/six-flags-over-texas-apartments",
	"p/texas/arlington/six-flags-over-texas-apartments/2-bedroom",
	"p/georgia/atlanta-houses/grady-memorial-hospital",
	"p/georgia/atlanta-houses/grady-memorial-hospital/2-bedroom",
	"p/texas/arlington/six-flags-over-texas/apartments_condos_houses_townhouses",
	"p/texas/arlington/six-flags-over-texas/apartments_condos_houses_townhouses_2-bedroom"
];

describe("parser smoke test", function () {
	for (const url of validUrls) {
		it(`correctly parses the URL ${url}`, function () {
			expect(() => parseUrl(url)).not.toThrow();
		});
	}
});
