# Unit TOKEN-PROOFS round 2 — the hover decoration plant, the placement control cases, and § Customization's reach

Successor to `token-proofs-brief.md`. What changed: the audit (`tkp-audit-verdict.md`) confirmed coverage, real input,
the stacking row, and the gates. It carries claim 2's hover decoration assertion, claim 3's unevidenced plain-ancestor
reading, and F-CUSTOMIZATION-REACH, which D51 (`decisions-round-2.md`) rules.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds round 1 uncommitted over Veneer `2376710`. The proofs run in Chromium, which a
bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an
absolute path under it. Read `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the verdict and
both lane verdicts beside it under `/home/user/scaffold/.orkestrel/veneer/units/`; and D51. No skill applies.

## Objective

Every assertion in `describe('ancestor token overrides')` is shown load-bearing by its own plant. The placement rule D51
states is pinned by executed control cases. § Customization states that placement rule truthfully.

## Context

**Evidence.**
- Measured by round 1 and both audit lanes:
  - The redecoration case asserts the link button's hover decoration.
  - `.btn-link:hover { text-decoration: var(--vn-link-decoration) }` in `src/styles/components/_button.scss` is a
    separate rule from the rest rule.
  - Round 1's `link-decoration-button` plant rewrote both rules together (`occurrences: 2`), so the case failed at the
    rest assertion and never reached the hover one.
- Measured by round 1 only, not retained: an override of `--vn-form-valid` on a plain `div` ancestor left the inside
  `.is-valid` border and `.valid-feedback` colour on the rest value.
- `guides/veneer.md` § Customization, the paragraph under the heading, says: "every tier and every `--bs-*` alias derived
  from the token you changed follows the override, because each one is an expression over that token."
- Round 1 used the command `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts`
  after `npm run build:src:styles`. The root configuration registers no `src:styles` project.

**Law.**
- `AGENTS.md`.
- `.claude/rules/quality.md` § Instruments: an instrument that settled a claim is adopted as a test.
- `.claude/rules/documentation.md` § Parity: falsify a prose claim, and re-read the prose last.
- `.claude/rules/writing.md`.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`, as round 1 used them.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Other units run suites at the same time. Record `cat /proc/loadavg`
in the log of any gate that times out.

**Measurements.** Take every reading in this worktree.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** Round 1's changes stay, apart from the edits below.

## Unknowns

None.

## Scope

**Owned.**
- `tests/src/styles/tokens.test.ts`: the `ancestor token overrides` block.
- `guides/veneer.md`: § Customization's placement sentences, and § Tests if a title changes.
- `tmp/units/` for instruments and logs.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, which is restored byte-identically. Every other path.

**What asserts the state this change ends.** The § Customization sentence the Evidence quotes. No test reads it. Run
`npm run test:guides` after editing it.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Execution

Perform the assignment directly and spawn nothing.

1. **Hover plant.** Plant only the `.btn-link:hover` decoration as `text-decoration: underline;`. Rebuild, then run the
   redecoration case alone. It must fail with an `AssertionError` at the link button's hover assertion, while every
   earlier assertion in the case holds. Restore byte-identically. Log to `tmp/units/tkp-2-plant-link-decoration-hover.log.txt`.
2. **Placement control cases.** Add these cases to the block:
   - A case that overrides `--vn-form-valid` and `--vn-form-invalid` on a plain ancestor with no `data-bs-theme`
     attribute. It asserts that the inside `.is-valid` and `.is-invalid` borders and the feedback colours keep the rest
     value. It also asserts that the same override on a `data-bs-theme` ancestor moves them, so the case tells the two
     placements apart.
   - A case that sets `--bs-form-valid-color` and `--bs-form-valid-border-color` on a plain ancestor. It asserts that
     the inside consumers follow the alias, beside a twin outside it.
   Kill each new assertion with its own plant, logged the same way, then restore.
3. **§ Customization.** Rewrite the paragraph's reach clause so it states D51's placement rule:
   - A canonical token overridden on `:root` or on a `[data-bs-theme]` element moves every tier and `--bs-*` alias
     derived from it.
   - Overridden on any other element, it moves the rules that read the token directly. Name those rule families: the
     link colours and decoration, the button state mixes and opacity, the heading weight, and the easing.
   - A rule that reads a `--bs-*` alias follows that alias set on any element.
   Keep the rest of the paragraph.
4. **Gates.** Run each gate in Acceptance, logged to `tmp/units/tkp-2-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report-2.md` and return the same text. It holds:
- the plant table, with each plant's command, failing assertion, and restore;
- the new cases, by title;
- the § Customization text, before and after;
- the gate table;
- `tmp/units/tkp-2.diff` (`git diff 2376710`) and `tmp/units/tkp-2-status.txt`.

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a placement reading contradicts D51, or when a gate reads red outside a timeout under load.
- Settle yourself the case titles and the paragraph's wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. After `npm run build:src:styles`, `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts`
   passes.
3. Each plant in Execution steps 1 and 2 fails its assertion with an `AssertionError`, per the logs.
4. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra.
