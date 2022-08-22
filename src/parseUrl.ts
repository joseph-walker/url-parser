import { lexer } from "./lexer";
import { parser } from "./parser";

export function parseUrl(url: string) {
	const lexed = lexer.tokenize(url);

	parser.input = lexed.tokens;
	parser.url();

	if (parser.errors.length > 0) {
		// TODO: Add parsing details to this error
		throw new Error(`Could not parser given URL ${url}`);
	}
}
