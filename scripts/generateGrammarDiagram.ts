import { writeFileSync } from "fs";
import { resolve } from "path";
import { createSyntaxDiagramsCode } from "chevrotain";

import { parser } from "../src/parser";

const rawHtml = createSyntaxDiagramsCode(
	parser.getSerializedGastProductions()
);

const outPath = resolve(__dirname + "/../grammar.html");

writeFileSync(outPath, rawHtml);

console.log("Wrote grammar production to " + outPath);
