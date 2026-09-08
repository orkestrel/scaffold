# Closure brief — lsp: the checker over the fix round and the closing successor

## Lane

`checker` (Sonnet), blind and clean, over lsp's fix round and its successor `d7n-lsp-close-2`. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-lsp-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-lsp-close-2-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-lsp-audit-verdict.md` (items L1 to L8); Rulings 14, 20, 21, 26, 27, and 28 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/lsp` at its tip.

## Claims

1. Every item the fix brief names landed in the fix diff as the brief states it, and nothing else changed (scope honesty against the fix status file: `guides/lsp.md`, `src/core/factories.ts`, `src/core/types.ts`, `tests/setupServer.ts`, `tests/src/server/fixtures/protocol.mjs` and no other path; no code token moved outside the titled example's read line); the successor's diff touches `guides/lsp.md` only.
2. Each report's citations match the tree the unit left; neither report states a count in prose.
3. Each named correction is present as the audit's finding asked: every colon-ended lead-in before a convention sentence ends with a period (L1); `### Stdio client transport` and `### Client and transport contracts` (L2); the fixture description names the buffer the code returns (L3); the fences at the former `:131`, `:196`, and `:213` have lead-ins (L4); the titled pair reads `diagnostics` on both sides and stays equal (L5, Ruling 14); `destroy`'s `@remarks` carries the drain fact (L6); no comment line in `tests/setupServer.ts` exceeds the print width (L7); every function row holds its signature and the guard row the type it narrows to, with the Ruling 26 sentence on each such table (L8).
4. After the successor, the class rows `StdioClientTransport`, `LSPClient`, and `LSPError` hold the interface each implements or its constructor signature with the Ruling 28 sentence on their tables, and the `### Guards` table carries the guard sentence alone (Ruling 27).

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker lsp`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.
