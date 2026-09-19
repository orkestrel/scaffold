# Re-baseline after the scaffold fix round (Orchestrator, 2026-09-17)

Phase closed: units S1–S5 with their successors, the S audit, the fix-round audit, and its closure
(`s-fix-audit-closure.md`). Tip `ca09788c`, every gate green in the Orchestrator's reading; the
independent verifier's reading is recorded in the closure file when it lands.

## Remaining units, ruled

| Unit | Ruling | What changed |
| ---- | ------ | ------------ |
| Scaffold 0.0.74 release | **Unchanged.** Both published surfaces moved (`dist/src`: the born axis, the `--config`/`-c` reader, the question arms; `dist/host`: the skill, the vendored readers, the rules, the transport rule, the catalog). | Instrument drafted: `release-scaffold.sh` in the scratchpad (registry evidence, bump from the registry's 0.0.73, install, `prepublishOnly`); commit message drafted. The push precedes the window; the upload takes the owner's one-time code. |
| Roughnotes visit | **Added.** The fleet re-pin was implicit in the plan; it is its own tracked step now. | `visit-roughnotes.sh`: `catalog` (scaffold ^0.0.74, test ^0.0.17), `npm install`, the journey wrapper written from the seed with roughnotes' four variants so `repair` emits the axis, `repair`, `audit`. Checkpointed before the adoption units. |
| Roughnotes R1 adoption | **Transformed.** Split in two, serial in one checkout: R-A (`opus`) repairs the application's semantics the design verdict assigned it (D26: `aria-expanded` on the offcanvas trigger, distinct accessible names for a listing entry and the footer, a screen's own action distinguished from the masthead action — ROADMAP 34, 37); R-B (`opus`) adopts the published layer per the Grok distillate (`r1-terrain-distillate.md`): the hand-rolled storage, refusal, state, contrast, census, and escape instruments replaced by `createStorage`, `readRefusal`, `readStates`, `buildContrast`, `readCensus`, `buildEscapes`; `readMenuSettled` replaced by `waitForState` once R-A authors the state; `isPainted` by the platform predicate; the surviving helpers moved to `tests/setupBrowser.ts` and proven by `tests/setupBrowser.test.ts` with `setup:browser` activated in the order the skill teaches; `inject('capture')` and the `CAPTURE` variable; the reach-past sites (`elementFromPoint`, `app.open`, the `querySelectorAll` walk, the theme applied through the masthead control) routed through the interface; the intents every surface owes written where the product has the state and reported where it does not. | R-B's acceptance carries the browser runs the audits left unresolved: `npm run test:journey` under every variant with and without `CAPTURE`, and `npm run test:setup:browser`. Each unit gets its audit round (both lanes) and a verifier before the roughnotes commit and push. |
| Field pass (ROADMAP 17) | **Unchanged.** From a roughnotes worktree carrying no `.orkestrel/` folder, per `.agents/skills/orkestrel-debrief/references/field-testing.md`, after R-B lands. | Prerequisite acquired: the skill at 0.0.74 and roughnotes on it. |
| Debrief, retention commit, prune | **Unchanged.** The campaign folder is committed before the prune; the prune needs the owner's go-ahead. | Promotion candidates so far: the cp1252 rule (landed in `codex.md`), the fixture-pin lesson (`BASE_DEV_DEPENDENCIES` reads `package.json`), the setup-proof activation order (landed in the skill), the "brief states the installed surface" lesson (S3's deviation). |
| Fleet pass over the behind checkouts | **Unchanged**, the owner's decision. | — |

## Dependency order

Release → visit → R-A → R-B → field pass → debrief and prune. The release publishes on its own
(scaffold propagates as files); the visit is the first target's `repair`.

## Exit criterion

Unchanged from `plan.md`: every enumerated capability implemented, repaired, retained, or excluded on
evidence. Closed by this phase: the generator's journey and setup axes, the skill and its sweep, the
test package's layer (published). Open: the roughnotes adoption and the field pass, which prove the
skill against a real application, and the debrief.
