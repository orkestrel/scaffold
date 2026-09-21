# Unit CL4 — the ledger enumerations in the conformance proof (brief 5)

Succeeds `cl4-brief-4.md`, which with briefs 3, 2, and 1 beneath it stays in force for
everything this brief does not name. All four are left unedited. What changed and why: you
stopped a third time (`cl4-report-3.md`) because assertions in the off-limits
`tests/setupConformance.test.ts` enumerate the ledger's shipped components as `btn` alone, and
your `reboot` row makes them false. **The stop was right**, and your presence scan is green,
which is the hard part done. This brief grants those assertions and names every site, including
one you had not reached and one whose fix is not the obvious one.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `d822d59`, with your own CL4
work in the working tree. Continue from it without restoring or resetting anything. Perform the
assignment directly and spawn nothing.

## The ruling

An assertion that enumerates the ledger's components is exactly the kind your change is meant to
grow, and brief 1's standing clause already gives you such assertions in owned files. These four
sit in a file the briefs put off-limits because it belongs to CL1's proof contract, so the grant
is mine to give rather than yours to assume. **I grant `tests/setupConformance.test.ts` for the
sites named below and for nothing else.** Every case must keep proving what it proves today: you
are updating a population, not weakening a check.

I swept that file myself for every assertion your `reboot` row can reach, so this is the whole
list. Your report named three of them; these are five.

| Site | What it asserts today | What it becomes |
| --- | --- | --- |
| `:621` | `collectShippedComponents(rows)` equals `['btn']` | `['btn', 'reboot']` |
| `:626` | the same equality after mapping method rows to `accepted` | `['btn', 'reboot']`, unless mapping leaves Reboot withheld, in which case say so and assert what holds |
| `:642` | `collectShippedComponents(rows)` equals `['btn']` | `['btn', 'reboot']` |
| `:746` | the component set of the dash-proof rows equals `{btn, engine}` | `{btn, reboot, engine}`. I read your row: its Proof cell is a dash and its Status is `shipped`, so the loop beneath it (`row.proof` undefined, `scanOracleObligation` undefined) holds for your rows unchanged. Confirm that by running it, and if a Reboot row makes that loop fail, stop and report rather than narrowing the loop. |
| the case opening at `:655` | it pairs the **real** ledger's rows with a **synthetic** inventory that knows only `btn`, so your real `reboot` row makes the scan report a missing inventory before the case reaches its subject | Filter the real rows to the `btn` component so the population matches the synthetic inventory. Do **not** add `reboot` to the synthetic inventory: the case's subject is how the partition reports missing, deferred, and unknown names, and filtering keeps it independent of how many components the ledger ships, which is why it broke in the first place. Say in your report that you chose the filter and why. |

Nothing else in that file may change. In particular `:192`'s binding case takes more rows
safely, and I checked it needs no edit.

## Finish the unit

The gate chain stopped at `test:setup`, so it is unfinished beyond that point. After the grant
above, run brief 1's item 6 chain to the end, including both Edge runs, and report every exit
code and final line. Your acceptance criteria are brief 1's, unchanged.

## Everything else

Briefs 1 to 4's Objective, Context, Scope, Execution, Output, and Deviation contract stand, with
Scope gaining `tests/setupConformance.test.ts` for the five sites named above. Your deviation
contract keeps every stop condition it has, and the standing one still applies: **stop and
report** rather than editing a file this brief does not grant, or narrowing a case to make it
pass.
