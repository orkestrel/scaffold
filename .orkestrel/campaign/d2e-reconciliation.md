# D2e reconciliation — the test package's untranscribed fences

Lanes: planner (Opus 5, subjective) and analyst (GPT-5.6 Sol, journaled exec
`tmp/codex/d2e-analyst.jsonl`). Ruled by the Orchestrator, 2026-08-24.

## Rulings

1. **Browser fences transcribe in the existing `src:browser` mirrored files**, as marked carriers:
   `contrast` and `readRing` in `tests/src/browser/helpers.test.ts`, the journal fence in
   `tests/src/browser/factories.test.ts`. No new project (the fixed matrix permits none, and a
   project outside the vendored config proof's expected map is invisible to the gate that catches
   a dead project). A carrier opens with the `guides/test.md → <section> → "<heading>"` comment,
   asserts every value the fence's comments claim, and may be an existing case extended rather
   than a near-duplicate. The objective lane's presence guard is adopted: `tests/guides.test.ts`
   gains an executed check that the named fences' carrier markers exist in the named browser
   files, so the routing cannot rot silently.
2. **The wait fence's child-exit half spawns nothing.** The package's claim is `waitForEvent`'s
   contract — subscribe, park, deliver the first tuple, run the returned cleanup — and the child
   is scene, like `isBuilt`'s build and `origin`'s server in the same sentence; `code // 0` is
   Node's contract. The fence's genuinely untranscribed claim is cleanup-on-delivery (the
   existing delivery case at `tests/src/core/helpers.test.ts:381-391` returns no cleanup), and it
   carries in `tests/guides.test.ts` beside its transcribed throw-asymmetry sibling, with a real
   event source. The distribution placement is refused: single-subject proof, and publish-only
   gating would leave the fence unproven in `test`. Recorded fallback if a real child ever
   becomes load-bearing: the guides project with a raised `testTimeout` (the config project's own
   spawning precedent), never `distribution`, never a serviceless `service`.
3. **The skip comment becomes a placement rule** (`tests/guides.test.ts:154-158`): a fence's
   carrier lives in the project that can run it; browser fences carry in `tests/src/browser/` (a
   directory path, not a case list); the reciprocal pointer heads the browser blocks.
4. **Residue named, not counted.** The untranscribed fences beyond the named set (both lanes'
   overlapping inventories; the subjective lane's table in the D2e planner report) become the
   ROADMAP row's replacement, with a read-only grok inventory unit producing the full
   fence-by-fence table for the next release.

## Units (serial in the test checkout; TD parallel read-only)

- TA — `implementer` / Opus 5: contrast + readRing carriers in
  `tests/src/browser/helpers.test.ts` (claim-versus-scene split and case naming are the
  deliverable; the existing `readRing` describe may be the carrier, extended). Liveness: redden
  the expected `'4.54'` in the owned file, record, restore.
- TB — `implementer` / Opus 5: journal carrier in `tests/src/browser/factories.test.ts`; the
  page-derived `result` string is scene, the `steps`/`output` shapes are the claims.
- TC — `implementer` / Opus 5: the wait cleanup-on-delivery arm, the rewritten placement
  comment, and the presence guard in `tests/guides.test.ts`.
- TD — `grok` / Cursor Grok, read-only: the residue table over every `ts` fence in
  `guides/test.md` § Patterns — file:line, heading, value-claims present, executing project,
  existing case that already asserts the claims.
- Audit: `analyst` (Sol) over TA-TC (Opus wrote them). Gates: host `test:src:browser`,
  `test:guides`, then the repo chain.
