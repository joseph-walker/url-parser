import { CstParser } from "chevrotain";

import * as Token from "./tokens/tokens";
import { vocabulary } from "./tokens/vocabulary";

class UrlParser extends CstParser {
	constructor() {
		super(vocabulary);
		this.performSelfAnalysis();
	}

	public url = this.RULE("url", () => {
		this.SUBRULE(this.stateCity);
		this.OR([
			{
				// City-State Single Property Types
				ALT: () => {
					this.SUBRULE(this.singlePropertyType);
					this.OPTION1({
						DEF: () => this.SUBRULE1(this.hood)
					});
					this.OPTION2({
						GATE: () => this.LA(1).tokenType === Token.Slash,
						DEF: () => {
							this.CONSUME1(Token.Slash);
							this.SUBRULE1(this.refinements);
						}
					});
				}
			},
			{
				// City-State Multi Property Type
				ALT: () => {
					this.OPTION3({
						DEF: () => this.SUBRULE2(this.hood)
					});
					this.CONSUME2(Token.Slash);
					this.SUBRULE1(this.multiPropertyTypeWithRefinements);
				}
			}
		]);
	});

	private stateCity = this.RULE("stateCity", () => {
		this.CONSUME1(Token.Identifier, { LABEL: "State" });
		this.CONSUME1(Token.Slash);
		this.CONSUME2(Token.Identifier, { LABEL: "City" });
	});

	private singlePropertyType = this.RULE("singlePropertyType", () => {
		this.OR([
			{ ALT: () => this.CONSUME(Token.Apartments) },
			{ ALT: () => this.CONSUME(Token.Townhouses) },
			{ ALT: () => this.CONSUME(Token.Houses) },
			{ ALT: () => this.CONSUME(Token.Condos) },
		]);
	});

	private hood = this.RULE("hood", () => {
		this.CONSUME(Token.Slash);
		this.CONSUME(Token.Identifier, { LABEL: "Neighborhood" });
		this.CONSUME(Token.Neighborhood);
	})

	private multiPropertyTypeWithRefinements = this.RULE("multiPropertyTypeWithRefinements", () => {
		this.AT_LEAST_ONE({
			DEF: () => this.OR([
				{ ALT: () => this.CONSUME(Token.Townhouses) },
				{ ALT: () => this.CONSUME(Token.Houses) },
				{ ALT: () => this.CONSUME(Token.Condos) },
				{ ALT: () => this.CONSUME(Token.Apartments) },
			])
		});
		this.SUBRULE(this.refinements);
	});

	private refinements = this.RULE("refinements", () => {
		this.MANY({
			DEF: () => this.CONSUME(Token.Refinement)
		});
	});
}

export const parser = new UrlParser();

export const productions = parser.getGAstProductions();
