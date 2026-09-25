# Unit TOKEN-PROOFS round 5 — the placement paragraph from its mechanism, and the nested-scope limits executed

Successor to `token-proofs-brief-4.md`. What changed: the check on the Orchestrator's ruled text
(`tkp-audit-3-verdict.md`) failed three of its sentences and the block header. The Orchestrator re-ruled the text, and
the limits it states gain executed assertions.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 4 uncommitted over Veneer `2376710`. The proofs run in Chromium. Start
every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md`, the rules
`/home/user/scaffold/.claude/rules/{styles,tests,documentation,writing,quality}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/tkp-audit-3-verdict.md` with the objective verdict beside it. No skill
applies.

## Objective

§ Customization states the placement rule as the Orchestrator ruled it, the block header describes every case, and the
two nested-scope limits the paragraph states each have an executed assertion that fails under its own plant.

## Context

**Evidence.** Measured in the worktree at round 4's tree:
- `guides/veneer.md` § Customization opens with the paragraph beginning "Override a canonical token in your own
  unlayered rule." and a list of three items, the first beginning "A rule that reads the token itself follows an
  override" and the last beginning "A rule that reads a `--bs-*` alias, as the validation rules do,".
- `tests/src/styles/tokens.test.ts` holds, directly above `describe('ancestor token overrides', () => {`, a comment
  beginning `// Each consumer case sets one token on a plain ancestor`.
- The link case (`overrides the link base ...`, around line 698) sets `--vn-link-base` on a plain ancestor; the alias
  case (`recolors the border and the feedback of a valid control inside a plain ancestor that sets the validation
  aliases, ...`, around line 895) sets `--bs-form-valid-color` and `--bs-form-valid-border-color` on a plain ancestor.
  Neither mounts a `[data-bs-theme]` element between the ancestor and the consumer.
- Each mode scope declares `--vn-link-base` and the validation aliases again (the objective verdict cites
  `src/styles/_theme.scss` and the `theme-tokens` mixin in `src/styles/_mixins.scss`). Confirm both by reading the
  built `dist/src/styles/index.css` before writing the assertions.

Re-take each reading before editing, and stop if one differs.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every
log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Standing conditions.** Rounds 1 to 4 stay, apart from the Items.

## Unknowns

- The plant for each nested assertion. It must make the nested consumer follow the outer override and fail at the
  nested assertion, with every earlier assertion in the case holding. Settle it and report it.

## Scope

**Owned.** `tests/src/styles/tokens.test.ts` (the header comment, the link case, and the alias case), `guides/veneer.md`
(§ Customization's opening paragraph and list only), and `tmp/units/`. **Off-limits.** `src/**` except during a plant,
restored byte-identically, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace § Customization's opening paragraph and its list, up to and not including the paragraph beginning "The
   `tests/src/styles/tokens.test.ts` proof", with this text exactly:

   ```markdown
   Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
   `@layer theme` block, so an unlayered rule wins. Each custom property resolves on the element whose
   rule declares it, from the values that element inherits, and a descendant inherits the resolved
   value. An override therefore reaches every declaration that reads the token on its own element or
   inside it, and no declaration on an element above it; an element inside it that declares the token
   again gives its own subtree that value. The placement decides what follows:

   - An override in a `:root` rule reaches every rule, tier, and alias that reads the token, except
     inside a `[data-bs-theme]` element whose mode scope declares that token again.
   - An override on a `[data-bs-theme]` element reaches the tiers and aliases its mode scope derives
     from the token, which § Color modes describes, and every rule inside it that reads the token. The
     aliases only the `:root` selector declares keep their value.
   - An override on any other element reaches the rules and the component aliases inside it that read
     the token, among them the link colors and decoration, the button state mixes and the disabled
     button opacity, the heading weight, and the standard easing. The tiers and aliases the `:root`
     selector and the mode scopes declare above it keep their value.
   - An override of a `--bs-*` alias works the same way: the validation rules follow an override of
     their aliases on an ancestor, except inside a `[data-bs-theme]` element whose mode scope declares
     those aliases again.
   ```

2. Replace the block header comment with this text exactly, at the indentation the replaced comment had:

   ```ts
   // Each consumer case sets one token on an ancestor and reads a shipped consumer inside it beside a
   // twin outside it: a plain ancestor for a consumer whose rule or component alias reads the token,
   // and a mode scope for the validation rules, whose aliases resolve there. The twin is read first,
   // so a consumer that stops reading the token fails on the overridden reading while the twin's rest
   // reading has already held. The placement cases read where an override reaches: a `--bs-form-*`
   // alias follows its canonical token from a mode scope and not from a plain ancestor, and a rule
   // reading that alias follows it from an ancestor, except inside a mode scope that declares it
   // again. The scope case reads the published `--bs-*` aliases themselves, under a mode scope and
   // under the document element. Every hover and press is read with motion reduced, so no reading
   // lands partway through a transition.
   ```

3. In the link case, add a `data-bs-theme="light"` element inside the overriding ancestor holding an anchor, and assert
   that anchor's color equals an anchor's color in a `data-bs-theme="light"` element outside the override, read first.
   Kill it with its own plant.
4. In the alias case, add a `data-bs-theme="light"` element inside the overriding ancestor holding a valid control and
   its feedback, and assert their border and color equal the same pair in a `data-bs-theme="light"` element outside the
   override, read first. Kill it with its own plant.
5. Retitle the link and alias cases only if a title stops stating what its case proves.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 5. Run each plant, logged to `tmp/units/tkp-5-plant-<name>.log.txt`, and restore
   byte-identically.
3. Run each gate in Acceptance, logged to `tmp/units/tkp-5-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report-5.md` and return the same text: each Item's before and after text; the plant table with
each plant's command, failing assertion, and restore; the gate table; `tmp/units/tkp-5.diff` (`git diff 2376710`) and
`tmp/units/tkp-5-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when a nested reading contradicts the ruled text, or when a gate reads red outside a timeout under load. Settle
yourself the nested fixtures, the plants, and any retitle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` passes.
3. Each plant fails its nested assertion with an `AssertionError`, per its log.
4. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant logs, and the gate logs. The check runs `analyst` on GPT-6 Astra over the Orchestrator's
text and the new assertions.
