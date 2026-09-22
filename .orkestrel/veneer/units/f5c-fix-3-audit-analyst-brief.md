# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5c TOKENS-TRUTH round 3

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f5c`. You hold the objective lane over the second fix round, which `opus` wrote
from `.orkestrel/veneer/units/f5c-brief-3.md` to close your own claim 2 and NESTED_HELPER
from `/home/user/scaffold/.orkestrel/veneer/units/f5c-fix-audit-analyst-verdict.md`, plus one guide
sentence the Orchestrator added stating the `Role` table's column shape. Perform the audit directly
and spawn nothing. Bound: rule within 12 minutes.

## Subject and evidence

`.orkestrel/veneer/units/f5c-fix-3.diff` is the diff of `guides/veneer.md`,
`tests/setupStyles.ts`, and `tests/setupStyles.test.ts` against `07fc3c3` (the round-2 writes plus
this round's); `f5c-fix-3-status.txt` the status; `.orkestrel/veneer/units/f5c-report-3.md`
the unit's report with its red-then-green readings and its two ancillary choices. The scoped gate
chain is being written to `.orkestrel/veneer/units/f5c-fix-3-gates.log.txt`, complete when its
last line reads `=== gates done`; read it last. The sandbox runs no Vitest project; rule a claim
about a proof on the mutation named and whether the assertions distinguish it, and name the settling
command for anything that needs a run.

## Claims

1. **The `Role` cardinality refusal binds.** In `collectReferenceRows` the header refusal fires per
   `Role` table, before the row loop, for every header the reader resolves other than `Role`,
   `Source`, and the one value column it chose, naming the column; the cell refusal fires in the
   `Role` branch when the cell states no mode split and its span count is not one, naming the cell.
   Re-run your round-2 executions in memory: a `Role | Light | Dark` table with row
   `` `primary` | `red` | prose `` now throws naming `Dark`, and a role Fill cell with a surplus
   `` , `red` `` now throws naming the cell, while the guide's real role table still reads.
2. **The plants distinguish the defect.** `refuses a role table carrying a column it does not read`
   and `refuses a role cell stating a surplus value` in `tests/setupStyles.test.ts` fail against the
   round-2 reader for the reasons the report records, and their inline controls pass against the
   round-3 reader.
3. **The nested helper is gone.** `states a dark value the dark cell alone decides` holds no function
   assigned or declared inside its callback (`grep -n 'const tier'` prints nothing); its two readings
   and assertions are intact.
4. **The guide sentence is true of the reader.** § Reference map says a `Role` table carries the
   `Role`, `Fill`, `Source`, and `Alias` columns and no other, that the reader refuses a `Dark`
   column there and a `Fill` cell stating more than one value; `Alias` is outside the reader's
   vocabulary as the report's second choice states, so the sentence and the code agree.
5. **Scope is honest.** The status lists the round-2 six files and nothing else; `tmp/probe/` is
   absent.
6. **The scoped gate chain is green** (UNRESOLVED if the log lacks `=== gates done`).

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts with `file:line`, findings outside the
claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
