# A6-fix review — Opus lane on the clean-end drain (writer was Sol)

## Role and engine

`reviewer`, engine **Opus 5**, native, high effort, read-only. You audit; you never edit,
reconcile, or accept. Your verdicts advise the Orchestrator.

## Subject

Commit `6f9423f` in `/workspace/supervisor` (range `bdb5d7c..6f9423f`, 3 files, +45/−13).
The fix for the prior audit's refuted claims: the clean-end path drained an in-flight read
so the reporting inspect starts after the stream's end. The full diff and status evidence
is embedded at `/home/user/scaffold/tmp/alignment/a6-fix-evidence.md` — read it first; you
have no shell, so that file is your diff. Read the touched files directly for surrounding
context: `app/browser/controllers/Operator.ts` (the clean-end tail at ~:492-498, `refresh`
at ~:316-329, `#reinspect` at ~:441-459, `#invalidate` at ~~:578), `guides/src/supervisor.md`
(~~:1945-1975), `tests/app/browser/controllers/Operator.test.ts` (the new proof at ~:818-841
and the released-subscription negative after it).

Gate evidence (Orchestrator-run, for your context, not yours to re-prove): Operator scoped
70/70; app:browser 453/453; integration 15/15; guides parity 374/374; `npm run check` green;
scoped oxfmt/oxlint clean. Red recorded in the writer's journal: the new test failed with
two inspects where three were required before the drain landed.

## Prior context

Sol's audit of bdb5d7c refuted: (1) a component refresh begun before closure spans the
close, the clean-end `refresh()` joins that pre-close read, and the post-close inspect never
runs; (7) the guide promised the inspect the code did not guarantee. `#reinspect` absorbs
every client error into state (Result-style client), so `#reading` never rejects — verified
by the Orchestrator before dispatch.

## Claims to rule on (verdict each, with file:line evidence)

1. The drain closes the audited window: under the landed code there is no interleaving of
   (in-flight read begun pre-close, clean stream end) that leaves the operator holding a
   pre-terminal snapshot with no further read guaranteed.
2. The negatives cannot regress: an aborted end or a stale-generation end still never
   refreshes, including when a read is in flight at that moment — the re-check between the
   drain and the refresh is sufficient and correctly ordered.
3. The new test binds to the defect it claims: it drives the exact audited interleaving
   through public API only (stall a pre-terminal inspect, end the stream, release), and its
   red/green delta is the drain and nothing else.
4. The two guide paragraphs read true against the landed code, keep the guide's voice, and
   the join law plus its exception cannot be read as contradicting each other.
5. The diff stays inside the three owned files, changes no public API, and introduces no
   prohibited construct.

## Subjective lane (your charter)

Beyond the claims: does the drain read as the design's intent — the end as the one trigger
that must not join — or as a patch bolted onto the tail? Is the comment/prose voice at the
clean-end site and in the guide paragraphs coherent with the file's existing voice? Name
anything that should be re-voiced, as report-only findings with proposed exact wording.

## Execution

Perform the review directly and spawn nothing. Read-only: `Read`, `Grep`, `Glob` only.

## Output

Numbered verdicts 1-5, each `CONFIRMED` or `REFUTED` with `file:line` evidence and one line
of reasoning; subjective findings as `S<n>` with exact proposed wording where applicable;
then exactly one terminal line: `REVIEW: PASS` or `REVIEW: FAIL <claim numbers>`. No
process diary.
