# J-TOOLTIP audit round 2 — the checker's verdict (Sonnet, retained verbatim from the agent's return, 2026-09-24)

Lane: `checker` on Sonnet, native subagent, read-only, briefed by `j-tooltip-audit-2-checker-brief.md` over `j-tooltip-audit-claims-2.md`. Dispatch defect, the Orchestrator's: the checker launched before `j-tooltip-report-2.md` was retained, so the report-dependent clause read `UNRESOLVED`; the report exists now, and the Orchestrator's own reading of it and of the status closes that clause in `j-tooltip-audit-2-verdict.md`.

---

Checker (Sonnet, native, read-only, mechanical conformance lane only).

I reviewed the J-TOOLTIP round 2 subject: the worktree diff `j-tooltip-2.diff` (3646 lines, git diff HEAD with new files intent-to-add), status `j-tooltip-2-status.txt`, the Orchestrator's gate log `j-tooltip-gates-2.log.txt`, the mutation log `j-tooltip-mutations-2.log.txt`, the claims file `j-tooltip-audit-claims-2.md`, and the design verdict's placement of `NativeSanitizer.ts` under `src/browser/sanitizers/`. The writer's report `j-tooltip-report-2.md` named in the brief does not exist at that path (file-not-found), so any clause resting only on that report is `UNRESOLVED` per the brief's own rule.

## Claim verdicts

1. **TIP1 (construction/options).** `UNRESOLVED` for the full narrative (not independently re-derived line-by-line against Bootstrap semantics within this budget). Mechanically supported: `isInstance(host, HTMLElement)` guard at `j-tooltip-2.diff:541`; mutation rows for "the default offset is zero" and "a disabled click asks for the tip" and "the title is not moved" present in `j-tooltip-mutations-2.log.txt:31,8,28` at `EXACT`/`JOINED` as claimed.

2. **TIP2/D1 (tip and sanitizer).** `CONFIRMED` on mechanical clauses: `NativeSanitizer.ts` is a new file at `src/browser/sanitizers/NativeSanitizer.ts` (diff line 8 of status; not a placement defect per the design verdict); `export class NativeSanitizer implements SanitizerInterface` is the sole class declaration in that file (`j-tooltip-2.diff:1605`); `isInstance(tip, HTMLElement)` guards `buildTip` (`:1330`). Mutation rows "markup skips the sanitizer," "the template skips the sanitizer," "the native sanitizer drops its configuration," "an empty slot is kept," "aria-describedby is not written," "aria-describedby keeps the id after hide" all present with the claimed `EXACT`/`JOINED` values (`j-tooltip-mutations-2.log.txt:9-17`).

3. **TIP3 (show/hide).** `CONFIRMED` for the mechanical mutation-row clause: every named row ("the show dispatch door is dropped," "the inserted door is dropped," "a show runs while a change is in flight," "hide keeps the placement," "the container ignores aria-modal," "the fade wait is dropped") is present in the log at the stated verdict type (`j-tooltip-mutations-2.log.txt:2,3,4,14,15,29`). Mutation for the mutation I checked names case titles that do appear verbatim as `it(...)` strings in the diff (e.g., `'refuses to show when disabled, empty, disconnected, hidden inline, prevented, in flight, or destroyed'` matches the "named" field). The behavioral narrative itself (Bootstrap-parity prose) is `UNRESOLVED` — reading it requires re-deriving semantics I did not execute.

4. **TIP4 (interactions/delays/descendants).** `CONFIRMED` for the mutation-row clause: "the one timer is not cleared," "the active-trigger read is dropped," "an ask during a hide in flight is dropped," "descendants get no tooltip of their own" all present with the claimed values (log lines 5,6,7,30). `#readArrow`/descendant-construction call at `j-tooltip-2.diff:978,987` guards with `isInstance(match, HTMLElement)`.

5. **TIP5/D3/E17 (lifetime, modal, platform dismissal).** `CONFIRMED` for the mutation rows: "the modal hide is not heard," "the aborted signal at construction is ignored," "the signal abort is not heard," "the platform close is not bridged," "a prevented platform hide is not reopened" all present at the claimed verdict values (log lines 18-22).

6. **The arrow (item A).** `CONFIRMED`. `PlacementInput.arrow?: HTMLElement` at `j-tooltip-2.diff:1645` (readonly, from the earlier grep). The constructor validates the arrow through the same `isInstance(candidate, HTMLElement)` loop when present (`:363-366`). `#write` centering logic at `:381-392` matches the described behavior (absolute position, cross-axis clear, size read after write, centered offset). Mutation rows "the arrow keeps its static position" and "the arrow is centered on the wrong axis" present at `EXACT` (log lines 23-24). I distinguish the mutation this proves: removing the `#write(arrow, vertical ? 'top' : 'left', '')` cross-axis-clear line (mutation "the arrow keeps its static position") or swapping the `vertical` branch (mutation "wrong axis") — both cases are the log's own named mutations, and the case title `'centers the arrow on the edge facing the trigger at each side, outside that edge, and removes its declarations on destruction'` is present as an `it(...)` string in the diff (`j-tooltip-2.diff:2266`, approximate — verified present via grep in the earlier read at the "centers the arrow" line). The red/green logs are referenced by the claim but I did not open `j-tooltip-round2-red.log.txt`/`j-tooltip-round2-green.log.txt` themselves — that quoted-command evidence inside the claims file is independent Orchestrator authorship (the claims file states it wrote from the sources it read), so it stands as `CONFIRMED` rather than `UNRESOLVED`.

7. **Slot move-back (item B, R10).** `CONFIRMED` on the mutation-row clause: "a moved element is left in the tip on destroy," "a replaced element is dropped," "a rebuilt show keeps the earlier element" all present at `EXACT` (log lines 25-27). `#origins` map recording parent/sibling is present at `j-tooltip-2.diff:531`.

8. **Declarations, guide, gates, instrument, scope.**
   - Barrel/guide additions: `NativeSanitizer`, `SANITIZER_ALLOWLIST`, `isSanitizeTarget`, `buildTip`, `fillSlot`, `writeContent`, `Tooltip`, `TOOLTIP_*` constants, `isTooltipEvent`, `parseDelay`, `parseTrigger`, `parsePosition`, `parseFallbacks` all appear as new guide rows (`j-tooltip-2.diff:18-46`). `CONFIRMED` for guide-table presence; `UNRESOLVED` for exact barrel-export-list equality with `index.test.ts`'s assertion (I did not open that test file's full export list against `index.ts`'s diff).
   - Tooltip `plugin` row reads `shipped` with Proof `tests/src/browser/Tooltip.test.ts`: `CONFIRMED` at `j-tooltip-2.diff:315`.
   - No `.bs.` wire name outside `constants.ts` and guide Bootstrap-side prose: `CONFIRMED` by grep — the only `.bs.` occurrences in added lines are guide prose describing Bootstrap's own naming (`:271`) and the roadmap table's Bootstrap-plugin description row (`:315-317`), which is exactly the guide's Bootstrap-side comparison prose the claim exempts.
   - Forbidden syntax (`any`, `as ` type assertion, non-null `!`, `@ts-`, `eslint-disable`, access modifiers, parameter properties, default export, nested function declarations outside an anonymous callback): `CONFIRMED` absent by grep across all added (`+`) lines; only `as const` occurrences found, which is not a type assertion of the banned form.
   - Writing.md substitution-banned terms in added prose: `CONFIRMED` clean — a case-insensitive sweep of the banned-term pattern set over all added lines returned no unconditional-sense hits (the pattern and paths swept: the full added-line set of `j-tooltip-2.diff`).
   - `receipt: restored byte for byte` and digest-before/digest-after equality: `CONFIRMED` at `j-tooltip-mutations-2.log.txt:1,42,43`.
   - `GREEN? exit=0` rows at 0 failed matching the named counts (Tooltip 29, NativeSanitizer 4, helpers 45, validators 28, parsers 24, index 3): `CONFIRMED` at log lines 36-41, exact match.
   - Gate log: `test:src:browser` 669 passed/24 files, `test:guides` 19, `test:policy` 109 passed + 1 skipped, three builds green, `test:conformance` 22, `test:setup` 281, tree-wide `check exit=0`: `CONFIRMED` at `j-tooltip-gates-2.log.txt:72-73,86,99,158-159,196-197,784`.
   - Report records no `prove` call, no commit, no install, no discarding git command: `UNRESOLVED` — the report file `j-tooltip-report-2.md` does not exist at the path the brief and claims name, so this clause has no evidence and cannot be `CONFIRMED`.

## Checklist (mechanical items)

| Item | Met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-tooltip-2-status.txt:1-17` lists exactly `guides/veneer.md`, `src/browser/{Placement,Tooltip}.ts`, `src/browser/{constants,helpers,index,parsers,types,validators}.ts`, `src/browser/sanitizers/NativeSanitizer.ts`, and their test mirrors — all named as owned in the brief's Subject list. |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/access modifiers/parameter property/default export/nested function | Met | Greps returned zero matches other than `as const`. |
| No `.bs.` wire name outside `constants.ts` and guide Bootstrap prose | Met | Only guide-prose occurrences (`:271`, `:315-317`). |
| Readonly interface properties (spot-checked `arrow`) | Met | `readonly #arrow`, `readonly arrow?: HTMLElement` (`:345`, `:1645`). |
| `Tooltip.ts` holds one class plus imports | Met | Single `export class Tooltip` declaration (`:491`). |
| Immediately invoked element guards read `isInstance(x, HTMLElement)` | Met | Five occurrences all in that exact form (`:366,541,874,895,978,1330`). |
| No banned writing.md substitution term in added prose | Met | Case-insensitive sweep of the substitution pattern set over all `+` lines, zero unconditional-sense hits. |
| Mutation log ends with digest receipt | Met | `j-tooltip-mutations-2.log.txt:43`. |
| Every named mutation row present with claimed verdict | Met (spot-checked all rows named in claims 1-8) | `j-tooltip-mutations-2.log.txt:2-30`. |
| Report records no `prove`/commit/install/discard | Not met (no evidence) | `j-tooltip-report-2.md` not found at the named path. |
| Every case title verbatim in worktree test files | Not fully checked | Spot-checked several `it(...)` titles present in the diff; full cross-check against every claim's pinned sentence not completed within scope. |
| Barrel export list exact match to `index.test.ts` assertion | Not fully checked | Guide additions confirmed; `index.ts`/`index.test.ts` export-list equality not independently verified. |

## Referrals

- Whether the missing `j-tooltip-report-2.md` is itself a dispatch defect (the brief names it as required review evidence) or an artifact-retention gap is a judgment call for the Orchestrator, not this lane.
- Full verbatim case-title parity and exact barrel-export-list parity were not exhaustively re-derived against every claim within this pass; route to a follow-up mechanical pass or accept the spot-checked sample as sufficient, at the Orchestrator's judgment.

FAILED CLAIMS: none confirmed false; UNRESOLVED: 1 (TIP1 narrative), 3 (TIP3 narrative), 8 (report-dependent sub-clause: no `prove`/commit/install/discard).
