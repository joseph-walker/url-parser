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
		const state = (children.State ?? []).map(i => i.image).join("-");
		const city = (children.City ?? []).map(i => i.image).join("-");

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
		return "all";
	}
}

export const visitor = new UrlVisitor();
