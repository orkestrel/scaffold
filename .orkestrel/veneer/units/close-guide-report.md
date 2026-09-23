# CLOSE-GUIDE (`cg`) report — successor run 2

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-cg` (detached at `88684bc`). Effective
brief: `close-guide-brief-2.md` over `close-guide-brief.md`. This run continued from the first
run's uncommitted edits, kept every edit that met a ruling, and finished the rest. No commit, no
install, no `git checkout`/`restore`/`stash`/`reset`/`clean`. Deviation state: none.

## Touched files

- `guides/veneer.md` — R5 § Showcase order rule, R4 § Customization bound and palette sentences,
  R6 barrel sentences removed with one forms-order home in § Styles, R1 example stem table with a
  registry link, R10 § Styles fragment repaired, R7 whole-guide token-noun and `see` sweep fixes,
  and the rewrap so no code span splits across lines.
- `tests/guides.test.ts` — one case in the `execute` callback: every stem example names a
  registered scenario and that key's subject.
- `tests/src/styles/integration.test.ts` — one case: each palette paint keeps its value under the
  recipe's retune and moves under a `--vn-palette-blue` retune; `afterEach` releases staged media.
- `close-guide-sweep.md` (launch path `tmp/units/cg-sweep.md`) — the ruled sweep ledger.
- `close-guide-report.md` (launch path `tmp/units/cg-report.md`) — this report.

```text
$ git diff --stat
 guides/veneer.md                     | 1113 +++++++++++++++++-----------------
 tests/guides.test.ts                 |   24 +-
 tests/src/styles/integration.test.ts |   81 ++-
 3 files changed, 654 insertions(+), 564 deletions(-)
$ git status --short
 M guides/veneer.md
 M tests/guides.test.ts
 M tests/src/styles/integration.test.ts
```

`tmp/` is gitignored, so the ledger and this report do not show in the status.

## Shared-file patches

None. No shared or off-limits file was edited. The guide case imports `CAPTURE_KEYS` and
`CAPTURE_SCENARIOS` from `tests/setup.ts` (CLOSE-REGISTRY keeps both names under R2) and
`selectTableColumns` and `readTableCells` from `tests/setupStyles.ts` (CLOSE-MOTION adds
`REDUCED_MOTION` there and leaves both readers). Re-run `npm run test:guides` after those units
integrate.

## Measurements before any edit

Taken against `git show 88684bc:<path>`, because the first run had already edited the worktree.
The brief's § Showcase range (`3860`–`3960`) predates B-FORMS-LABEL-CASCADE. At `88684bc`,
§ Showcase spans lines 3977–4031, so the region grep used that range.

```text
$ grep -n "region" (88684bc guide) | awk -F: '$1>3977 && $1<4032'
3979 3980 3982 3983 3984 3985 3986  the opening enumeration (Showcase through Table)
3991 3993                            regions mount into `main`; each region by accessible name
3995 3996                            Breadcrumb, Badge, and Close enumeration
4000 4001                            the capture-registry paragraph
4018                                 "A Placeholder region, a Progress region, and a Spinner region follow the Table region"
4022                                 grow-spinner paragraph ("the declared region clips")
4026 4027 4028                       "A Validation region follows the Table region; … an Input group region follows the Close region"
$ grep -n "loads after\|loads before\|partial loads\|after the forms partials\|at the barrel's Bootstrap order\|each after the" (88684bc guide)
179 699 782 888 1033 1118 1199 1270 1333 1483 1527 1580 1625 1652 1676
$ grep -n "every derived tier" (88684bc guide)
2201:`@layer theme`, so an unlayered rule wins, and every derived tier and every `--bs-*` alias follows
$ grep -n "^| Veneer stem" (88684bc guide)
4067:| Veneer stem            | Subject                                               |
$ sed -n '150,165p' (88684bc guide)
the full `!important` paragraph (lines 152-159), then the repeated fragment starting mid-sentence at
line 160 ("layer, the calendar-picker indicator rule in the `elements` layer, and the color swatch
rules in the `components` layer carry one as well, …")
$ grep -n "it('" tests/src/styles/integration.test.ts (88684bc)
12 rescales spacing and retunes the primary role family from one unlayered rule
55 leaves a consumer rule reading the channel triplet on the old brand where the fill alone is overridden
68 carries the retuned brand into the dark island and into its own dark tiers
$ grep -n "execute\|it('" tests/guides.test.ts (88684bc)
35 }).execute(async ({ files, report, rows }) => {   plus the three package cases and the per-row parity cases
$ grep -n "export function read.*Table\|Table(" tests/setupServer.ts | head
(no output: tests/setupServer.ts has no table reader; the readers are in tests/setupStyles.ts)
$ grep -rn "CAPTURE_SCENARIOS\|CAPTURE_KEYS" tests/setup.ts | head
1314:export const CAPTURE_KEYS: readonly CaptureKey[] = Object.freeze([
1340:export const CAPTURE_SCENARIOS: readonly CaptureScenario[] = Object.freeze(
1341:	CAPTURE_KEYS.map((key) => key.scenario),
```

## Measurements after the edits

```text
$ grep -n "loads after\|loads before\|partial loads\|after the forms partials\|at the barrel's Bootstrap order\|each after the" guides/veneer.md
155:so the validation partial loads after the other forms partials: where a validation rule and a forms
182:The token proof executes the escape: that sheet loads after the shipped cascade and moves the
$ grep -n "every derived tier" guides/veneer.md          (exit 1, no match)
$ grep -n "^| Veneer stem" guides/veneer.md
4078:| Veneer stem        | Subject            | Frame                                                   |
$ awk (code span split across lines, fences excluded) guides/veneer.md   (no output)
overlong prose lines (>100 columns) not present verbatim at 88684bc: none
$ git diff --check                                         exit 0
```

## Criteria

1. **§ Showcase (R5, D17) — met.** No sentence enumerates regions or characterizes their order.
   The "cascade carries …" enumeration is a pointer to § Compatibility. The Content region's
   contents stay, as do the helper-key placement, the showcase button and `Delegate`, `control`,
   `main` with no id, the Vue paragraph, the grow-spinner paragraph, and the Form label region's
   specimens. Two dropped facts moved to their key's section: the Close region's specimens went to
   § Close classes, and the badge's dark surface was already stated in § Badge classes. This run
   restored the list classes' placement in Type ("the list and quotation classes sit in Type"),
   which the rewrite had narrowed to quotations.
2. **§ Customization (R4) — met.** The claim is bounded to tiers and aliases derived from the token
   you changed. The palette sentence has one home in § Customization. The select focus border and
   the control focus border sections gain their sentence, and § Close classes gains it for the
   literal focus shadow (it names `--bs-btn-close-focus-shadow`, which `_close.scss` declares). The
   pagination, list group, range, check, and progress sections already carried it; the first run
   added the moving property to the progress, range, and check sentences. The recipe proof case is
   `holds every paint on the release blue through the brand retune and moves it with the palette entry`.
3. **The barrel (R6) — met.** The grep returns the § Styles home (line 155) and the utility-escape
   line (182) alone. The floating-label and input-group sections keep their tie consequence and
   point at the forms order § Styles states.
4. **§ Tests stem table (R1) — met.** The stem rule paragraph stays. A sentence introduces the
   table as examples and links the registry. The table holds one resting element frame
   (`capped-container`), one driven state (`primary-hover`), and the page frame (`showcase`). The
   parity case is `names a registered scenario and the subject it declares in every stem example`.
5. **§ Styles fragment (R10) — met.** The fragment is gone. The full paragraph names the `[hidden]`
   rule, the calendar-picker indicator rule, and the color swatch rules.
6. **The sweep (R7) — met.** See `close-guide-sweep.md` (launch path `tmp/units/cg-sweep.md`). Every hit at `88684bc` and after the
   edits is a row with its ruling. Every row ruled fixed is gone from the edited guide, the rerun
   returns only permitted rows, and no ledger cell, fence, or `Summary` paragraph changed (the
   conformance and parity runs are green). This run fixed the last link hit: the § Styles forms-order
   link now follows `see`. It also corrected a first-run sweep edit that left a mid-sentence "and
   The `tests/src/styles/mixins.test.ts` proof".
7. **Format, lint, typecheck — met.** The commands and exits follow.
8. **Parity, conformance, scoped styles — met.** The commands and exits follow.

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/guides.test.ts tests/src/styles/integration.test.ts
All matched files use the correct format.                       exit 0
$ npm run format:check      All matched files use the correct format.    exit 0
$ npm run lint:check        (no diagnostics)                             exit 0
$ npm run check             tsc, check:src, check:app                    exit 0
$ npm run test:guides       Test Files 1 passed (1); Tests 19 passed (19)   exit 0
$ npm run test:conformance  Test Files 1 passed (1); Tests 21 passed (21)   exit 0
$ npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/integration.test.ts
Test Files 1 passed (1); Tests 4 passed (4)                     exit 0
```

Observation, not a criterion: `npm run test:policy` reports Tests 109 passed | 1 skipped (110),
exit 0. This run did not run `npm run test:app` or the journey.

## Failing-then-green runs

**Recipe proof.** The mutation was an in-memory plant in the case: after the specimens mount, the
`.pagination` rule's `--bs-pagination-active-bg` is set to `var(--vn-color-primary-base)` through
the CSSOM, which points the active page fill at the primary role. The plant was removed by the
reverse replacement, and the file's diffstat afterwards matched its diffstat before the plant.

```text
$ npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/integration.test.ts   (planted)
× holds every paint on the release blue through the brand retune and moves it with the palette entry
AssertionError: expected [ 'rgb(46, 125, 50)', …(7) ] to deeply equal [ 'oklch(0.48 0.255 264)', …(7) ]
Tests  1 failed | 3 passed (4)                                  exit 1
(same command, plant removed)  Tests  4 passed (4)              exit 0
```

**Guide parity.** Each plant was a temporary edit of the guide's example table, restored by the
reverse replacement.

```text
$ npm run test:guides   (stem `capped-container` planted as `capped-contaner`)
FAIL tests/guides.test.ts > names a registered scenario and the subject it declares in every stem example
AssertionError: expected [ 'showcase', 'primary-focus', …(135) ] to include 'capped-contaner'
Tests  1 failed | 18 passed (19)                                exit 1
$ npm run test:guides   (subject of `primary-hover` planted as `Toggle`)
AssertionError: expected 'Primary' to be 'Toggle'
Tests  1 failed | 18 passed (19)                                exit 1
$ npm run test:guides   (plants removed)   Tests 19 passed (19)    exit 0
```

## Rule sentences landed

§ Styles, the forms-order home:

> The barrel loads the forms partials in the order the release's `_forms.scss` partial imports
> them, so the validation partial loads after the other forms partials: where a validation rule and
> a forms rule tie on one property, the validation rule wins, as it does in the release. The
> `Bootstrap source order` case pins that sequence; see
> [Bootstrap conformance](../tests/conformance.test.ts).

§ Showcase, the order rule:

> After the Showcase region, the regions render in the order the `Showcase` class constructs them,
> one per section; see [showcase mounting and destruction](../tests/app/browser/Showcase.test.ts),
> which pins that order.

§ Showcase, the § Compatibility pointer:

> The cascade carries every `--vn-*` token, every `--bs-*` root alias Bootstrap 5.3.8 declares, and
> the document and body baseline; § Compatibility gives each shipped key and the classes it ships.

§ Customization, the bound and the palette sentence:

> Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
> `@layer theme` block, so an unlayered rule wins, and every tier and every `--bs-*` alias derived
> from the token you changed follows the override, because each one is an expression over that
> token. A component rule that paints the release's fixed blue reads `--vn-palette-blue`, or keeps
> the release's literal where its partial writes one, rather than the primary role, so a brand
> retune leaves that paint where the release puts it; the component's own section names the rule
> and the published property that moves it.

§ Form control classes and § Form select classes, the focused border:

> The border reads the palette entry rather than the primary role, so a `--vn-color-primary-base`
> retune leaves it on the release's tint, and a `--vn-palette-blue` retune moves it.

§ Close classes, the focus shadow:

> The shadow keeps the release's literal blue at a quarter strength rather than reading the primary
> role, so a brand retune leaves it, and the `--bs-btn-close-focus-shadow` property the `.btn-close`
> rule declares moves it.

§ Tests, the stem examples:

> The following table gives examples of the stem rule: a resting element frame, a driven state, and
> the page frame. The capture registry declares every stem and its subject; see
> [the capture registry](../tests/setup.ts).

## Decisions within the deviation contract

- The parity case finds the stem table with `selectSectionBlocks` and `findColumnIndex` from
  `@orkestrel/guide`, and reads it with the existing `selectTableColumns` and `readTableCells`
  readers. It does not use `selectSubsectionTables`, because that reader requires a level-3 heading
  and the stem table sits directly under `## Tests`. No parser was written.
- The recipe case reads the resting range thumb's declared paint on a probe element, because
  Chromium withholds a slider part's computed style. It also reads each paint under a
  `--vn-palette-blue` retune, so a paint that ignored every token would fail as well.
- The rewrap reflowed only the paragraphs whose code span crossed a line. Link text that the first
  run split across lines stays split: Markdown permits it, and no criterion addresses it.
- The sweep joins each block of consecutive non-blank lines before matching, so it covers more than
  the terrain's line grep. The ledger names its pattern and its paths.

## Instruments

The sweep, ruling, ledger, reflow, and replacement scripts are in the Orchestrator's scratchpad
under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/`: `sweep.py`,
`rule.py`, `classify.py`, `ledger.py`, `split.awk`, `reflow.py`, and `rep.py`. The baseline copy of
the guide is `base.md` in the same directory.
