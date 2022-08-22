import * as Token from "./tokens";

// ORDER MATTERS
export const vocabulary = [
	Token.Slash,
	Token.Dash,
	Token.Underscore,
	Token.QueryStart,
	Token.Amp,
	Token.Equals,
	Token.Apartments,
	Token.Condos,
	Token.Houses,
	Token.Townhouses,
	Token.Neighborhood,
	Token.Refinement,
	Token.Identifier,
	Token.QueryIdentifier,
];

export const lexerDefinition = {
	modes: {
		url_mode: [
			Token.Slash,
			Token.Dash,
			Token.Underscore,
			Token.QueryStart,
			Token.Apartments,
			Token.Condos,
			Token.Houses,
			Token.Townhouses,
			Token.Neighborhood,
			Token.Refinement,
			Token.Identifier,
		],
		query_string_mode: [
			Token.Equals,
			Token.Amp,
			Token.QueryIdentifier
		]
	},
	defaultMode: "url_mode"
};
