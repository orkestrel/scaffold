Objective lane held. The accepted Guide API remained closed.

## HTML

- **C1 — CONFIRMED.** Only the type-only alias import remains static. `GuideCommand`, `readInventory`, and `createVitest` are native-safe imports; runtime aliases and Vitest registration load inside `execute` at `C:/Users/mikes/WebstormProjects/html/tests/guides.test.ts:5`, `:28`, and `:37`. The predecessor failed on static `@src/core` resolution; the frozen native receipt passed at `tmp/pass/d7n-html-next-source-root/action.exit.txt:1`.
- **C2 — CONFIRMED.** Manifest/spec population, title pairing, pitch, surface/barrel/INTERNAL, method parity, drift, function/method examples, imports, links, and test links remain asserted at `tests/guides.test.ts:96-189`. These match the predecessor obligations stated at `C:/Users/mikes/WebstormProjects/html/guides/html.md:710`. The absent `report.sections`, `report.declarations`, and general fence-population assertions were not predecessor obligations.
- **C3 — CONFIRMED.** `package.json` is inventoried at `tests/guides.test.ts:30`; parsing and identity checks are at `:37` and `:90-121`. For parsed JSON, malformed text and primitives fail `isObject`; an array has no JSON-authored `name` property and fails equality; a missing or wrong name also fails. The expected value derives from the package-owned module policy rather than a second independent identity.
- **C4 — CONFIRMED.** The real HTML behavior and transcription cases remain at `tests/guides.test.ts:196-623`, including parsing, AST adoption, traversal, streaming, sanitizing, distilling, scanners, URL handling, and fixpoint laws. The native receipt reports `32 passed` at `tmp/pass/d7n-html-next-source-root/action.stdout.txt:7`.
- **C5 — CONFIRMED.** The frozen diff contains only `tests/guides.test.ts` (`tmp/pass/d7n-html-next-source-root/diff-after.txt:1`), and status names only that file (`status-after.txt:1`). Manifest hashes and index snapshots match before and after.

**Package decision: CONFIRMED.**

## NDJSON

- **C1 — CONFIRMED.** Static imports are type-only or native-safe at `C:/Users/mikes/WebstormProjects/ndjson/tests/guides.test.ts:5-8`; runtime package aliases and Vitest registration are dynamic at `:52-56`. Direct command composition is at `:43-51`. The native receipt passed at `tmp/pass/d7n-ndjson-next-source-root/action.exit.txt:1`.
- **C2 — CONFIRMED.** The prior inventory, own-row, title, pitch, surface, INTERNAL, methods, summaries/examples, imports, links, tests, and fence checks are preserved at `tests/guides.test.ts:58-166`. This covers the documented predecessor contract at `C:/Users/mikes/WebstormProjects/ndjson/guides/ndjson.md:112`.
- **C3 — CONFIRMED.** The package constant owns the module identity at `tests/guides.test.ts:17-19`. Inventory, Contract parsing/narrowing, name equality, and mandatory pitch are at `:45`, `:52`, and `:79-83`. Missing, malformed, non-record, missing-name, and wrong-name inputs fail by source deduction.
- **C4 — CONFIRMED.** The real chunk-boundary, clear, malformed-line, typed-helper, and transcription cases remain at `tests/guides.test.ts:174-248`, against `NDJSONParserInterface` at `C:/Users/mikes/WebstormProjects/ndjson/src/core/types.ts:6`. The root receipt reports `31 passed` at `tmp/pass/d7n-ndjson-next-source-root/action.stdout.txt:7`.
- **C5 — CONFIRMED.** The diff and status identify only `tests/guides.test.ts`; manifest hashes and index snapshots are unchanged in `tmp/pass/d7n-ndjson-next-source-root`.

**Package decision: CONFIRMED.**

## SQLite

- **C1 — CONFIRMED.** `@src/server` is static only as a type import at `C:/Users/mikes/WebstormProjects/sqlite/tests/guides.test.ts:5`. Runtime aliases, scratch infrastructure, Node path handling, and Vitest registration load inside the direct command callback at `:39-46`. The frozen native run passed.
- **C2 — CONFIRMED.** The predecessor inventory, own-row, title, pitch, surface/barrel/INTERNAL, methods, summaries/examples, imports, links, tests, and fence obligations remain at `tests/guides.test.ts:48-156`, matching `C:/Users/mikes/WebstormProjects/sqlite/guides/sqlite.md:321`.
- **C3 — CONFIRMED.** Package identity is single-sourced through `PACKAGE_MODULE` at `tests/guides.test.ts:17-19`; manifest inventory and Contract-backed rejection are at `:32`, `:39`, and `:69-73`.
- **C4 — CONFIRMED.** The cases at `tests/guides.test.ts:168-323` use the real SQLite implementation. They exercise real statements, parameters, iteration, transactions, pragmas, disposal, and native-error wrapping. The WAL case correctly uses a file-backed scratch database at `:279-285`. The root receipt reports `31 passed` at `tmp/pass/d7n-sqlite-next-source-root/action.stdout.txt:7`.
- **C5 — CONFIRMED.** Only `tests/guides.test.ts` changed; status, manifest hashes, and index snapshots under `tmp/pass/d7n-sqlite-next-source-root` preserve the surrounding tree.

**Package decision: CONFIRMED.**

## Timeout

- **C1 — CONFIRMED.** The only static imports are native-safe at `C:/Users/mikes/WebstormProjects/timeout/tests/guides.test.ts:5-7`; Contract, Guide, Test, package, and Vitest runtime imports occur inside `execute` at `:38-42`. The native receipt passed.
- **C2 — CONFIRMED.** The prior inventory, title, pitch, surface/barrel/INTERNAL, method, summary/example, import, link, test, and fence obligations remain at `tests/guides.test.ts:44-152`, matching `C:/Users/mikes/WebstormProjects/timeout/guides/timeout.md:222-228`.
- **C3 — CONFIRMED.** `PACKAGE_MODULE` owns identity at `tests/guides.test.ts:16-18`; package inventory and Contract-backed name rejection occur at `:31`, `:38`, and `:65-69`.
- **C4 — CONFIRMED.** Real delays and real `AbortSignal` lifecycle remain at `tests/guides.test.ts:161-246`. No fake clock or behavioral replacement appears. The receipt reports `29 passed` at `tmp/pass/d7n-timeout-next-source-root/action.stdout.txt:7`.
- **C5 — CONFIRMED.** Only the owned guide test changed. Manifest and index preservation evidence under `tmp/pass/d7n-timeout-next-source-root` is unchanged.

**Package decision: CONFIRMED.**

## Tool

- **C1 — CONFIRMED.** Native-safe imports and direct command composition appear at `C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts:5-37`; runtime aliases and Vitest registration are dynamic at `:38-42`. The native receipt passed.
- **C2 — CONFIRMED.** Inventory, title, pitch, surface/barrel/INTERNAL, methods, summaries/examples, imports, links, tests, and fence assertions remain at `tests/guides.test.ts:44-151`, matching `C:/Users/mikes/WebstormProjects/tool/guides/tool.md:300`.
- **C3 — CONFIRMED.** Identity is single-sourced at `tests/guides.test.ts:16-18`; package inventory and Contract-backed rejection occur at `:31`, `:38`, and `:65-69`.
- **C4 — CONFIRMED.** The real schema-bearing tool, envelope guard, registry lifecycle, execution, missing-tool result, batch ordering, and transcription guards remain at `tests/guides.test.ts:158-248`. This matches the package contract: schemas are advertised data, while argument-schema enforcement belongs to the consumer. The root receipt reports `25 passed` at `tmp/pass/d7n-tool-next-source-root/action.stdout.txt:7`.
- **C5 — CONFIRMED.** The diff and status name only `tests/guides.test.ts`; manifest hashes and index snapshots under `tmp/pass/d7n-tool-next-source-root` are unchanged.

**Package decision: CONFIRMED.**

## Findings fitting no claim

None.

## Attacked and held

- Removing sibling population guards from the required set does not conceal a regression. HTML’s predecessor did not own section, declaration, or general fence-population policy.
- HTML’s `isObject` branch does not admit an invalid parsed JSON shape with the expected name. JSON arrays cannot carry an authored named property, so they reach the equality assertion as `undefined`.
- SQLite does not substitute an in-memory database for the documented WAL result.
- Timeout uses actual elapsed time and native signals.
- Tool correctly does not turn its descriptive JSON Schema into runtime validation policy.

VERDICT: PASS
