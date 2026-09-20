# U6 design round — verdict

Round of 2026-09-20 on `units/u6-design-brief.md`. Subjective lane: `planner` on native Opus 5
(`units/u6-design-planner-report.md`, journal `native`). Objective lane: `analyst` on Astra
through `codex exec --sandbox read-only` rooted at the Test checkout
(`units/u6-design-analyst-report.md`, journal `units/u6-design-analyst.sh`, thread
`01a0be21-b8d0-7b70-b40e-08275d2f212a`). Both lanes ran blind on one brief.

## Where the lanes agree

Verb names `hoverAccessible` and `holdAccessible` with `clickAccessible`'s role-and-name
overloads and resolver; a third `pseudo` parameter on `readStyle` rather than a new reader,
guarded so an unparsed pseudo-element or a pseudo-class refuses instead of reading the element's
own style; the CDP press path U5 proved with the iframe-scale mapping recomputed per hold; the
hold reads `:active` back and refuses (releasing first) when it did not land; a media helper
over `Emulation.setEmulatedMedia` that restores with `{ media: '', features: [] }`; every name
free in the hosted guides; proofs beside their siblings in `tests/src/browser/helpers.test.ts`
with negative controls; the `CDPSession` type Vitest declares is empty, so the call crosses the
unchecked boundary the package already publishes (`invokeUnchecked`, `readProperty`).

## Rulings on the forks

| Fork | Ruling | Reason |
| --- | --- | --- |
| returned teardown handlers (analyst) versus stateful stage-and-release pairs (planner) | the planner's pairs: `holdAccessible` and `releasePointer`; `stageMedia` and `releaseMedia`; `hoverAccessible` returns nothing and `releasePointer` also un-hovers by parking the pointer | the layer already fixes `stagePane`/`releasePane` as its stage-and-release form; an idempotent release under `afterEach` covers a failing test the way `resetFixtures` does |
| `emulateMedia` versus `stageMedia`/`releaseMedia` | `stageMedia(options)` / `releaseMedia()` | `stage` and `release` have a project-wide meaning in this layer; `emulate` has none |
| `MediaOptions` keys | `{ print?: boolean, motion?: boolean }`: `motion: false` stages `reduce`, `motion: true` stages `no-preference`, `print: true` stages `print`, `print: false` stages `screen`, omitted leaves the axis alone; `{}` refuses | the planner's permission-switch reading; the base-pinning case needs the `true` arm |
| centre-hit check through `readHit` before the press (analyst) | not taken; the `:active` read-back is the verification | `readHit` retargets a shadow subject to its host and would over-refuse; the read-back catches a covered centre and a missed mapping alike |
| `sendProtocol` exported (planner) | exported, as the one CDP door, through `readProperty` and `invokeUnchecked` with the refusal `Browser provider exposes no DevTools session` | the suite's negative control for the scale mapping needs it; four verbs share one boundary |
| `readPixels` gains the `pseudo` parameter (planner) | yes | a consumer measuring a pseudo-element length otherwise hand-rolls the parse |
| hold state | parked on the tester root as `POINTER_HOLD` (`data-pointer-hold`, value `<x>x<y>`), mirroring `CAPTURE_PANE` | a leak is visible in the document; a module variable is not |
| voices | the planner's set, in the layer's existing placement; the resolver's absent, gated, ambiguous, and unreachable sentences unchanged; no separate "not hoverable" voice (the platform exposes no hoverability fact apart from reachability) | § Voices requires distinct, discriminable sentences |
| print verification | `matchMedia('print')` after staging, measured true on both engines (`research/instruments/media-probe.output.txt`) | settled by the Orchestrator's probe, not by either lane |
| pseudo guard | `pseudo.startsWith('::')` then `CSS.supports(\`selector(${pseudo})\`)`; measured: the bare form accepts every real pseudo-element and rejects an invented one on both engines, and `:hover` also reports supported, which is why the `::` check comes first | the probe |
| media leak across files | none: the Test browser project runs with `fileParallelism: false` (`test/vite.config.ts:155`) | read from the configuration |
| the skill vocabulary (`orkestrel-prove-journey` `references/layer.md`, `styles.md`) | a separate scaffold unit after Test publishes; the skill is canon under `dist/host`, so the edit rides a scaffold release | the planner's referral; a different checkout and a different writer |

## Dropped, on the record

The analyst's `BROWSER_REFUSALS` constant as a new home for voices where the layer keeps them
elsewhere (the unit follows the existing placement); the analyst's "release-generated click" as
a documented effect stands as a bound; the analyst's teardown-on-failure cases are kept as
proofs.

## Carried into the U6 brief

Every ruling above; the probe readings; the proofs of both lanes; the guide rows and the Limits
rulings the planner drafted; the bounds the planner listed.
