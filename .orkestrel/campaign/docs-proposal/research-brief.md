# Unit docs-research — primary sources on TSDoc, declaration-driven documentation generators, oxlint, oxfmt, and single-source documentation precedents

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in `--mode=ask`. You are the bench engine reading this brief inside your own CLI. Perform the assignment directly and spawn nothing. This is a research lane: read primary sources on the web where your tools reach the web, and read the installed packages under `/home/user/scaffold/node_modules/` where they do not. Say under Unknowns which of the two you used for each row.

## Objective

Return a cited capability matrix for the tools that could turn TSDoc into guides, lint prose, or format Markdown, so an Orchestrator can rule on a documentation pipeline from primary sources rather than recollection.

## Question

What do TSDoc, api-extractor and its doc model, TypeDoc, the TypeScript compiler API, oxlint (its jsdoc rules and its JS plugin API), oxfmt, and the llms.txt convention each provide for generating and checking documentation from source, at the versions this repository installs, and what do comparable ecosystems do to keep one source of truth?

## Context

**Evidence.** From `/home/user/scaffold` on 2026-09-05: `package.json` devDependencies include `@microsoft/api-extractor`, `oxfmt`, `oxlint`, `typescript`, `vite-plugin-dts`, `vitest`; `.oxlintrc.json` registers a JS plugin `{ "name": "policy", "specifier": "./configs/policy.ts" }` and the rules `policy/no-mocking` and `policy/no-keyword-privacy`; `.oxfmtrc.json` sets `printWidth: 100`, `useTabs: true`, `semi: false`, `singleQuote: true`. `.claude/rules/typescript.md` lines 76-88 require complete TSDoc on every public export with a third-person `-s` verb first sentence, `@param`, `@returns`, and `@example` where applicable, `@remarks` for options fields, and forbid `@internal`. `.claude/rules/writing.md` § Substitutions carries a table of banned words with replacements (`should`, `simply`, `currently`, `leverage`, `via`, `e.g.`, and others).

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/quality.md` § Research where it names primary sources; skill: none; guide: none.

**Host.** Linux container, bash, working path `/home/user/scaffold`. Outbound HTTPS goes through a proxy the CLI is configured for; if a fetch fails, record the failure and read the installed package instead. Never run `npm install` or any mutating command; an `npm` shim on `PATH` refuses install-class subcommands.

**Measurements.** Read each installed version from `node_modules/<package>/package.json` and report it beside the row.

**Control identifiers.** none.

**Standing conditions.** `@microsoft/tsdoc` is installed only as a transitive dependency of `@microsoft/api-extractor`; it is not declared in `package.json`. Report it as such.

## Unknowns

- Whether your CLI reaches the web in this container. Report the first URL you fetched and whether it returned.

## Scope

**Owned.** none — read-only. **Shared.** none. **Off-limits.** every file; never create, edit, or delete, never read `.env*`, `.npmrc`, `auth.json`, or a credential. **What asserts the state this change ends.** none. **Tools and limits.** web reading and installed-package reading only.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn nothing.

## Evidence sought

For every row: cite the URL or the `node_modules` path with a line, quote at most two lines, and give the version the fact holds for.

1. **TSDoc.** From tsdoc.org and `node_modules/@microsoft/tsdoc/`: the standard tag set (block tags, modifier tags, inline tags) with one line each on `@remarks`, `@example`, `@param`, `@returns`, `@throws`, `@see`, `@defaultValue`, `@typeParam`, `@packageDocumentation`, `@privateRemarks`, `@label`, `{@link}`, `{@inheritDoc}`; the `tsdoc.json` configuration file and custom tag definitions; the `TSDocParser` API (`parseString`, `DocComment`, the node tree) and whether it renders to Markdown; the `eslint-plugin-tsdoc` rule and what it checks.
2. **api-extractor and its doc model.** From api-extractor.com and `node_modules/@microsoft/api-extractor/`: the `.api.json` doc model (`docModel.enabled`), `@microsoft/api-extractor-model`, what `@microsoft/api-documenter` generates from it (Markdown per symbol, its layout, whether the layout is configurable), and how `vite-plugin-dts` invokes api-extractor (`rollupTypes`). Report whether TSDoc text survives into the rolled-up `.d.ts`.
3. **TypeDoc.** From typedoc.org: the `--json` output, `typedoc-plugin-markdown`, custom themes, and the tags TypeDoc honours beyond TSDoc. One paragraph, with the license and the dependency count it would add.
4. **TypeScript compiler API.** From the TypeScript repository or handbook: `ts.getJSDocTags`, `ts.getJSDocCommentsAndTags`, `Symbol.getDocumentationComment(checker)`, `Symbol.getJsDocTags`, `ts.displayPartsToString`, and whether `tsc --declaration` preserves JSDoc in emitted `.d.ts`. Give the signatures.
5. **oxlint.** From oxc-project.github.io and `node_modules/oxlint/`: the installed version; the `jsdoc` plugin rules implemented (list the rule names, and say which of `require-param`, `require-returns`, `check-tag-names`, `require-property`, `no-defaults`, `check-param-names` exist); the JS plugin API (`definePlugin`, `defineRule`, `create(context)`, `context.report`, `context.sourceCode`, and whether `getAllComments`, `getCommentsBefore`, or an equivalent exposes comment text to a rule); whether a JS plugin rule can lint a Markdown file or only JavaScript and TypeScript; and the stability status of JS plugins at the installed version.
6. **oxfmt.** From oxc-project.github.io/docs/guide/usage/formatter and `node_modules/oxfmt/`: the installed version; the file types it formats (JavaScript, TypeScript, JSON, and whether Markdown, YAML, CSS, or embedded fences are supported); whether it formats comment bodies or JSDoc; the configuration keys; and whether an `ignore` list or `.prettierignore` is honoured.
7. **llms.txt and agent-facing documentation.** From llmstxt.org: the proposed format, the `llms-full.txt` variant, and one or two adopters. From the Model Context Protocol or a comparable primary source: whether a documentation resource convention exists for tools. One paragraph each.
8. **Single-source precedents.** For each of Rust (`rustdoc` and doc-tests), Go (`go doc` and `Example` functions), Python (docstrings with Sphinx autodoc and doctest), Elixir (ExDoc and doctests), Deno and JSR (`deno doc` and JSDoc-driven documentation with scoring), and Java (Javadoc): one paragraph on how the ecosystem keeps documentation in source, executes examples, and generates the reference, with the primary-source URL.
9. **Prose linting tools.** From primary sources: Vale (vale.sh) style rules and the vocabulary it can enforce, `textlint`, and `markdownlint`; for each, the runtime it needs and whether it can read comment text inside TypeScript. One paragraph each.
10. **Markdown from data in JavaScript without new dependencies.** From the Node.js documentation: nothing to research beyond confirming there is no built-in Markdown renderer; record that.

## Output

Return only these sections, in this order:

- `Question`: one line.
- `Evidence`: numbered to match the ten rows, each a list of cited facts.
- `Distillate`: a capability matrix in one table — rows are the tools, columns are `parses TSDoc`, `generates Markdown`, `lints prose`, `formats Markdown`, `runs examples`, `new dependency`, `installed version` — then at most 20 lines on what the precedents share.
- `Unknowns`: every row the lane did not reach and whether web reach worked.
- `Journal`: the journal path and the session id from the `init` event.
- `Deviation`: `none`, or the exact command that failed and its output.

## Deviation contract

A failed fetch is not a deviation: record it under Unknowns and read the installed package instead. Stop only if the CLI cannot read `/home/user/scaffold/node_modules/`.

## Acceptance criteria

- Every fact carries a URL or a `node_modules` path.
- Every tool row in the matrix carries an installed version or `not installed`.
- No recommendation and no design appear in the return.
