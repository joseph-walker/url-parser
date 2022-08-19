import { CstParser } from "chevrotain";

import * as Token from "./tokens/tokens";
import { vocabulary } from "./tokens/vocabulary";

class UrlParser extends CstParser {
	constructor() {
		super(vocabulary);
		this.performSelfAnalysis();
	}

	public stateCity = this.RULE("stateCity", () => {
		this.CONSUME1(Token.Identifier);
		this.CONSUME2(Token.Identifier);
		this.OR([
			{ ALT: () => this.SUBRULE(this.allPropertyTypes) },
			{ ALT: () => this.SUBRULE(this.singlePropertyType) },
		]);
	});

	private singlePropertyType = this.RULE("singlePropertyType", () => {
		this.OR([
			{ ALT: () => this.CONSUME(Token.Townhouses) },
			{ ALT: () => this.CONSUME(Token.Houses) },
			{ ALT: () => this.CONSUME(Token.Condos) },
		]);
	});

	private allPropertyTypes = this.RULE("allPropertyTypes", () => {
		this.CONSUME(Token.Apartments);
	});
}

export const parser = new UrlParser();

export const productions = parser.getGAstProductions();
