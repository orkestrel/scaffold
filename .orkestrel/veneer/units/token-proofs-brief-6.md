# Unit TOKEN-PROOFS round 6 — the mechanism's two edges, the root-with-mode state, and § Color modes

Successor to `token-proofs-brief-5.md`. What changed: the check (`tkp-audit-4-verdict.md`) confirmed round 5's
assertions and failed two edges of the Orchestrator's text, and found a false § Color modes sentence.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 5 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules
`/home/user/scaffold/.claude/rules/{styles,tests,documentation,writing,quality}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-4-verdict.md` with the objective verdict beside it. No skill
applies.

## Objective

§ Customization's text states the mechanism with both edges, the root-with-mode state has an executed assertion that
fails under its own plant, and § Color modes' sentence about names no mode changes is true of the built cascade.

## Context

**Evidence.** Measured in the worktree at round 5's tree:
- § Customization's opening paragraph contains "Each custom property resolves on the element whose rule declares it,
  from the values that element inherits, and a descendant inherits the resolved value."
- Its list's first item begins "An override in a `:root` rule reaches every rule, tier, and alias that reads the token,
  except inside a `[data-bs-theme]` element whose mode scope declares that token again."
- Its list's second item begins "An override on a `[data-bs-theme]` element reaches the tiers and aliases its mode scope
  derives from the token, which § Color modes describes, and every rule inside it that reads the token." and ends "The
  aliases only the `:root` selector declares keep their value."
- § Color modes holds the sentence "A name no mode changes is declared at the `:root` selector alone, and every island
  inherits it from there."
- The scope case in `describe('ancestor token overrides')` sets overrides on a `data-bs-theme="light"` child and on
  `document.documentElement`, never on a root that carries `data-bs-theme`.

Re-take each reading before editing, and stop if one differs.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every
log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Standing conditions.** Rounds 1 to 5 stay, apart from the Items.

## Unknowns

- Which names the mode scopes declare again with the value `:root` gives them. Read them from the built
  `dist/src/styles/index.css` by comparing each mode scope's declarations with `:root`'s, and report the list.

## Scope

**Owned.** `guides/veneer.md` (§ Customization's opening paragraph and list, and the one § Color modes sentence),
`tests/src/styles/tokens.test.ts` (the scope case), and `tmp/units/`. **Off-limits.** `src/**` except during a plant,
restored byte-identically, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In § Customization's opening paragraph, replace "from the values that element inherits" with "from the values that
   element holds, declared there or inherited".
2. Replace the list's first item's opening sentence with "An override on the root element, in a `:root` rule or any
   rule that matches the root, reaches every rule, tier, and alias that reads the token, except inside a
   `[data-bs-theme]` element below the root whose mode scope declares that token again."
3. Replace the list's second item with "An override on a `[data-bs-theme]` element below the root reaches the tiers and
   aliases its mode scope derives from the token and every rule inside it that reads the token. The aliases only the
   `:root` selector declares keep their value."
4. In the scope case, add a state in which `document.documentElement` carries `data-bs-theme="light"` and the override
   of `--vn-radius-base`, and assert that a child reads `--bs-border-radius` as the override value; restore the root's
   attribute and property in `finally`. Kill it with its own plant, logged to
   `tmp/units/tkp-6-plant-root-mode.log.txt`, which freezes `--bs-border-radius` on `:root[data-bs-theme]` alone and
   fails the new assertion with every earlier assertion holding; restore byte-identically.
5. Rewrite the § Color modes sentence so it is true of the built cascade: a name no mode changes keeps one value in
   every scope, and name the names each mode scope declares again with that same value, per the Unknown's reading.
   Keep the sentence's claim that every island inherits the rest from the `:root` selector only where that holds.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings and take the Unknown's reading, logged to `tmp/units/tkp-6-scopes.log.txt`.
2. Apply Items 1 to 5, and run the plant.
3. Run each gate in Acceptance, logged to `tmp/units/tkp-6-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report-6.md` and return the same text: the scope reading; each Item's before and after text; the
plant reading; the gate table; `tmp/units/tkp-6.diff` (`git diff 2376710`), `tmp/units/tkp-6-delta.diff` (this round
alone), and `tmp/units/tkp-6-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when the root-with-mode reading contradicts Item 2, or when a gate reads red outside a timeout under load.
Settle yourself the § Color modes wording and the new state's fixture.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` passes.
3. The plant fails the new assertion with an `AssertionError`, per its log.
4. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the scope and plant logs, and the gate logs. The check runs `analyst` on GPT-6 Astra.
