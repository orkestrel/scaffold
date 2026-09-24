# Audit claims — UTIL-FONT (`uf`), round 2

Subject: round 2's record — `uf-2.diff` and `uf-2-status.txt` (the worktree `/home/user/veneer-uf`
against `2a3f223`), the revised shared patch `uf-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `uf-shared.patch` whole), the report `b-utilities-uf-report-2.md`, and the round-2
instruments and logs under `uf-instruments/` (`uf-mutations-2.sh`, `uf-mutations-2.log.txt`,
`uf-gates-2.sh`, `uf-gates-2.log.txt`, `uf-probe-2.log.txt`) — against the successor brief
`b-utilities-uf-brief-2.md`, the round-1 verdict `uf-audit-verdict.md` and its lane verdicts, and round
1's record (`uf.diff`, `uf-shared.patch`, `b-utilities-uf-report.md`). The unit was written by `opus`
on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; where the verdict or the brief quotes a replacement sentence, that sentence is the fix; the
validation copy was deleted before the report, so a lane rules the gate and mutation claims from the
code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `uf-2-status.txt` lists round 1's owned paths and nothing else;
   `uf-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`; against round 1
   it changes only `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md`, at the
   F-a to F-c sites and the paragraphs they re-flow; the owned files change only at the F-c sites.
2. **F-a: the guide's claims.** The weight sentence, the § Showcase sentence, the `--vn-line-body` token
   wording (the departure bullet's title included), and the size departure's appended clause carry the
   brief's text; the stated values (a retuned body weight leaves the `.fw-normal` class at 400; the
   `.fs-1` class resolves 36px against the release's 40px cap; the `.fs-5` class resolves 18px against
   the release's 20px) are true of the built cascade and the release, read in `uf-probe-2.log.txt` and
   the shipped proof's rows.
3. **F-b: the step table.** `FONT_STEP_TABLES` sits in `tests/setupStyles.ts`, frozen and exported with
   frozen rows; the binding case iterates it and keeps every inventory comparison round 1 made; its
   completeness assertion derives the covered keys from the inventory, so a dropped row reddens it; the
   retained runs (the `lh` row dropped, the `fst` row dropped, the `fw` property changed) redden the case,
   and its assertions distinguish each.
4. **F-c: the prose.** The `font.test.ts` comment names the case it points to; "under a 400 and a 600
   parent weight" replaces every "two parent weights"; "the `.fs-1` to `.fs-4` sizes" replaces "its first
   four sizes"; no added or changed line counts a growable set, names a list item by its position, or
   uses a cross-reference `above` or `below`, and each hit the report rules a permitted sense is one.
5. **The round-1 confirmations.** The claims round 1 confirmed (scope, the cascade, the proof matrix, the
   heading scale, the Tailwind names, the sections and registries) still hold on round 2's files.
6. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion, no
   `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; the round-2 report follows the writing rule and records each gate's command as it ran with
   its result line; a lane lists every count the report states as a finding outside the claims for the
   record.
