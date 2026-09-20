# U6 audit round 7 — objective lane brief (the closing read)

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane of the closing round on
unit U6 of the Veneer campaign. Round 6 accepted the unit on substance
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-6.md`); a native
`builder` then made the prose pass in `u6-brief-9.md` (report `u6-report-9.md`).
Perform the assignment directly and spawn nothing. You edit nothing; you have no write tools.

## Objective

Rule with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or
exact text), against the live files in `C:/Users/mikes/WebstormProjects/test` and the cumulative
diff `u6-diff.patch.txt`:

1. The `stageMedia`/`releaseMedia` bullet in `guides/test.md` § Bounds is one re-flowed paragraph:
   every line but the last is within a few columns of the file's wrap and none ends a short
   fragment; its words are unchanged from round 6 except where claim 2 adds a sentence.
2. The `holdAccessible` bullet states that the missed-press-plus-release path cannot be driven
   from inert input against a conforming engine and is covered by review.
3. `releasePointer`'s `@remarks` refers to the aggregate described under `@throws` rather than
   repeating its clause; the `@throws` still states the shape the code builds.
4. The case `records the marker only after the press send resolves` carries a comment naming the
   opening protocol rejection as the control that keeps the recorder at one entry.
5. Nothing else moved since round 6: compare hunk sizes against
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-audit-6-reviewer-report.md`
   (claim 5 there cites them) and report any hunk outside the four items; the six owned files and
   nothing else.

Add extra findings no claim names, numbered from 6, each with a site and a one-line failure
scenario; a wording preference that changes no behaviour and breaks no rule is not a finding.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
