# foundation-audit-2 — round verdict (2026-09-30)

Subject: the integrated foundation of `@orkestrel/veneer` after units `foundation-fix-1` through `-10` and the roadmap rewrite, at the tree whose tree-wide gate run `tmp/gates-final.log` records exit 0 for format, lint, check, build, and test. Claims: `tmp/units/foundation-audit-2-claims.md` (14 claims). Lanes, blind, same claims file, clean contexts:

| Lane | Role | Engine | Transport | Report |
| --- | --- | --- | --- | --- |
| objective | `analyst` | GPT-6 Astra (`gpt-6-astra`, effort high) | `codex exec` from `tmp/codex/foundation-audit-2-analyst-brief.md`, session `01a0f450-4d31-7f83-a017-f033477ba23d` | `veneer/tmp/units/foundation-audit-2-analyst-verdict.md`, copied to `tmp/codex/foundation-audit-2-analyst-last.md` |
| subjective | `reviewer` | Claude Opus 5.5 | native Agent dispatch, `model: opus`, 680 s | `tmp/units/foundation-audit-2-reviewer-verdict.md` |

Neither lane edited a tracked file (`git status --porcelain` identical before and after; `tmp/probes/` empty after both returned).

## Per-claim rulings

| Claim | Analyst | Reviewer | Ruling | Reproduction and bound |
| --- | --- | --- | --- | --- |
| 1 order statement | CONFIRMED | CONFIRMED | **CONFIRMED** | Both attacked the statement and the ownership predicates with planted mutations. |
| 2 the two forms | BROKEN | CONFIRMED | **BROKEN, bounded** | The analyst's mutation (an unused mixin carrying `@layer foreign` in `_tokens.scss`) survives because the guard exempts the whole tokens file; the reviewer attacked the mixins and the compile, which held. Fix: exempt only the order statement (fix-11 item 13). |
| 3 link 2 and the instrument | CONFIRMED | BROKEN | **BROKEN, bounded** | Orchestrator read the fixture: the `.last` rule spans three lines, so `fixture.replace('.last { opacity: 0.5; }', '')` matches nothing and the "moved rule" control prepends a duplicate instead of moving. The analyst confirmed the other controls with its own probe. Fix: fix-11 item 1. |
| 4 registry | CONFIRMED | CONFIRMED | **CONFIRMED** | Both ran the controls. |
| 5 theme packs | CONFIRMED | UNRESOLVED | **CONFIRMED** | The analyst resolved both subpaths in Node and rebuilt both sheets; the reviewer's open point was that resolution. |
| 6 composition | CONFIRMED | CONFIRMED | **CONFIRMED** | The analyst's `properties` witness read 9px with `properties` first and 1px with a separately linked Veneer prelude first, which is the guide's placement rule. |
| 7 projects and collection | BROKEN | CONFIRMED | **CLAIM ERROR, no tree change** | The claim's universal ("the Node projects keep threads with isolation off") was wrong: only `setup`, `conformance`, and `src:vue` do, and `ROADMAP.md` § Configs names only `setup` and `conformance`. The reviewer's census-control note is accepted (fix-11 item 19). |
| 8 showcase | CONFIRMED | BROKEN | **BROKEN, bounded** | The pages are right: the Orchestrator and the analyst each recomputed both stamps and rebuilt both pages byte for byte. The unit test compares `computeStamp` against itself, so a hash-algorithm change would pass. Fix: known vectors (fix-11 item 2). |
| 9 journeys | CONFIRMED | CONFIRMED | **CONFIRMED** | The analyst replaced each application entry with an empty module and both journeys failed. |
| 10 guide | BROKEN | BROKEN | **BROKEN** | Reviewer: stale proof pointers after fix-10 and "nothing else" against sheets that carry empty layer blocks (Orchestrator read `dist/src/bootstrap/index.css`). Analyst: the source-order row lacks the specificity qualification (measured counterexample). Fix: fix-11 items 3 and 14. |
| 11 roadmap | BROKEN | BROKEN | **BROKEN** | Reviewer: "a proof guards the disjointness" names no proof; the repair list omits two files. Analyst: the mixins sentence contradicts the tokens statement. Fix: fix-11 items 4 and 15. |
| 12 gates | CONFIRMED | UNRESOLVED | **CONFIRMED** | The probes the reviewer saw were the analyst's in flight; the directory is empty now. |
| 13 vendored divergence | BROKEN | BROKEN | **BROKEN** | `scaffold audit --offline --json` names eight content-owned stale files; the roadmap named six and omitted `configs/src/vite.core.config.ts` and `configs/app/vite.showcase.config.ts`. Fix: fix-11 item 16. |
| 14 ship | BROKEN | BROKEN | **BROKEN until fix-11 lands** | Both name the same closure: the items of this table plus O1 and the reviewer's outside findings. |

## Outside findings

| Id | Lane | Finding | Ruling |
| --- | --- | --- | --- |
| O1 | analyst (reviewer referred it) | `targetBrowser` and the specifier classifier omit `app/vue/` and `@app/vue`, so `@app/vue` resolves from `app/core` under a real `appCore()` server. | **Accepted**; the completion of round-1 finding O1, which `foundation-fix-1` closed for `src/vue` only. fix-11 items 12 and 17. |
| F1 | reviewer | `compileLayered` compiles any Sass entry, layered or not. | **Accepted**; rename `compileSass` (item 6). |
| F2 | reviewer | Four setup exports have no consumer since the faces read `?raw`. | **Accepted** (item 7). |
| F3 | reviewer | The order-line array and statement are duplicated across five proofs and the conformance file. | **Accepted**; `LAYER_ORDER` in `tests/setup.ts` (item 8). |
| F4 | reviewer | The benchmark comment and `isolate: false` repeat in three wrappers; the `optimizeDeps` comment narrates a run. | **Accepted** (item 9). |
| F5 | reviewer | A published doc block describes future work. | **Accepted** (item 10). |
| F6 | reviewer | The empty default pack carries a narrative comment. | **Accepted**; the TODO form (item 11). |
| — | reviewer (referred) | Every built sheet ends with Vite's `/*$vite$:1*/` marker. | **Carried to the cascade chunk**: the round trip drops it from every equality, and stripping it from the shipped sheet is a build decision for the chunk that first ships rules. |
| — | analyst (held) | A second `roundTrip` pass strips a leading space from the banner's star-prefixed lines. | **Accepted as a limit**; item 18 pins the single pass. |

## Which engine was right on what

- Analyst: the guard exemption hole; the specificity qualification; the divergence inventory from the scaffold audit; O1's second classifier; the single-pass limit.
- Reviewer: the moved-rule control; the self-referential stamp case; the stale guide pointers; the wording against empty layer blocks; the roadmap's unnamed disjointness proof; F1 through F6.
- Both: the two omitted vendored files; the ship ruling.

## What the round decides

The foundation is **accepted conditionally on `foundation-fix-11`** (`tmp/units/foundation-fix-11-brief.md`), which adopts every prescription verbatim; the fix closes with a mutation probe on the two instruments it changes (the moved-rule control and the tokens guard) rather than a third round, per the falsify skill. The claim set is bounded at this brief; a successor round opens only with the first chunk's added claims.
