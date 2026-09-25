# Unit TOKEN-PROOFS round 8 — the last three sentences that state a stop or a repeated value

Successor to `token-proofs-brief-7.md`. What changed: the check (`tkp-audit-6-verdict.md`) swept every sentence about
where an override stops and confirmed § Customization, and failed two test comments that omit the root and a § Color
modes sentence that calls a repeated declaration a value. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 7 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the
verdict `/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-6-verdict.md` with the objective verdict beside it. No
skill applies.

## Objective

The describe block's comment and the scope case's comment name the root where an alias resolves or a mode scope reaches,
and § Color modes says a mode scope repeats a declaration, which resolves against the tokens its own element holds.

## Context

**Evidence.** Measured in the worktree at round 7's tree. Re-take each reading before editing, and stop if one differs.
- The comment above `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts` contains "a
  `--bs-form-*` alias follows its canonical token from a mode scope and not from a plain ancestor," and one line of it
  runs past 100 columns ("that declares it again. The scope case reads the published `--bs-*` aliases themselves, under
  a mode scope and").
- The comment above the scope case contains "so a mode-scope override reaches the mode aliases and not the root-only
  ones."
- `guides/veneer.md` § Color modes contains "A name no mode changes keeps one value in every scope. The `:root` selector
  declares most such names alone, and an island below the root inherits them from there." and ends its list of names
  with "variables again, with the value the `:root` selector gives them."

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every log
under this worktree's `tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (the § Color modes sentences named in Item 3), `tests/src/styles/tokens.test.ts` (the two
comments), and `tmp/units/`. **Off-limits.** Every other path, and every other line of the owned files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In the comment above `describe('ancestor token overrides')`, replace "a `--bs-form-*` alias follows its canonical
   token from a mode scope and not from a plain ancestor," with "a `--bs-form-*` alias follows its canonical token from
   the root or a mode scope and not from a plain ancestor below the root,", then re-wrap the whole comment at 100
   columns without changing another word.
2. In the comment above the scope case, replace "so a mode-scope override reaches the mode aliases and not the
   root-only ones." with "so an override on a mode scope below the root reaches the mode aliases and not the root-only
   ones.", and re-wrap that comment at 100 columns.
3. In § Color modes, replace "A name no mode changes keeps one value in every scope. The `:root` selector declares most
   such names alone, and an island below the root inherits them from there." with "A name no mode changes carries the
   same declaration in every scope. The `:root` selector declares most such names alone, and an island inherits them
   from its parent.", and replace "variables again, with the value the `:root` selector gives them." with "variables
   again, with the declaration the `:root` selector writes, so each resolves against the tokens its own element
   holds."

## Execution

Perform the assignment directly and spawn nothing. Re-take the Evidence readings, apply Items 1 to 3, then run each gate
in Acceptance, logged to `tmp/units/tkp-8-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` and
`cat /proc/loadavg` appended.

## Output

Write `tmp/units/tkp-report-8.md` and return the same text: each Item's before and after; the gate table;
`tmp/units/tkp-8.diff` (`git diff 2376710`), `tmp/units/tkp-8-delta.diff` (this round alone, against backups taken before
the first edit), and `tmp/units/tkp-8-status.txt`. State no count in prose.

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

The diff and status, and the gate logs. `analyst` on GPT-6 Astra repeats the sweep over every sentence in the guide and
the tokens test that states where an override stops or what a mode scope repeats.
