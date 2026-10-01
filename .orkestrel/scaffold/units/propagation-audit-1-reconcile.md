# propagation-audit-1 — reconciliation (2026-09-30)

Lanes: `analyst` (Astra, objective; `propagation-audit-1-analyst-verdict.md`) and `reviewer` (Opus, subjective; `propagation-audit-1-reviewer-verdict.md`). Both read the tree while `propagation-4` edited `src/core/templates.ts`, `configs/helpers.ts`, and `.prettierignore`; every row those edits reached is deferred to the integration round, not ruled here.

## Claims

| Claim | Analyst | Reviewer | Ruling |
| --- | --- | --- | --- |
| 1 Contract | CONFIRMED | BROKEN: `ViteMachinery.vue` stored beside `frameworks` | Reviewer right. The brief kept `vue` "until `propagation-3` replaces it" and `propagation-3` did not. Delete `vue`; read `frameworks.includes('vue')` at its two readers; update the example and the two assertions. → `propagation-fix-1` |
| 2 Derivation | CONFIRMED (audit returns the question with `blocking: true`) | BROKEN: audit exits drift with a blocking question beside findings, against the `Audit` contract | Reviewer right. `blocking: writing`; `repair` and `overwrite` still refuse through `#assertTarget`; add the audit case (`blocking: false`, exit clean when aligned). → `propagation-fix-1` |
| 3 Creation | CONFIRMED | CONFIRMED | Accepted. |
| 4 Vue follows the extension | UNRESOLVED (templates moved) | CONFIRMED within lane | Re-attack in the integration round on a quiescent tree. |
| 5 Styles surface | UNRESOLVED | UNRESOLVED | Re-attack in the integration round; `_index.scss` is `propagation-4`'s. |
| 6 Vue faces | UNRESOLVED | CONFIRMED within lane | Re-attack in the integration round; F3 and F4 fold into the fix unit. |
| 7 Lint blocks | BROKEN: a regex matrix, not the linter | BROKEN: same | Both right. Drive the import directions through the real Oxlint binary with a disabled-restriction control. → `propagation-5` (assigned, step 1b). |
| 8 Identity and vendoring | UNRESOLVED | UNRESOLVED | Re-attack in the integration round after the last vendored edit: `audit --offline --json` on this checkout and a byte comparison of `host.json`. |
| 9 Callbacks | BROKEN as worded: method, accessor, and class-expression exclusions are existing documented limits | BROKEN: method-shorthand bypass in a local binding; the four law sentences differ; the harden reference restates the law | Analyst right on the claim's wording: no blanket refusal of method syntax. Reviewer right on the bypass: admit a method, getter, or setter property only when its containing object literal is in an admitted position; `MethodDefinition` unchanged; add the local-binding twin as invalid. Reviewer right on the sentences: `AGENTS.md:62` becomes "except a callback passed as an argument or returned as the result; `.claude/rules/architecture.md` § Functions and orchestration bounds the literal positions it climbs", and the harden reference's lines 31–33 become a pointer. → `propagation-fix-1` |
| 10 Rules and guide agree | BROKEN: `_index.scss`; the mode sentences | BROKEN: the unused `@src/styles/themes` alias; `setup:browser` without `vue` in `optimizeDeps`; the rest unresolved | `_index.scss` and the mode sentences are `propagation-4`'s (in flight). Delete the themes alias and its assertion (themes is a target, not a face). Give `setup:browser` `vue` in `optimizeDeps.include` when `frameworks` holds `vue`. → `propagation-fix-1`; the sentences re-attack in the integration round. |

## Findings outside the claims (reviewer)

| Finding | Ruling |
| --- | --- |
| F1 Extensions occupying nothing pass silently | Adopt: `blueprintToQuestions` blocks on a repeated extension and raises a non-blocking question for empty axes, for an axis whose selection lacks `browser`, and for a styles extension without `styles`; the dependency and machinery projections read occupied axes only; the `axes: []` text form of `parseExtension` stays. → `propagation-fix-1` |
| F2 `targetToSurfaces` misnames | Adopt: rename to `targetToFacts`; the guide's sentence is `propagation-8` pass 2's. → `propagation-fix-1`, `propagation-8` |
| F3 `FrameworkDefinition.packages` and `sources` | Adopt: `refused` and `suffixes`, with TSDoc on every member; `0.0.82` is unpublished. → `propagation-fix-1` |
| F4 Refused-scope remedy | Adopt: a refused scope gets its own message naming the public package to import. → `propagation-fix-1` |
| F5 Half-applied external engine | Adopt: `srcBrowser` and `srcServer` route through `resolveExternal` with the core entry as a sibling; `@src/core` stays external with its `output.paths` rewrite; the identity set regenerates. → `propagation-fix-1` |
| F6 `src/bin` lint block misses the Vue face | Adopt: extend the block with the `src/server` block's Vue alternatives; a control in the lint proof. → `propagation-fix-1` |
| F7 `app/vue/index.ts` seed | Adopt: the empty seed. → `propagation-fix-1` |
| F8 Themes barrel `@forward` | Adopt: `@use 'default';`. → `propagation-fix-1` |
| F9 Themes-only `check` runs `tsc` twice | Adopt: emit `check:src` only with scoped members. → `propagation-fix-1` |
| F10 `NewCommand` remarks | Adopt: document the four fields and that `extensions` is `--extend`'s selection. → `propagation-fix-1` |
| F11 `SURFACES` unused | Adopt: an `isSurface` guard reading `SURFACES`, used where the surface literal is checked (the parser's text form). → `propagation-fix-1` |

## Sequence

`propagation-4` (in flight) → `propagation-fix-1` (Astra; every ruling above marked for it, serial in the checkout) → `propagation-5` → `propagation-6` → `propagation-8` pass 2 → `propagation-audit-2` over the integrated generator (re-attacking claims 4, 5, 6, 8, 10 and every fix) → verify and release.
