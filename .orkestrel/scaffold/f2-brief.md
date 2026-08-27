# Unit F2 — fix round for A2's findings

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer (recorded substitution: the
Codex bench is dark). The fix round's verification runs on Cursor Grok, an engine that wrote none
of this.

## Objective

Land every A2 finding's fix: the helper extraction, the false canon-destination sentence, the
residue line, the migration step for the presence-owned catalog body, the roles-law scope, the
what-a-target-loses limit, the README truth, the wave's `--dirty` consequence, the catalog
agent's both-reader opening, the comment hits, and the exit-code assertions.

## Context

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `tests.md`,
`writing.md`, `documentation.md`, `quality.md`. Skill: `orkestrel-falsify` governs the round this
closes — its § Reconcile bounds what a fix may widen. Guide: `guides/scaffold.md`.

**Evidence.** The round's verdict is `.orkestrel/scaffold/a2-audit-verdict.md` — read it whole;
each item below names its finding there. The lane reports sit beside it
(`a2-subjective-report.md`, `a2-objective-grok-report.md`, `a2-checker-report.md`). Every
location below was reproduced by the Orchestrator at `f7d9fd1`. Baseline: the committed tree the
dispatch names, every scoped project green.

## The fix items

**A — extract `#canon`.** `src/server/Materializer.ts` `#canon(plan, target)` reaches no `#`
field and no sibling: extract it to `src/server/helpers.ts` as an exported, TSDoc'd, tested
helper (a `{verb}{Noun}` name of your choosing within the naming law — it reads a target's held
canon files and filters by the plan's selected groups), call it from `#derive`, and add the unit
test with a control. Keep the behavior byte-identical; the mirrored Materializer cases must stay
green unchanged.

**B — the false canon-destination sentence and its count.** Replace "…the one canon path a plan
does claim is deferred, so live bytes reach neither" with the rule the filter implements — every
canon destination is dropped from the fetch and `filesToHost` keeps the installed floor bytes
for it, claimed or not — at `guides/scaffold.md` (the canon-destination paragraph),
`src/server/helpers.ts` (the `filesToHost` remarks), and `tests/setupServer.ts` (the fixture
remarks at the "one destination" phrasings). Delete the residue line "These facts fix what a
target holds at one of these paths." from the `CANON_PATHS` remarks in
`src/core/constants.ts`.

**C — comment hits and exit-code assertions.** `tests/src/bin/CLI.test.ts:2461` "stages those
paths for reading now" → drop `now`; `:2548` "where it is easy to lose" → drop `easy`. The
git-ignored-registration case and the untracked-leftover case assert the `execute` return value
they observe, so the pinned offline-catalog refusal's exit is part of the proof rather than
unread.

**D — the catalog agent's opening, true for both readers.**
`.claude/agents/orkestrel.md` opens with a resolution false in scaffold's own checkout. Rewrite
it to serve both: the contract sits at `.agents/orchestration.md` in the scaffold checkout, and
a repository that installs scaffold reads it at
`node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md` or in a scaffold checkout
beside it, as that repository's `AGENTS.md` pointer names. No sentence may assert what "this
repository's `AGENTS.md` directs" — the file ships to trees whose `AGENTS.md` files differ.

**E — the visit's migration steps.** In
`.agents/skills/orkestrel-publish/references/wave.md`: (i) the `--dirty` sub-bullet names its
gate consequence — a kept `.claude/rules` copy reddens the target's own policy sweep, because
the pointer `AGENTS.md` carries no rule map, so delete the copy rather than waiving past it;
(ii) a condition-first line for the presence-owned catalog body — where the target's
`.claude/agents/orkestrel.md` still opens with a repository-relative `.agents/` read
instruction, delete the file in the visit commit: `repair` restores the floor body and `catalog`
refills the table. Presence ownership never replaces present bytes and the table rewrite touches
only the markers, which is why the deletion is the migration.

**F — the roles-law scope and the target's losses.**
(i) `.agents/orchestration.md` § Roles: scope the role-file requirement to the canon repository
— scaffold's tree and its Codex mirrors pin the roles; a fleet target holds only the catalog
agent, and a session that dispatches roles starts on scaffold. State it as one directive where
the requirement lives; restate it nowhere.
(ii) `guides/scaffold.md` Limits gains the what-a-target-loses entry: after the split a target
holds no dispatchable role beyond the catalog file, no bench configuration, and no MCP
registration; a harness in a target loads nothing from `node_modules`; harness definitions a
target needs live in the harness's own user or local scope, matching the registration seam
already stated; fleet targets are not orchestration hosts — a session starts on scaffold and
attaches the target.
(iii) `README.md`: the what-a-target-carries sentence says what is true of the bench scripts —
they are session hooks that probe benches wired at the session's primary root — or drops them
from the list.

## Unknowns

None. A location that does not match its quoted text is a deviation — stop and report the hunk.

## Scope

**Owned.** `src/server/Materializer.ts`, `src/server/helpers.ts`, `src/core/constants.ts`,
`tests/setupServer.ts`, `tests/src/server/helpers.test.ts`,
`tests/src/server/Materializer.test.ts`, `tests/src/bin/CLI.test.ts`, `guides/scaffold.md`,
`README.md`, `.agents/orchestration.md`, `.agents/skills/orkestrel-publish/references/wave.md`,
`.claude/agents/orkestrel.md`.

**Off-limits.** `host.json` (the Orchestrator regenerates), `src/core/compilers.ts`,
`src/core/helpers.ts`, `src/bin/CLI.ts`, `AGENTS.md`, `CLAUDE.md`, `ROADMAP.md`,
`tests/policy.test.ts`, `tests/config.test.ts`, `.claude/rules/**`, `.orkestrel/**`, `tmp/**`
beyond your own report.

**What asserts the state this change ends.** The extraction keeps `src:server` green unchanged;
items B, D, E, F move staged files, so `test:config` and floor-reading suites red until the
Orchestrator regenerates — the named standing condition, not yours. `test:guides` and
`test:policy` must be green over your prose.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run check`,
`test:src:core`, `test:src:server`, `test:src:bin`, `test:policy`, `test:guides`, and
single-file vitest runs. No build, no tree-wide mutating gate, no commit or push, no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: each item A through F with the exact old and new sentence or the hunk pointer; the
extraction's scoped validation (the Materializer cases green unchanged, the new helper test's
control); scoped gate evidence per command, floor-reading reds excepted per the standing
condition; deviation state. Write the same content to `tmp/units/f2-report.md`.

## Deviation contract

Stop and report when a quoted location does not match, when the extraction changes any observed
behavior, or when a fix needs an off-limits file. Names, phrasing within the rulings, and section
placement are yours.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run test:src:core`, `test:src:server`, and `test:src:bin` exit 0.
3. `npm run test:guides` and `test:policy` exit 0.
4. No owned file carries "the one canon path", "These facts fix what a target holds", the old
   catalog-agent opening, or the swept `now`/`easy` comments.
5. `git status --porcelain` shows changes only in owned files.

**Observations, not criteria.** `test:config` (red until regeneration); the full `npm test` and
build.

## Review evidence

A code and instruction-prose change closing an audit round: the actual diff and status output in
the report; the verifier receives them with the A2 verdict.
