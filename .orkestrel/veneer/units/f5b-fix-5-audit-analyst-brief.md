# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5b ACCOUNTING-LEDGER rounds 4 and 5

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f5b`. You hold the objective lane over rounds 4 and 5, which `opus` wrote from
`.orkestrel/veneer/units/f5b-brief-4.md` and `f5b-brief-5.md` to close your own claims 6 and 8
from `/home/user/scaffold/.orkestrel/veneer/units/f5b-fix-audit-analyst-verdict.md`. Perform the
audit directly and spawn nothing. Bound: rule within 15 minutes.

Evidence: `.orkestrel/veneer/units/f5b-fix-5.diff` (the whole diff against `07fc3c3`, the
ledger files included as additions), `f5b-fix-5-status.txt`, the reports
`.orkestrel/veneer/units/f5b-report-4.md` and `f5b-report-5.md`, and the full gate chain log
`.orkestrel/veneer/units/f5b-fix-5-gates.log.txt` (complete when its last line reads
`=== gates done`; read it last). The sandbox runs no Vitest project; rule a claim about a proof on
the mutation named and whether the assertions distinguish it. `npm run check` and `node -e` that
writes nothing are allowed. Never edit.

## Claims

1. **Both paths claim their site.** In `collectValueGaps` the direct path registers each row's
   `selector | condition | property` site (through `describeSite`) before pushing the row and the
   fallback path claims through the same writer; a component reaching a site another component
   holds throws naming both and the site; a component writing a site it already holds stays
   measured; the cross-path plant `refuses one emitted declaration two shipped components claim
   through different paths` (`btn` at `.btn`, `close` at the withheld `.btn-close-white`) throws as
   asserted, and the retained fallback-only plant still passes.
2. **The identical-recording skip.** `matchesRecording` answers true only where the other component
   records the same selector, condition, and value; `collectValueGaps` asks `attributeSelector`
   (layer `undefined`) which shipped component owns each recorded selector and skips a non-owner's
   pass over a site the owner records identically, so one row is written; the plant `writes one row
   for a declaration two shipped components record identically` (inventory order `row-gap`, `row`;
   shipped order `row`, `row-gap`) asserts the ladder answers `row-gap` and one row attributed to it;
   `matchesRecording`'s direct cases cover a matching value, a differing value, a differing
   condition, a differing selector, and a missing vocabulary; the remark and the `@throws` clause
   state the skip.
3. **The ledger.** `guides/ledger/departures.md` carries no `row-gap`-attributed row
   (`grep -c '^| \`row-gap\`'` prints 0) and no `#### \`row-gap\`` heading; every `.row-gap-*` site
   holds one row; the only sites holding two rows are the `reboot` repeated writes the report names
   (`pre`, `code`, `kbd` `font-size`); `guides/ledger/additions.md` is unchanged except the
   reduced-motion reason cell, which now reads that the release declares no transition on a bare
   `button` element while the `transition` mixin writes this one with its reduced-motion pair.
4. **Scope is honest.** The status lists the first run's ten files, `guides/README.md`,
   `tests/guides.test.ts`, and the untracked `guides/ledger/`; `tests/fixtures/oracle/inventory.json`
   carries only the first run's writes (compare against `07fc3c3` and the retained
   `f5b-fix.diff` at `/home/user/scaffold/.orkestrel/veneer/units/f5b-fix.diff`); `tmp/probe/` is
   absent.
5. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

Output: the `orkestrel-falsify` verdict shape — numbered verdicts with `file:line`, findings outside
the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
