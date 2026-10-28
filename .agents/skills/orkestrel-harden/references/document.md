# Document one package

This reference governs the guide pass for one package, `AGENTS.md` § Work loop step 6, which fixes when it starts. `.claude/rules/documentation.md` holds the law for guides, parity, and examples, and `.claude/rules/typescript.md` § Comments and API documentation holds the TSDoc shape. This file holds the steps and restates none of them.

## Take the worklist

1. Read the governing guide, the README, and the barrel of each environment the package publishes.
2. Run `npm run test:guides`, read-only. Its drift report is the worklist for the Summary cells, titled examples, and tagline.
3. List each export the change added, removed, or altered, and each guide section that names one.

## Write each surface

1. **Guide.** Update every guide the package owns: the `## Surface` and `## Methods` rows, patterns, limitations, and the `guides/README.md` indexes when a guide is added or removed.
2. **README.** Set the pitch equal to the guide's tagline; keep the install and link lines in step with the shipped exports.
3. **TSDoc.** Give each export the change touched the block `.claude/rules/typescript.md` § Comments and API documentation fixes, with fictional descriptive data in its `@example`.
4. **Fences.** Import through the published specifier and run each example; read what it returns before writing the comment beside it.

## Choose the rewrite direction

Choose per drift row by the side you wrote in this pass.

- Run `npm run test:guides -- --to guide` when the TSDoc block carries the wording to keep.
- Run `npm run test:guides -- --to source` when the guide carries it.

Run one direction at a time, then rerun the read-only command until the worklist is empty.

## Read the prose last

Re-read every changed sentence against what shipped, per `.claude/rules/documentation.md` § Parity. For each behavior claim, name the example or assertion that breaks when the claim goes false; add the assertion where none exists.

## Close

Run `npm run test:guides`, then the repository's format check, and report both exit codes with the guides, README, and files touched.
