<!-- checker on Claude Sonnet, native, read-only, clean context, on the agent checkout at d84b1a2 with a3-fix-4-diff.txt (610a567..d84b1a2, units A3-fix-3 and A3-fix-4); returned 2026-09-15 after 79 s; retained verbatim from the returned message -->

Lane: mechanical (checker, Sonnet)

Already confirmed guide line 219-220 (type then value) matches factories.ts lines 191-192 (type then value) — byte-equal reorder confirmed earlier in the read outputs. All claims verified.

VERDICT: PASS

Per-claim verdicts:

1. CONFIRMED — guides/agent.md has no fence placing a value import before `import type` (full scan lines 24–1391, e.g. `guides/agent.md:24-25`, `:534-535`, `:1101-1105`); the titled twin at `src/core/factories.ts:191-192` reorders `createConversation`'s example identically.
2. CONFIRMED — `guides/agent.md:1014` reads "the excerpt is decoded from at most `MAX_ERROR_BODY_LENGTH` source bytes … the read may have pulled one whole source chunk … A multibyte character cut at that bound decodes to a replacement character, so the excerpt's own encoded length can exceed the bound by that character." Neither `src/core/helpers.ts` nor `src/core/AgentProvider.ts` makes the superseded promise (confirmed absent by grep), so no edit was owed there.
3. CONFIRMED — `guides/agent.md:1035` declares `const messages = [{ id: '1', role: 'user', content: 'Say hello.' }] as const` in "Bounding any provider call" (heading `guides/agent.md:1024`); that fence has no titled source `@example` twin.
4. CONFIRMED — `src/core/constants.ts:130` reads "the `authorize` callback returns"; `guides/agent.md:1127` reads "The `serve` function is the entry."
5. CONFIRMED — `guides/agent.md:1101-1125` imports `@orkestrel/server`, constructs `createServer({ dispatcher, state: () => undefined })`, awaits `start`, and registers `stop` on `SIGTERM`; `src/core/factories.ts:80-104` (`createRelay`'s titled `@example`) is byte-equal. `tests/guides.test.ts:473-476` and `guides/agent.md:1097` both state the `createServer` start-up is not executed. `tests/guides.test.ts:572-581`'s presence guards all quote lines still present verbatim.
6. CONFIRMED — the diff touches exactly `guides/agent.md`, `src/core/constants.ts`, `src/core/factories.ts`, `tests/guides.test.ts`, each within the owning brief's Owned scope; no `any`, no type-assertion `as` on real code (the one `as const` hit is inside a documentation fence's sample), no suppression, no count of a growable set in the touched prose.
7. CONFIRMED — `a3-fix-3-gates.log.txt` and `a3-fix-4-gates.log.txt` both show `format:check`, `lint:check`, `check`, `test:src:core` (753), `test:setup` (54), `test:guides` (43), and `build`, each `exit=0`.

Findings outside the claims: none.
