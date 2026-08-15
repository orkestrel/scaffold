# H3 audit round 1 — the run catalog

Subject: commit c0ab2fe (baseline 086573c), Sol implementer over the bench (journal
`tmp/codex/h3.jsonl`, session `01a00314-f2d8-7550-8372-986322393d10`, one deviation stop
resolved by grant), one round. Sixteen files: `src/core` types/constants/factories/helpers/
parsers(new)/validators/barrel, both store implementations, the two granted fixture
conformances, and the mirrored tests including the shared catalog specification. Decides
whether H4 builds the `GET /history` endpoint on this contract.

Established (Orchestrator-verified, not this audit's subject):
- Bench gates green (format/lint/check; `test:src:core` 174; catalog integration 22). The bench
  run's 20 provider-suite reds were a sandbox artifact (fixture CLIs cannot spawn there): the
  Orchestrator's native `npm run test:src` is **241/241 green** (`tmp/redesign/h3-verify.log`).
- Guides-parity delta enumerated exactly (11 names on the export failure + 3 new missing-`list`
  rows) — U7's carrier; not a finding.
- `app/server/LiveBroker.ts` and `app/server/types.ts` untouched and compiling.

Evidence: diff `tmp/redesign/h3.diff` (git show c0ab2fe, 1245 lines); the unit's report
`tmp/redesign/h3-report.md`; the briefs `h3-brief.md` + successors; the History design
`tmp/redesign/history-analyst.md` §1 and the History section of
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`; the tree at c0ab2fe.

Claims (falsify shape; CONFIRMED names the failed attack; one terminal line; no diary):

1. **The traversal law holds under attack.** Descending `(updated, id)` with a fixed inclusive
   `until` watermark and exclusive continuation boundary: attack ties at the boundary (equal
   `updated` across pages), records updated ABOVE the watermark mid-traversal (must stay
   invisible), records updated BELOW the boundary mid-traversal, a record released
   mid-traversal, and the final-page cursor-absence rule. No duplicate, no skip, no shifted row
   in any interleaving the store's serialization permits.
2. **The catalog rides the store's transactions exactly as designed.** First acquire creates;
   takeover preserves `created`, clears `released`, advances `updated`; `set` advances in the
   SAME transaction as the unit write (attack the SQLite path's transaction boundaries against
   the shared Lane); `renew` never advances; `release` stamps both instants. The trigger-forced
   rollback proof genuinely binds the two writes to one fate rather than observing a
   coincidence.
3. **The filters compose without importing policy.** `prefix` (case-sensitive), `runs`
   (candidate restriction), `released: true`, and `limit` compose with each other and with
   cursors; invalid limits/cursors fail as `STORE` through the validators; the memory and
   database stores return identical pages over the whole matrix (attack an edge where map
   iteration and SQL ordering could diverge — collation, empty-string ids, prefix at the
   boundary).
4. **The contract is placed and shaped per the rules.** Types in `types.ts` with readonly
   properties and watermark TSDoc; helpers/validators/parsers/constants in their centralized
   homes; `parsers.ts` newly created is justified by the rules' placement (not a wrapper);
   the barrel exports the intentional surface; single-word members; no `any`/`as`/`!`/
   suppressions; frozen owned returns.
5. **The granted conformances keep their fixtures honest.** `RecordingSupervisorStore` records
   `list` and preserves real semantics; `ProjectionStore` answers from what it holds; neither
   fakes behavior nor weakens what its suite proved before; the app projects still compile and
   the app test suites are untouched elsewhere.

Lane split: the analyst (Sol, bench — the writer's engine; primary round, the reviewer keeps it
two-engined) takes 1-5 objectively. The reviewer (Opus) takes 4-5 plus the contract's design
fit: the four type names and their field vocabulary against the house naming laws, the TSDoc
voice, whether `list`'s option surface is minimal or speculative, and the new `parsers.ts`
home's justification. Read-only lanes; evidence supplied above.
