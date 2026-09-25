# Unit TOKEN-PROOFS round 7 — one relative exception, stated once, and the primary alias on a root that carries a mode

Successor to `token-proofs-brief-6.md`. What changed: the check (`tkp-audit-5-verdict.md`) confirmed round 6's
placement text, assertion, and § Color modes sentence, and failed the exceptions the list items and two test comments
restate in absolute terms. The mechanism sentence already states the exception relative to the overriding element, so
this round deletes the restatements and adds the assertion the check found missing. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 6 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the
verdict `/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-5-verdict.md` with the objective verdict beside it. No
skill applies.

## Objective

§ Customization states where an override stops once, relative to the element that carries it, and no list item or test
comment restates it in absolute terms. The scope case proves that the primary alias follows an override on a document
element that carries a mode, while a mode scope below it keeps its own value.

## Context

**Evidence.** Measured in the worktree at round 6's tree. Re-take each reading before editing, and stop if one differs.
- § Customization's opening paragraph ends "an element inside it that declares the token again gives its own subtree
  that value. The placement decides what follows:".
- Its list's first item reads "An override on the root element, in a `:root` rule or any rule that matches the root,
  reaches every rule, tier, and alias that reads the token, except inside a `[data-bs-theme]` element below the root
  whose mode scope declares that token again."
- Its list's fourth item reads "An override of a `--bs-*` alias works the same way: the validation rules follow an
  override of their aliases on an ancestor, except inside a `[data-bs-theme]` element whose mode scope declares those
  aliases again."
- The comment above `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts` contains "and a rule
  reading that alias follows it from an ancestor, except inside a mode scope that declares it again."
- The comment above the scope case (the case whose title begins "moves a mode-scope alias and holds the root-only
  aliases") contains "A document-element override reaches both, except inside a mode scope that re-declares the token
  itself, and a root-only alias follows it where the document element carries a mode, because the alias resolves on
  that same element."
- The scope case's last block sets `data-bs-theme="light"` on `document.documentElement`, reads `#outside`'s
  `--bs-border-radius` at rest, sets the radius override, reads it again, and removes the attribute and the property in
  `finally`.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Other worktrees
run suites at the same time; a timeout under load is an observation with its `/proc/loadavg` reading. Write every log,
backup, and script under this worktree's `tmp/units/`.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (§ Customization's opening paragraph and list), `tests/src/styles/tokens.test.ts` (the
two comments and the scope case), and `tmp/units/`. **Off-limits.** `src/**` except during the plant, restored
byte-identically, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is
allowed.

## Items

1. In § Customization's opening paragraph, replace "an element inside it that declares the token again gives its own
   subtree that value." with "an element inside it that declares the token again, such as a `[data-bs-theme]` element
   whose mode scope declares it, gives its own subtree that value."
2. Replace the list's first item with "An override on the root element, in a `:root` rule or any rule that matches the
   root, reaches every rule, tier, and alias that reads the token."
3. Replace the list's fourth item with "An override of a `--bs-*` alias works the same way: the validation rules follow
   an override of their aliases on an ancestor."
4. In the comment above `describe('ancestor token overrides')`, replace "and a rule reading that alias follows it from
   an ancestor, except inside a mode scope that declares it again." with "and a rule reading that alias follows it from
   an ancestor, except inside a mode scope below that ancestor that declares it again."
5. In the comment above the scope case, replace "A document-element override reaches both, except inside a mode scope
   that re-declares the token itself, and a root-only alias follows it where the document element carries a mode,
   because the alias resolves on that same element." with "A document-element override reaches both whether or not
   the document element carries a mode, because the override wins over that element's own mode scope, and a mode scope
   below it that re-declares the token keeps its own value."
6. In the scope case's last block, after the radius assertions and inside the same `try`, assert that `#outside` reads
   `--bs-primary` as the `primary` value read earlier, set `TOKEN_NAMES.color.primary.base` to `rgb(4, 5, 6)` on
   `document.documentElement`, assert that `#outside` reads `--bs-primary` as `rgb(4, 5, 6)`, and assert that `#held`
   still reads `primary`. Remove the primary property in the `finally` block beside the radius property. Retitle the
   case `moves a mode-scope alias and holds the root-only aliases under a mode scope that overrides their tokens, moves
   all of them from the document element outside a mode scope that re-declares the token, and moves a mode alias and a
   root-only alias from a document element that carries a mode`.
7. Plant, logged to `tmp/units/tkp-7-plant-root-primary.log.txt`: inside the `@layer theme` block of
   `src/styles/_theme.scss`, append a `:root[data-bs-theme]` rule that declares `--bs-primary` as the literal value the
   light scope resolves it to (read it from the built stylesheet first, and log it). The new override assertion fails
   with an `AssertionError` while every earlier assertion holds. Restore byte-identically, rebuild, and log the
   restore.

## Execution

Perform the assignment directly and spawn nothing. Re-take the Evidence readings, apply Items 1 to 6, run the plant,
then run each gate in Acceptance, logged to `tmp/units/tkp-7-<gate>.log.txt` with `echo "exit=$?"` and
`cat /proc/loadavg` appended.

## Output

Write `tmp/units/tkp-report-7.md` and return the same text: each Item's before and after text; the plant reading; the
gate table; `tmp/units/tkp-7.diff` (`git diff 2376710`), `tmp/units/tkp-7-delta.diff` (this round alone, against a
backup taken before the first edit), and `tmp/units/tkp-7-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when the new assertion fails without the plant, or when a gate reads red outside a timeout under load. Settle
nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` passes.
3. The plant fails the new override assertion with an `AssertionError`, per its log.
4. `npm run test:guides` exits 0.

**Observation, not a criterion.** `npm run test:policy`, with its load reading.

## Review evidence

The diff and status, the plant log, and the gate logs. `analyst` on GPT-6 Astra checks the text and sweeps every
sentence in the guide and the tokens test that states where an override stops.
