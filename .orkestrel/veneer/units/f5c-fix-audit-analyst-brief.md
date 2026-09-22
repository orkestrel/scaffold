# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5c TOKENS-TRUTH fix round

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer-f5c`. You hold the **objective** lane over the F5c fix round, which
`opus` wrote from `.orkestrel/veneer/units/f5c-brief-2.md`; you are the engine that did not
write it. Perform the audit directly and spawn nothing. Bound: rule within 20 minutes.

## Subject and evidence

The worktree carries the F5c unit's first-round writes, the Orchestrator's integration of the first
run's obligation-4 patch set (`src/core/constants.ts`, `src/styles/_mixins.scss`, and the guide's
§ Text and surface), and the fix round's writes, all uncommitted over `07fc3c3`.
`.orkestrel/veneer/units/f5c-fix.diff` is the whole diff against `07fc3c3` and
`f5c-fix-status.txt` the status; the fix round's own report
`.orkestrel/veneer/units/f5c-report-2.md` names the files it touched, its measurements, its
per-row rulings, and the claims it flagged unverified; the successor brief
`.orkestrel/veneer/units/f5c-brief-2.md` names the findings each obligation carries, and the
round-1 verdicts `.orkestrel/veneer/units/f5c-audit-{analyst,reviewer,checker}-verdict.md`
are where those findings came from. The gate chain over this tree is being written to
`.orkestrel/veneer/units/f5c-fix-gates.log.txt`, complete when its last line reads
`=== gates done`; read it last.

Standing conditions at launch: the sandbox denies every Vitest project, browser and Node alike
(Vite writes a temporary file the sandbox refuses), so a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it, and a claim that needs an executed run is
`UNRESOLVED` with the exact settling command named; the Orchestrator takes that run on the host.
`/home/user/veneer-f5b/guides/veneer.md` and `/home/user/veneer-f5b/guides/ledger.md` are the F5b
worktree's uncommitted writes; read them only to settle claim 5's heading question.

## Claims

1. **The range refusal binds.** `collectRowTokens` in `tests/setupStyles.ts` throws, naming the
   endpoint and the cell, on an endpoint the registry order does not carry and on endpoints in
   reverse order; a prose first cell still returns nothing; the case
   `refuses a range whose endpoint the registry order does not carry` in `tests/setupStyles.test.ts`
   reaches the refusal through `collectReferenceRows`, and the case that asserted an undeclared range
   returns nothing is gone.
2. **Every stated cell compares.** `ReferenceRow.light` and `ReferenceRow.dark` are `string`;
   `collectReferenceRows` throws, naming what it read, on each fault the report enumerates (missing
   subsection, no table, unresolvable keyed or valued column, no body row, a `Tier` table before every
   `Role` table, a `Source` cell with no legend word, a `Tier` or `Role` cell naming more than one
   subject, a first cell naming no token, a value cell stating no value); the case
   `states a dark value the dark cell alone decides` reads the guide and a copy whose dark tier cell
   says `16%`, and its assertions distinguish that mutation from the passing case; the value gate in
   `tests/src/styles/tokens.test.ts` would report drift on that same mutation (name the assertion that
   fails and why the `undefined` skip's removal is what makes it fail).
3. **The stated normalization is the implemented one.** The § Reference map comparison paragraph in
   `guides/veneer.md` states the percentage clause and nothing `normalizeDeclaration` does not do;
   `normalizeDeclaration` is unchanged against `07fc3c3`; the case
   `compares a percentage as its own number written in full` pins the clause; the phrase
   `six significant digits` appears nowhere in § Reference map.
4. **The value gate reads every row.** `tests/src/styles/tokens.test.ts` carries no
   `value === undefined` skip; it reads a row's fallback from the mode's own scope
   (`[data-bs-theme=light]` or `[data-bs-theme=dark]`) before `:root`, keyed through
   `normalizeSelectorText`; its coverage floor asserts the registry minus the map's tokens equals
   `UNMAPPED_TOKENS` exactly; `UNMAPPED_TOKENS` in `tests/setupStyles.ts` names every canonical token
   § Tokens states outside its reference map and no other (derive the set from the guide and the
   registry yourself and compare).
5. **The guide's sentences are true.** Every § Reference map cell states a machine-readable value
   (no cell reads as a description; the shadow rungs and the form-validation tokens are one row each;
   the scale, radius, and elevation laws sit in a sentence after their table); the Links departure
   sentence points at `§ Outside the ledger` and states what `tests/src/styles/elements/a.test.ts`
   proves, no more (the report flags that this sentence rests on `TEXT_A_CASES` frozen readings and
   that nothing reads `--vn-link-base` there: rule whether the sentence as written is true of the
   file); the retained-highlight paragraph states the rule without `D7`; the grep
   `Departures from Bootstrap records\|D7 keeps\|reproduces the color Elements` prints nothing; and
   `### Outside the ledger` is the heading the F5b worktree's guide carries (state the file and line,
   or that it does not, so the integration order can correct the pointer).
6. **Placement and naming.** `REFERENCE_MARKUP` sits under the frozen-tables section comment
   immediately after `TABLE_MARKUP`; no `PROBE_REFERENCE` remains; the inventory case registers
   `REFERENCE_MARKUP` and `UNMAPPED_TOKENS`; the readers section comment names the guide readers and
   states why a guide reader takes Markdown as a string.
7. **The malformed-table refusal is where `readDeferrals` throws from**, not a `continue`; the case
   `refuses a table whose value column it cannot resolve` renames the scratch map's `Value` header
   and asserts the throw names the column.
8. **Scope is honest.** The status lists exactly `guides/veneer.md`, `src/core/constants.ts`,
   `src/styles/_mixins.scss`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, and
   `tests/src/styles/tokens.test.ts`; `src/core/constants.ts` and `src/styles/_mixins.scss` carry
   only the Orchestrator's integration patch; `tmp/probe/` is absent; nothing outside the owned set
   changed.
9. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

## What you can execute

Read-only in the worktree: `grep`, `sed -n`, `cat`, `git diff`, `git show 07fc3c3:<path>`, and
`node -e` that writes nothing, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
`npm run check` is allowed. No Vitest project runs here. Never edit.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts with `file:line`, findings
outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
