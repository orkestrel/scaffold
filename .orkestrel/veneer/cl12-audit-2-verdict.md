# CL12 audit verdict — round 2, the fix round

Subject: CL12's fix round, written by `sol` on Astra over the authored CL12 tree from `eb1cd71`.
Claims: `cl12-audit-2-claims.md`. Report: `units/cl12-report-2.md`.

**Verdict: accept.** Both judgment lanes accept with every claim confirmed, and the independent gate
chain is green on all eight readings. Landed as Veneer `a04fb7c`.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `reviewer` on native Opus 5 | accept; every claim confirmed first-party, four non-forcing findings, one referral |
| Subjective | `analyst` on gpt-6-astra, journal `tmp/codex/cl12-audit-2-analyst.jsonl` | accept; every claim confirmed by rerunning instruments |
| Gates | `verifier` on the native cheap tier | green, `units/cl12-gate-2.log.txt` |

**The lanes swapped back**: Astra wrote this fix round, so the Opus reviewer held the objective lane
and Astra the subjective one. No checker ran — the diff is two prose paragraphs in one Markdown file,
and both judgment lanes verified every mechanical claim against the cascade directly. That deviation
is recorded here with this round's own reason, not a template sentence.

## What the round closed

Both corrections verified first-party by the Orchestrator and independently by both lanes.

**The container paragraph now matches the cascade in every clause.** The objective lane checked the
non-obvious case the sentence has to survive — a mid-width container at a wider viewport — and
confirmed the accumulating selector list makes the widest crossed boundary win at equal specificity.

**The fluid clause was measured rather than inherited.** This is the part worth recording. The
Orchestrator's terrain carried an audit lane's supplied sentence and flagged that its fluid clause was
unmeasured. The unit parsed the cascade (no cap rule selects the fluid container) **and** found the
existing container proof already asserts `max-width: none` and viewport-width at every boundary. The
objective lane named the mutation that would break it: add the fluid container to the accumulator, and
the proof reads `540px` against an assertion of `none`.

**The deferral justification moved from authorship to inventory membership**, which is both true and
the stronger reason — the pinned inventory carries neither deferred name, which is exactly why the
other table's reader would refuse them.

**Neither correction changed what any reader parses**, confirmed by a projection comparison with a
negative control, and independently by differencing the two patch renderings.

## The correction that must not propagate, now actionable

Round 1 recommended a completeness gate checking backticked names anywhere in the tokens section. That
gate cannot fail for its own target: the mark tokens appear in prose beside their rows, so deleting a
row leaves the span. The fix round strengthened the correction rather than restating it — naming the
read side, and naming the falsifier a successor must build.

**The subjective lane proved the control is the right one** by deleting a mark row in memory and
watching the backticked name survive in prose while the row vanished. That is the exact state the
successor's gate must reject.

## Non-forcing findings, carried

1. **The gate recommendation still leaves its authority side unnamed.** A gate reading only the
   guide's own name cells cannot detect a token that was never given a row at all. It needs comparison
   against the registered token set — which the report implies when it names four registered tokens
   absent from the guide entirely. Carried by the successor that builds the gate, together with the
   range and composite expansion rule.
2. **A seventh file parses this guide.** `tests/setupPolicy.ts` constructs the guide and reads its
   sections and surface, so it is a parser rather than only a prose sweep. Neither the brief's
   corrected six-file population nor the report named it. Inert here — no heading or surface row
   changed and the policy gate is green — but the next brief touching this guide names it.
3. **The replacement paragraph drops the plain container class from its account.** Every cap rule also
   names it, and the superseded sentence did. Nothing stated is false and the generalization yields the
   correct width, so this is a coverage regression rather than a defect.
4. **One report sentence is unevidenced and its timing contradicted.** The claim that the cascade was
   re-read after the gate chain has no artifact; modification order places the readings run between the
   build and test gates. The underlying fact holds — the Orchestrator read the current cascade, which
   the test gate rebuilt last, and it matches. Recorded because round 1 was pulled up for exactly this
   class: an account a successor cannot re-run.

## What the Orchestrator owned, and did

**The referral was correct and time-sensitive.** `gates.json` — the only retained artifact carrying the
whole-suite gate's native exit code — sat solely in the subject's `tmp/`, which is swept at acceptance.
Retained before this verdict was written.

**The executed gate runner is not preserved, and that is recorded rather than glossed.** The retained
runner writes a header carrying the guide's modification time and digest; every retained log carries a
bare start-time header instead, so the file in the tree is a later edit and not the instrument that
ran. The consequence is bounded: the report's digest-constancy sentence has no receipt, which is why
the objective lane ruled that sub-claim UNPROVEN while confirming freshness on independent evidence —
modification-time ordering places the guide's last write before every gate log, and the exit-code
record carries each gate's start and exit. `units/cl12-instruments-2/RETENTION-NOTE.md` states it.

**The rule that earns:** retain the executed runner in the same action that retains its output. A
script writing its own provenance header is evidence only while the version that wrote those headers
exists; a later edit silently converts it into a file that merely resembles the instrument.

## Carriers

Non-forcing findings 1 and 2 are carried by the successor that builds the completeness gate and by the
next brief touching this guide. Findings 3 and 4 are recorded and carried by no unit: neither changes
what the tree does, and assigning them to a unit that cannot reach them is how a carrier goes stale.
