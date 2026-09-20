# Unit U3-policy — successor brief 3: the second review's findings

## What changed and why

This brief supersedes `tmp/units/u3-policy-brief-2.md` for the remainder of the unit; every
section of `u3-policy-brief.md` and `u3-policy-brief-2.md` stands except where this one says
otherwise. The second objective review (`units/u3-policy-review-report-2.md`) closed findings 7, 9,
10, 11, 12 of round 1 and found the items under § Execution. The Orchestrator's ruling on its
finding 10: an index link is the workspace's own claim to author that guide; a mirror the
catalog stops registering while the index still links it enters the term sweep, and the banned
terms it reports are the signal. Record that ruling where item 4 says.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md` (the sweep
paragraph at `:1151-1155` alone). **Off-limits.** Everything else.

## Execution

1. **Stale control comment (claim 1).** `tests/policy.test.ts:694`: rewrite the comment so it
   says a name neither the catalog registers nor the index links is a stray whatever the
   directory holds.
2. **Count and pronoun (findings 8, 13).** `tests/policy.test.ts:665-667`: drop the numeral
   ("Two mechanisms carry that evidence") and open on the members; write "A guide neither
   mechanism accounts for reports."
3. **Remarks placement (findings 9, 12).** Move the index sentence out of `isPolicyMirror`'s
   `@remarks` (the mirror decision reads the catalog alone; say so) into a new `@remarks` on
   `isPolicyStray` that names both mechanisms. Give `readPolicyIndex` an `@remarks` stating that
   the index text is stripped of fenced blocks and code spans before the match, so a link inside
   either accounts for nothing, and naming the stripper's inherited limits (an unclosed fence and
   a fence indented four or more spaces are not blanked).
4. **The ruling (finding 10).** In `isPolicyStray`'s new `@remarks` and in the
   `guides/scaffold.md` sweep paragraph, add one sentence: an index link is the workspace's own
   claim to author that guide, so a mirror the catalog stops registering while the index still
   links it is swept, and the terms it reports name the drift.
5. **Fenced-link control (finding 11).** Add one `PolicyControl` row after `sweeps an index-linked
   guide when no catalog registers it`: label `ignores an index link written inside a fence`,
   membership `'index links inside fenced blocks and code spans, which account for nothing'`,
   rule `'prose'`, files: the manifest, `README.md` with a clean front page, `guides/README.md`
   whose only link sits inside a fence
   (`'# Index\n\n```md\n[`console.md`](console.md)\n```\n'`), and `guides/console.md` with a
   clean body (`'# Console\n\nA reader reads this guide.\n'`); expected: exactly one `prose`
   violation at `guides/console.md` with the stray message
   `"guide is the package's own, the map, a guide the map links, or a catalog row"` and no line
   (match the `rejects` row's shape for a stray). Prove the row red first by temporarily
   removing the `stripPolicyCode` call in `readPolicyIndex`, record the assertion, restore it,
   and record the green run.
6. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).

## Output

Write `tmp/units/u3-policy-report-3.md` and return its content: the diff summary; the new control's
red and green readings; each gate's exit code and final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file. Decide and
carry on from: wording within the meaning fixed here.

## Acceptance criteria

1. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0.
2. The new control ran red without the stripper and green with it.
3. `git status --porcelain` lists only `host.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
