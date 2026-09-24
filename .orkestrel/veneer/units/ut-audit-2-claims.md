# Audit claims — UTIL-TEXT (`ut`), round 2

Subject: round 2's record — `ut-2.diff` and `ut-2-status.txt` (the worktree `/home/user/veneer-ut`
against `2a3f223`), the revised shared patch `ut-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `ut-shared.patch` whole), the report `b-utilities-ut-report-2.md`, and the round-2
records under `ut-instruments/` (`ut-mutations-2.log.txt`, `ut-mutate-3.py`, `ut-mutate-3-run.log.txt`,
`ut-mutate-3-run2.log.txt`, `ut-2-copy-gates.sh`, `ut-2-copy-*.log.txt`, `ut-2-cascade-count.log.txt`,
`ut-2-service-up2.log.txt`, `ut-2-shared-interdiff.txt`, the edit scripts `ut-2-shared-edit.py`,
`ut-2-guide-edit.py`, `ut-2-guide-reflow.py`, `ut-2-guide-reflow2.py`, and `ut-2-guide-row.py`) —
against the successor brief `b-utilities-ut-brief-2.md` (T-a to T-f), the round-1 verdict
`ut-audit-verdict.md` and its lane verdicts, round 1's record (`ut.diff`, `ut-shared.patch`,
`b-utilities-ut-report.md`), and the notes `w2-w3-note-1.md` to `w2-w3-note-5.md`. The unit was written
by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line`
evidence, and before confirming a claim about a proof names the mutation that would make the proof fail
and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the `tests/src/styles/utilities/color-bg.test.ts` proof is granted as the mirror of the new
partial the brief grants; the Orchestrator's apply check (`ut-shared-2.patch` on a fresh `2a3f223`
extract) settles the apply clause; the validation copy was deleted before the report, so a lane rules
the gate and mutation claims from the code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `ut-2-status.txt` lists round 1's owned paths plus
   `src/styles/utilities/_color-bg.scss` and `tests/src/styles/utilities/color-bg.test.ts` and nothing
   else; against round 1, the owned files change only at the T-a to T-f sites and the moved pair cases,
   and the shared patch only in `src/styles/index.scss`, `tests/conformance.test.ts`,
   `app/browser/constants.ts`, and `guides/veneer.md`.
2. **T-d: the pairs ahead of the colored links.** `_color-bg.scss` holds the `.text-bg-*` rules moved
   unchanged from `_color.scss`, in the utilities layer; the barrel loads `utilities/color-bg` before
   `utilities/link`; the order case maps the `color-bg` helper to `utilities/color-bg`; the release's
   `scss/_helpers.scss` loads the pairs before the colored links; the added case reads the colored
   link's color and the pair's kept fill on one element; the retained run with the two barrel lines
   swapped reddens that case and the order case, and each assertion distinguishes it.
3. **T-a: the components-layer control.** The retained control moves the pairs into the top-level
   components layer (the run records the layer it read), reddens the three cases the report names, and
   each of those cases' assertions distinguishes a pair in the components layer from one in the
   utilities layer.
4. **T-b: the guide sentences.** § Text utilities' opening, the `text` selector row, the text-opacity
   statement in the `text` variable row and § Color utilities, the prefixed-decoration sentence, the
   link rows, and the Tailwind paragraph read true against the partials, the proofs, and the built
   cascade; the `text` row without its class list still states what ships.
5. **T-c: the product sentences.** The `TEXT_SPECIMENS` remark's two-twelfths column is the column the
   markup renders, and the `text-truncation.test.ts` comment states the layer rule its case proves.
6. **T-e and T-f: the specimen and the copy.** The `Text roles` markup renders the dark role on the
   light pair and the light role on the dark pair; the added section check reads it; the retained run
   with a bare dark-role paragraph reddens that check; `COLOR_COPY` says the pairs set the foreground
   the release records.
7. **The moved cases.** Every pair case round 1 held in `color.test.ts` sits in `color-bg.test.ts`
   with its assertions unchanged, `color.test.ts` keeps its other cases, and the retained re-runs of the
   round-1 pair mutations redden the moved cases.
8. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, writes each
   gate's command with its result line, and follows every code token with its noun; the lane lists
   every count the report states, for the record.
