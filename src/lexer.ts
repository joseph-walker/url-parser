import { Lexer } from "chevrotain";

import { lexerDefinition } from "./tokens/vocabulary";

export const lexer = new Lexer(lexerDefinition, {
	// Single line lexer - no line breaks in URLs
	positionTracking: "onlyOffset",
});
