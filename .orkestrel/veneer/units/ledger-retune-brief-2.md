# Unit LEDGER-RETUNE round 2 — the resolver keeps every context a pair depends on, the canonical scan reads every site in every mode, and every proof is killed on the record

Successor to `ledger-retune-brief.md`, which stays in place unedited. What changed: round 1 was audited in
`lret-audit-verdict.md` (FAIL 2, 4, 6, 7, 9; outside the claims F1, F2, R1, R3). This round carries every one of those
findings and the subjective lane's non-blocking case notes, and nothing else. Round 1 is committed on `unit/lret` as
`7952712`; this round writes over it.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-lret` (branch `unit/lret` at `7952712`, round 1 over Veneer `73326c7`, `node_modules` hardlinked from
`/home/user/veneer`). The conformance project launches Chromium from a vitest worker, which a bench sandbox denies, so
the unit runs on the native writing lane. Start every shell command with `cd /home/user/veneer-lret &&` and give every
file tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`; the design
verdict `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md` (Rulings 1, 2, 3, and 7 bind); the round-1
brief `ledger-retune-brief.md` (its Scope, Host, and Objective still bind except where this brief overrides them); and
the audit record under `/home/user/scaffold/.orkestrel/veneer/units/`: `lret-audit-verdict.md` (the ruling; it wins
over the lane files), `lret-audit-objective-verdict.md`, and `lret-audit-subjective-verdict.md`. No skill applies.

## Objective

Every finding `lret-audit-verdict.md` rules is closed in code, proof, and prose: the resolver decides a pair alike only
where the two sides compute alike in every context their terms read; the canonical scan compares every site in every
mode it can apply in and pins each `bootstrap` token to the release value directly; every proof has a mutation or plant
killed with an assertion on the record; and the guide claims only what the gate does.

## Context

**Evidence.** Measured at `7952712`. Re-take each reading before editing, and report any that differ.
- `tests/setupServer.ts` holds `ContextElement` with the boolean `sibling` (around line 237), `collectContextElements`
  (around line 3500), `matchesDarkScope` (around line 3540), `normalizeResolvedColors` (around line 3575), the class
  `ValueResolver` (around line 3636) and its `#substitute` member (which reads `described.sibling`, around line 3815),
  `scanCanonicalValues`, `scanWitnesses` (around line 4068), `classifyValueGaps`, `PROBE_SYNTAXES` (around line 785),
  `PROBE_PROPERTIES` (around line 812), and `LEDGER_TIMEOUT = 14_700` (around line 495).
- `tests/conformance.test.ts` builds `repaints` from `collectLedger(repainted, …).gaps` (around line 195) and reads each
  `classifyValueGaps` result's `departures` (around line 224), never its `undecided`.
- `tests/setupStyles.ts` exports `normalizeDeclaration` (around line 709); `tests/setupStyles.test.ts` imports it (around
  line 312), pins it in the export list (around line 638), and holds its only cases (around line 3258).
  `normalizeDeclarationValue` is a different export and stays.
- The retained mutation driver `lret-instruments/lret-mutations.sh` pipes vitest through
  `grep -E "^ +(✓|×)|Tests "`, so its logs hold no failure message.

**The findings, as ruled.** Each Item in § Items names the finding it closes. The lane files carry the executed inputs;
read them for each finding before writing its proof.

**Shared files, told in advance.** MODAL and FACTOR land on Veneer's session branch before this unit; the landing
regenerates the dialog rows of § Departures from the gate after the merge. Do not anticipate them here.

**Installed primitives.** As round 1: `@orkestrel/test`, `@orkestrel/contract`, and the Chromium launch
`recordButtonOracle` makes. A helper whose job an installed export or an existing setup export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src` before
`npm run test:conformance`, and `npm run build:src:styles` before a styles run. Other worktrees run suites at the same
time; record `/proc/loadavg` beside every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/r2/`, never in the scratchpad. The round-1 records under `tmp/units/` stay as they are.

**Control identifiers.** The Item numbers and plant names are this brief's labels. Name each test for what it proves.

## Unknowns

- Which § Departures rows change member once the resolver varies context (Item 1). Take them from the drift the gate
  prints; never write them by hand. Report the list.
- Whether a real row's pair cannot be decided under Item 1's rule. If any can't, stop and report the list with each
  pair's two values and the context term that blocks it; do not route such a row to a member.
- The resolver's time after Item 1, under contention. Measure it and re-derive `LEDGER_TIMEOUT` by the `ORACLE_TIMEOUT`
  rule from the contended reading.

## Scope

**Owned.** The round-1 Owned set, unchanged: the named symbols of `tests/setupServer.ts` and every symbol this round
adds or renames there; `tests/setupServer.test.ts`; `describe('cascade ledger')` and its setup in
`tests/conformance.test.ts`; `normalizeDeclaration`, its import, its export-list row, and its cases in
`tests/setupStyles.ts` and `tests/setupStyles.test.ts`; `tests/src/styles/tokens.test.ts` for the cases round 1
touched; the `guides/veneer.md` sections round 1 touched (the § Tokens legend, the § Departures preamble and rows,
§ Reference map's preamble and comparison paragraph, § Outside the ledger, § Tests) and every row whose member changes;
`tmp/units/`.

**Off-limits.** As round 1: `src/**` except during a plant, restored byte-identically; `tests/setupBrowser.ts`;
`tests/setup.ts`; `tests/src/browser/**`; `tests/app/**`; `app/**`; `tests/fixtures/oracle/**`; `tests/service/**`;
the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`); `vite.config.ts`;
`package.json`; and `ROADMAP.md`.

**What asserts the state this change ends.** Every § Departures row whose member changes; the `setupServer.test.ts`
cases for each changed symbol and the export-list cases in `tests/setupServer.test.ts` and `tests/setupStyles.test.ts`;
`npm run test:guides`. Re-derive the set by running `npm run test:conformance` and
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`
after each type change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` and
`npm run build:src:styles` are allowed.

## Items

1. **Claim 2: the resolver is faithful.** Each bullet names the input the objective lane executed; each becomes a
   failing proof first.
   - `normalizeResolvedColors` rewrites a color only where it stands as a color value, never inside a string or a
     `url()`. `"color(srgb 1 0 0)"` and `"rgb(255, 0, 0)"` as quoted `content` values stay distinct.
   - The mode comes from the target's ancestry only. `[data-bs-theme=dark] + .btn` and `[data-bs-theme=dark] ~ .btn`
     resolve in light mode; `[data-bs-theme=dark] .btn` and `[data-bs-theme=dark] > .btn` resolve in dark mode.
   - Each element the resolver builds from the row's selector matches its compound: the type, id, class, and attribute
     selectors, including those inside `:where()` and `:is()`. The target matches `#sample` and
     `:where(button.page-link)`, and a custom property declared on either selector is read at the target. A compound the
     resolver cannot build a matching element for names the pair undecided.
   - A pair is alike only where both sides compute alike in every context their terms read. For each term that reads
     context, resolve under at least two settings of that context: the font size for `em`, `ex`, `ch`, `lh`, and a
     percentage of a font property; the containing block's size for any other percentage; the parent's value for
     `inherit`, `unset`, and `revert`; `color` for `currentColor`; and the direction for `match-parent` and a logical
     keyword. Where the resolver cannot vary a context a term reads, the pair is undecided. The objective lane's table
     under claim 2 gives the inputs each proof must decide: `1em` against `16px` and `50%` against `500px` apart,
     `calc(50% - 1px)` against `499px` apart, `currentColor` against `red` apart, `inherit` against `20px` apart.
   - Report how `inherit` and the other CSS-wide keywords compute after this change (subjective R2 (b)).
2. **Claim 4 and R3: canonical values.**
   - `scanCanonicalValues` compares a declaration made outside a mode scope in every mode, so
     `.btn { --vn-text-body-base: red }` is compared against the dark cell too.
   - Where both sides resolve empty, compare the written text, so `--vn-text-heading: initial` against a reference cell
     of `inherit` fails.
   - The witness scan compares each `bootstrap` token's own resolved value with the release value of the row that
     witnesses it, so a row that reaches the release value through arithmetic on the token does not witness it. The
     objective lane's `--vn-radius-pill` plant (the token and its cell at `40rem`, the alias at
     `calc(var(--vn-radius-pill) * 1.25)`) fails the gate with an assertion naming the token.
3. **R1: every repaint pair is decided.** The conformance setup reads both repaint results' `undecided` lists, and a
   case expects each empty.
4. **Claim 7: the context boolean reads as an assertion.** Rename `ContextElement.sibling` to `nested`, true where the
   element sits inside the one before it and false where a `+` or `~` combinator places it beside that one, at every
   site. If Item 1 reshapes `ContextElement` so that the field no longer exists, report the shape instead.
5. **F1: one comparison engine.** Retire `normalizeDeclaration`, its import, its export-list row, and its cases. Add a
   `describe('ValueResolver')` case that resolves custom-property pairs: `150ms` against `0.15s` and `15%` against
   `15.0%` alike, `15%` against `16%` apart.
6. **Claim 6: every proof is killed on the record.**
   - Write a successor driver `tmp/units/r2/lret-mutations-2.sh` that runs each mutation with vitest's full output,
     unfiltered, one log per mutation (`tmp/units/r2/lret-mutation-<name>.log.txt`), and restores each mutation
     byte-identically with the restoring `git diff --stat` in the log.
   - Pair one mutation or plant with each case in `describe('ValueResolver')` and in `describe('cascade ledger')`,
     including those the objective lane's two tables under claim 6 list with no paired run; a case that shares a
     mutation with another names it. A kill counts only where the log shows `AssertionError` for that case.
   - Give the probe-syntax case an input per syntax that only that syntax accepts among those tried before it, so
     removing a syntax fails the case.
   - Add a mutation for the context-element case (the `nested` flip) and for each Item 1 bullet.
7. **Claim 9, F2: the guide claims only what the gate does.**
   - § Reference map's comparison paragraph names the color forms normalized to 8-bit channels and no others, and its
     `150ms`, `15%`, and `16%` examples are Item 5's case.
   - § Outside the ledger's canonical sentence and the legend's witness sentence are true after Item 2.
   - § Outside the ledger's introduction lists its items in the order its paragraphs follow.
   - The § Departures rule for a site the release writes twice names the `pre` and `kbd` `font-size` rows beside the
     vendor-prefix example.
   - F2: if the `reboot` `th` `text-align` row still reads `retuned`, the legend states that `retuned` compares computed
     values and names this row: the release's `-webkit-match-parent` computes to `left` and Veneer's `inherit` to
     `start`, which align a header alike wherever the header's direction matches its row's.
   - Every sentence Items 1 to 6 make false is corrected; list each in the report.
8. **The subjective lane's non-blocking case notes.** Settle each note under claim 6 of
   `lret-audit-subjective-verdict.md` (the text-only case's `dropped` row, the retuned case's uncommented `restated`
   control, the context-element case's unnamed `matchesDarkScope` proof, and the witness fixture's `--vn-gray-3000`
   and `var(--vn-container-sm)` rows): retitle, comment, or correct each, and report which.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Write the failing proofs first for Items 1, 2, 3, and 5, and record each command and its failing count.
3. Implement Items 1 to 5. Regenerate the § Departures rows from the drift the gate prints.
4. Apply Items 7 and 8. Run the proofs green.
5. Measure the resolver under contention and set `LEDGER_TIMEOUT` (Unknowns).
6. Run Item 6's driver and the plants, each logged under `tmp/units/r2/`:
   - **`radius`**, **`witness`**, and **`undecided`**, as round 1 defines them;
   - **`pill`**: Item 2's `--vn-radius-pill` plant;
   - **`initial`**: `--vn-text-heading: initial` at `:root` in `src/styles/_tokens.scss`;
   - **`scoped`**: a `.btn { --vn-text-body-base: <the light cell> }` declaration that differs from the dark cell.
   Each fails with an `AssertionError` naming its token or pair, and each restores byte-identically.
7. Run each gate in Acceptance, logged to `tmp/units/r2/lret-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/r2/lret-report-2.md` and return the same text. It holds: the Evidence re-readings; per Item, what
changed by symbol and the failing-first and green readings with commands and counts; the rows whose member changed, as
the gate printed them; the mutation table (case, mutation or plant, log, the `AssertionError` line); the plant table;
the timing reading with its load and the derived timeout; the guide sentences changed; the gate table;
`tmp/units/r2/lret-2.diff` (`git diff 7952712`), `tmp/units/r2/lret-2-full.diff` (`git diff 73326c7`), and
`tmp/units/r2/lret-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- **Stop and report** when a change needs a file outside Owned; when a real row's pair is undecided under Item 1; when
  a `bootstrap` token has no witness under Item 2's stronger rule; or when a gate reads red outside the change's reach.
- **Settle yourself:** how the resolver varies each context, the names of the helpers it adds, the case titles, where a
  mutation hooks, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts
   tests/setupStyles.test.ts` passes, with Items 1, 2, 4, and 5's cases.
3. After `npm run build:src`, `npm run test:conformance` exits 0, with Item 3's case, and the three verdict rows read as
   round 1's Acceptance names them.
4. Each mutation in Item 6's driver and each plant in Execution step 6 fails with an `AssertionError`, per its log.
5. After `npm run build:src:styles`, `tests/src/styles/tokens.test.ts` passes under
   `npx vitest run --config configs/src/vite.styles.config.ts`.
6. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** The resolver's time inside the conformance project, and `npm run test:src:styles` over
the whole project, each with its load reading.

## Review evidence

The diffs and status, the mutation and plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra (objective
lane) and `reviewer` on Opus 5.5 (subjective lane), with `checker` on Sonnet for guide-row parity.
