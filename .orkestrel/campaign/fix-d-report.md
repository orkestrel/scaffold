# FIX-D report — the empty-scripts refusal and the over-stated comment

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-d-brief.md`.

## Finding 1 — an empty region now takes its first entries

`replaceManifestScripts` refused a manifest whose `scripts` region is empty, contradicting
`src/core/types.ts:140`: "An absent script is always writable and needs no entry in `accepted`."
Both refusals are gone and the insertion path is in.

**Reachable through shipped code**, which the unit established rather than assumed:
`replaceManifestScripts` is called on manifest text read from a target's disk at
`src/server/Materializer.ts:1168` and `src/bin/CLI.ts:1125`. Neither generates that text, so a
workspace whose manifest carries `"scripts": {}` reaches it. No machinery was built for a
hypothetical.

**The indentation derivation, and why it holds.** The write replaces the region's interior and
derives indentation from the line the region's own opening brace sits on. Two properties decided it:
it composes — inserting one script into an empty region then appending another through the untouched
path lands the same bytes as inserting both together — and it needs no second source of truth, no
sniffing of the file's indentation elsewhere and no constant.

**Twelve shapes measured**, with negative controls drawn from outside the instrument's membership
rule: tab, two-space, four-space, unindented, one-line, split braces, blank line inside, interior
whitespace, and an outdented closing brace all write; no `scripts` key, `scripts` as an array, and a
`scripts` key nested under `workspaces` all refuse. Four are pinned as tests.

Recorded, not changed: on a CRLF manifest the inserted lines use bare `LF`, giving mixed endings
inside the region. The pre-existing append path does exactly the same, so the new path matches it
rather than diverging, and correcting it would mean editing the path this unit was told to leave
alone.

**Firing control.** Reverting the insertion branch reddened exactly the three tests naming the
defect and nothing else, with all 91 collected in both runs. Restored: 91 passed.

## Finding 2 — the comment now states what its assertion has

The comment claimed the `printing` assertion catches "an extractor that narrows over what a
declaration prints". It catches a declaration going **silent**; any nonzero remainder keeps the
name. The comment now says so, and names the driven-count floors that follow as what catches a
partial narrowing. Every assertion is byte-unchanged — the diff is `//` lines only.

## The deviation, and the Orchestrator's ruling on it

The unit reported criterion 9 unclosed: `npm run test:distribution -- --mode release` exited 1 on
`installs a preserved peer beside an exact co-peer witness and rejects the narrowed control`, with
`expected '\n' to contain 'ERESOLVE'` — the refused install exiting non-zero as required but writing
nothing to either stream. It checked the clean committed baseline and saw the same failure, and
offered one hypothesis about npm refusing the offline install before its peer resolver runs.

**Ruled: not a defect, and not the unit's.** Re-run alone by the Orchestrator after the unit exited,
the same test passes in 1837ms. `.agents/orchestration.md` § Writing concurrency fixes this exactly:
a re-running unit is not alone, because its own exec, code-mode host, and sandbox stay resident, so
the deciding re-run belongs to the Orchestrator after the unit exits. The unit was right to report
the reading and right not to diagnose it; a writer's own gate evidence is systematically pessimistic
on resource-sensitive proofs, which is why the independent `verifier` owns the authoritative run.
