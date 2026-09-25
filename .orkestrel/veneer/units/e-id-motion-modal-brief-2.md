# Unit E-ID-MOTION-MODAL round 2 — the motion prose reads true once, and every proof kills with an assertion

Successor to `e-id-motion-modal-brief.md`. What changed: the audit (`mmod-audit-verdict.md`) confirmed the rules, the
rendered motion, the backdrop mixin, the design fit, the engine readings, and the gates, and failed the guide prose
(claim 7) and three proof details (F2, F3, R2), with the plants to re-run on the final file (R3). Claim 5 and F1 are
carried by other units and are not this round's.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mmod`, which holds round 1 uncommitted over Veneer `73326c7`. The proofs launch Chromium, which a
bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-mmod &&` and give every file tool an
absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,documentation,writing}.md`; and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-verdict.md` with both lane verdicts beside it
(`mmod-audit-objective-verdict.md`, `mmod-audit-subjective-verdict.md`). No skill applies.

## Objective

Every sentence round 1 wrote about the modal and backdrop motion is true and reads once. The offcanvas backdrop case is
named for what it proves and records absence as `undefined`. Deleting the static-bounce rule or the dialog's transition
fails its case with an `AssertionError`. Both plants re-run on the final test files.

## Context

**Evidence.** Measured by the subjective lane in the worktree at round 1's tree; line numbers are approximate. Re-take
each reading before editing, and stop if one differs.
- `guides/veneer.md`, § Modal classes, the backdrop paragraph (around lines 5530 to 5538): "the host's own timing" and
  "writes the fade's transition on the `.modal-backdrop.fade` compound through the `transition` mixin, so the offcanvas
  backdrop takes the same motion and neither backdrop moves under the reduced-motion preference."
- The dialog paragraph (around lines 5546 to 5560): "scales the dialog to a `1.02` factor on the same transition";
  "because the barrel loads the modal partial after the fade partial at one specificity"; "A modal without the `fade`
  class holds its opacity, so no transition runs on it."
- § Tokens › § Additions, the offcanvas backdrop's Reason cell (around line 10598), and the `overlay-backdrop` mixin's
  comment in `src/styles/_mixins.scss` (around line 626), each naming the timing as "the panel timing the modal host
  fades on" or "the timing the modal host fades on".
- The paragraphs around lines 2599 and 5982 carry a line longer than the paragraph's wrap.
- `tests/src/styles/components/offcanvas.test.ts`, the backdrop case (around line 140), titled "…rescaled by the motion
  factor and still under the reduced-motion preference", pushes
  `[sample?.duration, sample?.easing ?? hidden, sample?.midpoint ?? hidden]` (around line 170).
- `tests/src/styles/components/modal.test.ts`, the entrance case (around line 484) and the bounce case (around line
  523), read the sample through `requireValue`, which throws a plain `Error` when no transition runs. The comment
  around line 481 carries the clause "a second reading that could disagree with it".

**Law.** `.claude/rules/writing.md` (one concept, one term; name the noun; keep the helper words);
`.claude/rules/tests.md` (name a case for what it proves; a mutation kills only with an assertion); `AGENTS.md` § Design
laws (absence is `undefined`).

**The engine section.** The offcanvas paragraph under `## Engine` belongs to the engine session. Change only its wrap
there; the Orchestrator tells the engine session.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** The claim, F, and R labels are this brief's. Name each test for what it proves.

## Unknowns

None.

## Scope

**Owned.** The files round 1 owned: `guides/veneer.md` (the sentences, cells, and wraps the Items name),
`src/styles/_mixins.scss` (the `overlay-backdrop` comment only), `src/styles/components/_modal.scss` (comments only, if
an Item's wording reaches one), `tests/src/styles/components/modal.test.ts`,
`tests/src/styles/components/offcanvas.test.ts`, `tests/src/styles/mixins.test.ts`, and `tmp/units/`.

**Off-limits.** Every rule declaration in `src/styles/**`, `src/browser/**`, `tests/src/browser/**`, `tests/app/**`,
`tests/setup*.ts`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`vite.config.ts`, `package.json`, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. **Claim 7 (a).** Rewrite the backdrop paragraph's last sentence so the mixin writes the fade's transition on the
   backdrop's `.fade` compound through the `transition` mixin, so neither backdrop moves under the reduced-motion
   preference, and a following sentence says the offcanvas backdrop includes the same mixin, so it takes the same
   motion.
2. **Claim 7 (b).** Drop "the host's own timing" or replace it with a phrase that points forward to the dialog
   paragraph by name.
3. **Claim 7 (c).** Write "grows the dialog to a `1.02` scale on the same transition" in place of "scales the dialog to
   a `1.02` factor on the same transition".
4. **Claim 7 (d).** Write "because the two rules tie on specificity in the `components` layer and the barrel loads the
   modal partial after the fade partial", matching the § Fade classes phrasing.
5. **R1.** Qualify the no-`fade` sentence so it states the engine's case: an engine writes no opacity on a modal
   without the `fade` class, so no transition runs on it.
6. **Claim 7 (e).** Name the timing by its tokens in the offcanvas Reason cell and the mixin comment ("over the
   `--vn-motion-panel` duration on the `--vn-ease-out` curve", or the comment's equivalent), never by one caller's
   element. Re-wrap the two long paragraphs.
7. **F2 and F3.** Retitle the offcanvas backdrop case in the modal factor case's form ("…fades the backdrop in over the
   panel duration on the ease-out curve, doubles it at a doubled motion factor, and runs none at a zero factor or under
   the reduced-motion preference"). Reshape its readings so a reading with no transition carries `undefined` where the
   transition's values go, read the settled opacity in its own slot, and assert the filters separately. Rewrite the
   comment clause the verdict names in `modal.test.ts` so its antecedent is named.
8. **R2.** In the entrance and bounce cases, assert that a transition is sampled before reading it, so deleting the
   dialog's transition or the static-bounce rule fails with an `AssertionError`. Log each deletion as a plant:
   `tmp/units/mmod-2-plant-no-transition.log.txt` and `tmp/units/mmod-2-plant-no-static.log.txt`, each restored
   byte-identically.
9. **R3.** Re-run the `translate` and `backdrop-feedback` plants on the final files, logged to
   `tmp/units/mmod-2-plant-<name>.log.txt`, each restored byte-identically.
10. Run each gate in Acceptance, logged to `tmp/units/mmod-2-<gate>.log.txt` with the command echoed first and
    `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mmod-report-2.md` and return the same text: each Item's before and after; the case titles and the
reshaped readings; the plant table; the gate table; `tmp/units/mmod-2.diff` (`git diff 73326c7`),
`tmp/units/mmod-2-delta.diff` (this round alone, against backups taken before the first edit), and
`tmp/units/mmod-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an Evidence reading differs, when a fix needs a rule declaration or a file outside the owned
  set, or when a gate reads red outside a timeout under load.
- Settle yourself the exact wording within each Item's ruling, the comment wording, and the shape of the reshaped
  readings.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style files pass.
3. Each plant fails with an `AssertionError`, per its log, and restores identically.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diff, the delta, the status, the plant logs, and the gate logs. `reviewer` on Opus 5.5 rules the prose and the case
shapes, and `analyst` on GPT-6 Astra rules the kills.
