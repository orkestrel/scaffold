# Unit brief — U7-fix-a: the type stage's reading, classification, walk, and parser tests (probe)

Supersedes nothing. This is the first of two serial fix units for U7 (`u7-probe-typestage-brief.md`,
`u7-probe-typestage-report.md`); `u7-fix-b` follows it and owns the prose sweep. The findings this
unit carries come from `u7-audit-objective.md` (claims 5 and 14, the findings outside the claims) and
`u7-audit-subjective.md` (claim 5, F1, F3, F4, F5, F7, F10), reconciled in `u7-audit-verdict.md`.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in
`/home/user/fleet/probe` for the life of this unit.

## Objective

Land the code and test corrections the U7 audit round substantiated, so the type stage reads the
compiler's text rather than its exit code everywhere, classifies a diagnostic by what the claim
drafted, projects every issue path into the workspace, shares one workspace walk with the runtime
stage, and pins each diagnostic shape the parser handles.

## Context

- Read first: `/home/user/fleet/probe/AGENTS.md` (the same contract as scaffold's),
  `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`,
  `.claude/rules/tests.md` (§ line 39: a conditional skip cites the mechanism that makes it
  inapplicable), `.claude/rules/portability.md` § Paths and § Processes,
  `.claude/rules/documentation.md` § Parity, `guides/probe.md`.
- The working tree is dirty with U7's uncommitted work and stays so; commit nothing. `git status
  --short` at dispatch lists these paths and no other: `guides/probe.md`, `src/core/constants.ts`,
  `src/core/types.ts`, `src/server/Overlay.ts`, `src/server/helpers.ts`, `src/server/index.ts`,
  `src/server/parsers.ts` (added), `src/server/stages/RuntimeStage.ts`,
  `src/server/stages/TypeStage.ts`, `src/server/types.ts`, `tests/src/core/errors.test.ts`,
  `tests/src/server/Overlay.test.ts`, `tests/src/server/Probe.test.ts`,
  `tests/src/server/helpers.test.ts`, `tests/src/server/parsers.test.ts` (added),
  `tests/src/server/stages/TypeStage.test.ts`.
- Host: Linux, Node 22.22.2, `typescript` 6.0.3 installed in the workspace. Every test that builds a
  `TypeStage` or a `Probe` over this repository warms the declared projects first (about 12 s); use
  the existing `timeout` values as your guide. Run tests scoped to a file: `npx vitest run --config
  vite.config.ts --no-cache --reporter=dot --project src:server <file>`. Run no whole-suite gate;
  the Orchestrator takes those after you exit.
- Measured facts you rely on (2026-09-06, this host):
  - `tsc --showConfig -p <project>` on 6.0.3 with an unknown compiler option prints
    `tsconfig.json(1,40): error TS5023: Unknown compiler option 'bogus'.` on stdout, nothing on
    stderr, and no JSON; exit 1. On 7.0.2 it prints the resolved JSON with the option dropped; exit
    0 (`.orkestrel` record `m3m4-report.md` § Differences). A JSON syntax fault prints the recovered
    default configuration on both majors, exit 0.
  - `tsc --noEmit --pretty false` prints every diagnostic on stdout as `path(line,col): error
    TSnnnn: message`, with `path` relative to the process's current directory, one-based line and
    UTF-16 one-based column; elaboration lines follow indented; a diagnostic about the project or
    about no file prints `error TSnnnn: message` with no location; exit 2 on 6.0.3 and 1 on 7.0.2
    for any diagnostic (`m3m4-report.md`).
  - `tsc --showConfig` over this repository's root project and `configs/src/tsconfig.core.json`
    prints no absolute path: `rootDir`, `outDir`, and `paths` are spelled relative to the project
    file, and the key order differs between the majors.
- `TypeStage.#drafts` is a `Set<string>` of workspace-relative paths, the same spelling
  `relativeWorkspaceFile(this.#mirror, <absolute in mirror>)` produces, filled by `#inspect`
  before any `#check` and cleared by `#release`. A warming `#check` runs with no drafts.
- `escapesRoot(root, path)` is exported from `src/server/helpers.ts`.
- `src/server/index.ts` star-exports `helpers.js`, so a new exported helper needs no barrel edit;
  it needs a `guides/probe.md` helper-table row (parity is `tests/guides.test.ts`).

## Scope

Owned: `src/server/stages/TypeStage.ts`, `src/server/stages/RuntimeStage.ts`,
`src/server/helpers.ts`, `src/server/types.ts` (the `Diagnostic` interface and its TSDoc only),
`src/core/types.ts` (the `Issue` TSDoc `@example` only), `tests/src/server/helpers.test.ts`,
`tests/src/server/stages/TypeStage.test.ts`, `tests/src/server/stages/RuntimeStage.test.ts`,
`tests/src/server/parsers.test.ts`, `tests/src/core/errors.test.ts` (one call site), and in
`guides/probe.md` only the sentences that describe a mechanism this unit changes: the helper-table
rows for `loadWorkspaceModule`, `collectWorkspaceFiles`, and `scanDiagnostics`, the `Diagnostic`
Surface row, the digest paragraph beginning "The project digest is the digest of the
`compilerOptions` member" (about line 698), the paragraph beginning "**A read is contained lexically
only" (about line 778), and the paragraph beginning "**A diagnostic about a project belongs to the
workspace.**" (about line 347).

Off-limits: `package.json`, `package-lock.json`, every vendored file (`.claude/**`, `configs/**`,
`tests/setup*.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/guides.test.ts`),
`src/core/constants.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/validators.test.ts`, `tests/src/server/ProbeServer.test.ts`,
`tests/src/server/Probe.test.ts`, `src/server/Probe.ts`, every other sentence of `guides/probe.md`
(`u7-fix-b` owns them), and `tmp/` beyond `tmp/units/`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no
tree-wide `format` or `lint --fix`.

## Edits

1. **`#configure` reads the printed text, never the status.** Replace
   `const config = execution.status === 0 ? parseProjectConfig(execution.stdout) : undefined` with
   `const config = parseProjectConfig(execution.stdout)`. Spawn `--showConfig` with `cwd` the
   mirror against the same workspace-relative project spelling (the mirror mirrors the layout), and
   call `this.#refresh()` before that spawn on a cache miss, so the digest names the configuration
   the check applies and reads the project as the mirror holds it. Update the `#configure` and
   `#resolve` comments and the class TSDoc paragraph on the digest accordingly, and rewrite the
   guide's digest paragraph (about line 698): read against the mirrored copy with the mirror as the
   current directory, so the digest and the check read one set of files; a relative path that
   escapes the workspace root resolves against the mirror's own ancestors, and the mirror carries
   nothing such a path names. Keep the existing cache and the one-reading-per-stage behaviour.
2. **`#check` lets the diagnostics decide.** Replace the two throw branches after `scanDiagnostics`
   with one: throw the `instrument`/`malformed` fault only when `diagnostics.length === 0` and
   `execution.status !== 0` (an absent status counts as not zero). Its message is the trimmed
   stderr when that is non-empty; otherwise `The compiler reported no diagnostic and exited
   <status>` when a status exists, and `The compiler reported no diagnostic and was ended by a
   signal` when it is absent. Pass the message through `this.#translate`. A run that printed
   diagnostics is read from them whatever stderr carries, and a run that exited 0 with no diagnostic
   is clean whatever stderr carries. State that reading in the method comment and in the
   `Execution` TSDoc's existing sentence about the exit code only if that sentence becomes false;
   otherwise leave `Execution` alone.
3. **`#issues` classifies by what the claim drafted, and projects every path into the workspace.**
   Resolve `diagnostic.path` against the mirror. A diagnostic is the workspace's (`origin:
   'workspace'`, `code: 'malformed'`, thrown as today) when `diagnostic.path` is absent, or when the
   resolved file is not one of `this.#drafts` and its extension is `.json`. Every other diagnostic
   is a claimant issue. Its `path` is the mirror-relative spelling when the resolved file is inside
   the mirror; the workspace-relative spelling when it is outside the mirror and inside the
   workspace; and `normalizePath` of the resolved absolute path otherwise. Rewrite the `#issues`
   comment and the guide paragraph "**A diagnostic about a project belongs to the workspace.**" to
   this rule: a diagnostic against a `.json` file the workspace holds, or against no file, is the
   workspace's; a `.json` file the claim itself drafted is the claimant's like any other draft.
4. **One workspace walk.** Add `collectWorkspaceFiles(workspace: string): readonly string[]` to
   `src/server/helpers.ts`: the body of the two identical `#walk` generators, returning the absolute
   paths of every regular file under the workspace, skipping an entry named `.git`, `dist`, or
   `node_modules` at any depth and the directory `TYPE_MIRROR` names, and carrying no symbolic link
   (a `Dirent` that is neither a directory nor a regular file is skipped). Full TSDoc with
   `@remarks` stating the skip list, the unreadable-directory tolerance, and that a symbolic link is
   not carried, plus an `@example`. Delete both `#walk` generators; `TypeStage.#refresh` and the
   `RuntimeStage` call site iterate the helper's result. Keep each stage's remaining comment to what
   that stage adds. Add a guide helper-table row after `matchesLiveProcess`. Add a case to
   `tests/src/server/helpers.test.ts` over a scratch tree holding `src/a.ts`, `.git/HEAD`,
   `dist/a.js`, `node_modules/pkg/index.js`, and `tmp/type/1-x/b.ts`, asserting the
   workspace-relative sorted result is exactly `['src/a.ts']`; when the host can create a symbolic
   link, add `link.ts` pointing at `src/a.ts` to that tree and assert it is absent from the result.
5. **The symbolic-link ruling, pinned.** Add a `TypeStage.test.ts` case: a scratch workspace (shape
   as in `separates a malformed project…`) holding `src/core/real.ts` (`export const REAL = 1\n`)
   and a symbolic link `src/core/linked.ts` to it; a draft `src/core/reader.ts` importing
   `./linked.js`; assert the inspection reports one claimant issue at `src/core/reader.ts` whose
   message contains `Cannot find module './linked.js'`. Skip the case with `it.skipIf(!LINKS)`,
   where the module-scope `LINKS` is computed once by attempting `symlinkSync` in a scratch and
   reading success, with a comment citing the mechanism: a host that refuses `symlinkSync` with
   `EPERM` cannot hold the tree this case needs. Rewrite the guide paragraph "**A read is contained
   lexically only" to the ruling: the mirror carries regular files inside the workspace only; a
   symbolic link is not carried, so a file reached only through one is absent from the mirror and
   the compiler reports what its absence causes, as a claimant issue like any other; and a
   `Claim.project` that reaches outside the workspace through `extends`, `files`, `include`, or
   project references reaches nothing there.
6. **Parser shapes, pinned.** Add a `describe('scanDiagnostics')` block to
   `tests/src/server/helpers.test.ts` with one case per shape, each asserting the exact record
   list: a `\r\n`-separated two-diagnostic text yields the same records as its `\n` twin; the
   non-BMP fixture `src/a.ts(1,7): error TS1127: Invalid character.` followed by `(1,10)` and
   `(1,12)` yields characters 6, 9, and 11; a located diagnostic followed by two indented
   elaboration lines yields one record whose message joins the three lines with `\n`, indentation
   kept; an unlocated `error TS18002: …` followed by an indented line joins the same way; a
   `warning TS6133: …` line is a record; and a line that is neither (`Version 6.0.3`, a stack frame
   line ` at Object.<anonymous> (/x.js:1:1)` preceded by no diagnostic) yields no record. Name each
   case for what it proves.
7. **`Diagnostic.code` goes.** Remove the `code` member from `Diagnostic` in `src/server/types.ts`
   and its TSDoc example, from `scanDiagnostics` (keep the `TS\d+` token in both patterns so a line
   is recognized by it; capture nothing from it), from every test record, and from the guide's
   `Diagnostic` Surface row. Nothing consumes it.
8. **`loadWorkspaceModule` becomes `loadWorkspaceVitest`.** Rename the helper to
   `loadWorkspaceVitest(workspace: string): typeof VitestNode`, drop the specifier parameter, keep
   the body and the failure contract (`context: { name: 'vitest/node' }`), rewrite its TSDoc and
   `@example`, and update every call site: `src/server/stages/RuntimeStage.ts` (the import and its
   uses), `tests/src/server/helpers.test.ts` (two uses), `tests/src/core/errors.test.ts` (one use),
   and the guide helper-table row (name, signature, description; keep the row's position).
9. **Names.** Rename `#clear` to `#displace` (`clear` is fixed lifecycle vocabulary for resetting
   state, and this method removes files) and `#build` to `#createMirror` (`builds` in this class
   names incremental state). Update the comments that name them.
10. **`normalizeValue` remarks.** Restate the `@remarks` against the compiler's printed record:
    `tsc --showConfig` spells a path relative to the project file, so a printed record carries an
    absolute path only where a project declares one; rewriting a contained absolute path keeps one
    commit read at two roots to one digest; the key order is the compiler's and differs between the
    supported majors, so sorting removes a difference that means nothing. Keep the example.
11. **`Issue` example.** In `src/core/types.ts`, make the `@example` range a point
    (`end` equal to `start`), matching the remarks beside it.

## Unknowns

- Whether `it.skipIf` with a module-scope probe is the skip form `.claude/rules/tests.md` accepts
  in this repository: read § line 39 and the nearest existing conditional skip under `tests/`, and
  follow that form; report which you followed.
- Whether any existing `TypeStage.test.ts` case reads the digest of a project it edited on disk
  after constructing the stage (edit 1 reads the mirror, refreshed on a cache miss, so such a case
  still sees the edit). Run the file and report any case the change reddens, with its assertion.

## Output

Write `tmp/units/ts6-u7-fix-a-report.md` with: the file list touched; per edit one to three
sentences on what landed and the exact command and last lines of each scoped run you made; the
unknowns answered; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when
an edit conflicts with the objective, when a test outside your owned files reddens on a scoped run,
or when a skip form or a rename would change a file you do not own. Where a paragraph sits or which
heading it takes is yours to decide and record. Never widen the owned set.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check <each owned file>` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <each owned file>` exits 0.
3. `npx tsc --noEmit --project tsconfig.json` exits 0, and `npx tsc --noEmit -p
   configs/src/tsconfig.server.json` exits 0.
4. `grep -rn "loadWorkspaceModule\|#walk\|#clear\|#build(" src tests guides` prints nothing.
5. `grep -n "execution.status === 0" src/server/stages/TypeStage.ts` prints nothing.
6. The scoped runs of `tests/src/server/helpers.test.ts`, `tests/src/server/parsers.test.ts`,
   `tests/src/server/stages/TypeStage.test.ts`, `tests/src/server/stages/RuntimeStage.test.ts`,
   and `tests/src/core/errors.test.ts` exit 0. Report a timing-class failure (a deadline or a
   `timeout`) as an observation with the case name rather than as a criterion result; the
   Orchestrator re-runs it alone.
7. The new `scanDiagnostics` cases, the `collectWorkspaceFiles` case, and the symbolic-link case
   exist under the names you gave them, and the report quotes each name.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under
`.orkestrel/`.
