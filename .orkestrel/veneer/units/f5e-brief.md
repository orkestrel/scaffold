# Unit F5e SETUP-CONVENTION — the root setup modules return to the fleet's fixed set

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at `/home/user/veneer`, from the
F9 landing commit `a162c91` on a clean tracked tree. Perform the assignment directly and spawn
nothing. Do not commit, push, install a dependency, or run a destructive command. Do not run
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands
the work.

## Objective

Veneer's root `tests/` holds only the setup modules the rules fix by environment — `setup.ts`,
`setupBrowser.ts`, `setupServer.ts`, `setupStyles.ts`, and the vendored `setupPolicy.ts` — with
one proof beside each. The user ruled on 2026-09-22 that Veneer follows what scaffold propagates
and the conventions in `AGENTS.md` and its rule files, with the styles surface and a future
`src/vue` environment as the only blessed differences. `tests/setupCases.ts`,
`tests/setupCalibration.ts`, `tests/setupConformance.ts`, and `tests/setupListeners.ts` are
outside that set and go back into it.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** The measurements:

- The fixed set: `/home/user/scaffold/.claude/rules/tests.md` "Place helpers by environment"
  (`tests/setup.ts` host-independent; `tests/setupServer.ts` Node-only helpers and `node:fs`
  loaders anchored to `WORKSPACE_ROOT`; `tests/setupBrowser.ts` DOM and browser helpers and setup
  CSS; `tests/setupStyles.ts` CSS and style helpers and the compiled cascade), and
  `/home/user/scaffold/.claude/rules/workspace.md` § Vitest projects (the `setup` project proves
  root setup behaviour in Node; `setup:browser` proves `setupBrowser.test.ts`).
- The fleet in practice: `/home/user/elements/tests/` and `/home/user/mailbox/tests/` hold exactly
  `setup.ts`, `setupBrowser.ts`, `setupServer.ts`, `setupStyles.ts`.
- The modules leaving: `tests/setupCases.ts` (1269 lines, the case tables, `MANDATED_TAG_PAIRS`,
  `ELEMENT_TAGS`) and `tests/setupCalibration.ts` (491 lines, the oracle value lists and the
  calibration readings), both split out of `tests/setupStyles.ts` by F5a at `984d062` with their
  proofs `tests/setupCases.test.ts` and `tests/setupCalibration.test.ts`; `tests/setupConformance.ts`
  (1236 lines; imports `node:crypto`, `node:module`, `node:fs`, `node:path`, `node:url`,
  `node:util`, `playwright`, `postcss`, `sass`) with `tests/setupConformance.test.ts`;
  `tests/setupListeners.ts` (11 lines: a document listener installed at module load, imported
  dynamically by `tests/src/browser/index.test.ts` so the proof can claim `recordListeners` sees a
  listener an imported module installs).
- Importers, by `grep -rln`: `setupConformance` — `tests/setupStyles.test.ts`,
  `tests/setupCalibration.ts`, `tests/conformance.test.ts`, `tests/setupCalibration.test.ts`,
  `tests/distribution.test.ts`, `tests/setupCases.test.ts`; `setupListeners` —
  `tests/src/browser/index.test.ts`; `setupCases` and `setupCalibration` — re-derive with the same
  command (F5a's report lists `tests/setupBrowser.test.ts` and every file under
  `tests/src/styles/**`).

Where this brief and the tree disagree, the tree wins, and you stop and report the disagreement
rather than resolving it.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`,
`/home/user/scaffold/.claude/rules/workspace.md`, `/home/user/scaffold/.claude/rules/typescript.md`,
`/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/architecture.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`.
Skill: none. Guide: `/home/user/veneer/guides/veneer.md` (§ Files and § Tests name the setup
modules) and `/home/user/veneer/ROADMAP.md` § Rulings (read, never edit).

**Installed primitives.** `@orkestrel/test` 0.0.20 and `@orkestrel/contract` as installed; you
add no helper.

**Host.** Linux, bash, Node 22; run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm `npm --version` prints `11.19.1`). Chromium 141.0.7390.37 at `/opt/pw-browsers`.
Foreground commands are capped at 10 minutes; `npm run test:src:styles` takes about one minute.

**Measurements.** In this brief's "Where the facts are". Re-take the importer lists first.

**Control identifiers.** none. Name every test for what it proves.

**Standing conditions.** The tracked tree is clean at `a162c91`; `tmp/` is untracked and
ignored. `tests/setupPolicy.ts` and `tests/policy.test.ts` are restored by `scaffold repair` and
off-limits; `npm run test:policy` is the sweep that reads the root's module population (its
`tests/**/setup*.ts` pattern and its mirror), so it is the gate that says whether a placement is
admitted. `vite.config.ts` discovers root setup proofs through `tests/setup*.test.ts`, so
removing a proof needs no config change; the `conformance` and `distribution` projects list
`./tests/setup.ts` as their only setup file and import the rest, so renaming the module they
import needs no config change either. `configs/**` and `vite.config.ts` are off-limits.

## Unknowns

- Whether the policy sweep admits a non-setup `.ts` module under `tests/fixtures/`. You settle it
  by running `npm run test:policy` after the move in Obligation 3; where it refuses, report the
  exact refusal and stop on that obligation only.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupCases.ts`,
`tests/setupCases.test.ts`, `tests/setupCalibration.ts`, `tests/setupCalibration.test.ts` (the
four are deleted), `tests/setupConformance.ts` and `tests/setupConformance.test.ts` (renamed to
`tests/setupServer.ts` and `tests/setupServer.test.ts` through `git mv`), `tests/setupListeners.ts`
(moved under `tests/fixtures/`), `tests/conformance.test.ts`, `tests/distribution.test.ts`,
`tests/setupBrowser.test.ts`, `tests/src/browser/index.test.ts`, every file under
`tests/src/styles/**` (import lines only), `guides/veneer.md` § Files and § Tests (the rows and
sentences that name a setup module).

**Shared (report-only).** `ROADMAP.md` (a patch for the F5a and F5b rows' module names).

**Off-limits.** `src/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`,
`package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/app/**`,
`tests/src/browser/**` other than `index.test.ts`, `tests/src/core/**`, `tests/fixtures/oracle/**`,
`README.md`, `ROADMAP.md`, and every guide section this brief does not name.

**What asserts the state this change ends.** The export inventory cases of the merged modules
(`tests/setupStyles.test.ts`'s and the two being folded in become one exact-set case);
`tests/setupConformance.test.ts`'s inventory case (renamed with its module); every proof under
`tests/src/styles/**` that imports a moved table; `tests/src/browser/index.test.ts`'s dynamic
import; `tests/guides.test.ts` over § Files; `tests/policy.test.ts` over the root module
population.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands, `grep`, `git mv`,
`git status`, `git diff`, and `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>`
scoped to files you own. No install, no commit, no push, no tree-wide mutating `format` or
`lint --fix`, no `git rm` of a file you did not fold (use `git mv` for the renames and delete the
folded files after their content lives in the target).

## Execution

A native subagent: perform the assignment directly and spawn nothing. Fold, rename, move, then
the importers, then the guide, then the gates.

## Obligations

### Obligation 1 — the styles setup module is one module again

Move every export of `tests/setupCases.ts` and `tests/setupCalibration.ts` back into
`tests/setupStyles.ts`, each once, unrenamed, with its declaration and doc unchanged except a doc
reference to the module or proof that moved; keep the module's sections readable (the case tables
together, the calibration together, the readers together) and its header sentence true. Move
their cases into `tests/setupStyles.test.ts`, and fold the three inventory cases into one exact
sorted-list comparison over the merged module. Delete the four files. Update every importer to
`./setupStyles.js` (or the relative form the file already uses). `tests/setupBrowser.ts` keeps its
`mandated` parameter on `scanPositionalPairs`; nothing under `tests/setupBrowser.ts` changes.

### Obligation 2 — the Node-only helpers are the server setup module

`git mv tests/setupConformance.ts tests/setupServer.ts` and
`git mv tests/setupConformance.test.ts tests/setupServer.test.ts`; rename the describe and the
header sentence to say what the module is (the Node-only helpers the conformance and distribution
proofs measure with: the digests, the readers over the guide and the built cascade, the oracle
recorder, the specifier reader, the sweeps); change no export's name or body. Update every
importer.

### Obligation 3 — the load-time listener is a fixture

Move `tests/setupListeners.ts` to `tests/fixtures/entryListener.ts` (`git mv`), keep its
content and its load-time behaviour, and point the dynamic import in
`tests/src/browser/index.test.ts` at it. Run `npm run test:policy`; where the sweep refuses a
`.ts` module under `tests/fixtures/`, stop on this obligation and report the refusal verbatim.

### Obligation 4 — the guide

§ Files names `tests/setupStyles.ts`, `tests/setupServer.ts`, and the fixture in their rows with
summaries that say what each holds, and no row names a deleted module; § Tests names the proofs
by their new paths. Keep every other sentence.

## Output

Write `./tmp/units/f5e-report.md` and return its full content as your final message, nothing else:
per obligation what changed with the files touched; the merged inventory's size in exports read
from the case; the policy sweep's reading on the fixture placement; the commands you ran with exit
codes, the gate chain run after your final edit and said to be so; `git status --porcelain` and
`git diff --stat`; the `ROADMAP.md` patch; every deviation and every claim of your own you flag as
unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a moved
export whose case pins it differently in its new home; the policy sweep refusing the fixture
placement; a gate that cannot reach green inside your owned files; a required file this brief
names that does not resolve. Decide, record, and carry on from: section order inside the merged
module, case titles, the fixture's exact file name within `tests/fixtures/`, doc wording.

## Acceptance criteria

1. `ls tests/*.ts` lists `config.test.ts`, `conformance.test.ts`, `distribution.test.ts`,
   `guides.test.ts`, `policy.test.ts`, `setup.test.ts`, `setup.ts`, `setupBrowser.test.ts`,
   `setupBrowser.ts`, `setupPolicy.ts`, `setupServer.test.ts`, `setupServer.ts`,
   `setupStyles.test.ts`, `setupStyles.ts`, and nothing else.
2. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
3. `npm run test:setup` and `npm run test:setup:browser` exit 0.
4. `npm run build:src && npm run test:src:styles && npm run test:src:browser && npm run test:conformance` exit 0.
5. `npm run test:guides` and `npm run test:policy` exit 0.
6. `grep -rn 'setupCases\|setupCalibration\|setupConformance\|setupListeners' tests src app guides configs vite.config.ts` prints nothing.
7. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The whole-chain `npm test` reading.

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return.
