import { CstParser } from "chevrotain";

import * as Token from "./tokens/tokens";
import { vocabulary } from "./tokens/vocabulary";

class UrlParser extends CstParser {
	constructor() {
		super(vocabulary);
		this.performSelfAnalysis();
	}

	public url = this.RULE("url", () => {
		this.OR([
			{
				ALT: () => this.SUBRULE(this.poi)
			},
			{
				ALT: () => this.SUBRULE(this.stateCity)
			}
		]);
	});

	public poi = this.RULE("poi", () => {
		this.CONSUME(Token.POI);
		this.CONSUME1(Token.Slash);
		this.SUBRULE(this.stateCitySlug);
		this.OR([
			{
				// City has single property type
				ALT: () => {
					this.SUBRULE1(this.propertyType);
					this.CONSUME2(Token.Slash);
					this.CONSUME1(Token.Identifier, { LABEL: "poi" });
					this.SUBRULE1(this.optionalRefinements);
				}
			},
			{
				// City-State Multi Property Type Tokens
				ALT: () => {
					this.CONSUME3(Token.Slash);
					this.CONSUME2(Token.Identifier, { LABEL: "poi" });
					this.SUBRULE2(this.propertyType);
					this.SUBRULE2(this.optionalRefinements);
				}
			},
			{
				ALT: () => {
					this.CONSUME4(Token.Slash);
					this.CONSUME3(Token.Identifier, { LABEL: "poi" });
					this.CONSUME5(Token.Slash);
					this.SUBRULE(this.multiPropertyTypeWithRefinements);
				}
			}
		]);
	});

	public stateCity = this.RULE("stateCity", () => {
		this.SUBRULE(this.stateCitySlug);
		this.OR([
			{
				// City-State Single Property Type Token
				ALT: () => this.SUBRULE(this.singlePropertyTypeWithHood)
			},
			{
				// City-State Multi Property Type Tokens
				ALT: () => this.SUBRULE(this.multiPropertyTypeWithHood)
			}
		]);
		this.OPTION({
			GATE: () => this.LA(1).tokenType === Token.QueryStart,
			DEF: () => this.SUBRULE(this.queryString)
		})
	});

	private queryString = this.RULE("queryString", () => {
		this.CONSUME(Token.QueryStart);
		this.MANY_SEP({
			SEP: Token.Amp,
			DEF: () => this.SUBRULE(this.queryParam)
		});
	});

	private queryParam = this.RULE("queryParam", () => {
		this.CONSUME1(Token.QueryIdentifier);
		this.CONSUME(Token.Equals);
		this.CONSUME2(Token.QueryIdentifier);
	});

	private singlePropertyTypeWithHood = this.RULE("singlePropertyTypeWithHood", () => {
		this.SUBRULE(this.propertyType);
		this.OPTION({
			DEF: () => this.SUBRULE(this.hood)
		});
		this.SUBRULE(this.optionalRefinements);
	});

	private multiPropertyTypeWithHood = this.RULE("multiPropertyTypeWithHood", () => {
		this.OPTION({
			DEF: () => this.SUBRULE(this.hood)
		});
		this.CONSUME(Token.Slash);
		this.SUBRULE(this.multiPropertyTypeWithRefinements);
	});

	private stateCitySlug = this.RULE("stateCitySlug", () => {
		this.CONSUME1(Token.Identifier, { LABEL: "State" });
		this.CONSUME1(Token.Slash);
		this.CONSUME2(Token.Identifier, { LABEL: "City" });
	});

	private propertyType = this.RULE("propertyType", () => {
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
	});

	private multiPropertyTypeWithRefinements = this.RULE("multiPropertyTypeWithRefinements", () => {
		this.AT_LEAST_ONE({
			DEF: () => this.SUBRULE(this.propertyType)
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
