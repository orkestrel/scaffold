# Unit browse-9-10 — repair item 9 from its review, then implement item 10

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. You are the sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse` of `@orkestrel/browser`, on the branch `ccr-d15a48b1-yyyll6` at `655906b` (item 9). Make two commits on that branch, in order; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law and records

- The worktree's `AGENTS.md` and the rules it maps.
- The design of record for items 9 and 10: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\items-9-10-design.md` (its probe findings, rulings, public surface, file edits, the tests that must fail without each feature, and the guide and roadmap edits).
- The lane's status: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md`.

## Commit 1: item 9's review findings

An adversarial review of `git diff f11f821..655906b` confirmed 13 findings; they are in `tmp/browse-item-9-confirmed.md` with each finding's evidence, the fix it requires, and the verifier's reasoning. Repair F1 to F12 as each states, adding the tests F2 to F5 name so that each fails when its feature or rule is removed (record the mutation and the failing count before, the passing count after). F13 is a referral: determine whether the DOM placement can report a stale focus from an unfocused same-origin frame document (`src/browser/elements/BrowserDOMElementManager.ts:386`); if it can, repair it with a test that fails before; if it cannot, state the evidence in the report. The review refuted the other six findings; do not act on them. Commit with a message naming each finding's repair.

## Commit 2: item 10

Implement item 10 exactly as the design's item 10 part rules it: `pressed=`, `expanded=`, and `selected=` on the outline row in both placements and in the guide's row format, with the tests the design lists failing without the feature, the guide edits, and the `ROADMAP.md` edit in the same commit. The cloud session's earlier item 10 work was lost; start from the design. Where the design names a probe, run it first with its control and record the reading.

## Gates

After each commit's last edit, read each exit code bare, with npm 11.6.0 or later (this host has npm 12.0.2): `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`. Then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write the report to `tmp/codex/browse-9-10-report.md` and return it as your final message: per finding and per item 10 ruling, the repair and its red-before and green-after commands with counts; F13's ruling; the gate table for each commit; both commit hashes; and any deviation. No process diary.

## Deviation contract

On any conflict with this brief, the design, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
