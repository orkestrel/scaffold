# `@orkestrel/scaffold` campaign plan — surfaces and extensions

The live campaign for the scaffold generator, opened 2026-09-30 on the user's instruction after the `@orkestrel/veneer` foundation landed. Delete this directory in the acceptance commit.

## Goal

Make three things first-class in the generator, so a target selects them and `scaffold repair` restores every file that carries them:

- the **styles surface**: `src/styles` with the style kind files and folder barrels, the cascade-layer order statement in `_tokens.scss`, a Chromium `src:styles` project with `setup.ts`, `setupBrowser.ts`, and `setupStyles.ts`, CSS and `/scss` exports, `files` and `sideEffects` entries, `cssMinify` off, and an optional themes target;
- the **journey surface**: variant projects over `tests/app/browser/integration.test.ts` with `variant`, `variants`, and `capture` provided, the arrival journey with its declared families, and the capture portfolio;
- the **showcase surface**: root `showcase/<mode>.html` with no copy step, a `build-id` equal to the SHA-256 of the final page without its stamp line, `prepublishOnly` rebuilding every mode, `.prettierignore` listing `showcase/`, and no test over the pages;
- an **extension** mechanism: a named extension adds to a surface. `vue` extends the browser surface (`src/vue`, `app/vue`, the `@app/vue` alias, `vue-tsc` on the root check, lint blocks, browser-side classification, the external policy until an optional peer, a `journey:vue` mode, a `showcase/vue.html` mode). A named extension of the styles surface (veneer's `bootstrap` and `tailwindcss`) adds a `src/<name>` face with the kind files, a Vite wrapper, a Chromium project through one shared `sheetProject` composition, CSS and `/scss` exports, `files` and `sideEffects` entries, and the `conformance` fact.

The campaign also closes two defects the user reported on 2026-09-30: a root `tests/setup*.ts` module owes its sibling proof (veneer's CSSOM cases sit in a misnamed `tests/setupBrowser.test.ts`; the `setup:browser` project and the policy sweep gain the law), and the vendored `policy/no-nested-functions` rule reports a callback placed inside an object or array literal argument, an event-map option in particular, which the pattern rules prescribe.

The generator also carries the behaviours veneer's eight hand-edited vendored files hold: `sheetProject`, `setupBrowser`, `conformance`, and `integration` factories with `optimizeDeps.include` on every browser project; `isCoreBuildExternal`; `rewriteBrowserSpecifier`; `computeStamp` and `stampPage`; the showcase and journey mode helpers; and the config-proof cases for each.

## Exit criterion

A scaffold release whose generated workspace, for a target that selects the styles, journey, and showcase surfaces and the `vue` and a named styles extension, passes its own config proof for every behaviour named under Goal; whose guides and rules describe the surfaces and the extension mechanism; and after which `@orkestrel/veneer` adopts that release, `scaffold audit` reports no stale content-owned file, and veneer's full gate chain exits 0 with no hand-edited vendored file.

## Phases

1. Absorb: the map (`tmp/units/propagation-map.txt`), the scout report, and two Grok distillates (`absorb-generator-core`, `absorb-generator-host`).
2. Design: one adversarial round (`planner` on Opus, `analyst` on Astra) over the surface and extension model, reconciled into units here.
3. Implement, integrate, audit, verify, re-baseline, accept, then release and adopt in veneer.

## Units

The round verdict (`propagation-design-verdict.md`, retained here at acceptance) rules the model and sequences the units. Serial writers in this checkout, except the rules unit, which owns disjoint Markdown and runs beside the code units. Astra units run with a shell through `codex exec`; Opus units edit only and the Orchestrator runs their gates.

| Unit | Lane | Owned files | Acceptance | After |
| --- | --- | --- | --- | --- |
| `propagation-1` contract | `astra` | `src/core/{types,constants,factories,validators,parsers}.ts`, `src/bin/{types,constants,helpers,CLI}.ts`, mirrored tests | ruling 1; `#derive` reads each marker from a scratch tree; `new --extend` parses and refuses malformed entries; the migration guard fires | — |
| `nested-1` callbacks | `astra` | `configs/policy.ts`, the `no-nested-functions` tester in `tests/config.test.ts`, `AGENTS.md:60`, `architecture.md:169`, the workspace rule's visitor sentence, the harden skill's centralization reference, `host.json` | a callback inside an object or array literal in an argument or return position is admitted, named or anonymous; a local binding, declaration, spread, computed key, accessor, and nested binding stay reported; `lint:check` green | 1 and 7 |
| `propagation-2` styles | `astra` | `src/core/{constants,compilers,templates}.ts`, `src/bin/CLI.ts` for the setup runtime of `tests/setupStyles.test.ts`, mirrored tests | ruling 2 for base, named, styles-only, and themes blueprints; `setup:browser` collects both browser proofs | `nested-1` |
| `propagation-3` vue | `astra` | `src/core/{compilers,templates}.ts`, `configs/helpers.ts`, `.oxlintrc.json`, mirrored tests | ruling 3; both boundary directions reject controls; `resolveExternal` refuses and admits as ruled | 2 |
| `propagation-4` modes | `astra` | `src/core/{compilers,templates}.ts`, `configs/helpers.ts`, `.prettierignore`, mirrored tests | rulings 4 and 5; no `dist/showcase`, `show`, or `demo/` text remains | 3 |
| `propagation-audit-1` | `analyst` and `reviewer` | none | one falsify round over the settled units, run beside `propagation-4`; reconciled in `propagation-audit-1-reconcile.md` | 3 |
| `propagation-fix-1` | `astra` | the files the reconciliation names | every ruling the reconciliation marks for it, each with its pinning case | 4 and `propagation-audit-1` |
| `propagation-5` proof | `astra` | `tests/config.test.ts`, `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts` | ruling 8's vendored cases with every control; the root setup mirror with its controls; scaffold's own tree passes | 4 |
| `propagation-6` adopter | `astra` | `tests/distribution.test.ts`, `tests/setupServer.ts` and its proof | ruling 8's scratch adopter | 5 |
| `propagation-7` rules | `opus` | `AGENTS.md`, `.claude/rules/{workspace,tests,styles,application,browser,documentation}.md`, `.agents/skills/orkestrel-journey/SKILL.md` | ruling 7's sentences; `test:policy` green | beside 1 to 4 |
| `propagation-8` guide | `opus` | `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts` | the guide describes the surfaces, extensions, options, ownership, and limits; `test:guides` green | 6 |
| `propagation-fix-2` | `astra` | `configs/helpers.ts`, the config and guide proofs, the guide | `resolveApplication` admits Vite's `development` mode; the guide's limit retired | 8 |
| `propagation-audit-2` | `analyst` and `reviewer` | none | one falsify round over the integrated generator; the subjective half reconciled in `propagation-audit-2-reconcile.md`; the objective lane reruns after `propagation-fix-3` | 6 and 8 |
| `propagation-fix-3` | `astra` | the files the reconciliation names, the themes barrel seed, the two distribution fixtures, the vendored browser-factory case | every ruling of the second round's subjective half and the adopter's four findings, each with its pinning case | `propagation-audit-2` |
| `propagation-fix-4` to `propagation-fix-8` | `astra` | the emission the packed adopter reached next on each run: the sheet project's root, the adopter's setup-script step, five vendored config cases and the sheet policy, the `configs` guard's project projection, the adopter's range restoration | the packed adopter runs the complete selection to its stale audit; `test:distribution` green | `propagation-fix-3` |
| `propagation-fix-9` | `astra` | the vendored proofs, the setup mirror, the guide's journey assertion | the objective rerun's three rulings, each pinned, with the standalone selections in the regression population | `propagation-audit-2` second half |
| verify and release | Orchestrator | `package.json`, `host.json` | tree-wide gates green read bare; `0.0.82` published on the user's approval | audit |
| `propagation-9` veneer | `astra` | the veneer checkout | ruling 9; `tests/setupBrowser.test.ts` renamed to `tests/setupStyles.test.ts` | release |
| fleet migration | later units | elements, mailbox, roughnotes, supervisor | `app/browser` Vue sources move to `app/vue` and each adopts `0.0.82` | release |
