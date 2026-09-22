# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5d fix round (Orchestrator-written)

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer`. You hold the **objective** lane over a fix the Orchestrator (Opus
engine) wrote after the F5d round; you are the engine that did not write it. Perform the audit
directly and spawn nothing. Bound: rule within 10 minutes.

## Subject and evidence

The working tree over commit `07fc3c3` carries the fix: `/home/user/scaffold/tmp/audit/f5d-fix.diff`
is the diff and `/home/user/scaffold/tmp/audit/f5d-fix-status.txt` the status. The round's verdicts
that motivated it: `/home/user/scaffold/tmp/audit/f5d-audit-analyst-verdict.md` (claims 2 and 6)
and `/home/user/scaffold/tmp/audit/f5d-audit-reviewer-verdict.md` (claims 2 and 12, findings F-A and
F-E). The gate chain over this tree is being written to
`/home/user/scaffold/tmp/audit/f5d-fix-gates.log.txt` and is complete when its last line reads
`=== gates done`; read it last, if present.

## Claims

1. **The radius collapse is Bootstrap's form and changes no resolved corner.** `.btn` in
   `src/styles/components/_button.scss` and `button` in `src/styles/elements/_button.scss` write one
   `border-radius` declaration with the same token the four longhands carried; the oracle inventory
   (`tests/fixtures/oracle/inventory.json`, the `.btn` entry) records `border-radius`; no later
   declaration in the same rule or a following rule resets a corner (read the compiled cascade with
   `sass` if you can, writing nothing); the proofs reading a corner longhand keep their expected
   values.
2. **The text-table freeze case binds.** The case "freezes every text case table with its entries"
   in `tests/setupStyles.test.ts` covers every `TEXT_*` export of `tests/setupStyles.ts` (compare the
   list against `grep -n '^export const TEXT_' tests/setupStyles.ts`), and removing an outer
   `Object.freeze` from one table in memory would fail it (say whether `Array.from(table).every`
   distinguishes a thawed entry).
3. **The prose corrections are true.** `guides/veneer.md`: the § Styles values-list sentence keeps
   its serial comma and wraps at the width its neighbours keep; the icon-link departure bullet leads
   with the departure ("Bootstrap flips the shift and Veneer does not.") and keeps the byte-stream
   sentence verbatim; the § Compatibility `vr` row reads "for its width"; `tests/setupStyles.ts`'s
   module comment wraps within 100 columns.
4. **Scope is honest.** The status lists exactly `guides/veneer.md`, `src/styles/components/_button.scss`,
   `src/styles/elements/_button.scss`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`; the
   diff touches nothing else.

## What you can execute

Read-only: `grep`, `sed -n`, `cat`, `git diff`, `git show 07fc3c3:<path>`, and `node -e` that
writes nothing, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
No browser project (the sandbox denies the loopback listener). Never edit.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts with `file:line`, findings
outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
