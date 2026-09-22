# CL11 audit claims — journeys and captures

The subject is the CL11 diff over the CL10 landing `0e0b055`, in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`. Every claim below is numbered once for the whole round.
Every lane of this round rules on this file and no other claim list.

Rule on each claim as **CONFIRMED**, **REFUTED**, or **UNPROVEN**, with the evidence that decides it.

**Before confirming any claim about a proof, name the mutation that would make that proof fail, and
say whether its assertions distinguish that mutation from the passing case.** Where you cannot name
such a mutation, the claim is UNPROVEN rather than CONFIRMED.

**Read a regular expression, a path, or a declaration out of the file's own bytes, never from a
transcription.** In a previous round the Orchestrator hand-copied an expression into a probe, the
escaping came out different, and the probe reported a regression that does not exist.

Cite every site by its symbol — the case title, the export name, the state name — and give a line
number only as "currently around N".

## The seam, which is this round's hardest judgment

1. `visitBreakpoint` takes a third parameter defaulting to the installed viewport verb, so a case can
   supply a resizer that resizes for the visit and refuses the restore. Rule on whether that injected
   collaborator is a **sanctioned boundary stub** under `.claude/rules/tests.md` § Untestable usually
   means missing seam, or a **mock of project-owned behaviour** that `AGENTS.md` bars. The rule says an
   injected collaborator with a real minimal implementation is sanctioned; judge whether this one is
   real rather than inert, and whether the behaviour it stands in for is project-owned.
2. The unit reports that the installed viewport verb refuses nothing a case can reach — it posts to
   the orchestrator, rejects only on an unknown frame id, and ignores the width and height values.
   Verify that reading against the installed source, because the whole seam rests on it.
3. The reworked visitor preserves the reading's failure and carries a refused restore as its `cause`,
   matching the pattern the pointer hold already carries in the same module. Its default keeps every
   existing caller working, including callers in files this unit does not own.

## The registry and the journeys

4. The new state table is the single source for the content and layout states, and the portfolio's
   state list is derived from it rather than hand-written, so a key added there reaches the portfolio
   without a second edit.
5. Each registered state earns its frame under the registry's own duplication ruling, and the states
   the unit rejected were rejected on that ruling rather than on convenience. It reports rejecting a
   page frame, a pointer frame, and a second state per specimen.
6. One journey case reaches all eight new states, placing each under both registered modes, and the
   existing placement proof compares placements against the declared list **in both directions** — a
   state declared and never placed, and a state placed and never declared, each redden.
7. Both registered widths are covered, because every variant project runs every case and the four
   projects fix 1280 and 390.
8. The journey reads each key's resolved property on the showcase's own specimen **and** on the copy
   it photographs, and asserts they agree before anything else. Rule on whether that is sufficient to
   stop a frame showing something the showcase does not render.
9. The case's readings distinguish the modes: the table's border colour and the link's colour differ
   between light and dark, which is what earns each key its dark twin. Rule on whether a pair whose
   paint never moved would be caught.

## The consumer page

10. The distribution stage renders a packed-CSS consumer page carrying a container, a row, a table,
    and a link, reading each through the installed package's own styles export rather than the source
    cascade.
11. Every key is read beside an unclassed twin of its own tag, so a page resolving none of the packed
    cascade would report one value on both sides of every pair.
12. The case can fail: the unit reports emptying the stylesheet and every reading collapsing to
    browser defaults, with the case reddening on the first key. Verify the mutation would be caught.
13. The unit reports correcting one of its own control assumptions — a bare table cell is not
    unstyled, because the packed elements layer pads it — so the pair now reads apart rather than
    against a zero that does not exist. Rule on that correction.

## The four carried findings

14. **The breakpoint visitor's bare restore** is closed, and its case reaches a rejecting restore,
    which is the path the finding said no case reached.
15. **The pointer hold's pressed-state miss where the release succeeds** now has a case. It asserts
    the message, that no cause is attached, and that the property is absent — which is what tells this
    half from the neighbouring case where the release also fails. No code changed; rule on whether
    that is right.
16. **The pointer hold's unreachable-after-scrolling refusal** now has a case, driving a host fixed to
    the viewport so no scroll moves it. The case asserts the host is reachable and its rectangle is
    outside the viewport, so the refusal raised is the hold's own. No code changed.
17. **The button resolver's verb prefix** is renamed under `.claude/rules/names.md`. Rule on whether
    the new verb is the one that rule fixes, and verify the consumer set the unit reports — it says a
    tree-wide search returned exactly the owned files and nothing else.
18. **The root-bounded reader's first match** was closed as a defect rather than stated as a bound:
    the reader now refuses a name more than one host in the root announces, and the same refusal was
    added to the specimen reader. Rule on whether closing it was right and whether the refusal is
    correct — in particular whether it is about one root holding two rather than the page holding two.

## The planted failure

19. Journal and tree artifacts survive a red run, and the unit reports this already worked rather than
    having to be built. Verify the hooks that write them run after a failing case.
20. The plant was made in a file the unit owns, the run went red, the artifacts were retained at the
    red run's own timestamp, the plant was removed, and the run went green. Verify the removal left
    nothing behind.

## Gates, scope, and honesty

21. The gate chain passes on Chromium, the required projects pass on Edge, and the distribution
    project — which `npm test` does not include — passes on its own reading. An independent verifier
    takes the authoritative run.
22. The capture run shoots every registered state with no blank frame, and the unit reports reading
    frames back by eye at both widths and in both modes.
23. The status lists only files the brief owns. Nothing off-limits was touched:
    `tests/setupConformance.ts`, `tests/setupStyles.ts` and its proof, `tests/fixtures/**`,
    `package.json`, `configs/**`, `src/**`, `app/**`, `guides/veneer.md`, and every path
    `scaffold repair` restores. The Button-family section proof carries the rename's call sites and
    one case title, and nothing else.
24. No receipt was issued for the unreachable instrument, and no test reading is represented as one.
25. Scope honesty: the report's account matches the diff and the tree, including its three open items.

## The three the unit did not close

26. **A Button-family state duplicates the home state**, byte-identical at both widths and in both
    modes. The unit registered the finding rather than striking the state, because it is a
    Button-family subject this unit does not own and striking it would remove placements the Button
    journey makes. Rule on whether that was the right call and who should carry it.
27. **No permanent guard against a blank frame.** The unit tried to adopt its blank-frame measurement
    as a case and could not make the installed frame reader resolve the portfolio's own path. Rule on
    whether the design it shipped instead — comparing the copy's reading against the specimen's before
    placing — actually holds the failure off, and on what a successor would need.
28. **Why an element frame goes blank is not explained.** The unit measured the condition and the cure
    and says nothing in the unit depends on the mechanism. Rule on whether that is an acceptable
    recorded gap under `.claude/rules/tests.md` § Untestable usually means missing seam, which
    requires a genuinely irreducible gap to be recorded where a reader meets it.

## Evidence

- The diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status.txt`
- The unit's report: `.orkestrel/veneer/units/cl11-report.md`
- The brief it ran: `.orkestrel/veneer/units/cl11-brief.md`
- The terrain record: `.orkestrel/veneer/units/cl11-terrain.md`
- The scope read that held the brief: `.orkestrel/veneer/units/cl11-scope-read-report.md`
- The checkout: `C:/Users/mikes/WebstormProjects/veneer`
