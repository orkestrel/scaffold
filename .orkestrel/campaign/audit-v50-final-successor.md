# Successor to the pre-publication audit brief

Both lanes receive this identical text. The original brief stands; this amends it.

## What changed in the brief itself

**The tip moved.** The subject is now `28fc2cc`, 30 commits above `origin/main`. Two commits landed
after the brief was written: the brief commit itself, and unit W7.

**One "already established" item is now false and is withdrawn.** The original brief states that
`tests/distribution.test.ts` in this repository is byte-untouched across the whole chain. That was
true when written and is no longer. W7 edited it by hand.

Read the withdrawal precisely, because it is the kind of thing a round can mis-rule: the claim that
mattered was that **`overwrite` never rewrites a workspace's own proof**, and its evidence is the
propagation reading, where `mcp` and `process` both keep their bespoke proofs byte-untouched after
the verb ran. A maintainer editing this package's own file by hand does not bear on that. If you
think it does, say so and show why.

## Why W7 existed

`npm run prepublishOnly` was red and 0.0.50 could not publish. `npm test` was green; the failure
lived only in `test:distribution -- --mode release`, which the aggregate chain does not run.

The assertion was `expect(shaped).toBe(183)` — a hard tally of claim-shaped lines across the
shipped declarations. This campaign added exported symbols carrying `@example` blocks, so the
population reached 188. The Orchestrator refused to fix it by writing `188`, on the ground that this
campaign had already enforced on the generated proof that a cardinality assertion is acceptable only
where it pins a structurally fixed set.

## Added claims

Append these to the numbered set, continuing its numbering.

14. The replacement assertion — `expect(printing).toStrictEqual(DECLARATIONS.map((d) => d.types))` —
    detects an extractor that narrows over what a shipped declaration prints, and does not move when
    a declaration gains a documented example. Break either half.
15. The per-declaration figure counts only bodies below the index where the injected controls are
    appended, so a rule that narrows all the way down to the controls still leaves its declaration
    at zero rather than being masked by them. Break this by finding a narrowing the boundary misses.
16. **Attacking this round's own ruling.** The Orchestrator ruled that bumping the tally to `188`
    was the wrong fix and that the assertion's shape had to change. Break that ruling: show either
    that the tally was the stronger instrument, or that the replacement gives up coverage the tally
    had and the report does not name.
17. `npm run prepublishOnly` exits 0 at the tip, and every gate inside it genuinely ran rather than
    being skipped. Establish this yourself; do not take the unit's report for it.

## Already established, added

Verified by the Orchestrator directly at the tip: `prepublishOnly` exits 0; the replacement's firing
control reddens naming the silent declaration and greens on restore; no tally literal remains; the
partition assertion is unchanged.

## Where your probe lives

Use the filename this dispatch assigns you under `tmp/probe/`, run with `npm run test:probe`, and
delete it before you return. Another lane is live with its own filename. Do not run a tree-wide
gate — its in-flight probe would read as a failure nobody caused.
