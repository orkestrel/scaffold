# Unit docs-research-web — the primary-source rows the Grok research lane could not reach

Successor of `tmp/cursor/docs-research-brief.md` (Grok, session `43b1dc08-413c-41f2-ab96-6a65e288c597`, ended 04:42:26 on 2026-09-05, containment clean). What changed: the Cursor CLI's WebFetch and WebSearch returned `User Rejected` for every URL, so that lane answered from `node_modules/` only and left rows 1b, 2b, 3, 4b, 5b, 6b, 7, 8, 9, and 10 unreached. This brief carries only those rows to the native lane, per the tedious-work ladder in `.agents/orchestration.md` § Tedious work goes to Grok (Grok → Luna → Sonnet; Luna is unavailable because the Codex bench is dark). The Grok distillate at `/home/user/scaffold/tmp/cursor/docs-research.result.md` stays authoritative for every installed-package fact; do not re-derive those.

## Role and engine

`researcher` on Sonnet, a native Claude Code subagent with WebFetch and WebSearch. Perform the assignment directly and spawn nothing. You are read-only: you write no file and run no command.

## Objective

Return cited primary-source facts for the rows below, so the design round can compare the repository's installed tooling against declaration-driven documentation generators, agent-facing documentation conventions, prose linters, and single-source precedents in other ecosystems.

## Context

**Evidence.** From the Grok distillate: `@microsoft/tsdoc` 0.16.0 (parser, `DocComment` tree, no Markdown renderer), `@microsoft/api-extractor` 7.59.0 (`docModel.enabled` writes `<name>.api.json`; `unplugin-dts` 1.0.3 invokes it with `docModel: { enabled: false }` and `dtsRollup` enabled; TSDoc text is written into the rollup), `@microsoft/api-extractor-model` 7.33.11 (`ApiDocumentedItem.tsdocComment`), `typescript` 6.0.3 (`getJSDocTags`, `getJSDocCommentsAndTags`, `Symbol.getDocumentationComment`, `Symbol.getJsDocTags`, `displayPartsToString`), `oxlint` 1.80.0 (jsdoc rules `check-tag-names`, `require-param`, `require-returns`, `require-property`, `no-defaults` and others; JS plugins in alpha; `sourceCode.getAllComments` and `getJSDocComment` reachable; plugin languages `js | jsx | ts | tsx | dts`), `oxfmt` 0.65.0 (formats Markdown and MDX, `proseWrap`, `embeddedLanguageFormatting`, `jsdoc` option default disabled). The Orchestrator measured on 2026-09-05 that TSDoc `@remarks`, `@example`, and `{@link}` survive into `dist/src/core/index.d.ts` after the api-extractor rollup.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/quality.md` § Evidence before change; skill: none; guide: none.

**Host.** Outbound HTTPS from this container goes through a proxy; WebFetch is expected to work. If a fetch fails, record the URL and the failure and continue with the next row.

**Measurements.** none to take.

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

- Whether each site is reachable through the proxy; report the first failing URL per row.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Evidence sought

For every fact: the URL, at most two quoted lines, and the version or date the page states.

1b. **TSDoc semantics on tsdoc.org.** The pages for `@remarks`, `@example`, `@packageDocumentation`, `@privateRemarks`, `{@link}`, `{@inheritDoc}`, and `@label`; what `eslint-plugin-tsdoc` checks (its README on GitHub or npm); the `tsdoc.json` `extends` and `tagDefinitions` fields.
2b. **api-documenter.** From api-extractor.com or the `@microsoft/api-documenter` README: what it generates from `.api.json` (Markdown per API item, an index page), the `markdown` and `yaml` targets, whether the page layout is configurable, and its dependency count and license from its npm page.
3. **TypeDoc.** From typedoc.org: the `--json` output, `typedoc-plugin-markdown`, custom themes, the tags it honours beyond TSDoc, its license, and its dependency count from npm.
4b. **TypeScript declaration emit and comments.** From the TypeScript handbook or repository: that `tsc --declaration` copies JSDoc comments into `.d.ts` unless `removeComments` is set, and what `stripInternal` does.
5b. **oxlint documentation.** From oxc.rs (the linter guide and the rule reference): the jsdoc plugin's rule list and defaults, the JS plugin guide (how a plugin is declared, the `create(context)` shape, what `context.sourceCode` exposes, the alpha note), and whether a JS plugin can target a non-JavaScript file.
6b. **oxfmt documentation.** From oxc.rs (the formatter guide): the supported languages list, the `proseWrap` values, `embeddedLanguageFormatting`, the `jsdoc` option, and `ignorePatterns`.
7. **llms.txt and agent-facing documentation.** From llmstxt.org: the proposed format, `llms-full.txt`, and named adopters. From modelcontextprotocol.io: whether resources or a documentation convention exist for exposing docs to agents. One paragraph each.
8. **Single-source precedents.** One paragraph each, with the primary-source URL, on how the ecosystem keeps documentation in source, executes examples, and generates the reference: Rust (`rustdoc` and doc-tests, doc.rust-lang.org/rustdoc), Go (`go doc`, `Example` functions, go.dev/blog/examples), Python (docstrings, Sphinx autodoc, `doctest`), Elixir (ExDoc, doctests), Deno and JSR (`deno doc`, JSDoc-driven docs and the JSR score), Java (Javadoc).
9. **Prose linters.** Vale (vale.sh: styles, vocabulary, the runtime), `textlint`, `markdownlint`; for each, whether it can read comment text inside TypeScript files.
10. **Node.js.** Confirm from nodejs.org/api that no core module renders Markdown; one line.

## Output

Return only:

- `Evidence`: numbered to match the rows, each a list of cited facts.
- `Distillate`: one table with rows TypeDoc, api-documenter, Vale, textlint, markdownlint, llms.txt, and columns `parses TSDoc`, `generates Markdown`, `lints prose`, `formats Markdown`, `runs examples`, `new dependency`, `license`; then at most 20 lines on what the six precedents share and where each executes examples.
- `Unknowns`: every row not reached, with the failing URL.

No recommendation and no design.

## Deviation contract

A failed fetch is not a deviation: record it and continue. Stop only if every fetch fails.

## Acceptance criteria

- Every fact carries a URL.
- Every precedent paragraph names where examples execute, or says the ecosystem does not execute them.
