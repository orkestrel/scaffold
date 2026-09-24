# Audit claims — UTIL-PAINT (`up`), round 2

Subject: round 2's record — `up-2.diff` and `up-2-status.txt` (the worktree `/home/user/veneer-up`
against `2a3f223`), the revised shared patch `up-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `up-shared.patch` whole), the revised profiles patch `up-unscoped-profiles-2.patch`
(applied after it, superseding `up-unscoped-profiles.patch`), the report `b-utilities-up-report-2.md`,
and the round-2 instruments and logs under `up-instruments/` (`up-mutations-2.log.txt`,
`up-mutations-2-summary.log.txt`, `up-instrument-mutate-2.py`, `up-instrument-count-cascade-2.mjs`,
`up-cascade-count-2.log.txt`, `up-instrument-probe-contrast.test.ts`, `up-probe-contrast.log.txt`,
`up-probe-contrast-rows.txt`, `up-2-gates.sh`, `up-2-gates.log.txt`, `up-2-interdiff.txt`,
`up-2-apply-check.log.txt`) — against the successor brief `b-utilities-up-brief-2.md`, the round-1
verdict `up-audit-verdict.md` and its lane verdicts, round 1's record (`up.diff`, `up-shared.patch`,
`up-unscoped-profiles.patch`, `b-utilities-up-report.md`), and the mid-campaign notes
`w2-w3-note-1.md` to `w2-w3-note-5.md`. The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; `app/browser/helpers.ts`, its proof, and the barrel entry are granted by the round-2 brief;
the Orchestrator's apply check (`up-shared-2.patch` on a fresh `2a3f223` extract, then
`up-unscoped-profiles-2.patch` after it, each exit 0) settles the apply clauses; the validation copy was
deleted before the report, so a lane rules the gate and mutation claims from the code's assertions and
the retained logs, and names which it read.

1. **Scope and delta.** `up-2-status.txt` lists round 1's owned paths plus `app/browser/helpers.ts` and
   `tests/app/browser/helpers.test.ts` and nothing else; against round 1, the shared patch changes only
   at the P-a to P-e sites (`app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`,
   `tests/app/browser/index.test.ts`, and comments in `tests/setupStyles.test.ts` and
   `tests/setupStyles.ts`), the profiles patch only in `tests/service/tailwind/profiles.test.ts`, and the
   owned files only at the P-c, P-d, and P-e sites.
2. **P-a: the whole orders.** For every profile, `profiles.test.ts` asserts `new SheetReader(compiled)`
   reads the order `['properties', ...ORDER]` and the document reads `[...ORDER, 'properties']`, keeps
   the scoped theme-variable reading and the generated-properties exception, and no comment claims an
   order line no assertion reads; the retained run with `@layer vendor;` written ahead of the order
   line reddens the order case, and its assertion distinguishes that mutation; the patched cases pass
   over the union of the wave's shared names (the `text-black` and `text-white` names from UTIL-TEXT
   included), so a lane rules whether the preflight case's expected theme variables hold once UTIL-TEXT
   lands beside it.
3. **P-b: the wording.** The guide describes the boundary compositions and the factor subjects the
   proofs mount; the guide carries "writes the `1` value into that local" and "the `2` factor doubles";
   the table comments write "the `rgba()` function" and "a bare `var()` function"; the
   `BACKGROUND_SPECIMENS` remark says "names the classes the swatch carries"; no added line leaves a code
   token without its noun, counts a growable set, or names a list item by its position.
4. **P-c: the swatch helper.** `app/browser/helpers.ts` exports one pure function that takes the
   swatches' class strings and returns the grid markup; both specimen lists build through it; it is
   exported through `app/browser/index.ts` and listed in `index.test.ts`; `helpers.test.ts` proves the
   grid, a figure per swatch, the caption equal to the swatch's classes, and an empty list; the retained
   red run with the caption drawn from a different string reddens the cases the report names, and
   their assertions distinguish it; the helper follows the naming, placement, TSDoc, and no-nested-
   function rules.
5. **P-d: the swatches that match the page.** Every fill swatch whose contrast with the canvas falls
   under the report's threshold in either mode carries a border, and every border-colour swatch under
   it carries a fill, as `up-probe-contrast-rows.txt` measures; the exemptions the report names are
   justified; the section proofs' added cases read the rule in light and dark, and the retained runs
   removing a border or fill from the white or black swatches redden them, with assertions that
   distinguish the removal.
6. **P-e: the re-run and the count control.** Every round-1 mutation re-ran against the shipped round-2
   proofs, and `up-mutations-2.log.txt` cites the shipped case lines each reddens; the report's reading
   that `literal-role-fill` no longer reddens the aliased-roles case, and why, is true of the shipped
   proof; `up-instrument-count-cascade-2.mjs` checks every paint rule's layer and exits non-zero on a
   fault, and its retained runs over a copy with `.rounded-pill` dropped and a copy with `.bg-gradient`
   moved into the components layer read red.
7. **The round-1 confirmations.** The claims round 1 confirmed (the cascade against the oracle, the
   Tailwind shared names, the registries) still hold on round 2's files.
8. **Law and report.** The owned files and both patches add no `any`, no `as` beyond a const
   assertion, no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback
   passed directly; the report follows the writing rule and records each gate's command as it ran with
   its result line; a lane lists every count the report states as a finding outside the claims for the
   record.
