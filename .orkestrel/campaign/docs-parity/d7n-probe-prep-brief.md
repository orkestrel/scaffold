# Brief — P.1 `d7n-probe-prep` (probe's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/probe` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a36d689`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

probe's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== probe 2026-09-07T16:43:53Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
105:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 777ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### probe (a36d689, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 36 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(3)
   tests/src/server/Probe.test.ts(1)
-- docs
   rows read: 0, disagreements found: 0
   exit 0
-- check
   exit 0
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  1 failed | 12 passed (13)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 4 | summary 3 | banned 1 | tests/setupServer.ts(3) tests/src/server/Probe.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for probe (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/probe`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a36d689`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 4 | summary 3 | banned 1 | tests/setupServer.ts(3) tests/src/server/Probe.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
- Guide `guides/probe.md`: 1122 lines. Headings:
    1:# Probe
    27:## Surface
    29:### Contracts
    54:### Constants
    72:### Errors
    83:### Shapes
    97:### Validators
    116:### Formatters and the token
    131:### Server contracts
    164:### The engine
    194:### Server helpers
    229:### Server parsers
    239:## Methods
    243:#### `ProbeInterface`
    250:#### `StageInterface`
    257:#### `TypeStageInterface`
    264:#### `LintStageInterface`
    270:#### `OverlayInterface`
    279:#### `ProbeServerInterface`
    286:## What a probe proves
    374:## Failures
    437:## Prerequisites
    485:## Registering the server
    591:## The claim that earns a receipt
    649:## Reading a receipt
    690:## What a receipt does not vouch for
    742:## What containment reaches
    811:## What the lint stage does not see
    826:## How the lint stage speaks the protocol
    873:## What the runtime overlay serves
    908:## Lifecycle
    1043:## Cost
    1079:## Tests
    1112:## See also
- Table headers in `guides/probe.md` (a header row is the row before a `| ---` row):
    34: | Name                | Kind      | Shape / Purpose                                                                                                                                                                                                                                                                                                                         |
    58: | Name                   | Kind  | Value / Purpose                                                                                                            |
    77: | Name                   | Kind     | Signature                                           | Behavior                                                                                                                                  |
    90: | Name            | Kind  | Describes                                                                               |
    102: | Name          | Kind     | Signature                                | Behavior                                                                                                                                                       |
    120: | Name                   | Kind     | Signature                                                 | Behavior                                                                                                                                                                                                |
    135: | Name                   | Kind      | Shape / Purpose                                                                                                                                                                                                                                                                                                                                                                                              |
    168: | Name           | Kind  | Implements             | Purpose                                                                                                                                                                                                                                                                     |
    198: | Name                       | Kind     | Signature                                                               | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
    234: | Name                 | Kind     | Signature                                      | Behavior                                                                                                                                                                                                             |
    245: | Method    | Returns            | Behavior                                                                                                                                                   |
    252: | Method    | Returns          | Behavior                                                                                                                                                                                   |
    259: | Method    | Returns            | Behavior                                                                                                                                                                                                                                                                     |
    266: | Method    | Returns          | Behavior                                                                                                                                                                                                                 |
    272: | Method   | Returns               | Behavior                                                                                                                                                                  |
    281: | Method    | Returns         | Behavior                                                                                                                                                                                                |
    405: | Party        | Code        | Raised when                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
    1051: | What                                                                     | Measured                     |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/probe.md`):
    3: > **The claim prover for the `@orkestrel` line.** `@orkestrel/probe` answers this question about a
    4: > proposed edit: does it compile, lint, and pass its test in this workspace? The type stage runs
    5: > the workspace's own compiler over a mirror of the tree, and the lint and runtime stages hold
    6: > resident Oxlint and Vitest engines. probe runs a claim's case and its negative control through
    7: > all of them, and returns a `Verdict` carrying every issue — and, when the case ran clean and the
    8: > control broke where it said it would, a `receipt`. Source: [`src/core`](../src/core),
    9: > [`src/server`](../src/server), [`src/bin`](../src/bin). Published through `@orkestrel/probe` and
    10: > `@orkestrel/probe/server`.
    11: >
    12: > **An agent is the caller this exists for.** Deciding whether an edit compiles by reasoning about
    13: > it costs more than asking, and the answer is a guess. A `Claim` states the edit and what would
    14: > falsify it; a `Verdict` answers with the tools the workspace's own gate runs.
    15: >
    16: > **Mechanism, not policy.** probe reports evidence and mints a receipt under stated conditions. It
    17: > holds no key, signs nothing, and compels nothing. It also **executes caller-supplied test code
    18: > with the privileges of the process that hosts it**, so give a probe a workspace and a caller you
    19: > already trust with a shell.
- Opening prose after the blockquote (first two lines):
    21: A `Claim`, a `Verdict`, and a `receipt` carry the package. A `Claim` is the question: a case, a
    22: control that must break, and the TypeScript project both are judged under. A `Verdict` is the
- README (`README.md`) first lines:
    # @orkestrel/probe
    
    Prove a claim about a code change with type, lint, and runtime evidence, from the workspace's own
    TypeScript, Oxlint, and Vitest.
    
    A claim carries a `case` — the edit you believe is correct — and a `control`, the same edit
    deliberately broken, naming the stage it must fail at. `prove` runs every stage over the case and
    the control and returns a `Verdict`. When the case ran clean and the control broke where it said it
    would, the verdict carries a `receipt`: a one-line token naming the claim, the stage, the tool
    versions, and the TypeScript project that judged the candidates.
    
    Read [`guides/probe.md`](guides/probe.md) before you make a claim. It states the prerequisites, the
- `## Patterns` fences, each with its nearest preceding heading:
    385: fence under "## Failures"
    490: fence under "## Registering the server"
    595: fence under "## The claim that earns a receipt"
    653: fence under "## Reading a receipt"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/errors.ts:106:export function createDestroyedError(subject: string): ProbeError {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/stages/TypeStage.ts:77:export class TypeStage implements TypeStageInterface {
    src/server/stages/LintStage.ts:54:export class LintStage implements LintStageInterface {
    src/server/stages/RuntimeStage.ts:111:export class RuntimeStage implements StageInterface {
    src/server/Overlay.ts:30:export class Overlay implements OverlayInterface {
    src/server/Probe.ts:63:export class Probe implements ProbeInterface {
    src/server/ProbeServer.ts:51:export class ProbeServer implements ProbeServerInterface {
    src/core/errors.ts:28:export class ProbeError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/stages/TypeStage.ts:1
    src/server/stages/LintStage.ts:1
    src/server/stages/RuntimeStage.ts:1
    src/server/helpers.ts:28
    src/server/Overlay.ts:1
    src/server/Probe.ts:1
    src/server/ProbeServer.ts:1
    src/server/parsers.ts:2
    src/server/types.ts:12
    src/core/shapers.ts:4
    src/core/validators.ts:11
    src/core/helpers.ts:8
    src/core/constants.ts:11
    src/core/types.ts:17
    src/core/errors.ts:3
- Drop-in sites (`tests/guides.test.ts`):
- `## Tests` paragraph naming checks: 1079:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.
5. **The manifest table.** `guides/README.md` lists its concepts under `## By concept` as a list, which `parseManifest` does not read (`npm run docs` reads `rows read: 0`). Replace the list with the `| Concept | Spec | Source | Tests |` table every other package carries (the shape at `/home/user/fleet/abort/guides/README.md:7-9`), one row per listed guide, keeping every link target; leave the directory index as it is.

## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`), `guides/README.md` (the `## By concept` table only). Off-limits: everything else, including `guides/**` (the `## By concept` table excepted), `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-probe-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
