# J-BINDER-PRECEDENCE audit round 3 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 21 tool uses, 111 s; retained verbatim from the subagent's return text; the Orchestrator's note follows)

**checker on Sonnet, native Claude subagent, Read/Grep/Glob only, mechanical conformance only.**

## Claim verdicts

**Claim 1** (mechanical clauses only) — CONFIRMED.
- Precedence sentence verbatim at all four sites: `src/browser/HostSnapshot.ts:20` (class remark), `src/browser/HostSnapshot.ts:215` (`#publish` comment), `src/browser/types.ts:295` (`HostSnapshotInterface.restore` remark), `guides/veneer.md:559` — all read "Where two restorations overlap on a target neither has yet written back, the restoration holding..." (independent grep on the worktree, not the report).
- `saved that target first` absent from the tree: independent grep on `veneer-precedence` returned no matches.
- Retitled overlap proof present verbatim: `tests/src/browser/HostSnapshot.test.ts:308` — `'restores an overlapping target neither restoration has written back from its earliest recording, whichever restoration starts first'`.

**Claim 2** (mechanical clause: case titles present) — CONFIRMED.
- `HostSnapshot.test.ts:407` `'writes its own recorded value when another restoration has already written the target back'`
- `HostSnapshot.test.ts:441` `'leaves an empty class attribute when a later restoration starts after a button judged removal'`
- `HostSnapshot.test.ts:473` `'leaves an empty class attribute when a later token write empties the list after removal was judged'`

**Claim 3** (mechanical clause: case titles present) — CONFIRMED.
- `HostSnapshot.test.ts:506` `'hands pending style presence to a property saved inside a restoration property write'`
- `HostSnapshot.test.ts:535` `'preserves the order of a taken class presence recording when it competes in an overlap'`
- `HostSnapshot.test.ts:569` `'preserves the order of a taken style presence recording when it competes in an overlap'`

**Claim 4** (mechanical clause: `readTag`'s guard and `@returns`) — CONFIRMED.
- `src/browser/helpers.ts:280` `@returns The element's string tag name, or undefined when the value is not an element, its tag name is not a string, or reading it throws.`
- `src/browser/helpers.ts:289-296` — `try`/`instanceof Element`/`typeof tag === 'string'`/`catch { return undefined }` guard present verbatim.

**Claim 5** — CONFIRMED.
- `emitEvent` example passes `null`: `src/browser/helpers.ts:18` `if (!emitEvent(host, 'show.vn.collapse', null, true)) return false` (independent grep, matches the cumulative diff).
- Format check on `guides/veneer.md` exit 0, independent Orchestrator run: `j-binder-precedence-gates-3.log.txt:18-23`.

**Claim 6** — CONFIRMED.
- Status lists exactly the eight owned files, matching the diff's file list one-for-one: `j-binder-precedence-3-status.txt:1-8` vs `j-binder-precedence-3.diff` headers.
- Gate commands pass in the Orchestrator's own independent run (not the report's self-quote): `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser` 151/151, `test:guides` 19/19, `test:policy` 109 passed/1 skipped, `build:src:browser exit=0`, tree-wide `check exit=0` — `j-binder-precedence-gates-3.log.txt:13,16,23,31-36,44-45,57-58,62,75,99`.
- Criterion-5 greps read as the brief fixes: `old-sentence-grep exit=1 (pass)`, `bounded-sentence-grep exit=0` with the four sites, `undefined-detail-grep exit=1 (pass)` — `j-binder-precedence-gates-3.log.txt:76-83`.
- Orchestrator's own mutation replay (independent instrument, not the report) reproduces the styled-take, both presence-stamp mutations, and `readTag`'s guard mutation, with "every source restored byte for byte" and the post-run status matching the eight owned files: `j-binder-precedence-mutations-orchestrator.log.txt:1-59`. Note: this retained file is named without the round marker the claims file cites (`-3-`); see referral.
- No alias, re-export, `@deprecated`, fallback, wrapper, or dead code added — confirmed by full diff read (`j-binder-precedence-3.diff`); no such construct appears.
- No `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, or parameter property in added lines — grep over `HostSnapshot.ts` and `helpers.ts` returned only boolean-negation `!present`/`!classed` uses, no matches for the banned forms.
- Report names its thread id, journal path, and the refused `prove` call: `j-binder-precedence-report-3.md:3` (`Thread 01a0d0d7-4881-7520-82e3-ec46ff56de3e; journal C:/.../tmp/codex/j-binder-precedence-3.jsonl`) and `:174` (`The prove tool refused the attempted Q4 proof with: "MCP tool call requires approval, but approval policy is never". It issued no receipt.`).

## Checklist of mechanical items

| Item | Met | Evidence |
|---|---|---|
| Diff touches only the eight owned files | met | `j-binder-precedence-3-status.txt:1-8` matches diff's file headers exactly |
| `emitEvent` example passes `null` | met | `src/browser/helpers.ts:18` |
| No `any`/`as`/non-null `!`/`@ts-`/`eslint-disable`/`public`/`protected`/`private`/parameter property/default export/nested function declaration outside an anonymous callback in added lines | met | grep over `HostSnapshot.ts` and `helpers.ts`; no default export in `src/browser` |
| Guide ownership paragraph wraps to the guide's width | met | `j-binder-precedence-gates-3.log.txt:18-23` (`oxfmt --check ... guides/veneer.md` exit 0) |
| No `writing.md` § Substitutions-banned term in added prose | met | pattern sweep over `j-binder-precedence-3.diff`, no matches |
| Report names thread id, journal path, and refused `prove` call | met | `j-binder-precedence-report-3.md:3,174` |

## Referrals

- The claims file (`j-binder-precedence-audit-claims-3.md:3`) names the Orchestrator's replay artifact as `j-binder-precedence-mutations-3-orchestrator.log.txt`; the retained file on disk is `j-binder-precedence-mutations-orchestrator.log.txt` (no round marker), alongside `j-binder-precedence-mutations.json` rather than a `-3-` variant. Its content (worktree ref `1395361`, the eight-file post-status, the mutation set matching Q3/Q4) matches the round-3/4 subject, so this reads as a retention-naming slip rather than a wrong artifact. Send this naming discrepancy to the Orchestrator to confirm and, if needed, rename for future audits.
- Round-1 verdict artifacts (`j-binder-precedence-audit-verdict.md`, the objective/subjective lane verdicts) that the claims file says "every ruling this round carries" are outside this checker's mechanical remit; whether those inherited rulings still hold against round 3's rewritten sentences is a judgment question for the subjective/objective lanes, not this checker.

VERDICT: FAIL none; outside the claims: none

---

The Orchestrator's note: the replay the checker read is the round-1 replay (its rows are round 1's: the stamp ignored, the taken stamp discarded, the style presence read, the resolver guard, `readTag` always undefined); the round-3 replay over the round-3 rows (`j-binder-precedence-mutations-3-orchestrator.log.txt`) runs after the lanes return, as the claims file states, and is the one claim 6 names.
