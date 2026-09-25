# Unit ER-MECH round 4 — the Receipts Platform sentence and the retained plant

Successor to `er-mech-brief-3.md`. What changed: the fix-round audit 3 (`erm-audit-3-verdict.md`) confirmed round 3's
code and carries F1 (the guide sentence) and claim 1's retention (the plant's run).

## Role and engine

`builder` on Sonnet, the same writer in `/home/user/veneer-erm`, continuing from its current state. Start every shell
command with `cd /home/user/veneer-erm &&` and give every file tool an absolute path under it.

## Items

1. **The guide sentence.** In `guides/veneer.md` § Hosts, replace the sentence beginning `The readers of both tables
   refuse a malformed cell and name its row` with this text, verbatim and wrapped by the formatter:
   `The readers of both tables refuse a malformed cell and name its row, including a Platform cell that holds no value
   Node reports as its platform (a Supported hosts row may write `—` for a platform the guide doesn't name yet) and a
   Commands cell whose code spans are not separated by commas.` Keep the code spans the sentence already carries.
2. **The retained plant.** Copy `tests/setupServer.ts` aside and record its SHA-256. Delete the Receipts Platform check
   (the `if` and its `throw`, and the comment above them) and run
   `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "reads receipts only within their Hosts subsection and refuses each malformed cell"`
   (use the project name `npm run test:setup` runs; read it from `vite.config.ts` if `setup` is not it), logging the
   whole output to `tmp/units/erm-4-plant-receipts-platform.log.txt`; restore from the copy and append the before and
   after digests to the log. The case must fail with an `AssertionError`.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`. No git
command that writes, no install, no `npm run format`. Format the guide with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json guides/veneer.md`, then run `npm run format:check`,
`npm run test:guides`, and `npm run test:policy`, each logged to `tmp/units/erm-4-<gate>.log.txt` with
`echo "exit=$?"` appended. Write `git diff 873f715` to `tmp/units/erm-4.diff` and `git status --short` to
`tmp/units/erm-4-status.txt`.

## Output

Write `tmp/units/erm-report-4.md` and return the same text: the sentence as it reads after the formatter; the plant's
failing line quoted with the digests; the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if the plant passes, if the
restore digest differs, or if a gate reads red.

## Acceptance criteria

The sentence reads verbatim; the plant fails the case with an `AssertionError` and the restore is byte-identical; every
gate exits 0.
