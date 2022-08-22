import { createServer } from "http";
import { createSyntaxDiagramsCode } from "chevrotain";

import { parser } from "../src/parser";

const server = createServer(function (req, res) {
	const rawHtml = createSyntaxDiagramsCode(
		parser.getSerializedGastProductions()
	);

	res.writeHead(200, { "content-type": "text/html" });
	res.end(rawHtml);
});

server.listen(8080);

console.log("Watching for grammar changes");
console.log("Hosting production diagram on http://localhost:8080");
