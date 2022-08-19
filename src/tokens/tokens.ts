import { createToken, Lexer } from "chevrotain";

export const Identifier = createToken({
	name: "Identifier",
	pattern: /[a-z]+/i,
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

export const Slash = createToken({
	name: "Slash",
	pattern: /\//,
	group: Lexer.SKIPPED
});

export const Dash = createToken({
	name: "Dash",
	pattern: /\-/,
	group: Lexer.SKIPPED
});
