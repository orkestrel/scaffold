# Design round 1 — subjective lane report (planner, Opus 5), 2026-08-21

Lane held: subjective. Blind to the objective lane. Verbatim from the returned report.

---

# Design

## Subject A — `createScratch().link` on a host that refuses symbolic links

### The ruling in one sentence

`link` keeps its name, its signature, and its untyped first attempt; on `EPERM` alone it resolves
the source against the link's own directory and creates a junction, unless the resolved source
names an existing file, in which case it re-throws the host's refusal.

### Mechanism (question 1)

Extract the create step out of `factories.ts` into a new exported leaf in
`test/src/server/helpers.ts`, beside `removeTree` (`test/src/server/helpers.ts:71-94`), which is
the file's existing home for a host-quirk rule:

```ts
export function createLink(path: string, source: string): void
```

Its body, in order:

1. `symlinkSync(source, path)` — byte-identical to today's `test/src/server/factories.ts:128`.
2. Catch. If the code is not `EPERM`, re-throw unchanged. `EEXIST`, `ENOENT`, and `EACCES` keep
   their exact current behaviour, so the occupied-target contract at
   `test/tests/src/server/factories.test.ts:503-517` is untouched.
3. `const resolved = resolve(dirname(path), source)`.
4. `statSync(resolved, { throwIfNoEntry: false })`. When it reports a non-directory, re-throw the
   original `EPERM`. A junction whose source is a file is created silently broken (measured), so
   this is the one case the package must refuse rather than approximate.
5. Otherwise `symlinkSync(resolved, path, 'junction')`. A directory source links; a missing
   source produces a dangling junction, which reports exactly the documented "exists but is
   unreadable" contract (measured; `test/src/server/types.ts:29` and `:18-22`).

`ScratchInterface.link` (`test/src/server/factories.ts:122-129`) keeps its containment check, its
`has('.')` root check, and its `mkdirSync` of the parent, and calls `createLink(candidate,
source)`. It still composes real behaviour, so it is not a 1:1 forward to a helper.

Why try-then-fall-back, not probe-once, and not decide-by-source-type:

- A host that creates symbolic links keeps the shipped semantics exactly, with no new stat of the
  source. The current contract treats the source as opaque link text
  (`test/src/server/types.ts:58-59`), and try-first preserves that everywhere it holds today.
  Only the fallback path — the path that cannot preserve it — stats the source.
- A module-load capability probe puts a real `mkdtemp`/link/`rm` cycle into the published package
  at import time for every consumer of `@orkestrel/test/server`, and it caches a fact taken in
  `tmpdir()` while `createScratch` allocates in `options.parent`
  (`test/src/server/factories.ts:34`), which can sit on another volume. A cached wrong answer is
  worse than a per-call catch.
- Deciding by source type up front changes behaviour on hosts that need no change, for no gain.

### The file source, the dangling source, and `@throws` (question 2)

- File source: refuse honestly. Re-throw the host's own `EPERM`. The invariant is never leave a
  link the host will not read, and the new proof asserts that invariant rather than a code.
- Dangling source: accept the junction. It reproduces the documented behaviour precisely (`has`
  true, `read` undefined — measured), and it is the case scaffold's suite already depends on at
  file-like names such as `inside/future.md` (`scaffold/tests/src/server/helpers.test.ts:473`,
  `:521`), green on this host.
- The residual semantic difference, which the guide must state: a dangling POSIX symbolic link
  later resolves if a FILE appears at the source; a dangling junction does not. No test and no
  guide example exercises that sequence.

`ScratchInterface.link`'s `@throws` (`test/src/server/types.ts:60-62`) becomes: "When the target
escapes the scratch directory, the scratch root is missing, a symbolic link, or a file, or the
host refuses to create the link — including a host that creates no symbolic link and a source
naming an existing file." — with an `@remarks` naming the fallback and the link-text difference.
The mechanism's full explanation lives once, on `createLink`.

### The relative source (question 3)

Exact link text IS load-bearing, in test's own suite: `scratch.link('up', '..')` at
`test/tests/src/server/factories.test.ts:680` and `:723`. A junction rewrites a relative source
to an absolute path resolved against the PROCESS WORKING DIRECTORY (measured: the rewrite; the
base needs a run to confirm), so a naive fallback would point `up` at the parent of the
repository checkout and both `remove` proofs would fail.

Ruling: preserve the denotation, not the text. Resolve a relative source against `dirname(path)`
before creating the junction. `link('up', '..')` then means the allocation's parent on every
host, `link('dangling', 'missing.txt')` means `<allocation>/missing.txt` on every host, and every
existing test and guide example keeps its meaning. The contract states the difference plainly:
where the host creates a symbolic link the link text is the source verbatim; where it creates a
junction the link text is that source resolved against the link's own directory and stored
absolute.

### API shape (question 4)

No change. `link(target, source)` stays one word with the same signature, and no option is added.
A `type` option would be a two-literal magic-mode selector (`.claude/rules/names.md` § Split
behavioral variants), it would push a host decision onto callers who cannot see the host, and no
consumer needs it — scaffold's workaround exists to REACH the junction, not to choose it
(`scaffold/tests/setupServer.ts:347-354`).

### Test plan (question 5)

Rename the capability axis. The current probe creates a DIRECTORY link
(`test/tests/setupServer.ts:38-43`) while the tests it gates need FILE links, so the probe no
longer describes what it gates. Replace `SYMLINKS` with a pair named for what can be linked, not
for what the link is called:

- `FILE_LINKS` — writes a file, creates `symlinkSync(target, link, 'file')`, and reads back
  through the link. False on this host (measured: type `file` throws `EPERM`).
- `DIRECTORY_LINKS` — makes a directory holding a file, creates
  `symlinkSync(target, link, 'junction')`, and reads that file back through the link. True here,
  and true on POSIX where Node documents `type` as ignored. One call, no branch, so the probe
  does not reimplement the fallback it gates — which matters, because a probe built from the
  package's own code would skip the whole block green if the package regressed.

Gate reassignment in `test/tests/src/server/factories.test.ts`:

| Proof | New gate |
| --- | --- |
| `:456-471`, `:473-489` — file source, read back through the link | `it.runIf(FILE_LINKS)` |
| the `link` describe (`:455`) as a whole | `describe.runIf(DIRECTORY_LINKS)` |
| `:491-501` dangling, `:503-517` `EEXIST`, `:519-547`, `:549-573`, `:575-594`, `:596-612` | run on this host under the block gate |
| `:668-694`, `:696-714`, `:716-732` — `remove` through links | `it.runIf(DIRECTORY_LINKS)` |
| `:144-167` — root replaced by a link; change its raw `symlinkSync(moved, scratch.path, 'dir')` at `:150` to `'junction'` | `it.runIf(DIRECTORY_LINKS)` |
| `:849-865` — parent whose final segment is a link | `it.runIf(DIRECTORY_LINKS)` |
| `:189-208` — empty target | split: leave `ensure`/`has`/`names`/`read` ungated, and gate only the two host-code lines `:202-203` on `FILE_LINKS`, since those two codes are POSIX codes as its own comment says (`:200-201`) |

That converts the Windows-relevant reparse-point cases — a junction root refused, a junction
parent refused, `remove` acting at a junction — from unrun to covered, which is a larger gain
than the fix itself.

New proofs the fallback owes:

1. `it.runIf(!FILE_LINKS)('refuses a source naming an existing file where the host creates no
   link to a file')` — write `source.txt`, expect `link('alias.txt', join(scratch.path,
   'source.txt'))` to throw, AND expect `scratch.has('alias.txt')` false. The second assertion is
   the load-bearing one: no silently broken link survives. Its POSIX counterpart is `:456-471`
   under `FILE_LINKS`, so every host runs one of the pair.
2. `'resolves a relative source against the link's own directory'` — seed
   `nested/source/file.txt`, `link('nested/alias', 'source')`, read `nested/alias/file.txt`.
   Ungated. This is the regression guard for the resolve rule and it fails on a junction host
   without it.
3. `it.runIf(!FILE_LINKS)('stores the resolved source as the link text where the host creates a
   junction')` — `isAbsolute(readlinkSync(...))`. Exists only because the guide states the claim,
   and `.claude/rules/documentation.md` requires a prose claim about behaviour to carry an
   executed assertion.
4. Unit proofs of `createLink` in `test/tests/src/server/helpers.test.ts`: directory source
   absolute and relative, missing source, occupied target passthrough, file-source refusal —
   gated as the table above.

### Documentation (question 6)

- Rewrite the `link` row of the `ScratchInterface` method table (`test/guides/test.md:340`) to
  name the fallback, the file-source refusal, and the link-text difference.
- Add a short subsection under the scratch section, "Hosts that create no symbolic link",
  carrying the whole rule once.
- Change the worked example (`test/guides/test.md:945-947`), which links a FILE and reads it back
  and is therefore host-conditional as written, to link `src` and read `alias/index.ts` — the
  same "read follows the link" demonstration, valid on every host. The file case moves into the
  new subsection as prose with the executed proof above behind it.
- The threat model (`test/guides/test.md:611-629`) gains one clause: the source stays unchecked
  except on the fallback path, which stats it.

### What else reads or removes links (question 7)

| Site | Verdict |
| --- | --- |
| `removeTree` (`test/src/server/helpers.ts:71-94`) | Unaffected — measured: `rmSync` recursive removes the junction and leaves the destination. |
| `remove` identity guard (`test/src/server/factories.ts:136-146`) | Unaffected. The guard lstats the entry reached THROUGH the junction, so `:668-694` still refuses. That the identity fields discriminate two directories on this host is INFERRED, not measured. |
| `has` (`factories.ts:89-99`) | Junction lstats as a symbolic link (measured), so the root guard and the final-segment reading match POSIX. |
| `read` (`factories.ts:78-88`) | `statSync` follows a junction and reports `undefined` for a dangling one; a junction to a directory throws the directory message, same as POSIX. |
| `createScratch` parent guard (`factories.ts:35-38`) | Refuses a junction parent, same as a symlink parent. Proved once `:849-865` ungates. |
| `readInventory` (`test/src/server/helpers.ts:109-200`) | Root refusal `:115-117`, named-target refusal `:138-139`, and walk skip `:167-168` all key on `isSymbolicLink()`, which a junction satisfies. `realpathSync.native` at `:119`, `:144`, `:174` resolves junctions (measured). |
| `resolveContained` (`helpers.ts:18-27`) | Lexical only. Unaffected. |

Nothing in `test/src/server` breaks. `readlinkSync` appears nowhere in `src/`, and no code path
compares link text.

### Scaffold follow-on (question 8)

Yes. `scaffold/tests/setupServer.ts:347-354` dissolves into `scratch.link`, keeping the wrapper
only for its return of the destination path — the same shape `write` and `ensure` already take at
`:337-346`, so it is not a superfluous wrapper. Its `@remarks` (`:316-321`) stops restating the
mechanism and points at the package contract, so the rule keeps one home.

## Subject B — probe: classifying a caller's unacceptable target path

### The invariant

Probe reports claimant/`refused` when the host will not accept the name the caller supplied. It
owns no length limit, no character table, and no per-host name grammar. `ENAMETOOLONG` is one
host's way of saying it; it is not the property.

### The mechanism, and where it must live

The discrimination cannot be taken by a stat. On this host an overlong component, a name carrying
`<` or `?`, and an ordinary absent file all report `ENOENT` from `lstatSync` (measured), so the
mutate walk in `resolveWorkspaceFile` (`probe/src/server/helpers.ts:69-103`) is structurally
unable to tell them apart — and its `ENOENT` → `break` at `:81-83` is correct for creatable
targets and must survive. The discriminating fact appears only when a real creation is attempted:
`writeFileSync` succeeds for the absent file and fails `ENOENT` for the refused name (measured).

So the decision belongs at the creation site, expressed as one exported predicate in
`probe/src/server/helpers.ts`:

```ts
export function isRefusedName(file: string, error: unknown): boolean
```

True when the fault means the host will not accept this name for creation: code `ENAMETOOLONG`
(the POSIX refusal, unchanged); or code `ERR_INVALID_ARG_VALUE` (Node's own NUL refusal,
unchanged — `probe/tests/src/server/helpers.test.ts:230-244` keeps it); or code `ENOENT` AND
`statSync(dirname(file), { throwIfNoEntry: false })` reports a directory. A create whose parent
directory exists cannot be missing any component but the final one — the one it was creating — so
the host refused the name.

Total, never throws, no platform branch, no name grammar. The `is*` form with a filesystem read
stays in `helpers.ts`, not `validators.ts`: `.claude/rules/architecture.md` § Kind purity names
exactly this case (`isVacant` is a predicate rather than a `Guard<T>`, so it stays in
`helpers.ts`).

Call sites:

1. `RuntimeStage.#specification` (`probe/src/server/stages/RuntimeStage.ts:387-435`): hoist the
   resolved `file` beside the existing `let creating` at `:388`, and after the existing claimant
   re-throw at `:419-426` add — when `isRefusedName(file, outcome.error)` — a `ProbeError` with
   `origin: 'claimant'`, `code: 'refused'`, `context: { stage: this.stage, path: test.path }`,
   `cause: outcome.error`. The instrument-origin issue at `:427-434` remains for everything else.
2. `resolveWorkspaceFile`'s outer catch (`probe/src/server/helpers.ts:104-117`) replaces its
   inline `ENAMETOOLONG || ERR_INVALID_ARG_VALUE` test with the same predicate, removing the
   duplicate code list.

For (2) to be sound, wrap the unguarded `realpathSync(descendant)` at
`probe/src/server/helpers.ts:94` in the same `attempt` the lstat above it uses, breaking on
`ENOENT` exactly as `:81-83` does. That is the only path by which an `ENOENT` from a VANISHED
entry can reach the outer catch, where the new predicate would read a race as a caller refusal.
Closing it lets one predicate serve both sites honestly.

### The boundary

- POSIX `ENAMETOOLONG` classification is unchanged.
- No dependency, no character table, no Windows name validation.
- The `mkdirSync` case — a caller naming a DIRECTORY component the host refuses, which reports
  `EINVAL` here (measured) — is OUT OF SCOPE. `EINVAL` has been measured once, for one shape;
  admitting it to the predicate on that evidence risks reclassifying real workspace faults as
  caller faults, and the `creating` flag at `RuntimeStage.ts:405-407` keeps that case
  workspace-origin as it is today. Recorded as a named observation with its settling measurement.

### The proof

- `probe/tests/src/server/helpers.test.ts` — unit proofs of `isRefusedName` whose error values
  are produced by REAL operations in a `createScratch` tree, never by literal objects: a write to
  a 300-character final segment under a real directory (`ENOENT` here, `ENAMETOOLONG` on POSIX)
  asserts `true` on both hosts; a write under a missing directory asserts `false`; a NUL-byte
  path asserts `true`; a plain unrelated `Error` asserts `false`. Ungated on every host.
- `probe/tests/src/server/stages/RuntimeStage.test.ts:547-567` stays exactly as written. It
  asserts only `{ origin: 'claimant', code: 'refused', context: { path } }` and never names
  `ENAMETOOLONG`, so it is already portable. It fails on this host today and goes green with the
  fix — that is the failing proof this repair binds to.

## Subject C — probe: `typescript.readConfigFile` on a malformed project

### The ruling

Normalize the path at the config-read seam. Translation is not an alternative here: the compiler
throws inside `readConfigFile` before returning any diagnostic, so nothing reaches `#translate`
to translate.

State it as a rule rather than a patch. Probe's path law already says every path it keys a map
on, matches a prefix against, or hands a caller passes through `normalizePath` first
(`probe/src/server/helpers.ts:16-18`). Add the missing clause: every path handed to an external
tool that constructs diagnostics is normalized too.

### The call sites

In `TypeStage.#service` (`probe/src/server/stages/TypeStage.ts:254-305`), take
`const spelling = normalizePath(path)` once and use it for:

- `typescript.readConfigFile(spelling, typescript.sys.readFile)` at `:258` — the measured defect.
- `typescript.parseJsonConfigFileContent(config.config, typescript.sys, dirname(spelling),
  undefined, spelling)` at `:266-272`. `configFileName` is what its diagnostics reference, so it
  can reach the same assertion; that it DOES needs a run, and it is normalized regardless because
  it is the same seam.

`path` stays the map key for `#services`, `#options`, `#files`, and `#diagnostics`, so no cache
is re-keyed and `#configure` (`:325-329`), `resolve` (`:174-184`), and `#warm` (`:207-213`) are
untouched.

`#translate` (`TypeStage.ts:314-323`) needs NO change: it normalizes the message and replaces
`normalizePath(path)`, and `normalizePath` is idempotent.

### Other native handoffs, ruled

- `getCurrentDirectory: () => this.#workspace` (`TypeStage.ts:287`) stays native. TypeScript's
  own `sys.getCurrentDirectory()` returns a native path on Windows, so this is the compiler's
  ordinary input, and no measured defect names it. Recorded as an observation, not changed.
- The overlay seam is already safe: `Overlay` normalizes on `set` and on `text`
  (`probe/src/server/Overlay.ts:43`, `:53`, `:69`), and `parsed.fileNames` are compiler-derived
  forward-slash paths.
- `#issue` (`TypeStage.ts:377-397`) forwarding untranslated `flattenDiagnosticMessageText` is a
  real second finding — a caller can read a native absolute path in a file diagnostic's message —
  but it is a different defect from this one and belongs in its own unit against the same
  capability row. Do not ride it along.

### The proof

`probe/tests/src/server/stages/TypeStage.test.ts` gains one test: a scratch workspace carrying a
malformed `tsconfig.json`, `node_modules` linked, and `stage.resolve('tsconfig.json')` asserted
to reject with `{ origin: 'workspace', code: 'malformed', context: { stage: 'type', project:
'tsconfig.json' } }`, a message containing the workspace-relative `tsconfig.json`, and a message
containing neither `Debug Failure` nor a backslash. It goes red on this host today and green
after; on POSIX it adds first coverage of the malformed-project path, which nothing tests now.

# Alternatives

- A-1. Probe the capability once and branch: loses — filesystem side effect at import time; a
  cached fact taken in `tmpdir()` while allocation happens in `options.parent`, possibly another
  volume; still needs the source-type decision.
- A-2. Refuse honestly and document the limit: loses — "the host refuses to create the link" is
  FALSE on this host; a consumer already built the mechanism locally
  (`scaffold/tests/setupServer.ts:347-354`), the adoption gate `AGENTS.md` sets.
- B-1. Attempt a create inside the mutate walk: loses — a mutation with cleanup and a race inside
  a resolver, on every mutate call rather than the one that failed.
- B-2. A name-validity table per host: loses — probe would own a stale duplicate of the host's
  policy, which the boundary forbids.
- C-1. Wrap `readConfigFile` in `attempt` and translate the `Debug Failure`: loses — the caller
  gets probe's summary of a compiler crash instead of the compiler's real parse diagnostic
  (`1005 ':' expected`, measured), and the same assertion stays live at
  `parseJsonConfigFileContent`.
- C-2. Make `resolveWorkspaceFile` return normalized paths everywhere: loses — re-keys every map
  in `TypeStage`, `RuntimeStage`, `LintStage`, and `Probe` for one measured defect.

# Units

- Unit 0 — tarball swap (prerequisite, Orchestrator-owned, engine Opus 5). Build test from
  source, pack, install into probe and scaffold per § Fixing a dependency before it publishes.
  Depends on A1-A3. Acceptance: `npm ls @orkestrel/test` names the tarball; range recorded.
- Unit A1 — `createLink` and the fallback contract. Role `sol`, engine GPT-5.6 Sol. Owns
  `test/src/server/helpers.ts`, `factories.ts`, `types.ts`. Off-limits tests/guides. Acceptance:
  exported `createLink` with fixed TSDoc; `factories.ts:122-129` calls it, other steps unchanged;
  `symlinkSync` imported only by `helpers.ts` in `src/`; non-`EPERM` propagates; `@throws`
  clause; `lint:check`+`check` green; src:server run reported as observation.
- Unit A2 — capability probes and gate reassignment. Role `implementer`, engine Opus 5. Owns
  `test/tests/setupServer.ts`, `factories.test.ts`, `helpers.test.ts`. Depends A1. Acceptance:
  `SYMLINKS` gone; `FILE_LINKS`/`DIRECTORY_LINKS` with mechanism-named TSDoc; gate table landed
  including `'dir'`→`'junction'` at `:150`; new proofs; src:server reports no `link` skip on this
  host beyond `FILE_LINKS` tests; gates green.
- Unit A3 — guide and parity. Role `implementer`, engine Opus 5. Owns `test/guides/test.md`.
  Depends A2.
- Unit A4 — dissolve scaffold's workaround. Role `implementer`, engine Opus 5. Owns
  `scaffold/tests/setupServer.ts`. Depends Unit 0. Watch `'hop/../secret'` at
  `scaffold/tests/src/server/helpers.test.ts:499`.
- Unit B1 — `isRefusedName` and the classification. Role `sol`, engine GPT-5.6 Sol. Owns
  `probe/src/server/helpers.ts`, `RuntimeStage.ts`, `probe/tests/src/server/helpers.test.ts`.
  Depends Unit 0.
- Unit C1 — normalize the config-read seam. Role `sol`, engine GPT-5.6 Sol. Owns `TypeStage.ts`,
  `TypeStage.test.ts`. Depends Unit 0 and B1 (serialized: shares the repository).
- Unit V — gates. Role `verifier`, engine Sonnet.
- Unit D — guide obligations in probe (claimant/refused pair phrasing moves from length limit to
  host refusal). Role `implementer`, engine Opus 5.

# Tensions

1. Extracting `createLink` widens the published surface; the alternative is an inline body.
2. Resolving a relative source against the link's directory changes what the fallback link
   denotes vs passing text through; chosen for `link('up', '..')` at `:680`/`:723`.
3. `EPERM`-only fallback: occupied-target ordering on Windows unmeasured; either ordering ends in
   `EEXIST`.
4. Renaming `SYMLINKS` touches every gated test; cheaper is keeping the stale name.
5. `DIRECTORY_LINKS` passes `'junction'` on every host, resting on Node documenting `type`
   ignored off Windows; if wrong, POSIX skips silently.
6. Splitting the empty-target test's gate is scope the wave did not have to take.
7. Excluding `EINVAL`/`mkdirSync` from `isRefusedName` leaves a caller's refused directory
   component workspace-origin.
8. Wrapping `realpathSync` at `helpers.ts:94` is a correctness fix the failing test does not
   need; bundled so the shared predicate cannot read a race as a refusal.
9. `isRefusedName` in `helpers.ts` reads the filesystem; the objective lane may prefer another
   name form.
10. C normalizes the compiler argument without re-keying caches; two spellings live in
    `#service`.
11. `getCurrentDirectory` stays native; unmeasured.

# Risks

| Risk | Evidence that settles it |
| --- | --- |
| Junction from a relative source resolves against the process cwd rather than the link's directory | Create one from a directory that is not the cwd; read `readlinkSync`. |
| `'junction'` on POSIX creates an ordinary symlink so `DIRECTORY_LINKS` is true there | Run `test:src` on POSIX; the silent skip is the failure mode. |
| `matchesIdentity` discriminates two directories on Windows | Read `statSync().ino` for two directories on this host. |
| Ungating remove-through-link proofs exposes a Windows `rmSync` behaviour outside the retry list | Run the ungated block here. |
| Scaffold's `'hop/../secret'` source changes meaning under A4 | Run scaffold src:server after A4; read that test specifically. |
| A scaffold `workspace.link` target escaping containment that raw `symlinkSync` allowed | Run scaffold's suite after A4; the refusal message names the site. |
| `parseJsonConfigFileContent` with a native `configFileName` reaches the same assertion | Compile the call against installed TS 6.0.3 with a malformed config and native path. |
| `#issue` leaks native absolute paths in diagnostics on Windows | Run an inspection producing a file diagnostic here; read the message. Separate defect. |
| The `mkdirSync` `EINVAL` case leaves a caller refusal as workspace-origin | Drive `inspect` with `tmp/probe/<300 chars>/x.test.ts` on both hosts; read origins. |
| 0.0.8 widens the surface (`createLink`), obliging parity and re-pin cascade | Material `dist/` comparison against the published tarball. |
