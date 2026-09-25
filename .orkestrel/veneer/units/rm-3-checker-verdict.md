Per-claim verdicts, evidence from `/home/user/scaffold/.orkestrel/veneer/units/rm-3-delta.diff` and live tree `/home/user/scaffold-rm`.

1. **F1 — CONFIRMED.**
   - `grep -rn readVitestReport --include=*.ts --include=*.md` over `/home/user/scaffold-rm` (excluding `node_modules`/`tmp`) returns no matches; `parseVitestReport` is the live name (`/home/user/scaffold-rm/tests/setupServer.ts:917`, `:920`).
   - TSDoc opening matches brief word for word: `rm-3-delta.diff:8` `+ * Parses the test files a Vitest JSON report records.`
   - `@remarks` matches brief word for word, wrapped only by the formatter: `rm-3-delta.diff:18-20` `+ * The whole report is refused rather than the malformed entry dropped, so a caller never receives` / `+ * a partial file list as the run's. The parser narrows only the structure it walks; every verdict` / ` * field stays the reporter's value.`
   - Case title matches brief exactly: `rm-3-delta.diff:61` `+	it('parses every test file a Vitest report records, and refuses a text that is not a report', () => {`
   - Every import/call site the Evidence named (`tests/setupServer.test.ts`, `tests/distribution.test.ts`) is renamed: `rm-3-delta.diff:52,70,78,88,99,108,117`.

2. **F2 — CONFIRMED.**
   - `its own environment record` → `its own invocation record`: `rm-3-delta.diff:128` `// Vitest calls a project row with its own invocation record, so a factory that`.
   - Second replacement matches word for word across the wrap: `rm-3-delta.diff:140-142` `// ... so \`mergeOverride\`,` / `// given a value carrying the pair, returns the base in the record's mode and` / `// carries none of its other fields.`
   - Comparing the full comment before (`rm-3-delta.diff:127-135`) against after (`:137-146`) line by line, no other word differs; only the two named replacements changed, and reflow is the only other effect.

3. **F3 — CONFIRMED.**
   - `rm-3-delta.diff:39-41` reads `Each rewriting rival` / `+ * writes its \`files\` for its own run alone, and the caller restores the generated text after it;` / `+ * the \`timeout\` rival runs the workspace as generated and differs only in its timeout.` — matches the brief's replacement text word for word, wrapping aside.

4. **Scope — CONFIRMED.**
   - `rm-3-delta.diff` touches only `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/distribution.test.ts`, and `tests/src/core/templates.test.ts` — exactly the brief's owned files, and only the lines the three Items name (identifier rename plus the three prose replacements; no other code line changed).
   - `rm-3-status.txt` additionally shows `guides/scaffold.md`, `host.json`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/config.test.ts`, `tests/src/core/compilers.test.ts`, `vite.config.ts` as modified, but these are round-1/round-2 changes the brief's Standing conditions explicitly carries over unchanged; `rm-3-delta.diff` (the round-2→round-3 comparison) contains no lines for them, confirming round 3 left them untouched.

Note: the evidence supplied to this audit is the diff and status only; no gate log was provided, so this verdict rules only on claims 1–4 (text and scope), not on gate exit codes.

VERDICT: PASS
