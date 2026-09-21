# Unit CL4 — the ledger-population assumption in the conformance proof (brief 6)

Succeeds `cl4-brief-5.md`, which with briefs 4, 3, 2, and 1 beneath it stays in force
for everything this brief does not name. All five are left unedited. What changed and why: you
stopped a fourth time (`cl4-report-4.md`) at two more assertions in
`tests/setupConformance.test.ts`, and **the stop was right both times**. My brief-5 sweep matched
the shape `['btn']` and missed two cases that assert emptiness, so the grant I wrote was
incomplete. That is my defect, not yours, and this brief closes the class rather than naming two
more sites for you to hit a fifth.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `d822d59`, with your own CL4
work in the working tree. Continue from it without restoring or resetting anything. Perform the
assignment directly and spawn nothing.

## What is actually wrong, and the ruling

The two failing cases loop over both CSS categories and expect that removing or accepting a
category's rows withholds **every** component. That holds only while every component carries
both a selector and a variable obligation, which was true when Button was the only component.
Reboot has no custom properties at all, so it has no variable row, and CL1 deliberately made a
component with an empty official property set ship on its selector row alone. The production
behaviour is right; the cases encode a single-component assumption.

**The ruling: I grant `tests/setupConformance.test.ts` as a whole, for one purpose.** Every case
in it that derives rows from `readCompatibility()` and then asserts on a population must scope
its manipulation to the component that case is about, so the case proves what it proves
independently of how many components the ledger ships. No case's subject may change, and no
assertion may weaken: a case that proves withholding must still prove withholding, and a case
that proves a message must still prove that message.

For the two that fail now, that means filtering the derived rows to `btn` before the loop, the
same shape brief 5 already ruled for the partition case, rather than asserting Reboot's
incidental survival. Asserting `['reboot']` there would be faithful to today's ledger and wrong
in kind: it would make the case restate the ledger's population, and it would break again at the
next component.

## The sweep I should have handed you in brief 5

Every `readCompatibility()` call in that file, with what it needs:

| Site | What it does | Needs a change? |
| --- | --- | --- |
| `:114`, `:208`, `:227`, `:237` | finds one named row | No: a `find` is unaffected by a larger ledger |
| `:166`, `:192` | checks every oracle binding reaches some row | No: more rows can only satisfy these |
| `:353` | filters rows to a named proof step | No |
| `:616` case | the category loop asserting `[]` | **Yes**: scope to `btn` |
| `:641` case | appending accepted category rows, asserting `[]` | **Yes**: scope to `btn` |
| `:655` case | partition against a synthetic inventory | Already fixed under brief 5 |
| `:748` case | the dash-proof component set | Already fixed under brief 5 |

Walk the file yourself against the ruling rather than trusting this table to be complete: it is
the same sweep that missed two sites last time. Report any further case you scope and why.

## Finish the unit

After the grant, run brief 1's item 6 chain to the end, including both Edge runs, and report
every exit code and final line. Your acceptance criteria are brief 1's, unchanged.

## Everything else

Briefs 1 to 5's Objective, Context, Scope, Execution, Output, and Deviation contract stand, with
Scope gaining `tests/setupConformance.test.ts` for the purpose above. Every other off-limits
file stays off-limits: `tests/setupConformance.ts` itself, `src/styles/_reset.scss`,
`tests/fixtures/**`, and the vendored files. Your deviation contract keeps every stop condition
it has, and this one is sharpened: **stop and report** if closing a case under this ruling would
change what that case proves, rather than changing it.
