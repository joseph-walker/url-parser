import { lexer } from "./lexer";
import { parser } from "./parser";
import { visitor } from "./visitor";

const lexed = lexer.tokenize("georgia/new-york-apartments");

console.log("Lexed Output ------");
console.log(
	JSON.stringify(lexed, null, 4)
);

parser.input = lexed.tokens;
const result = parser.stateCity();

if (parser.errors.length > 0) {
	console.log("Errors ------");
	console.log(parser.errors);
} else {
	const ast = visitor.visit(result);
	console.log("AST ------");
	console.log(ast);
}
