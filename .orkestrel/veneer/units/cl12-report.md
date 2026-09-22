<!-- opus on native Opus 5, native subagent, clean context, sole writer in the Veneer checkout.
Dispatched from the CL11 landing eb1cd71. Retained 2026-09-22 from the agent's returned result.
Its brief is cl12-brief.md, amended after cl12-scope-read-report.md held it; its measurements are
cl12-terrain.md, which carries its own correction. This report corrects BOTH: the terrain's token
list was short by two names, and the brief's guide-reader population was short by three files. -->

# Unit CL12 report — the guide

The guide now carries a row for every shipped token, and the sentences this unit could put under a
reading say what the tree produces. One file changed: `guides/veneer.md`. `guides/README.md` needed
no change, and the reason is in § 8. All gates are green.

Two corrections to the campaign's own records are in § 9. Read them before accepting: the terrain
record's token list was short, and the brief's reader population was short.

## 1. Each retained bound, ruled

### `tmp/units/u7c-guide-bounds.md` — the U7e bounds

The terrain record rules these closed by U7e's accepted verdict at Veneer `7f6d5f6`, and forbids
re-opening them. What the tree says about each, with the evidence:

| Bound                                             | Ruling against the tree                                                                                                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons region and the entry's `Delegate`         | Closed already. § Showcase names the Buttons region and "its entry constructs a `Delegate` instance beside the showcase"; `app/browser/main.ts` constructs it.                 |
| Shell stylesheet's one layout class, no paint     | Closed already, as nothing to land: the guide carries no sentence about the shell stylesheet. A sweep for `shell` and `specimens` in the guide returns § Showcase prose only.   |
| Proof list gains `ButtonSection.test.ts`          | Closed already for the section link. The helper-proof half is out of scope: the terrain record rules that no guide row is written for a test helper.                                                       |
| Every recorded Button step has a live counterpart | Closed already. The Proof column's meaning is unchanged in the guide, and `tests/conformance.test.ts` compares each recorded step.                                             |
| Forced-colors row open, `MediaOptions` staged     | Closed already. The § Compatibility preamble states it: "the installed Test `MediaOptions` contract stages print and motion only".                                             |
| Focus-ring contrast readings                      | Closed by ruling, nothing in the guide. A sweep for `contrast` and for the recorded ratios returns no guide text. The carry file itself files these as the user's open design question. |
| Composed text contrast members below 4.5          | Closed by ruling, nothing in the guide. Same sweep, same result.                                                                                                              |
| Disabled host dimmed with element opacity         | Closed by ruling, nothing in the guide. `--vn-button-opacity` carries its own token row; no contrast sentence exists to correct.                                               |
| Capture registry and per-state frame scopes       | Closed by ruling, nothing in the guide. A sweep for `capture` and `frame` returns the `_iframe.scss` row and nothing else.                                                     |
| No fence constructs a `Delegate`                  | Closed already, and correct as it stands. `npm run test:guides` gates a titled `@example` against its guide fence and passes, so no fence is owed.                             |

### `tmp/units/prose-bounds-carry.md`

| Bound                                                    | Ruling against the tree                                                                                                                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Narrow the proof-subject sentence to "that file"         | Closed already. The § Styles scripts paragraph reads "a case reading that file". The premise holds: `tests/src/styles/tokens.test.ts:12` imports `../../../dist/src/styles/index.rtl.css?raw`, and the guide names no RTL artifact. |
| Departures' opening overclaims "in each of its tables"   | Closed already, and the landed sentence is true. `.claude/rules/workspace.md` in the scaffold checkout carries a styles row in its environment (`src/styles/`), alias (`@src/styles`), build-output (`dist/src/styles`), test-project (`src:styles`), and scoped-check (`src:styles`) tables, and in no other. Its proof table and its script prose carry none. |
| Contractions and passive voice at the old lines ~154-167 | Out of scope under the prose ruling. These are register, not truth.                                                                                                                                 |
| Bare-token register, package-wide pass                   | Out of scope under the prose ruling.                                                                                                                                                                |
| `tests/setupBrowser.ts` `@throws` agreement              | Closed already, and not this unit's file.                                                                                                                                                           |
| `app/browser` constructor and `#mount` seam              | Not a guide bound and not this unit's file. U7 owned it and has run.                                                                                                                                |
| Two deferral grammars                                    | Open and in scope. Settled under § 4. **The entry carries a false clause**: it names "the tokens reader from U3" as a reader of the § Tokens table. No such reader exists; see § 4.                  |
| Overlong prose line at the old `guides/veneer.md:543`    | Out of scope under the prose ruling, and ungated: `npm run format:check` runs `oxfmt`, which reflows no Markdown prose. Lines longer than the 100-column `printWidth` already sit at the § Styles helper paragraphs and § Departures, and the gate is green over them. |

## 2. The rows added

The terrain record named the container and gutter tokens. A registry sweep found the same gap under
two more names, so the rows landed cover `--vn-container-sm`, `--vn-container-md`,
`--vn-container-lg`, `--vn-container-xl`, `--vn-container-xxl`, `--vn-gutter-x`, `--vn-gutter-y`,
`--vn-text-mark`, and `--vn-surface-mark`. See § 9 for the correction that widening implies.

**Where each row sits.** The container and gutter rows form their own `Token | Value | Source |
Alias` table under § Tokens § Space, border, radius, and elevation, ahead of the gutter-and-gap
paragraph that already referred to "the default gutter tokens" without a row behind the phrase. The
mark rows join the § Text and surface table under the `Token | Light | Dark | Source | Alias` shape
that table takes.

**One row per token, never a range.** The section's older rows use range notation, such as
`--vn-gray-100` through `--vn-gray-900`. A range row cannot be read by a completeness check, which
is one reason the gap survived. Each added row names its token literally.

**Each value, and the reading behind it.**

| Token                 | Value      | Reading                                                                                                                          |
| --------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `--vn-container-sm`   | `540px`    | `grep -o -- "--vn-container-[a-z]*:[^;]*;" dist/src/styles/index.css` → `--vn-container-sm:540px;`                                |
| `--vn-container-md`   | `720px`    | the same command → `--vn-container-md:720px;`                                                                                    |
| `--vn-container-lg`   | `960px`    | the same command → `--vn-container-lg:960px;`                                                                                    |
| `--vn-container-xl`   | `1140px`   | the same command → `--vn-container-xl:1140px;`                                                                                   |
| `--vn-container-xxl`  | `1320px`   | the same command → `--vn-container-xxl:1320px;`                                                                                  |
| `--vn-gutter-x`       | `1.5rem`   | `grep -o -- "--vn-gutter-[xy]:[^;]*;" dist/src/styles/index.css` → `--vn-gutter-x:1.5rem;`                                       |
| `--vn-gutter-y`       | `0`        | the same command → `--vn-gutter-y:0;`                                                                                            |
| `--vn-text-mark`      | `marktext` | `grep -o -- "--vn-text-mark:[^;]*;" dist/src/styles/index.css` → `--vn-text-mark:marktext;`                                      |
| `--vn-surface-mark`   | `mark`     | `grep -o -- "--vn-surface-mark:[^;]*;" dist/src/styles/index.css` → `--vn-surface-mark:mark;`                                    |

Every value was read from the built cascade, and re-read from the cascade `npm test` rebuilt, so no
value comes from a partial.

**Each `Source`, and what declares it.**

- The container widths take `bootstrap`. `tests/fixtures/oracle/inventory.json` records
  `.container-sm` with `max-width: 540px` under `@media (min-width: 576px)`, and the same shape for
  each wider name. Bootstrap writes the width as a literal in its own breakpoint rule rather than as
  a root variable, so the `Alias` cell is `none`.
- The gutters take `bootstrap`. The same inventory records Bootstrap's `.container` declaring
  `--bs-gutter-x: 1.5rem` and `--bs-gutter-y: 0`. Veneer's aliases are real:
  `grep -o "[^{}]\{0,60\}{--bs-gutter-x:var(--vn-gutter-x)" dist/src/styles/index.css` returns the
  container family's rule and the `.row` rule, so the `Alias` cells name `--bs-gutter-x` and
  `--bs-gutter-y`.
- The mark pair takes `elements`. `src/styles/_tokens.scss` declares them beside the comment naming
  the CSS system colors the content calibration measured and Elements' own mark binding. Nothing
  aliases them: a search of the built cascade for a `--bs-*` declaration reading either name returns
  nothing, so each `Alias` cell is `none`.

**No gate could see the gap, and no proof could be made red for it.** This is the part
of TTTDD this unit could not run: the token table's completeness is gated by nothing, so there was
no command to record failing before the edit and passing after. The adjacent gate stops one step
short. `tests/src/styles/tokens.test.ts` asserts set equality between the registry and the `:root`
properties the built cascade declares, in both cascades, so a token declared and unregistered fails
there. No assertion reads the guide for the same set.

Closing it is a successor's work, not this unit's — a gate is outside the owned set, and the honest
fix touches the guide's older range rows as well.

- **Option A, recommended.** Add to `tests/guides.test.ts` an assertion that every member of
  `collectTokenNames(TOKEN_NAMES)` appears as a backticked span inside § Tokens, and convert the
  older range rows to literal rows in the same unit. Cost: the range rows for the palette, the gray
  ramp, the size scale, the display scale, the space scale, the breakpoints, the stacks, the radius
  scale, and the shadow rungs are rewritten. Gain: the check is a set comparison against a set that
  already exists, with nothing to interpret.
- **Option B.** Keep the range rows and teach the check to expand a `X through Y` cell against the
  registry's order. Cost: a parser for a prose convention, which is a second reader of the guide's
  grammar and drifts from it. Refused.

## 3. The promise sentence

**Measured first.** `grep -rn -- "--vn-surface-raised" src/styles/components/ src/styles/utilities/
src/styles/_reset.scss src/styles/_theme.scss` returns nothing: no component partial, no utility
partial, and neither the reset nor the theme partial reads the token. In the built cascade,
`grep -o "[^{};]*var(--vn-surface-raised)" dist/src/styles/index.css` returns three
`background-color` declarations, and reading their selectors shows the `pre`, `samp`, and `var`
rules and nothing else.

**What I did: deleted the promise and replaced it with the reading.** The paragraph now ends "No
other rule in the shipped cascade reads it." The sentence it replaced — "The component surfaces that
also consume it land with their components" — asserted a consumer set the tree has no member of and
a landing no unit owns in the record.

I replaced it rather than deleting it outright because the fact a reader needs is the same one the
promise was reaching for: whether anything else paints from this token today. The answer is now
stated and checkable by one command.

## 4. The deferral grammar

**Decision: the shapes stay different, and each subsection now says why.** No reader was touched,
and no reader was reached.

The constraint is one-sided, as the terrain record states, and one claim in the carry file about it
is false. `readDeferrals` in `tests/setupConformance.ts` selects blocks from the **Styles** section
alone (`selectSectionBlocks(document, 'Styles')`), requires the `Deferred selectors` subsection, and
requires the `Name`, `Owner`, and `Reason` columns. The `Deferred names` table sits under § Tokens, a
different level-2 section, so that reader never sees it. A sweep of `tests/`, `src/`, `app/`, and
`configs/` for `Deferred names` and for `Waiting on` returns one doc comment in
`tests/setupConformance.ts` and no reader. **There is no "tokens reader from U3".**

Unifying toward the read shape is impossible rather than merely out of scope, and that is a stronger
reason than the brief anticipated. `scanCompatibilityPresence` rejects a deferral whose name is
outside the official inventory. The § Tokens rows name `scroll-padding` on the document and the hint
surface, and a search of `tests/fixtures/oracle/inventory.json` for `scroll-padding` returns no
match. Moving those rows into the `Owner` and `Reason` table, or teaching that reader to read theirs,
turns the conformance proof red on "outside the official inventory".

Unifying toward the unread shape would strip the `Owner` column that `readDeferrals` requires and the
`Excluded` value `scanCompatibilityPresence` branches on. That direction reaches an off-limits
parser, so it stops here and is reported rather than attempted.

What landed instead: § Styles § Deferred selectors now names `readDeferrals`, the columns it reads,
and the refusal the conformance proof makes, and says that reader is why the table carries an owner
and a reason. § Tokens § Deferred names now says no reader parses it, that its names are Veneer's own
rather than official, and that each row therefore records what its name waits on.

## 5. The truth sweep

Each sweep names the instrument that ran it, and each instrument runs as `node <path>` from the
checkout root.

| Sweep                                                | Pattern and population                                                                                                    | Result                                                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Backticked tokens (`tmp/cl12/sweep.mjs`)             | Every `` `...` `` span in the guide, classified into paths, `--vn-*` names, and `--bs-*` names                            | Every `--vn-*` span is declared in the built cascade. Every `--bs-*` span is declared or referenced there, apart from the `--bs-btn-close-*` names the Deferred selectors table declares withheld, whose absence the conformance proof requires. |
| Repository paths (`tmp/cl12/paths.mjs`)              | Every `tests/`, `src/`, `app/`, `configs/`, `dist/`, `guides/`, `scripts/`, or `node_modules/` path, backticked or bare   | Every path resolves but `tests/setup.css`, which the same paragraph states Veneer does not carry. |
| Partial-to-proof mirror (`tmp/cl12/mirror.mjs`)      | Every `.scss` partial under `src/styles` against every `.test.ts` under `tests/src/styles`                                | Every partial has a same-named proof at the same relative path; the only extra proof is `integration`. |
| Guide-named style files (`tmp/cl12/files.mjs`)       | Every file under `src/styles` against the guide's whole text                                                              | Named nowhere: `components/_container.scss`, `components/_grid.scss`, `components/_link.scss`, `elements/_html.scss`, `elements/_body.scss`. |
| Behaviour claims (`tmp/cl12/claims.mjs`)             | Named claims about a resolved value, a layer's precedence, a declaration site, or a manifest field                     | Every claim confirmed. Two probes reported MISS and both were my pattern, not the guide: see the following note. |
| Ledger claims (`tmp/cl12/ledger.mjs`)                | Every § Compatibility obligation naming both a class and a token                                                          | The `mark`, `display`, and `vr` rows. The `mark` row was false; the others hold.       |
| Prose behaviour claims (`tmp/cl12/reads.mjs`)        | Every non-table sentence asserting a read, a paint, a declaration, or an answer, and naming a custom property             | Each sentence read against the cascade or the oracle. See the following corrections and confirmations. |

**The MISS readings were my pattern, not a defect.** The `./styles` exports claim reported MISS
because my regex expected an object; `package.json:40` is `"./styles": "./dist/src/styles/index.css"`
and the claim holds. The cascade-order claim reported MISS because the minified artifact carries no
comma-separated ordering statement; `tests/src/styles/index.test.ts` asserts the emitted order equals
`['theme', 'reset', 'base', 'elements', 'components', 'utilities']` and passes, so the claim holds and
is gated.

**What the sweep corrected.**

1. **The `.mark` ledger row was false.** It read "painting from the highlight aliases". The built
   cascade gives `.mark{color:var(--vn-text-mark);background-color:var(--vn-surface-mark)}`, which
   reads the mark pair and not `--bs-highlight-color` or `--bs-highlight-bg`. The Obligation cell now
   names the two tokens it paints from. The row's Component, Kind, Proof, and Status cells are
   untouched, so the conformance reader sees the same obligation.
2. **The proof-location sentence was false.** § Styles said "§ Tests names each proof under the
   `tests/src/styles/` directory", and § Tests links a fraction of them. The sentence now states the
   mirror the tree actually holds — one same-named proof per partial — and names what § Tests links.
3. **The Files table was incomplete under a sentence that enumerates.** "The following files carry
   the axis" preceded a table missing the container, grid, link, html, and body partials. Rows landed
   for each, worded from reading the partial.
4. **§ Tests was short of the class proofs.** Links landed for the button, link, container, grid, and
   table class proofs, the reset layer, and the gutter utilities, so the corrected sentence in
   § Styles is true of the section it names.
5. **The raised-surface promise**, under § 3.

**What the sweep confirmed, each by a run.** The stripe alias reads `--vn-state-stripe`; the table
active and hover accents resolve at 10% and 7.5%; each named aspect declares `--bs-aspect-ratio`;
the vertical rule reads `--bs-border-width` and paints at `0.25`; `--bs-border-width` aliases
`--vn-border-width`; `--bs-gray` and `--bs-gray-dark` read the gray ramp; the button's component
focus caller reads `--bs-btn-focus-box-shadow`; `--bs-btn-focus-shadow-rgb` is declared and read by
no Veneer rule; Bootstrap's `.text-muted` reads `--bs-secondary-color` in the pinned inventory; the
dark-only asset retunes are declared through the `$assets` map in `src/styles/_tokens.scss` with no
light counterpart; `[hidden]` is suppressed with `!important` inside the reset layer; the body reads
`var(--bs-body-text-align, start)`; the document declares `interpolate-size: allow-keywords`; the
container partial caps `.container` and `.container-sm` from 576px up; and § Showcase's region list
matches `Showcase.ts`'s `#mount` return, with `app/browser/main.ts` constructing the `Delegate`.

**The sweep's bound — what I could not reach.**

- **Every `elements` Source cell.** Each cites a reading taken from Elements' built showcase on
  2026-09-20. This checkout carries no Elements artifact, so no command here can confirm or falsify
  one. I checked that each such token exists and carries the value the guide gives; the provenance is
  unreachable from this tree.
- **Most `bootstrap` Source cells.** I checked the ones this unit touched against
  `tests/fixtures/oracle/inventory.json`, plus the stripe percentage and the `.text-muted` claim. I
  did not walk the remaining retained values against the oracle row by row.
- **The § Compatibility obligations beyond presence.** Presence is gated:
  `scanCompatibilityPresence` fails a shipped row whose inventory selectors or properties are missing
  from the cascade, and `npm run test:conformance` is green. The prose in an Obligation cell is
  gated by nothing, and I read only the rows naming both a class and a token. A cell describing a
  relationship in words alone was not individually checked.
- **§ Methods and § Surface.** Left to `npm run test:guides`, which compares each `Summary` against
  its doc block and each titled example against its fence.
- **Rendered appearance.** No capture was taken and none was in scope.
- **The `prove` tool.** Not reachable from this role's tool allowlist, as the brief settles. No
  receipt was issued for any reading here, and no test reading in this report is presented as one.

## 6. The unknowns

- **Does any shipped component read the raised-surface token?** No. Only the `pre`, `samp`, and `var`
  element rules read it, in the source and in the built cascade. § 3 carries the commands.
- **Can one deferral grammar be chosen without touching a reader?** No, in either direction, and for
  a stronger reason than a parser edit. § 4 carries it.
- **How far can the truth sweep reach?** The bound is in § 5. In one line: every path, every token
  name, every structural claim about a file or a manifest field, and every prose claim naming a
  custom property was run; provenance claims about Elements and the wording of individual ledger
  obligations were not.

## 7. The gate chain

Each ran from the checkout root, one command per call, logs under `tmp/cl12/`.

| Gate                        | Exit | Final result line                                                              |
| --------------------------- | ---- | ------------------------------------------------------------------------------ |
| `npm run format:check`      | 0    | `All matched files use the correct format.` / `Finished in 805ms on 208 files` |
| `npm run lint:check`        | 0    | no diagnostic output under `--deny-warnings`                                   |
| `npm run check`             | 0    | last project `check:app:browser` completed                                     |
| `npm run build`             | 0    | `✓ built in 595ms`                                                             |
| `npm run test:guides`       | 0    | `Test Files 1 passed (1)` / `Tests 18 passed (18)`                             |
| `npm run test:conformance`  | 0    | `Test Files 1 passed (1)` / `Tests 10 passed (10)`                             |
| `npm run test:policy`       | 0    | `Test Files 1 passed (1)` / `Tests 109 passed | 1 skipped (110)`               |

`npm run test:policy` is not in the brief's chain; I ran it because this unit writes authored
Markdown and that project sweeps authored Markdown for banned terms.

**Observation, not a criterion: `npm test` whole, exit 0.** Per project: `src` 51 passed,
`src:styles` 411 passed, `app` 26 passed, `journey` 88 passed with 4 skipped, `policy` 109 passed
with 1 skipped, `config` 173 passed with 1 skipped, `setup` 156 passed, `setup:browser` 42 passed,
`conformance` 10 passed, `guides` 18 passed. The authoritative run is the Orchestrator's after I
exit.

## 8. Diff and status

`git diff --stat`:

```text
 guides/veneer.md | 60 +++++++++++++++++++++++++++++++++++++++++++++++++-------
 1 file changed, 53 insertions(+), 7 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M guides/veneer.md
```

`tmp/` is gitignored in this checkout, so the instruments and logs this unit wrote do not appear.
`guides/README.md` is owned and unchanged: its § Tokens claim — "every `--vn-*` token the cascade
carries, its value and its source, and the `--bs-*` alias it answers" — was false before this unit
and is true after it, so the correction belonged in `veneer.md`.

## 9. What I could not close, and two record corrections

**Correction to the terrain record: the token gap was wider than the record's list.** The record
names the container and gutter tokens. A registry sweep against the guide's whole text found
`--vn-text-mark` and `--vn-surface-mark` in the same state: declared in `src/styles/_tokens.scss`,
carried in `src/core/constants.ts`, named nowhere in the guide. I added their rows under the
objective's own sentence, "Every shipped token has its row", rather than stopping over the
difference, and I am flagging it rather than absorbing it. After the edit, a re-run of the sweep
leaves only names a range row or a pattern row already covers — the palette, the gray ramp, the role
tiers and triplets, the size, display, space, radius, shadow, breakpoint, and stack families, and the
`-rgb` suffix rows.

**Correction to the brief: the guide's reader population is wider than the brief's list.** The brief
names `tests/setupConformance.ts`, `tests/guides.test.ts`, and `tests/setupStyles.ts` as the whole
population. `readDeferrals()` and `readCompatibility()` default to the guide's path, and
`tests/conformance.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupConformance.test.ts` each
call them with no argument, so each opens the guide too. Every one of them is off-limits under
"every other test file", so this changed nothing about what I touched. It changes what a successor
must check before altering a table's shape.

**Left open, by ruling.** The § Compatibility table's two granularities. Every row's granularity is
untouched, including the `mark` row, whose Obligation text alone changed. The cross-cutting
reconciliation unit owns it.

**Left open, for a successor.** The token-table completeness gate, with the option pair and the
recommendation in § 2.

**Not attempted, under the prose ruling.** Contractions, register, line width, and heading voice.
Overlong prose lines remain at the § Styles helper paragraphs, § Tokens, § Departures, and
§ Showcase; `npm run format:check` reflows no Markdown and is green over them.

**No deviation was raised.** The brief and the terrain record did not disagree with each other; the
record and the tree disagreed once, on the token list, and the objective's own sentence settled it.
No correction required a code change. The ancillary choices I settled inside my scope: where each new
row and sentence sits, each row's wording, the literal-row convention for the added tokens, and the
deferral grammar.
