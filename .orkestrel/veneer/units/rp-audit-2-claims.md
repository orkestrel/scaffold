# RP audit, round 2 — claims

Subject: the RP round-2 change in `/home/user/veneer-rp` (uncommitted over Veneer `1ee0faf`, with the round-5
`@orkestrel/test` build installed and its Vite pre-bundle built from that build), briefed by `rp-repin-brief-2.md` and
reported in `rp-report-2.md`. The diff is `rp-2.diff`, the status `rp-2-status.txt`, and the logs `rp-instruments/rp2-*`.
The round-1 reconciliation is `rp-audit-verdict.md`. The Orchestrator's control `rp-instruments/rp-control-4.sh`, with
its logs, applies `rp-2.diff` to `1ee0faf` in a fresh worktree whose installed build and Vite pre-bundle are the
registry's 0.0.23, and runs the case with `CAPTURE` unset. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
   and `tests/setupBrowser.ts` and nothing else; `npm run format:check`, `npm run lint:check`, and `npm run check` each
   ran and each log ends on its own exit 0.
2. **The census.** `git diff 1ee0faf -- tests/setup.ts` changes only the `CASCADE_KEYS` remarks sentence; no capture
   state, scenario row, or exemption changed.
3. **The case proves the park.** The case lifts an unpadded copy whose box starts at the document's origin (asserted),
   arms its `mouseover` recorder before `releasePointer`, stages the pane through the installed `stagePane` and releases
   it through `releasePane` in a `finally`, and asserts no entry and no `:hover` on the copy. It passes on the round-5
   build under both journeys (`rp2-green-*`), fails on the registry's 0.0.23 under both (`rp-control-4-*`), and fails
   with a hover at (1, 1) in place of the release (`rp2-red-light390.log.txt`); its assertions distinguish those runs.
4. **The padding prose.** No sentence under `tests/` or in `guides/veneer.md` gives the lift's padding a pointer
   consequence or places the parked pointer at the origin or on the padding; each of the three padding sites states the
   padding's role and the release's role separately.
5. **Prose law.** Every added or changed comment and guide sentence names one origin with one term, follows each code
   token with its noun, states no count, and uses no banned term.
6. **Kept proofs.** Every `releasePointer` call and `entered` recorder at `1ee0faf` is kept.
