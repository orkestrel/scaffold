# Unit E-ID-LAYOUT round 2 — the Horizontal description list specimen

Successor to `e-id-layout-brief.md`, which stays in force for every section this brief does not restate. What
changed: round 1 met every owned criterion and held the specimen because its section test was not granted;
`/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum after round 1 grants it.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eil`, which holds your round-1 change. Read your
round-1 report `tmp/units/eil-report.md` first.

## Objective

The Type section shows Bootstrap's horizontal description list, pinned by its section test.

## Unknowns

Whether the specimen needs a `.container` wrapper because of the `.row` gutters: settle it by rendering the section at
390 and 1280 pixels and reading the specimen's box against the region's, and report the reading.

## Scope

**Owned, added this round.** `tests/app/browser/sections/TypeSection.test.ts`. **Shared, as round 1**, including
`app/browser/constants.ts`.

## Execution

Perform the assignment directly and spawn nothing. Apply `tmp/units/eil-specimen.patch`, with the wrapper if the
reading calls for one, then run
`npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/integration.test.ts`
and `npm run format:check`, `npm run lint:check`, and `npm run check`, each logged.

## Output

Write `tmp/units/eil-report-2.md` and return the same text: the specimen as shipped, the overflow reading, the gate
table with log paths, `tmp/units/eil-2.diff` (`git diff ca83afb`), and `tmp/units/eil-2-status.txt`.

## Acceptance criteria

The two app files and the three static gates exit 0; the specimen does not overflow its region at 390 or 1280.
