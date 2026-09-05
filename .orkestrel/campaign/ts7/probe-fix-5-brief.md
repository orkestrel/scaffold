# Unit ts7-probe-fix-5 — the two sentences round 4's checker refuted (exact transcriptions)

Successor of `tmp/units/ts7-probe-fix-4-brief.md`. What changed: the round-4 checker (`tmp/units/ts7-audit-probe-fix-4-checker.md`) confirmed every prescribed edit and refuted the one-account claim at one untouched site and the split row's stale comment.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe`. Perform the assignment directly and spawn nothing. Never write in `/home/user/scaffold`.

## Edits

1. `src/core/types.ts:453` — replace "Names the tool versions resolved from the workspace at construction." with "Names the tool versions the target workspace's installed manifests publish, read at construction."
2. `tests/setupServer.test.ts:71-72` — replace the comment "Every selection at once, in a second workspace inside the same scratch, which is how a proof that branches on the installation carries both cases." with "Every selection at once: the workspace a proof that branches on the installation reaches for its equipped case." Keep the comment's line width.
3. Run `npm run format` to converge, then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm run test:setup`, reading each exit code. Run no whole-suite test.

## Scope

**Owned.** `src/core/types.ts` (the `ProbeInterface.toolchain` doc line only), `tests/setupServer.test.ts` (the comment only). **Off-limits.** everything else; no commit, no push, no publish, no discarding git command.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-fix-5-report.md`: the two edits with their lines, each gate's exit code, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit, on any need to edit a file outside the owned set, and on an edit whose "replace" text is absent at the cited line.

## Acceptance criteria

1. Both edits read at their sites as written here.
2. Every named gate exits 0.
3. `git status --short` lists the earlier units' fourteen files and nothing else.
