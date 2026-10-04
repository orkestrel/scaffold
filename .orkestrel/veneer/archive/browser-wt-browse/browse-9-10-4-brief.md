# Unit browse-9-10-4 — Windows portability, then finish browse-9-10

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `ce66ba3`. Never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Read the three earlier briefs and reports (`tmp/codex/browse-9-10-*.md`). The item 9 repairs and the C5 repair are uncommitted; keep them. The third run stopped on `test:src:server`: 235 passed, 11 failed, 3 skipped on this Windows host, in tests unchanged since `655906b`. This run makes the package correct on Windows, then finishes the unit.

## Law

The worktree's `AGENTS.md` and its rules, above all `.claude/rules/portability.md` (published source runs on Windows and Linux; branch on a capability a runtime probe answers; treat permission bits as advisory where a probe reports they do not round-trip; give a conditional skip the mechanism that makes it inapplicable, cited) and `.claude/rules/tests.md` (probe a host-varying property at runtime and assert against the probe).

## Commit A: Windows portability

For each failure, decide product defect or host capability with a probe and its control, then repair it:

1. **File-store lock release** (`FileBrowserStore > names the directory with ACCESS when release cannot rmdir it`; production `src/server/stores/FileBrowserStore.ts:380-388`). On Windows, `rmdir` on a regular file throws `ENOENT`, which the release path accepts as an already-removed directory, so a failed release resolves. Make the release distinguish a missing path from an existing non-directory on both hosts (for example, an `lstat` before or after the failure), so the case rejects with `BROWSER_JOURNEY_ACCESS` here as it does on Linux. The test that names it must fail before the repair on this host.
2. **File-store failed rename cleanup** (expected `BROWSER_JOURNEY_FILE`, received `BROWSER_JOURNEY_ACCESS`). Find which error code Windows raises at that step, and classify by what failed rather than by a POSIX-only code; prove both hosts' codes map to the documented error.
3. **Browser readiness after the re-executed process closes stderr** (expected an early readiness refusal, got the 10,000 ms deadline). Determine whether the launcher misses the stderr close on Windows (a product defect: repair it so readiness refuses when the child's stderr closes, on both hosts) or the test's fixture process behaves differently here (repair the fixture so it closes stderr on both hosts); prove which with a probe.
4. **The `chmod` permission proof** (expected mode 0, read 0444). Permission bits do not round-trip on Windows; gate the mode assertion on a runtime probe that a written mode reads back, keeping the refusal assertion that holds on both hosts.
5. **Seven symlink cases** (journey-store linked components; run-store capture, clear, delete, and run-file links; file-store temporary link and root alias) fail creating symlinks with `EPERM`. Probe whether this process may create a file symlink and a directory link; where Windows offers an equivalent the store must also refuse (a junction for a directory link), drive the refusal through it; where no equivalent exists, skip with the probed mechanism cited (`EPERM` from `symlink` without the privilege), never by platform name alone. The store's refusal behavior itself must stay proven on this host wherever a link can be created.

Commit A holds the product repairs and the test changes, titled as Windows portability, listing each case, its classification, the probe, and the evidence.

## Then

Commit 1 (item 9's review findings plus the C5 repair) after its gates, then item 10 as commit 2, each gated exactly as the first brief lists, plus `npm run test:src:server` and `npm run test:service` green on this host. Do not run the scaffold discovery script.

## Output

Write the report to `tmp/codex/browse-9-10-4-report.md` and return it as your final message, in the first brief's output shape, covering all four runs, with commit A's table (case, classification, probe and control, repair, red-before and green-after). No process diary.

## Deviation contract

On any conflict with the briefs, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
