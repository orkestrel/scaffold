# Unit workspace-fixup-2 — successor to workspace-fixup

Supersedes `/home/user/scaffold/tmp/units/breaking/workspace-fixup-brief.md` for finding 1's seed
list and its acceptance wording; everything else in that brief stands. What changed and why: the
seed `path.every( → path.some(` reddens the pre-existing multi-path `has` case at
`tests/src/core/workspaces/Workspace.test.ts:215` as well as the pin, because both drive the same
branch, and the original wording "exactly its own pin" refused that. A proof binds when the pin's
own case went red under its seed; other cases the same seed reddens are recorded, never a
deviation. The seeds are now scoped to the empty batch so nothing else moves.

## Role and engine

`builder` on Claude Sonnet, the same native subagent, continuing. You perform the assignment
directly and spawn nothing.

## State at hand-off

`tests/src/core/workspaces/Workspace.test.ts` already holds the three split `it` cases and
`README.md:44` already links `guides/workspace.md`; `git diff --stat src` is empty. Keep both
edits.

## Finding 1, amended — the four seeds

Run each seed alone, in this order, with
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`;
record the failing case name and message; restore by editing the exact text back; confirm with
`git diff --stat src` before the next seed.

1. `src/core/workspaces/Workspace.ts:116`: replace
   `if (isArray(path)) return path.every((one) => this.#files.has(one))` with
   `if (isArray(path)) return path.length > 0 && path.every((one) => this.#files.has(one))`.
   Expected red: the `has([])` case only. Restore the original line.
2. `src/core/workspaces/Workspace.ts:216`, the line `if (isRecord(from)) {`: insert the line
   `if (Object.keys(from).length === 0) return false` directly after it. Expected red: the
   `move({})` case only. Delete the inserted line.
3. `src/core/workspaces/Workspace.ts:230`, the line `if (isArray(path)) {` inside `remove`: insert
   the line `if (path.length === 0) return false` directly after it. Expected red: the
   `remove([])` case only. Delete the inserted line.
4. `src/core/workspaces/WorkspaceManager.ts:107`, the line `if (isArray(ids)) {`: insert the line
   `if (ids.length === 0) return false` directly after it. Expected red: the manager's
   `remove(ids[]) of an empty batch returns true and drops nothing` case only. Delete the inserted
   line.

If a seed reddens a case beyond the one named, record that case beside the pin and carry on; the
pin's own red is what binds. Then run the gate chain from the original brief.

## Output, acceptance, and deviation contract

As the original brief states, with acceptance criterion 1 now reading: each of the four pins went
red under its own seed with the failing message recorded, then green, and any extra case a seed
reddened is recorded.
