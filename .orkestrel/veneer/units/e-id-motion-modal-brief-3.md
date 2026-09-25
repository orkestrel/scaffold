# Unit E-ID-MOTION-MODAL round 3 — the plain-modal sentence names the cascade's mechanism

Successor to `e-id-motion-modal-brief-2.md`. What changed: the round-2 audit (`mmod-audit-2-verdict.md`) confirmed every
claim but the prose, and failed the sentence that explains why a modal without the `fade` class runs no transition.
This is the unit's third round, so the Orchestrator rules the fix. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mmod`, which holds rounds 1 and 2 uncommitted over Veneer `73326c7`. Start every shell command with
`cd /home/user/veneer-mmod &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`,
the rules `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-2-verdict.md`. No skill applies.

## Objective

The guide and the `.modal` comment say a modal without the `fade` class keeps its opacity as the `show` class joins
and leaves; the modal backdrop's Reason cell names its timing by its tokens; and two comments name their nouns.

## Context

**Evidence.** Measured in the worktree at round 2's tree. Re-take each reading before editing, and stop if one differs.
- `guides/veneer.md` § Modal classes, the dialog paragraph (around line 5559): "On a modal without the `fade` class, an
  engine writes no opacity, so no transition runs as the engine shows or hides that modal."
- `src/styles/components/_modal.scss`, the comment in the `.modal` rule (around lines 53 and 54): "On a modal without
  that class, an engine writes no opacity, so no transition runs as the engine shows or hides that modal."
- `guides/veneer.md` § Tokens › § Additions, the `modal` row for `.modal-backdrop.fade { transition }` with no condition
  (around line 10597): its Reason cell reads "The `overlay-backdrop` mixin fades the backdrop on the panel timing the
  modal host fades on, in place of the shared `.fade` rule's feedback timing."
- `tests/src/styles/components/modal.test.ts`, the entrance case's comment (around lines 481 and 482): "a specimen
  resolves from the tokens apart from the dialog's rule."
- `src/styles/_mixins.scss`, the `overlay-backdrop` comment (around line 627): "the compound outranks that rule,".

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every log
and backup under this worktree's `tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The five sites the Evidence names, the re-wrap of their paragraphs and comments, and `tmp/units/`.
**Off-limits.** Every rule declaration, every other line of the owned files, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In the guide's dialog paragraph, replace the quoted sentence with "A modal without the `fade` class keeps its opacity
   as an engine adds and removes the `show` class, so no transition runs as the engine shows or hides it." Re-wrap the
   paragraph at 100 columns without changing another word.
2. In the `.modal` comment, replace the quoted sentence with "A modal without that class keeps its opacity as an engine
   adds and removes the `show` class, so no transition runs as the engine shows or hides it." Re-wrap the comment at
   100 columns without changing another word.
3. In the modal backdrop's Reason cell, replace "on the panel timing the modal host fades on" with "over the
   `--vn-motion-panel` duration on the `--vn-ease-out` curve". Let oxfmt re-pad the table.
4. In the entrance case's comment, replace "resolves from the tokens apart from the dialog's rule." with "resolves from
   the tokens independently of the dialog's rule." Re-wrap the comment at 100 columns without changing another word.
5. In the mixin comment, replace "the compound outranks that rule," with "the backdrop's `.fade` compound outranks that
   rule,". Re-wrap the comment at 100 columns without changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up each owned file under `tmp/units/` before the first edit.
Re-take the Evidence readings, apply Items 1 to 5, then run each gate in Acceptance, logged to
`tmp/units/mmod-3-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mmod-report-3.md` and return the same text: each Item's before and after; the gate table;
`tmp/units/mmod-3.diff` (`git diff 73326c7`), `tmp/units/mmod-3-delta.diff` (this round alone, against the backups), and
`tmp/units/mmod-3-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when an Item's text does not format or lint as written, or when a gate reads red outside a timeout under load.
Settle nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/mixins.test.ts`
   passes.
3. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diff, the delta, the status, and the gate logs. `analyst` on GPT-6 Astra checks the Orchestrator's text against the
built cascade and confirms the delta changes nothing else.
