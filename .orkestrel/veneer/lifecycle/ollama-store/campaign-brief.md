# Unit store-campaign — make ollama's live store page tasks reliable on qwen3.5:2b, measured

## Role and engine

`astra` on GPT-6 Astra through `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Perform the assignment yourself and spawn nothing. Never push or publish. Never run `git checkout`, `restore`, `stash`, `reset`, or `clean` in a main checkout (ollama, browser, agent); do the work in worktrees you create under each checkout's `tmp/` (`git worktree add -b store-reliability tmp/store-reliability`) and remove them at the end after reporting their branch heads. The Ollama daemon (0.35.0) answers at `http://localhost:11434` with `qwen3.5:2b-q4_K_M`; keep that model, temperature 0, context, predict, iteration limit, attempt count, and every budget unchanged. The host must stay otherwise quiet; record the host load at each configuration's start.

## Inputs

- The diagnosis and design: `tmp/codex/reliability-design.md` (ranked changes 1 to 8, the measurement plan, the rejected list, and the critic's 13 gaps; the failure classes F-1 to F-22 and G-1 to G-15 with their transcript evidence).
- The baseline at `b4a18c3`: `tmp/codex/store-bisect-report.md` and `tmp/codex/store-bisect/baseline/` (0 of 8 runs passed all page tasks; checkout 8/8, search 7/8, shipping 4/8, click 3/8, paging 3/8).
- ollama `main` at `90901da` (each attempt isolates its own context) with the 0.0.21 bump uncommitted; browser `main` at `3924fbb` (0.0.23 plus the 0.0.24 hardening); agent at its published 0.0.26 head.

## The user's rulings (2026-10-04)

- Fix with the same model; never raise a budget, attempt count, iteration limit, predict, or temperature; never weaken an oracle; no hint that answers a task.
- Rank 4 (the "open its page first" sentence) is **refused**: the first choice of link stays the measured step.
- **Measure** an `@orkestrel/agent` change that passes a string tool result to the model as plain text rather than a JSON string literal with escaped newlines (the design's T4, agent `index.js` near `:2192`); keep it only if it settles a gain with no harm, as a later agent release.
- Rank 2 (look's footer naming read) is **allowed and kept only if measured**: a settled gain and no settled harm to shipping, judged on the fact-reached count as well as the pass count.
- The **journey task is excluded** from this series' acceptance; run it as a recorded guard only, and change nothing for it (its double-submit oracle is ruled later).
- Rank 3's fixture rewrite may drop the token's label words; build its no-shared-word test from every search argument in the baseline and head paging transcripts (the critic found `your`, `weather`, `holidays`).

## Assignment

Run the design's series with the critic's corrections, which bind:

1. **Pre-register** each configuration before its runs: the changes it adds, its target task and failure class (the confirmatory test), its guard tasks, and a fixed n per arm (one extension at most, with the alpha split between the looks stated). Compare each task with the latest configuration that ran it, naming that arm.
2. **Order:** S0 the head baseline on all five page tasks (journey recorded as a guard); S1 rank 3 (paging fixture); S2 rank 5 (the task after the seeded view, applied to ollama's harness only: the mirrored `guides/browser.md` stays byte-identical, and the report states that the harness's message layout differs from the browser guide's example); S3 rank 1 (the zero-match line) with the critic's F-2 reading; S4 rank 2 (look's footer naming read); S5 ranks 6, 7, 8 plus the critic's look-search description scoped to element names, with rank 6's copy split for the past-end case; S6 the agent plain-text change. Run every configuration that changes a seed or a result text on all five page tasks.
3. **Readings:** primary are the per-attempt failure-class counts by the design's classifier, plus a fact-reached count for shipping and paging; pass counts are secondary. Guards are non-inferiority: any fall in a guarded task's pass or fact-reached count triggers the pre-registered extension or a revert. Record whether attempts 2 and 3 repeat attempt 1 at temperature 0.
4. **Browser and agent changes** are commits on a `store-reliability` branch in a worktree of each repository, measured from local packs installed with `npm install --no-save` in the ollama measurement worktree; each change carries its unit tests and guide rows in its own repository, per the design's units U-B1 to U-B3. Revert a change the series does not keep with a new commit on the branch.
5. **Acceptance:** with the kept changes, run all five page tasks for an n you choose from the design's formula for a per-run failure bound you state and justify; report the bound the clean runs establish.

## Output

Write `tmp/codex/store-campaign-report.md` and return it as your final message: each configuration's pre-registration and run table (every run's per-task outcome, class counts, fact-reached counts, host load), each change's keep or revert ruling with the test that settled it, the acceptance series and its bound, the branch heads in each repository (browser, agent, ollama) with the kept commits, and the ollama harness commits ready for `main`. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, one hypothesis) when a kept change would need an oracle change, when the daemon or model state changes mid-series, or when the host load cannot be held quiet.
