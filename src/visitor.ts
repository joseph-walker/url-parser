import {
	AllPropertyTypesCstChildren,
	SinglePropertyTypeCstChildren,
	StateCityCstChildren
} from "./cst";

import { parser } from "./parser";

const BaseUrlVisitor = parser.getBaseCstVisitorConstructor();

class UrlVisitor extends BaseUrlVisitor {
	constructor() {
		super();
		this.validateVisitor();
	}

	public stateCity(children: StateCityCstChildren) {
		const state = children.Identifier[0].image;
		const city = children.Identifier[1].image;

		const propertyTypes = this.visit(
			children.allPropertyTypes ?? children.singlePropertyType!
		);

		return {
			city,
			state,
			propertyTypes
		};
	}

	public singlePropertyType(children: SinglePropertyTypeCstChildren) {
		if ("Houses" in children) { return "houses" };
		if ("Townhouses" in children) { return "townhouses" };
		if ("Condos" in children) { return "condos" };
	}

	public allPropertyTypes(children: AllPropertyTypesCstChildren) {
		throw new Error("Method not implemented.");
	}
}

export const visitor = new UrlVisitor();
