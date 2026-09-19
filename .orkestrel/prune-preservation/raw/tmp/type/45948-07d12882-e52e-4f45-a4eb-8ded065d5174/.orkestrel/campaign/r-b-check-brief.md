# Unit R-B — checker brief

## Role and engine

`checker` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, and `Glob` and no
shell, in the checkout `C:/Users/mikes/WebstormProjects/roughnotes` at the tip the dispatch
message names, after unit R-B returned (the tree carries its uncommitted edits). You read the unit's
report at `tmp/units/r-b-report.md`, the brief at `tmp/units/r-b-brief.md`, and the tree, and you
report mechanical facts; you rule on nothing subjective and edit nothing.

## Criteria — report each as MET or UNMET with the lines it rests on (file:line)

1. `grep -rn "class QuotaStorage\|class PermissionStorage\|function readMenuSettled\|function isPainted\|function buildCompositeStack\|function buildEscapeFixtures\|function buildMarkControl\|function readAnnounced\|elementFromPoint\|VITE_CAPTURE\|classList" tests/`
   matches nothing (quote any match).
2. `tests/setupBrowser.ts` and `tests/app/browser/integration.test.ts` each import from
   `@orkestrel/test/browser`, and each published replacement the brief's table names
   (`createStorage`, `readRefusal`, `readStates`, `waitForState`, `buildCensus`, `buildContrast`,
   `readCensus`, `buildEscapes`, `waitForAnimations`, `readContrast`, `readHit`) is imported by
   name where the suite uses it (quote the import lines).
3. `tests/setupBrowser.test.ts` exists and proves the setup module's exports (name the cases);
   `package.json`'s `test` chain invokes `npm run test:setup:browser`; `vite.config.ts` registers
   the `setup:browser` project and the `test:setup:browser` script exists (quote the lines).
4. The report carries the replacement table with each local export's fate and the published
   declaration line, the reach-past routings, the families declared with the statechart ruling and
   the unions read, the five intents each with a guide line or a product finding, the
   `readContrast`-versus-gradient readings, and the mutation readings for the journey class and the
   refusal class with commands, failing counts, and green-after-restore.
5. Every product finding in the report names its evidence site (a file and line under `app/` or
   `guides/`) and invents no copy; no `app/**` file is in the diff (quote `git status --short`
   from the report).
6. `configs/app/vite.browser.config.ts` passes the adopter's `optimizeDeps.include` list as an
   override to `appBrowser`, and `tests/conformance.test.ts` asserts the wrapper's configuration
   (quote both).
7. The diff touches only owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
   `tests/app/browser/**`, `tests/conformance.test.ts`, `configs/app/vite.browser.config.ts`,
   `configs/app/vite.journey.config.ts`, `package.json` (the `test` chain alone), `tmp/capture/**`;
   no vendored file, `vite.config.ts`, `configs/browsers.ts`, `tsconfig.json`, `package-lock.json`,
   `app/**`, or `.orkestrel/**` (compare the report's `git status --short` against this list;
   `vite.config.ts` may appear only if `repair --groups configs,manifests` regenerated it
   byte-identically — quote the report's account).
8. Each control `R-B-C1` through `R-B-C8` has a command and a reading in the report; no test is
   named for a control label; no `TODO`, `.only`, `.skip`, or `it.todo` was added.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing.

## Output

Return, as your final message and nothing else, one line per criterion, `MET` or `UNMET`, with
the quoted lines it rests on, and the terminal line `CHECK: PASS` or `CHECK: FAIL <criteria>`.
