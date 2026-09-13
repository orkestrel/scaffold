# Implementation brief — U-fix-5

## Role and engine

`builder`, native Claude subagent on Sonnet, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. This unit is fully specified: the
replacement text is prescribed, and your judgment load is the wrap and the gates.

## Objective

Bound one sentence of the guide's generated-workspace toolchain paragraph to its source's
population, as the U-fix-4 audit ruled (`.orkestrel/campaign/u-fix-4-audit-verdict.md`), and make
the "first release" claim rest on every release before 11.6.0 now that each is measured.

## Items

**A. `guides/scaffold.md`, the toolchain paragraph after the artifact list in § Generated
workspace.** The sentence

```
A generated workspace therefore meets an npm that ignores the record only where a developer
installed such an npm in place of the bundled npm.
```

becomes exactly

```
A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only
where a developer installed an npm earlier than 10.9.0 in place of the bundled npm.
```

No other sentence changes. The interval sentence ("Such an npm earlier than 11.6.0 refuses …")
and the "first release" sentence now rest on a reading at every release the registry serves inside
their ranges: `.orkestrel/campaign/evidence/linux-gate/devengines-interval.log.txt` records every
release from 10.9.1 through 11.5.2 refusing under the emitted record and 11.5.1 and 11.5.2 crashing
without it, measured 2026-09-13 on the same Linux host the paragraph names. That reading is a
source, not a text change.

Re-wrap the paragraph to the file's existing width; keep every code span on one line.

## Owned files

`guides/scaffold.md`.

## Off-limits

Every other file, in particular `README.md`, `src/core/constants.ts`, `ROADMAP.md`,
`tests/guides.test.ts`, `host.json` (the Orchestrator's `build` regenerates it after you exit),
`.orkestrel/**`, `tmp/**`.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned file. Run no `git`
command that discards a working-tree change. Run no tree-wide `format` or `lint --fix`.

## Deviation contract

Stop and report if a replacement target is not found verbatim, if `test:guides` reddens, or if a
file outside the owned list must change.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run test:policy` exits 0.
4. `npm run test:guides` exits 0.
5. `grep -c 'on Node 22.18.0 or later therefore meets' guides/scaffold.md` reads 1, and
   `grep -c 'installed such an npm' guides/scaffold.md` reads 0.
6. `git diff --stat` names only `guides/scaffold.md`.

## Output

Return, as structured data: each criterion with its exact reading; the final paragraph verbatim;
the deviation state. No process diary.
