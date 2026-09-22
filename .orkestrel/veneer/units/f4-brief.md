# Unit F4 HOST-OBSERVATIONS — host-varying assertions, receipts, and the browser proof surface

## Role and engine

`sol` on GPT-6 Astra, reached as `codex exec` (sandbox `workspace-write`, rooted at
`/home/user/veneer`), the sole writer in the Veneer checkout from commit `751c3ed` on branch
`claude/inspiring-allen-t4qzv1`. You are the bench engine reading this brief inside your own CLI:
perform the assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean` (the sandbox mounts `.git` read-only; a
file you must restore is rewritten to its original text and proved with
`git diff --exit-code -- <file>`). The Orchestrator lands the work.

## Objective

Make Veneer's browser proofs read the same on every named build and name the build in every
receipt: one event recorder in the browser setup module; the two red `src:browser` cases green by
reading inside the listener; the Button restoration proof over every initial state; the delegated
release timing stated in the guide; the fixture and the README receipts naming their browser build;
one term for the fixture registry; and the stripe scope assertion read in both directions.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact
lives in `f4-terrain.md` (retained beside this brief; the unit opened it as `./tmp/units/f4-terrain.md` in the Veneer checkout), with the command or record that produced it. Read it first,
whole. Where this brief and that record disagree, the record and the tree win, and you stop and
report the disagreement rather than resolving it.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` (the non-negotiables and design laws bind you; an external
delegate has no exemption); `/home/user/scaffold/.claude/rules/tests.md`,
`/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`,
`/home/user/scaffold/.claude/rules/architecture.md`, `/home/user/scaffold/.claude/rules/patterns.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`
(binds the guide paragraph, the README rows, every doc comment, and your report);
`/home/user/scaffold/.claude/rules/browser.md`. Skill: none. Guide:
`/home/user/veneer/guides/veneer.md` (the product record you extend by one paragraph) and
`/home/user/veneer/ROADMAP.md` § Rulings and § Standing conditions (read, never edit).

**Installed primitives.** `@orkestrel/test` `0.0.19`: read the declarations at
`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts` and
`/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts` before writing any
helper, and the guide `## Surface` in `/home/user/scaffold/guides/test.md`. A helper, guard, wait,
recorder, or deferred whose job an installed export does is a defect; the terrain names which
exports exist and which do not. `@orkestrel/contract` guards (`isRecord` and its siblings) are
installed; reuse them where a guard is needed.

**Host.** See the terrain § Tree and § Sandbox. Run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
and confirm `npm --version` prints `11.19.1` before the first gate. The sandbox keeps the host
network namespace for this launch, so vitest's browser projects and the Playwright recording run;
installs, lockfile changes, and live fetches stay forbidden all the same. A `git` command that
takes the index lock fails inside the sandbox; reading commands work.

**Measurements.** All in the terrain. Take none into this brief.

**Control identifiers.** none. Name every test for what it proves, never for the control or the
claim number that specified it.

**Standing conditions.** The tracked tree is clean at `751c3ed`; `tmp/` is untracked and ignored.
`ORACLE_REFRESH=1 npm run test:conformance` rewrites `tests/fixtures/oracle/button.json`; that is
the only way the fixture changes. Chromium on this host is `141.0.7390.37`; the two red cases are
red because of it, per the terrain, and not because of the engine.

## Unknowns

- What the serialized `class` attribute reads after `destroy()` for a host whose original
  attribute carried non-canonical whitespace or token order. Measure it in the restoration matrix
  and report each before-and-after string under § Output; the ruling under Obligation 4 says what
  to assert and what to record.
- What `browser.version()` returns for this Chromium. Record the exact string the refresh writes
  into the fixture.
- The whole-chain reading (`npm test`) on the finished tree. Report it as an observation; the
  Orchestrator's verifier takes the authoritative run after you exit.

## Scope

**Owned.** `tests/setup.ts` (types only), `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`,
`tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/fixtures/oracle/button.json`
(through the refresh command only, never by hand), `README.md` (the receipts table only),
`guides/veneer.md` (one paragraph, per Obligation 5), `tests/src/styles/tokens.test.ts`, and the
rename population the terrain § The `specimen` term lists (57 files, `tests/setupBrowser.ts` and
`tests/setupBrowser.test.ts` among them).

**Shared (report-only).** none.

**Off-limits.** `src/**`, `app/**`, `configs/**`, `package.json`, `package-lock.json`,
`tests/setupPolicy.ts` and `tests/policy.test.ts` (restored by `scaffold repair`),
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.test.ts`,
`tests/conformance.test.ts`, `tests/src/browser/Delegate.test.ts` (read it; edit nothing),
`tests/app/**`, `tests/fixtures/oracle/inventory.json`, `ROADMAP.md`, `guides/README.md`, every
file under `tests/src/styles/**` the rename population does not list, `dist/**` beyond what the
gates build. Finding a defect in an off-limits file is a report under § Output, never an edit.

**What asserts the state this change ends.** The export inventory case in
`tests/setupBrowser.test.ts` (a new export and the rename both make it false; owned). The
altered-fixture cases in `tests/setupConformance.test.ts` (the `browser` field makes their fixture
shape false; owned). `tests/conformance.test.ts` (reads the fixture; unchanged by design, and its
run is a criterion). The export inventory case in `tests/setupConformance.test.ts` (unchanged: you
add no export there; confirm). The export inventory in `tests/setup.test.ts` (unchanged: you add
types only to `tests/setup.ts`; confirm). Search bound for the rename: the terrain's strict grep.

**Tools and limits.** Your CLI's read, patch, and shell tools. Allowed shell: the gate commands the
terrain lists, `grep`, `git status`, `git diff`, `git log`, `node` for a probe under `tmp/probe/`
(delete every probe before you return). No install, no commit, no push, no tree-wide mutating
`format` or `lint --fix`: converge a file with `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <file>` scoped to files you own.

## Execution

You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Types first, then the implementation, then the proofs, then the prose, then the
rename as the last step, then the gates.

## Obligations

### Obligation 1 — the recorder rule

Add to `tests/setup.ts` the reading type an event recorder returns, and to `tests/setupBrowser.ts`
an exported helper that records it. Rulings:

- The reading is taken **inside the listener**, at delivery, and carries the event, its `target`,
  its `currentTarget`, its `relatedTarget` (as `undefined` when the event has no such member), and
  its `composedPath()`. Every property is `readonly` and single-word; `event`, `target`,
  `current`, `related`, and `path` satisfy the naming rules.
- The helper composes the installed `createRecorder` (it is the shell around that leaf, not a
  second recorder), subscribes one listener for one event type on one `EventTarget`, and takes an
  `AbortSignal` so cleanup is abort-driven. Name it in `{verb}{Noun}` form; `recordEvents` fits
  beside `recordListeners` and `recordState`.
- Prove it in `tests/setupBrowser.test.ts` on an attached host and on a detached host: the
  reading's `target` is the host on both, its `current` is the subscribed target, its `path`
  begins with the host, and the count follows delivery. Assert nothing about the stored event's
  `target` after dispatch: that value differs by build, and the rule is to observe such fields only
  inside the listener. Add the helper's name to the export inventory case.

### Obligation 2 — the two red cases

Repair the two cases the terrain names by reading the event's `target` (and any other
host-varying field) through the recorder from Obligation 1, inside the listener. Keep every other
assertion those cases make, including the hook recorder's count and the stored event's identity,
type, `bubbles`, `cancelable`, `defaultPrevented`, and `detail`. Weaken nothing.

Then sweep every owned file for a host-varying field read off a stored event after dispatch
(`target`, `currentTarget`, `relatedTarget`, `composedPath()`); the terrain gives the bound. Report
the sweep's pattern and result.

### Obligation 3 — receipts name the build

- `tests/setupConformance.ts`: extend `OracleFixture` with `readonly browser: string`, the
  recording browser's `browser.version()` string, set by `recordButtonOracle`. `scanOracleFixture`
  requires the field to be a string on a saved fixture and **excludes it from the metadata
  comparison**: the recording is compared across builds by design, and the field is provenance.
  Say so in the doc comment in one sentence.
- `tests/setupConformance.test.ts`: the altered-fixture case proves that a differing `browser`
  alone reports no difference, that a missing `browser` reports `Invalid Button oracle fixture`,
  and that a `version` change still reports the metadata difference.
- Re-record with `ORACLE_REFRESH=1 npm run test:conformance`, then run `npm run test:conformance`
  without the flag. Report the fixture's header diff (`git diff -- tests/fixtures/oracle/button.json | head -40`)
  and confirm no step reading changed beyond the header; if one did, stop and report it.
- `README.md`: rewrite the receipts table so each row names its browser build. The existing
  Chromium row names Chromium `153.0.8010.12` (Playwright revision `1243`, Windows, the 2026-09-20
  reading unchanged; the terrain § Receipts gives the sources). Add a row for Chromium
  `141.0.7390.37` (Playwright revision `1194`, Linux, 2026-09-22) whose reading is what you
  measured on this tree after your final edit: name the projects you ran and their result, and
  name the two repaired cases. The Edge and Chrome rows stay as they are. Write the rows under the
  writing rules (no `currently`, no `now`, no `should`; a date as `YYYY-MM-DD`).

### Obligation 4 — the restoration proof over every initial state

Extend `tests/src/browser/Button.test.ts` with a proof over the initial-state matrix: an absent
`class` attribute; `class="active btn"`; `class=" active  btn "`; `class="btn"`; `class=""`; each
combined with `aria-pressed` absent, `"true"`, `"false"`, and `"mixed"`. For each: construct,
`toggle()`, `destroy()`, then assert the `active` membership equals the original, every other
class token is kept in its original order, and `aria-pressed` presence and exact value equal the
original (absent stays absent). Compare the serialized `class` attribute before and after as a
measurement: where it differs only by token order or by whitespace collapse while membership and
the other tokens are intact, record the exact strings under § Output as an observation and do not
assert serialized equality (the documented contract is membership; `src/**` is off-limits); where
it differs in any other way, stop and report a defect. Keep the existing consumer-edit case as it
is: a fix must never restore an old attribute snapshot over a consumer's edit.

### Obligation 5 — the delegated release sentence

Add one paragraph to `guides/veneer.md` directly after the `ColorMode` paragraph that follows the
`## Surface` table, stating what the terrain § The delegation's release ordering measured: the
delegate acquires a host on its first delegated click; a host removed from the root, or moved
outside it, keeps its toggled state until the next click that reaches the root or the delegate's
destruction, whichever comes first, and is restored then; a host reinserted before that click is
reacquired. State the refusals nowhere in this paragraph (another unit records them). Run
`npm run test:guides` and `npm run test:policy` after the edit.

### Obligation 6 — one term for the fixture registry

Rename the registry sense only: `SpecimenManager` becomes `SceneManager` and the instance
`specimens` becomes `scene`, across the 57 files the terrain lists, by word boundary, as your last
edit before the gates. Rewrite the case titles and doc comments that call a mounted node a
specimen in that sense (for example "attaches a specimen the case can address") to the new term.
Leave `SPECIMEN_ATTRIBUTE`, `readSpecimen`, and every product-sense use untouched. Update the
export inventory case. After the sweep, the terrain's strict grep prints nothing and
`grep -rn 'readSpecimen\|SPECIMEN_ATTRIBUTE' tests/setupBrowser.ts` still finds both.

### Obligation 7 — the stripe scope assertion

In `tests/src/styles/tokens.test.ts`: make the mode-scope case assert the `--vn-` names of the
light scope and the dark scope against each other in both directions, and make the stripe case
assert the light scope contains the stripe name beside its dark assertion. Weaken nothing else.

## Output

Write `f4-report.md` (retained beside this brief; the unit wrote it as `./tmp/units/f4-report.md`) and return its full content as your final message, nothing else.
The report carries, in this order: per obligation, what changed with the files touched; the
commands you ran with their exit codes, the gate chain run after your final edit and said to be so;
the sweep pattern and result from Obligation 2; the serialized-class observations from
Obligation 4; the fixture header diff and the exact `browser` string; the `npm test` whole-chain
reading as an observation; `git status --porcelain` and `git diff --stat`; every deviation, and
every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a proof
that reddens on a property of `src/**`; a fixture step reading that changed beyond the `browser`
header; the sandbox refusing a write you need; a required file the brief names that does not
resolve; a gate that cannot reach green inside your owned files. Decide, record, and carry on from:
the wording and placement of the guide paragraph and the README rows; case titles; the recorder's
exact signature within the rulings; the order of the rename sweep.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup:browser` exits 0 with the recorder proof on an attached and a detached host
   present and the export inventory case green.
3. `npm run test:src:browser` exits 0; the two named cases are green and the restoration matrix
   cases are present.
4. `npm run test:setup` exits 0 with the `browser` provenance cases present.
5. `ORACLE_REFRESH=1 npm run test:conformance` then `npm run test:conformance` exit 0; the fixture
   header carries the `browser` string and no step reading changed.
6. `npm run test:src:styles` exits 0 after the rename; the terrain's strict grep prints nothing.
7. `npm run test:policy` and `npm run test:guides` exit 0.
8. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The `npm test` whole-chain reading; the serialized-class strings.

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return; your report
names what each auditor must find in them.
