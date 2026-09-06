# Unit report — U7-fix-a

## Files touched

- `src/server/stages/TypeStage.ts`
- `src/server/stages/RuntimeStage.ts`
- `src/server/helpers.ts`
- `src/server/types.ts`
- `src/core/types.ts`
- `tests/src/server/helpers.test.ts`
- `tests/src/server/stages/TypeStage.test.ts`
- `tests/src/core/errors.test.ts`
- `guides/probe.md`

`tests/src/server/parsers.test.ts` and `src/server/parsers.ts` were already present from U7 and
needed no change. `tests/src/server/stages/RuntimeStage.test.ts` needed no change beyond the scoped
run proving it green; it stays unmodified.

## Per edit

1. **`#configure` reads text, spawns against the mirror.** `#configure` now calls `this.#refresh()`
   on a cache miss and spawns `--showConfig` with `cwd: this.#mirror`, reading
   `parseProjectConfig(execution.stdout)` unconditionally rather than gating on `execution.status`.
   Updated the `#configure` comment, the `#resolve` TSDoc, and the guide's digest paragraph
   (`guides/probe.md` around the "project digest" sentence) to state the mirror-cwd reading and that
   an escaping relative path resolves against the mirror's own (empty) ancestors.
   Command: `npx tsc --noEmit --project tsconfig.json` → clean; `npx tsc --noEmit -p
   configs/src/tsconfig.server.json` → clean.
2. **`#check` reads diagnostics, not stderr/exit branches.** Collapsed the two throw branches into
   one: raises only when `diagnostics.length === 0 && execution.status !== 0` (an absent status
   already satisfies `!== 0` in JavaScript, so no separate branch was needed), with the message
   drawn from trimmed stderr, else an exited-status or ended-by-signal sentence. Updated the method
   comment accordingly.
   Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server
   tests/src/server/stages/TypeStage.test.ts` → `Tests 25 passed (25)`.
3. **`#issues` classifies by resolved path and drafts.** `#issues` now resolves `diagnostic.path`
   against the mirror, raises the workspace fault when the path is absent or the resolved file is a
   `.json` file not present in `this.#drafts`, and otherwise reports the claimant path as
   mirror-relative, workspace-relative, or `normalizePath` of the absolute resolved path, in that
   order of containment. Rewrote the inline comment and the guide's "A diagnostic about a project
   belongs to the workspace" paragraph to the new rule (a drafted `.json` file is the claimant's).
   Command: same `TypeStage.test.ts` run above (covers the malformed-project, missing-project, and
   candidate-type-error cases that exercise this method).
4. **One workspace walk.** Added `collectWorkspaceFiles(workspace)` to `src/server/helpers.ts`
   (full TSDoc with `@remarks` and `@example`), deleted both `#walk` generators from `TypeStage.ts`
   and `RuntimeStage.ts`, and pointed `#refresh` (type stage) and `#snapshot`/`#sweep` (runtime
   stage) at the shared helper. Removed the now-unused `Dirent`, `readdirSync`, `join`, and
   `TYPE_MIRROR` imports from `RuntimeStage.ts`. Added the guide helper-table row after
   `matchesLiveProcess`, and a `collectWorkspaceFiles` case to `helpers.test.ts` over a scratch tree
   with `src/a.ts`, `.git/HEAD`, `dist/a.js`, `node_modules/pkg/index.js`, and `tmp/type/1-x/b.ts`,
   named `collects only a regular file outside the excluded trees and no symbolic link`; it attempts
   a symbolic link and relies on the strict-equality assertion to prove the link (when created)
   never entered the result, which sidesteps a conditional `expect` `oxlint` refuses.
   Commands: `npx vitest run … --project src:server tests/src/server/helpers.test.ts` →
   `Tests 49 passed (49)`; `npx vitest run … --project src:server
   tests/src/server/stages/RuntimeStage.test.ts` → `Tests 40 passed (40)`.
5. **Symbolic-link ruling pinned.** Added a module-scope `LINKS` probe to `TypeStage.test.ts` (a
   scratch `symlinkSync` attempt, `it.skipIf(!LINKS)` guarding the new case) and the case
   `reports a claimant issue for an import reachable only through a symbolic link`: a scratch
   workspace holding `src/core/real.ts` and a symbolic link `src/core/linked.ts`, a draft
   `src/core/reader.ts` importing `./linked.js`, asserting one claimant issue at
   `src/core/reader.ts` whose message contains `Cannot find module './linked.js'`. Rewrote the
   guide's "A read is contained lexically only" paragraph: the mirror carries regular files inside
   the workspace only, a symbolic link is not carried, Oxlint (which reads the workspace directly)
   still follows an in-workspace symbolic link outside the tree, and a `Claim.project` escaping
   through `extends`/`files`/`include`/project references reaches nothing in the mirror. Ran this
   host: `LINKS` evaluated `true` (Linux, root), so the case ran rather than skipped.
   Command: same `TypeStage.test.ts` run — the new case is among the 25 passing.
6. **Parser shapes pinned.** Added `describe('scanDiagnostics', …)` to `helpers.test.ts` with the
   cases named: `reads a carriage-return-separated text the same as its newline twin`,
   `lowers each UTF-16 column by one for three diagnostics sharing one line`,
   `joins two indented elaboration lines into a located diagnostic message`,
   `joins an indented elaboration line into an unlocated diagnostic message`,
   `reads a warning line as a diagnostic`, and
   `yields no record for a line naming neither a diagnostic nor an elaboration`.
   Command: `helpers.test.ts` run above, 49/49 passing includes these.
7. **`Diagnostic.code` removed.** Dropped `code` from the `Diagnostic` interface and its TSDoc
   example (`src/server/types.ts`), from `scanDiagnostics`'s two regular expressions (the `TS\d+`
   token stays uncaptured) and its returned records, from every test record in `helpers.test.ts`,
   and from the guide's `Diagnostic` Surface row and `scanDiagnostics` helper-table description
   (unchanged text there already made no `code` claim).
   Command: `grep -rn "code: 'TS" src tests guides` — no remaining hits (checked before editing);
   typecheck and the `helpers.test.ts`/`TypeStage.test.ts` runs above confirm no consumer broke.
8. **`loadWorkspaceModule` renamed to `loadWorkspaceVitest`.** Dropped the `specifier` parameter,
   rewrote the TSDoc and `@example`, and updated every call site: the constructor, `#runner`, and
   `#replace` in `RuntimeStage.ts`; the two uses in `helpers.test.ts`; the one use in
   `errors.test.ts`; and the guide row (kept its table position, between `resolveWorkspaceModule`
   and `readWorkspaceManifest`).
   Command: `grep -rn "loadWorkspaceModule" src tests guides` → no hits; the `helpers.test.ts` and
   `errors.test.ts` runs above are green.
9. **Names.** Renamed `#clear` to `#displace` and `#build` to `#createMirror` in `TypeStage.ts`,
   updating their one call site each; no comment named either method by its old identifier.
   Command: `grep -rn "#clear\|#build(" src tests guides` → no hits.
10. **`normalizeValue` remarks restated.** Rewrote the `@remarks` to read: `tsc --showConfig` spells
    a path relative to the project file, so a printed record carries an absolute path only where a
    project declares one; rewriting a contained absolute path keeps one commit read at two roots to
    one digest; key order is the compiler's own and differs between the supported majors, so sorting
    removes a difference that means nothing. The `@example` is unchanged.
11. **`Issue` example.** In `src/core/types.ts`, the `@example` range now reads
    `end: { line: 0, character: 6 }`, matching `start`.

## Unknowns answered

- **Skip form.** `.claude/rules/tests.md` § line 39 requires a conditional skip to cite the
  mechanism that makes it inapplicable. The nearest existing conditional skip in this suite is
  `RuntimeStage.test.ts`'s `it.runIf(DIRECTORY_LINKS)` pattern, driven by a module-scope boolean
  computed once by attempting the mechanism and reading success, with a comment naming the host
  limit. `TypeStage.test.ts`'s new `LINKS` probe follows that same shape (`it.skipIf(!LINKS)`, a
  module-scope IIFE attempting `symlinkSync` in a scratch, comment citing `EPERM`).
- **A `TypeStage.test.ts` case reading a digest of a project it edited on disk after construction.**
  `reads one project configuration for the life of the stage` (line ~499) constructs the stage,
  calls `resolve`, edits `tsconfig.json` on disk, calls `resolve` again on the same stage expecting
  the digest unchanged (`#configs` cache), then builds a fresh `TypeStage` and resolves again
  expecting a different digest. This reddened nothing: edit 1 only changes where `#configure` reads
  from on a cache miss (the mirror, refreshed first) — the cached branch (`existing !== undefined`)
  is untouched, so the retained digest still equals the pre-edit reading and the rebuilt stage's
  fresh digest still differs. The full `TypeStage.test.ts` run confirms this case passes.

## Acceptance criteria

1. PASS — `npx oxfmt --config .oxfmtrc.json --check <each owned file>` exits 0 (verified per file
   and as a batch; `guides/probe.md` required one in-place `oxfmt` run to realign every row's pipe
   padding across the two tables that gained/lost cell width — diffed against the pre-edit copy and
   confirmed only `|`-delimited table lines moved, no prose changed).
2. PASS — `npx oxlint --config .oxlintrc.json --deny-warnings <each owned file>` exits 0 (one
   `no-conditional-expect` finding in the new `collectWorkspaceFiles` test was fixed by relying on
   `toStrictEqual` alone rather than a conditional `expect`).
3. PASS — `npx tsc --noEmit --project tsconfig.json` exits 0; `npx tsc --noEmit -p
   configs/src/tsconfig.server.json` exits 0.
4. PASS — `grep -rn "loadWorkspaceModule\|#walk\|#clear\|#build(" src tests guides` prints nothing
   (fixed a leftover prose mention of `` `#walk` `` in a `RuntimeStage.ts` comment after the first
   grep found it).
5. PASS — `grep -n "execution.status === 0" src/server/stages/TypeStage.ts` prints nothing.
6. PASS — scoped runs all exit 0: `helpers.test.ts` 49/49, `parsers.test.ts` 8/8,
   `TypeStage.test.ts` 25/25 (40.15 s), `RuntimeStage.test.ts` 40/40 (17.36 s and 17.66 s across two
   runs), `errors.test.ts` 8/8. No timing-class failure observed in any run.
7. PASS — the new cases exist under the names quoted in items 4–6 above, matching exactly what the
   report names.

## Deviations

None. Every edit landed as specified; the only judgment calls were the exact wording of the
rewritten prose paragraphs (edit 1's digest paragraph, edit 3's "belongs to the workspace"
paragraph, and edit 5's "contained lexically only" paragraph) and the test-file placement of the new
cases, all recorded above.
