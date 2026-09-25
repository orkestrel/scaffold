# Unit LEDGER-RETUNE — a departure's member follows its resolved value, the ledger gates canonical values, and every Bootstrap token has a witness

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-lret` (branch `unit/lret`, cut from Veneer `LANDING_HEAD`, the tree LEDGER-ADDITIONS lands on,
`node_modules` hardlinked from `/home/user/veneer`). The conformance project launches Chromium from a vitest worker,
which a bench sandbox denies, so the unit runs on the native writing lane. Start every shell command with
`cd /home/user/veneer-lret &&` and give every file tool an absolute path under it. Read, in order:
`/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`; and the
design verdict `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md` (Rulings 1, 2, 3, and 7 bind;
Rulings 4, 5, and 6 landed with LEDGER-ADDITIONS). No skill applies.

## Objective

A departure row's `Departure` member follows the value each side resolves to in Chromium: `retuned` where the emitted
value resolves to something other than the release value, and a text-only member otherwise. The ledger's gate also
compares each canonical token's resolved value with its § Reference map cell, and names every `bootstrap`-sourced token
that no departure row witnesses. `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` retire with the cases that read
them.

## Context

**Evidence.** Measured at `2d3224b` (LEDGER-ADDITIONS landed as `f855924` with its guide merge). Re-take each reading in
the worktree before editing, and report any that differ.
- `tests/setupServer.ts` declares `export type Departure = 'tokenized' | 'aliased' | 'declared' | 'fallback' |
  'dropped'` (around line 146), `DepartureRow` (around line 162), `readDepartures`, `classifyDeparture` (which returns
  `'aliased'` or `'declared'` from the text alone), `collectValueGaps`, `scanLedgerDrift`, and `collectLedger`.
  `recordButtonOracle` launches Chromium through `chromium.launch` in the same module (search `chromium.launch`).
- The guide's § Tokens › § Departures tables carry the `declared` member in many rows (search `| declared `). The rows
  the verdict names read: `btn` `.btn` `--bs-btn-font-size` `1rem` against `var(--vn-size-2)`, `tokenized`;
  `accordion` `.accordion` `--bs-accordion-btn-padding-y` `1rem` against `var(--vn-space-8)`, `tokenized`; `theme`
  `:root` `--bs-primary` `#0d6efd` against `var(--vn-color-primary-base)`, `tokenized`.
- § Tokens › § Reference map carries a `Source` column (`bootstrap`, `elements`, and the other values its legend
  names). `tests/src/styles/tokens.test.ts` holds the case `resolves every value the reference map states to the value
  its own token carries, in each mode`, and the retained-alias cases `resolves every retained color token to the value
  Bootstrap declares for its alias` and `resolves every retained length token to the length Bootstrap declares for its
  alias`. The case `moves the md breakpoint alias with a token override, and holds the condition the ramp compiled`
  reads `RETAINED_LENGTH_ALIASES` too. `tests/setupStyles.ts` exports both constants (search `RETAINED_COLOR_ALIASES`),
  and `tests/setupStyles.test.ts` lists and pins them.
- `readBootstrapCascade` in `tests/setupServer.ts` carries the remark "The browser-visible path remains in
  `tests/setupStyles.ts`", and `tests/setupStyles.ts` holds no such path.

**Carried findings.** Both are this unit's:
- **LEDGER-ADDITIONS R1** (`lad-audit-verdict.md`): a canonical token declared under a selector other than `:root` or a
  mode scope has a value neither ledger reads. Ruling 3's canonical-value comparison covers it, or the unit reports the
  list of such tokens.
- **E-ID-BUTTON-CLASSES R2** (`ebcl-audit-verdict.md`): the `readBootstrapCascade` remark names a path that does not
  exist. Make the remark true.

**Shared files, told in advance.** The engine session's J-ORACLE-RECORD changes `tests/setupServer.ts`,
`tests/setupServer.test.ts`, and `tests/conformance.test.ts` in its own worktree (D49). TAILWIND-RECIPE adds
`collectMovedLonghands` to `tests/setupServer.ts`. Change only what this brief names in those files; the landings
merge by hunk.

**Installed primitives.** `@orkestrel/test`, `@orkestrel/contract`, and the Chromium `recordButtonOracle` already
launches. Read their declarations under `node_modules/@orkestrel/` before adding a helper; a helper whose job an
installed export or an existing setup export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src` before
`npm run test:conformance`, and `npm run build:src:styles` before a styles run. Other worktrees run suites at the same
time; record `/proc/loadavg` beside every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** The plant names are this brief's labels. Name each test for what it proves.

## Unknowns

- How the conformance project resolves a pair in Chromium. Reuse the launch `recordButtonOracle` makes; resolve each
  pair in the row's mode at the default factors, in an isolated page that loads the built cascade and the release's
  stylesheet, and resolve a custom-property pair through a typed probe property registered for its syntax. Report the
  mechanism and the time the resolver takes inside the conformance project.
- Which rows change member. Take them from the drift the gate prints after the classifier change; never write them by
  hand.
- Whether every `bootstrap`-sourced token has a witness. If any token cannot have one for a stated reason, stop and
  report the list.

## Scope

**Owned.**
- `tests/setupServer.ts`: `Departure`, `DepartureRow`, `readDepartures`, `classifyDeparture`, `collectValueGaps`,
  `collectLedger`, the resolver and the witness scan it adds, and the `readBootstrapCascade` remark.
- `tests/setupServer.test.ts`: the cases for those symbols and the export-list case.
- `tests/conformance.test.ts`: `describe('cascade ledger')` and the cases the canonical comparison and the witness
  scan add.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: the retirement of `RETAINED_COLOR_ALIASES` and
  `RETAINED_LENGTH_ALIASES`, and the probe-property constant if it lives there.
- `tests/src/styles/tokens.test.ts`: the reference-map case (retire it, or keep it reading only what the ledger does
  not), the retained-alias cases, and the md breakpoint case's read of `RETAINED_LENGTH_ALIASES`.
- `guides/veneer.md`: the § Tokens legend for `Departure`, the § Departures preamble and every row whose member
  changes, § Outside the ledger, and § Tests entries for the changed cases.
- `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, restored byte-identically; `tests/setupBrowser.ts`; `tests/setup.ts`;
`tests/src/browser/**`; `tests/app/**`; `app/**`; `tests/fixtures/oracle/**`; `tests/service/**`; the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`); `vite.config.ts`; `package.json`; and
`ROADMAP.md`.

**What asserts the state this change ends.** Every § Departures row whose member changes; the `declared` rows, renamed
`restated`; every `setupServer.test.ts` case that builds a `DepartureRow` or asserts a `classifyDeparture` result
(search `'declared'` and `classifyDeparture`); the export-list cases in `tests/setupServer.test.ts` and
`tests/setupStyles.test.ts`; `npm run test:guides`. Re-derive the set by running `npm run test:conformance` and
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`
after the type change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` and
`npm run build:src:styles` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Write the failing proofs first, and record each command and its failing count: a pair whose values differ in text
   and resolve alike classifies as its text-only member; a pair that resolves apart classifies `retuned`; a pair the
   resolver cannot decide fails, naming the pair; a doubled canonical token fails the canonical comparison; a
   `bootstrap` token with no witness is named.
3. Implement Ruling 2: `retuned` joins `Departure` and outranks every member except `dropped`; `declared` becomes
   `restated` at every site.
4. Implement Ruling 1: the classifier reads the resolver's result, never the `Source` cell.
5. Implement Ruling 3: the ledger's gate compares each canonical token's resolved value with its § Reference map cell,
   through the same resolver, covering tokens declared under any selector (R1); the `tokens.test.ts` case that
   compared the same values retires or reads only what the ledger does not.
6. Implement Ruling 7: the witness scan names each `bootstrap`-sourced token with no witness row, and a gate case
   expects that list empty; retire `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` with their cases and pins, and
   keep the md breakpoint case reading the breakpoint alias from the ledger's own record.
7. Make the `readBootstrapCascade` remark true (R2).
8. Regenerate the § Departures rows from the drift the gate prints, and update the legend and § Outside the ledger. Run
   the proofs green.
9. Plants, each logged to `tmp/units/lret-plant-<name>.log.txt` and restored byte-identically, with the restoring
   `git diff --stat` reading:
   - **`radius`:** double `--vn-radius-base` in `src/styles/_tokens.scss`; `npm run test:conformance` fails with an
     assertion naming the radius token's canonical value.
   - **`witness`:** change one `bootstrap`-sourced token's value and its § Reference map cell together; the witness scan
     names that token.
   - **`undecided`:** an in-memory pair the resolver cannot decide, driven in `setupServer.test.ts`; the case fails
     naming the pair.
10. Run each gate in Acceptance, logged to `tmp/units/lret-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/lret-report.md` and return the same text. It holds: the Evidence re-readings; the resolver mechanism
and its timing reading; the Unknowns' answers; the changes, by symbol; the failing-first and green readings with
commands and counts; the rows whose member changed, as the gate printed them; the plant table (plant, command, failing
assertion, restored); the gate table; `tmp/units/lret.diff` (`git diff LANDING_HEAD`) and `tmp/units/lret-status.txt`.
State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- **Stop and report** when a change needs a file outside Owned; when a `bootstrap` token cannot have a witness; when a
  pair the verdict names classifies other than the Acceptance says; or when a gate reads red outside the change's
  reach.
- **Settle yourself:** the resolver's name and home, the probe-property constant's name, the case titles, and the
  prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts
   tests/setupStyles.test.ts` passes with the new cases.
3. After `npm run build:src`, the `.btn` `--bs-btn-font-size` row reads `retuned`, the `.accordion`
   `--bs-accordion-btn-padding-y` row reads `tokenized`, and the `theme` `--bs-primary` row reads `retuned`, and
   `npm run test:conformance` exits 0.
4. Each plant in Execution step 9 fails with an `AssertionError`, per its log.
5. After `npm run build:src:styles`, `tests/src/styles/tokens.test.ts` passes under
   `npx vitest run --config configs/src/vite.styles.config.ts`.
6. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** The resolver's time inside the conformance project, and `npm run test:src:styles`
over the whole project, each with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra (objective lane),
`reviewer` on Opus 5.5 (subjective lane), and `checker` on Sonnet for guide-row parity.
