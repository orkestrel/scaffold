# Attack on the first synthesis draft — Opus 5.5 reviewer, 2026-10-04

Objective lane plus reconciliation fidelity, read-only, against browser `3924fbb`, pool `5a3a631`, mcp `50afe56`, probe `dee8845`. Terminal verdict: **FAIL**. Every repair was applied in the revised `synthesis.md`.

## Verdicts

- Agreements: holder in tool arguments CONFIRMED (`mcp/src/core/types.ts:1716-1719`); unnamed behavior unchanged REFUTED by draft ruling 9; destroy on end CONFIRMED (`Pool.ts:476`, `:759`); per-holder admission CONFIRMED, with the closing-holder count unruled; no idle timer, shared and per-holder state (`BrowserMCPServer.ts:576`, `:699-700`), no mcp change (`MCPServer.ts:464-466`), the pool strike change, and default size 1 CONFIRMED.
- Ruling 1 (strike rule): the choice CONFIRMED; the comparative argument REFUTED: the chosen rule also spends a long-lived floor when an idle spare dies, refills, and dies again with no grant between (`tests/src/server/BrowserMCPServer.test.ts:380-404`). Fix: state the bound as consecutive failures with no grant of a post-strike record between them, name the idle-spare limit, and test it in H1.
- Ruling 2 (cleanup and spent-floor refusals): CONFIRMED (`Pool.ts:354`, `:371`, `:380`, `:408`), provided the shared holder is admitted like the others.
- Ruling 3 (idle-loss accounting): conclusion CONFIRMED; premise REFUTED under draft ruling 9, which released setup's validated record.
- Ruling 6 (cross-holder `forget`): CONFIRMED (`BrowserJourneyToolset.ts:606-608`, `FileBrowserRunStore.ts:147-152`, `:176-179`, `:43`, `:141`); the second-process limit was dropped.
- Ruling 7 (downloads): CONFIRMED as conditional (`BrowserContext.ts:517-528`); the exposure exists today, and the proof needs a real Chromium that H3's owned files did not include.
- Ruling 9 (lazy shared lease): REFUTED. It drops the CRASH note for an idle-killed first record (`BrowserMCPServer.ts:466-470`; `BrowserMCPServer.test.ts:427-438`), loses the owed refill (`:380-416`), breaks the `start()` contract (`src/server/types.ts:414-415`), and leaves the shared holder's admission unruled. Fix: keep the planner's lease at setup.
- Ruling 10 (release order): UNVERIFIED; `browser/package.json:3` reads 0.0.23.
- Q1 unbalanced: (a) omitted same-name sharing and the page-tool `browser` parameter collision; (b) omitted the scoped catalog and the separation of acquisition cancellation from holder lifetime (`proposal-analyst.md:38-46`).
- Q2: in this package `close` already means shutting down a remote browser the instance may not own (`server/types.ts:308-316`); the draft reversed the planner's recommendation without saying so.
- Missing user decisions: the strike rule, a reserved failover spare (planner T7), a call in flight when its holder ends (planner T9), the shared lease timing.
- Units: H1's red case did not pin the chosen rule (`Pool.test.ts:855` must stay green; add the idle-spare case; rerun `BrowserMCPServer.test.ts:380`; a public remark changes, so a review pass); H2 lacked a cancelled first-call grant, the closing-holder count, and a cross-holder reference case; H3 omitted `BrowserMCPServer.ts` and a service test; H4 had no case that goes red when the server serializes holders, and no injected cleanup refusal.
- Measurement: dropped recording beside replay, cancellation and replay-failure readings, Edge against a lighter Chromium, and the accounting of refused work.

## Omissions

1. Whether Claude Code or Codex subagents share the parent's stdio process is unknown; a pid-and-timestamp probe settles it, and item 14's value depends on it.
2. The waiter-order ruling the brief asked for.
3. Analyst corrections dropped without a ruling: `release()` does not validate; the narrowing of `clients.md` fact 2; continuation checks on the exact holder and token.
4. Planner points dropped without a ruling: name validation against `BROWSER_JOURNEY_NAME_PATTERN`; Codex approval prompts for a non-read-only end tool; the re-description of `BROWSE_POOL`.
