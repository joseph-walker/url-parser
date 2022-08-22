import { createServer } from "http";
import { readFileSync } from "fs";
import { resolve } from "path";

const server = createServer(function (req, res) {
	const rawHtml = readFileSync(resolve(__dirname + "/../grammar.html"), { encoding: "utf-8" });

	res.writeHead(200, { "content-type": "text/html" });
	res.end(rawHtml);
});

server.listen(8080);

console.log("Hosting production diagram on http://localhost:8080");
