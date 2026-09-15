<!-- checker on Claude Sonnet, native, read-only, clean context, on the worktree ollama-audit at f994872 with o6-diff.txt; returned 2026-09-15 after 158 s; retained verbatim from the returned message -->

Lane: mechanical (checker, Sonnet)

This confirms the "Mounting the relay on your server" and "Reaching the relay from the browser" headings exist under this section (already verified from the heading grep). Verdict complete.

**1. M1 — mirror digest/symbols/pointers.** CONFIRMED. `guides/agent.md` in the worktree carries `AgentProvider` (4), `AgentProviderInterface` (4 substring hits), `ProviderOptions` (5), `ProviderError` (14), `RelayProvider` (19), `createRelay` (14). `guides/ollama.md` makes no fragment-anchored pointer into `agent.md` (only whole-file `[agent.md](agent.md)` links, e.g. `guides/ollama.md:86,90,94,121,236,258`), so every pointer resolves trivially to the mirrored file, which carries the headings `#### Mounting the relay on your server` (`agent.md:1099`) and `#### Reaching the relay from the browser` (`agent.md:1129`) the prose references. Byte-identity itself rests on `o6-mirror-receipt-2.md:6-9` (source digest = mirror digest after copy, agent HEAD `d84b1a2`); a read-only checker has no hash tool to recompute that digest independently, so that one sub-fact stays receipt-sourced rather than reproduced here.

**3. M3/M6 — counts and possessives.** CONFIRMED. `grep -n "one entry|two content spans|one reasoning span"` finds no hits in `guides/ollama.md` or `tests/guides.test.ts`; the only surviving "one X, one Y" phrase is `guides/ollama.md:131` ("one prompt, one assembled result"), a fixed pair, not a growable set. Both reviewer-cited possessive sites read "the `AgentContext` build cascade" verbatim: `guides/ollama.md:121` (clause 11) and `guides/ollama.md:285` (§ Context framing).

**5. M7 — receipt sentence vs. `b2-receipt.md`.** CONFIRMED. `guides/ollama.md:123` states "On 2026-09-14 in Chrome 148 the built `@orkestrel/ollama` core entry and its whole `@orkestrel` import closure loaded as ES modules with no console error," a settled answer with usage counts, a mid-stream cancel returning `ProviderAbortError` with its partial, and a relay 401 refusal. This matches `b2-receipt.md:1,7-8,20-28`. No campaign or unopenable file is cited.

**6. M8–M13.** CONFIRMED.
- `tests/setup.test.ts` bullet (`guides/ollama.md:354`) names features the file actually exercises — a superset of the file's own header comment, but every named item is present in the file's actual imports.
- `tests/setupServer.test.ts` bullet (`guides/ollama.md:355`) matches its header verbatim in substance: real loopback sockets scoped to the proxy and relay server, in-memory transport fixtures, `WEATHER_TOOL` and the insatiable tool's chunk line named.
- `guides/ollama.md:86` states the `ProviderOptions` sentence with `timeout`, `fetch`, `headers`, `format`, and the `agent.md` link.
- Relay browser fence (`guides/ollama.md:246-247`) and routing fence (`guides/ollama.md:276-277`) both declare `messages` and `abort`.
- Clause 3's `tool_calls` condition (`guides/ollama.md:113`) reads "with `tool_calls` added only on a turn that replays them," naming no role.
- Clause 2 (`guides/ollama.md:112`) splits the import list from a second sentence stating provider errors and `ToolDefinition` are owned elsewhere and reached through the base.

**7. M14 — README guard.** CONFIRMED. `README.md:61-62` carries no `// true`; `tests/guides.test.ts:252-262` asserts both the guide's and the README's value-comment lines side by side.

**8. No regression.** CONFIRMED. `o6-gates.log.txt` shows `format:check`, `lint:check`, `check`, `build` all `exit=0`; `test:src:core` 4 files/99 tests exit 0; `test:setup` 3 files/96 tests exit 0; `test:guides` 1 file/33 tests exit 0 (up from the baseline 32, the expected M2 addition). `grep "@src/"` over `guides/ollama.md` and `README.md` finds no alias import.

**9. Law and scope.** CONFIRMED. `o6-diff.txt` lists exactly `README.md`, `guides/README.md`, `guides/agent.md` (the Orchestrator's mirror refresh), `guides/ollama.md`, `tests/guides.test.ts` — matching the brief's Owned set plus the mirror. A case-insensitive sweep of the substitution-table terms over `guides/ollama.md` and `README.md` found no hit.

**2, 4, 10.** UNRESOLVED — analyst's row.

Findings outside the claims: none found within the mechanical rows audited.

VERDICT: PASS
