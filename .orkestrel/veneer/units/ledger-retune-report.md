# LEDGER-RETUNE report

Every acceptance gate exits 0. A departure row's member follows the value each side resolves to in
Chromium. The ledger gate compares each canonical token's resolved value with its § Reference map
cell at every site that declares it, and names each `bootstrap`-sourced token that no row
witnesses. `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` are retired with their cases.
Deviation state: no stop. The ancillary choices are listed at the end.

## Evidence re-readings

Every reading was re-taken at `73326c7` (branch `unit/lret`, clean tree) and matched the brief:

- `tests/setupServer.ts` declared `Departure` (around line 146, with `declared`), `DepartureRow`
  (around line 162), `readDepartures`, `classifyDeparture` (text-only, returning `aliased` or
  `declared`), `collectValueGaps`, `scanLedgerDrift`, and `collectLedger`. `recordButtonOracle` calls
  `chromium.launch`.
- § Departures carried `declared` in its rows (search `| declared `). The dropdown caret paragraph
  (around line 4734) also named `declared` rows in prose, which the brief did not name. The three verdict rows
  read as the brief states, all `tokenized`.
- § Reference map carries the `Source` column (`elements`, `bootstrap`, `derived`).
  `tests/src/styles/tokens.test.ts` held the reference-map case, both retained-alias cases, and the md
  breakpoint case reading `RETAINED_LENGTH_ALIASES`. `tests/setupStyles.ts` exported both constants,
  and `tests/setupStyles.test.ts` listed and pinned them.
- The `readBootstrapCascade` remark named a browser-visible path in `tests/setupStyles.ts`. A grep of
  `tests`, `app`, `configs`, and `vite.config.ts` for `bootstrap.css` and `bootstrap/dist` found no
  such path.

## Resolver mechanism and timing

The `ValueResolver` class in `tests/setupServer.ts`, created by `createValueResolver(recorded,
emitted)`, launches Chromium the way `recordButtonOracle` does (`resolveBrowser`,
`resolvePinnedBrowser`, headless). It opens three pages: one per stylesheet and one neutral page.

1. Substitution. Each side's value is set on elements that `collectContextElements` builds from the
   row's selector: one element per compound, with the compound's tag, classes, and attributes. A
   `+` or `~` combinator places the element as a sibling. A custom property is set as itself, so it
   reads `inherit` and guaranteed-invalid the way the stylesheet gives them. A regular value that
   reads `var()` goes through an unregistered `--vn-probe-raw`. A regular value whose variable is
   missing becomes `unset`, which is how Chromium treats a declaration invalid at computed-value time.
2. Computation. The neutral page puts both substituted values on twin elements under a host at
   `font-size: 16px` and `width: 1000px`, with the row's mode applied as `color-scheme`. The mode is
   dark where the innermost `data-bs-theme` compound says `dark` (`matchesDarkScope`). Factors keep
   their defaults.
   - A regular property computes as itself. Each side uses the last value it writes that Chromium
     parses. `ValueGap.written` carries every value the release writes at the site. That covers the
     `-webkit-sticky` fallback before `sticky` and the caret selectors the release writes twice.
   - A custom property tries each probe in turn and uses the first one that parses both values. The
     registered syntaxes come first, from `PROBE_SYNTAXES`: `<length>`, `<number>`, `<percentage>`,
     `<length-percentage>`, `<time>`, `<angle>`, `<color>`, `<number>#`, `<length>+`,
     `<length-percentage>+`, `<custom-ident>`. Each syntax is registered twice with different
     initial values. A value is valid under a syntax exactly where both registrations read the same.
   - After the syntaxes, the standard properties in `PROBE_PROPERTIES` are tried: `background-image`,
     `box-shadow`, `font-family`, `transition-timing-function`. An empty or guaranteed-invalid custom
     property reads as the empty string.
3. Normalization. `normalizeResolvedColors` rewrites every `rgb()`, `rgba()`, and `color(srgb …)`
   value to 8-bit channels and alpha, the way Chromium stores a legacy color. A fully transparent
   color becomes `rgba(0, 0, 0, 0)`.
4. Undecided pairs. A pair gets no resolution in these cases: a side writes nothing, Chromium parses
   none of a regular property's values, no probe parses both custom values, or a computed value reads
   empty. Answers are cached per pair. A `resolve` call must finish before the next one starts.

Timing inside the conformance project: the instrument is `lret-instruments/probe/timing.probe.test.ts`,
run with `lret-instruments/probe.config.ts` (the conformance project settings), and its output is
`lret-instruments/probe/timing.txt`. Each run launches both resolvers, classifies 2235 gaps and both repaint
ledgers, and scans canonical values.

- Idle host (load 1.31–1.58): 2161–2226 ms total. Launch took about 650 ms and classification about
  1000 ms.
- Four concurrent runs (load 3.37–7.26): 4139–4841 ms total.

`LEDGER_TIMEOUT = 14_700` follows the `ORACLE_TIMEOUT` rule: twice the 4850 ms contended run, plus
5000 ms.

## Unknowns answered

- **Mechanism.** See the previous section. A departure uses two stylesheets: the release
  (`readBootstrapCascade()`) and the built cascade (`readBuiltCascade()`). The canonical scan uses the
  built cascade for both sides.
- **Which rows changed member.** Taken from the drift the gate printed after the classifier change.
  The run was `lret-instruments/lret-conformance-drift4.log.txt`, and the pairs are extracted verbatim in
  `lret-instruments/lret-drift-members.txt` as `row | old -> new`. Every change was `tokenized -> retuned`,
  `aliased -> retuned`, or `restated -> retuned`. The `restated -> retuned` rows were `.mark` and
  `mark` `padding`, `hr` `opacity`, `code` and `samp` `font-size` (both `code` rows), `kbd` `padding`,
  `table` `caption-side`, and `th` `text-align`. Every former `declared` row that the drift did not
  name kept the renamed member `restated`. The dropdown caret rows are among them: they resolve to the
  value the release's second rule leaves.
- **Witnesses.** Every `bootstrap`-sourced token has a witness. The first run named
  `--vn-surface-gradient`, because the registered `<image>` syntax keeps `color-mix()` and
  `transparent` unresolved, and the release's gradient ends in `rgba(255, 255, 255, 0)`. Two changes
  in the resolver closed it: the `<image>` syntax gave way to the `background-image` rung, and every
  fully transparent sRGB color normalizes to `rgba(0, 0, 0, 0)` (Chromium interpolates premultiplied).
  No token needed an `Upstream` locator.

## Changes by symbol

`tests/setupServer.ts`

- `Departure`: `declared` becomes `restated`, and `retuned` is added. `isDeparture` follows.
- `DepartureRow`: the TSDoc names the classifier and the resolver.
- New types: `ValueGap` (a row without its member, plus `written`), `ValuePair`, `Resolution`,
  `ContextElement`, and `DepartureLedger`.
- `CascadeLedger`: `departures` becomes `gaps`.
- `classifyDeparture(recorded, emitted, resolution)`: it returns `dropped` first, then `undefined`
  where no resolution exists, then `retuned` where the resolved values differ. Otherwise it names the
  text-only member: `fallback`, `tokenized`, `aliased`, or `restated`. It never reads the `Source`
  cell.
- `collectValueGaps` returns `ValueGap[]` carrying `written`. `collectLedger` returns `gaps`.
- `describeValueGap` is new, and `describeDeparture` is now built on it.
- New helpers: `classifyValueGaps` (async; undecided pairs take no member and are listed),
  `collectContextElements`, `matchesDarkScope`, `normalizeResolvedColors`, `scanCanonicalValues`
  (Ruling 3, R1), and `scanWitnesses` (Ruling 7).
- The `ValueResolver` class and `createValueResolver` are new.
- New constants: `PROBE_PREFIX`, `PROBE_SYNTAXES`, `PROBE_PROPERTIES`, and `LEDGER_TIMEOUT`.
- The `readBootstrapCascade` remark is true now (R2). It says that no browser project reads the
  stylesheet, and names the two pages it reaches: the recorder's scratch page and the resolver's
  release page.
- The `LEDGER_GUIDE` and `LEDGER_CASCADE` TSDoc said "a difference of every departure member", which
  is no longer true. It now says "every written shape the classifier reads".

`tests/setupServer.test.ts`

- New `describe('ValueResolver')`. Its resolvers launch in `beforeAll` with the `LEDGER_TIMEOUT`
  budget.
- The gap cases assert `describeValueGap` lines and `written`.
- The classifier case uses three arguments.
- The planted-world departure drift moved into the resolver describe.
- The export-list case and the frozen pins now cover the new constants.

`tests/conformance.test.ts`

- `describe('cascade ledger')` resolves in a `beforeAll`: departures, both repaint ledgers, and
  canonical values.
- New cases:
  - decides every difference (undecided list empty)
  - names the verdict rows by resolved value
  - the canonical comparison, with the coverage floor against `UNMAPPED_TOKENS` and the dark-scope
    control
  - the witness scan, with a control where every row is retuned

`tests/setupStyles.ts` and `tests/setupStyles.test.ts`

- Both constants are retired, along with their export rows and the Bootstrap-value pin.
- The `extractBootstrapVariables` remark no longer names the retired tables.

`tests/src/styles/tokens.test.ts`

- The reference-map case is retired; the ledger gate holds the same comparison now.
- Both retained-alias cases are retired.
- The md breakpoint case reads its alias from the § Departures row whose Veneer cell reads the md
  token, and its width from the § Reference map row.

`guides/veneer.md`

- § Departures: the preamble now describes resolution, witnesses, and the legend with `retuned` and
  `restated`.
- § Departures rows: `declared` becomes `restated`, and the drift's member changes are applied.
  `oxfmt` realigned the tables.
- § Outside the ledger: canonical values are now inside the gate.
- § Tests: the conformance and helper sentences are updated.

## Failing-first and green readings

The command is
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`.

- **Red, before any implementation** (`lret-instruments/lret-red-setup.log.txt`, load 10.19): `Tests 1 failed
  | 268 passed | 18 skipped (287)`. The `ValueResolver` suite failed in `beforeAll` with
  `TypeError: createValueResolver is not a function`, so its cases never ran; they are among the
  skipped. The one failed test was the existing oracle recorder, which timed out at 10100 ms under
  that load. That is a timing observation outside this change, and it passes in every later run.
  `lret-instruments/lret-red-resolver.log.txt` repeats the run filtered with `-t ValueResolver`: the suite
  shows as `FAIL`, and the run reads `Tests 133 skipped (133)`.
- **Green** (`lret-instruments/lret-setup.log.txt`, load 4.14): `Tests 290 passed (290)`.

The red run could not show each proof failing, because the whole suite failed in its hook. So each
proof was tied to its defect by a mutation of `tests/setupServer.ts`, restored byte for byte (`cmp`),
with `-t "ValueResolver|names each departure member"` (`lret-instruments/lret-mutations.sh`,
`lret-instruments/lret-mutation-*.log.txt`):

| Mutation | Proof that fails |
| --- | --- |
| `ignore-resolution` (the classifier drops the `retuned` line) | "classifies a pair whose values resolve apart as retuned, whatever its text reads", plus the classifier unit case and the planted-world case |
| `text-compare` (text instead of resolution decides `retuned`) | "classifies a pair whose values differ in text and resolve alike as its text-only member", plus the retuned, classifier, and planted-world cases |
| `route-undecided` (an unresolved pair falls back to `restated`) | "names each pair the resolver cannot decide, and classifies none of them", plus the classifier and planted-world cases |
| `canonical-self` (the cell is compared with itself) | "names a canonical token whose declaration resolves apart from its reference cell, at every site that declares it" |
| `witness-retuned` (retuned rows count as witnesses) | "names each bootstrap token no departure row reads at the release value" |
| `colors-raw` (no color normalization) | the resolve case and the sRGB color case |

## Plant table

Each plant was restored byte for byte, and the restoring `git diff --stat` is in its log. After the
witness plant, `npm run build:src:styles` rebuilt `dist` from the restored source
(`lret-instruments/lret-plant-rebuild.log.txt`, exit 0).

| Plant | Command | Failing assertion | Restored |
| --- | --- | --- | --- |
| `radius`: `--vn-radius-base` becomes `calc(0.75rem * var(--vn-factor-radius))` | `npm run build:src:styles` then `npm run test:conformance` | `AssertionError` in the canonical case: `--vn-radius-base \| :root \| — \| calc(0.375rem * var(--vn-factor-radius)) \| calc(0.75rem * var(--vn-factor-radius)) \| 6px \| 12px`, and the same line at `[data-bs-theme=dark]`. The consumer rows also drift to `retuned`. | `src/styles/_tokens.scss` byte-identical |
| `witness`: `--vn-radius-pill` becomes `40rem` in `_tokens.scss` and in its § Reference map cell | `npm run build:src:styles` then `npm run test:conformance` | `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []`, from the witness scan. The canonical case passes; the row drifts to `retuned`. | `src/styles/_tokens.scss` and `guides/veneer.md` byte-identical |
| `undecided`: the pair `.btn` `--bs-btn-padding-x` `1px` against `red`, added to the text-only proof's gaps | `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "text-only member"` | `AssertionError`: `+ "btn \| .btn \| --bs-btn-padding-x \| — \| 1px \| red"` | `tests/setupServer.test.ts` byte-identical |

## Gate table

The gates ran in the order listed (`lret-instruments/lret-gates.sh`). Each log is
`lret-instruments/lret-<gate>.log.txt` and ends in `exit=`.

| Gate | Command | Load | Result |
| --- | --- | --- | --- |
| check | `npm run check` | see log head | exit=0 |
| lint-check | `npm run lint:check` | see log head | exit=0 |
| format-check | `oxfmt --config .oxfmtrc.json --check` over the owned files | see log head | exit=0 |
| setup | the setup command from the previous section | 4.14 | 290 passed, exit=0 |
| build-src | `npm run build:src` | see log head | exit=0 |
| conformance | `npm run test:conformance` | 6.10 | 33 passed, exit=0. The three verdict rows read `retuned`, `tokenized`, and `retuned`. |
| build-src-styles | `npm run build:src:styles` | see log head | exit=0 |
| tokens | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/tokens.test.ts` | 4.55 | 29 passed, exit=0 |
| guides | `npm run test:guides` | 4.46 | 26 passed, exit=0 |
| policy | `npm run test:policy` | 4.46 | 109 passed, 1 skipped, exit=0 |

Observation, not a criterion: `npm run test:src:styles` over the whole project
(`lret-instruments/lret-src-styles.log.txt`) passed 115 files and 1507 tests with exit 0. Load was 4.42
before the run and 9.60 after.

## Diff, status, and shared-file patches

- Diff: `lret.diff` (`git diff 73326c7`). Status: `lret-status.txt`.
- Diffstat: `guides/veneer.md` 1074, `tests/conformance.test.ts` 137, `tests/setupServer.test.ts` 581,
  `tests/setupServer.ts` 869, `tests/setupStyles.test.ts` 21, `tests/setupStyles.ts` 94, and
  `tests/src/styles/tokens.test.ts` 143 lines changed. In total, 2039 insertions and 880 deletions.
- Shared-file patches: none.

## Deviation state and choices settled within scope

No stop condition fired. I settled the following choices inside owned files, and each one is open to
review:

- **Guide prose outside the named sections.** Each of these sentences became false because of this
  change, so I edited it: the § Reference map preamble and its comparison paragraph, the theme-scope
  sentence naming the tokens proof (around line 3942), and the dropdown caret sentence naming
  `declared` rows (around line 4734).
- **Test-file restructure.** The setupServer case "names a planted unrecorded difference, a planted
  stale row, and a planted unrecorded name" was split. The additions half stays in `server setup`,
  and the departures half moved into `describe('ValueResolver')`, because only that half needs
  Chromium.
- **API shape.** `collectLedger` stays synchronous and returns unclassified `gaps`. The async
  `classifyValueGaps` classifies them. The alternative was an async `collectLedger` that takes a
  resolver, which would put Chromium into every additions-only case.
- **Resolver probes.** The probe set grew past registered syntaxes to the `PROBE_PROPERTIES` rungs,
  because no registration parses shadows, font stacks, or easings, and `<image>` leaves gradient
  colors unresolved.
- **Resolver color normalization.** Color comparison uses 8-bit sRGB, and every fully transparent
  sRGB color is treated as one value.

## Observations for the next unit

- `th` `text-align` now reads `retuned`. The release's winning `-webkit-match-parent` computes to
  `left` on the neutral host, and Veneer's `inherit` computes to `start`. The used value is the same
  in LTR. The resolver reports what Chromium computes.
- `normalizeDeclaration` in `tests/setupStyles.ts` has no consumer left outside its own test. Its only
  consumer was the retired reference-map case. I kept it; this is a finding for the next unit.
- The first red run's oracle recorder timeout came at load 10.19. It passed in every later run.
