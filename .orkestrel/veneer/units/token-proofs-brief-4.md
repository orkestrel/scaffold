# Unit TOKEN-PROOFS round 4 — the ruled § Customization paragraph and two test comments, verbatim

Successor to `token-proofs-brief-3.md`. What changed: the second audit round (`tkp-audit-2-verdict.md`) ruled FAIL 5, 6,
and 8 and accepted F-OVERRIDE-HEADER. The round is the seam's third, so the Orchestrator ruled the fix. This round
applies the Orchestrator's text exactly and nothing else.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-tkp`, which holds rounds 1 to 3 uncommitted over Veneer `2376710`. The edits are fully specified and
carry no judgment. Start every shell command with `cd /home/user/veneer-tkp &&` and give every file tool an absolute
path under it. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests}.md`. No skill
applies.

## Objective

Items 1 to 3 are applied exactly as written, and the named gates exit 0.

## Context

**Evidence.** Measured in the worktree at round 3's tree:
- `guides/veneer.md` § Customization opens with the paragraph beginning "Override a canonical token in your own
  unlayered rule." and a bulleted list of five items, the first beginning "An override on `:root` moves every tier" and
  the last beginning "A rule that reads a `--bs-*` alias, as the validation rules do,". The paragraph that follows the
  list begins "The `tests/src/styles/tokens.test.ts` proof reads each placement".
- `tests/src/styles/tokens.test.ts` holds, directly above `describe('ancestor token overrides', () => {`, a comment of
  six lines beginning `// Each override case sets one token on an ancestor`.
- The same file holds, directly above the case titled `moves a mode-scope alias and holds the root-only aliases under a
  mode scope that overrides their tokens, and moves all of them from the document element outside a mode scope that
  re-declares the token`, a comment of four lines beginning `// A mode scope re-declares the aliases whose value
  follows the mode`.

Re-take each reading before editing, and stop if one differs.

**Law.** `AGENTS.md`; `.claude/rules/writing.md`.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, and script under your worktree's
`tmp/units/`, never in the scratchpad.

**Measurements.** None beyond the Evidence re-readings.

**Control identifiers.** Items 1 to 3 are this brief's labels.

**Standing conditions.** Rounds 1 to 3 stay, apart from the Items.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (§ Customization's opening paragraph and list only), `tests/src/styles/tokens.test.ts`
(the two comments only), and `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** Every other path and every other line.

**What asserts the state this change ends.** `npm run test:guides` reads the guide.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In `guides/veneer.md` § Customization, replace the opening paragraph and the five-item list that follows it, up to
   and not including the paragraph beginning "The `tests/src/styles/tokens.test.ts` proof", with this text, keeping
   one blank line before the following paragraph:

   ```markdown
   Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
   `@layer theme` block, so an unlayered rule wins. The element that carries the override decides
   what follows it:

   - A rule that reads the token itself follows an override on its own element or on any ancestor.
     The link colors and decoration, the button state mixes and the disabled button opacity, the
     heading weight, and the standard easing are rules of this kind.
   - A tier or a `--bs-*` alias resolves on the element whose rule declares it, and a descendant
     inherits the resolved value. An override in a `:root` rule moves every tier and alias derived
     from the token, except inside a `[data-bs-theme]` element whose mode scope declares that token
     again. An override on a `[data-bs-theme]` element moves the tiers and aliases its mode scope
     derives from the token, which § Color modes describes. An override on any other element moves
     no tier and no alias.
   - A rule that reads a `--bs-*` alias, as the validation rules do, follows an override of that
     alias on its own element or on any ancestor.
   ```

2. In `tests/src/styles/tokens.test.ts`, replace the six-line comment above `describe('ancestor token overrides', () =>
   {` with:

   ```ts
   // Each consumer case sets one token on a plain ancestor and reads a shipped consumer inside it
   // beside a twin outside it. The twin is read first, so a consumer that stops reading the token
   // fails on the overridden reading while the twin's rest reading has already held. The placement
   // cases read where an override reaches: a `--bs-form-*` alias follows its canonical token from a
   // mode scope and not from a plain ancestor, and a rule reading that alias follows it from any
   // ancestor. The scope case reads the published `--bs-*` aliases themselves, under a mode scope and
   // under the document element. Every hover and press is read with motion reduced, so no reading
   // lands partway through a transition.
   ```

3. In the same file, replace the four-line comment above the scope case with:

   ```ts
   // A mode scope re-declares the aliases whose value follows the mode, and a second `:root` block
   // declares the fixed ones once, so a mode-scope override reaches the mode aliases and not the
   // root-only ones. A document-element override reaches both, except inside a mode scope that
   // re-declares the token itself.
   ```

   Keep each comment's indentation as the line it replaces had it.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 3.
3. Run each gate in Acceptance, logged to `tmp/units/tkp-4-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report-4.md` and return the same text. It holds each Item's before and after text, the gate table,
`tmp/units/tkp-4.diff` (`git diff 2376710`), and `tmp/units/tkp-4-status.txt` (`git status --short`). State no count in
prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when oxfmt rewraps a line of an Item's text, or when a gate reads red outside a timeout under load. Nothing in
this round is the unit's to settle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check
   guides/veneer.md tests/src/styles/tokens.test.ts` exits 0.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` passes.
3. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** None.

## Review evidence

The diff and status, the gate logs, and an `analyst` read on GPT-6 Astra of the Orchestrator's paragraph against the
source and the executed cases.
