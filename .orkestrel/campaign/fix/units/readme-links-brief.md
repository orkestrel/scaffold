# Unit readme-links — point every fleet README at the guide it ships

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Every fleet `README.md` that links `guides/src/<package>.md` links `guides/<package>.md`, the
file the repository holds, committed per package by the Orchestrator.

## Context

**Finding and ruling.** The L3 audit lanes found `README.md` linking `guides/src/<package>.md`, a
path no repository has, in abort, agent, browser, budget, console, contract, csv, database,
emitter, indexeddb, interpret, markdown, middleware, msg, ndjson, ollama, pool, program,
qualifier, queue, router, sea, server, sse, template, timeout, toolbox, websocket, worker,
workflow, and workspace; rater, interpret, browser, and workspace closed theirs inside their own
fix-ups. `README.md` ships in `files`, and `tests/guides.test.ts` never reads it, so no gate
catches the link. Ruling: in each README the grep names, replace every `guides/src/` link target
with `guides/` and leave the link text as it is. Derive the set from the grep, never from the
list above.

**Law.** `AGENTS.md`; `.claude/rules/writing.md` § Code tokens, references, and links.

**Host.** Linux, bash. The fleet checkouts are `/home/user/fleet/<package>`, each on branch
`claude/orkestrel-npm-audit-deps-14ibta`. Run this unit only when the Orchestrator's dispatch
names the checkouts as idle; a checkout with a live unit is off-limits. Do not run `npm install`.

**Standing conditions.** Some checkouts hold uncommitted work from an earlier unit only when the
dispatch says so; otherwise every named checkout is committed clean at launch, and a dirty one is
a deviation.

## Unknowns

none.

## Scope

**Owned.** `README.md` in every checkout `grep -l 'guides/src/' /home/user/fleet/*/README.md`
names at launch, at the link targets only.

**Off-limits.** Every other file in every checkout; `/home/user/scaffold`.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Run the grep, edit each
README, re-run the grep (expect no hit), then in each edited checkout run
`ls guides/<package>.md` to prove the target exists and `git status --short` to prove only
`README.md` moved.

## Output

Return, as data: the grep's launch set; per checkout — the line changed and the `ls` result;
the re-run grep result; per checkout `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a checkout's `guides/<package>.md` does not exist, or when a named checkout is
dirty at launch. Decide, record, and carry on from the wording of link text.

## Acceptance criteria

1. `grep -l 'guides/src/' /home/user/fleet/*/README.md` returns nothing.
2. Each edited README's target exists.
3. Each edited checkout's status lists `README.md` alone.
