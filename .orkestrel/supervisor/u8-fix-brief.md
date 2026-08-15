# U8 fix round — six carried findings from the two-lane audit

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **d184856**. Perform directly, spawn
nothing, no commits/pushes/installs. Read `AGENTS.md`, the applicable rules (tests, browser,
styles, documentation), and the `orkestrel-human-journey` + `orkestrel-polish-surface` skills'
references where an item names them.

## Reconciliation this brief carries (origin per item)

The U8-range audit ran two blind lanes (Sol analyst, journal `tmp/codex/u8-audit.jsonl`; Opus
reviewer). Claims 3, 4, 5, 6, 9 CONFIRMED by both. Claim 2 settled CONFIRMED by
Orchestrator-executed evidence (red log `tmp/redesign/u8b-red-proof.log`; isolated diff +5 lines).
Claim 8 ruled CONFIRMED: the guides edit was the Orchestrator's serial application of report-only
patches, the documented protocol; attribution recorded. Six findings are retained and carried
here.

## The items

1. **Portfolio membership enumerates the directory** (C1, both lanes). Today
   `portfolio.test.ts` compares in-memory lists; an orphan or stale frame in
   `tests/app/browser/__screenshots__/portfolio/` stays green. Add an always-on assertion that
   reads the portfolio directory through the runner's file access and asserts: every entry is a
   member of the registry-derived filename set, and every entry is non-empty. Missing frames
   remain the capture run's failure (that suite owns writing them). The proof must be able to
   fail: name the rival reading (an extra file present) and show the assertion rejects it in a
   probe before you trust it.
2. **The register filters wear the ring** (C7 + reviewer F2, verified at source). Halfmoon
   declares `.btn-check:focus-visible+.btn { … outline:0; box-shadow: var(--bs-btn-focus-box-shadow) }`
   at specificity (0,3,0); the app rule is (0,2,0), so the feed register filters
   (`FeedList.vue:114-128`) keep the quarter-opacity halo and the app ring lands on the clipped
   input. Add the `.btn-check:focus-visible + .btn` pair to `focus.css` so the LABEL wears the
   same opaque ring. Add a contrast reading that measures the label (the visible half), not the
   clipped input — `readFocus` resolves the focused element, which is the input, so the reading
   needs to target what a person sees; prove the new reading can fail before trusting it. The
   guide sentence "every control now wears the same opaque ring" then stays; verify it reads
   true against the shipped cascade after your change. The reviewer bounded the remaining
   outline-removing rules (`.nav-link:focus-visible`, `.navbar-toggler:focus-visible`,
   `.form-select:focus`, `.form-check-input:focus`, `.btn-close:focus`,
   `.accordion-button:focus`) at (0,2,0), losing to source order — spot-check that bound, and
   report (not fix) anything you find above it.
3. **`focus.css` records its real mechanism** (reviewer F1). The comment says element-beside-state
   and class-beside-state "weigh the same"; false — the tie exists only because `[tabindex]` is
   an attribute selector at (0,1,0), lifting the `:is()` compound to (0,2,0) against
   `.btn:focus-visible`, and source order then decides. Rewrite the comment to state that
   `[tabindex]` is the load-bearing term and that removing it breaks the tie.
4. **One concept, one term: `deriveAddress`** (reviewer F3, verified).
   `app/browser/helpers.ts:360` `deriveAddress(id: string): string` collides with
   `src/core/helpers.ts` `deriveAddress(unit): ExecutionContext` in one published vocabulary.
   Rename the app-side helper to `deriveLineage` (sibling of `matchesLineage`; the components'
   own comment says the address states the lineage). Update every consumer: `PhaseView.vue`,
   `TaskView.vue`, `WorkflowView.vue`, `tests/app/browser/helpers.test.ts`. The rendered
   "Address" label stays. Guide: the `@app/browser` surface table and flagship fence owe the
   renamed helper a row and a call — return these as report-only patches (guides off-limits).
5. **The capture run retains the full portfolio** (Sol outside finding, verified at
   `.agents/skills/orkestrel-polish-surface/references/capture-harness.md` "Capture the full
   portfolio"). The skill requires, per scenario: an accessibility snapshot (roles, names,
   states, focus order), an interaction log (each scripted interaction, trigger, observed
   result), and a console/error log. None are retained today. Extend the capture run to write
   them beside the frames for the registered matrix (gitignored like the frames), and re-run one
   full capture so the artifacts exist on disk. Follow the reference's shapes; do not invent a
   competing format.
6. **A test named for what it proves** (reviewer F4). `tests/app/browser/helpers.test.ts:622`
   "keeps a segment that already contains the separator readable as one segment" asserts the
   opposite (the segment collapses). Rename to what the assertion proves and record the collapse
   ambiguity as a deliberate product decision in a comment beside it. (Item 4's rename touches
   the same file; keep the two edits coherent.)

## Scope

**Owned:** `tests/app/browser/portfolio.test.ts`, `app/browser/styles/focus.css`,
`tests/app/browser/contrast.test.ts`, `tests/setupBrowser.ts` (reader/capture-harness additions
only — the existing readers stay byte-identical), `app/browser/helpers.ts`,
`app/browser/components/{PhaseView,TaskView,WorkflowView}.vue`,
`tests/app/browser/helpers.test.ts`, the capture-run harness files the polish-surface skill's
references fix, regenerated portfolio artifacts. **Off-limits:** `guides/**` (report-only
patches), `src/**`, `vite.config.ts`, `configs/**`, vendored files, `app/core/**`,
`app/server/**`.

## Environment facts

Native, listener-capable; Chromium at `/opt/pw-browsers`. The contrast and portfolio suites run
under `npm run test:app:browser`. Tree clean at d184856.

## Deviation contract

A conflict with any primary item stops the unit with expected/found/evidence. Ancillary choices
(comment wording, artifact file naming within the reference's shapes) are yours to decide and
record.

## Acceptance criteria

1. All six items closed; the new membership and label-reading proofs ran red first (or their
   negative control did) and green after.
2. `npx vitest run --project app:browser` fully green; the full gates
   (`format:check`, `lint:check`, `check`, `build`) green.
3. The guide patches returned verbatim; every other file's diff inside the owned list.

## Output

Touched files + diffstat; per-item proof with commands and tails (including the red/control run
for the two new proofs); the label reading's measured ratios both themes; the report-only guide
patches; `git status --porcelain`; deviations or none. No diary.
