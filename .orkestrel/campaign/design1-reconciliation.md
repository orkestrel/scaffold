# Design round 1 — reconciliation, 2026-08-21

Lanes: subjective (`design1-subjective-report.md`), objective
(`tmp/codex/design-objective-last.md`, thread `01a02339-cf6a-7ce1-89d0-41339e35717d`). Both ran
clean-contexted and blind. The Orchestrator's rulings follow; each names the lane it takes from
where the lanes diverged.

## Subject A — `createScratch().link`

Converged, adopted: keep `link(target, source)` unchanged; try untyped `symlinkSync` first; only
`EPERM` enters fallback; resolve a relative source against the link's own directory; an existing
directory gets `symlinkSync(resolved, candidate, 'junction')`; an existing non-directory
rethrows the original `EPERM` (never a broken junction); a missing source gets a dangling
junction; no capability cache, no new option.

Post-round measurement (junction-facts2.cjs, 2026-08-21): Node already resolves a relative
junction source against the link's parent (link in `nest` with source `real`, cwd elsewhere →
stored text `...nest\real`, reads pass). The explicit `resolve(dirname(candidate), source)` in
the design matches host behaviour and feeds the source stat. NTFS `statSync().ino` values for
two sibling directories are distinct and nonzero, so the identity guard discriminates — the
subjective lane's `matchesIdentity` risk is retired.

Divergences ruled:

- Fallback placement: EXTRACTED as `createLink(path, source)` in `test/src/server/helpers.ts`
  (subjective lane), beside `removeTree`, exported and unit-proved. The barrel already stars
  `helpers.js`, so it is public; the guide owes it a row.
- Capability gates: the subjective lane's rename is adopted — `SYMLINKS` is replaced by
  `FILE_LINKS` (file symlink with type `file`, read back) and `DIRECTORY_LINKS` (junction with a
  marker, `lstatSync` link + `statSync` directory + read-through — the objective lane's stronger
  probe body). The gate cites the mechanism it gates, per `.claude/rules/tests.md`.
- Gate placement: the `link` describe keeps a `describe.runIf(DIRECTORY_LINKS)` with inner
  `it.runIf(FILE_LINKS)` on the two file-source proofs; remove-through-link, root-replacement
  (fixture `'dir'` → `'junction'`), linked-parent, and empty-target proofs gate
  `it.runIf(DIRECTORY_LINKS)`. The empty-target proof runs here: the fallback delivers `EEXIST`
  on an occupied target (measured).
- Vocabulary: the objective lane's contract change is adopted — "link text" becomes "path naming
  the destination"; exact stored text is not promised. The guide claim about absolute stored text
  on a fallback host carries the subjective lane's executed proof.
- New proofs adopted: file-source refusal leaving no entry (`!FILE_LINKS && DIRECTORY_LINKS`);
  relative-source resolution (ungated); stored-text `isAbsolute` (`!FILE_LINKS &&
  DIRECTORY_LINKS`); `createLink` unit proofs in `helpers.test.ts`; the objective lane's
  dangling-source later-resolves-as-directory disclosure lands in guide prose.
- `readInventory` fixture links in `helpers.test.ts` whose type is `'dir'` convert to
  `'junction'` under `DIRECTORY_LINKS` so their refusal/skip semantics run on this host;
  `'file'`-symlink fixtures stay on `FILE_LINKS`. (Extension of the subjective lane's table to
  the sibling file; the implementer verifies each site.)
- Scaffold follow-on adopted (both lanes): dissolve `createWorkspace.link` into `scratch.link`,
  keep the returned destination path, point the `@remarks` at the package contract.

## Subject B — caller-refused target names

The objective lane's narrower mechanism is adopted: `resolveWorkspaceFile` is UNCHANGED
(`ENOENT`/`ENOTDIR` walk break and the `ENAMETOOLONG`/`ERR_INVALID_ARG_VALUE` catch survive);
the discrimination is taken at `RuntimeStage.#specification`'s final create: an `ENOENT` whose
`dirname(file)` still stats as a directory is `claimant`/`refused` with the native error as
`cause`. The subjective lane's predicate extraction is kept: the rule lives as exported
`isRefusedName(file, error)` in `probe/src/server/helpers.ts` (all of `ENAMETOOLONG`,
`ERR_INVALID_ARG_VALUE`, and the `ENOENT`-with-existing-parent branch), unit-proved with errors
produced by real operations, used at that one site. The subjective lane's `realpathSync` wrap at
`helpers.ts:94` is NOT taken — it changes `resolveWorkspaceFile` behaviour the failing proof
does not need; recorded as a carried finding (a mid-walk race can surface as
workspace/`malformed`). Test gate: `REFUSED_RUNTIME_TARGETS` capability probe in probe's
`tests/setupServer.ts` (objective lane) — a host with long paths enabled makes the proof
inapplicable, so the gate is honest. Guide wording moves from the length limit to the host
refusal (both lanes).

## Subject C — malformed TypeScript project

Converged, adopted: in `TypeStage.#service`, one `normalizePath(path)` spelling feeds
`readConfigFile` and `parseJsonConfigFileContent` (path and `dirname` arguments); caches stay
native-keyed; `#translate` unchanged; `createLanguageService` and `getCurrentDirectory`
untouched (observation); the new proof builds a malformed caller-named project and asserts
probe's `{ origin: 'workspace', code: 'malformed' }` refusal whose message carries the
workspace-relative project, no `Debug Failure`, and no backslash; ungated on every host. The
objective lane verified the compiler assertion sites in the installed TypeScript 6.0.3.

## Findings carried (each names its carrier)

- `TypeStage.#issue` forwards untranslated diagnostic prose that can carry native absolute paths
  (both lanes) → carried to the probe wave-2 unit list in `plan.md`.
- `resolveWorkspaceFile`'s unwrapped `realpathSync(descendant)` can surface a mid-walk race as
  workspace/`malformed` (subjective lane) → carried to the probe wave-2 unit list.
- `mkdirSync` of an overlong component reports `EINVAL` here; a caller's refused DIRECTORY
  component stays workspace-origin (both lanes, deliberate) → recorded as an observation in
  `measurements.md`; no unit.
- Dangling junction resolves later only to a directory (objective lane) → guide prose in unit A3.
- Junction semantics beyond this NTFS host are inferred, not measured (objective lane R1) →
  documented limit; no unit on this host.

## Routing (deviations recorded in routing-ledger.md)

- A1 (test src: `createLink`, factory, TSDoc) → Sol `implementer`, bench, workspace-write rooted
  at the test checkout. Acceptance is scoped format/lint/typecheck plus logic criteria; no suite
  gate inside the exec.
- A2 (test tests: gates, probes, new proofs) → Opus `implementer`, native — the proofs create
  junctions and iterate against real runs the bench sandbox cannot host reliably.
- A3 (test guide) → Opus `implementer`, native (guides project run).
- Tarball swap → Orchestrator-owned tracked commands.
- A4 (scaffold setup) → Opus `implementer`, native.
- B, C (probe) → Opus `implementer`, native — the proofs boot embedded Vitest. Audited by Sol.
- A1's audit → Opus `reviewer` + `checker`; A2/A3/A4/B/C audits → Sol `analyst`.
