# propagation-audit-2 — reconciliation, first half (2026-10-01)

Lanes: `reviewer` (Opus, subjective; `propagation-audit-2-reviewer-verdict.md`) returned a full verdict. `analyst` (Astra, objective; `propagation-audit-2-analyst-verdict.md`) stopped the whole round on an over-literal reading of the brief's exclusion of the adopter's two files (the guide proof imports `tests/setupServer.ts`) and decided nothing; it reruns on the final tree after `propagation-fix-3`, under the amended brief, and a second half of this reconciliation rules its rows then.

## Reviewer claims

| Claim | Reviewer | Ruling |
| --- | --- | --- |
| 1 First-round rulings closed | CONFIRMED | Accepted. |
| 2 Vue follows the extension | BROKEN: the face projections read raw `axes` while dependencies and machinery read occupied axes; an `app`-axis extension with no `app/browser` plans `vue-tsc`, `appVue`, and faces with no dependency and no `appBrowser` | Reviewer right. One projection of occupied (framework, axis) pairs in `compilers.ts`, read by every compiler; an unplaced extension emits nothing. → `propagation-fix-3` |
| 3 Styles surface | CONFIRMED | Accepted; 11b and 11e fold in. |
| 4 Vue faces | CONFIRMED | Accepted. |
| 5 Modes | CONFIRMED in code | Accepted; the page-name sentences are 10b. |
| 6 Lint through the binary | UNRESOLVED (no shell) | The analyst's rerun decides it. |
| 7 Vendored proofs | CONFIRMED (design) | Accepted; placement is 11a. |
| 8 Identity and vendoring | UNRESOLVED (no shell) | The analyst's rerun decides it. |
| 9 Contract, derivation, creation | CONFIRMED | Accepted. |
| 10 Rules and guide agree | BROKEN: a to h | All eight adopted as the reviewer states them: (a) `architecture.md:169` admits methods, getters, and setters of an admitted object literal and refuses a climb out of their bodies; (b) `workspace.md:115`, `:121`, and `documentation.md:27` say `showcase/<application>.html`, the base modes `browser.html`; (c) the guide's distribution registration adds "or sheet face"; (d) the guide's `:2388-2406` passage excludes the seeded setup proofs and points at the mirror; (e) the writable-region sentence names the framework scripts; (f) after claim 2's fix, the advisory assertion also asserts `blueprintToRootVite(unplaced)` carries neither `appVue` nor `srcVue`; (g) `workspace.md:169-172` names the seed selections that register `setup` and `setup:browser`; (h) the typecheck table gains `src:vue` and `app:vue`. → `propagation-fix-3` |
| 11 Placement and shape | BROKEN: a to e | All five adopted: (a) the seven helpers move from `tests/config.test.ts` to `tests/setupPolicy.ts` with proofs in `tests/setupPolicy.test.ts` (`tests.md:184-193`: the vendored set shares helpers within itself, test files import infrastructure), the hand-rolled scratch directories go through `createPolicyScratch`, and the JSON round trip goes; (b) `tests.global` and `tests.styles` become `{ module, proof }` groups and the sheet integration factory sits under one `integration` group; (c) one exported position predicate serves `reportNested`, `isPolicyCallback`, and `isPolicyResult`; (d) the three guards gain `@example`, and every added example carries its `import` line; (e) `SheetAdoption` is an exported interface in the seed. → `propagation-fix-3` |
| 12 Completeness | BROKEN: claim 2, claim 10, F5, the adopter evidence | Claim 2, 10, and F5 go to `propagation-fix-3`; the adopter evidence is `propagation-6`'s continuation, in flight. |

## Reviewer findings

| Finding | Ruling |
| --- | --- |
| F1 The executable build's own external predicate | Adopt: `external: (id) => id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] })`; this checkout's `vite.config.ts` regenerates. → `propagation-fix-3` |
| F2 Stale TSDoc remarks (`types.ts:235`, `compilers.ts:554`, `:1455`, `:1592`, `:2800`) | Adopt. → `propagation-fix-3` |
| F3 Rules admit SFCs in `src/vue` while the face checks TypeScript only | Adopt the reviewer's first option, which is ruling 3 and veneer's shape: `src/vue` publishes TypeScript only (composables and contracts) and SFCs live in `app/vue`; `browser.md:14` and `application.md:51-52` say so. → `propagation-fix-3` |
| F4 `architecture.md:52` runtime entries | Adopt: add `app/vue/main.ts`. → `propagation-fix-3` |
| F5 The generated guide index omits the Vue faces and the showcase | Adopt: the occupied faces join the source, test, and directory lists, and a showcase line per page when selected. → `propagation-fix-3` |

## Referrals

| Referral | Ruling |
| --- | --- |
| Showcase and journey scripts outside the writable region | Adopt ruling 6 as written: `showcase`, `showcase:<framework>`, `build:showcase`, `build:showcase:<framework>`, and `test:journey:<framework>` join the writable region with their generated predecessors. → `propagation-fix-3` |
| The root `vite.config.ts` factories hold functions in local bindings (`templates.ts:237`, `:491`, `:506`) | The law binds the emitted configuration too: a root configuration file may declare module-scope functions (it is a configuration, not a kind file), so hoist each local binding to module scope in the template, or inline it into the returned literal where it is a plugin method; regenerate this checkout's root file. → `propagation-fix-3` |
| The seeded `tests/setupGlobal.test.ts`'s second case tests Vitest, not `setup`, and its `.not.toEqual` cannot fail | Adopt: the seeded proof proves what the seeded `setup` does with a control that can fail. → `propagation-fix-3` |
| No control pins the `^export ` anchoring in `setupPolicy.ts:556` | Adopt: a control with an indented `export` inside a `declare module` block that the mirror must not flag. → `propagation-fix-3` |

## Second half: the analyst's rerun (2026-10-01, after `propagation-fix-8`)

| Claim | Analyst | Ruling |
| --- | --- | --- |
| 1, 2, 4, 5, 6, 8, 9, 11 | CONFIRMED with reproductions (the real-Oxlint pairs for the three rewritten families; the real generated showcase and journey wrappers loaded in five modes; the inventory case rerun) | Accepted. Claim 8's whole-checkout `audit --offline --json` exits 1 on one row, `AGENTS.md` stale: this checkout's `AGENTS.md` is the law the generator points targets at, so its planned pointer form always differs here; pre-existing and by design, outside the configuration claim, which held. |
| 3 Styles surface | BROKEN: the vendored config proof fails two supported standalone selections (`src: []` with `styles` and `themes`: "The workspace selects no alias target" at `tests/config.test.ts:476`; `themes` alone: "Missing script build:src:styles" at `tests/setupPolicy.ts:3796`), with a core-plus-styles control passing | Analyst right; the seeds and projections are correct, the proof is wrong. The alias population includes sheet faces and admits an alias-free themes-only workspace; the sheet configuration inspector requires the chained `build:src:styles` only when both targets exist and checks standalone `build:src:themes` otherwise; the two selections join the regression population. → `propagation-fix-9` |
| 7 Vendored proofs | BROKEN: the setup mirror's shared-import scan at `tests/setupPolicy.ts:539` matches inside a block comment, so a commented `import { CANVAS } from './setupCanvas.js'` counts as coverage | Analyst right. Read import declarations through a parser the vendored set may import (Vite's `parseAst`, a `BASE_DEV_DEPENDENCIES` package), keep the real shared-import, sibling-proof, augmentation, and vendored admissions, and add the commented-import control. → `propagation-fix-9` |
| 10 Rules and guide agree | BROKEN: `guides/scaffold.md:1311`'s nonempty-population sentence fails under claim 3's reproduction; the root-setup sentence exceeds the regex; the journey sentence at `:1295` is pinned by source-string inspection that a deleted refusal assertion does not break | Analyst right. Claims 3 and 7 repair the first two; the journey assertion pins the seed's refusal and role-sweep statements so deleting them reddens it, beside the adopter's real `test:journey` runs. → `propagation-fix-9` |
| 12 Completeness | UNRESOLVED: the packed-adopter run is the verifier's | The authorized run exists: `propagation-fix-8` ran `npm run test:distribution` bare to 10 passed, 1 skipped, with the adopter complete; the Orchestrator reruns it with the tree-wide gates after `propagation-fix-9`. |

## Sequence

`propagation-fix-9` → the Orchestrator's tree-wide gates (`format:check`, `lint:check`, `check`, `build`, `npm test`, `test:distribution`) read bare → commit → version `0.0.82` → pack → `propagation-9` veneer adoption in the `pack` phase → publish on the user's approval → `propagation-9` in the `registry` phase → the fleet migration units.
