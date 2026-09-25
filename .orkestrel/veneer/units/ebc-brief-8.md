# Unit E-ID-BUTTON-CASCADE round 6 — the enumeration titles name the selectors they read

Successor to `ebc-brief-7.md`. What changed: the fix-round audit 3 (`ebc-audit-3-verdict.md`) confirmed the code, the
probe, the control, the kills, and the scope, and failed claim 1 on both lanes: the accordion and carousel titles say
"no other rule" where each case reads a set of distinct selectors (the objective lane), and the carousel title calls the
indicators' `:where(.carousel-indicators [data-bs-target])` a button form (the subjective lane). The wording was the
Orchestrator's own in `ebc-brief-5.md`. The verdict's seam ruling fixes the wording below; this round applies it
verbatim and proves the comments' two statements with one plant each.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-ebc`, which holds rounds 1 to 5
uncommitted over `e07b3a6`. The harness environment block may name another directory as the primary working
directory; start every shell command with `cd /home/user/veneer-ebc &&` and give every file tool an absolute path under
it. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/tests.md` first. No skill applies.

## Changes

1. `tests/src/styles/components/accordion.test.ts`, in `describe('accordion classes')`: replace the comment block above
   the enumeration case with these lines, verbatim:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming an accordion class, so a
   	// missing selector and an extra selector each report here, and a second rule on a recorded
   	// selector leaves the reading unchanged. The dark icon selector is the release's own, recorded
   	// under the theme key, so it is read beside the key's list, and so is the button reboot's selector
   	// on the header's button form.
   ```

   and retitle the case, verbatim:
   `writes the recorded accordion selectors, the dark icon selector, and the button reboot's selector on the header's button form, and no other components-layer selector naming an accordion class`.
2. `tests/src/styles/components/carousel.test.ts`, in `describe('carousel track and slides')`: replace the comment block
   above the enumeration case with these lines, verbatim:

   ```ts
   	// The mutation this catches is a selector the partial stops writing, or one it writes beyond the
   	// release: the reading is the set of components-layer selectors naming one of the key's own
   	// classes, so a missing selector and an extra selector each report here, and a second rule on a
   	// recorded selector leaves the reading unchanged. The button reboot's selectors on the controls'
   	// button forms and on the indicators' own component selector are read beside the key's list.
   ```

   and retitle the case, verbatim:
   `writes the recorded carousel selectors, the button reboot's selectors on the controls' button forms and on the indicators' own selector, and no other components-layer selector naming a carousel key class`.
3. Plants, one file at a time, each copied aside first with its SHA-256 recorded, restored from the copy, and its
   SHA-256 checked equal after:
   - `dup-accordion`: inside the `@layer components` block of `src/styles/components/_accordion.scss`, append the rule
     `.accordion-button { letter-spacing: 1px; }` as the block's last rule. Run
     `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/accordion.test.ts -t "no other components-layer selector"`
     (the styles project reads the built cascade, so every plant and every restore rebuilds it). The enumeration case
     must pass: the comment says a second rule on a recorded selector leaves
     the reading unchanged.
   - `extra-accordion`: append `.accordion-button.audit-probe { letter-spacing: 1px; }` instead. The same command must
     fail the enumeration case with an `AssertionError`.
   - `dup-carousel` and `extra-carousel`: the same pair in `src/styles/components/_carousel.scss` with `.carousel-item`
     and `.carousel-item.audit-probe`, run against `tests/src/styles/components/carousel.test.ts`.
   Log each run to `tmp/units/logs/ebc-6-plant-<name>.log.txt` with the restore digest line appended, and run
   `npm run build:src:styles` after the last restore.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes, no install, no `npm run format`. Format the two
test files with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, then run `npm run format:check`,
`npm run lint:check`, `npm run check`, and `npm run test:src:styles`, each logged to `tmp/units/ebc-6-<gate>.log.txt`
with `echo "exit=$?"` appended. Write `git diff e07b3a6` to `tmp/units/ebc-6.diff` and `git status --short` to
`tmp/units/ebc-6-status.txt`.

## Output

Write `tmp/units/ebc-report-6.md` and return the same text: each change's result; the plant table (plant, command,
expected, the case's result quoted, restore digest); the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This round settles nothing but the formatter's
wrapping. Stop and report if a `dup-` plant fails the case, if an `extra-` plant passes it, if a restore digest differs,
or if a gate reads red.

## Acceptance criteria

Both comments and titles read verbatim as given (after the formatter); each `dup-` plant passes and each `extra-` plant
fails the enumeration case with an `AssertionError`; every restore is byte-identical; every gate exits 0.
