# Quick review of unit AS2 by Astra (read-only)

## Role and engine

`analyst` route on `gpt-6-astra` through the Codex CLI, read-only sandbox. You edit nothing, run no build, no vitest, and no browser; you read and judge. You perform the work yourself and spawn nothing.

## Why this review exists

The lane that produced unit AS2 ran part of its session on a model other than Astra after a Codex model-catalog change (after a four-hour cap it was resumed for about twelve minutes on gpt-6-luna, then stopped and resumed on gpt-6-astra to its end). The user asked for a quick Astra review of its output before it lands.

## What you read

- The brief: `/home/user/scaffold/tmp/codex/audit-showcase-brief.md`.
- The lane's final message: `/home/user/scaffold/tmp/codex/as2-last.md`.
- The worktree with the lane's uncommitted or committed changes: `/home/user/.wave/veneer-audit-showcase` (read `git -C /home/user/.wave/veneer-audit-showcase diff HEAD` or `git -C /home/user/.wave/veneer-audit-showcase show HEAD` as the state requires, and the files it names).
- The audit verdict the brief implements: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/redesign-2026-10-06/audit-2026-10-07/verdict.md` (only the sections the brief names).
- The laws the diff must obey: `/home/user/.wave/veneer-audit-showcase/AGENTS.md`, `/home/user/.wave/veneer-audit-showcase/.claude/rules/*.md` (writing, typescript, styles where they apply), and the guide sections the diff touches in `/home/user/.wave/veneer-audit-showcase/guides/veneer.md`.

## What you judge, in this order

1. Contract: does the diff do what the brief's Contract asks, item by item, and nothing outside its owned files? Name each item as met, partly met, or not met, with file:line.
2. Correctness: for each sheet, markup, engine, or test change, is the mechanism right (cascade, layer, specificity, importance, DOM order, event order), and could it break a case or a consumer the lane did not run? Cite the line and the reason.
3. Proof sufficiency: does each claim in the final message have a case or a reading behind it, and does the case read what the claim says? Name any claim without a proof.
4. Guide parity and voice: every new export, map, row, caption, or departure documented where its kind lives; prose in the rules' voice (no `should`, no `simply`, present tense, no `now`/`new`).
5. Contract breaches: a `style` attribute or stylesheet in the showcase, a root `src/browser` file changed by a native unit, a hand-edited generated record, a skipped or weakened test, a timeout raised without a measurement.

## Output

Final message, as plain data: a verdict line (`land`, `land after fixes`, or `stop`), then the findings as a table with columns Severity (blocking, fix before landing, note), File:line, Finding, Evidence, Proposed fix (one sentence). Then the Contract item table (item, status, evidence). No process diary, no praise.
