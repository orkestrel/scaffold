# Unit F8c-B MOVE, round 3 — the prose fix over the round-2 audit

Successor to `tmp/units/f8c-b-brief-2.md`. What changed and why: the round-2 audit
(`/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2-audit-analyst-verdict.md`, FAIL 4, 9, 11) found
one prose defect (claim 9: bare code tokens as sentence subjects at three sites) and left the D25
citation to the Orchestrator's primary-source check (claim 4) and the gates to the landing chain
(claim 11). This round closes claim 9 only. The earlier briefs stay in place unedited; their
Objective, Context, Scope, Execution, Output, and Deviation contract bind here except where this
brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-f8b`, a git worktree
on branch `unit/f8b` at the checkpoint `b9c0b0a` with the round-1 and round-2 writes uncommitted in
the tree. Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-f8b` for every command and file, and run every npm and npx command from
`/home/user/veneer-f8b`; your shell may start elsewhere. Do not commit, push, install, or run `git
checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every code token in the three passages § Obligations names is followed by a noun per
`/home/user/scaffold/.claude/rules/writing.md` § Code tokens, with the passages' meaning unchanged,
and `npm run test:guides`, the scoped format check, and `npm run check` exit 0.

## Context

**Evidence.** `guides/veneer.md` around line 354: "so `@orkestrel/veneer/styles` resolves through
the manifest's `exports` entry"; around line 404: "Before any proof runs, `tests/setupService.ts`
verifies the compiler, the built cascade, the pinned Chromium, and the candidate list, writes that
list, and …"; `tests/setupService.ts` around lines 68 to 78, the `TAILWIND_PATHS` TSDoc remarks:
"`tailwind` is `tests/setup.css`, the `tailwind` profile and the home of the exclusion line.
`preflight` is the `preflight` profile, `consumer` the guide's `tailwind` recipe as the workspace
executes it, `instrument` the `tailwind` profile without its exclusion line, and `markup` the
markup the consumer profile scans, each under `tests/fixtures/tailwind/`." Locate each site by its
sentence; the line numbers are approximate.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript}.md`;
no skill; `guides/veneer.md`.

**Installed primitives.** none touched; this unit adds no code.

**Host.** bash; `/home/user/veneer-f8b`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run, `oxfmt` is the formatter; no network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23: the three passages read as quoted; the
round-2 gates exited 0 per `tmp/units/f8c-b-report-2.md`.

**Control identifiers.** none.

**Standing conditions.** The round-1 and round-2 writes are present and uncommitted; touch nothing
outside the three passages. The guide's tables are `oxfmt`-padded: keep each edit inside prose so
no table re-pads.

## Unknowns

none.

## Obligations

1. Around guide line 354: "so the `@orkestrel/veneer/styles` specifier resolves through the
   manifest's `exports` entry".
2. Around guide line 404: "Before any proof runs, the `tests/setupService.ts` module verifies …".
3. The `TAILWIND_PATHS` remarks: give each bare key token its noun, for example "The `tailwind` key
   is the `tests/setup.css` file, the `tailwind` profile and the home of the exclusion line. The
   `preflight` key is the `preflight` profile, the `consumer` key the guide's `tailwind` recipe as
   the workspace executes it, the `instrument` key the `tailwind` profile without its exclusion
   line, and the `markup` key the markup the consumer profile scans, each under the
   `tests/fixtures/tailwind/` directory." Keep the summary line and the absolute-path sentence.
4. Read each edited passage once more against the rule and fix any further bare token inside the
   same passage.

## Scope

**Owned.** `guides/veneer.md` (the two sentences), `tests/setupService.ts` (the `TAILWIND_PATHS`
TSDoc remarks), `tmp/units/f8c-b-report-3.md`.

**Shared (report-only).** none.

**Off-limits.** every other file and every other passage of the owned files.

**What asserts the state this change ends.** `tests/guides/**` reads the guide (run `npm run
test:guides`); nothing asserts the TSDoc text.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No tree-wide `format`, `lint --fix`, or `build`;
`npx oxfmt --check guides/veneer.md tests/setupService.ts` only; no `npm install`; no git command
that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/f8c-b-report-3.md`: the exact diff (`git diff -- guides/veneer.md tests/setupService.ts`
restricted to this round's hunks) and the gate exits. Return as your final message the report path,
the `git status --short` output, and the gate exits. No process diary.

## Deviation contract

Stop and report on any edit that would touch a table or a passage outside the three named. Decide,
record, and carry on from the exact noun chosen for a token.

## Acceptance criteria

1. `npx oxfmt --check guides/veneer.md tests/setupService.ts` exits 0.
2. `npm run check` exits 0.
3. `npm run test:guides` exits 0.
4. `tmp/units/f8c-b-report-3.md` exists.

**Observations, not criteria.** none.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
