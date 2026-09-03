# Checker lane, round 1 — unit sea-skip (a follow-on in /home/user/fleet/sea)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `sea-skip` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/sea-skip-brief.md`, report `/home/user/scaffold/tmp/units/followon/sea-skip-report.md`, evidence `/home/user/work/evidence/conform-sea.diff` and `/home/user/work/evidence/conform-sea.status`, captures under `/home/user/work/evidence/sea-skip-proofs/`), on the landed tip `0c4a239`, uncommitted, implemented by an Opus `implementer`. It adds `ROOM` to `SEAErrorCode`, raises it at the two sites in `src/server/injectors/Injector.ts` that measure the host binary's header room (the PE section-entry site and the Mach-O load-command site), narrows the stage-hooks proof's skip in `tests/integration.test.ts` to `ROOM`, adds a `tight` option to `buildPeFixture` in `tests/setupServer.ts`, adds PE and Mach-O applicability proofs in `tests/src/server/injectors/Injector.test.ts`, and documents `ROOM` in `guides/sea.md`.

## Claims

1. Every row of the brief is applied in the tree: `SEAErrorCode` in `src/server/types.ts` carries `ROOM` with a doc line beside `INJECT`'s; the two applicability sites in `Injector.ts` raise `ROOM` with their messages and context unchanged, and no other `SEAError` site raises `ROOM`; `tests/integration.test.ts` skips on `error.code === 'ROOM'` and on no other code, and its comment names the code; the PE and Mach-O proofs assert `ROOM` and its context; `guides/sea.md` documents `ROOM` against `INJECT`.
3. The sweeps `'INJECT'` over `tests/integration.test.ts` (empty), `\bROOM\b` over `src`, `tests`, and `guides/sea.md` (only the raise sites, the proofs, the skip and its comment, the type and its doc line, and the guide paragraph), and `SEAErrorCode|isSEAError|'INJECT'` over `/home/user/fleet/*/{src,app,tests}` excluding `node_modules` and `dist` (no hit outside `/home/user/fleet/sea` that names a `SEAErrorCode` value) return what the report records; re-run them and rule every hit.
4. The captures exist and read as the report states: `row3-red-applicability.txt` reads two failures on `expected 'INJECT' to be 'ROOM'` before the raise sites changed and `row3-green-applicability.txt` every case passing after; `row4-integration-planted.txt` reads the stage-hooks proof failing on the planted `#verifyELFNoteMapping` throw rather than skipping, and `row4-integration-restored.txt` every case passing; the source diff for `Injector.ts` shows only the two code changes and no planted throw.
5. `guides/sea.md`'s `SEAErrorCode` Types row and its tables are unchanged apart from the added paragraph; the guide's fences are unchanged and `tests/guides.test.ts` is untouched; the added paragraph's claims (which layouts raise `ROOM`, that the measurements ride in `context`, that every other injection failure keeps `INJECT`) match the code at the two raise sites.
7. `/home/user/work/evidence/conform-sea.status` lists only `guides/sea.md`, `src/server/injectors/Injector.ts`, `src/server/types.ts`, `tests/integration.test.ts`, `tests/setupServer.ts`, and `tests/src/server/injectors/Injector.test.ts`; the diff carries no hunk outside them, no `package.json` change, and no compatibility alias for the old skip.
9. No `TODO`, deferred row, skipped test, `.only`, `any`, type assertion, non-null assertion, or debug residue entered on an added line; the added `tight` option is a single-word key and the fixture's filler count is derived, not hardcoded; the report's rows match the diff hunk for hunk; the report's authored prose states no count, and the `tightHeaders` finding it records is named as outside the unit's scope.

Claims 2, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
