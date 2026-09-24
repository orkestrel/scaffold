# J-TOAST audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 58 tool uses, 234 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Numbered claims

1. **CONFIRMED.** `Toast.ts` (`C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Toast.ts:55-291`) is one class plus imports, implements `ToastInterface`'s named members, refuses non-`HTMLElement` hosts with `TOAST_HOST_INVALID` (line 78), resolves `classes`/`attributes` through `resolveVocabulary` with `TOAST_OPTION_INVALID` (lines 82-93) and validates but discards `selectors` (line 96), resolves `animated`/`autohide`/`delay` through one `resolveOptions` call (lines 97-104), binds hooks through `bindEventMap` with `isToastEvent` (line 111), binds `mouseover`/`focusin`/`mouseout`/`focusout` (lines 112-121), honours `signal` (lines 122-124), and `destroy` (lines 217-225) matches the stated order. The mutation log's rows for this obligation are `EXACT`/`JOINED` (`j-toast-mutations.log.txt` lines 2, 6-7, 33-37, 40).
2. **CONFIRMED.** `show`/`hide` sequences (`Toast.ts:149-215`) match the described door structure (`#refused`, `#apply`, `#holds`), and the mutation log rows for every pinned case in this claim read `EXACT` or `JOINED` (log lines 2-9, 12-46).
3. **CONFIRMED, with the one equivalence lane rules on.** `#schedule`/`#clear`/`#leave` (`Toast.ts:266-290`) match the stated behavior; every row but `MISSED exit=0 | destruction leaves the delay running (equivalent)` (log line 22) reads `EXACT`/`JOINED`. The claims file itself states "the lanes rule whether that equivalence holds" — this is a judgment question, not a mechanical one; see Referrals.
4. **CONFIRMED**, with one item NOT MET inside it (see checklist below). `#activate`/`#contests`/`#routeToast`/`#dismiss`/`#dismissed`/`#disabled` are present in `Delegate.ts` (diff lines 302-376) exactly as described, and the eight named Delegate.test.ts cases are present verbatim (`Delegate.test.ts:1015,1052,1093,1111,1165,1201,1217,1243`). The `isInstance(x, HTMLElement)` clause is a checklist item, ruled separately below as NOT MET at one site.
5. **CONFIRMED.** `isToastEvent` reads exactly `isInstance(value, CustomEvent) && value.detail === null` inside a `try` (`validators.ts:161-167`). `TOAST_EVENTS`, `TOAST_CLASSES`, `TOAST_ATTRIBUTES`, `TOAST_SELECTORS`, `TOAST_DEFAULTS` are frozen and match the stated defaults (`constants.ts:73-108`). The barrel exports `./Toast.js` (`index.ts:12`) and `index.test.ts` lists the seven new names (`index.test.ts:38-43,52`).
6. **CONFIRMED for the mechanical clauses; UNRESOLVED for "runs as written."** § Surface carries exactly seven new rows, each equal to its TSDoc summary (verified: `Toast`, `TOAST_CLASSES`, `TOAST_ATTRIBUTES`, `TOAST_SELECTORS`, `TOAST_DEFAULTS`, `TOAST_EVENTS`, `isToastEvent` — diff lines 9-15 against `constants.ts:72,80,89,97,102` and `validators.ts:144-145`). The fence under § Examples imports `@orkestrel/veneer/browser` (diff line 27). The `plugin` row reads `shipped` with Proof `tests/src/browser/Toast.test.ts`, Obligation cell byte-identical (diff lines 189-190). Whether the fence "runs as written" rests on `test:guides exit=0` (`j-toast-gates.log.txt:70-82`), which is independent Orchestrator evidence, so I read this CONFIRMED for that sub-clause too. The returned `types.ts` patch is unapplied in the worktree (per claims file's carried facts), so "with it applied … parity holds" is unfalsifiable from the tree as it stands — UNRESOLVED for that portion only.
7. **CONFIRMED**, except the two items ruled NOT MET below (mutation-row/status/gate/forbidden-syntax substance verified; see checklist for the two exceptions). Status lists exactly the eight files the report names (`j-toast-status.txt:1-10` = report lines 34-46), no off-limits file present. Every named gate reads exit 0 in `j-toast-gates.log.txt` (lines 15,18,25,69,82,95,117,129,142,155,193,563), with `test:src:browser` at 247 passed (line 65). The mutation log's rows are `EXACT`/`JOINED` but the one `MISSED …(equivalent)` row, four `GREEN?` rows at 0 failed of 33/42/12/3 (log lines 69-72), and the closing receipt reads `restored byte for byte` (log line 74) with identical before/after digests (log lines 1, 73). Added lines carry no `any`, `as `, `@ts-`, `eslint-disable`, access modifier, default export, or `.bs.` wire name (diff-wide greps, no true hits). The report records that no `prove` call was made (`j-toast-report.md:17`).

## Checklist of items

| item | met/not met | evidence |
|---|---|---|
| Status lists only the brief's owned files, no off-limits file | met | `j-toast-status.txt:1-10` lists exactly `guides/veneer.md`, `src/browser/Delegate.ts`, `src/browser/Toast.ts`, `src/browser/constants.ts`, `src/browser/index.ts`, `src/browser/validators.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/Toast.test.ts`, `tests/src/browser/index.test.ts`, `tests/src/browser/validators.test.ts`; no `types.ts`, `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, or `ROADMAP.md` appears |
| Every case title the report names appears verbatim in the worktree's test files | met | `Toast.test.ts:292,389,904` (Toast1 additions); `Delegate.test.ts:1015,1052,1093,1111,1165,1201,1217,1243` (8 toast cases); `validators.test.ts:172,185` (2 `isToastEvent` cases) |
| Every mutation row appears in the instrument's log with the failed count and named case, log ends with digest receipt | met | `j-toast-mutations.log.txt:2-74`; four `GREEN?` rows at 0 failed of 33/42/12/3 (lines 69-72); `receipt: restored byte for byte` (line 74) |
| No `.bs.` wire name dispatched/listened for outside `constants.ts`'s default attribute names and the guide's Bootstrap-side prose | met | `.bs.` grep over `*.ts` in the worktree returns only `tests/setupServer.ts`/`.test.ts` (pre-existing, untouched by this unit's diff), not `Toast.ts`/`Delegate.ts`/`constants.ts`/`validators.ts` |
| Added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, parameter property, default export, or nested function declaration outside an anonymous callback | met | diff-wide greps for each pattern return no true hits (only prose false positives: "any route", "as taken over", etc.) |
| Every added interface property and public return collection is `readonly` | UNRESOLVED | `types.ts` carries no landed edit for this unit (report-only patch, unapplied); no interface property was added inside the reviewed diff itself to check |
| `Toast.ts` holds one class plus imports | met | `Toast.ts:1-291` |
| Every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)` | **NOT MET** | `Delegate.ts` diff line 346 (worktree `#routeToast`): `isInstance(trigger, HTMLAnchorElement) \|\| isInstance(trigger, HTMLAreaElement)`, not `isInstance(x, HTMLElement)`. Every other added guard (diff lines 326, 359, 375) does read `isInstance(x, HTMLElement)`. Re-dispatch: rule whether the anchor/area narrowing at `#routeToast` is a documented departure exempt from this item, or whether the item should be worded to admit an `HTMLElement` subtype for the anchor/area preventDefault check. |
| Barrel exports exactly the names `index.test.ts` asserts | met | `index.ts:12` (`export * from './Toast.js'`) yields `Toast`, `isToastEvent`, `TOAST_ATTRIBUTES`, `TOAST_CLASSES`, `TOAST_DEFAULTS`, `TOAST_EVENTS`, `TOAST_SELECTORS`; `index.test.ts:38-43,52` names exactly those seven among the full sorted list |
| Guide § Surface has one row per barrel export | met | diff lines 9-15 add exactly seven rows matching the seven new barrel names |
| Every added Summary cell equals its description paragraph | met | `Toast` (diff line 9 vs. `Toast.ts:25`), `TOAST_CLASSES`/`TOAST_ATTRIBUTES`/`TOAST_SELECTORS`/`TOAST_DEFAULTS`/`TOAST_EVENTS` (diff lines 10-14 vs. `constants.ts:80,89,97,102,72`), `isToastEvent` (diff line 15 vs. `validators.ts:144-145`) |
| Every added summary opens with a third-person `-s` verb and does not name its symbol | met | "Shows…", "Names…" (x5), "Checks…" — none names its own symbol |
| The fence under § Examples imports from `@orkestrel/veneer/browser` | met | diff line 27 |
| The `plugin` row reads `shipped` with Proof `tests/src/browser/Toast.test.ts` | met | diff line 190; guide `veneer.md:5946` |
| No banned substitution term in added prose | met | grep for the unconditional-ban rows (`simply`, `utilize`, `leverage`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) over `j-toast.diff` returns no hits |
| Every shared-file patch names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md` | met | `j-toast-report.md:89-98` — one patch, to `types.ts` only |
| The report records that no `prove` call was made | met | `j-toast-report.md:17` |

## Findings fitting no claim

None substantiated beyond the checklist item above.

## Attacked and held

- Claim 6's "with it applied … parity holds" clause was checked against the actual worktree state (patch unapplied) rather than taken from the report's assertion; the mechanical clauses of claim 6 otherwise held.
- The barrel/export/guide-row triple parity (claim 5, item "barrel exports exactly the names") was cross-checked three ways (`index.ts`, `index.test.ts`, guide diff) and held on all three.

## Referrals

- Claim 3's equivalence ruling ("destruction leaves the delay running (equivalent)") is a judgment call the claims file itself assigns to the lanes rather than to mechanical evidence — referred to the subjective/objective lanes.
- The `isInstance(x, HTMLElement)` item's disposition at `Delegate.ts` diff line 346 (anchor/area narrowing) may be an intended, documented departure rather than a defect — referred to the Orchestrator to rule whether the item's wording covers an `HTMLElement` subtype guard used for a `preventDefault` check.

VERDICT: FAIL 6; outside the claims: isInstance(x, HTMLElement) item (Delegate.ts #routeToast)

---

The Orchestrator's note at retention: the one not-met item is ruled no deviation. `isInstance(trigger, HTMLAnchorElement) || isInstance(trigger, HTMLAreaElement)` is the invoked `isInstance` form the rule requires, narrowing to the anchor and area subtypes the prevention reads; the checker's item wording named `HTMLElement` alone. The Alert, Tab, and Modal routes read the same pair.
