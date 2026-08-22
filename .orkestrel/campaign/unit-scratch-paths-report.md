# Unit scratch-paths report: write and link answer the contained path

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/test`.
Brief: `unit-scratch-paths-brief.md`. Returned 2026-08-22; every criterion green; no
deviation.

## The change

`ScratchInterface.write` and `link` return the resolved absolute contained path — the
`candidate` each member already computed — aligning the contract with `ensure`. TSDoc
gains the `@returns` lines; the guide's member table and the "Own a temporary
directory" fence follow, with the fence transcribed into a throwaway runtime probe that
passed with a failing paired control before deletion. The `void` to `string` move is
additive for every existing consumer.

## The recorded not-adopted ruling

The dissolved scaffold wrapper's fused non-optional `read` stays refused: `read`
answering `undefined` is the absence law, and `requireValue(scratch.read(target))` is
the supported composition for a caller that wants a throw.

## Red then green

`npm.cmd run test:src:server`, both runs: red with rows added and implementation
untouched — `Tests 2 failed | 132 passed | 9 skipped (143)`, both failures
`TypeError: The "path" argument must be of type string. Received undefined` at the
`isAbsolute` assertions; green after the change — `Tests 134 passed | 9 skipped (143)`,
exit 0.

## Acceptance evidence

Status clean beyond the standing staged deletion plus owned files; scoped `oxfmt
--check` and `oxlint --deny-warnings` exit 0 (the guide's table re-pad ran through a
scratchpad copy, single file, whitespace-only under `diff -w`); `tsc --noEmit` exit 0;
`test:src:server` exit 0; `test:guides` exit 0 (`20 passed (20)`); `test:policy`
observed exit 0 (`93 passed (93)`). The scratch suite lives at
`tests/src/server/factories.test.ts` under the `src:server` project;
`tests/guides.test.ts` pins nothing the change rewrote.

## Carried finding

Scaffold's vendored `.claude/rules/tests.md` § Shared test infrastructure carries a
`ScratchInterface` sketch stale before this unit and now stale on `write` as well; the
fix belongs in the scaffold host inventory (lines 228-234), with `dist/host` and the
committed inventory regenerated. Carrier: the Orchestrator's direct edit after
fetch-U1 lands, recorded in the fetch campaign.

Version bumped to 0.0.10; the verifier's authoritative run and the publish handoff
follow in the campaign record.
