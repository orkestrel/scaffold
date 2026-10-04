# Unit browse-9-10-3 — finish browse-9-10, with host-independence repairs

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6`. Never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish the unit `tmp/codex/browse-9-10-brief.md` describes, as amended by `tmp/codex/browse-9-10-2-brief.md`; read both and both reports (`browse-9-10-report.md`, `browse-9-10-2-report.md`). The item 9 repairs and the C5 repair are uncommitted in the worktree; keep them.

## Host independence

This repository's gates were last run on a Linux host (the cloud session). On this Windows host, unchanged tests fail where their assertion assumes that host: C5's macrotask budget (repaired) and `SocketCDPTransport > carries a CDP client to Browser.getVersion over the page WebSocket` (`tests/src/browser/transports/SocketCDPTransport.test.ts:16`), which expects the product to match `/Chrom/` while this host's discovered browser answers `Edg/154.0.4258.53`, a Chromium browser. You are authorized to repair any unchanged test whose failure here comes from a host assumption (browser brand or channel, timer granularity, path separators, line endings, file-system case, process termination), without stopping, under these conditions:

- Show the failure is host-bound: the test is unchanged from `655906b` (`git diff 655906b -- <file>` empty), and the behavior it names holds here (for example, the CDP round trip answers).
- Repair the assertion to the property the test claims, against a second mechanism where one exists (for example, compare the product with the endpoint's own `/json/version` answer, or assert the reply's shape), never by weakening it to pass anything; name the mutation that still reddens it.
- Put every such repair in a separate commit before commit 1, titled as host-independence repairs to unchanged tests, listing each test, the host assumption, and the evidence.

Stop under the deviation contract for any failure in code item 9 changed, any product defect, or any failure you cannot show is host-bound.

## Then

Commit 1 (item 9's review findings plus the C5 repair) after its gates, then item 10 as commit 2, each gated exactly as the first brief lists. Do not run the scaffold discovery script.

## Output

Write the report to `tmp/codex/browse-9-10-3-report.md` and return it as your final message, in the first brief's output shape, covering all three runs and listing the host-independence commit. No process diary.

## Deviation contract

On any conflict with the briefs, the design, or the tree outside the authorization in § Host independence, stop and report: expected, found, evidence, done or not done, and one hypothesis.
