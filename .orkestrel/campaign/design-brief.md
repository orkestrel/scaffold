# Design round: Windows wave 2 — one brief, two blind lanes

## Role and engine

This brief goes independently to the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-5.6 Sol). Each lane works from this brief and its own reading of the named files,
blind to the other lane. Perform the assignment directly and spawn nothing. You are read-only:
propose, never edit.

## Objective

Rule on the design of the changes below so one reconciled plan can dispatch implementation units.
Every subject ends with a concrete API shape, mechanism, test plan, and documentation obligation —
or a reasoned refusal with the smaller alternative.

## Context

Repositories: `C:/Users/mikes/WebstormProjects/test` (`@orkestrel/test` 0.0.7, source now local),
`C:/Users/mikes/WebstormProjects/probe`, `C:/Users/mikes/WebstormProjects/scaffold`.
Authority, in order: `AGENTS.md` (any repo root — identical contract), `.claude/rules/names.md`,
`.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`,
`.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`. Guides:
`test/guides/test.md` (or the guide file the repo carries), `probe/guides/probe.md`. Skill: none.

Host facts, all measured on this host on 2026-08-21 (Windows 11, Node v24.18.1, NTFS, no
Developer Mode); the instrument scripts are `junction-facts.cjs` and `badname-facts.cjs` and the
raw outputs are in `scaffold/.orkestrel/campaign/measurements.md`:

- `symlinkSync` bare, with type `file`, and with type `dir` all throw `EPERM` here. Type
  `junction` succeeds for a directory source.
- A junction to an existing directory: `lstatSync().isSymbolicLink()` true,
  `lstatSync().isDirectory()` false, `statSync().isDirectory()` true, `readlinkSync` and
  `realpathSync` resolve, reads pass through, occupied target throws `EEXIST`, `rmSync` removes
  the link and leaves the destination, `unlinkSync` works.
- A junction created from a RELATIVE source rewrites its link text to the absolute path.
- A DANGLING junction (missing source) is creatable; lstat reports a symbolic link; `existsSync`
  false; `readlinkSync` returns the missing path.
- A junction whose source is a FILE is created silently broken: later reads fail `ENOENT`.
- An overlong (300-char) component, a name carrying `<` or `?`, a missing parent, and an ordinary
  missing file ALL report `ENOENT` from both `lstatSync` and `writeFileSync` here. `mkdirSync` of
  an overlong component reports `EINVAL`. `writeFileSync` to a path whose final segment is `NUL`
  succeeds by writing to the device. `ENAMETOOLONG` never fires on this host.

test package state: gates all green here; `test:src` reports `153 passed | 26 skipped (179)`.
The skips gate on `tests/setupServer.ts` capability probes — `SYMLINKS` (false here),
`POSIX_MODE`, `CASE_SENSITIVE_FS`, `RAW_BYTE_NAMES`. The whole `link` describe block
(`tests/src/server/factories.test.ts:455`) gates on `SYMLINKS`, so `link` has no coverage on this
host. `createScratch().link` is `src/server/factories.ts:122-129`: containment check, `mkdirSync`
of the parent, then bare `symlinkSync(source, candidate)`. The `ScratchInterface.link` TSDoc is
`src/server/types.ts:52-63` and promises: creates a symbolic link at a contained target, source
may be outside and is not containment-checked, throws when the host refuses to create the link.

Downstream fact: `@orkestrel/test` 0.0.7's `link` failing `EPERM` is the single cause of 34 of
probe's 35 remaining test failures on this host (probe links `node_modules` directories into
scratch trees). scaffold's suite is green here and also consumes `@orkestrel/test`.

Fleet precedent, decisive for subject A: scaffold's `tests/setupServer.ts:332-362` wraps
`createScratch` in a local `createWorkspace` whose `link` bypasses `scratch.link` and calls
`symlinkSync(target, destination, 'junction')` directly, with this comment: "`symlinkSync`'s
`'junction'` type is not an option `ScratchInterface.link` takes, so this call site stays on
`node:fs` rather than the scratch." Its TSDoc: "`link` asks the platform for a junction, which is
the one redirected directory a Windows host creates without elevation and which every POSIX host
reads as an ordinary symbolic link." Scaffold's suite exercises that `link` at roughly twenty
sites — directory sources and DANGLING names (some file-like, `inside/future.md`) — and is green
on this host. Node documents the `type` argument as ignored off Windows (verify where
load-bearing). So a consumer has already built the junction behaviour locally because
`ScratchInterface.link` lacks it — the adoption gate `AGENTS.md` sets is met, and a scaffold-side
unit dissolving the local workaround follows once test ships it.

probe state: `src/server/stages/RuntimeStage.ts` and `TypeStage.ts` already carry this wave's
path-spelling fixes (uncommitted). Its `resolveWorkspaceFile` mutate walk
(`src/server/helpers.ts`, roughly lines 60-130) treats `ENOENT` as ordinary absence and
classifies `ENAMETOOLONG` into a `claimant`-origin refusal; on this host `ENAMETOOLONG` never
fires, so `refuses a caller's unacceptable target path`
(`tests/src/server/stages/RuntimeStage.test.ts`) fails with an `instrument`-origin issue carrying
`ENOENT`. `TypeStage` translates diagnostics through `#translate` (normalize + workspace-relative
replacement), but `typescript.readConfigFile` is handed a native-spelling path. The consequence
is MEASURED (`readconfig-facts.cjs`, TypeScript 6.0.3, 2026-08-21): `readConfigFile` with a
native backslash path and malformed JSON throws `Debug Failure. Expected C:/... === C:\...`; the
identical call with a forward-slash path returns the clean diagnostic `1005 ':' expected`
carrying a forward-slash `file.fileName`; a well-formed file with a native path is unaffected (no
diagnostic is constructed, so the assert is never reached). `getParsedCommandLineOfConfigFile`
shows the same split.

## Subjects

### A. `createScratch().link` on a host that refuses symbolic links

Decide the mechanism and contract. Questions the ruling must close:

1. Mechanism: try `symlinkSync` and fall back on `EPERM`, probe capability once, or decide by
   source type up front? What type argument does each path pass, and what happens for: an
   existing directory source, an existing file source, a missing (dangling) source, a relative
   source?
2. The file-source and dangling-source cases on a symlink-refusing host: refuse honestly, or
   accept a semantic difference? A junction must never be created for a file source (measured:
   silently broken). What does the TSDoc `@throws` clause become?
3. The relative-source case: junction rewrites link text to absolute. Is exact link text part of
   the contract anywhere (tests, consumers), and if so what does the contract say on a junction
   host?
4. API shape: `link` stays one word with the same signature unless a change is genuinely
   justified. No new option unless a real consumer needs it now.
5. Test plan: which of the skipped proofs run on this host once directories can link (name them),
   what capability export gates them (`SYMLINKS` stays for symlink-only semantics; is a second
   probe needed, what is it named, what exactly does it probe), and what NEW proofs the fallback
   itself needs (including the file-source refusal and the dangling case on this host). Respect
   `.claude/rules/tests.md`: gate on the mechanism probed at runtime, never the platform name.
6. Documentation: what the guide's scratch section must say about hosts that refuse symlinks.
7. Whether anything else in `test/src/server` reads or removes links in a way a junction breaks
   (`removeTree`, containment, inventory walking) — name the sites you checked.
8. Whether the ruling dissolves scaffold's local `createWorkspace.link` workaround
   (`scaffold/tests/setupServer.ts:347-354`) into `scratch.link`, as a follow-on scaffold unit,
   and what that unit's acceptance criteria are.

### B. probe: classifying a caller's unacceptable target path

The current classification keys on `ENAMETOOLONG`, which this host never reports. Rule on the
invariant, the mechanism, and the boundary:

1. The invariant: what property must probe report as a `claimant`/`refused` issue — "the host
   refuses this name", not "the name is longer than N". Probe owns no path-length policy.
2. The mechanism: where is the discrimination taken? Candidate to attack: at the failure site,
   an `ENOENT` from a final-segment operation whose parent directory exists (and where an
   ordinary absent file would have been CREATED, not read) is a host refusal of the name.
   Beware: the mutate walk's `ENOENT`-as-absence reading is correct for creatable targets and
   must survive.
3. The boundary: POSIX `ENAMETOOLONG` classification stays. No new dependency, no lookup table
   of invalid characters, no Windows-specific name validation logic that duplicates the host's.
4. The proof: what the test asserts on this host and on POSIX, gated how.

### C. probe: `typescript.readConfigFile` on a malformed project

The diagnosis is measured (see Context). Rule on the fix: hand the compiler a normalized path at
the config-read seam, translate the resulting diagnostic through the existing `#translate`, or
both — and whether any OTHER TypeStage call site hands the compiler a native path that can reach
a diagnostic constructor. What proof pins it — a test with a malformed project JSON asserting
probe's own refusal shape rather than a raw `Debug Failure`? Name the exact call sites and the
test file the proof belongs in.

## Unknowns

- The grok terrain distillate is appended at the end of this brief. Where it contradicts a fact
  stated earlier, say so explicitly — that conflict is a finding.
- Whether test's `removeTree`/containment behave identically through junctions everywhere —
  subject A question 7 names it; report what you verified versus inferred.

## Scope

Read-only. Read anything in the three repositories. No edits, no commands that write, no
spawning. (Planner lane: you have no execution tools; work from the files and the measured facts
above, and label any claim that would need a run as needing one. Analyst lane: you may run
read-only commands to verify, including compiling questions against the installed TypeScript.)

## Execution

Perform the assignment directly and spawn nothing.

## Output

Return exactly:

- `Design`: per subject, the ruling — API, mechanism, vocabulary, test plan, documentation.
- `Alternatives`: at most two real alternatives per subject and why the design wins.
- `Units`: bounded implementation units with role AND engine, ownership, dependencies,
  acceptance criteria.
- `Tensions`: judgment calls the other lane must challenge.
- `Risks`: what evidence would settle each risk.

No process diary. Number every claim you make about existing code with a `file:line` pointer.

## Deviation contract

This is a read-only design unit; there is no writing deviation. If a named file or line does not
match this brief's description, report the mismatch as a finding and continue.

## Grok terrain distillate

The full distillate is `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/absorb-windows-wave.log`
— read it; it carries the `file:line` evidence for every fact here. Load-bearing additions beyond
the Context section:

- test's `link` suite (`tests/src/server/factories.test.ts`) plants FILE sources (`:456-471`,
  `:473-489`) and READS BACK through them, a DANGLING name (`:491-501` — `has` true, `read`
  undefined), DIRECTORY sources (`:519+`), `EEXIST` on occupied targets (`:503-517`), and remove
  semantics through links (`:668-732`). Assertions use only `lstatSync().isSymbolicLink()`; no
  `readlinkSync`, no type assertion, no exact link-text assertion.
- The guide (`guides/test.md:340`, `:345-347`, `:359-387`, `:505-520`, `:611-629`, `:921-976`)
  documents `link` with a worked example that links a FILE and reads it back.
- test's published server code creates links only through untyped `symlinkSync`
  (`factories.ts:128`), classifies only through `isSymbolicLink()`, never calls `readlinkSync`,
  and `removeTree` (`helpers.ts:59-94`) already retries the Windows handle-release `EPERM`.
  Inventory walking uses `realpathSync.native` (`helpers.ts:119,144,174`), which follows
  junctions on this host (measured).
- probe's tests link only DIRECTORIES (nearly always `node_modules`). scaffold's tests link only
  directories or dangling names. Neither links an existing file.
- probe `resolveWorkspaceFile` (`probe/src/server/helpers.ts:57-119`): non-mutate is lexical
  containment; the mutate walk breaks on `ENOENT`/`ENOTDIR` (rest treated as not-yet-existing),
  refuses symlinks as workspace/`refused`, and the outer catch maps `ENAMETOOLONG` and
  `ERR_INVALID_ARG_VALUE` to claimant/`refused` and everything else native to
  workspace/`malformed`. The failing test (`RuntimeStage.test.ts:547-567`) asserts only
  `{ origin: 'claimant', code: 'refused', context: { path } }` — it never names `ENAMETOOLONG`,
  so the proof is portable once the classification is.
- probe `TypeStage.#service` (`TypeStage.ts:254-289`) is the ONE `readConfigFile` site; `path`
  comes from `resolveWorkspaceFile` in native spelling; no `try` wraps `readConfigFile`,
  `parseJsonConfigFileContent`, or `createLanguageService`; `#warm` swallows rejections. Adjacent
  observed fact the lanes may rule in or out with one sentence: `#issue` (`:377-397`) forwards
  UNTRANSLATED `flattenDiagnosticMessageText` for file diagnostics, so issue messages can carry
  native absolute paths on Windows.
- probe's guide fixes origins as claimant/workspace/instrument and codes as
  refused/missing/malformed/destroyed/deadline; "a TypeScript project its own compiler refuses"
  is documented workspace/`malformed`; caller-facing paths are documented forward-slash.
- test's tarball ships `dist/src/**` including `dist/src/server` (`./server` export, ESM+CJS).
