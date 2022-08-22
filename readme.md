# Parser

Typescript isn't set up to compile. Run scripts using `ts-node`.

### Generate Types (Do this first)

```
npm run dev:grammar-types
```

### Run the example

```
ts-node ./src/main.ts
```

### Run tests

```
npm run test
```

### Run development mode

```bash
# Automatically builds the grammar diagram and types when parser.ts changes
npm run dev
```

### Generate the Grammar Diagram Manually

```bash
# Generate the file
npm run dev:grammar-diagram

# Serve the directory statically so you can open the HTML output file
npm run dev:serve
```
