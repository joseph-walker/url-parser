import { lexer } from "./lexer";
import { parser } from "./parser";
import { visitor } from "./visitor";

const lexed = lexer.tokenize("georgia/atlanta-apartments");

parser.input = lexed.tokens;
const result = parser.stateCity();

if (parser.errors.length > 0) {
	console.log(parser.errors);
} else {
	const ast = visitor.visit(result);
	console.log(ast);
}
