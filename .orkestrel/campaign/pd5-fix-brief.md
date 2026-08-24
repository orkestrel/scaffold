# Unit PD5-FIX — bound the message rewrites to real path tokens

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Fix round adopting the analyst's prescription; the working tree carries PD5
uncommitted — you continue on the same files. The verdict is
`/home/user/scaffold/tmp/codex/pd5-audit-last.md`; read it first.

## The findings, with the auditor's exact failing inputs

1. **Unbounded root replacement.** `relativeWorkspaceMessage` rewrites every occurrence of
   the root spellings globally: `Cannot find /mirror/home/user/orkestrel/probe/src/core/x.ts`
   with workspace `/home/user/orkestrel/probe` becomes `Cannot find /mirrorsrc/core/x.ts` —
   a foreign path corrupted. Bound the replacement to actual path-token boundaries (the
   root spelling matches only where a path begins, never mid-token).
2. **Separator-terminated roots.** With workspace `/`, `Cannot find /tmp/probe/x.test.ts`
   stays absolute (the helper searches for the root plus a separator, which never matches a
   root already ending in one). Handle it: baseline `#translate` with `path: '/tsconfig.json'`
   produced `tsconfig.json`, and that behavior must survive the fold.
3. **Over-broad revision removal.** The revision expression rewrites ANY revision-shaped
   substring: `Failed tmp/notes.probe-4821-1f0c9d2e-….ts` (a target-owned name carrying a
   complete marker) becomes `Failed tmp/notes.ts`, contradicting the helper's own TSDoc.
   Replace only the EXACT generated specification the runtime stage knows — either the
   caller supplies the known revision name, or the runtime stage performs its own exact
   replacement — never a shape match over arbitrary prose. Align the TSDoc with what lands.
4. **Evidence wording.** The retained report's red table misattributes the escaped-text red:
   it was the negative control against the rejected whole-message variant, not a baseline
   red. Your report states the corrected attribution for the record.

## Red-first

Each failing input above lands as a test red first (against the current helper), then green.
The complete-marker regression joins the owned-name tests. Keep every PD5 pin green.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/stages/RuntimeStage.ts` and
  `src/server/stages/TypeStage.ts` (only if the exact-name route or the root handling needs
  their call sites), `tests/src/server/helpers.test.ts`, the stage test files ONLY if a pin
  the fix makes false needs flipping (name any flip).
- Off-limits: everything else. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean; `npm run check:src:server` green.
2. Every failing input from the verdict recorded red then green; the complete-marker,
   prefix-embedded-root, and root-workspace regressions all present.
3. The TSDoc states exactly what the helper does; every PD5 pin green in scoped runs.

## Output

Final message = report: the bounded mechanism (file:line), the revision-name route chosen,
red/green records per input, the corrected evidence attribution, gate tails,
`git diff --stat`, `git status --porcelain`, deviations or none.
