import { lexer } from "./lexer";
import { parser } from "./parser";

const input = "georgia/atlanta/buckhead-neighborhood/houses_condos_pet-friendly";
const lexed = lexer.tokenize(input);

console.log("Lexed Output ------");
console.log(
	JSON.stringify(lexed, null, 4)
);

parser.input = lexed.tokens;
const result = parser.url();

if (parser.errors.length > 0) {
	console.log("Errors ------");
	console.log(parser.errors);
} else {
	console.log("AST ------");
	console.log(
		JSON.stringify(result, null, 4)
	);
}
