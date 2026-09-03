# Unit conform-browser fix round 1 — the report's evidence branches and one unrecorded rename

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-browser-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/browser`.

## Objective

Close the round-1 objective lane's findings F1 to F3 (`units/l3/browser-objective-r1.md`), all on the record: browser-obj-2 and browser-obj-3 carry a sweep and a stated reason for having no red; the `windowsRoots` sweep row names the same population as its siblings; the moved case's title rename is recorded under § Recorded corrections.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (name the pattern and the paths behind every sweep result; record a permitted hit as permitted).

**The lane's readings.** Line numbers are the report's at 20:1x UTC and can have moved; read each site before changing it.

- F1: browser-obj-2 (`Date.now()` → `performance.now()` for elapsed readings) and browser-obj-3 (`localhost` → `127.0.0.1` in the CDP test server's `url` and `endpoint`) are `applied` with no control row (`report.md:92-98`) and no sweep row (`:113-122`). Add to § Sweeps: `Date\.now\(` over `tests`, empty, with the retained `src` hits ruled outside the row's population; `localhost` over `tests`, with `tests/src/server/Browser.test.ts:527,541,952` and `tests/src/server/factories.test.ts:56` ruled inert string data and `tests/setupServer.ts:28,242` ruled TSDoc prose. Add one sentence under § Failing-first controls stating that neither row admits a red because the old form passes on a host resolving `localhost` to `127.0.0.1` and an elapsed reading is green on either clock.
- F2: the `\bwindowsRoots\b` row at `report.md:116` names `src`, `tests`, `guides`; extend it to `src`, `tests`, `guides`, `README.md`, `package.json`, `vite.config.ts` and re-run it (the lane read it empty over that set).
- F3: `tests/service/browser.test.ts:553` renamed a moved case's title from "via codegen" to "through codegen" while browser-obj-5's operative repair says the block moves unchanged apart from its imports; add the rename to § Recorded corrections beside the timeout decision (`report.md:188-190`) as an ancillary decision under browser-subj-8's vocabulary.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rnE '<pattern>' <paths under /home/user/fleet/browser>` (add `-i` for a case-insensitive pass), one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-browser-report.md`.

**Off-limits.** Everything else.

## Rows

1. F1: the two sweep rows and the controls sentence.
2. F2: the widened row, re-run.
3. F3: the recorded correction.
4. Append a `## Fix round 1` section naming the rows added or rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. § Sweeps carries `Date\.now\(` and `localhost` rows with every hit ruled, and the `windowsRoots` row over the widened population.
2. § Recorded corrections names the title rename.
3. The report's authored prose states no count; no file under `/home/user/fleet` changed.
