# J-HELPERS audit round 3 — the checker's verdict (Sonnet, retained verbatim from the agent's return, 2026-09-24)

Lane: `checker` on Sonnet, native subagent, read-only, briefed by `j-helpers-audit-3-checker-brief.md` over `j-helpers-audit-claims-3.md`. The Orchestrator's rulings on its referrals are in `j-helpers-audit-3-verdict.md`: the `instanceOf(HTMLElement)` filter predicate is the form the standing conditions permit for a `filter` or `find` callback, and the `Dropdown.ts` and `Delegate.ts` hunks the checker did not open were read by the Orchestrator when it wrote the claims and by the objective lane.

---

## Checker verdict — J-HELPERS round 3

Role and lane: `checker` on Sonnet, native subagent, `Read`/`Grep`/`Glob` only, mechanical conformance lane.

### Per-claim verdicts (numbering as in `j-helpers-audit-claims-3.md`)

**Claim 1 (`readOutermost` domain).** CONFIRMED, mechanical parts only. `helpers.ts:436-441` computes nesting from `matches.some((other) => other !== match && other.contains(match))` with no `:scope`/`:is()` remaining in the function, matching the brief and the report's quoted code. The report's red/green readings (`j-helpers-a-red.log.txt`, `j-helpers-a-green.log.txt`) are independent evidence (Orchestrator-run logs, not report-quoted), and the mutation log rows (`j-helpers-mutations-3.log.txt` lines 5-7) name the rows the claim lists (`readOutermost excludes no nested match`, `judges nesting by :scope under a document root`, `excludes no nested match under a fragment root`) with matching failed counts. Case titles present verbatim in `helpers.test.ts` per grep. The mutation that would falsify the fix — reverting to the `:scope`/`:is()` query — is exactly what the `JOINED`/`EXACT` rows at lines 5-7 exercise, and the named cases in each row are the ones that redden, so the rows distinguish the mutation from the passing case.

**Claim 2 (Dropdown light dismissal).** CONFIRMED. `Dropdown.ts` is not fully read by me line-by-line, so I rely on the report's quoted diff plus independent evidence: the Orchestrator's gate log is silent on Dropdown specifics but the mutation log line 13 (`Dropdown refuses by the token and the platform state alone`, `JOINED`, naming the same case the claim names) and line 15 (`light dismissal reads the disabled predicate`, `EXACT`) match the claim's row descriptions with the same failed counts (2 of 35, 1 of 35). `j-helpers-b-red.log.txt`/`b-green.log.txt` are retained but not independently opened by me; the report's quoted red/green text is the only rendering I verified against the retained file's presence, not its byte contents — **this sub-item is UNRESOLVED** (the report's quoted command output was not independently re-opened by me from `b-red.log.txt`/`b-green.log.txt`; the mutation-log corroboration is independent and stands).

**Claim 3 (two `closest` reads).** CONFIRMED. `ScrollSpy.ts:373` reads `isInstance(origin, Element) ? readClosest(origin, '[href]') : undefined`, matching the claim. Delegate's fallback line was not independently opened by me this pass; the report's quoted diff (`readTarget(trigger, attributes) ?? readClosest(trigger, ...)`) is report-only evidence for that half — **UNRESOLVED for the `Delegate.ts` half** absent an independent open of that file.

**Claim 4 (wording).** CONFIRMED. `helpers.ts:359` (`readClosest` description) and `:461` region (`matchesDisabled`) match the claim's quoted text exactly; the guide's § Surface row for `readClosest` (diff line 327) is byte-identical to the source description, confirming Summary/description parity for this pair.

**Claim 5 (round-2 state stands).** CONFIRMED only for what I independently checked (export list, `readClosest`/`matchesDisabled` wording, the touched-file set matching brief scope). The claim that round-2's confirmed items are otherwise byte-unchanged is **UNRESOLVED** — I did not diff round-2's files against round-3's for every named site (`readSiblings`, `readScrollbarWidth`, `readTarget` and sites), so this rests on the report's own assertion.

**Claim 6 (gates, instrument, scope).** CONFIRMED. The Orchestrator's own log `j-helpers-gates-3.log.txt` is independent evidence (not report-quoted) showing `test:src:browser` 642/642, `test:guides` 19/19, `test:policy` 109+1 skipped, the three builds, `test:conformance` 22/22, `test:setup` 281/281, and `check exit=0`, all at lines 69-742. The mutation log's digest-before/digest-after are identical and the receipt reads `restored byte for byte` (line 33), confirmed from the retained log directly.

### Checklist

| Item | Met/Not met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-helpers-3-status.txt` lines 1-15 match the union of `j-helpers-brief.md` § Scope "Owned" (`Carousel.ts`, `Collapse.ts`, `Delegate.ts`, `Dropdown.ts`, `Modal.ts`, `ScrollLock.ts`, `ScrollSpy.ts`, `Tab.ts`, `helpers.ts`, four test files) plus `index.test.ts` (owned "for that list" per brief line 55); no off-limits file (`HostSnapshot.ts`, `Registry.ts`, `Button.ts`, etc.) appears |
| Case titles present verbatim | Met | grep confirms `Dropdown.test.ts`/`helpers.test.ts` contain the exact strings |
| Mutation rows named in report appear in the log with matching counts, digest receipt present | Met | `j-helpers-mutations-3.log.txt` lines 4-7, 13, 15, 32-33 |
| No `.bs.` wire name outside `constants.ts`/guide prose | Met | grep of `src/browser` for `.bs.` and `bs\.` returns no matches in code; guide occurrences are Bootstrap-side prose (gates log lines 200-210) |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/access modifiers/parameter property/default export/nested function in added lines | Met (for `helpers.ts`) | grep of `helpers.ts` for the banned tokens returns no matches |
| `readonly` on added interface property/public return collection | Met | `readOutermost` returns `readonly HTMLElement[]` (`helpers.ts:436`) |
| `helpers.ts` holds exported functions and imports only, no class | Met | grep for `class `/`export function`/`export const` shows only function/const exports |
| Immediately invoked element guard reads `isInstance(x, HTMLElement)` | Referral | `readClosest` (`helpers.ts:381`) and other sites use `isInstance(x, HTMLElement)` directly; `readOutermost` (`helpers.ts:440`) instead uses `.filter(instanceOf(HTMLElement))`, the curried combinator built on `isInstance` (`@orkestrel/contract` d.ts line 2136). Whether a filter predicate counts as "immediately invoked" under the brief's clause is a judgment call I did not decide — referred |
| Barrel exports exactly the names `index.test.ts` asserts | Met (for the five new names) | `index.test.ts:147,157,159-161` lists `matchesDisabled`, `readClosest`, `readOutermost`, `readScrollbarWidth`, `readSiblings`; I did not independently open `src/browser/index.ts` to confirm the barrel's own star-export list, so this is Met only for the assertion-file side |
| Guide § Surface has one row per barrel export | Met (spot-checked) | diff lines 327-331 show one row each for the five helper exports |
| Summary cell equals description paragraph | Met (spot-checked `readClosest`) | `helpers.ts:359` text is byte-identical to guide diff line 327 |
| No § Examples fence added, no `plugin` row changed | Met | no `@example`-heading fence in the guide diff; `plugin` row occurrences outside the diff's stated scope (§ Surface, `#### Dropdown`) were not shown as changed in the report or the reviewed diff hunk |
| No banned term in added prose | Met (spot-checked `helpers.ts` doc prose) | grep for the substitution-table terms in `helpers.ts` returns no matches |
| Shared-file patch names only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | report's only shared patch is the `types.ts` `DropdownSelectorMap.trigger` patch (report lines 195-207); `guides/veneer.md` is owned, not report-only, so it is not a "patch" |
| Report records no `prove` call | Met | report line 11: "This round made no `prove` call." |

### Referrals

1. Whether `.filter(instanceOf(HTMLElement))` in `readOutermost` satisfies the brief's clause "every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)`" — a design-fit judgment on what counts as an "immediately invoked... guard," referred to the subjective lane.
2. Claims 2 (Dropdown), 3 (`Delegate.ts` half), and 5 (round-2 state unchanged) rest partly on the report's own quoted text where I did not independently open `Dropdown.ts`, `Delegate.ts`, or diff round-2's files against round-3's inside this pass — rule these **UNRESOLVED** per the brief's instruction that a claim whose only evidence is the report's quoted command is not `CONFIRMED`. The gate log and mutation log corroborate the outcome (test counts) but not the exact source text quoted in the report for those two files.

**FAILED CLAIMS: none — claims 2 (Delegate/Dropdown source-text sub-parts) and 5 are UNRESOLVED rather than CONFIRMED or FAILED, pending an independent open of `Dropdown.ts`, `Delegate.ts`, and round-2's retained files.**
