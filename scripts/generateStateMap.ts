const states = [
	"Alabama",
	"Alaska",
	"Arizona",
	"Arkansas",
	"California",
	"Colorado",
	"Connecticut",
	"Delaware",
	"Florida",
	"Georgia",
	"Hawaii",
	"Idaho",
	"Illinois",
	"Indiana",
	"Iowa",
	"Kansas",
	"Kentucky",
	"Louisiana",
	"Maine",
	"Maryland",
	"Massachusetts",
	"Michigan",
	"Minnesota",
	"Mississippi",
	"Missouri",
	"Montana",
	"Nebraska",
	"Nevada",
	"New-Hampshire",
	"New-Jersey",
	"New-Mexico",
	"New-York",
	"North-Carolina",
	"North-Dakota",
	"Ohio",
	"Oklahoma",
	"Oregon",
	"Pennsylvania",
	"Rhode-Island",
	"South-Carolina",
	"South-Dakota",
	"Tennessee",
	"Texas",
	"Utah",
	"Vermont",
	"Virginia",
	"Washington",
	"West-Virginia",
	"Wisconsin",
	"Wyoming",
].map((s) => s.toLowerCase());

// This is a circular type, but TS does not allow that.
// Pretend it's valid and not any.
// type StateMap = Record<string, StateMap | true>
let map: any = {};

for (let state of states) {
	let ptr = map;
	for (let letter of state.slice(0, -1)) {
		if (!(letter in ptr)) ptr[letter] = {};
		ptr = ptr[letter];
	}
	ptr[state.at(-1)!] = true;
}

console.log(JSON.stringify(map, null, 4));
