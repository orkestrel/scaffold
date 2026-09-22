# CL11 audit claims — round 2, the fix round

The subject is the CL11 **fix round**, written by `sol` on Astra over the authored CL11 tree, in the
Veneer checkout at `C:/Users/mikes/WebstormProjects/veneer`. Its brief is
`.orkestrel/veneer/units/cl11-brief-2.md`, effective over `cl11-brief.md`; its measurements are
`cl11-fix-terrain.md`; its report is `cl11-report-2.md`.

**Round 1 accepted the shipped behaviour and is closed.** Both judgment lanes confirmed the registry
derivation, the journey's reach, both widths, the consumer page reading the installed archive, all four
carried findings, the rename and its consumer set, the duplicate-name refusals, the artifact retention,
and the scope. An independent verifier ran the whole chain green on both engines, recorded in
`units/cl11-gate.log.txt`. **Do not re-litigate a round-1 claim.** Rule only on what this round changed,
and on whether closing each finding left the accepted behaviour intact.

Every claim below is numbered once for the whole round. Every lane rules on this file and no other.

Rule each as **CONFIRMED**, **REFUTED**, or **UNPROVEN**, with the evidence that decides it.

**Before confirming any claim about a proof, name the mutation that would make that proof fail, and
say whether its assertions distinguish that mutation from the passing case.** Where you cannot name
such a mutation, the claim is UNPROVEN rather than CONFIRMED.

**Read a declaration, a path, or an installed contract out of the file's own bytes, never from a
transcription.**

Cite every site by its symbol; give a line number only as "currently around N".

## The frame guard, which is this round's centre

1. The capture-only case reads every accumulated absolute path from the portfolio and samples the
   written image, rather than inferring content from computed CSS. Verify it reads the portfolio's own
   returned paths and not a reconstructed string.
2. The sampler decodes the PNG and compares every pixel's channels against the first, so a uniform
   image reports zero variation. Verify it examines the whole image rather than a row or a corner, and
   name what it would miss.
3. The guard is proven against a **real** blank control: the case uses the bytes of a retained blank
   probe frame and a retained painted one, carried in the owned setup module so the control survives a
   scratch sweep. Verify those bytes are the real frames rather than synthesised ones.
4. **The decisive mutation.** The unit ran the audit's own offscreen-target mutation — placing the
   offscreen specimen instead of the lifted copy — and reports the property comparison staying green
   while the pixel assertion failed, naming the blank frame's path. Verify the assertions distinguish
   that mutation, which round 1's comparison could not see.
5. A second permanent case rejects undecodable bytes, so a reader that silently accepted a non-image
   would be caught.
6. The copy-against-specimen comparison remains, with its claim narrowed to each key's declared
   property. Rule on whether keeping it is right now that it is no longer presented as frame-fidelity
   protection, and note that it still runs after placement.
7. The unit states the guard's own limits: unrelated non-uniform paint, noise, partial content, or the
   wrong non-uniform image defeat it, and it does not prove visual equivalence between a lifted copy
   and its original. Rule on whether that is an honest and sufficient statement of what it proves.

## The dark twins

8. The container and row twins stay registered, and the cascade journey now reads the photographed
   copy's colour in each mode and asserts the values differ for each key. Their existing layout
   assertions remain.
9. Each key's paint assertion was proven separately: forcing the dark copy to inherit its light text
   colour reddens that key's assertion and no other. Verify the per-key isolation.

## The restore-refusal cleanup

10. The case's visit and assertions sit in a `try` and the restoration runs in `finally`, so an
    assertion rejecting no longer leaks the viewport.
11. **The leak itself was reproduced and closed.** The unit planted a wrong visited-width expectation
    and reports that before the fix the *following* case also failed, reading the visited width instead
    of its own, and after the fix the planted assertion still failed while the following case passed.
    Verify that isolation — it is what distinguishes a cleanup fix from a coincidence.

## The state assertion

12. The first-segment uniqueness assertion and its misleading comment are gone, while specimen
    uniqueness, selector uniqueness, and full-state-name uniqueness are all still enforced. A distinct
    specimen sharing a family prefix is admitted; a duplicate specimen, selector, or state name is
    still refused. No key or state was added or removed.

## The retention corrections

13. The unit withdrew three statements from round 1's record: the universal byte-identity claim, the
    file a changed case title sits in, and the claim that frame reading lacked a usable base path. It
    also corrected the false byte-identity and copy-fidelity claims **in the state table's own doc
    block**, where a reader meets them, while leaving the prior report's body unchanged. Rule on
    whether each correction is right and whether the doc block now states what the code does.

## Gates, scope, and honesty

14. The gate chain passes on Chromium and the requested projects pass on Edge, and the final capture
    run regenerated the portfolio after every mutation was removed, with no registered frame uniform.
15. **The distribution limit is stated honestly.** The unit's run exited 0 with its registry-gated
    cases skipped because the registry did not answer, and it says plainly that this provides no fresh
    installed-consumer reading and does not reopen round 1's accepted evidence. The Orchestrator took
    that reading separately; its result is in `units/cl11-gate-2.log.txt`. Rule on the unit's handling.
16. The status lists only files the round-1 brief owns, and the unit states that two of the seven
    listed files carry preserved round-1 work it did not edit this round. Verify that claim against the
    two diffs.
17. No receipt was issued for the unreachable instrument, and no test reading is represented as one.
18. Scope honesty: the report's account matches the diff and the tree, including its stated limits.

## Evidence

- The diff over the CL10 landing, carrying round 1 and the fix together:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff-2.patch`
- Round 1's diff, for isolating what this round changed:
  `.orkestrel/veneer/units/cl11-diff.patch.txt`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status-2.txt`
- The fix round's report: `.orkestrel/veneer/units/cl11-report-2.md`
- Its brief: `.orkestrel/veneer/units/cl11-brief-2.md`, over `units/cl11-brief.md`
- Its measurements: `.orkestrel/veneer/units/cl11-fix-terrain.md`
- Round 1's verdict, closed: `.orkestrel/veneer/cl11-audit-verdict.md`
- Round 1's gates: `.orkestrel/veneer/units/cl11-gate.log.txt`
- The checkout: `C:/Users/mikes/WebstormProjects/veneer`

**Both renderings are supplied on purpose.** The cumulative diff shows what CL11 ships; round 1's diff
is what isolates the fix round's own changes. A previous round's checker correctly refused a claim
because only the cumulative diff was rendered.
