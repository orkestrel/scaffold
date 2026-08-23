# Unit W5 report — report a setup surface that has no proof

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/unit-w5-brief.md`.

## What landed

One private `#setupQuestion` in `src/bin/CLI.ts`, pushed into `#targetQuestions` only when the verb
is not writing. No type change, no new export, no barrel row, no guide row.

## The predicate, and why it is not a parser

A `tests/setup*.ts` module fires when it carries a non-whitespace byte, is not itself a test, and is
not a `HOST_PATHS` member. The whole question is suppressed once `Blueprint.setup` is true.

Every setup module scaffold writes is seeded from `ARTIFACT_TEMPLATES.tests.setup`, which is the
empty string, so emptiness is the exact line between the seed and a module a maintainer wrote into.
That reads no TypeScript, which the constraint requires: `typescript` is a development dependency
here, so `src/` cannot parse a module to count its exports, and a text scan for the `export` keyword
would be a second source-language analyzer that `AGENTS.md` bans and that is wrong about comments
and strings.

The unit considered and rejected comparing each module against the content
`blueprintToTestArtifacts` seeds at its path, recording why: `new` takes no flag that produces the
global setup module, and a hand-written one holding a real function is a value export the proof
legitimately covers.

## A design catch the brief did not carry

`#assertTarget` throws on every question `#targetQuestions` returns when the verb is writing. Adding
this question there would make `repair` and `overwrite` refuse any target with setup helpers and no
proof — a refusal no write could ever close, because scaffold does not write that proof. The unit
scoped the question to `audit` alone.

Verified on this repository: `audit --offline` reports the question and exits 0, and
`repair --offline --groups tests` exits 0 reporting `0 written` with the tree unchanged.

## The live reading, which is the gap closing

```json
{"field":"setup","blocking":false,
 "message":"The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts asserting the behavior they export. The proof's subject is behavior only this workspace can assert, so scaffold does not write it."}
```

It names both filled modules, excludes the vendored `tests/setupPolicy.ts` that every target
carries, and stays out of the exit code. Run across the fleet, that is the list of packages lacking
a setup proof — which is the thing nothing reported before.

## Failing-first evidence

`npx vitest run --project src:bin -t 'setup module'` reported 2 failed and 1 passed before the fix,
both failures being the absent question with every surrounding fixture assertion already green, and
3 passed after. The third test is a negative control that passed before as well.

## The brief's "makes false" list was wrong, and how the unit found the right one

The brief named five `toStrictEqual` assertions over `audit.questions`. **Those fixtures carry no
`tests/` directory, so the question cannot reach them.** The real set is five different tests whose
fixtures write `target/tests/setupService.ts` with content, and the unit found them by running the
suite and reading the failures.

Two became `toHaveLength(2)` with a `toStrictEqual` on the new entry, three gained the question in
their exact list, and one stale comment was corrected rather than deleted. Nothing was loosened.

**The lesson is landed rather than recorded.** `.agents/orchestration.md` § Check the brief before
you send it now states that the false set is found by running the suite, not by searching for the
assertion's shape, because a search returns matches the change cannot reach and misses fixtures that
reach it by an unnamed path, and both errors appear in one grep. That file is vendored, so the
inventory was regenerated in the same commit.
