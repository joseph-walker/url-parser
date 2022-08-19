# Parser

Typescript isn't set up to compile. Run scripts using `ts-node`.

### Generate Types (Do this first)

```
ts-node ./scripts/generateGrammarTypes.ts
```

### Run the example

```
ts-node ./src/main.ts
```

### Generate the Grammar Diagram

```bash
# Generate the file
ts-node ./scripts/generateGrammarDiagram.ts

# Serve the directory statically so you can open the HTML output file
http-server .
```
