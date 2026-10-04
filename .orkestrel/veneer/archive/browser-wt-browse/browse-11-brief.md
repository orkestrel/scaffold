# Unit browse-11 — item 11: `read` returns the rendered text only

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `73c608f` (item 10, pushed). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law and records

- The worktree's `AGENTS.md` and the rules it maps.
- The design of record: `tmp/browse-item-11-design.md`, § Corrected design (its probes, rulings, public surface, file edits, the tests that must fail without the feature, the guide and roadmap edits, and its ruled tensions). The § Verdicts part that precedes it is the critique the corrected design answers; where the two differ, the corrected design governs.
- The lane's status: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md`.

## Objective

Do units U1 and U2 of the corrected design in this one run:

1. Run P1, P2, and P3 with their controls in `tmp/probes/read-rendered.test.ts`, and the bench B0, recording the system Chromium version (this host's discovered browser is Edge 154) and the Playwright Chromium version that `test:src:browser` runs. A P2 request or constructor run stops the item under the design's stop condition.
2. Implement item 11 as the corrected design rules it, with ruling 5 taking P1's reading. Re-read every path:line the design cites, because item 10 (`73c608f`) shifted lines after the design was written at `655906b`.
3. Prove each test the design lists fails with the feature removed (record the mutation and the failing count) and passes with it.
4. Run B1 and record B0 and B1 side by side.
5. Promote the settled probe readings into the mirrored tests and delete the probe file.

## Gates

After the last edit, read each exit code bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`. Then `git diff --check`. Commit item 11 as one commit. The final `git status --porcelain` is empty. Do not run the scaffold discovery script.

## Output

Write the report to `tmp/codex/browse-11-report.md` and return it as your final message: P1 to P3 and B0/B1 with both Chromium versions; each ruling with its red-before and green-after commands and counts; the gate table; the commit hash; and any deviation. No process diary.

## Deviation contract

Stop only for the design's P2 stop condition, or for a product defect you cannot repair without changing a public type or a documented behavior the design does not rule, and report: expected, found, evidence, done or not done, and one hypothesis.
