# Unit docs-research-web — report

Returned by `researcher` on Sonnet on 2026-09-05 (brief: `tmp/units/docs-research-web-brief.md`), captured verbatim by the Orchestrator. Orchestrator note: the Unknowns row on `@microsoft/api-documenter` reads a disagreement between `7.30.13` and `7.59.0`; the two numbers belong to different packages (`api-documenter` and `api-extractor` carry separate version lines), so there is no conflict to reconcile.

## Evidence

**1b. TSDoc semantics (tsdoc.org).**
- `@remarks`: "The `@remarks` block tag ends the summary section, and begins the remarks section for a doc comment." (https://tsdoc.org/pages/tags/remarks/, no date on page)
- `@example`: "Indicates a documentation section that should be presented as an example illustrating how to use the API. It may include a code sample." (https://tsdoc.org/pages/tags/example/)
- `@packageDocumentation`: "Used to indicate a doc comment that describes an entire NPM package (as opposed to an individual API item belonging to that package)." Must appear as the first doc comment in the `*.d.ts` entry point. (https://tsdoc.org/pages/tags/packagedocumentation/)
- `@privateRemarks`: "Starts a section of additional documentation content that is not intended for a public audience. A tool must omit this entire section from the API reference web site, generated *.d.ts file, and any other outputs." (https://tsdoc.org/pages/tags/privateremarks/)
- `{@link}`: "The `{@link}` inline tag is used to create hyperlinks to other pages in a documentation system or general internet URLs," and "supports expressions for referencing API items." (https://tsdoc.org/pages/tags/link/)
- `{@inheritDoc}`: "is an inline tag used to automatically generate an API item's documentation by copying it from another API item." Copies only "summary section, @remarks block, @params blocks, @typeParam blocks, @returns block." (https://tsdoc.org/pages/tags/inheritdoc/)
- `@label`: "The `{@label}` inline tag is used to label a declaration, so that it can be referenced using a selector in the TSDoc declaration reference notation." Notation "has not been finalized" per GitHub issue #9. (https://tsdoc.org/pages/tags/label/)
- `eslint-plugin-tsdoc`: version `0.5.2`, license `MIT`, description "An ESLint plugin that validates TypeScript doc comments," enforced through a `tsdoc/syntax` rule. (https://registry.npmjs.org/eslint-plugin-tsdoc/latest; the GitHub `tree/main/eslint-plugin` path returned `404`)
- `tsdoc.json` `extends`: "specifies a list of paths that will be mixed in with the current file," resolved through Node.js module resolution, local paths must begin with `./`. `tagDefinitions` entries can be shared across projects through this mechanism. (https://tsdoc.org/pages/packages/tsdoc-config/, found through web search; the URL named in the brief, `/pages/spec/tsdoc_json_format/`, returned `404`)

**2b. api-documenter.**
- "API Extractor includes a companion tool called api-documenter that you can use to generate a basic API reference website." (https://api-extractor.com/pages/setup/generating_docs/)
- Two output targets from `.api.json`: Markdown ("fairly basic," "designed to be concise and understandable") and YAML (DocFX-compatible).
- Page layout configurability is not addressed on that page; the Markdown output is described as a "starting point for people who want to implement their own adapter," implying limited built-in configurability.
- `@microsoft/api-documenter` package data: version `7.30.13`, license `MIT`, `5` dependencies. (https://registry.npmjs.org/@microsoft/api-documenter/latest; `npmjs.com` returned `403 Forbidden`)

**3. TypeDoc.**
- `--json`: "Specifies the location to output a JSON file containing all of the reflection data." (https://typedoc.org/documents/Options.Output.html)
- Themes: "Themes allow you to change the look and feel of the generated documentation. The `--theme` option is used to change the selected theme." For minor changes, "the `--customCss` or `--customJs` options may be sufficient." (https://typedoc.org/documents/Themes.html)
- Tags beyond TSDoc: "It also includes some JSDoc tags which are very widely used but have no associated behavior to reduce the need for custom configuration." The specific tag list did not render on this page. (https://typedoc.org/documents/Tags.html)
- `typedoc` package: version `0.28.20`, license `Apache-2.0`, `5` dependencies (`lunr`, `yaml`, `minimatch`, `markdown-it`, `@gerrit0/mini-shiki`). (https://registry.npmjs.org/typedoc/latest; `npmjs.com` returned `403 Forbidden`)
- `typedoc-plugin-markdown` package: version `4.13.0`, license `MIT`, description "Generates TypeScript API documentation as Markdown," `0` runtime dependencies, `1` peer dependency (`typedoc`). (https://registry.npmjs.org/typedoc-plugin-markdown/latest)

**4b. TypeScript declaration emit and comments.**
- `declaration`: generates `.d.ts` files describing the module's external API. (https://www.typescriptlang.org/tsconfig/#declaration, released with TypeScript `1.0`)
- `removeComments`: "Strips all comments from TypeScript files when converting into JavaScript"; default `false`; does **not** affect `.d.ts` files — "comments are preserved in declarations to maintain documentation for consumers of your library." (https://www.typescriptlang.org/tsconfig/#removeComments, released `1.0`)
- `stripInternal`: "removes declarations marked with the `@internal` JSDoc tag from the generated `.d.ts` declaration files." (https://www.typescriptlang.org/tsconfig/#stripInternal, released `1.5`)

**5b. oxlint documentation (oxc.rs).**
- jsdoc rule categories: restriction, correctness, style, pedantic; none enabled by default. Sample rules: `check-access`, `check-property-names`, `check-tag-names`, `empty-tags`, `implements-on-classes`, `no-blank-blocks`, `require-param`, `require-returns`. (https://oxc.rs/docs/guide/usage/linter/rules.html)
- JS plugins declared in `.oxlintrc.json` or `oxlint.config.ts` under a `jsPlugins` array; supports local files, npm packages, or scoped packages. `context` exposes `SourceCode` APIs: `getText(node)`, `getTokens(node)`, `getAncestors`, and scope/control-flow analysis. "JS plugins are currently in alpha, and remain under active development." Custom file formats and parsers such as Svelte, Vue, and Angular are "explicitly not supported yet," so a JS plugin cannot target a non-JavaScript/TypeScript file. (https://oxc.rs/docs/guide/usage/linter/js-plugins.html; the brief's `plugins.html` URL only pointed onward to this page)

**6b. oxfmt documentation (oxc.rs).**
- Supported languages: "JavaScript, JSX, TypeScript, TSX, JSON, JSONC, JSON5, YAML, TOML, HTML, Angular, Vue, Svelte, CSS, SCSS, Less, Markdown, MDX, GraphQL, Ember, Handlebars, and more." (https://oxc.rs/docs/guide/usage/formatter.html)
- `proseWrap`: `"always"`, `"never"`, `"preserve"` (default). `embeddedLanguageFormatting`: `"auto"` (default) or `"off"`. `jsdoc`: disabled by default; when enabled, "tag aliases are canonicalized, descriptions are capitalized, long lines are wrapped, and short comments are collapsed to single-line." `ignorePatterns`: `string[]`, gitignore-style, default `[]`, rooted at the config file's directory, entries containing `..` are rejected. (https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)

**7. llms.txt and agent-facing documentation.**
The `/llms.txt` specification, version `2` (modified 2026-08-10), proposes adding an `/llms.txt` Markdown file to a site with an H1 title, an optional blockquote summary, and H2-delimited sections of curated links; the page does not mention a separate `llms-full.txt` format. Named adopters include OpenAI, Anthropic, Google Gemini, Mintlify, GitBook, Yoast SEO, AIOSEO, and FastHTML. (https://llmstxt.org/)
The Model Context Protocol defines a `resources` capability through which a server exposes data — files, schemas, or application-specific information — to a client by URI, with `resources/list` and `resources/read` methods, annotations for `audience` and `priority`, and a `file://` scheme; this is a general data-exposure mechanism rather than a documentation-specific convention. (https://modelcontextprotocol.io/docs/concepts/resources, specification version `2026-07-28`)

**8. Single-source precedents.**
- **Rust**: rustdoc extracts documentation from `///` (outer) and `//!` (inner) comments and Markdown, generating HTML; it also "supports executing your documentation examples as tests," inserting `allow` attributes and wrapping code in `fn main()` before compiling and running doc-tests. Examples execute at `cargo test` time as compiled, run code. (https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html; https://doc.rust-lang.org/rustdoc/write-documentation/documentation-tests.html)
- **Go**: `Example` functions in `_test.go` files are "compiled (and optionally executed) as part of a package's test suite" (published 2015-05-07); output is captured and compared against a `// Output:` comment, and `godoc` displays the example alongside the documented API. Examples execute inside `go test`. (https://go.dev/blog/examples)
- **Python**: docstrings on modules, functions, classes, and methods are parsed by `doctest`'s `DocTestParser` for `>>>`-prefixed interactive examples, executed against a shallow copy of the module's globals, and compared to expected output; run through `doctest.testmod()`, `python -m doctest`, or `unittest` integration (`DocTestSuite`, `DocFileSuite`). Sphinx's `autodoc` extension extracts and renders the same docstrings into documentation but does not itself execute them. (https://docs.python.org/3/library/doctest.html, documented for Python `3.14.7`)
- **Elixir**: ExDoc `0.40.4` reads `@doc` and `@moduledoc` attributes at their point of definition to generate HTML, Markdown, and EPUB documentation. The fetched page did not describe doctest execution; Elixir's `doctest` mechanism (`ExUnit.DocTest`) is a separate, unfetched primary source for that execution step. (https://ex-doc.hexdocs.pm/readme.html)
- **Deno/JSR**: `deno doc` prints JSDoc documentation for a module's exported members, supports `npm:` and `jsr:` specifiers as of Deno `2.8`, accepts Markdown in descriptions, and outputs text, HTML, or JSON; a `--lint` flag flags missing comments on public types and unresolved references. (https://docs.deno.com/runtime/reference/cli/doc/) JSR's score spans Documentation, Best practices, Discoverability, and Compatibility categories; the Documentation category checks for a README, module documentation, and per-symbol documentation, requiring at least 80% of exported symbols to carry documentation before that category scores fully. (https://jsr.io/docs/scoring, found through web search; direct fetch returned `403 Forbidden`)
- **Java**: Javadoc reads documentation comments from source and class files and renders them through a pluggable doclet, defaulting to the Standard Doclet producing HTML. JEP 413 lets a comment embed a code snippet for display, but the fetched page does not describe Javadoc executing any example. (https://docs.oracle.com/en/java/javase/21/javadoc/javadoc.html)

**9. Prose linters.**
- **Vale**: "brings code-like linting to prose" through a Go CLI, a Rust LSP implementation, a TypeScript GitHub Action, and YAML style packages; vocabularies (`accept.txt`/`reject.txt` under `<StylesPath>/config/vocabularies/<name>/`) hold custom terminology separate from styles. (https://docs.vale.sh/, https://vale.sh/docs/keys/vocab, found through web search) Vale reads comment text inside source files by mapping a file extension to a markup format so that format's parser applies inside the source file, exposing `comment.line` and `comment.block` scopes for targeting rules at comments specifically; `BlockIgnores`, however, work only in Markdown, reStructuredText, AsciiDoc, and Org Mode. (https://vale.sh/features/code, https://vale.sh/docs/scopes, found through web search)
- **textlint**: "the pluggable linting tool for natural language," supporting Markdown and plain text by default with HTML, reStructuredText, AsciiDoc, Re:VIEW, and Org-mode through plugins; requires Node.js `20+`. No dedicated plugin was found in this session that extracts comment text from TypeScript files. (https://textlint.org/, https://github.com/textlint/textlint)
- **markdownlint**: "A Node.js style checker and lint tool for Markdown/CommonMark files," referencing version `0.41.1` in an example. No evidence found that it reads comment text inside TypeScript files; its scope is Markdown/CommonMark documents. (https://github.com/DavidAnson/markdownlint)

**10. Node.js.**
The Node.js `26.8.1` API documentation index lists no core module that renders Markdown to HTML. (https://nodejs.org/api/)

## Distillate

| Tool | parses TSDoc | generates Markdown | lints prose | formats Markdown | runs examples | new dependency | license |
|---|---|---|---|---|---|---|---|
| TypeDoc | yes (TSDoc-compatible tags, plus unenforced JSDoc tags) | yes (native HTML; Markdown through `typedoc-plugin-markdown`) | no | no | no | yes (`typedoc` adds `5` dependencies; `typedoc-plugin-markdown` adds `0` runtime, `1` peer) | Apache-2.0 (`typedoc`); MIT (`typedoc-plugin-markdown`) |
| api-documenter | yes (consumes `@microsoft/api-extractor-model`'s `.api.json`, itself built from TSDoc) | yes (Markdown and YAML/DocFX targets) | no | no | no | yes (adds `5` dependencies) | MIT |
| Vale | no | no | yes (styles plus vocabularies) | no | no | yes (separate Go/Rust/TypeScript binaries and style packages) | unknown from pages fetched |
| textlint | no | no | yes (Markdown and plain text by default) | no | no | yes | unknown from pages fetched |
| markdownlint | no | no | yes (Markdown-structure rules, not prose style) | no (lints, does not format) | no | yes | unknown from pages fetched |
| llms.txt | no (it is a file convention, not a parser) | no (it is authored or curated, not generated from TSDoc) | no | no | no | none (a file convention, no package) | not applicable |

Every fetched precedent — Rust, Go, Python, Elixir, Deno/JSR, Java — keeps the documentation comment attached to the declaration it describes, in the same source file, rather than in a separate document. Rust, Go, and Python additionally treat an embedded example as executable code: rustdoc compiles and runs each doc-test at `cargo test` time; Go compiles and optionally runs each `Example` function inside `go test`, checking captured output against a `// Output:` comment; Python's `doctest` executes each `>>>`-prefixed line against a copy of the module's globals, invoked through `doctest.testmod()`, `python -m doctest`, or a `unittest` adapter. Elixir's fetched ExDoc page describes only comment-to-documentation generation (`@doc`/`@moduledoc` to HTML, Markdown, EPUB) and did not state whether doctest execution was covered on that page; Elixir's `ExUnit.DocTest` module is the separate, unfetched primary source for that step. Deno's `deno doc` renders JSDoc into text, HTML, or JSON, and JSR's score rewards a package for documenting a share of its exported symbols, but neither fetched page describes executing an embedded example. Java's Javadoc renders comments into HTML through a doclet and can display a code snippet through JEP 413, but the fetched page describes no execution step for that snippet.

## Unknowns

| Row | Gap | Failing URL or reason |
|---|---|---|
| 1b | `tsdoc.json` schema page at the URL the brief names | `https://tsdoc.org/pages/spec/tsdoc_json_format/` returned `404`; recovered the `extends`/`tagDefinitions` fact from `https://tsdoc.org/pages/packages/tsdoc-config/` through web search instead |
| 1b | `eslint-plugin-tsdoc` README detail beyond the registry description | `https://github.com/microsoft/tsdoc/tree/main/eslint-plugin` returned `404` |
| 2b | `@microsoft/api-documenter` npm page (dependency and license cross-check) | `https://www.npmjs.com/package/@microsoft/api-documenter` returned `403 Forbidden`; used `https://registry.npmjs.org/@microsoft/api-documenter/latest` instead, which reported `7.30.13` (a separate version line from `api-extractor`'s `7.59.0`; see the Orchestrator note at the top) |
| 3 | `typedoc` and `typedoc-plugin-markdown` npm pages | `https://www.npmjs.com/package/typedoc` and `https://www.npmjs.com/package/typedoc-plugin-markdown` both returned `403 Forbidden`; used the `registry.npmjs.org` endpoint instead |
| 3 | The specific list of non-TSDoc JSDoc tags TypeDoc honours | The fetched `https://typedoc.org/documents/Tags.html` page described the category but did not enumerate the tags in the returned content |
| 8 | ExDoc doctest execution mechanism | The fetched `https://ex-doc.hexdocs.pm/readme.html` page did not address doctest execution; `ExUnit.DocTest` was not fetched in this session |
| 8 | JSR scoring detail beyond the search-engine summary | `https://jsr.io/docs/scoring` and `https://jsr.io/docs/scoring-and-badges` both returned `403 Forbidden`; the Distillate's JSR score facts rest on a `WebSearch` summary of that page rather than a direct fetch |
| 8 | Javadoc example-execution confirmation from a second source | `https://www.oracle.com/java/technologies/javase/javadoc-tool.html` returned `403 Forbidden`; used `https://docs.oracle.com/en/java/javase/21/javadoc/javadoc.html` instead, which answered the question |
| 9 | Vale's license and version | Not stated on `https://docs.vale.sh/`; not independently re-fetched from a second Vale page in this session |
| 9 | A textlint plugin that extracts comments from TypeScript source | Not found on `https://textlint.org/` or `https://github.com/textlint/textlint`, and no targeted plugin registry search beyond one `WebSearch` call was run |
| 9 | markdownlint's license and current release version | `https://github.com/DavidAnson/markdownlint` gave only an example-output version (`0.41.1`), not a confirmed current release |
