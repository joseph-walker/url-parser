import { writeFileSync } from "fs";
import { resolve } from "path";
import { generateCstDts } from "chevrotain";

import { productions } from "../src/parser";

const dtsString = generateCstDts(productions);
const dtsPath = resolve(__dirname + "/../src/cst.ts");

writeFileSync(dtsPath, dtsString);
