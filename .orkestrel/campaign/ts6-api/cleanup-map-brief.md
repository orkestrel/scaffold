# Unit ts6-cleanup-map — every trace of the TypeScript 7 campaign, and what removing it restores

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in `--mode=ask`. You are the bench engine reading this brief inside your own CLI. Perform the assignment directly and spawn nothing. Work read-only: never create, edit, or delete a file, and never run a command that changes a tree (no `git` write, no `npm install`). `git log`, `git diff`, `git show`, and `grep` are the reads you need.

## Objective

The owner has ruled: the fleet stays on TypeScript 6.0.3, the `@typescript/typescript6` bridge and every TypeScript 7 change are removed, and the in-process compiler API is removed by a later plan. Return a distillate, with `file:line` pointers and commit hashes, that lets an Orchestrator clean the TypeScript 7 campaign out of `/home/user/scaffold` (branch `claude/orkestrel-npm-audit-deps-14ibta`) and `/home/user/fleet/probe` (branch `main`) with git reverts plus a short list of residue edits, leaving both trees exactly as they were before the campaign except where a later commit unrelated to 7 must stay.

## Question

Which commits carry the 7 campaign, which hunks in those commits are 7-specific and which are unrelated improvements that would be lost by a plain revert, and which lines outside those commits (records, roadmap, guides, proposal, fixtures, instruments, mirrors) still name the 7 work after the reverts?

## Context

**Evidence the Orchestrator supplies (2026-09-05):**

```text
scaffold: main is at 47200d6c "Adopt the @typescript/typescript6 bridge at every in-process TypeScript API site" (stage 1, on main); its parent is the pre-campaign state.
scaffold branch claude/orkestrel-npm-audit-deps-14ibta after main: c4bee5da (records), 6c46f547 "typescript ^7.0.2 … typescriptCompilerFolder … APP_BROWSER_TYPESCRIPT_RANGE" (stage 2), 70f42aa7 (the fix rounds over stage 2), e95d34e8, 8c2cbfc8, f6f55e10, 8c3e88aa, a884603b (records only, under .orkestrel/campaign/ts7 and ts7-break). Run `git -C /home/user/scaffold log --oneline 47200d6c^..HEAD` to confirm.
probe: main is at 9331ef4 "Load the compiler through @typescript/typescript6 when the workspace's typescript is 7"; its parent b331d93 is the pre-campaign state. Run `git -C /home/user/fleet/probe log --oneline b331d93..HEAD`.
Records live under /home/user/scaffold/.orkestrel/campaign/ts7/ and /home/user/scaffold/.orkestrel/campaign/ts7-break/ (the campaign folders the retention procedure prunes at acceptance).
```

**Law.** Read `/home/user/scaffold/AGENTS.md` § Writing before writing the distillate: no counts of growable sets in prose (a table row per member is fine), `file:line` pointers, plain sentences.

## Rows to return

1. **Commit map.** For scaffold (`47200d6c^..HEAD`) and probe (`b331d93..HEAD`): one row per commit with its hash, subject, the files it touches, and a ruling: `revert whole` (every hunk is 7-specific), `revert with exceptions` (name the hunks to keep and why), or `records only` (touches only `.orkestrel/`).
2. **Hunks a plain revert would lose.** Read `git -C /home/user/scaffold diff 47200d6c^ HEAD -- . ':!.orkestrel'` and `git -C /home/user/fleet/probe diff b331d93 HEAD` in full. For every hunk that is an improvement independent of TypeScript 7 (a test helper, a fixture builder, a prose correction, a guard) name the file, the lines, and one sentence on why it stands on its own; for every other hunk say `7-specific`. Be strict: a change whose only reason is the bridge, the 7 range, the `typescriptCompilerFolder` override, the `app/browser` fork, or the widened peer is 7-specific even when it reads as a cleanup.
3. **Residue after the reverts.** Every line that would still name `@typescript/typescript6`, `typescript6`, `typescriptCompilerFolder`, `APP_BROWSER_TYPESCRIPT_RANGE`, `^7.0.2`, `7.0.2`, `TypeScript 7`, `tsgo`, `unstable/sync`, `unstable/ast`, `unstable/async`, `native-preview`, `vuejs/language-tools`, `issue 5381`, `retirement phase`, or `R1`/`R2`/`R3` as retirement rows, in: `/home/user/scaffold/PROPOSAL.md`, `/home/user/scaffold/ROADMAP.md`, `/home/user/scaffold/guides/**`, `/home/user/scaffold/src/**`, `/home/user/scaffold/tests/**`, `/home/user/scaffold/configs/**`, `/home/user/scaffold/.claude/**`, `/home/user/scaffold/.agents/**`, `/home/user/scaffold/host.json`, `/home/user/fleet/probe/guides/**`, `/home/user/fleet/probe/src/**`, `/home/user/fleet/probe/tests/**`, and every other fleet checkout's `guides/probe.md` and `guides/scaffold.md` mirrors (`/home/user/fleet/*/guides/`). Compute this against the pre-campaign trees (`git show 47200d6c^:<path>` and `git show b331d93:<path>`) so a line that predates the campaign is reported as pre-existing, not as residue.
4. **Instruments and launch copies.** Files under `/home/user/scaffold/tmp/`, `/home/user/scaffold/.orkestrel/campaign/ts7/`, `/home/user/scaffold/.orkestrel/campaign/ts7-break/`, `/home/user/fleet/probe/tmp/`, and the `ts7`-named scripts anywhere under those trees, with the retention procedure's file `/home/user/scaffold/.agents/skills/orkestrel-debrief/references/retention.md` read for what a prune must record.
5. **The proposal.** Every sentence in `/home/user/scaffold/PROPOSAL.md` that rests on the compiler API (`ts.getJSDocCommentsAndTags`, `ts.displayPartsToString`, `createSourceFile`, `typescript/unstable/*`, the bridge) with its line, so the later plan can re-home the proposal's TSDoc reader on the oxlint plugin surface.
6. **Unknowns**, each named with what was read and what was not.

## Output

Distillate only, in the sections the rows name, each row with its evidence, then Unknowns. No process diary, no raw dumps. End with `Deviation: none` or a deviation naming what stopped you.
