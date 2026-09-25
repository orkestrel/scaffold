# Unit TOKEN-PROOFS round 9 — the last three sentences about where an override reaches

Successor to `token-proofs-brief-8.md`. What changed: the round-7 sweep (`tkp-audit-7-verdict.md`) read every sentence
of the class in the guide and the tokens test and failed three older ones, which the Orchestrator's Chromium reading
confirms. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 8 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the
verdict `/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-7-verdict.md` with the objective verdict beside it. No
skill applies.

## Objective

The stripe case's comment says each mode scope declares the stripe again, the `theme` key paragraph says an island
inherits each dropped name from its parent, and the border utilities paragraph says which override reaches a default
border.

## Context

**Evidence.** Measured in the worktree at round 8's tree. Re-take each reading before editing, and stop if one differs.
- In `tests/src/styles/tokens.test.ts`, the case "resolves the stripe percentage to the retained Bootstrap tint in each
  mode" opens with a three-line comment beginning "A mode island inherits the `:root` value, so a reading taken on the
  island holds wherever" and ending "beside the hover and active percentages."
- In `guides/veneer.md`, the paragraph under `#### \`theme\`` in § Tokens › § Departures contains "Veneer declares each
  of them at the `:root` selector alone, and a light island inherits each one from that selector through every island
  around it, so a" followed by a line break and "light island nested in a dark one reads the document value;".
- In `guides/veneer.md` § Styles › § Border utilities, the paragraph beginning "The `.border` class draws the" contains
  "so a retuned width token widens every default border and a dark island draws the dark border color."

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every log
and backup under this worktree's `tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/tokens.test.ts` (the stripe case's comment), `guides/veneer.md` (the two sentences Items 2
and 3 name, and the re-wrap of their paragraphs), and `tmp/units/`. **Off-limits.** Every other path, and every other
line of the owned files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the stripe case's three-line comment with "Each mode scope declares the stripe again, with the declaration
   the `:root` selector writes, so a reading on an island cannot tell where its value was declared. Each mode's own
   declaration list is what places the stripe beside the hover and active percentages.", wrapped at 100 columns with the
   file's indentation.
2. In the `theme` paragraph, replace "Veneer declares each of them at the `:root` selector alone, and a light island
   inherits each one from that selector through every island around it, so a light island nested in a dark one reads
   the document value;" with "Veneer declares each of them at the `:root` selector alone, and an island inherits each
   one from its parent, so a light island nested in a dark one reads the document value unless an ancestor below the
   root overrides the name;". Re-wrap the paragraph at 100 columns without changing another word.
3. In the border utilities paragraph, replace "so a retuned width token widens every default border and a dark island
   draws the dark border color." with "so the width token retuned on the root element widens every default border, and
   a dark island draws the dark border color. The `:root` selector alone declares the `--bs-border-width` alias, so the
   width token retuned on an element below the root moves no border; retune the alias on that element instead." Re-wrap
   the paragraph at 100 columns without changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up both owned files under `tmp/units/` before the first edit.
Re-take the Evidence readings, apply Items 1 to 3, then run each gate in Acceptance, logged to
`tmp/units/tkp-9-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/tkp-report-9.md` and return the same text: each Item's before and after; the gate table;
`tmp/units/tkp-9.diff` (`git diff 2376710`), `tmp/units/tkp-9-delta.diff` (this round alone, against the backups), and
`tmp/units/tkp-9-status.txt`. State no count in prose.

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

The diff, the delta, the status, and the gate logs. `analyst` on GPT-6 Astra rules the three Items against the
Orchestrator's Chromium reading and the built cascade, and confirms the delta changes nothing else. The round-7 sweep
is not repeated.
