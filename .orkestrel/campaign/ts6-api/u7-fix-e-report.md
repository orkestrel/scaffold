# Report — U7-fix-e: the guide table and the serialization fixture's race (probe)

## Edit 2 — the fixture's wait (applied)

Before, in `tests/src/server/Probe.test.ts` case `serializes project resolution against a live
type inspection`:

```
const inspecting = probe.prove(first)
await waitForDelay(100)
const resolving = probe.prove(second)
```

After:

```
const inspecting = probe.prove(first)
// The first claim's project resolution costs about 100 ms idle and more under
// load, and the second claim must queue behind the first claim's inspection
// rather than its resolution, so the wait clears the resolution on a contended
// host; the inspection of the heavy drafts outlasts it by seconds.
await waitForDelay(1_000)
const resolving = probe.prove(second)
```

The 20 ms wait before the rewrite is unchanged. `git diff` on this file shows only this hunk (plus
the added comment) inside the named case; confirmed with `git diff tests/src/server/Probe.test.ts
| grep -n "waitForDelay"`, which shows exactly the one `100` → `1_000` line change.

## Edit 1 — the `resolve` row: STOPPED on deviation

Before, in `guides/probe.md`'s `TypeStageInterface` method table:

```
| `resolve` | `Promise<Project>` | Resolves one project to the resolved path and options digest the stage applies for it, read from the compiler's own `--showConfig` printout against the workspace copy of that project. |
```

I applied the text change to:

```
| `resolve` | `Promise<Project>` | Resolves one project to the resolved path and options digest the stage applies for it, read from the compiler's own `--showConfig` printout against the mirrored copy of that project, with the mirror as the current directory. |
```

Then ran `npx oxfmt --config .oxfmtrc.json --write guides/probe.md` as the brief directs, and
checked `git diff guides/probe.md` to confirm the diff touches the `TypeStageInterface` table
alone, per the brief's instruction.

**Deviation.** The diff does not touch that table alone: `git diff --stat guides/probe.md` reports
384 changed lines across the whole guide (`git diff --stat`: `guides/probe.md | 384
++++++++++++++++++++++++-----------------`). The additional hunks are not padding side effects of
my one-row edit; they carry real content differences that predate this unit — added rows
(`TYPE_MIRROR`, `Diagnostic`, `ProjectConfig`, `Execution`), a removed row (`OverlayOptions`), and
reworded prose (for example the `Issue` row's "range" sentence and the `StageInterface`
description's "resident-stage" → "stage") — that fixes a-d left uncommitted in the guide without
running the formatter on them. I confirmed the formatter does not invent such rows, and traced them
by comparing against `git show HEAD:guides/probe.md`, where these rows and this prose are absent
(the working tree is dirty with fixes a-d, per the brief's own note). I also confirmed the
formatter does not touch tables with no pending content changes: the unrelated `LintStageInterface`
method table (about lines 264 to 268) shows no diff at all, while every table whose content already
carried an unformatted a-d edit was repadded by the `--write` I ran.

The brief's premise — that only the `TypeStageInterface` method table failed `oxfmt --check` before
this unit's edit — does not hold: the whole guide was already formatter-dirty from earlier
uncommitted fixes, so a scoped `--write` on this file cannot avoid repadding those other tables
too. I did not attempt to hand-revert the other tables' padding to an unknown prior state, because
I have no snapshot of the pre-`--write` file (the `Edit` tool does not retain one, and reconstructing
it from `HEAD` would require guessing at a-d's exact intermediate padding) and because a-d's content
is off-limits.

**Done / not done.** Edit 2 (the fixture's wait) is done and verified isolated. Edit 1's text
change is applied, but the required `--write` confirmation step failed, so I stopped per the
brief's Deviation contract rather than declaring the row done or running the remaining
oxfmt-dependent acceptance criteria (1 and 2) against a file I cannot confirm is scoped correctly.
The tree currently holds: the resolve-row text change, the whole-guide repadding from the
`oxfmt --write` run (which also happens to make every other pending a-d edit formatter-clean), and
the isolated test-file wait change.

**Hypothesis.** Fixes a-d left `guides/probe.md` with unformatted content edits beyond the
`TypeStageInterface` table, so the brief's "touches that table alone" check cannot pass until those
edits are formatted too.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check guides/probe.md tests/src/server/Probe.test.ts` — not
   run to completion as a criterion; the guide's formatter state is the open deviation above.
2. `grep -n "against the workspace copy" guides/probe.md` — PASS (no output; evidence above).
3–5. Not run, pending the Orchestrator's ruling on the deviation, per the Deviation contract's
   instruction to stop rather than improvise past it.

## Deviation

See "Edit 1 — the `resolve` row: STOPPED on deviation" above.
