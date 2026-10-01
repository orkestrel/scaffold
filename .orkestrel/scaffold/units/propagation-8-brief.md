# Unit propagation-8 — the scaffold guide for surfaces and extensions

Fill every section. Write `none` in an empty one.

## Role and engine

`opus` on Claude Opus 5.5, native Agent dispatch, edits only. You have no working shell on this host: run no command, and list under Output the commands the Orchestrator runs for you. You are the sole writer of `guides/scaffold.md`, `guides/README.md`, and `tests/guides.test.ts` in `C:/Users/mikes/WebstormProjects/scaffold`.

## Objective

Rewrite `guides/scaffold.md` so it describes the generator as units `propagation-1` to `propagation-6` and `nested-1` left it: the surfaces, the extensions, the creation options, the ownership of every emitted file, the `repair` and `audit` behaviour over them, and the honest limits; keep `tests/guides.test.ts` parity green by giving every new public export its `## Surface` row with a `Summary` equal to its doc-block description paragraph and a titled `@example` fence where the source carries one, and by executing the flagship fences it already runs.

## Context

- **Evidence.** The round verdict; the reports `tmp/units/propagation-1-report.md` to `propagation-6-report.md` and `nested-1-report.md` (every new export with its one line); the source `src/core/{types,constants,factories,validators,parsers,compilers,templates}.ts`, `src/bin/{types,constants,helpers,CLI}.ts`, and `configs/helpers.ts` (read each new export's TSDoc; the `Summary` cell must equal its description paragraph in the form `findDrift` compares: a `{@link}` tag as its target's code token, whitespace collapsed, code-span boundary whitespace trimmed); the current `guides/scaffold.md` and `guides/README.md` (the concept index runs `spec ↔ source ↔ tests ↔ showcase` minus the columns this workspace lacks); `.claude/rules/*` as `propagation-7` rewrote them (the guide must not contradict a rule and must not copy one).
- **Law.** `.claude/rules/documentation.md` (parity; every backticked API resolves; every public export documented; `Summary` equals the doc paragraph; a titled `@example` equals the guide fence; the README pitch equals the tagline; the guide documents the validated hookup for each client; falsify a prose claim the way you falsify a code claim: where you write a behaviour sentence under no fence, name the executed assertion in `tests/guides.test.ts` that would break if it went false); `.claude/rules/writing.md` (developer prose; the substitution table; `must`, `can`, `might`, imperative; present tense; no `now`, `new`, `latest`); `AGENTS.md` § Writing.
- **Host.** Windows 11; LF files.

## Passes

This unit runs twice. **Pass 1 (now):** units `propagation-1`, `propagation-2`, `nested-1`, and `propagation-7` have landed in the tree (read their reports under `tmp/units/`; `propagation-2` may still be finishing its continuation, so read its source rather than its report for the final shapes); write every section the Execution list names, give every new export those units added its `## Surface` row and titled fence, bring the command reference in the guide to the rendered usage (`src/bin/constants.ts` carries the usage text; the proof compares the guide's reference block to it byte for byte), fix the `APP_BROWSER_DEV_DEPENDENCIES` summary to its source paragraph, and sweep the journey references. **Pass 2 (a fresh dispatch after `propagation-fix-1`):** read the reports of `propagation-3`, `propagation-4`, and `propagation-fix-1` and the reconciliation `propagation-audit-1-reconcile.md`; give `isSurface` its guard row (summary from its doc block); reword `guides/scaffold.md:1136` (the derived facts are structural facts, not "the surfaces"); confirm the `FrameworkDefinition`, `ViteMachinery`, and `blueprintToMachinery` rows still equal their doc paragraphs after the renames (`refused`, `suffixes`; `vue` deleted); describe the Vue faces, the showcase modes (`showcase/<application>.html`, the final-page stamp, `prepublishOnly`), the journey modes (`appJourney(variant, variants, mode?)`, `test:journey:<framework>`), the seeded arrival journeys, the seeded `tests/setupGlobal.test.ts`, the `_index.scss` folder barrels, the extension advisories `blueprintToQuestions` raises, the migration guard's non-blocking audit, and `resolveExternal`'s two refusal messages as the tree now has them; replace every pass-1 sentence that described those from the rulings with one the executed assertions pin (through `blueprintToScripts`, `blueprintToRootVite`, `blueprintToConfigArtifacts`, `blueprintToTestArtifacts`, `blueprintToQuestions`, and the `configs/helpers.ts` exports `resolveApplication`, `computeStamp`, and `stampPage`, which the guide proof can import directly); and describe the vendored proofs (`tests/config.test.ts` enumerating faces from the tree with mutation controls; the root setup mirror in the policy sweep; the scratch adopter in `tests/distribution.test.ts`) as `propagation-5` and `propagation-6` land them, reading their reports if present and otherwise the verdict's rulings 2 and 8, marked for the Orchestrator to confirm. A unit `propagation-5` edits `tests/config.test.ts`, `tests/setupPolicy.ts`, and `tests/setupPolicy.test.ts` in parallel; never touch those.

## Unknowns

- Whether a new export carries a titled `@example`; where it does, the guide fence under that title must equal it byte for byte after the compared normalisation. Read each source block.

## Scope

- **Owned.** `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts` (new executed assertions for new prose claims; never weaken an existing one), and the journey skill's references `.agents/skills/orkestrel-journey/references/{captures,decide,layer,styles,statechart}.md` for one change only: replace `surface` with `screen` where the word names a rendered screen, as `propagation-7` did in that skill's `SKILL.md` (its report lists the lines), and leave every other use.
- **Shared (report-only).** `src/**` (a doc block whose paragraph the guide cannot carry honestly is reported, not edited), `README.md` (the pitch; report if the tagline changes).
- **Off-limits.** `src/**`, `configs/**`, `.claude/**`, `AGENTS.md`, `.agents/**` beyond the named journey references, `.orkestrel/**`, every other test, the veneer checkout.
- **Tree state.** The checkout carries uncommitted changes from earlier campaign units (`git status --porcelain` lists them). Never touch or revert them; edit only the owned files.
- **Made false by this change.** Guide sentences describing `dist/showcase`, `show`, `demo/showcase.html`, Vue on every browser application, `src/styles/index.ts` as the entry, and `tests/setupBrowser.test.ts` as the one browser setup proof.
- **Tools and limits.** Read, Grep, Glob, Edit, Write. No shell.

## Execution

1. Read every report and every new export's doc block; list the exports with no `## Surface` row.
2. `guides/scaffold.md`: add or rewrite the sections for the surfaces (browser with its journey and showcase; styles with its themes), the extensions (`vue` on the browser surface; a named sheet on the styles surface), the creation options (`--styles`, `--themes`, `--showcase`, `--extend <surface:name,…>`, journey implied by `--app browser`, the refusals), the derivation from the tree (each marker), the ownership table for every emitted path (`birth`, `content`, `presence`; `repair` and `audit` behaviour; the migration guard), the vendored files and their refresh, the `no-nested-functions` admission, the root setup mirror, and the limits (a missing last marker; the fleet targets holding `.vue` under `app/browser`); give every new public export its `## Surface` row and its titled fence.
3. `guides/README.md`: the concept index rows for the surfaces and extensions; the directory index if a file moved.
4. `tests/guides.test.ts`: for each behaviour sentence you write under no fence, add the executed assertion that would break if it went false (the generator's `#derive` reading a scratch tree, the parser refusing a malformed `--extend` entry, `computeStamp` of a known page), through the package's public entries and the `GuideCommand` the file already drives; keep the substring check only as a presence guard beside it.
5. Sweep the owned files for the substitution table and `should`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-8-report.md` with: the sections added, rewritten, or deleted; every `## Surface` row added; every executed assertion added; the commands the Orchestrator runs (`npx oxfmt --config .oxfmtrc.json --check guides tests/guides.test.ts`, `npm run test:guides`, `npm run test:policy`) and what each must show; every deviation. Your final message is that report verbatim.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a doc block's paragraph is wrong or malformed (you cannot edit source), when a behaviour the guide must describe has no public entry to assert it through, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Every new public export has a `## Surface` row whose `Summary` equals its doc paragraph, and every titled `@example` has its equal fence.
2. Every behaviour sentence under no fence has a named executed assertion.
3. The Orchestrator's `npm run test:guides`, `npm run test:policy`, and `oxfmt --check` exit 0.
4. No file outside the owned set changes.

**Observations, not criteria.** A doc block the guide cannot carry honestly (report it with the sentence it needs).

## Review evidence

The diff and `git status --porcelain`; the report file.
