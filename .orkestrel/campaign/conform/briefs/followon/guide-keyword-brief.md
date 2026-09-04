# Unit guide-keyword — the guide rename's consumers after the W-END re-stage

## Role and engine

Orchestrator-owned mechanical unit (Claude Opus 5 in the Orchestrator's context, a scripted one-token edit; no writer dispatched), audited by the landing chain's gates per package and by a Grok 4.6 checker over the landed diffs (`briefs/guide-keyword-checker-brief.md`). Written 2026-09-04 15:20 UTC, after the edit was applied and proved on abort, so the pair on disk records what ran.

## Objective

Every fleet consumer's `tests/guides.test.ts` parity drop-in reads the `keyword` property `@orkestrel/guide`'s `SurfaceSymbol` declares at its landed tip (guide-subj-12 renamed `kind` → `keyword`, `ExportKind` → `ExportKeyword`), and database's hand-written surface helper `tests/setupServer.ts` with its test `tests/setupServer.test.ts` reads the same names; each package's gate chain is green against the W-END staged closure.

## Evidence and the re-baseline

`ledgers/followons.md:17` ruled at reconcile (2026-09-03 17:50 UTC) that the consumer edit rides each package's re-pin at the publish wave, "never 46 hand edits before". The close-out's W-END re-stage (`units/closeout-wend.log.txt`, 15:06 UTC) installed guide's landed tip into every consumer's closure, and the authoritative gate sweep's first rows read `abort FAIL check` and `browser FAIL check` on `tests/guides.test.ts: Property 'kind' does not exist on type 'SurfaceSymbol'` (`/home/user/work/logs/gates-abort-check.log`). Under that ruling the sweep reads red for every consumer landed before guide's rename, and the close-out cannot read the fleet green. The ruling is reversed on that evidence: the edit lands now, in every consumer, and the wave's visit no longer carries it. The sweep was stopped by pid after its fourth row; it re-runs after these landings.

## Sites and edits

- In each of abort, browser, budget, codec, console, contract, csv, database, emitter, form, html, indexeddb, interpret, lsp, markdown, middleware, msg, ndjson, pool, process, qualifier, queue, rater, reason, relation, router, sea, sqlite, sse, table, template, terminal, timeout, tool, websocket, and workspace: `tests/guides.test.ts` `.filter((symbol) => symbol.kind === 'function')` → `symbol.keyword === 'function'` (one token, by `sed` with the whole call as the pattern).
- test: `tests/guides.test.ts:243` the same token in the `'interface'` filter.
- database: `tests/setupServer.ts` and `tests/setupServer.test.ts`, whole-word `ExportKind` → `ExportKeyword`, `kinds` → `keywords`, `kind` → `keyword` (the files carry no other `kind`; the TSDoc phrase "declaration kind" follows the axis).
- Not edited: scaffold's own `tests/guides.test.ts:132,140` (scaffold is not re-staged by W-END and its closure carries the registry guide; the edit rides scaffold's re-pin), the packages already reading `keyword` (agent, brief, guide, mcp, ollama, program, server, toolbox, worker, workflow), probe (its drop-in carries no symbol filter), and every vendored `guides/guide.md` mirror (a byte copy refreshed at the wave).

## Acceptance

Each landing chain: `format:check`, `lint:check`, `check`, `build`, `test` exit 0 and `scaffold audit --offline` clean, recorded in `/home/user/work/logs/land-guide-keyword-<lane>.log` and retained under `units/followon/`; the Grok checker reads each landed diff as the named edit and nothing else.
