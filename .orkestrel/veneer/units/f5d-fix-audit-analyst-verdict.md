1. **CONFIRMED.** `src/styles/components/_button.scss:53` and `src/styles/elements/_button.scss:16` emit the radius shorthand with their original tokens. `tests/fixtures/oracle/inventory.json:31995` records Bootstrap’s shorthand. The executed Sass/PostCSS walk found no later corner reset; an injected reset was detected. Corner expectations remain unchanged at `tests/src/styles/components/button.test.ts:218` and `tests/src/styles/elements/button.test.ts:79`. Browser proofs were not rerun locally.

2. **CONFIRMED.** `tests/setupStyles.test.ts:1102` covers every `TEXT_*` export. The in-memory TypeScript/Node fallback executed the extracted case assertions: the baseline passed, and independently removing each table’s outer freeze failed. `Array.from(table).every(...)` preserves entry identity and rejects a thawed entry; it does not detect a thawed outer array, which the separate assertion handles. The revised direct `table.every(...)` has the same entry behavior. This was an assertion probe, not a Vitest run.

3. **BROKEN.** `tests/setupStyles.ts:5` measures **113 columns**, contradicting the explicit 100-column requirement. Reflow the module comment without changing its words. The guide’s serial comma, departure-first wording, preserved byte-stream sentence, and “for its width” correction hold at `guides/veneer.md:221`, `:321`, and `:1024`.

4. **CONFIRMED.** `/home/user/scaffold/tmp/audit/f5d-fix-status.txt:1` and the supplied diff contain exactly the named paths. The working-tree diff against `07fc3c3` names the same set. An extra-path control failed the scope comparison.

Findings outside the claims:

- **F-WRAP — BROKEN.** `guides/veneer.md:270` is a changed prose line measuring **106 columns**. The responsive-wrapper reflow moves the overflow onto this line. Rewrap that paragraph within 100 columns, preserving its text.

Attacked and held: size-specific radius tokens correctly retune the shorthand; those token overrides are not corner resets. The replacement gate log records successful formatting and lint checks, but lacks `=== gates done`; complete gate success is not established (`/home/user/scaffold/tmp/audit/f5d-fix-gates.log.txt:17`).

VERDICT: FAIL 3; outside the claims: F-WRAP