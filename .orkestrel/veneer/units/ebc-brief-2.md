# Unit E-ID-BUTTON-CASCADE round 2 — apply the returned enumeration patch

Successor to `e-id-button-cascade-brief.md`. What changed: round 1 stopped correctly on two unowned proofs that
enumerate every `components`-layer rule on their component's classes; the Orchestrator's brief had scoped the unit by
the old selector, not by the enumerating proofs. This round grants those two files and applies the unit's own returned
patch verbatim.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-ebc`, which holds round 1.

## Change

Apply `tmp/units/ebc-unowned-enumerations.patch` with `git apply` in `/home/user/veneer-ebc` (it edits
`tests/src/styles/components/accordion.test.ts` and `tests/src/styles/components/carousel.test.ts`, which this round
owns). Change nothing else. Format the two files with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes other than `git apply`, no install, no
`npm run format`.

1. Apply the patch.
2. Run `npm run build:src:styles`, then `npm run test:src:styles`, `npm run format:check`, and `npm run lint:check`, each
   logged to `tmp/units/ebc-2-<gate>.log.txt` with `echo "exit=$?"` appended.
3. Write `git diff e07b3a6` to `tmp/units/ebc-2.diff` and `git status --short` to `tmp/units/ebc-2-status.txt`.

## Output

Return the gate table with exit codes, test counts, and log paths, and the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the patch does not apply or a
gate reads red.
