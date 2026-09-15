<!-- checker on Claude Sonnet, native, read-only, clean context, on the worktree agent-audit at c052711 with a3-diff.txt; returned 2026-09-14 after 129 s; retained verbatim from the returned message. Orchestrator's note: the log the checker read for claim 1 (a3-gates.log.txt) was taken at 8dbe522 before A3-fix; the authoritative reading at c052711 is a3-fix-gates.log.txt. -->

Lane: mechanical (checker, Sonnet)

**Claim 1 — `npm run test:guides` exits 0 at `c052711`.** BROKEN. `a3-gates.log.txt:58-98` records the gate at `c052711`: `=== npm run test:guides` … `=== exit=1`, with `FAIL guides tests/guides.test.ts > Agent, AgentProvider, RelayProvider, RelayStream > imports only real exports in every ```ts fence`, `"guides/agent.md imports missing AgentProvider from @orkestrel/agent."` (log lines 68-80). Independent of any self-report: this is the retained host gate log, not a report quotation. The other sub-claims of claim 1 (Surface rows, Summary equality, Methods parity, README pitch = tagline) hold — the same log shows the `documents every barrel export`, `keeps behavioral interfaces …`, and `keeps every compared summary …` tests passing (only the import-fence test fails) — but the claim as stated ("exits 0 … and") is a conjunction, and one conjunct is false, so BROKEN.

**Claim 2 — Methods tables for `AgentProviderInterface`/`ProviderParserInterface`, and every pre-A3-named gap closed.** CONFIRMED. `guides/agent.md:729-740` (`AgentProviderInterface`: `generate`, `stream`, `frame`, `body`, `read`, `finish`); `:742-749` (`ProviderParserInterface`: `parse`, `clear`). The pre-A3 log `a3-guides-before.log.txt:79-91` names `AgentProviderInterface`, `ProviderParserInterface`, and `RelayProvider` as lacking tables; `agent.md:751-760` supplies `RelayProvider`'s table (`frame`, `body`, `read`, `finish`).

**Claim 3.** UNRESOLVED — analyst's row.

**Claim 4.** UNRESOLVED — analyst's row (note claim 1's own evidence shows the import-fence assertion currently fails for `AgentProvider`, which the objective lane should reconcile against this claim).

**Claim 5.** UNRESOLVED — analyst's row.

**Claim 6 — README pitch = guide tagline; concept index names the new classes.** CONFIRMED. README pitch at `README.md:3-8` is byte-identical to the guide tagline at `guides/agent.md:3-7`. Concept index at `guides/README.md:9`: `"Agent, AgentProvider, RelayProvider, RelayStream"` names the new classes beside `Agent`.

**Claim 7 — touched prose carries no banned term/count, addresses the reader as `you`, writes `must`/`can`/`might`, code tokens followed by a noun.** CONFIRMED, by sweep and manual read. A regex sweep of `a3-diff.txt` for the `.claude/rules/writing.md` § Substitutions terms found no hits in added prose; the only `new` hits are the pattern-title sense "a new wire" naming an unsupported backend, not the temporal sense the rule bans. Digit hits in added lines are byte limits, HTTP status codes, and test-fixture literals, not counts of a growable set. `you` appears addressing the developer; `must` is used correctly; code tokens are consistently followed by a noun.

**Claim 8 — `npm run test:src:core` reports the pre-A3 count; no source behaviour changed; every TSDoc description edit is named.** CONFIRMED. `a3-gates.log.txt:30-43`: `Test Files 23 passed (23)`, `Tests 751 passed (751)`. The only `src/core/**` diff hunks are the two `@example` title lines (`AgentProvider.ts`, `factories.ts`); no code or TSDoc description-paragraph edits are present.

**Claim 9 — scope: diff touches only A3-owned files.** CONFIRMED. `a3-diff.txt` headers list exactly `README.md`, `guides/README.md`, `guides/agent.md`, `src/core/AgentProvider.ts`, `src/core/factories.ts`, `tests/guides.test.ts`; `tests/setup.ts` was not touched (the report states none was needed, corroborated by the diff).

**Claim 10.** UNRESOLVED — reviewer's row.

Findings outside the claims: none identified within the mechanical rows examined.

VERDICT: FAIL 1; outside the claims: none
