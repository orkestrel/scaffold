# Unit TOKEN-PROOFS round 3 — § Customization states D51a's placement rule, and the scope probe stays as a test

Successor to `token-proofs-brief-2.md`. What changed: round 2 completed its plants and control cases, and it stopped
correctly on step 3, because D51 claimed that a `[data-bs-theme]` override moves every alias. D51a
(`decisions-round-2.md`) states the split round 2 measured. This round writes the prose to D51a and adopts round 2's
scope probe as a test. `.claude/rules/quality.md` § Instruments requires that, because the probe settled the ruling.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-tkp`, which holds rounds 1 and 2
uncommitted over Veneer `2376710`. Start every shell command with `cd /home/user/veneer-tkp &&` and give every file tool
an absolute path under it. Read `/home/user/scaffold/AGENTS.md`, the rules
`/home/user/scaffold/.claude/rules/{styles,tests,documentation,writing,quality}.md`, and D51 and D51a. No skill applies.

## Objective

§ Customization states D51a's placement rule truthfully, and a case pins the split between the mode-scope aliases and
the root-only aliases.

## Context

**Evidence.**
- Measured by round 2:
  - The mode-scope and root-only sets are recorded in `tmp/units/tkp-2-probe-scopes.log.txt`.
  - The inline override readings are in `tmp/units/tkp-2-probe-mode-scope.log.txt`. There, `--bs-primary` and
    `--bs-form-valid-color` moved under a `data-bs-theme` override, while `--bs-success`, `--bs-border-radius`,
    `--bs-body-font-weight`, and `--bs-link-decoration` held their `:root` value.
- § Customization's reach sentence reads: "every tier and every `--bs-*` alias derived from the token you changed
  follows the override, because each one is an expression over that token."

**Law.**
- `.claude/rules/documentation.md` § Parity: a prose claim about behaviour needs an executed assertion.
- `.claude/rules/writing.md`.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`; `readToken` reads a computed custom
property.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, and script under your worktree's
`tmp/units/`, never in the scratchpad.

**Measurements.** Take every reading in this worktree.

**Control identifiers.** None.

**Standing conditions.** Rounds 1 and 2 stay.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/tokens.test.ts` (one added case in the `ancestor token overrides` block, and its
comments); `guides/veneer.md` (§ Customization's reach sentences); and `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, restored byte-identically, and every other path.

**What asserts the state this change ends.** The § Customization sentence the Evidence quotes. Run `npm run test:guides`
after editing it.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Execution

Perform the assignment directly and spawn nothing.

1. **Scope case.** Add a case to the block that overrides `--vn-color-primary-base`, `--vn-color-success-base`, and
   `--vn-radius-base` on a `data-bs-theme="light"` ancestor and on `:root`, and reads `--bs-primary`, `--bs-success`,
   and `--bs-border-radius` on a child through `readToken`. It asserts:
   - under the mode-scope ancestor, `--bs-primary` follows and `--bs-success` and `--bs-border-radius` hold their
     `:root` values;
   - under `:root`, all three follow.

   Remove the `:root` override in `finally`. Plant: move `--bs-success`'s declaration into the `theme-tokens` mixin's
   alias set, or re-declare it in `_theme.scss`'s mode scope. The case must fail with an `AssertionError`. Restore
   byte-identically, and log the plant to `tmp/units/tkp-3-plant-scope.log.txt`.
2. **§ Customization.** Rewrite the reach clause to state D51a's four placement rules, in plain sentences:
   - An override on `:root` moves every derived tier and alias.
   - An override on a `[data-bs-theme]` element moves the aliases each mode scope re-declares, and names the families.
     Those are the body, emphasis, secondary, and tertiary colours and backgrounds, the border colour, the heading,
     link, code, and highlight colours, the primary and secondary fills, each role's subtle, border-subtle, and
     text-emphasis tiers, the focus ring colour, and the form pair.
   - The fixed palette and greys, the other roles' base fills, the fonts, the radii, the shadows, the border width and
     style, the breakpoints, and the link decoration follow only an override on `:root`.
   - An override on any other element moves the rules that read the token directly: the link colours and decoration,
     the button state mixes and opacity, the heading weight, and the easing.
   - A rule that reads a `--bs-*` alias follows that alias set on any element.

   Keep the paragraph's other sentences.
3. **Gates.** Run each gate in Acceptance, logged to `tmp/units/tkp-3-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report-3.md` and return the same text. It holds:
- the case, by title;
- the plant reading;
- § Customization, before and after;
- the gate table;
- `tmp/units/tkp-3.diff` (`git diff 2376710`) and `tmp/units/tkp-3-status.txt`.

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a reading contradicts D51a.
- Settle yourself the case title, the paragraph's wording, and whether the families read as a list or as sentences.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. After `npm run build:src:styles`, `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts`
   passes.
3. The scope plant fails the new case with an `AssertionError`, per its log.
4. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** None.

## Review evidence

The diff and status, the plant log, and the gate logs. The audit runs `analyst` on GPT-6 Astra.
