import { Lexer } from "chevrotain";

import { vocabulary } from "./tokens/vocabulary";

export const lexer = new Lexer(vocabulary, {
	// Single line lexer - no line breaks in URLs
	positionTracking: "onlyOffset",
});
