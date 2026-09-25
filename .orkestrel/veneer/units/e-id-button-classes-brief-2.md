# Unit E-ID-BUTTON-CLASSES round 2 — one form-difference reader, each reboot proof in its partial's file, and the `.btn` proof on the release oracle

Successor to `e-id-button-classes-brief.md`. What changed: the audit (`ebcl-audit-verdict.md`) confirmed the oracle and
every include-removal kill, and failed claims 6, 10, and 11 with F1, F2, R1, and R3 accepted. Claim 11 needs the
routine in `tests/setupBrowser.ts`, which round 1's brief put off-limits; this round grants it. The engine session's
third Chromium 153 row (`engine/units/host-chromium-153-reading.md`, the `.btn` form proof) joins this round, because
the same reader closes it.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-ebcl`, which holds round 1 uncommitted over Veneer `2376710`. The proofs run in Chromium, which a
bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-ebcl &&` and give every file tool an
absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`; the
verdict `/home/user/scaffold/.orkestrel/veneer/units/ebcl-audit-verdict.md` and both lane verdicts beside it; and
`/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` § Third standing row. No skill
applies.

## Objective

One exported reader in `tests/setupBrowser.ts` drives a button form and its counterpart through the states, in the
Veneer cascade and in the release's stylesheet, and returns each cascade's map of differing longhands. The `.btn` form
proof and every reboot proof call it, compare the Veneer map with the release map, and keep no routine of their own.
Each class's reboot proof sits in the test file of the partial that writes its include.

## Context

**Evidence.** Measured in the worktree at round 1's tree:
- `tests/src/styles/elements/button.test.ts` holds the `.btn` form proof, the case titled `resolves every .btn form on a
  button as the same form resolves on an anchor at rest, and every enabled form under hover, press, and keyboard focus,
  apart from the button appearance and the user agent's focus offset on a link` (around line 203). It compares the
  forms against `BUTTON_FORM_DIFFERENCES` in `tests/setupStyles.ts`, a fixed list per state, which
  `tests/setupStyles.test.ts` lists and nothing else reads.
- The same file holds round 1's `it.each(BUTTON_REBOOT_CASES)` reboot proof (around line 328), with its drive, record,
  and filter routine inline, and its release cascade in a shadow root holding the text of
  `node_modules/bootstrap/dist/css/bootstrap.css`, read through `commands.readFile`.
- The engine session reads the `.btn` proof red on Chromium 153.0.8010.12: in the `pressed` state of the `filled`,
  `outline`, and `link` forms the differing longhands are `appearance` and `outline-width`, where Chromium 141 reads
  `appearance` alone. This container runs only Chromium 141.0.7390.37.
- `BUTTON_REBOOT_CASES` and `BUTTON_REBOOT_SELECTORS` sit in `tests/setupStyles.ts`, and no assertion ties them.

**Law.**
- `.claude/rules/tests.md` § Shared test infrastructure: a routine that could serve another test lives in a setup
  module, is exported, and has its own proof. Tests mirror source.
- `AGENTS.md` § Design laws: one concept, one term; no nested functions except an anonymous callback passed directly.
- `.claude/rules/documentation.md` § Parity: a prose claim about behaviour needs an executed assertion.
- D45 (`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`): a style proof reads a value in a
  build-independent form.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser` (`driveHold`, `stageMedia`, `releaseMedia`,
`releasePointer`, and the rest round 1 used). Search `tests/setupBrowser.ts` for an existing reader before adding one.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles project reads the built cascade: run
`npm run build:src:styles` before a styles run, and run a styles file with
`npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the same time; a
timing failure under load is an observation with its `/proc/loadavg` reading. Write every log, backup, probe, and script
under this worktree's `tmp/units/`, never in the scratchpad.

**Shared file, told to the engine session.** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` also take
`sampleTransition` (E-ID-MOTION-FADE), `readCentre` (STATES), and the engine session's `readDuration` and door tables,
each in another worktree. Add your export and its proof; change nothing else there. The landings merge by hunk.

**Control identifiers.** F1, F2, R1, R3, and the claim numbers are this brief's labels. Name each test for what it
proves.

## Unknowns

- Whether the release's `.btn` button-versus-anchor map on Chromium 141 equals round 1's fixed list in every state.
  Read it first and report it; a difference is a finding about the fixed list, not a stop.
- The reader's name and signature. Settle them under `.claude/rules/names.md` (a module-scope helper takes
  `{verb}{Noun}`), and state them in the report.

## Scope

**Owned.**
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: the reader's export, its types if the module keeps its
  types beside it (else `tests/setup.ts` for the types), its proof, and the export-list entry.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: the holder rename, the removal of `BUTTON_FORM_DIFFERENCES`,
  any state list the reader takes, and the export-list case.
- `tests/src/styles/elements/button.test.ts`.
- `tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination,carousel}.test.ts`: one
  reboot case each.
- `guides/veneer.md`: the § Outside the ledger paragraph round 1 rewrote, and § Tests where a title it names changes.
- `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, which is restored byte-identically; `tests/setupServer.ts`;
`tests/src/browser/**`; `tests/app/**`; the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`); `vite.config.ts`; `package.json`; and every other path.

**What asserts the state this change ends.** The export-list cases in `tests/setupBrowser.test.ts` and
`tests/setupStyles.test.ts`; the § Outside the ledger paragraph; `npm run test:guides`. Search the tree for
`BUTTON_FORM_DIFFERENCES` and `BUTTON_RETUNED_HOLDER_STYLE` before editing, and own every site that comes back.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles`
and `npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. **Read the release's `.btn` maps.** On this tree, record the release's button-versus-anchor map for each `.btn` form
   and state, and log it to `tmp/units/ebcl-2-btn-release.log.txt`.
2. **The reader.** Export one reader from `tests/setupBrowser.ts` that mounts a button form and its counterpart under a
   holder in the Veneer document and in a shadow root holding the release's stylesheet, drives each state with the
   harness's real input, checks each state's entry per form, and returns each cascade's map of differing longhands with
   the button's value. The entry check per form is R1's: `:hover`, `:active`, and `:focus-visible` for the driven
   states; `:disabled` for the button in the disabled state, `.disabled` for a paired counterpart, and `*` only for an
   unpaired counterpart. Prove it in `tests/setupBrowser.test.ts` with a fixture whose two forms differ in one planted
   longhand in one state, and a control fixture whose forms do not.
3. **The `.btn` proof.** Rewrite it to call the reader for each `.btn` form and assert that the Veneer map equals the
   release map in every state. Remove `BUTTON_FORM_DIFFERENCES` and its export-list entry. Keep the case's subject; its
   title states the release comparison.
4. **The reboot proofs.** Move each class's reboot case out of `button.test.ts` into its partial's test file (the
   carousel file takes the controls and the indicator), each calling the reader over its `BUTTON_REBOOT_CASES` entry,
   with the release-map equality and the `appearance` guard. `button.test.ts` keeps the `.btn` proof and the nav-link
   case.
5. **R3.** Add a case to `tests/setupStyles.test.ts` asserting that `BUTTON_REBOOT_CASES` names exactly the classes
   `BUTTON_REBOOT_SELECTORS` resets.
6. **F1 and F2.** Rename `BUTTON_RETUNED_HOLDER_STYLE` to `BUTTON_REBOOT_HOLDER_STYLE` at every site. Name the two
   readings `buttonReading` and `counterpartReading`. Rewrite the three comments the verdict names so each states what
   the code does; the holder sentence says it retunes every token the button surface reads outside forced colors.
7. **Claim 10.** In the § Outside the ledger paragraph, the holder sentence says "outside forced colors", and the
   unpaired condition says "no `:disabled` rule".
8. **Plants.** Log each to `tmp/units/ebcl-2-plant-<name>.log.txt` and restore byte-identically:
   - **`include`:** remove `_close.scss`'s `button-reboot` include; the close case in `close.test.ts` fails with an
     assertion.
   - **`btn-leak`:** add one surface longhand to the `.btn` button form only in `src/styles/components/_button.scss`
     (a rule on `button.btn` the anchor form does not match); the `.btn` proof fails with an assertion.
   - **`both-default`:** inject, in the test file only, one style rule into both the Veneer document and the release
     shadow root that sets `outline-width: 3px` on the anchor form alone in the pressed state, standing in for a user
     agent default that moves both cascades; the `.btn` proof stays green. Run the same injection into the Veneer
     document alone; the proof fails with an assertion. This is the Chromium 153 row's shape proved on Chromium 141.
     Remove the injection afterwards.
   - **`entry`:** replace the disabled drive's body with `element.blur()` alone; the reader's entry check fails.
9. **Gates.** Run each gate in Acceptance, logged to `tmp/units/ebcl-2-<gate>.log.txt` with `echo "exit=$?"` and
   `cat /proc/loadavg` appended.

## Output

Write `tmp/units/ebcl-report-2.md` and return the same text. It holds: the release `.btn` maps and whether they equal
the removed fixed list; the reader's name, signature, and proof; where each case now sits; the plant table with each
plant's command, failing assertion, and restore; the gate table; `tmp/units/ebcl-2.diff` (`git diff 2376710`) and
`tmp/units/ebcl-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a class's Veneer map differs from its release map, when the `both-default` plant reddens the
  `.btn` proof, or when a change needs a file outside the owned set.
- Settle yourself the reader's name and signature, its types' home, the case titles, and the comment and prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`, the owned styles files pass under
   `npx vitest run --config configs/src/vite.styles.config.ts <files>`.
3. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes.
4. Each plant in Execution step 8 reads as the step states, per its log.
5. `npm run test:guides`, `npm run test:policy`, and `npm run test:conformance` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
