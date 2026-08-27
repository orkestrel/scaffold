# Unit brief: prune the directories a removal empties

## Role and engine

`implementer` on Claude Opus 5. The Sol bench is dark this session (`codex` CLI ENOENT), so the
objective implementation lane runs on Opus per the engine-unavailable table; the substitution is
recorded in the campaign record.

## Objective

`Materializer.remove` (and therefore the `overwrite` verb, whose deletions all pass through it)
deletes every tracked foreign file but leaves the emptied directories standing. After the first
real-target sweep, `.agents` held 30 empty directories and `.codex`, `.cursor`, `.claude/rules`,
and `.claude/skills` their skeletons; git never sees them, so `audit` exits 0 while the working
tree keeps the shape of the deleted set. Make the removal prune every directory its own deletions
emptied. Also carry two documentation corrections the same trial surfaced in
`.agents/skills/orkestrel-publish/references/wave.md`.

## Context

- Repository: `/home/user/scaffold`, branch `claude/scaffold-proposal-impl-nabmm9`, tip `be96150`,
  clean tree. Read `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
  `.claude/rules/names.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`,
  `.claude/rules/documentation.md` before editing. No skill is dispatch-named. The governing guide
  is `guides/scaffold.md`.
- `Materializer.remove` is at `src/server/Materializer.ts:467`; the deletion commits in `#purge`
  (`src/server/Materializer.ts:1049`), whose only caller is `remove` at line 494. `#purge` closes
  the transaction, receives the final `removed` relative paths, and emits one `remove` event per
  path.
- `src/server/helpers.ts` already exports `resolveContainedPath(root, path)` (line 570, returns
  `undefined` for an escaping path), `isPhysicalDirectory(path)` (line 400), and `listFiles`.
  Reuse them; add no dependency.
- Paths in `removed` are artifact-relative with `/` separators (for example
  `.agents/skills/orkestrel-falsify/references/brief.md`).
- Standing condition: `guides/scaffold.md` and
  `.agents/skills/orkestrel-publish/references/wave.md` are staged host files — editing either
  makes the committed `host.json` inventory stale until `npm run build` regenerates it, so the
  floor-reading suites are expected red between your edit and the Orchestrator's build. Do NOT run
  `npm run build` yourself; the Orchestrator runs it after integration. Validate with scoped
  commands only.
- A `prove` MCP server is registered in this session; use it only if a claim in your report needs
  it, per `.claude/rules/quality.md` § Instruments.

## The change

1. **Helper.** Add `pruneEmptiedDirectories(target: string, removed: readonly string[]): readonly string[]`
   to `src/server/helpers.ts` (exported, full TSDoc). Behavior: collect every ancestor directory of
   every removed relative path (`a/b/c.md` contributes `a/b` and `a`), dedupe, order deepest
   first, and for each candidate resolve it with `resolveContainedPath` (skip `undefined`), skip
   anything that is not a physical directory, and remove it only when it is empty (read the
   directory and require zero entries before `rmdirSync`). Never touch the target root itself.
   Return the pruned relative paths in pruning order. The function must tolerate a missing target
   and remove nothing there.
   - TSDoc `@example` executes truthfully inside an installed package — the distribution proof
     runs shipped examples. Use a vacant fictional root so the example returns `[]`, for example
     `pruneEmptiedDirectories('vacant', ['notes/entry.md']) // []`. No `/tmp` literal anywhere
     (`.claude/rules/portability.md`).
2. **Wiring.** In `#purge`, after the transaction closes and the `remove` events are emitted, call
   the helper with the final `removed` list. Do not add pruned directories to `MaterializeResult`
   and do not emit events for them; extend the `remove` TSDoc `@remarks` with one sentence stating
   that directories the deletions emptied are pruned.
3. **Tests, red first.** Extend `tests/src/server/helpers.test.ts` with cases for the helper:
   prunes an emptied nested chain deepest-first; keeps a directory still holding an unrelated
   file; keeps a directory holding a surviving subdirectory that is outside every removed path's
   ancestor chain; skips an escaping path; returns `[]` for a vacant target. Extend the existing
   `remove` coverage in `tests/src/server/Materializer.test.ts` with one case proving that after
   `remove` deletes a nested tracked foreign file, the emptied directories are gone from the tree
   while a directory still holding an unrelated file survives. Record the exact command and
   failing count of the Materializer case BEFORE wiring the fix (write the test, run it red
   against the unwired code, then wire `#purge` and run it green) — the red run binds the test to
   the defect.
4. **Guide parity.** In `guides/scaffold.md`: add the helper's row to the server export table
   (match the table's existing form), and one sentence in the prose that describes the removal
   behavior stating that the sweep prunes the directories its deletions emptied.
5. **Wave corrections.** In `.agents/skills/orkestrel-publish/references/wave.md`:
   - The migration bullet currently triggers on a catalog file that "still opens with a
     repository-relative `.agents/` read instruction". A real pre-split target's body opens with
     the old specialist charter instead and never matches. Rewrite the trigger to key on the stale
     pre-split body itself: the file's body outside the marker-bounded table differing from the
     floor copy the installed scaffold stages. Keep the rest of the bullet's mechanism (delete the
     file, commit the deletion before the run) intact.
   - In the paragraph on restoring an unpublished tarball, add one sentence: stage an unpublished
     tarball with `npm install --no-save`, because a `file:` pin refuses the blueprint and the
     manifest keeps a registry range.
   Follow `.claude/rules/writing.md` throughout (no counts, `after` not temporal `once`,
   imperative form).

## Unknowns

None load-bearing. If the Materializer test fixture idiom for tracked foreign files differs from
what this brief assumes, follow the existing fixture idiom in `tests/src/server/Materializer.test.ts`
and say so in the report.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/Materializer.ts`,
  `tests/src/server/helpers.test.ts`, `tests/src/server/Materializer.test.ts`,
  `guides/scaffold.md`, `.agents/skills/orkestrel-publish/references/wave.md`.
- Off-limits: everything else, `host.json` and `dist/` included. No commits, no pushes, no
  installs, no `git checkout`/`restore`/`stash`/`reset`/`clean`, no tree-wide `format`, `lint --fix`,
  or `build`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Write the report to `tmp/units/prune-report.md` and return its content as your final message:
what changed per file, the red-then-green evidence for the Materializer case (exact commands,
failing and passing counts), the scoped validation you ran with exit codes, anything you could not
close, and any claim of your own you flag.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, at most one hypothesis) on any
conflict with the primary objective: the purge wiring not being the single deletion door, an
existing test contradicting the prune, or the guide table shape not admitting the row. Ancillary
choices — wording placement, test naming — are yours to decide and record.

## Acceptance criteria

1. `npx tsc --noEmit` scoped or root typecheck of the touched sources passes (report the command).
2. The helper test cases and the Materializer case pass:
   `npm run test:src:server -- --run` scoped as the suite allows; report the counts.
3. The Materializer case's red run is recorded before the wiring, green after.
4. `guides/scaffold.md` names the helper in the server export table and the prune sentence in the
   removal prose; the wave trigger no longer names the `.agents/`-opening form; the `--no-save`
   sentence exists.
5. No file outside the owned set changed (`git status --short` in the report).

## Review evidence

Include in the report: the exact `git diff --stat`, the `git status --short` output, and the
red/green command outputs for criterion 3.
