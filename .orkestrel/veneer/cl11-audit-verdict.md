# CL11 audit verdict — round 1

Subject: unit CL11, journeys and captures, written by `opus` on native Opus 5 from the CL10 landing
`0e0b055`. Claims: `cl11-audit-claims.md`. Report: `units/cl11-report.md`.

**Verdict: fix round.** Forced by claims 8, 9, and 27 and by the objective lane's finding 29. Nothing
forcing reaches the shipped package: every defect is in the proof layer this unit wrote.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `analyst` on gpt-6-astra, journal `tmp/codex/cl11-audit-analyst.jsonl` | fix round, on claims 8, 9, 27 and its finding 29 |
| Subjective | `reviewer` on native Opus 5 | accept, with four non-forcing findings |
| Mechanical | `checker` on the native cheap tier | rulings on its subset; one refutation, one part-refutation |
| Gates | `verifier` on the native cheap tier | pending, taken after the read-only lanes |

**The lanes swapped because Opus 5 wrote the unit**: Astra held the objective lane and the Opus
reviewer the subjective one. Every required lane ran. The verifier was held until both judgment lanes
exited, so no build rewrote artifacts a lane was reading.

## The lanes agreed on every fact and differed only on judgment

There is no citation to check between them. Both refuted claims 8, 9, 11, 25, 26, and 27, on the same
evidence, and both read the installed sources rather than the unit's report. They differ on whether
those refutations force a round.

**The Orchestrator sides with the objective lane.** The subjective lane's reasons for non-forcing were
that the dark twins "are distinct today" and that "no obligation required the guard". Both are true and
neither is a reason to ship a proof that cannot fail — the defect class this campaign has paid for at
CL8's audit, at CL9's two rounds, and at CL10's control that exercised ASCII alone. A guard left
unbuilt because nothing forced it is how the hole stays open.

## The forcing findings

They are facets of one thing: **the capture layer has no assertion that a frame shows what it claims**,
and the unit shipped a comparison it believed provides one.

**Claim 8 — the copy-against-specimen comparison does not establish frame fidelity.** It compares one
declared property per key, so a copy differing in anything else photographs unchallenged, and it cannot
see the failure the lift exists for at all: a blank frame resolves the same computed value as a painted
one. The objective lane named the mutation — change the capture target from the lifted copy back to the
offscreen specimen, and the readings are unchanged while the blank-frame condition returns. The
comparison also runs after every placement call, so in a capture run the frames are already on disk.

**Claim 27 — the recorded reason for shipping no guard is false, and the guard is reachable today.**
Both lanes read the installed source independently and agree: the portfolio's place method returns the
written absolute path, the portfolio accumulates those paths, and the installed frame reader documents
that exact path as its input. The unit passed the relative directory string, which that reader's own
doc block names as the wrong input. So an irreducible gap was recorded on a mis-read of an installed
contract, and a successor reading the record would spend its round chasing a base path that does not
exist. The objective lane adds the constraint that matters: reading dimensions and a bottom row does
not establish non-blank content, so the assertion must sample and must be proven against a blank
control.

**Claim 9 — two registered dark twins rest on paint nothing reads.** The cascade case asserts the table's
border colour and the link's colour differ between modes, which is what earns those keys their dark
twins. For the container and the row it asserts the opposite — that the layout reading is identical in
both modes — so nothing in the suite would catch a dark twin identical to its light frame. The twins are
distinct today, and that distinctness rests on a paint no assertion reads.

**Finding 29 — the restore-refusal case leaks the viewport it exists to prove is restored.** Verified
first-party. The case drives a refused restore, leaving the viewport at the visited width, then asserts
the rejection shape, the recorded sizes, and the width, and only afterwards puts the viewport back. Any
of those assertions rejecting skips the restore, and every following case in the file runs at the
visited width. The case proving the visitor restores on failure does not restore on its own failure.

## Refuted without forcing

**Claim 11 — the unclassed-twin description is wrong for two keys.** The row and the table are read
beside genuinely unclassed twins of their own tag. The container is read beside a fluid container and
the link beside a danger link, both class-bearing. Every key's reading can still fail: the container
through its capped reading having to match a pixel pattern below the page width, and the link through
its binding to the theme layer's own channel triplet. No code is owed.

The Orchestrator adds a bound the lanes did not: the fluid reading asserts `none`, which is what any
unclassed div reads, and the shipped rule declares no maximum inline size at all. That assertion
therefore cannot fail for any change to the fluid container. It works as a control on the capped
container's cap and proves nothing about the fluid rule itself.

**Claims 25 and 26 — two measurements in the report are false.** Verified first-party: the two frames
the report calls byte-identical differ in size, in digest, and in pixel height, and neither carries the
digest the report states. The ruling that measurement was cited for survives — both frames do show the
same resting page — but the measurement does not. The report also places a changed case title in the
Button-family proof; it is in the browser setup proof. Both are record defects, corrected at retention
rather than by a round.

**Claim 5 — the rejection ruling is UNPROVEN rather than wrong.** The registered frames show distinct
subjects. The rejected alternatives carry no retained comparison establishing duplication, and the
specimens the objective lane names have different labels and markup. The omissions are not defects;
the duplication measurement offered for them is unsupported.

## Carried, not forcing

1. **The cascade state assertion forbids a legitimate second key in a family.** It enforces uniqueness
   of the first name segment, so a future second container or row key collides though it is a different
   specimen. Per-key uniqueness is already enforced correctly one case earlier. Carried into the fix
   round, because it sits in a file that round opens.
2. **"Specimen" names two concepts on one module's public surface** — the fixture registry that records
   ad-hoc mounted nodes, and the showcase's declared labelled specimens. CL11 did not create the
   collision; it added the export that makes it visible, and chose the sense the application already
   fixes. Closing it renames call sites across files this unit does not own, so it is **not** this fix
   round's. Carried by the unit that next owns the browser setup module, named at that unit's dispatch.
3. **The Button-family duplicate frame.** Registering rather than striking was the right call: it is a
   Button-family row, striking it would remove placements the Button journey makes, and this unit does
   not own that subject. Carried into CL13's portfolio assessment, which owns the portfolio record.

## Gate evidence

Pending. The independent verifier runs after this verdict, and the fix round's own chain follows it.

## Carriers

Every forcing finding is carried by **CL11's fix round**, named as the unit, which routes to Astra
because Opus 5 wrote round 1. Carried item 1 goes to that same round. Carried item 2 goes to the next
unit owning the browser setup module, and carried item 3 to CL13.
