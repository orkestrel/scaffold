# Unit J-SANITIZER-CONTEXT — the walk parses an integration point's markup as HTML on every Chromium build

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer-context` (branch `unit/sanitizer-context`, cut from Veneer `main` `ca83afb`; `npm ci` already run). The work is objective, and it is routed native because its proofs run in a browser, which the Astra bench sandbox cannot launch.

## Objective

Make `ConfigSanitizer`'s walk (the path for a target with no `setHTML` method) parse markup written into an HTML integration point, such as a MathML `annotation-xml` element whose `encoding` is `text/html`, so the kept elements are HTML elements on Chromium 141 as they are on Chromium 153.

## Context

**Evidence.** The styles session ran J-SANITIZER on its Chromium 141.0.7390.37 host at `b1d314d` (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/sanitizer-read/`, `configsanitizer-alone.log.txt`): `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` 63 passed, 1 failed, 2 skipped; the red is "parses in the context of the target, so an annotation-xml element whose encoding is text/html keeps an HTML anchor", `expected '' to be '<a>kept</a>'` at the first `innerHTML` assertion. Chromium 141 has no `setHTML`, so both of the case's targets take the walk there. On this host (Chromium 153.0.8010.12) the case passes on both targets, the unshadowed one through `setHTML` and the one `shadowSetHTML` masks through the walk. Reading of `ConfigSanitizer.write` (Veneer `main`): the walk imports a shallow copy of the target into an inert HTML document from `document.implementation.createHTMLDocument('')` and assigns `context.innerHTML = html`, then `#clean` removes every element whose namespace and name the configuration does not keep, with its subtree. The Orchestrator's reading, not yet run: on Chromium 141 the fragment parse with an `annotation-xml` context yields a MathML `a`, which `#clean` removes with its text; the unit's first measurement settles it.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md` (kind purity: a predicate is a helper, a table is a constant), `patterns.md`, `tests.md`, `documentation.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 and its amendments (the context parse in an inert document, and the declared floor); guide `guides/veneer.md`, the `ConfigSanitizer` section. Skill: none. The HTML standard's fragment parsing algorithm and its HTML and MathML text integration points are the external reference: cite the section you rely on.

**Installed primitives.** `@orkestrel/contract` (`isInstance`), `@orkestrel/test`; read their declarations under `node_modules` before adding a guard or a wait.

**Host.** Windows 11, Git Bash; `npm` and `npx` resolve to the `.cmd` shims; Chromium 153. Write each multi-step program to a file and run the file; no heredoc, no `node -e`. This host cannot run Chromium 141: the styles session re-reads the file on its host after the landing.

**Measurements.** Take first, before editing: on this host, the walk's result for the case's markup with an `annotation-xml` context (through `shadowSetHTML`), and the namespace of the parsed `a` inside the inert copy before `#clean` runs, recorded in a scratch case you delete afterwards.

**Control identifiers.** None; a test is named for what it proves.

**Standing conditions.** J-GUARDS writes `src/browser/helpers.ts`, `validators.ts`, `types.ts`, and the engines in another worktree: they are off-limits here. If the fix needs a new predicate, and `helpers.ts` is its home under kind purity, stop and report the exact helper rather than writing it elsewhere.

## Unknowns

- Whether the Chromium 141 red is the parse (a MathML `a`) or another step. The unit cannot run 141; it reads the 141 log above and reasons from the standard, and states the mechanism it relies on as a sentence the styles session's re-read confirms or refutes.
- Which other integration points share the class: SVG `foreignObject`, `desc`, and `title`, and the MathML text integration points (`mi`, `mo`, `mn`, `ms`, `mtext`, where `mglyph` and `malignmark` start tags stay MathML). Rule on each with a case on both targets.

## Scope

**Owned.** `src/browser/sanitizers/ConfigSanitizer.ts`; `src/browser/constants.ts` for a table the fix needs, and only that; `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`; `guides/veneer.md`, the `ConfigSanitizer` section only; `tmp/j-sanitizer-context/**`.

**Shared (report-only).** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: return an exact patch if a data table belongs there.

**Off-limits.** `src/browser/helpers.ts`, `validators.ts`, `types.ts`, `index.ts`, every engine file, `Delegate.ts`, `HostSnapshot.ts`; `tests/setupPolicy.ts`, `tests/policy.test.ts`; `src/styles/**`, `tests/src/styles/**`, `app/**`; `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `ConfigSanitizer.test.ts` (owned); `tests/guides.test.ts` for any Summary cell the change moves; `tests/src/browser/index.test.ts` enumerates the barrel's exports, which this unit must not change.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message: the files touched; the measurement's reading; the mechanism the fix relies on, with the standard's section; each case with its reading on this host (and, for the one the 141 log reddens, the statement of what the 141 re-read must show); the mutation table (each row, its case, red or survived) with a control row that must survive; the acceptance output verbatim; `git status --short`; the deviation state.

## Deviation contract

Stop and report on: a fix that needs `helpers.ts`, `types.ts`, or another off-limits file; a fix that changes what the `setHTML` path does. Decide, record, and carry on for: the order of cases; whether the integration-point table is a constant or folds into its one caller; comment wording.

## Acceptance criteria

1. `npx tsc -p configs/src/tsconfig.browser.json --noEmit` (or `npm run check:src:browser`), oxlint, and oxfmt over the owned files exit 0.
2. The walk parses an HTML integration point's markup in a context whose tree construction makes its start tags HTML elements, without depending on the build's handling of a foreign context element; the `setHTML` path is unchanged.
3. `ConfigSanitizer.test.ts` passes on this host, with a case per integration-point kind on both targets (unshadowed and `shadowSetHTML`).
4. The whole-file mutation instrument `tmp/j-sanitizer-context/mutations.py`: each row reddens its case on this host where this host can see it; a row this host cannot see is named, with the Chromium 141 re-read as its discriminating run; one control row survives; sources restore byte for byte.
5. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** The whole `test:src:browser` run, once, with its `Tests` line.

## Review evidence

The Orchestrator captures the diff and status, re-runs the instrument, and audits with `analyst` on Astra (objective) and `checker` on Sonnet; the styles session re-reads `ConfigSanitizer.test.ts` on Chromium 141 after the landing.
