# Unit D1b — successor to D1: harmonize three sentences D1's edits left stale

Role: `builder`. Engine: native cheap tier. Sole writer in `/home/user/scaffold` from the
committed baseline `8566281`. Perform the assignment directly and spawn nothing.

Successor record: D1 (brief `d1-canon-brief.md`) landed all 28 edits and reported three
integration observations — sentences its prescriptions did not cover that now read stale
against the landed contract. This brief carries exactly those three; nothing else changed.

## The edits

1. **`.claude/agents/codex.md`** — two clauses still assume the bridge is handed a
   finished exec, which D1's edit 18 moved to the Orchestrator.
   - Replace "When the Orchestrator hands back a finished exec, read Sol's answer from
     the `--output-last-message` file rather than stdout, and record the session id
     (`thread_id` in the journal's opening events) in every report." with "The
     Orchestrator reads Sol's answer from the `--output-last-message` file rather than
     stdout, and records the session id (`thread_id` in the journal's opening events)
     beside the result; a follow-up on a finished exec is a fresh dispatch." (Match the
     surrounding sentence's exact current text if the parenthetical differs; the
     replacement keeps it.)
   - Replace "When the Orchestrator hands the finished exec back, verify the result with
     direct evidence (git status, diff, scoped validation) and report once, completely:
     touched files, diffstat, scoped validation, and deviation state, for independent
     integration and review." with "The Orchestrator verifies the finished exec with
     direct evidence — git status, the diff, scoped validation — and carries touched
     files, diffstat, and deviation state into integration and review."
2. **`.claude/agents/reviewer.md`** — frontmatter description still promises the
   every-build three-lane cadence. Replace "Reads the actual diff after any non-trivial
   build, alongside the Sol correctness audit and mechanical checker." with "Reads the
   actual diff when the round's triggers name this lane." Keep the rest of the
   description unchanged.
3. **`.agents/orchestration.md`** — step 5's retained bullets lost their antecedent.
   - In the bullet "State the audit's subject as numbered falsifiable claims and require
     per-claim verdicts with evidence, per the Falsification law in
     `.claude/rules/quality.md` and the value set the dispatch-named skill fixes.",
     replace the closing phrase "and the value set the dispatch-named skill fixes" with
     "and the `orkestrel-falsify` value set, unless the dispatch names a different skill
     that fixes another".
   - Replace the bullet "Reconcile their evidence. Drop, on the record, any finding
     neither engine can substantiate." with "Reconcile the lanes that ran. Drop, on the
     record, any finding no lane can substantiate."

## Scope

Owned: the three files above. Off-limits: everything else, including `.orkestrel/**` and
`tmp/**`. No commits, no installs, no gates beyond the validation below.

## Deviation contract

A target sentence that does not match stops the unit with expected/found. Placement is
fixed by the existing sentences; no placement decisions exist in this unit.

## Validation

`npx oxfmt --config .oxfmtrc.json --check` on the three owned files; report the result.

## Output

The exact diff of the three files and the validation result. Nothing else.
