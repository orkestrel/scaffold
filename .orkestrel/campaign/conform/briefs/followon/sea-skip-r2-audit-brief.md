# Checker lane, round 2 — unit sea-skip (a follow-on in /home/user/fleet/sea)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `sea-skip` after fix round 1 (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/sea-skip-brief.md`, fix brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/sea-skip-fix1-brief.md`, report `/home/user/scaffold/tmp/units/followon/sea-skip-report.md` with its `## Fix round 1` section, evidence `/home/user/work/evidence/conform-sea.diff` and `/home/user/work/evidence/conform-sea.status`, captures under `/home/user/work/evidence/sea-skip-proofs/`), on the landed tip `0c4a239`, uncommitted. Round 1 added `ROOM` to `SEAErrorCode` at the two header-room sites; the objective lane found two Mach-O `__LINKEDIT` limits still reporting `INJECT`, and the Orchestrator ruled that `ROOM` names every host layout the injector cannot write into. Fix round 1 raised `ROOM` at `Injector.ts:1332` and `:1402`, widened the doc line and the guide paragraph, added a `linkedit` option group (`present`, `sections`) to `buildMachoFixture` with its own proofs, added the two `ROOM` proofs, and renamed `tightHeaders` to `tight`.

## Claims

1. Every row of both briefs is applied in the tree: `SEAErrorCode` in `src/server/types.ts` carries `ROOM` with a doc line naming the layout limit; exactly four sites in `src/server/injectors/Injector.ts` raise `ROOM` (the PE header-slack site, the Mach-O load-command site, the missing-`__LINKEDIT` site, the sectioned-`__LINKEDIT` site) with their messages and context unchanged, and every other `SEAError` site keeps its code; `tests/integration.test.ts` skips on `error.code === 'ROOM'` and on no other code, and its comment names the layouts; `guides/sea.md` documents `ROOM` against `INJECT`; `MachoFixtureOptions` carries `tight` and a `linkedit` group with `present` and `sections`, and no `tightHeaders` survives.
3. The sweeps `'INJECT'` over `src/server/injectors/Injector.ts` (only the defect reports, the `overwrite` refusals, and the malformed resource directory), `\bROOM\b` over `src`, `tests`, and `guides/sea.md` (the four raise sites, the type and its doc line, the proofs, the skip and its comment, the guide paragraph), `tightHeaders` over `src`, `tests`, and `guides` (empty), and `SEAErrorCode|isSEAError|'INJECT'` over `/home/user/fleet/*/{src,app,tests}` excluding `node_modules` and `dist` (no hit outside `/home/user/fleet/sea` naming a `SEAErrorCode` value) return what the report records; re-run them and rule every hit.
4. The captures exist and read as the report states: `fix1-red-linkedit.txt` reads two failures on `expected 'INJECT' to be 'ROOM'` before the two raise sites changed and `fix1-green-linkedit.txt` every case passing after, with the message assertions binding each case to its site; `fix1-setup-fixture.txt` reads the fixture-option proofs passing; the round-1 captures (`row3-*`, `row4-*`) still exist.
5. `guides/sea.md`'s `ROOM` paragraph names each covered layout, the `context` measurements where the injector takes one, and what `INJECT` keeps, and each of those claims matches the code at the four raise sites and the remaining `INJECT` sites; the guide's tables and fences are unchanged and `tests/guides.test.ts` is untouched.
7. `/home/user/work/evidence/conform-sea.status` lists only `guides/sea.md`, `src/server/injectors/Injector.ts`, `src/server/types.ts`, `tests/integration.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/src/server/injectors/Injector.test.ts`; the diff carries no hunk outside them, no `package.json` change, and no compatibility alias.
9. No `TODO`, deferred row, skipped test, `.only`, `any`, type assertion, non-null assertion, or debug residue entered on an added line; the fixture's `sections` option writes real section entries and its filler counts are derived; the report's rows match the diff hunk for hunk; the report's authored prose states no count, and the successor item it records (the executed assertion behind the guide's `INJECT` sentence) is named as outside the unit's scope with its prescription.

Claims 2, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
