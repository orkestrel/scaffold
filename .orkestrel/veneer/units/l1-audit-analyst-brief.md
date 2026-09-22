# Audit lane — `analyst` on GPT-6 Astra, objective lane, L1 LEDGER-HOME

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-ledger`. You hold the objective lane over the unit `opus` wrote from
`.orkestrel/veneer/units/l1-ledger-home-brief.md` under ruling D14
(`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D14): the cascade ledger
returns from `guides/ledger/` to `guides/veneer.md`. Perform the audit directly and spawn nothing.
Bound: rule within 12 minutes.

Evidence: `.orkestrel/veneer/units/l1.diff` (the whole diff against `ed4a8ec`),
`l1-status.txt`, the report `.orkestrel/veneer/units/l1-ledger-home-report.md`, and the gate
chain log `.orkestrel/veneer/units/l1-gates.log.txt` (complete when its last line reads
`=== gates done`; read it last). The sandbox runs no Vitest project; `npm run check` and `node -e`
that writes nothing are allowed; `git show ed4a8ec:<path>` reaches the pre-change files. Never edit.

## Claims

1. **The rows moved byte for byte.** Every departure row of `ed4a8ec:guides/ledger/departures.md`
   sits under `## Tokens` › `### Departures` in `guides/veneer.md` in the same order and bytes, with
   the introduction, the legend, the refresh command, and every `#### \`<key>\`` heading; every
   addition row of `ed4a8ec:guides/ledger/additions.md` sits under `### Additions` the same way; both
   precede `### Outside the ledger`; `### The ledger` is gone; `guides/ledger/` is gone;
   `ls guides/` prints `README.md`, `guide.md`, `scaffold.md`, `veneer.md`. Take the row diff
   yourself.
2. **The readers read the guide.** `readDepartures` and `readAdditions` in `tests/setupServer.ts`
   default to the package guide and walk `Tokens` (`selectSubsectionTables(…, 'Tokens', 'Departures', …)`
   and `'Additions'`); `LEDGER_GUIDE` opens with `## Tokens`; the plants in
   `tests/setupServer.test.ts` write and select `Tokens`; `tests/guides.test.ts` inventories
   `guides/*.md`; `tests/conformance.test.ts` is unchanged; the report's planted-cell control
   (`var(--vn-size-5)` to `var(--vn-size-4)` on the `.blockquote` `font-size` row) would redden the
   `cascade ledger` gate through `scanLedgerDrift` reading the guide (rule from the code path).
3. **The prose is true.** The cross-references under `### Button states and bindings` and
   `### Bootstrap variables Veneer retains` read `§ Departures`; `### Outside the ledger` reads
   "neither table here"; `guides/README.md` names no `ledger` directory and its § Tokens sentence
   names the departure and addition tables; `grep -rn 'guides/ledger\|ledger/departures\|ledger/additions\|## Cascade' guides tests`
   prints nothing.
4. **Scope is honest.** The status lists `guides/README.md`, `guides/veneer.md`,
   `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, and the two deleted
   ledger files, and nothing else.
5. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

Output: the `orkestrel-falsify` verdict shape — numbered verdicts with `file:line`, findings outside
the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
