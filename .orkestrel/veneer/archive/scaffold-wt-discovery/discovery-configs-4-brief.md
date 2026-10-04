# Unit discovery-configs-4 — let Vitest apply each gate's own filters

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-discovery`, branch `discovery-configs` at `8da606341`. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

`tmp/codex/discovery-configs-3-review.md`: `FAIL 1, 4, 5` and O1, O2. Three reviews have found the census mirroring Vitest's selection by hand and diverging from it. Repair them structurally, with these rulings.

## The census

- Stop reimplementing Vitest's selection. Remove the hand-written project matcher, the browser-suffix fold, and the hard-coded browser list. Vitest decides what each gate selects.
- Universe: keep one full `vitest list --json` per distinct config and mode, unfiltered, as the set of test identities `[file, projectName, name]` the census reports.
- Gates: for each Vitest gate invocation, ask Vitest what that exact invocation selects by listing with the invocation's own selecting arguments (config, mode, project filters, positional file filters, test-name pattern, and any other option that changes selection, which you read from Vitest's installed CLI source and name in the report); drop options that do not change selection. Use `--filesOnly` when the invocation has no test-name pattern and its listing names the same project identities as the full listing (verify both from the installed source and with a browser project); otherwise list in full. Deduplicate identical listing arguments.
- A test identity is gated when a gate's listing contains its file and project (and its name, for a test-name pattern), or a non-Vitest command runs its file directly. Identities match by the names Vitest reports in both listings; nothing folds.
- `vitest bench` and `vitest list` are not test gates (F3); invert the X2 proof.
- F5: classify a row as empty when any gate chain containing ` > ` names it, independent of script order.
- O2: recognize the runner anywhere in command position, including after Node options and as `npm exec vitest`.
- A proof for F1 (with a real browser project), F2, F3, F4, F5, and O2, each red at `8da606341` and green after; the earlier proofs stay green.
- Cost: the census runs more listings than before. Measure its wall time on scaffold and on veneer (run from veneer's root with your script by absolute path) before and after, with the host's other load (`Get-Process chrome,msedge,node,codex`), and say what cost would be too much for an audit run and why. No figure here is a target or a cap.

## Parity

Rewrite the opening comment and `SKILL.md:16` to state the rule as built: Vitest selects, the census compares. O1: move the inserted `describe` above the sweep comment it displaced.

## Distribution

Run `npm run test:distribution` at the final tip with no temporary-directory override and read the result bare (review item 4). If it needs a scratch directory inside the checkout, commit that as a harness change with its own proof.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm run test:policy`, `npm run test:guides`, `npm run test:config`, `npm run build`, then `npm test`, then `npm run test:distribution`. Then `git diff --check`. The final `git status --porcelain` is empty. Another writer may load the host; when a test times out under that load, rerun the file alone and report both runs; never raise a budget.

## Output

Write `tmp/codex/discovery-configs-4-report.md` and return it as your final message: per finding the change and its red and green commands with counts, scaffold's and veneer's census output and wall times, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only if Vitest's CLI cannot list what a gate invocation selects, and report: expected, found, evidence, and one hypothesis.
