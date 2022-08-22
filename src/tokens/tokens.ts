import { createToken, Lexer } from "chevrotain";

export const Slash = createToken({
	name: "Slash",
	pattern: "/",
});

export const Amp = createToken({
	name: "Amp",
	pattern: "&"
});

export const Equals = createToken({
	name: "Equals",
	pattern: "="
});

export const QueryStart = createToken({
	name: "QueryStart",
	pattern: "?",
	push_mode: "query_string_mode"
});

export const Dash = createToken({
	name: "Dash",
	pattern: "-",
	group: Lexer.SKIPPED,
});

export const Underscore = createToken({
	name: "Underscore",
	pattern: "_",
	group: Lexer.SKIPPED,
});

export const matchIdentifier = (text: string, startOffset: number): [string] | null => {
	const amp = 38;
	const dash = 45;
	const slash = 47;
	const equals = 61;
	const question = 63;
	const underscore = 95;
	const delimiters = new Set([
		amp,
		dash,
		slash,
		equals,
		question,
		underscore,
	]);
	const A = 65;
	const Z = 90;
	const a = 97;
	const z = 122;
	const reserved = new Set([
		"apartments",
		"houses",
		"condos",
		"townhouses",
		"neighborhood",
	]);

	// Consume string chunks until you reach either a delimiter or a "-"
	// If we've reached a "-" or delimiter:
	// - Is the chunk a reserved word? If yes, stop and return the combined identifier
	// - Otherwise, combine the chunk with the existing chunks through concatenation
	// - Is the reason we stopped a delimiter?
	// - - If yes, return the combined chunk now
	// - - If no, keep going

	let pointer = startOffset;
	let identifier = [];
	let chunk = "";
	let char = text.charCodeAt(pointer)

	do {
		// Consume the next character
		char = text.charCodeAt(pointer);

		// Is it a delimiter or end of string?
		if (delimiters.has(char) || Number.isNaN(char)) {
			if (reserved.has(chunk)) {
				return [identifier.join("-")];
			}

			identifier.push(chunk);

			if (char !== dash) {
				return [identifier.join("-")];
			}

			chunk = "";
		}
		// Is it an invalid character?
		else if (char < A || char > z || (char > Z && char < a)) {
			return null;
		}
		// It's a valid character, add it to the chunk
		else {
			chunk += text.charAt(pointer);
		}

		pointer ++;
	} while (!Number.isNaN(char))

	identifier.push(chunk)

	return [identifier.join("-")];
};

export const Identifier = createToken({
	name: "Identifier",
	pattern: matchIdentifier,
});

export const QueryIdentifier = createToken({
	name: "QueryIdentifier",
	pattern: /[a-z\-]+/i
});

export const Apartments = createToken({
	name: "Apartments",
	pattern: /apartments/,
	longer_alt: Identifier,
});

export const Townhouses = createToken({
	name: "Townhouses",
	pattern: /townhouses/,
	longer_alt: Identifier,
});

export const Houses = createToken({
	name: "Houses",
	pattern: /houses/,
	longer_alt: Identifier,
});

export const Condos = createToken({
	name: "Condos",
	pattern: /condos/,
	longer_alt: Identifier,
});

export const Neighborhood = createToken({
	name: "Neighborhood",
	pattern: /neighborhood/,
	longer_alt: Identifier,
});

export const Refinement = createToken({
	name: "Refinement",
	pattern: /dishwasher|pet-friendly|2-bedroom|studio/,
});

export const POI = createToken({
	name: "POI",
	pattern: function(text, startOffset) {
		if (text[startOffset] === "p" && text?.[startOffset + 1] === "/") {
			return ["p"];
		}

		return null;
	},
	longer_alt: Identifier
});
