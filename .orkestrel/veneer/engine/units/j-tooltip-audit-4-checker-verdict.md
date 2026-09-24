# Checker verdict — J-TOOLTIP round 4 audit (Sonnet, agent aadff4cc2044ec5d1, retained verbatim 2026-09-24)

**Lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only — mechanical conformance.

## Numbered verdicts (claims in `j-tooltip-audit-claims-4.md`)

1. **T1 (the primitive and the predicate) — BROKEN.** `#apply`, `#holds`, `#place`→publish→`#holds` sequencing, and the enumerated bare exceptions (`Tooltip.ts:353` refused-promotion `#discard`, `Tooltip.ts:499/509/513` build release-on-stop/catch, `Tooltip.ts:358` `reflow`) all hold as described. But the claim's own enumeration of "the bare calls that remain" omits two forward dispatch calls that are neither `#apply` callbacks nor undo calls on a stop path: `Tooltip.ts:364` `emitEvent(host, TOOLTIP_EVENTS.shown, null, false)` in `show()`, and `Tooltip.ts:721` `emitEvent(host, TOOLTIP_EVENTS.hidden, null, false)` in `#conceal()`. Both fire on the success path, after `this.#change = undefined`, so wrapping them in `#apply` would trivially fail (`#holds` checks `#change === change`, and `#change` is already cleared) — by design, not defect — but the claim's literal completeness clause ("every forward…dispatch…is the anonymous callback of one `#apply`; the bare calls that remain are [enumerated list]") does not cover them. Mechanical clause fails as written.
2. **T2 (the build) — CONFIRMED.** `#build` order (content resolution with door reads, `buildTip` as one step, token/id steps, `#occupy` release-then-publish-then-fillSlot, final release step, release-on-stop and catch-release) matches `Tooltip.ts:470-524, 529-557` exactly. `j-tooltip-mutations-4.log.txt:24` confirms the `id` row `MISSED exit=0 … 0 failed of 51`, matching the reported indistinguishable finding.
3. **T3 (publication, promotion, completion) — CONFIRMED.** `show()` step order (`Tooltip.ts:316-369`) matches the claim verbatim, including the unguarded `shown` dispatch after release — the claim's own narrative ("releases the change, dispatches shown") accurately describes what claim 1's stricter enumeration misses.
4. **T4/T5 (discard, conceal, fill) — CONFIRMED.** `#discard` (`Tooltip.ts:624-637`), `#conceal` (`Tooltip.ts:690-728`), and `fill` (`Tooltip.ts:387-400`) match the described field-clear order, step order, and in-flight refusal. Same unguarded `hidden` dispatch as claim 1 notes.
5. **T6/O1 (interface and guide) — CONFIRMED.** `types.ts` diff (`j-tooltip-4.diff:1832-1952`) carries the O1 `hide` remark verbatim; the guide's `hide` row and `#### Tooltip` door paragraph match; `test:guides` is green (19) per `j-tooltip-gates-4.log.txt:99-104`.
6. **Round-3 carries — CONFIRMED.** All named rows verified directly in `j-tooltip-mutations-4.log.txt` (not the collided stdout, which is garbled and must not be read as evidence): line 26 `the origin is captured before the move and published after it` `EXACT`; line 36 `the allowlist moves href from the a element to every element` `JOINED`; line 74 `a failing descendant is not recorded` `EXACT`; line 59 `the modal ancestor is found by the default token` `EXACT`.
7. **Instrument, gates, tree repair, scope — CONFIRMED.** `j-tooltip-mutations-4.log.txt:1` digest-before hashes (`73204fe1…`, `f254f6b8…`, `ef02efcc…`) match the report's stated resumed hashes exactly; log ends `receipt: restored byte for byte` (line 105). `j-tooltip-gates-4.log.txt` shows `check:src:browser`, `check`, oxlint, oxfmt, `test:src:browser` (695), `test:guides` (19), `test:policy` (109/1 skipped) all exit 0. `Placement.ts` and `helpers.ts` diffs in `j-tooltip-4.diff` are byte-identical to `j-tooltip-3.diff` (verified in full for both files). All 13 non-owned files' diff sections have identical line spans and (spot-checked in full for `constants.ts`, `helpers.ts`, `Placement.ts`) identical content against round 3; only `guides/veneer.md`, `Tooltip.ts`, `types.ts`, `Tooltip.test.ts` differ, matching the report's owned-file claim.

## Checklist (brief's mechanical items)

| item | verdict | evidence |
|---|---|---|
| status lists only owned/round-3 files | met | `j-tooltip-4-status.txt` = 17 files, matches `j-tooltip-4.diff` and report diffstat exactly |
| `.bs.` wire outside `constants.ts` | met | `j-tooltip-gates-4.log.txt:118-190`, bs-wire-grep matches only fall in `constants.ts` and guide prose rows |
| forbidden syntax (`any`, `as` assertion, `!`, `@ts-`, `eslint-disable`, access modifiers, parameter property, default export, nested declaration) | met | grep of added diff lines returns only `as const` (permitted narrowing, unchanged from round 3) and natural-language "as"; no other hits |
| `Tooltip.ts` one class plus imports | met | `Tooltip.ts:1-46` imports, `108-848` one class |
| element guards read `isInstance(x, HTMLElement)` | met | `Tooltip.ts:175, 570, 596, 739, 766` |
| `no prove call` recorded | met | report Deviations item 7 |
| shared-file patch naming | not applicable | report returns no shared-file patch section (worktree unit, not integration) |
| substitution-table sweep (`writing.md` § Substitutions) | **not met** | `Tooltip.ts` (unchanged from round 3, still present in round 4's added-file diff) carries a causal `since`: `// binds no hooks of its own, since its events bubble to this trigger's, listens for nothing, and` — `j-tooltip-4.diff:1185` (also `j-tooltip-3.diff:1098`). `since (causal)` → `because` is an unconditionally-banned row; every other swept term (`should`, `simply`, `easy`, `just`, `utilize`, `leverage`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`, and the judged `now/new/latest/once/above/below`) returns no unpermitted-sense hit in the added lines. |

## Referrals

- Claim 1's mechanical gap (unguarded `shown`/`hidden` completion dispatches) is a literal-wording failure of the brief's own exception enumeration, not evidence the dispatch is unsafe by design — the objective lane owns whether the door semantics tolerate an unguarded completion dispatch after release.
- The `since` hit is pre-existing from round 3 (unchanged text) but sits in round 4's added-file diff; whether a round-4 audit must fix a carried-over defect in an owned file, versus deferring it, is for the Orchestrator/subjective lane to rule.

```
VERDICT: FAIL 1; outside the claims: substitution-sweep finding (Tooltip.ts causal "since")
```

## The Orchestrator's note

Claim 1's enumeration omitted the completed-event dispatches, which E18 places after the change's release by design (the completion reads the full door, releases, then dispatches); the claim's wording is corrected in the reconciled verdict, and the causal `since` in the `Tooltip.ts` comment is folded into the landing round.
