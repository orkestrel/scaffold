# Audit claims — F4 HOST-OBSERVATIONS on `@orkestrel/veneer` at `751c3ed` plus the working tree

## Subject

The Veneer checkout at `/home/user/veneer`, HEAD `751c3ed` (branch `claude/inspiring-allen-t4qzv1`),
with the uncommitted F4 working tree: 66 modified files, no additions, no deletions. The chain:
run 1 on Astra stopped on a false sentence in the brief and wrote nothing; run 2 on Astra measured
the restoration matrix through the real engine and stopped on the absent-class-attribute reading
(no tracked change); run 3 on Astra wrote the recorder, the two repaired event cases, the fixture
provenance and the refresh, the engine's class-attribute restoration with its matrix, and the stripe
assertions, then stopped on the fixture's formatter reading; run 4, the Orchestrator on Opus 5,
formatted the fixture, wrote the README receipt rows and the guide's delegated-release paragraph,
renamed the fixture registry across the population, and ran the gate chain. The briefs are
`/home/user/scaffold/.orkestrel/veneer/units/f4-brief.md`, `f4-brief-2.md`, `f4-brief-3.md`, and
`f4-brief-4.md` over `f4-terrain.md`; the reports are `f4-report.md`, `f4-report-2.md`, and
`f4-report-3.md` beside them.

## What this round decides

Whether F4 lands as the foundation the accounting units build on. A landed defect in the recorder,
the engine's restoration, or the fixture contract is copied into every later component; a finding
here is cheaper than that.

## Already established — do not re-run

Verified by the Orchestrator directly on 2026-09-22, not taken from a writer's report:

- Chromium `141.0.7390.37` on this host nulls a stored event's `target` after dispatch on a detached
  host and keeps it inside the listener (`units/event-target-probe.md`).
- The re-recorded fixture's word-level diff against `751c3ed` is the one line `"browser":
  "141.0.7390.37",`; `oxfmt --write` produced the rest of its byte changes.
- The gate chain reading on the finished tree is in `units/f4-gates.log.txt` (every gate's exit code
  is printed on its `=== <gate> exit=` line); read that log rather than re-running any browser
  project, which a bench sandbox cannot run.
- The rename population is exactly the 57 files the terrain lists; no `SpecimenManager` or bare
  `specimens` identifier remains in `tests`, `app`, `src`, `guides`, or `README.md`; `readSpecimen`
  and `SPECIMEN_ATTRIBUTE` are untouched.

The run 3 report's red-then-green matrix reading (four failing rows before the engine change on the
`hasAttribute('class')` assertion, twenty passing after) is the writer's own reading and is **not**
established; claim 5 puts it on trial.

## Review evidence

`/home/user/scaffold/tmp/audit/f4-audit-evidence.md`: the status output, the diffstat, the core
diff (`f4-core.diff`, every file but the mechanical rename), the rename diff (`f4-rename.diff`), the
gate log, and the run 3 report. The subject is the tree itself; read the files the claims name.

## Numbered falsifiable claims

Attempt refutation. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot
decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a
proof, name the mutation that would make that proof fail and say whether its assertions distinguish
that mutation from the passing case. Do not hedge toward an imagined consensus. Assume this chain
has one more defect: runs 1 and 2 stopped on the brief, and run 3 wrote under a brief that had been
wrong twice.

1. **The recorder reads at delivery.** `recordEvents` in `tests/setupBrowser.ts` composes the
   installed `createRecorder`, subscribes one listener for one event name on one target under the
   supplied signal, and each reading's `event`, `target`, `current`, `related`, and `path` are the
   values at delivery. Its proof in `tests/setupBrowser.test.ts` covers an attached and a detached
   root, `related` present and absent, an unrelated event name, and release on abort. Mutation to
   name: a recorder that stores the event and reads `target` afterwards.
2. **Nothing was weakened in the two repaired cases.** "dispatches the completed state once as a
   bubbling non-cancelable event" (`tests/src/browser/Button.test.ts`) and "dispatches the supplied
   type and detail synchronously through the parent" (`tests/src/browser/helpers.test.ts`) assert
   every fact they asserted at `751c3ed` (identity, type, `bubbles`, `cancelable`,
   `defaultPrevented`, `detail`, counts, the events recorder's call list) and read `target` from the
   delivery-time reading; the stored event is still asserted by identity against that reading.
3. **No stored-event field is read after dispatch.** In the owned files, every read of `target`,
   `currentTarget`, `relatedTarget`, or `composedPath()` off an event sits inside a listener body;
   the sweep bound is the pattern `currentTarget|relatedTarget|composedPath\(|\btarget\b` over
   `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
   `tests/src/browser/*.test.ts`, `tests/setupConformance.ts`, and `tests/setupConformance.test.ts`.
4. **The engine change is three lines and restores absence.** `src/browser/Button.ts` records
   whether the host carried a `class` attribute at construction and, on `destroy()`, removes the
   attribute only when it was absent then and the class list is empty; every other engine line is
   unchanged; a consumer's own class edits survive (the consumer-edit case and the classless-consumer
   case); the guide's `destroy` summary and the doc block's description paragraph are unchanged and
   still true.
5. **The matrix proof binds to the defect.** With the three engine lines reverted, the matrix case
   "restores original membership and attribute presence for class=$classes and aria-pressed=$pressed"
   fails on `expect(host.hasAttribute('class')).toBe(classes !== undefined)` for the four
   absent-attribute rows and nowhere else; with the change in place every row passes. Name whether
   any other assertion in the case could pass a mutation that leaves `class=""` behind.
6. **The matrix asserts exactly the contract.** The case asserts `active` membership, the order of
   every other token, `class` attribute presence, and `aria-pressed` presence and exact value, and
   asserts nothing about the serialized `class` string, whose token order and whitespace the engine
   changes (`"active btn"` to `"btn active"`); `BUTTON_RESTORATIONS` in `tests/setupBrowser.ts`
   crosses the five class shapes with the four pressed values the brief named.
7. **The fixture's build is provenance, not a comparison key.** `OracleFixture.browser` is a required
   string; `scanOracleFixture` reports `Invalid Button oracle fixture` when it is missing or not a
   string, reports nothing for a differing `browser` alone, and still reports
   `Oracle fixture metadata or step membership differs` for a changed `version`; the altered-fixture
   case in `tests/setupConformance.test.ts` proves each; `recordButtonOracle` sets it from
   `browser.version()`; `npm run test:conformance` without the refresh flag passes against the
   committed fixture on this host.
8. **The receipts are true.** In `README.md`, the 2026-09-20 row names Chromium `153.0.8010.12`
   (Playwright revision `1243`, Windows) on the retained evidence
   (`/home/user/scaffold/.orkestrel/veneer/research/instruments.md`, the `userEvent.hover` row;
   `/home/user/scaffold/.orkestrel/veneer/units/cl5b-report.md`, the browser-selection reading), and
   the 2026-09-22 row's reading equals the gate log; the Edge and Chrome rows are unchanged.
9. **The delegated-release paragraph is true and proved.** Each sentence of the paragraph added
   after the `ColorMode` paragraph in `guides/veneer.md` § Surface matches `Delegate.#activate` and
   `destroy()` in `src/browser/Delegate.ts`, and a case in `tests/src/browser/Delegate.test.ts`
   exercises each sentence: acquisition on first click and reuse; removal restored and released on
   the next root click; movement outside the root likewise; destruction; reinsertion before that
   click keeping the engine and its state; reinsertion after release acquired again with a fresh
   engine. Name any sentence no case exercises.
10. **The stripe scope assertion reads both directions.** In `tests/src/styles/tokens.test.ts`, the
    mode-scope case asserts the light scope's `--vn-` names are in the dark scope and the dark
    scope's `--vn-` names are in the light scope, and the stripe case asserts the light scope declares
    `--vn-state-stripe` beside the dark assertion; a stripe declared at `:root` and in the dark scope
    but not the light scope reddens the file. Name the mutation and whether the file distinguishes
    it.
11. **The rename is complete, exact, and bounded.** `SceneManager` and `scene` replace the registry's
    class and instance in all 57 files and the export inventory; the class's registry-sense doc
    comments and the one case title that called a mounted node a specimen use the new term; every
    showcase-sense and element-sense use (`readSpecimen`, `SPECIMEN_ATTRIBUTE`, `data-specimen`,
    "oracle specimens", "No motion specimen") is byte-identical to `751c3ed`; the styles project
    passes.
12. **No installed export is duplicated.** No owned file declares a helper, guard, wait, or recorder
    whose job an `@orkestrel/test` `0.0.19` or `@orkestrel/contract` export does; `recordEvents` is
    the composition of `createRecorder` with one listener, which no installed export provides
    (`grep -n 'composedPath\|relatedTarget\|currentTarget'` over both Test declaration files returns
    nothing).
13. **The gate chain is green on the finished tree.** Every `=== <gate> exit=` line in the gate log
    reads `exit=0`, the two formerly red `src:browser` cases included.
14. **Scope is honest.** `git status --porcelain` lists only files the briefs own; `src/**` carries
    the `Button.ts` change alone; `tests/conformance.test.ts`, `tests/setupStyles.ts`,
    `tests/setupStyles.test.ts`, `tests/setup.test.ts`, `app/**`, `configs/**`, `package.json`, and
    `package-lock.json` are untouched; no probe file remains under `tmp/probe/`.
15. **Parity and prose hold.** `npm run test:guides` and `npm run test:policy` pass on the finished
    tree; the README rows and the paragraph carry no term the writing rules ban (`should`,
    `simply`, `easy`, `just`, `currently`, `via`, `e.g.`, `i.e.`, `etc.`) and no count stated as a
    number.
16. **The unit is coherent as a whole.** The `EventReading` and `ButtonRestoration` types belong in
    `tests/setup.ts` with single-word properties; `BUTTON_RESTORATIONS` belongs in the browser setup
    module as a case matrix; `EventReading.related` typed `unknown` is the honest type for a member
    an event may lack; the names `recordEvents`, `SceneManager`, and `scene` read as one vocabulary
    beside `recordListeners`, `recordState`, and `readSpecimen`. Would you ship this?

## Unknowns

Whether any Delegate case exercises reinsertion before the pruning click (claim 9); the lanes
report which case, or that none does.

## The threshold

A finding is worth more than a clean pass: the recorder and the restoration contract are copied into
every component that follows, and the fixture contract gates every later oracle.
