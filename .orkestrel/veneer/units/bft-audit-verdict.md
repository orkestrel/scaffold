# B-FORMS-CLOSE-TABLES (`bft`) — audit verdict, round 1

Claims: `bft-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (session
`01a0cd6a-de00-7e81-a243-23e25a14c36d`, `bft-audit-analyst-verdict.md`), `reviewer` on Opus 5.5
(`bft-audit-reviewer-verdict.md`), `checker` on Sonnet (`bft-audit-checker-verdict.md`). Every lane
ran on the one claims file, blind.

## Reconciliation

| Claim | analyst | reviewer | checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED | CONFIRMED (the fixture was inert only on the shipped tree; retiring it makes the mixin mutation observable) | CONFIRMED | holds |
| 3 | CONFIRMED (in-memory probe: the swap reddens) | CONFIRMED | — | holds |
| 4 | CONFIRMED (no block exercises the exclusion at `d02bd46`) | CONFIRMED, referral b | — | holds as implemented; the exclusion is pinned by a planted case in round 2 (referral b) |
| 5 | CONFIRMED | CONFIRMED, findings F1 and F2 | no duplicate export | holds; F1 and F2 carried to round 2 |
| 6 | CONFIRMED | CONFIRMED | — | holds |
| 7 | BROKEN (count at `setupServer.test.ts` around line 2051; `condition` at `setupStyles.ts` around line 3622; `var()` at 3599; the case title at 4942) | BROKEN (a–e) | UNRESOLVED on `var()`, referred | BROKEN on the count, the `condition` field token, the `findRule` helper token, the `{@link readCascadeBlocks}` helper token, and the input-group comment's first-read fault; the `var()` and case-title items are dropped under the standing ruling that a CSS function token is its own noun and a test title in backticks is quoted data |
| 8 | BROKEN (two noun phrases) | BROKEN (a false reason, several ideas in one sentence, "rows" without an antecedent, "a corner" for a declaration writing four) | — | BROKEN; the reviewer's paragraph is the text the Orchestrator lands, with the analyst's noun phrase "the value that the `--bs-border-radius` custom property resolves to" |
| 9 | CONFIRMED (`npm run check` exit 0) | UNRESOLVED (runs nothing) | CONFIRMED (reading parts) | holds |

Outside the claims: F1 (the helper's summary and `@returns` say "rule by rule" and "one entry per
rule", false: one block per selector, blocks sharing a key merge) and F2 (the rule key format
rebuilt at every caller; centralize as `renderRuleKey` in `tests/setupServer.ts`) — both carried to
round 2, the floating case's sites excepted (`bfl`, R6). Referral c: the input-group inventory
records no conditioned rule (`python3` over `tests/fixtures/oracle/inventory.json`, `input-group`
key, at `d02bd46`: the conditioned list is empty), so the selector-alone lookup hides no row; the
whitespace-tolerant `collectValueNames` pattern widens no reading the equality would miss.

## Round 2

A fix round on `opus` in the same worktree: `b-forms-close-tables-brief-2.md`. Its audit runs
`analyst` on Astra and `reviewer` on Opus (blind) with `checker`; the writer's engine is Opus, so
the Astra lane is the auditor that did not write it.

VERDICT: FAIL 7, 8; outside the claims: F1, F2
