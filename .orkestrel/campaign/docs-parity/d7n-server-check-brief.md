# Closure brief — server: the checker over the fix round and the caps successor

## Lane

`checker` (Sonnet), blind and clean, over server's fix round and its successor `d7n-server-caps`. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-server-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-server-caps-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-server-audit-verdict.md` (items SV1 to SV9); `d7n-server-close-brief.md`; Rulings 9, 13, 14, 17, 20, 21, and 23 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/server` at its tip.

## Standing condition

The fix unit returned an exact patch for `tests/setupServer.ts:232` (`CLAIMED` lowered), a line its scope withheld; the Orchestrator applied it before landing, so the retained fix diff carries that hunk while the report's § Shared and off-limits patches describes returning it. Rule the diff.

## Claims

1. Every item the fix brief names landed in the fix diff as the brief states it, and nothing else changed (scope honesty against the fix status file: `guides/server.md`, `src/server/Server.ts`, `src/server/constants.ts`, `src/server/factories.ts`, `src/server/types.ts`, `tests/guides.test.ts`, `tests/setupServer.ts` and no other path); the caps diff changes comment text only, in the files its brief owns.
2. Each report's citations match the tree the unit left; neither report states a count in prose.
3. Each named correction is present as the audit's finding asked: the `### Constants` sentence reads "A `Shape` cell holds the constant's declared type." alone (SV1, Ruling 20); the titled pair sits on `createServer` with the title `Quickstart: dispatcher, middleware, lifecycle` and equals the guide fence, `createNegotiator`'s example untitled, and no line deleted from either side (SV2, Rulings 14 and 23); the named all-caps sites in `src/server/types.ts`, `src/server/constants.ts`, and `tests/setupServer.ts` are lowered with their contrast kept (SV3); `below` and `above` are gone from `src/server/types.ts`, `src/server/Server.ts`, and the guide (SV4); the boundary paragraph names an inner phase and an outer phase with `innermost` gone (SV5); `tests/guides.test.ts` carries the presence-guard case `carries the fence lines the transcriptions copy` (SV6); the content-coding description reads "compresses or decompresses with" and the `Encoding` cell equals it (SV7); the dead `const value` binding is gone (SV8); the drop-in's lines 1 to 3 equal the pilot's, the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended, and a lead-in sentence sits between every heading and its fence in the guide (SV9, Rulings 13, 20, and 21).
4. After the caps successor, `grep -rnE '\b[A-Z]{3,}\b' src guides/server.md` reports only hits the caps report rules as data (acronyms, format names, HTTP vocabulary, error codes, quoted code literals, filenames, placeholders), and every sentence the successor recast keeps its meaning.

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker server`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.
