# Checker verdict — J-SNAPSHOT round 2, mechanical lane (Sonnet, agent ade6f7ce791a71a0b, retained verbatim 2026-09-24)

Lane: `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only. Mechanical conformance only.

## Claim verdicts

**1. Every departure removes against the shared reading (S1').** CONFIRMED. Case title `removes the class attribute of a trigger a button restoration leaves empty while a collapse on the same trigger stays live` appears verbatim (`j-snapshot-2.diff:679`, `HostSnapshot.test.ts:679`). `#leave` returns `!record.present` on every departure and forgets the record/element map at the last holder (`HostSnapshot.ts:228-246`). `restore` removes `class` when `#leave` returns true and the list is empty (`HostSnapshot.ts:157-160`) and `style` under the matching condition (`HostSnapshot.ts:168-173`); the `finally` block only leaves remaining records, no removal (`HostSnapshot.ts:186`). Mutation rows `the removal only at the last holder (round 1 rule)` (`EXACT`), `the presence record withdrawn early` (`JOINED`), `each save reads the element again` (`JOINED`), `the presence read at restore time rather than save time` (`JOINED`), `the take-back … is dropped` (`EXACT`) all appear in `j-snapshot-mutations-2.log.txt:3,4,6,9,10` with matching read counts.

**2. The Dropdown reproduction's no-later-writes assertion binds (S2').** CONFIRMED. Case title matches verbatim at `j-snapshot-2.diff:811`. `delivered` array and its `toEqual([])` assertions plus `observer.takeRecords()` and the kept `[[null, null]]` reading appear at `j-snapshot-2.diff:840-856`. Mutation row `a late side write after the outer popover removal returns (the S2 negative control)` is `EXACT` with `expected [ MutationRecord{} ] to deeply equal []` (`j-snapshot-mutations-2.log.txt:15`). Controls log shows `MISSED exit=0 … 0 failed of 31` for the same late write against round 1's proof shape (`j-snapshot-mutations-2-controls.log.txt:2`).

**3. The fold and the type argument (S5', S4').** CONFIRMED. `#hold`/`#depart` and the static `owner` methods are absent; `#join`/`#leave` are present as instance methods holding the described logic (`HostSnapshot.ts:195-246`). `save` calls `#join` for `'class'`/`'style'` (`HostSnapshot.ts:128-129`). Both `?? new Map<…>()` calls carry explicit type arguments (`HostSnapshot.ts:212-215`, `271-280`). The widening probe (`j-snapshot-widen-probe.ts:12-21`) assigns untyped reads to `number` without error and the typed control fails `TS2322` at line 21, matching the report's cited failure.

**4. The sentences (S3', F2).** CONFIRMED. `types.ts` remarks, class remarks, § Ownership and restoration, and `#### Modal` state the removal rule as described (`j-snapshot-2.diff:22-39,128-141,505-555`). Temporal `once` is absent from the owned prose per the independent sweep below; the case title reads verbatim `…found absent after every snapshot that saved on the element restores, in either order` (`j-snapshot-2.diff:618`). `#### Tab` and `#### Carousel` state their bounds with no campaign unit name (`j-snapshot-2.diff:66-70,90-95`). The four retitled cases name no removed mechanism (`j-snapshot-2.diff:591-616,861,869-879`). `test:guides exit=0`, `19 passed (19)` (`j-snapshot-gates-2.log.txt:90-95`).

**5. The instrument, the gates, and the scope.** CONFIRMED. `LANDED` row against `HostSnapshot.round1.ts`, 1 failed of 31 with the named case (`j-snapshot-mutations-2.log.txt:2`); `GREEN?` rows at 0 failed of 31/35/40 for `HostSnapshot.test.ts`/`Dropdown.test.ts`/`Modal.test.ts` (lines 16-18); matching digests before/after and `receipt: restored byte for byte` in both logs (lines 1,19-20; controls lines 1,3-4). Gates log shows `check:src:browser`, `check`, `oxlint`, `oxfmt`, `test:src:browser`, `test:guides`, `test:policy` all `exit=0` (`j-snapshot-gates-2.log.txt:10,25,28,35,82,95,108`). Status lists exactly `guides/veneer.md`, `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, `tests/src/browser/HostSnapshot.test.ts`, `tests/src/browser/Modal.test.ts` (`j-snapshot-2-status.txt:1-5`), matching the brief's owned set (`j-snapshot-brief-2.md:39`) with no off-limits file. `HostSnapshot.ts` holds one class plus one type-only import (`HostSnapshot.ts:1,53`). Report records no `prove` call (`j-snapshot-report-2.md:7`).

## Checklist

| Item | Verdict | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | met | `j-snapshot-2-status.txt:1-5` vs. `j-snapshot-brief-2.md:39,41` |
| Case titles present verbatim in test files | met | grep matches cited under claims 1, 2, 4 |
| Mutation rows present with matching failed counts/case names, log ends with digest receipt | met | `j-snapshot-mutations-2.log.txt:1-20`, `-controls.log.txt:1-5` |
| No `.bs.` wire name outside `constants.ts` / guide prose | met | `j-snapshot-gates-2.log.txt:110-121` (grep hits confined to guide plugin table) |
| No `any`, `as ` assertion, non-null `!`, `@ts-`, `eslint-disable`, access modifier, parameter property, default export, nested function declaration outside anonymous callback in added lines | met | grep sweeps of `j-snapshot-2.diff` (no matches for `any`/`@ts-`/`eslint-disable`/access modifiers; `as ` hits are prose "as a"/"as an", not type assertions; no bare `!` non-null found; all callbacks are arrow expressions passed as arguments) |
| Every added interface property and public return collection `readonly` | met | `HostSnapshot.ts:60-99,210-278,315` all-`readonly` fields; no new public export added |
| `HostSnapshot.ts` holds one class plus imports | met | `HostSnapshot.ts:1,53` |
| Immediately invoked element guard reads `isInstance(x, HTMLElement)` | not applicable | no `isInstance` usage added this round (`Grep` on file: no matches) |
| Barrel exports exactly the names `index.test.ts` asserts | met | `index.ts` unchanged this round; `index.test.ts:94` names `HostSnapshot` |
| Guide § Surface has one row per barrel export, Summary cell equals description paragraph | met | `guides/veneer.md:61` cell equals `HostSnapshot.ts` first sentence verbatim |
| No added `@example` fence, no `plugin` row changed | met | diff touches only prose paragraphs named in scope, no plugin-table or example-fence hunks |
| Barrel and § Surface rows unchanged | met | no diff hunk on `index.ts` or the Surface table |
| No banned term in added prose (unconditional set) | met | independent case-insensitive sweep of `j-snapshot-2.diff` `+` lines against the unconditional and judged rows; only hits are `new` as code keyword and `since`/`once` in permitted senses, matching the report's own sweep and now independently confirmed |
| Shared-file patch for `Modal.test.ts` applied before gate run, status lists it | met | `j-snapshot-report-2.md:24` ("round 1's patch, which you applied"), `j-snapshot-2-status.txt:5` |
| Report records no `prove` call | met | `j-snapshot-report-2.md:7` |
| E6 (no aliases/wrappers/dead code) and E10 (naming) | met | `#hold`/`#depart`/static presence methods fully removed, not aliased; no legacy `Snapshot`/`isHost` name reintroduced |

## Referrals

- The Orchestrator's own gate run (`j-snapshot-gates-2.log.txt:44-74`) shows an uncaught `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList': The token provided must not be empty` thrown from `HostSnapshot.ts:154` during `test:src:browser`, inside a pre-existing test at `HostSnapshot.test.ts:346-348`/`:478`. The suite still reports `649 passed (649)` and `exit=0`. This sits outside the numbered claims and outside mechanical scope; whether it is a pre-existing flake this round's refactor surfaced, or a defect the round introduced, is a judgment question for the subjective/objective design lanes, not a checker ruling.

VERDICT: PASS

## The Orchestrator's note on the referral

The stderr `DOMTokenList` line is the pre-existing case "withdraws an overlapping earliest recording when its restoration throws inside a reaction", whose reaction throws on purpose; the J-OFFCANVAS round-1 report recorded the same line from the same case against the unchanged `HostSnapshot.ts`, so it predates this unit.
