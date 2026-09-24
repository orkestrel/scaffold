# Unit E-ID-CODE round 2 — the release's own tag pairs, and the Content specimens

Successor to `e-id-code-brief.md`, which stays in force for every section this brief does not restate. What changed:
round 1 met every owned criterion and stopped, correctly, on the elements-layer positional law and on the Content
section test; `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum after round 1 rules both.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eic`, which holds your round-1 change. Read your
round-1 report `tmp/units/eic-report.md` first.

## Objective

The positional law admits the pairs Bootstrap 5.3.8's reboot writes, and the Content specimens ship with their section
test.

## Scope

**Owned, added this round.** `tests/src/styles/index.test.ts` and `tests/app/browser/sections/ContentSection.test.ts`.
**Shared, as round 1**, including `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md`.

## Execution

Perform the assignment directly and spawn nothing.

1. Add `RELEASE_TAG_PAIRS` beside `MANDATED_TAG_PAIRS` in `tests/setupStyles.ts`, holding `pre`/`code`, `a`/`code`,
   and `kbd`/`kbd`, with TSDoc naming the release's reboot as their source; list it in `tests/setupStyles.test.ts`'s
   export list and pin its value there. Pass both tables to `scanPositionalPairs` in `tests/src/styles/index.test.ts`.
   The scan stays red for any other pair: show it red under a mutation that adds a positional rule outside both
   tables, with a byte-identical restore.
2. Name the second exception in the guide paragraph that opens "A rule in the `elements` layer treats a tag by its
   name".
3. Apply your `tmp/units/eic-contentsection.patch`.
4. Run the owned styles files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and
   `npm run test:guides`, and the app files
   `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts tests/app/browser/integration.test.ts`.
   A timing failure under load is an observation you report with its reading; the Orchestrator re-runs it alone.

## Output

Write `tmp/units/eic-report-2.md` and return the same text: the changes, the mutation row, the gate table with log
paths, the shared-file hunks, `tmp/units/eic-2.diff` (`git diff ca83afb`), and `tmp/units/eic-2-status.txt`.

## Acceptance criteria

The common criteria, and: the scan passes with the release pairs and reds under the added-pair mutation; the Content
section and integration files pass.
