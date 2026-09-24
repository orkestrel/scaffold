# Audit claims — UTIL-EFFECT (`ue`), round 2

Subject: round 2's record — `ue-2.diff` and `ue-2-status.txt` (the worktree `/home/user/veneer-ue`
against `2a3f223`), the revised shared patch `ue-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `ue-shared.patch` whole), the report `b-utilities-ue-report-2.md`, and the round-2
instruments and logs under `ue-instruments/` (`ue-mutations-2.sh`, `ue-mutations-2.log.txt`,
`ue-cascade-keys-2.mjs`, `ue-probe-2.test.ts`, `ue-gates-2.sh`, `ue-gates-2.log.txt`, the
`ue-2-gate-*.log.txt` logs, `ue-2-interdiff.txt`, `ue-2-apply-check.log.txt`) — against the successor
brief `b-utilities-ue-brief-2.md`, the round-1 verdict `ue-audit-verdict.md` and its lane verdicts, and
round 1's record (`ue.diff`, `ue-shared.patch`, `b-utilities-ue-report.md`). The unit was written by
`opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line`
evidence, and before confirming a claim about a proof names the mutation that would make the proof fail
and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; where the verdict or the brief quotes a replacement sentence, that sentence is the fix; the
validation copy was deleted before the report, so a lane rules the gate and mutation claims from the
code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `ue-2-status.txt` lists round 1's owned paths and nothing else;
   `ue-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`; against round 1
   it changes only `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.test.ts`,
   `tests/setup.ts`, and `tests/setupStyles.ts`, at the E-a to E-c sites and the sweep sites the report
   lists; the owned files change only at the E-c sites.
2. **E-a: the small-shadow swap and the reader's controls.** `ue-mutations-2.log.txt` records the
   `.shadow-sm` alias swap reddening the boundary, retune, and priority cases the report names, and the
   cases' assertions distinguish it; `ue-cascade-keys-2.mjs` reports the planted `.shadow-xl` rule as an
   extra selector and the dropped `.opacity-25` priority as a mismatch, and reports neither over the
   built cascade.
3. **E-b: the resting row.** The `default-focus-ring` resting row is gone from `CASCADE_KEYS`; the
   `Default focus ring` subject stays for its driven row; the remarks record the decline beside the other
   declines without breaking the collapse paragraph's back-reference; the exemption the
   `tests/setup.test.ts` case requires names the subject, and the retained runs (the exemption removed,
   the row restored) redden that case; no other file enumerates the dropped row.
4. **E-c: the guide, the comments, and the copy.** The shadow sentence and the `shadow` compatibility
   row exclude the `.shadow-none` class; the root-element sentence is true of `src/styles/_tokens.scss`
   and the probe's readings (a subtree factor or step moves no shadow class; a subtree alias does; a root
   factor doubles the lengths); the opacity sentence carries the brief's text and the probe reads the
   `.opacity-25` step over the placeholder with and without its `!important` flag; the focus-ring clause
   and the `focus-ring.test.ts` comment credit the utility's `!important` flag; the sweep's edits to the
   `_shadow.scss` comment, the `SHADOW_CASES` remarks, and the `SHADOW_COPY.paragraph` value are true of
   what ships and stay within E-c's sweep.
5. **The annotated focus-ring case.** The report records that the focus-ring case the edited comment
   annotates stays green with the `.shadow-none` rule's `!important` flag dropped, because the later
   layer clears the ring on its own, and reddens with the helper written important. The comment is true
   of the release and of Veneer, the case proves the helper's normal priority, and the utility's own
   priority is proved in `shadow.test.ts`; or a lane names the case that must distinguish the utility's
   importance and does not.
6. **The round-1 confirmations.** The claims round 1 confirmed (scope, the cascade and the helper's
   priority, the specimen rename and the role layer, the Tailwind names) still hold on round 2's files.
7. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion, no
   `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; added comments, TSDoc, copy, and guide text follow the writing rule; the report records each
   gate's command as it ran with its result line; a lane lists every count the report states as a
   finding outside the claims for the record.
