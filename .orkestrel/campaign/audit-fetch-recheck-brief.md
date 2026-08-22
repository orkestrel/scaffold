# Audit fetch-recheck: the fix round

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform this audit directly and spawn
nothing. Scoped round: it re-checks the fix round only, plus one regression question.
The design-fit lane's findings were adopted as prescribed except two recorded
departures named below, so this round does not re-open shape and naming taste.

## Subject and evidence

Commit `08bb37d` against its parent — `git show 08bb37d` and
`git diff 08bb37d~1..08bb37d`. The tree is clean at `HEAD`. The rulings are
`.orkestrel/campaign/audit-fetch-reconciliation.md`; the fix unit's own report is
`unit-fetch-fix1-report.md`. The suites spawn loopback servers your sandbox denies —
rule on row logic and name those runs host-owned; the report carries their totals.

## Claims, each falsifiable

1. **The integrity hole is closed at every entrance.** A vendored body's digest is
   computed over the bytes the response carried, before any decoding, and compared
   against the inventory's declaration; no path on the vendored surface decodes to
   text and re-encodes. Construct the byte-order-mark vector yourself against the
   landed source, and then look for a **second** entrance the fix missed: any other
   normalization between the socket and the digest — a different decoder, a stream
   transform, a trailing-newline habit, a case fold on a path, a `JSON.parse` round
   trip on the inventory itself.
2. **The comparison that skips a fetch is exact too.** The caller's own bytes decide
   whether a path is fetched at all. That comparison is over bytes rather than
   decoded text, so a target holding a mark-prefixed file is not silently treated as
   aligned with a declaration for the stripped form, and the reverse.
3. **Text endpoints kept their decoding.** Guide mirrors and the registry still decode
   as text, and nothing that must be text now arrives as hexadecimal or vice versa.
4. **The staged digest describes what was published.** Each entry's digest is derived
   from the staged destination after the copy, so a source that changes mid-run cannot
   leave a manifest describing bytes that were never staged. Verify from source, not
   from the row that pins it.
5. **The renames are complete and reversible-free.** `HostFile`, `Worktree`,
   `isWorktree`, `files`, `filesToHost`, and the `file` event have no surviving
   counterpart under the old spellings anywhere the old ones reached, including prose
   and TSDoc; no consumer was missed; and no rename changed a behaviour while
   changing a name.
6. **The two recorded departures are sound.** The reader's method is `files` rather
   than the design-fit lane's `read`, because that class holds a private `#read` doing
   something else; and the prose keeps `baseline` rather than `source tier`, because
   the type is `Baseline`. Rule on whether each departure is better than the
   prescription it replaced, or worse.
7. **The corrected documentation is now true.** The absence sentence, the request-count
   statement with retries, the one-baseline-per-surface wording, the quiescent-checkout
   assumption, and the `provenance.guides` aggregation rule each match the landed
   implementation. The fix unit read the aggregation as `floor` when any selected
   mirror failed, `live` only when every selected mirror resolved live, and the field
   omitted when none was selected — verify that reading rather than trusting it.
8. **No regression.** Nothing the fix round changed disturbed a claim the prior round
   confirmed: containment, the authoritative-absence discrimination, the exit rule,
   the bounded guide fallback, or the executable bit.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence,
then findings outside the claims in their own section. Write the final answer as the
last message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
