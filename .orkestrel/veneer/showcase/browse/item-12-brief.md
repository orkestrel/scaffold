# Unit item-12 — let `wait` assert that its text left the page

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `cc93a2b` (pushed; item 11, the reading change, and their review repairs, every gate green). Make three commits, in order; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Authority, in order

1. The Orchestrator's rulings: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` § Item 12 rulings.
2. The corrected design: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\browse-item-12-design.md` § Corrected design, its Units U1 to U3, its Constraints, Refusals, and Measurements, with each tension settled by § Item 12 rulings or by the design's recommendation where the rulings are silent. Its citations were read at `655906b`; the reading change and item 11 have moved lines since, so re-read every citation before relying on it.
3. Browser `ROADMAP.md` item 12, this checkout's `AGENTS.md`, and its rules.

## Changes since the design

- The reading change renamed `what` to `search`, added `plain`, renamed the matchers to `scanBrowserOutline` and `scanBrowserText`, and raised the tool-definition bound to 6,600 (measured 6,559). The § Item 12 rulings' bound clause applies to that bound: write `absent`'s copy as tight as the constraints allow, measure, and when the length exceeds 6,600, raise the bound to the smallest multiple of 50 that holds it, stating its derivation in the present in the test comment and the guide, with the earlier length in the commit message.
- The design names `opus` writers and a `verifier`; on this host neither runs commands, so this unit writes all three commits and runs every gate itself.

## Commits

1. U1, engines and contract (the design's ownership list and order: the P1 to P5 probes in `tmp/probes/`, the promoted P1 tests red with their command and count, types, implementation, probes deleted).
2. U2, toolset and journeys.
3. U3, guide and roadmap: close item 12 in `ROADMAP.md` (an item keeps its number; remove its row) and re-read every remaining roadmap citation.

## Cost: the user's rule (2026-10-03)

Keep performance reasonable and measurable, with no fractional or micro optimization. The wake on `transitionend` and `animationend` replaces a timer path; measure a `wait` with `absent` on veneer's showcase (a toast and a collapse leaving) against the appearance wait, with the host's other load, and say before the run what added cost would be too much and why. No figure here is a target or a cap.

## Gates

After the last commit, run `node tmp/codex/merge-gates.ts item-12` (every gate in order, continuing past a failure, output under `tmp/codex/item-12-*.log`) and read each exit code. When `test:service` fails, rerun the failing file alone and report both runs; never raise a budget or a timeout. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/item-12-report.md` and return it as your final message: per commit its changes and each acceptance proof's red and green command and counts, the probe readings, the copy measurement against the bound, the cost measurement, the gate table, the three commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only when a ruling cannot hold without changing a contract the design does not name, and report: expected, found, evidence, and one hypothesis.
