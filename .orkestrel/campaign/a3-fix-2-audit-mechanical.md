<!-- checker on Claude Sonnet, native, read-only, clean context, on the worktree agent-audit at 610a567 with a3-fix-2-diff.txt; returned 2026-09-14 after 250 s; retained verbatim from the returned message -->

Lane: mechanical (checker, Sonnet)

**Claim 2 (D4, D12, D13 — constant descriptions and values).** CONFIRMED.
`src/core/constants.ts` (diff lines 292-358) and `guides/agent.md` table cells (diff lines 111-119) carry byte-identical Summary paragraphs for `DEFAULT_PROVIDER_TIMEOUT` (`120_000`), `MAX_ERROR_BODY_LENGTH` (`2048`), `DEFAULT_RELAY_LIMIT` (`1_048_576`), `RELAY_CONTENT_TYPE`, `RELAY_PROVIDER_MESSAGE`, `UNAUTHORIZED_RELAY_STATUS` (`401`), `INVALID_RELAY_STATUS` (`400`), `OVERSIZED_RELAY_STATUS` (`413`, "at or above its byte budget" — diff line 355), and `UPSTREAM_RELAY_STATUS` (`502`). The four status constants each open "Names the status …" (diff lines 331-343, 346-350, 354-358, `guides/agent.md` lines 116-119). `test:guides` is green: `a3-fix-2-gates.log.txt:66-70` — 1 file / 43 tests passed, exit 0.

**Claim 4 (D8, D17).** CONFIRMED.
`README.md` diff lines 9-14: "or `createRelayProvider` and `createRelay` to reach" → "compose the `createRelayProvider` and `createRelay` functions to reach." `guides/README.md` diff lines 26-41: the concept cell now reads `` `Agent`, `AgentProvider`, `RelayProvider`, `RelayStream` ``, and "One guide covers them because they share…" → "The `agent.md` guide covers them together because they sit in the same module directory under the same contract," dropping the growable-set count "One guide."

**Claim 6 (D11, D14-D16).** CONFIRMED.
- D11: `guides/agent.md:404` (diff lines 74-75) — "`AgentProviderInterface` carries the Surface row" is gone; replaced by "`AgentProvider` is `abstract`; the members a subclass fills are listed under [`## Methods`]."
- D14: `guides/agent.md:387-390` (diff lines 61-63) declares `token`, `abort` (from `createAbort()`), and `messages`.
- D15: `guides/agent.md:1121` region (diff line 179) — "the Chromium receipt this campaign records" replaced by "a recorded Chrome 148 run of the built core entry …". No "campaign" citation remains.
- D16: `guides/agent.md:542-546` (diff lines 139-147) — the wire-contract fence now runs `upstream.generate`, projects through `relayFrameContract.parse`, and writes the frame; it no longer discards `upstream.stream(...)`'s return value.

**Claim 7 (no regression).** CONFIRMED.
`a3-fix-2-gates.log.txt:38-39` — `test:src:core` 23 files / 753 tests, exit 0. `:66-70` — `test:guides` 43 tests all green, exit 0. Every touched fence declares or imports every identifier it uses — verified by direct read. `grep -c "@src/"` over `guides/agent.md` returns no matches.

**Claim 8 (law and scope).** CONFIRMED.
Union of `a3-fix-2-brief.md` § Scope and `a2-fix-r3-brief.md` § Scope covers every touched file. No file outside either brief's owned list appears in the diff. A case-insensitive sweep of the substitution terms over the diff's added prose lines returned only code-syntax `new` inside fences — no prose hit.

**Claim 11 (P2-P4).** BROKEN on the import-order sub-claim; the rest held.
- Fixture placement CONFIRMED: `tests/setup.ts:1283-1284` — `RELAY_RESULT_FRAME` with a one-sentence doc block; the test file's local declaration is removed and the name is imported from `../../../setup.js`.
- Byte-equal fences CONFIRMED: `src/core/factories.ts:80-100` and `:141-160` match `guides/agent.md:1101-1119` and `:1126-1142` verbatim (comment-marker differences only).
- No "the two" phrase CONFIRMED.
- **Import order BROKEN.** Three fences in `guides/agent.md` place a value import before `import type` at `610a567`: `:534-535` (the wire-contract fence D16 touched, without reordering its imports), `:1170-1171`, and `:1208-1209` (the "Observing an agent" fence). Finding F9: `a2-fix-r3-brief.md:51-54` (item P3) scopes this requirement narrower than "every fence"; whether the three sites fall inside that obligation is the Orchestrator's ruling.

**Claims 1, 3, 5, 9, 10.** UNRESOLVED — analyst's row.

**Findings outside the claims:** F9 above (recorded under claim 11).

VERDICT: FAIL 11; outside the claims: F9
