# Unit TOKEN-RETIRE — the focus reset token and the tertiary role's unread tiers retire

The retirement the X-TENETS-STYLES verdict rules under TOKEN-PROOFS (claim 5): `--vn-focus-reset` retires and the
`focus-ring` mixin's default becomes `none`; the tertiary role's `-subtle`, `-border`, and `-rgb` tiers retire, because
no Bootstrap class reads them for a role with no Bootstrap alias. TOKEN-PROOFS landed without it, and Veneer's
`ROADMAP.md` carries the row to this unit.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tret` (branch `unit/tret`, cut from Veneer `LANDING_HEAD`, `node_modules` hardlinked from
`/home/user/veneer`). The work is objective and mechanical, which routes to `sol` on Astra, but every style proof
launches Chromium, which a bench sandbox's child cannot (`.agents/orchestration.md` § Bench laws, rule 5), so it runs on
the native writing lane. Start every shell command with `cd /home/user/veneer-tret &&` and give every file tool an
absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; and the ruling in
`/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-audit-verdict.md` (claim 5's row and the
TOKEN-PROOFS carrier paragraph), which binds. No skill applies.

## Objective

The built cascade declares no `--vn-focus-reset`, `--vn-color-tertiary-subtle`, `--vn-color-tertiary-border`, or
`--vn-color-tertiary-rgb`; `TOKEN_NAMES` names none of them; every rendered result that read them renders the same; and
the guide names none of them.

## Context

**Evidence.** Measured on Veneer's session branch at `1deced0`. Re-take each reading in the worktree before editing,
and report any that differs.
- `src/styles/_tokens.scss` writes `'focus-reset': none` in the `$light` and `$dark` maps, holds a `'tertiary'` entry in
  `$triplets` (the contrast rule reads that map at compile time), and emits `--vn-color-#{$role}-rgb` for every
  `$triplets` entry in the `:root` block.
- `src/styles/_mixins.scss`: the `focus-ring` mixin's `$reset` parameter defaults to `var(--vn-focus-reset)`, and the
  mixin writes `box-shadow: $reset` inside `forced-ring`; the theme closure declares
  `--vn-focus-reset: #{map.get($values, 'focus-reset')}`; `role-each` emits `-subtle`, `-emphasis`, and `-border` for
  every role in `$roles`, `tertiary` included.
- `src/core/constants.ts` (engine-owned) names `focus.reset` and the tertiary `rgb`, `subtle`, and `border` leaves in
  `TOKEN_NAMES`; `src/core/types.ts` derives `TokenMap` from it; `tests/src/core/index.test.ts` reads the tree
  structurally and names no retired leaf.
- `tests/setupStyles.ts` lists `'--vn-color-tertiary-rgb'` in `UNMAPPED_TOKENS`. `tests/src/styles/utilities/background.test.ts`
  and `border.test.ts` assert `.bg-tertiary-subtle` and `.border-tertiary-subtle` absent.
- `guides/veneer.md` names `--vn-focus-reset` in a token list (search "`--vn-focus-highlight`, `--vn-focus-reset`") and
  in a § Reference map row, and names the tertiary tiers wherever it lists the role tokens.

**Law.** `.claude/rules/styles.md` (tokens; a declaration repeated across rules is written once);
`.claude/rules/tests.md` (read the rendered result; a mutation kills only with an assertion);
`.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity. `AGENTS.md`: never remove a symbol to silence
lint; this retirement removes capabilities the tenet audit ruled must not exist, and the ruling is the authority.

**Installed primitives.** The readers in `tests/setupStyles.ts` and `tests/setupBrowser.ts`, and `@orkestrel/test`.
Reuse them; add no reader.

**Other units.** LEDGER-RETUNE (under a design round) changes the ledger's resolver and `--vn-shadow-inset`; the toast,
offcanvas, and collapse motion units change other partials. None of them touches the lines this unit owns. The landing
regenerates the ledger rows against whatever lands first.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles` before a styles run,
and run a styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Run `npm run build:src`
before `npm run test:conformance`. Other worktrees run suites at the same time. Write every log, backup, probe, and
script under this worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- Every file that names a retired token: search `tests/`, `src/`, `app/`, and `guides/` for each of the four names and
  for `focus.reset`, `tertiary.rgb`, `tertiary.subtle`, and `tertiary.border`, report the search, and own each hit in
  the owned set. Stop if a hit sits outside it.
- Whether any rendered result changes: the focus ring under forced colors, and every tertiary button. Read each before
  and after, and report both.

## Scope

**Owned.** In `src/styles/_tokens.scss`, the `'focus-reset'` entries and the `:root` `-rgb` emission loop; in
`src/styles/_mixins.scss`, the `focus-ring` mixin's `$reset` default, the theme closure's `--vn-focus-reset`
declaration, and `role-each`'s tier emission; `tests/setupStyles.ts` (the `UNMAPPED_TOKENS` entry and any case table row
naming a retired token); `tests/src/styles/tokens.test.ts`; `tests/src/styles/mixins.test.ts` (the `focus-ring` cases);
every other style test the Unknowns' search finds pinning a retired name; `guides/veneer.md` (each sentence, list, and
row naming a retired token, and the ledger rows the gate prints); and `tmp/units/`.

**Shared (report-only, applied in the worktree).** In `src/core/constants.ts`, the `focus.reset` leaf and the tertiary
`rgb`, `subtle`, and `border` leaves only. Apply the removal in the worktree so the gates read the final state, and
return the exact hunk in the report: the engine session owns the file, and the Orchestrator sends it the hunk before the
landing.

**Off-limits.** Every other line of `src/core/**`, `src/browser/**`, `tests/src/browser/**`, `tests/src/core/**`,
`tests/app/**`, `app/**`, every other partial and declaration, the guide's `## Engine` sections, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, and every
other path.

**What asserts the state this change ends.** `tokens.test.ts` and any case enumerating the declared tokens;
`mixins.test.ts`; `UNMAPPED_TOKENS` and its case in `tests/setupStyles.test.ts`; the conformance ledger's canonical,
witness, and § Reference map checks; `npm run test:guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches and the before readings. Write the proofs first: the built cascade declares none of the
   four names in any scope; a `focus-ring` include with no `$reset` argument writes `box-shadow: none` under forced
   colors; the tertiary role still emits `-base` and `-emphasis`; and the rendered readings the Unknowns name are
   unchanged. Run them red at the base, and record the command and failing count.
2. Retire the declarations and the leaves; run the proofs green.
3. Run `npm run test:setup`, `npm run build:src`, and `npm run test:conformance`; update the guide from the gate's
   output and the search.
4. Plants, each logged to `tmp/units/tret-plant-<name>.log.txt` and restored byte-identically: restore
   `--vn-focus-reset` in the theme closure; restore the tertiary `-subtle` tier. Each fails a proof with an
   `AssertionError`.
5. Run each gate in Acceptance, logged to `tmp/units/tret-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/tret-report.md` and return the same text: the searches; the before and after readings; the
failing-first and green readings with commands and counts; the rules as written; the `src/core/constants.ts` hunk; the
guide changes; the plant table; the gate table; `tmp/units/tret.diff` (`git diff LANDING_HEAD`) and
`tmp/units/tret-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a search hit or a gate needs a file outside the owned and shared sets; when a rendered reading
  changes; or when a gate reads red outside a timeout under load.
- Settle yourself how `role-each` and the `-rgb` loop skip the tertiary tiers, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log, and restores identically.
4. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the before and after readings, the plant logs, and the gate logs. The audit runs `analyst` on
GPT-6 Astra and `reviewer` on Opus 5.5.
