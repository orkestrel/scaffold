# Design

## A. `createScratch().link`

**A-D1. API.** Keep `link(target: string, source: string): void`. The public interface already uses the required single-word method, and scaffold’s real consumer needs automatic directory-link support rather than another option (`test/src/server/types.ts:52-63`; `scaffold/AGENTS.md:55-73`; `scaffold/tests/setupServer.ts:347-354`).

**A-D2. Mechanism.** Preserve the ordinary call first: `symlinkSync(source, candidate)` with no `type`. Only an `EPERM` from that call enters fallback. Resolve a relative source against `dirname(candidate)`, inspect that resolved source with `statSync(..., { throwIfNoEntry: false })`, and apply these outcomes:

- Existing directory: call `symlinkSync(resolvedSource, candidate, 'junction')`.
- Existing file or another existing non-directory: rethrow the original `EPERM`; never create a junction.
- Missing source: create a dangling junction and accept that it has directory semantics.
- Relative source: ordinary symlink hosts retain host-native relative-link behavior; fallback passes the absolute resolved source, so stored link text may become absolute.

The existing implementation already performs target containment, validates the scratch root, creates the parent, and then makes the untyped link (`test/src/server/factories.ts:122-129`). Node documents that `type` is ignored off Windows, that a junction target is normalized to an absolute path, and that NTFS junctions can target directories only ([Node `fs.symlink` documentation](https://nodejs.org/docs/latest-v24.x/api/fs.html#fssymlinktarget-path-type-callback)).

**A-D3. Production probing.** Do not cache a production capability probe. The real operation gives the answer for the target directory and volume being used. A process-wide probe could disagree with another volume and adds an unrelated temporary link before every scratch allocation.

**A-D4. Contract and vocabulary.** Replace “link text” with “path naming the destination.” Exact stored link text is not portable and must not be promised. Existing proofs assert `isSymbolicLink`, traversal, presence, and reads; they do not assert `readlinkSync` output (`test/tests/src/server/factories.test.ts:456-501`; `test/tests/src/server/factories.test.ts:519-594`). The guide presently calls the value “link text,” so that wording must change (`test/guides/test.md:333-340`).

The `@throws` clause must state that `link` throws when containment or root validation fails, the target is occupied, the host refuses every usable link mechanism, or the host refuses ordinary symbolic links and the source already exists as a non-directory (`test/src/server/types.ts:52-63`). It must also state that a missing source on such a host creates a dangling directory link that can later resolve only to a directory.

**A-D5. Capability and test gates.** Keep `SYMLINKS` as the direct `'dir'` symbolic-link probe (`test/tests/setupServer.ts:33-43`). Add `DIRECTORY_LINKS`, which creates an existing directory with a marker, calls `symlinkSync(source, target, 'junction')`, and verifies that `lstatSync` reports a link, `statSync` reports a directory, and the marker reads through it. Use:

- `SYMLINKS` for existing-file links and direct symbolic-link semantics: `creates a link at a contained target...`, `points a contained link at a source outside...`, and the scratch-root replacement proof (`test/tests/src/server/factories.test.ts:144-167`; `test/tests/src/server/factories.test.ts:456-489`).
- `SYMLINKS || DIRECTORY_LINKS` for `resolves an empty target...`, dangling presence, occupied-target `EEXIST`, directory traversal, final-link behavior, contained-target enforcement, removal through links, and linked-parent refusal (`test/tests/src/server/factories.test.ts:189-208`; `test/tests/src/server/factories.test.ts:491-612`; `test/tests/src/server/factories.test.ts:668-732`; `test/tests/src/server/factories.test.ts:849-865`).
- `!SYMLINKS && DIRECTORY_LINKS` for fallback-specific proofs: an existing directory succeeds after `EPERM`; an existing file rethrows and leaves no target; a missing source creates a dangling link and later resolves after becoming a directory; and a relative source resolves from the link’s parent without asserting stored text.

Remove the describe-level `SYMLINKS` gate so each proof carries the mechanism it needs (`test/tests/src/server/factories.test.ts:455-613`).

**A-D6. Documentation.** Update the method table, traversal text, containment rule, threat model, and scratch example (`test/guides/test.md:331-387`; `test/guides/test.md:505-520`; `test/guides/test.md:611-629`; `test/guides/test.md:921-976`). Make the worked example link a directory and read a file through it. Document existing-file links as requiring ordinary symbolic-link capability. Use a neutral dangling directory name and disclose the fallback’s directory-only future resolution.

**A-D7. Server audit.** No inspected server site conflicts with junction behavior on the measured host:

- `remove` reads the final entry with `lstatSync`, compares allocation identity, and delegates removal without following the final link (`test/src/server/factories.ts:130-148`).
- `removeTree` uses recursive `rmSync` and already retries transient `EPERM` (`test/src/server/helpers.ts:58-94`). The host measurement says recursive removal and `unlinkSync` remove a junction while preserving its destination (`scaffold/.orkestrel/campaign/measurements.md:27-42`).
- Containment remains lexical and does not inspect link kind (`test/src/server/helpers.ts:18-27`).
- Inventory rejects a linked root or named target and skips a linked walked entry before following it; `realpathSync.native` handles the remaining physical checks (`test/src/server/helpers.ts:109-145`; `test/src/server/helpers.ts:161-182`).
- Scratch root and parent validation use `lstatSync().isSymbolicLink()`, which the measured junction reports as true (`test/src/server/factories.ts:35-38`; `test/src/server/factories.ts:89-98`; `scaffold/.orkestrel/campaign/measurements.md:27-35`).

These results are verified on the measured NTFS host. Equivalent behavior on every Windows filesystem remains inferred.

**A-D8. Scaffold adoption.** After `@orkestrel/test` ships the change, replace scaffold’s local `mkdirSync` plus `symlinkSync(..., 'junction')` body with `scratch.link(relative, target)` and retain its returned destination path (`scaffold/tests/setupServer.ts:332-354`). Remove imports made unused by that change. Acceptance requires the directory and dangling-link cases in scaffold’s server suite to remain green, including the file-like dangling names used only for containment analysis (`scaffold/tests/src/server/helpers.test.ts:395-415`; `scaffold/tests/src/server/helpers.test.ts:466-527`).

## B. Caller target-path refusal

**B-D1. Invariant.** Report `claimant`/`refused` when the caller supplied a final name that the host refuses to create. Do not define a path-length threshold or a Windows character table. The guide already assigns caller path refusals to that pair, but its length-limit wording is narrower than the intended invariant (`probe/guides/probe.md:318-333`).

**B-D2. Mechanism.** Keep `resolveWorkspaceFile` unchanged for ordinary absence. Its mutate walk must continue breaking on `ENOENT` or `ENOTDIR`, because a missing component can be created later (`probe/src/server/helpers.ts:69-85`). Keep its existing `ENAMETOOLONG` and `ERR_INVALID_ARG_VALUE` classification (`probe/src/server/helpers.ts:104-116`).

Take the Windows discrimination at `RuntimeStage.#specification` around the final `writeFileSync` call (`probe/src/server/stages/RuntimeStage.ts:387-425`). If that create operation throws `ENOENT`, inspect `dirname(file)` with `statSync(..., { throwIfNoEntry: false })`. When the parent still exists as a directory, throw a `ProbeError` carrying:

```ts
{
	origin: 'claimant',
	code: 'refused',
	context: { path: test.path },
	cause: error,
}
```

An ordinary absent final file does not reach this branch because `writeFileSync` creates it. A missing or refused parent remains a workspace issue through the existing `creating` branch (`probe/src/server/stages/RuntimeStage.ts:399-434`). Other final-write errors retain the existing instrument-issue result.

**B-D3. Proof and gate.** Keep the existing assertion shape; it already tests the portable ownership and code rather than `ENAMETOOLONG` (`probe/tests/src/server/stages/RuntimeStage.test.ts:547-567`). Add `REFUSED_RUNTIME_TARGETS` to `probe/tests/setupServer.ts`. Its probe attempts to create a fresh component shaped like `createRevisionFile` output beneath an existing owned directory and returns true only when the create fails while that parent remains a directory. Gate the proof with `it.runIf(REFUSED_RUNTIME_TARGETS)`. It runs on this host through final-write `ENOENT` and on POSIX filesystems through the retained `ENAMETOOLONG` path.

**B-D4. Documentation.** Revise `resolveWorkspaceFile` TSDoc and the guide to say “a caller-supplied name the host refuses to inspect or create,” with length and NUL as examples rather than policy (`probe/src/server/helpers.ts:33-47`; `probe/guides/probe.md:168-180`; `probe/guides/probe.md:318-333`). Add the final-create discrimination to the physical-containment section (`probe/guides/probe.md:609-618`).

## C. Malformed TypeScript project

**C-D1. Fix.** Normalize and translate. In `TypeStage.#service`, derive `compilerPath = normalizePath(path)`. Pass `compilerPath` to `typescript.readConfigFile`, and pass `dirname(compilerPath)` plus `compilerPath` to `typescript.parseJsonConfigFileContent`. Keep caches, service identity, and caller context keyed by the native `path` (`probe/src/server/stages/TypeStage.ts:252-305`).

Pass diagnostics returned from `readConfigFile` and `parseJsonConfigFileContent` through the existing `#translate` method (`probe/src/server/stages/TypeStage.ts:258-278`; `probe/src/server/stages/TypeStage.ts:307-323`). TypeScript constructs the malformed-file diagnostic from the supplied filename and later asserts equality against the parsed source filename, which explains why normalization must occur before parsing (`probe/node_modules/typescript/lib/typescript.js:21685-21712`; `probe/node_modules/typescript/lib/typescript.js:42624-42638`).

**C-D2. Other call site.** `parseJsonConfigFileContent` is the other TypeStage configuration call receiving native `dirname(path)` and `path`; it can construct option, include, extends, and project diagnostics, so normalize its path arguments too (`probe/src/server/stages/TypeStage.ts:266-272`; `probe/node_modules/typescript/lib/typescript.js:43266-43338`). `createLanguageService` receives a compiler-host implementation rather than a config filename seam; do not normalize its host paths as part of this defect (`probe/src/server/stages/TypeStage.ts:282-301`).

**C-D3. Proof.** Add the regression to `probe/tests/src/server/stages/TypeStage.test.ts`. Build a scratch workspace with a valid root project, a source file, its real `node_modules` directory link, and a malformed caller-named project. Assert that `stage.resolve(project)` rejects with `ProbeError` shape `{ origin: 'workspace', code: 'malformed', context: { stage: 'type', project } }` and a compiler diagnostic message, not a raw `Debug Failure`. This belongs beside project-resolution failures (`probe/tests/src/server/stages/TypeStage.test.ts:446-518`). It needs no platform gate: malformed projects must have the same package-level refusal on every host.

**C-D4. Documentation boundary.** Add a sentence to the failure contract that malformed TypeScript project JSON is translated into `workspace`/`malformed` with the caller’s project in context (`probe/guides/probe.md:293-333`). Do not fold `#issue` message rewriting into this unit. That method still flattens file diagnostics without message translation, while normalizing the separate `path` field (`probe/src/server/stages/TypeStage.ts:377-397`); arbitrary absolute paths embedded in diagnostic prose require a separate proof and rule.

# Alternatives

## A

**A-A1. Probe link capability once in production.** Refused because capability can vary by directory or volume and the actual link attempt remains necessary.

**A-A2. Inspect the source first and select the link kind without trying an ordinary symlink.** Refused because it would replace working file and directory symlinks with junction semantics, would still leave missing sources ambiguous, and would weaken the existing file-link behavior (`test/tests/src/server/factories.test.ts:456-489`).

## B

**B-A1. Treat every mutate-walk `ENOENT` as claimant refusal.** Refused because the walk intentionally admits missing creatable components (`probe/src/server/helpers.ts:72-85`).

**B-A2. Validate Windows characters and component lengths.** Refused because probe does not own filesystem naming policy, and the measured host reports the same `ENOENT` for invalid names, missing parents, and ordinary absence.

## C

**C-A1. Translate only returned diagnostics.** Refused because the malformed native-path case throws before TypeStage receives a diagnostic to translate (`probe/src/server/stages/TypeStage.ts:258-264`).

**C-A2. Catch the raw `Debug Failure` and wrap it.** Refused because it discards the compiler’s useful syntax diagnostic and binds probe to an internal TypeScript assertion. Normalizing the compiler input prevents the assertion at its cause.

# Units

**U-A. `@orkestrel/test` link contract**

- Role/engine: implementer — GPT-5.6 Sol; independent reviewer — Opus 5.
- Ownership: `test/src/server/types.ts`, `test/src/server/factories.ts`, `test/tests/setupServer.ts`, `test/tests/src/server/factories.test.ts`, `test/guides/test.md`, and guide parity where the changed example is transcribed.
- Dependencies: none.
- Acceptance: fallback-specific proofs redden before implementation; file links remain `SYMLINKS`-gated; directory and dangling proofs run on the measured host; format, lint, type, build, source, guide, and package gates pass. The packed `./server` export contains the revised declarations and implementation (`test/package.json:13-48`; `test/src/server/index.ts:1-4`).

**U-A-consumers. Adopt the shipped directory-link contract**

- Role/engine: implementer — GPT-5.6 Sol; independent reviewer — Opus 5.
- Ownership: scaffold’s `tests/setupServer.ts`, scaffold’s dependency declaration and lockfile, probe’s dependency declaration and lockfile.
- Dependencies: U-A package artifact or release.
- Acceptance: scaffold’s local junction call and its obsolete imports are gone; `createWorkspace.link` retains its path return; scaffold’s server and full gates pass; probe no longer fails during directory-link setup. Preserve unrelated dependency edits already present (`scaffold/package.json:104`; `probe/package.json:103`).

**U-B. Classify host-refused runtime targets**

- Role/engine: implementer — GPT-5.6 Sol; independent reviewer — Opus 5.
- Ownership: `probe/src/server/stages/RuntimeStage.ts`, `probe/tests/setupServer.ts`, `probe/tests/src/server/stages/RuntimeStage.test.ts`, and the relevant probe guide paragraphs.
- Dependencies: U-A-consumers for a green Windows server suite.
- Acceptance: the gated regression reddens as an instrument issue before the repair and passes as claimant/refused after it; ordinary absent targets still create; missing-parent and unrelated write failures retain their existing origins; probe’s server and full gates pass (`probe/package.json:62-89`).

**U-C. Normalize TypeScript config paths**

- Role/engine: implementer — GPT-5.6 Sol; independent reviewer — Opus 5.
- Ownership: `probe/src/server/stages/TypeStage.ts`, `probe/tests/src/server/stages/TypeStage.test.ts`, and the malformed-project guide sentence.
- Dependencies: U-A-consumers for the scratch `node_modules` directory link used by TypeStage fixtures (`probe/tests/src/server/stages/TypeStage.test.ts:118-160`).
- Acceptance: the malformed-project proof produces the raw `Debug Failure` before normalization on the measured host and the package-level workspace/malformed refusal afterward; valid projects and project digests remain unchanged; probe’s server and full gates pass.

# Tensions

**T1. Dangling links.** The design accepts directory-only future resolution on a symlink-refusing host because scaffold already relies on dangling junction creation, including file-like names (`scaffold/tests/src/server/helpers.test.ts:395-415`; `scaffold/tests/src/server/helpers.test.ts:466-527`). Challenge whether preserving link creation outweighs the semantic difference.

**T2. File-source race.** Source inspection and junction creation are separate filesystem operations. The design prevents a junction when the inspected source is a file, but a concurrent source replacement can invalidate that reading. Challenge whether the implementation must re-inspect after creation and unlink a broken result.

**T3. Final-write `ENOENT`.** The B ruling interprets final-create `ENOENT` plus an existing directory parent as name refusal. A concurrent process could recreate the parent between failure and inspection, although the guide already excludes concurrent path mutation from the physical-containment guarantee (`probe/guides/probe.md:609-618`).

**T4. Type diagnostic prose.** The C unit fixes configuration-path construction and malformed-project refusal, but it leaves absolute paths embedded in ordinary diagnostic messages unchanged (`probe/src/server/stages/TypeStage.ts:377-397`). Challenge whether the forward-slash reporting contract includes prose as well as structured path fields.

**T5. Evidence mismatch.** The brief says raw `junction-facts.cjs` and `badname-facts.cjs` output is in the campaign record, but that file contains summarized junction and `readConfigFile` sections and no bad-name raw output (`scaffold/tmp/codex/design-objective-brief.md:26-42`; `scaffold/.orkestrel/campaign/measurements.md:27-56`). The terrain distillate does not contradict the later host facts; its junction, `SYMLINKS`, and malformed-config entries are stale unknowns that the measurement record supersedes (`scaffold/tmp/cursor/absorb-windows-wave.log:45-47`; `scaffold/tmp/cursor/absorb-windows-wave.log:85-87`; `scaffold/tmp/cursor/absorb-windows-wave.log:314-316`).

# Risks

**R1. Junction behavior beyond measured NTFS.** Settle this with the A directory-link matrix on an unelevated NTFS host, an elevated Windows host, POSIX, and every additional Windows filesystem the package supports. Verify traversal, relative source resolution, dangling behavior, `EEXIST`, removal, and destination survival.

**R2. Source replacement race.** Settle this with a controlled race that swaps an inspected directory for a file before junction creation and checks that no broken target remains. If reproducible, add post-create validation and cleanup while retaining the original refusal as cause.

**R3. Capability-gate fidelity.** Settle this by proving `DIRECTORY_LINKS` fails when traversal verification is disabled or the link target is unreadable, and by confirming fallback-specific tests are collected on the measured host.

**R4. False claimant classification.** Settle this with controls for a creatable absent file, a missing parent, a parent that is a file, a permission refusal, and final-create `ENOENT` under an existing directory. Only the last host-refused-name case may become claimant/refused.

**R5. TypeScript version range.** Settle this by running the malformed-project proof against each supported TypeScript version. The expected invariant is the package-level workspace/malformed refusal; the compiler’s exact diagnostic wording must remain a bounded substring rather than an exact sentence.