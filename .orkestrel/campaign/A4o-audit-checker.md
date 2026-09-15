<!-- A4o — checker (Sonnet, native), the only lane of the U4e-h text round, over A4o-u4e-h-only.patch.txt, the report, the after-u4e-h gates, and the live files. Retained from the completion notification, 2026-09-15 (62 s, 18 tool uses). Claim 2's count sub-reading is taken on the host in the K-a4o-count ledger row. -->

**Lane: MECHANICAL (checker)**

1. **CONFIRMED.** `src/core/types.ts:1791` is the sole `src/**` occurrence of "The producer advances on the stream's demand." (grep, one hit). Handler `@remarks` (`types.ts:1759-1769`) no longer carries the pair and reads as a filled paragraph, no short line before `options.signal`. Diff confirms deletion from Handler only (`A4o-u4e-h-only.patch.txt:20-25`).

2. **UNRESOLVED (count sub-claim only).** The `it.each([new Error('private producer detail'), undefined])` at `MCPServer.test.ts:526-554` is confirmed live and matches the diff, keeping every assertion of both originals (queued-frame `toMatchObject` and `-32603` terminal `toEqual`), and `waitForDelay(10)` is confirmed gone from that block (next `waitForDelay(10)` at line 579 belongs to the following, untouched test). The "file's test count is unchanged (244)" sub-claim has no independent corroboration in the supplied evidence: `U4e-h-mcp-gates-test-full.log.txt` reports only aggregate `test:src` totals (1498 passed | 2 skipped), never a per-file `MCPServer.test.ts` count, so 244-before/244-after rests solely on the writer's own report (`U4e-h-mcp-remark-report.md:19`). Per the self-report rule this sub-part is UNRESOLVED, not CONFIRMED.

3. **CONFIRMED.** `MCPServer.ts:1532-1536` carries the four-line comment naming both directions of the closed-stream test (listeners registered only when the filter carries the tools family; graceful close only when it omits it), matching the diff and the brief's carrier 3.

4. **CONFIRMED.** The refusal is right: `tools()` helper is declared at `MCPServer.test.ts:380` and used at dozens of call sites (e.g. `:408`, `:870`, `:896`…). The `registry` binding is unchanged at `:560`, with uses at `:580` and `:593`. Renaming it to `tools` would collide with the in-scope helper's name, which `no-shadow` under `--deny-warnings` flags — the refusal recorded in the report (`U4e-h-mcp-remark-report.md:13`) and reflected in `A4n-audit-reviewer.md`'s `outside:` recommendation being correctly not applied.

5. **CONFIRMED.** `A4o-u4e-h-only.patch.txt` touches exactly `src/core/MCPServer.ts`, `src/core/types.ts`, `tests/src/core/MCPServer.test.ts`. `A4o-whole.patch.txt` lists fifteen `diff --git` headers. `collide3-mcp-after-u4e-h.txt` reports "collisions: none" over 98 files. `U4e-h-mcp-gates-orchestrator.log.txt` shows `format:check`, `lint:check`, `check`, `build` all `exit=0`, and `test` (aggregate, including `test:guides` 202/202, `test:conformance` 47/47, `test:integration` 4/4) `exit=0`. No `any`, `as`, nested function declaration, or default export appears in the three hunks (checked against `A4o-u4e-h-only.patch.txt` content above).

outside:

- `A4n-audit-reviewer.md`'s recorded recommendation to rename `registry` to `tools` (line 24 of the grep output) is superseded by the U4e-h report's refusal (claim 4); this round's `outside:` carries only the carry-forward closure note about `U4e-g-regressions-red.log.txt`'s pin numbering, which this audit did not re-verify (out of this round's scope — it concerns a prior red-reading record, not the U4e-h delta).

VERDICT: FAIL 2
