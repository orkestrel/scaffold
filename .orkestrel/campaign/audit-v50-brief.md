# Audit v50: peer ownership and scoped preconditions

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform this audit directly and spawn
nothing. The implementation was written by a Sol implementer under a different brief and
merged by the Orchestrator; you wrote none of it and you rule on all of it. Read-only
`git diff` and `git status` are yours; never a mutating git command.

## Subject and evidence

The committed release at `HEAD` (`d67ad0f`), version 0.0.50, tree clean. The change is
`git diff a37d610..HEAD`, which is the implementation commit plus the merge that reconciled
a concurrent session's release ritual. The rulings are
`.orkestrel/campaign/design-v50-reconciliation.md`; the two blind design reports beside it
are `design-v50-subjective-report.md` and `design-v50-objective-report.md`.

Recorded host runs, all green: `src:core` 326, `src:server` 403 passed with 5 skipped,
`src:bin` 189, `policy` 93, `config` 43, `guides` 14, and `test:distribution --mode release`
5 passed. The distribution gate performs real npm installs.

## Claims, each falsifiable

1. **No writing path can alter a peer.** Trace every route from a verb to a manifest write
   and show that none reaches `peerDependencies` or `peerDependenciesMeta`: the derivation
   helper, the range writers, `declare`, and any path the CLI takes for `new`, `audit`,
   `repair`, `catalog`, and `overwrite`. Name any route that still can, including one reached
   only by a library caller rather than the CLI.
2. **A blueprint peer still writes exactly once, at creation.** A vacant target receives a
   caller-supplied `Blueprint.peers` row verbatim, and no later verb inserts, rewrites, or
   removes one. Verify both halves.
3. **The section survives derivation.** The defect was that the declaration section was
   erased before a name-keyed rewrite. Verify the section is now carried end to end, and that
   no remaining code path reconstructs a rewrite by name alone.
4. **The reversed tests now pin the correct behaviour.** The rows that previously required
   peer rewriting assert the opposite, and each would fail if peer preservation regressed —
   not merely pass under both behaviours. Rule on whether each is a real discriminator.
5. **The distribution proof discriminates.** The co-peer witness pins an exact version, the
   preserved-peer case genuinely resolves, and the narrowed control genuinely produces
   `ERESOLVE` rather than passing for an unrelated reason. Confirm the control would fail if
   the peer preservation regressed, and say whether a consumer shape exists that this proof
   would still miss.
6. **A precondition blocks only what it scopes.** A selection excluding a question's groups
   proceeds; a selection including one still refuses atomically before any write; `audit`
   reports a question only when its selection covers it and the question stays non-blocking.
   Verify per verb, and name any target question that still applies to the whole run.
7. **The held-back refusal stayed held back.** `overwrite`'s dirty-tree refusal is unchanged
   and still whole-run.
8. **The merge reconciled rather than replaced.** The generated manifest fixture carries the
   bumped scaffold pin beside the probe and test releases on the registry, the bin fixture
   keeps derived packument seeds, and the byte-stability digest matches the merged tree.
   Recompute the digest yourself and say whether the committed value is right.
9. **The guide claims no more than the code does.** The peer-ownership rule, the scoped
   questions, and the resolver coverage are stated truthfully, and the earlier false claim
   that peers pass through unchanged is now true rather than merely reworded.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence, then
findings outside the claims in their own section. Write the final answer as the last message.
End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
