# U5g — report (builder, Sonnet) — returned 2026-09-15 ~19:28Z

Brief: `U5g-mcp-landing-text-brief.md`. Captured from the completion notification.

## Carriers

1. Campaign identifiers removed — `tests/fixtures/distributionPage.mjs:243` (`X5 — ` deleted), `:248` (`X6 — ` deleted), `:282` (`X7 — ` deleted), `:320` (`X7 — ` deleted), `:353` (`X8, page side — ` replaced with `On the page side, `). Each comment keeps the sentence naming what the scenario is; only the token and its dash are gone.
2. Composition authored once — `tests/fixtures/distributionScript.mjs:66-71` exports `PAINT_SCRIPT`, built once from `buildScript(TOOL, { note: NOTE }, ANSWER)`. `tests/fixtures/distributionPage.mjs:15` and `:245` import and use `PAINT_SCRIPT` in `runPage` instead of composing it locally (also dropped the now-unused `ANSWER` import, kept `NOTE`/`TOOL`/`buildScript` since `runCancel` at line 331 still calls `buildScript` for a different script). `tests/fixtures/distributionServer.mjs:8, 33-37` imports `PAINT_SCRIPT` directly, replacing its own `buildScript(TOOL, { note: NOTE }, ANSWER)` call and dropping the now-unused `ANSWER`, `NOTE`, `TOOL`, `buildScript` imports.
3. Guide sentence — `guides/mcp.md:4825-4827`. Rewrote the `refuses a relay turn…` bullet so the installed relay is the actor answering `401`, keeping `authorize` named as what it rejects, and keeping the claim scoped to the receipt: the relay refuses a credential its `authorize` callback rejects, answering that status, and the route records the request it refused.

## The identifier sweep

Pattern `X[0-9]` (a token of the form `X` followed by a digit) over `tests/fixtures/distributionPage.mjs`, `tests/fixtures/distributionServer.mjs`, and `tests/fixtures/distributionScript.mjs`. Found five occurrences, all in `distributionPage.mjs` (lines 243, 248, 282, 320, 353, listed under carrier 1); none in the other two fixtures. A re-run after the edits returns no matches.

## What each side imports

- `distributionPage.mjs` imports `NOTE, PAINT_SCRIPT, ScriptedProvider, TOOL, buildScript, buildTurn` from `./script.mjs`. `PAINT_SCRIPT` composes the page's own `runPage` run; `buildScript` remains for `runCancel`'s separate `HOLD` script; `TOOL` remains for the `PAINT` tool's advertised `name`; `NOTE` remains for the user message text.
- `distributionServer.mjs` imports `PAINT_SCRIPT, ScriptedProvider` from `./script.mjs`. `SCRIPT` is now `PAINT_SCRIPT` directly; `ANSWER`, `NOTE`, `TOOL`, `buildScript` are no longer imported there because nothing else in that file used them.

## Acceptance readings

1. `npm run format:check` — exit 0. `npm run lint:check` — exit 0 (after moving the `PAINT_SCRIPT` doc comment to a verb-first summary to satisfy `policy(no-malformed-summary)`).
2. `npm run check` — exit 0 (`tsc --noEmit` across root, core, browser, server projects, no diagnostics).
3. `npm run test:guides` — exit 0, 1 test file, 202 tests passed.
4. Grep over the three fixtures for `X[0-9]` — no matches.
5. `npm run test:distribution -- --mode release` — exit 0, duration 19.13 s, 19 passed | 4 skipped (23 total). Every receipt this unit touches passed, including `refuses a relay turn presenting a credential the fixture does not hold` (7 ms). The 4 skipped cases are outside this brief's scope (unaffected classifier/registry cases already skipping before this unit ran).
6. `git status --short` — `M guides/mcp.md`, `M tests/distribution.test.ts`, `AM tests/fixtures/distributionPage.mjs`, `AM tests/fixtures/distributionScript.mjs`, `AM tests/fixtures/distributionServer.mjs`: the same five paths the tree carried at start. My own edits: `guides/mcp.md` (`## Tests` bullet only), `tests/fixtures/distributionPage.mjs`, `tests/fixtures/distributionScript.mjs`, `tests/fixtures/distributionServer.mjs`. `tests/distribution.test.ts` untouched by me.
7. No count of a growable set, no `above`/`below`, appears in prose I added.

## Deviation state

None. No carrier needed a change in `tests/distribution.test.ts`; carrier 2 completed without one.

## Orchestrator note on the shared fixture's exports

Carrier 2 removes the last importer of `ANSWER` outside the shared fixture, and `buildDeltas`
already had none. Checked rather than assumed: each is declared in the centralized module the
repository's own law names as their home, and each is exercised there — `ANSWER` through
`PAINT_SCRIPT`, `buildDeltas` through `ScriptedProvider`, both of which every composition receipt
drives. `AGENTS.md` § Design laws asks a helper to be folded into its caller or exported from the
correct centralized module and tested; these take the second form, so neither is a hidden
declaration and neither is a speculative export. No follow-up owed.
