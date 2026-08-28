# Audit verdict — the execution consolidation

Round 1. Every lane ran blind to the others on a clean context, each given the full diff and the
status output.

**Every lane ran.** Round 1 dispatched three lanes: subjective (`reviewer`, Opus 5), objective
(`reviewer`, Opus 5), and mechanical conformance (`checker`). The mechanical lane started later than
the other two, so an interim reading of the workflow journal recorded it as not started; that
reading was wrong and is corrected here. All three returned.

The mechanical lane returned PASS. It confirmed independently that every declaration in
`src/server/helpers.ts` is exported and that the file imports no implementation class, that the
post-change test-file set is the 9-file baseline minus exactly the four deleted files, that the
published surface changed in exactly the two ways claimed, that the guide's names resolve, and that
no file names a path that no longer exists. It recorded the dirty `package-lock.json` as
pre-authorized by the shared context rather than as unscoped drift.

The Orchestrator had already run that lane's checks itself while it was believed missing, with no
writer in the tree, and reached the same result on every one.

**Engine independence.** The Sol bench is dark this session, so Opus 5 ran both judgment lanes and
also wrote the implementation. The round therefore has clean contexts and adversarial framing but
no engine independence from the writer. Recorded as a limitation of this round.

## Terminal

Both lanes returned FAIL. Reconciled below.

## Sustained findings

**Claim 1 BROKEN — a regression the change introduced.** `trimHead` retreats whenever the byte at
the cut is a continuation byte, without checking whether a sequence genuinely spans the cut. Before
this change `execute` never reached that retreat, because its capture stopped at exactly `limit`
and `trimHead` early-returned. Giving the trim its lookahead byte exposed the flaw.

Confirmed by running both artifacts on the auditor's own vector — a child writing `61 61 61 61 80`,
captured at `limit: 4`:

```
published 0.0.8  stdout="aaaa" bytes=4
landed change    stdout="aaa"  bytes=3
```

A valid ASCII byte is dropped because the excluded byte looked like a continuation byte. This is
this change's defect, not a pre-existing one, so it is repaired now rather than recorded.

**Claim 9 BROKEN — the guide overstates one mechanism.** `guides/process.md:919` says "Each capture
reads one byte past that bound" inside a section governing both run functions. `executeSync` does
not do that; it hands `limit` to `spawnSync` as `maxBuffer` and the host decides how much it
delivers. The sentence is inaccurate as written.

**Should-fix — the guide files `captureChunk` under a retired concept.** `### Retention helpers`
names the class this change deleted, while every sentence the change wrote about that function uses
`capture`. One concept, one term.

**Should-fix — `trimHead` has no test for invalid UTF-8 at the cut.** That gap is what let the
claim-1 regression ship. The existing rows exercise only a valid four-byte sequence, where the
retreat is bounded by the sequence itself.

**Note — `captureChunk` aliases or copies depending on size** and neither the TSDoc nor the guide
says so, while a test pins the aliasing as guaranteed.

## Findings dropped, on evidence

**Both lanes claimed `executeSync` still delivers a split multibyte sequence.** Refuted by
measurement. Driving the landed artifact over `aa€bb€` at every limit from 1 to 11, `executeSync`
never returned a replacement character and its output matched `execute` exactly at every limit.
`spawnSync` delivers more than `maxBuffer` before reporting `ENOBUFS`, so `trimHead` already had
its lookahead byte on that path. The defect was only ever in `execute`, which bounded its own
capture at exactly `limit`.

The objective lane recorded that it held no execution tool and that its counterexamples were
derivations naming inputs a verifier could run. That is the correct way to report an unrun claim,
and running them is what separated the true finding from the false one.

**Note — the dead `FUNCTION_DOMAIN_FOLDERS` entry.** `tests/setupPolicy.ts:191-194` registers
`src/server/execution`, a folder this change deletes. The file is scaffold-vendored, `repair`
restores any edit, and the architecture rule states there is no workspace-local registration path.
It is not this repository's to close and needs a carrier in `@orkestrel/scaffold`. Recorded for that
change rather than reopened here.

## Ruling

FAIL. A fix round follows, carrying the two BROKEN claims, the two should-fix findings, and the
`captureChunk` note. Every retained finding names its carrier in the fix brief.
