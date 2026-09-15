# Unit U13d — `@orkestrel/agent`: the guide states where the browser relay round trip is proven

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/agent` checkout while this unit runs.

## Objective

`guides/agent.md` still evidences the browser relay limit with a recorded Chrome 148 reading and
states "It is not proven by a browser test project, because this package has none" (around
`:1022`). The A13 reviewer (`.orkestrel/campaign/A13-audit-reviewer.md` R3) read that the
composition it describes — a browser-side `RelayProvider` round trip through `createRelay`, and a
refused bearer arriving as a `ProviderError` with status 401 — is now gated by
`@orkestrel/ollama`'s live service suite (`tests/service/page.test.ts`, run in a real Chromium
against a live daemon; the Orchestrator's authoritative run `U13b-ollama-service-full.log.txt`).
Replace the sentence with the fact: this package publishes no browser test project; the
browser-side relay round trip and the bearer refusal are proven in `@orkestrel/ollama`'s service
suite (`tests/service/page.test.ts`) in a real Chromium against a live daemon, with the page's
requests recorded. Keep the manual reading only where it still carries a fact the suite does not.

## Context

The checkout is clean at `0b998f3`. Read the passage and its neighbours first
(`grep -n "browser test project\|Chrome 148" guides/agent.md`). The transcription in
`tests/guides.test.ts` covers fences and summaries; this passage is prose, so `npm run test:guides`
proves only that nothing else moved. Follow `.claude/rules/writing.md` (no `currently`/`now`; a
date where time matters; `must`/`can`).

## Scope

**Owned.** `guides/agent.md` (that passage and, if the same claim is repeated in `## Tests` or the
relay section, those sentences). **Off-limits.** Everything else.

## Output

Final message: the old and new sentences verbatim with `file:line`; `git diff --stat`;
`npm run test:guides` and `npm run format:check` readings; deviation state.

## Acceptance criteria

1. The passage names `@orkestrel/ollama`'s `tests/service/page.test.ts` as the proof and no longer
   says the round trip is unproven.
2. `npm run test:guides`, `npm run format:check`, `npm run lint:check` exit 0.
3. Only `guides/agent.md` changed.
