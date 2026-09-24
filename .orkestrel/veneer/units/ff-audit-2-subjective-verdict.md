Lane held: subjective (reviewer, Opus 5.5). Opus wrote this unit, so I checked Opus's own work harder, and I opened every frame the brief named.

1. **Scope: CONFIRMED.** `ff-2-status.txt:1-3` lists only `tests/app/browser/integration.test.ts`, `tests/setup.test.ts` and `tests/setup.ts`. `ff-shared-2.patch:1-2` touches `guides/veneer.md` alone. The only `FRAMES.page(` call left in the worktree is the arrival frame (`/home/user/veneer-ff/tests/app/browser/integration.test.ts:255`). So the guide sentence "The arrival frame is the one page frame" (`ff-shared-2.patch:95`) matches the tree.

2. **Outline guard: CONFIRMED.**
   - **Frames.** Each re-shot frame shows the state its scenario names:
     - `ff-final-2/skip-link-focus--dark-1280.png` and `--light-390.png` show the revealed link with its outline. At 390 the outline wraps across both line fragments.
     - `guard/painted/*` match the main frames.
     - `guard/suppressed/skip-link-focus--{dark-1280,light-390}.png` show the link with no outline.
     - `list-group-actions-focus--{dark-1280,light-390}.png` show "Dispatch lane" with its focus fill and outline. The suppressed copies show the fill with no outline.
     - `accordion-base-focus--*` shows the "Return policy" ring lifted over the items beside it.
     - `check-group-focus--*` shows the ring on "Align center".
   - **Readings.** The painted and suppressed values are painted 1 and suppressed 0 for the skip link, and 0.995 and 0 for the list-group row (`ff-final-2/dark-1280.txt:4,8`).
   - **Mutations.** Each assertion distinguishes the mutation it is meant to catch:
     - A scripted focus alone on the skip link fails the `:focus-visible` assertion (`ff-mutations-2.log.txt:99-108`).
     - A scripted focus alone on the list-group row fails the reach assertion before the pixel guard runs (`ff-mutations-2.log.txt:132-141`). The pixel guard is not what fails for this mutation, and the report says so.
     - A scripted focus plus a key press fails the painted assertion for both cases (1 or 0.995 against 0) (`ff-mutations-2.log.txt:110-119, 143-152`). The pixel guard is the only assertion that catches this drive, so it earns its place.
     - The control mutation (`outline-color: red` in place of `outline: none`) fails the suppressed assertion (1 against 0) (`ff-mutations-2.log.txt:121-130`).
   - **Control.** The suppressed frame rules out the rival reading that the strip picks up the box's own paint or a shadow, because only the outline is removed and the strip then reads 0 (`ff-2.diff:825, 1458`).

3. **Helper logic: BROKEN.** "`computeRingReach` keeps only logic a proof row decides" is false.
   - **Failing input.** Delete the `shadow === 'none' ? [] :` branch at `ff-2.diff:1862`, leaving `const layers = shadow.split(',')`. For `shadow = 'none'`, the value `'none'.split(',')` gives `['none']`. That layer has no `inset` and no `px`, so it reads 0, and `Math.max(0, outline, 0)` returns the same result as before. No row changes: the shadow table's `none` row (`ff-2.diff:1936`), every outline row (the box shadow reads `'none'` there, `ff-2.diff:1741`), and every worn row. No journey reading changes either.
   - **Provenance.** I traced this by hand; I did not run it. Running `npm run test:setup` with the branch deleted settles it, and I expect it to stay green.
   - **Fix.** Delete the branch at `ff-2.diff:1862`. Then run `npm run test:setup` green and add the run to the mutation log.
   - **What holds.**
     - The tables are frozen, exported, and have TSDoc (`ff-2.diff:1877-1965`), and the proofs iterate them (`ff-2.diff:1728-1766`).
     - Both removals passed with the tables in place (`ff-mutations-2.log.txt:1-17`).
     - The split and the inset test are each decided by a row (`ff-mutations-2.log.txt:19-48`). So are the offsets and the outline (`:29-68`).
     - CSS color functions accept no lengths, so a color function never carries a `px` value.

4. **Pointer watcher: CONFIRMED.**
   - With the release deleted, the grouped-alignment case passes (`ff-case-r2-checkgroup-norelease-dark-1280.log.txt:82`). The pointer probe records the pointer entering only `DIV.p-3` (`/home/user/veneer-ff/tmp/units/ff-probes-2/ff-pointer-dark-1280.txt:15-21`).
   - Deleting the accordion release (`ff-mut2-accordion-no-release-dark-1280.diff.txt`) fails the case with `['Delivery windows', …(2)]` (`ff-case-mut2-accordion-no-release-dark-1280.log.txt:78-79`). The passing case reads `[]`, so the assertion distinguishes the two.

5. **Drive readings: CONFIRMED.**
   - `ff-out-R2-DRIVES-VENEER.json` and `ff-out-R2-DRIVES-RELEASE.json` differ only in pixel counts. Their match and paint patterns agree on every drive row:
     - press then scripted focus: `visible:false`, 0 pixels differing;
     - press, scripted focus and ArrowRight: `visible:true`, 0 pixels differing;
     - press then Tab: pixels paint (768/5176/1160/7766 for the release, 668/5164/1010/7748 for Veneer).
   - The rows that paint are the instrument's own positive control.
   - I read these files from the worktree, not from a retained copy (see referral R-a).

6. **Law: CONFIRMED.**
   - Searching the added lines for `as <Type>`, `any`, `@ts-`, a lint-disable comment, `vi.fn`/`spyOn`/`mock`/fake timers, a trailing `!` and `function` finds only the `as const` assertions at `ff-2.diff:824, 1457` and exported top-level declarations.
   - The only function literals are anonymous callbacks passed as arguments.
   - The moved tables live in `tests/setup.ts` with TSDoc.

**Outside the claims**

- **GUARD-TERM (vocabulary: one concept, one term).**
  - **What is wrong.** The pixel check is named "guard": `const guard = new FrameManager(…)` and `tmp/capture/guard/${state}` (`ff-2.diff:826-827, 1459-1460`). The suite and the guide already use "guard" for the frame guard over `tmp/capture/states`: `integration.test.ts:3236-3242` (`reading: 'guard'`) and the guide's "The guard's population is the frames on disk under the `tmp/capture/states` directory" (`ff-shared-2.patch:123`). The pixel frames sit outside that population.
  - **Why it matters.** Someone reading "the guard" in the guide or the artifact now has two candidates in one directory tree. A later edit to the guard's discovery could sweep `tmp/capture/guard` by name.
  - **What right looks like.** Name the pixel check for its concept, the outline reading: `tmp/capture/outline/painted` and `tmp/capture/outline/suppressed`, and a local name such as `frames`. Rename it in both cases and in the report.

**Attacked and held**

- **List-group reach and the pixel guard.** The reach assertion and the pixel guard are separate checks, and each fails on a different drive (scripted focus alone against scripted focus plus a key press). Neither is redundant.
- **Skip-link strip at 390 wide.** Where the link wraps, the strip spans the line's full width and reads 0.145. The suppressed reading of 0 shows the neighbouring text does not reach the strip.
- **`tmp/capture/guard` and the frame guard.** The directory is a sibling of `tmp/capture/states`, so it adds no frames to the frame guard's population. The collision is in naming only.
- **The kept grouped-alignment release.** The comment scopes its "guards nothing" claim to 1280 wide (`ff-2.diff:333-338`). Keeping one start state for every lifted frame is defensible.
- **Not raised (below the finding bar).** The `RING_SHADOW_CASES` remark claims the rows cover "each color syntax a computed shadow is serialized in" (`ff-2.diff:1915-1916`). This browser also serializes computed colors as `oklch` (`ff-final-2/dark-1280.txt:4`). The logic is unaffected.

**Referrals**

- **R-a, to the Orchestrator or checker (retention).** The report names `.orkestrel/veneer/units/ff-instruments/ff-final-2/` and `.../ff-probes-2/` (`b-focus-frame-report-2.md:23, 77, 193-194`). Neither path resolves under `/home/user/scaffold`. The files exist only under `/home/user/veneer-ff/tmp/units/`. The `log:` lines in `ff-mutations-2.log.txt` also name `tmp/units/…` paths, not the retained `ff-instruments/` copies. Copy the files and rewrite the paths before the tmp sweep.
- **R-b, to the objective lane.** Assigning `range-focus` added `specimen.querySelector<HTMLElement>('.form-range')` (`ff-2.diff:385`). That type argument narrows without a check, which amounts to an unchecked assertion. The same pattern was already in the baseline (`ff-2.diff:399`). Rule whether claim 6's `as` clause reaches it.
- **R-c, to the Orchestrator.**
  - The pointer probe records the parked pointer entering the valid and invalid controls and the floating field at dark-1280 (`ff-pointer-dark-1280.txt:5-14, 31-41`). Those releases have no watcher.
  - Whether a hover paint reaches those frames is not evidenced.
  - The guide gives the pointer as the reason only for the accordion (`ff-shared-2.patch:111-114`). Name a carrier or record it as inert.
- **R-d, to the Orchestrator.** R3 from round 1 (the box type written inline instead of named) has no carrier in `ff-audit-verdict.md:37-46`. Round 2 grew it to three sites: `computeCroppedEdges` box and frame, and the `computeRingBand` parameter and return (`ff-2.diff:1984-1986, 2020-2022`). The report assigns it to FRAME-HELPERS (`b-focus-frame-report-2.md:202`); confirm that assignment.

VERDICT: FAIL 3; outside the claims: GUARD-TERM
