# CL10 audit claims — round 2, the fix round

The subject is the CL10 **fix round**, written by `sol` on Astra over the authored CL10 tree, in the
Veneer checkout at `C:/Users/mikes/WebstormProjects/veneer`. Its brief is
`.orkestrel/veneer/units/cl10-brief-2.md`, effective over `cl10-brief.md`; its measurements are in
`cl10-fix-terrain.md`; its report is `cl10-report-2.md`.

**Round 1 accepted the shipped cascade and is closed.** Both judgment lanes agreed the three helper
keys ship whole with nothing extra and nothing deferred, and the round-1 verdict
`cl10-audit-verdict.md` records that. **Do not re-litigate any round-1 claim.** Rule only on what this
round changed, and on whether closing each finding left the accepted behaviour intact.

Every claim below is numbered once for the whole round. Every lane rules on this file and no other.

Rule each as **CONFIRMED**, **REFUTED**, or **UNPROVEN**, with the evidence that decides it.

**Before confirming any claim about a proof, name the mutation that would make that proof fail, and
say whether its assertions distinguish that mutation from the passing case.** Where you cannot name
such a mutation, the claim is UNPROVEN rather than CONFIRMED.

**Read a regular expression out of the file's own bytes, never from a transcription.** The
Orchestrator hand-copied this round's boundary expression into a probe, the backslash escaping came
out different, and the probe reported a regression that does not exist. Load the line from the file
and test that.

Cite every site by its symbol — the case title, the export name, the selector — and give a line
number only as "currently around N".

## The boundary

1. The admission expression in `collectGridVocabulary` refuses every CSS identifier continuation
   after a prefix word: an ASCII word character, a character at or above U+0080 through the astral
   range, and a backslash escape. It still admits the family separator, the end of the selector, and
   a genuine non-identifier character.
2. The fix is shared across every prefix the expression names, not special-cased to the three helper
   keys, so the earlier grid, gutter, and table prefixes are fixed too.
3. `caption-top` keeps an exact-name restriction — it admits the bare name and a punctuation
   boundary, and refuses a longer hyphenated name. Verify that the restructure preserved this rather
   than acquiring or losing it by accident.
4. The fix changes nothing about which selectors the **built cascade** contributes to the comparison.
   The unit reports an instrument returning 421 admitted and no differences between the old and new
   expressions over the real cascade. Verify that reading, and verify the instrument compares what it
   claims.
5. The extended control case distinguishes the mutation of restoring the ASCII-only boundary, and it
   covers the refusal classes the terrain record names as well as the admitted punctuation forms.

## The extracted reader

6. `readParentOffset` is exported from `tests/setupBrowser.ts` with a doc block, and the icon-shift
   case calls it instead of assigning a function inside its body. No function assignment remains in
   that case's body.
7. `tests/setupBrowser.ts` changed **only** for that export, and `tests/setupBrowser.test.ts` only for
   its proof and the export-list assertion. A later unit owns that module's other findings, so any
   other edit there is out of scope.
8. The reader's own proof is falsifiable: the unit reports it reddening when the parent subtraction
   becomes an addition. Verify that, and verify the proof reads an SVG child rather than only an
   HTML one, since the SVG case is why the reader exists.
9. The reader's placement is correct for this tree: the browser setup module owns DOM readers, and no
   installed export from the Test package already does this job. A setup-module export whose name or
   job matches an installed export is a defect whichever file declared it first.

## The carried edits

10. The ratio loop destructures its aspect pair in the loop header and no longer depends on the Sass
    list module, and **the emitted cascade is byte-identical**. The unit reports the same digest for
    the styles cascade at three readings, and the same for its right-to-left twin.
11. The icon-class selector comparison sorts both its actual and expected lists, so reordering two
    selectors inside the hover rule no longer reddens it. Verify it still rejects an added or removed
    selector mentioning that class.
12. The icon-link compatibility row changed only its Notes cell, naming both value substitutions, and
    **no row's granularity changed**. The per-key versus per-family question belongs to another unit.
13. The ratio size case is synchronous and no longer awaits a resolved promise, and it still reads
    what it read before.
14. The icon-link markup constant moved into alphabetical position in the export-list literal, and the
    export-list assertion still passes because both sides sort.

## The CL9 carry

15. The freeze assertion was narrowed correctly: container assertions remain for every table, and
    entry assertions cover only the object-bearing tables. Nothing it proved for those tables was
    weakened.
16. Narrowing it did not disturb the sibling proof that consumes those tables. The unit reports
    searching `tests/**/*.ts` for the named constants and finding the setup proof and the table proof,
    with no table value changed.
17. The normalizer regression case supplies its own typed compatibility row and still drives the real
    presence scanner, including its negative control, so unrelated guide state can no longer redden
    it.
18. The even-child equivalence is unchanged, as the terrain record ruled. Confirm it was left alone
    rather than altered.

## Gates, scope, and honesty

19. The gate chain passes on managed Chromium and the required projects pass on Edge. The unit hit
    PowerShell converting npm's stderr notices into error records and re-ran through a saved runner
    capturing the native exit code. Rule on whether its final readings are trustworthy, and note that
    an independent verifier takes the authoritative run.
20. The status lists only files the two effective briefs own. Nothing off-limits was touched:
    `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`,
    `src/styles/_tokens.scss`, `src/core/constants.ts`, `.oxlintrc.json`, and every path
    `scaffold repair` restores.
21. No key, family, deferral, or departure was added, and no round-1 behaviour changed. The shipped
    cascade is the one round 1 accepted.
22. The unit reports the `prove` MCP call refused before execution under this sandbox's approval
    policy, issued no receipt, and did not present its Vitest readings as one. Rule on whether that
    is handled honestly.
23. Scope honesty overall: the report's account matches the diff and the tree.

## Evidence

- The diff over the CL9 landing, carrying round 1 and the fix together:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff-2.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status-2.txt`
- The fix round's report: `.orkestrel/veneer/units/cl10-report-2.md`
- Its brief: `.orkestrel/veneer/units/cl10-brief-2.md`, over `units/cl10-brief.md`
- Its measurements: `.orkestrel/veneer/units/cl10-fix-terrain.md`
- Round 1's verdict, which is closed: `.orkestrel/veneer/cl10-audit-verdict.md`
- Round 1's claims: `.orkestrel/veneer/cl10-audit-claims.md`
- The checkout: `C:/Users/mikes/WebstormProjects/veneer`
