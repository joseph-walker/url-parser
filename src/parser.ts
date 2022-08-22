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
				// City-State Single Property Types, excluding -apartments (may be multi)
				ALT: () => this.SUBRULE(this.singlePropertyTypeExcludingApartments)
			},
			{
				// -apartments as a single-property-type
				ALT: () => this.SUBRULE(this.apartmentsAsSingleOrMultiPropertyType)
			},
			{
				// City-State Multi Property Type
				ALT: () => this.SUBRULE(this.multiPropertyType)
			}
		]);
	});

	private singlePropertyTypeExcludingApartments = this.RULE("singlePropertyTypeExcludingApartments", () => {
		this.SUBRULE(this.singlePropertyType);
		this.OPTION({
			DEF: () => this.SUBRULE(this.hood)
		});
		this.SUBRULE(this.optionalRefinements);
	});

	private apartmentsAsSingleOrMultiPropertyType = this.RULE("apartmentsAsSingleOrMultiPropertyType", () => {
		this.CONSUME(Token.Apartments);
		this.OPTION({
			DEF: () => this.SUBRULE(this.hood)
		});
		this.SUBRULE(this.optionalRefinements);
	});

	private multiPropertyType = this.RULE("multiPropertyType", () => {
		this.OPTION({
			DEF: () => this.SUBRULE(this.hood)
		});
		this.CONSUME(Token.Slash);
		this.SUBRULE(this.multiPropertyTypeWithRefinements);
	});

	private stateCity = this.RULE("stateCity", () => {
		this.CONSUME1(Token.Identifier, { LABEL: "State" });
		this.CONSUME1(Token.Slash);
		this.CONSUME2(Token.Identifier, { LABEL: "City" });
	});

	private singlePropertyType = this.RULE("singlePropertyType", () => {
		this.OR([
			{ ALT: () => this.CONSUME(Token.Townhouses) },
			{ ALT: () => this.CONSUME(Token.Houses) },
			{ ALT: () => this.CONSUME(Token.Condos) },
		]);
	});

	private hood = this.RULE("hood", () => {
		this.CONSUME(Token.Slash);
		this.CONSUME(Token.Identifier, { LABEL: "Neighborhood" });
		this.CONSUME(Token.Neighborhood);
	});

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

	private optionalRefinements = this.RULE("optionalRefinements", () => {
		this.OPTION({
			GATE: () => this.LA(1).tokenType === Token.Slash,
			DEF: () => {
				this.CONSUME(Token.Slash);
				this.SUBRULE(this.refinements);
			}
		});
	});
}

export const parser = new UrlParser();

export const productions = parser.getGAstProductions();
