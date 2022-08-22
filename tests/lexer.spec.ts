import type { IToken, TokenType } from "chevrotain";

import * as Token from "../src/tokens/tokens";
import { lexer } from "../src/lexer";

function expectToken(type: TokenType) {
	return function (tokens: IToken[]) {
		return expect(tokens.filter(t => t.tokenType === type))
	};
}

describe("URL Lexer", function () {
	describe("state tokens", function () {
		it("lexes simple state names as Identifiers", function () {
			const result = lexer.tokenize("georgia");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(1);
			expect(tokens[0].image).toBe("georgia");
		});

		it("lexes complicated state names as a list of Identifiers", function () {
			const result = lexer.tokenize("new-york");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(1);
			expect(tokens[0].image).toBe("new-york");
		});

		it("lexes regardless of capitalization", function () {
			const result = lexer.tokenize("GeOrGiA");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(1);
			expect(tokens[0].image).toBe("GeOrGiA");
			expect(tokens[0].tokenType).toBe(Token.Identifier);
		});
	});

	describe("property type tokens", function () {
		it("defers to Identifiers for things that look like property types", function () {
			const resultC = lexer.tokenize("condos");
			const tokensC = resultC.tokens;

			const resultI = lexer.tokenize("condosville");
			const tokensI = resultI.tokens;

			expect(tokensC).toHaveLength(1);
			expect(tokensC[0].image).toBe("condos");
			expect(tokensC[0].tokenType).toBe(Token.Condos);

			expect(tokensI).toHaveLength(1);
			expect(tokensI[0].image).toBe("condosville");
			expect(tokensI[0].tokenType).toBe(Token.Identifier);
		});

		it("lexes multiple property types with underscore separator", function () {
			const result = lexer.tokenize("houses_condos_townhouses_apartments");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(4);
		})
	});

	describe("refinement lexing", function () {
		it("lexes a list of refinements into Refinement tokens", function () {
			const result = lexer.tokenize("dishwasher_pet-friendly");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(2);
			expect(tokens[0].tokenType).toBe(Token.Refinement);
			expect(tokens[1].tokenType).toBe(Token.Refinement);
		});

		it("defers to identifiers for things that aren't recognized as refinements", function () {
			const result = lexer.tokenize("dishwasher_pet-friendly_foobar");
			const tokens = result.tokens;

			expect(tokens).toHaveLength(3);
			expect(tokens[0].tokenType).toBe(Token.Refinement);
			expect(tokens[1].tokenType).toBe(Token.Refinement);
			expect(tokens[2].tokenType).toBe(Token.Identifier);
		});
	});

	describe("url stress testing", function () {
		it("lexes a city/state single property type", function () {
			const result = lexer.tokenize("georgia/atlanta-apartments/pet-friendly");
			const tokens = result.tokens;

			expectToken(Token.Identifier)(tokens).toHaveLength(2);
			expectToken(Token.Refinement)(tokens).toHaveLength(1);
			expectToken(Token.Apartments)(tokens).toHaveLength(1);
		});

		it("lexes a city/state multi property type with refinements", function () {
			const result = lexer.tokenize("georgia/atlanta-apartments/pet-friendly_dishwasher");
			const tokens = result.tokens;

			expectToken(Token.Identifier)(tokens).toHaveLength(2);
			expectToken(Token.Refinement)(tokens).toHaveLength(2);
			expectToken(Token.Apartments)(tokens).toHaveLength(1);
		});
	})
});
