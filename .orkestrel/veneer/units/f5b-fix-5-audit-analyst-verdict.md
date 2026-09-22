# F5b ACCOUNTING-LEDGER rounds 4 and 5 — `analyst` verdict (GPT-6 Astra, objective lane)

Journal `tmp/codex/f5b-fix-5-audit-analyst.jsonl` (swept at acceptance), thread `01a0cad6-ac2d-7243-a35d-a60501e86c21`, exit 0. Brief: `.orkestrel/veneer/units/f5b-fix-5-audit-analyst-brief.md`.

1. **CONFIRMED.** Direct and fallback rows register the same site key before insertion. Executed controls rejected cross-path collisions in either component order and fallback-only collisions, naming the components and site. Removing direct registration in memory made the cross-path assertion fail. Repeated writes within one component remain measured; refusing them broke their assertion. Evidence: `tests/setupServer.ts:1616`, `tests/setupServer.ts:1649`, `tests/setupServer.test.ts:1508`, `tests/setupServer.test.ts:1547`, `tests/setupServer.test.ts:1646`.

2. **CONFIRMED.** The predicate checks selector, condition, property, and value. The executed matching, differing, and missing-vocabulary cases held. The reversed inventory/shipped-order plant returned one `row-gap` row. Disabling the skip caused a collision; selecting ownership by shipped order produced `row` and failed the explicit attribution assertion. The remark and `@throws` describe the exception. Evidence: `tests/setupServer.ts:1535`, `tests/setupServer.ts:1558`, `tests/setupServer.ts:1599`, `tests/setupServer.test.ts:1596`, `tests/setupServer.test.ts:1619`.

3. **CONFIRMED.** Executed ledger inspection found no `row-gap` component row or heading and one row at every `.row-gap-*` site. Only the documented `reboot` font-size sites repeat: `pre`, `code`, and `kbd`. The live measurement matches the ledger; restoring a removed duplicate reports it as stale. Byte comparison found only the specified additions reason-cell change. Reading the installed release confirmed no bare-button transition and a reduced-motion counterpart for `.btn`. Evidence: `guides/ledger/departures.md:843`, `guides/ledger/departures.md:852`, `guides/ledger/departures.md:881`, `guides/ledger/additions.md:89`, `tests/conformance.test.ts:162`.

4. **CONFIRMED.** The supplied status lists the claimed paths and untracked ledger directory. The inventory diff against `07fc3c3` equals its retained earlier diff; an altered comparison control differs. `tmp/probe/` is absent. Although the live checkout has since been committed, its tracked-file diff and ledger bytes match the supplied snapshot. Evidence: `/home/user/scaffold/tmp/audit/f5b-fix-5-status.txt:1`, `/home/user/scaffold/tmp/audit/f5b-fix-5.diff:1663`, `/home/user/scaffold/.orkestrel/veneer/units/f5b-fix.diff:1704`.

5. **CONFIRMED.** Read last, the gate log records `exit=0` for formatting, lint, checking, building, and every test command in the chain. Its final line is `=== gates done (20:41:14)`. Evidence: `/home/user/scaffold/tmp/audit/f5b-fix-5-gates.log.txt:11`, `/home/user/scaffold/tmp/audit/f5b-fix-5-gates.log.txt:4287`, `/home/user/scaffold/tmp/audit/f5b-fix-5-gates.log.txt:4389`, `/home/user/scaffold/tmp/audit/f5b-fix-5-gates.log.txt:4406`.

Findings outside the claims: none.

Attacked and held: identical recordings legitimately collapse to the inventory owner; differing recordings still refuse a collision. Repeated recordings within one component legitimately remain separate measurements.

VERDICT: PASS