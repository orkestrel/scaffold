# Unit TOKEN-PROOFS round 10 — the stripe comment and the theme paragraph state their conditions

Successor to `token-proofs-brief-9.md`. What changed: the check of round 9 (`tkp-audit-8-verdict.md`) confirmed the
border rewrite and failed two of the Orchestrator's rewrites, which omit a condition: the stripe comment holds only
with no override, and the `theme` paragraph omits an override on the island itself. The Orchestrator's corrected
Chromium reading confirms both. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 9 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the
verdict `/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-8-verdict.md` with the objective verdict beside it. No
skill applies.

## Objective

The stripe case's comment states that its readings set no override, and the `theme` paragraph names an override on the
island itself beside one on an ancestor below the root.

## Context

**Evidence.** Measured in the worktree at round 9's tree. Re-take each reading before editing, and stop if one differs.
- In `tests/src/styles/tokens.test.ts`, the case "resolves the stripe percentage to the retained Bootstrap tint in each
  mode" opens with the comment Item 1 quotes.
- In `guides/veneer.md`, the paragraph under `#### \`theme\`` in § Tokens › § Departures contains the clause Item 2
  quotes.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every log
and backup under this worktree's `tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/tokens.test.ts` (the stripe case's comment), `guides/veneer.md` (the clause Item 2 names
and the re-wrap of its paragraph), and `tmp/units/`. **Off-limits.** Every other path, and every other line of the
owned files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the stripe case's comment (round 9's text, "Each mode scope declares the stripe again, with the declaration
   the `:root` selector writes, so a reading on an island cannot tell where its value was declared. Each mode's own
   declaration list is what places the stripe beside the hover and active percentages.") with "Each mode scope declares
   the stripe again, with the declaration the `:root` selector writes. With no override, an island reads the same
   default whether it declares the stripe or inherits it, so these readings cannot place the declaration; each mode's
   own declaration list is what places the stripe beside the hover and active percentages.", wrapped at 100 columns
   with the file's indentation.
2. In the `theme` paragraph, replace "and an island inherits each one from its parent, so a light island nested in a
   dark one reads the document value unless an ancestor below the root overrides the name;" with "and an element that
   does not override one inherits it from its parent, so a light island nested in a dark one reads the document value
   unless the island or an ancestor below the root overrides the name;". Re-wrap the paragraph at 100 columns without
   changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up both owned files under `tmp/units/` before the first edit.
Re-take the Evidence readings, apply Items 1 and 2, then run each gate in Acceptance, logged to
`tmp/units/tkp-10-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/tkp-report-10.md` and return the same text: each Item's before and after; the gate table;
`tmp/units/tkp-10.diff` (`git diff 2376710`), `tmp/units/tkp-10-delta.diff` (this round alone, against the backups), and
`tmp/units/tkp-10-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs or a gate reads red outside a timeout under load. Settle nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` passes.
3. `npm run test:guides` exits 0.

## Review evidence

The diff, the delta, the status, and the gate logs. `analyst` on GPT-6 Astra rules the two Items against the
Orchestrator's asserted Chromium reading (`tkp-instruments/r10/`) and the built cascade, and confirms the delta changes
nothing else.
