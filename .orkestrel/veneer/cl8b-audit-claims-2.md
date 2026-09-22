# CL8b audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL8b change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `d2c5bb3` (the CL8 landing), after the fix round `sol` ran under
`.orkestrel/veneer/units/cl8b-brief-3.md` (over briefs 2 and 1, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl8b-audit-verdict.md`; the fix report is `units/cl8b-report-3.md`.
Evidence: the rendered diff `units/cl8b-diff-2.patch.txt` and status `tmp/audit/cl8b-status-2.txt`,
round 1's `units/cl8b-diff.patch.txt` and `tmp/audit/cl8b-status.txt` for a diff-to-diff reading, the
live tree, and the built `dist/src/styles/index.css`.

**Scope of this round.** Implementation only. Report no wording or prose finding; the guide's
compatibility and deferral rows stay in scope as a contract. **Round 1's rulings carry unchanged and
are not reopened** — the shipped rules, the step scale, the accounting, the tuple correction, and the
placement were accepted there.

**What this round is.** Round 1 accepted the implementation and forced a round on a density proof
that could not fail: it set the factor on the mounted wrapper while the scale is declared at the
document root, so the assertion passed whether or not the scale carried the factor. The objective
lane had independently recorded that the same case carried no positive control that the retune took
effect. Four non-forcing findings rode along. This round rules on those and on nothing round 1
settled.

**The status moved by design.** Round 1's status carried twelve paths; this round's carries fourteen.
The two added are the mixins file and the grid partial, which brief 3 granted for the extraction.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding only
after the last claim, with a site and a one-line failure scenario, saying whether it forces another
round.

1. The density proof can now fail, and it proves the factor arrived. The case sets the factor on the
   document element, restores it afterwards, and carries a positive control: a reading derived from
   the density-scaled space scale on the same specimen, asserted before the retune, again after it,
   and again after the restoration. **Rule whether that control would actually catch a factor that
   stopped reaching the specimen**, and whether the independence assertions beside it would catch a
   step scale that started carrying the factor.

2. That is proved against the tree, not asserted. Making the step scale depend on the density factor
   reddened the case; restoring the exact bytes returned it green, with a digest recorded
   (report-only red-then-green). **Rule whether the mutation the control used is the one the finding
   named** — a scale that carries the factor — rather than a weaker mutation that would redden
   anyway.

3. The ramp preamble is extracted and both partials' emitted cascades are unchanged. One mixin in
   `src/styles/_mixins.scss` yields the infix and the boundary to its content, and the gap and grid
   partials both call it. **Rule this on the substitution itself**: read the mixin body and both call
   sites and say whether the emitted rules can differ, including that the grid's offset guard still
   receives the boundary it needs. The unit's comparison instrument is corroboration.

4. That comparison instrument is itself falsifiable. It detects a declaration-priority change as well
   as an ordering or positional change (report-only).

5. The remaining three findings are closed. The sweep's folder guard now names the utilities folder,
   so the sweep cannot pass by discovering nothing there. The important priority on the row-gap rules
   carries an assertion: a competing rule outside the cascade's layers is loaded and the utility is
   read to still win, and removing the priority reddens it. The showcase step list and its proof both
   derive from the registry rather than repeating a literal. **Rule whether the priority case's
   competing rule actually arrives after the layered cascade**, which is the condition that makes it
   a real test rather than a restatement of layer order.

6. Nothing round 1 accepted moved. The gap partial's rules, the step scale and its leaves, the guide
   rows, the deferral deletions, the conformance listing, and the recorded key tuple are as round 1
   accepted them; the diff-to-diff delta is confined to the files this round's findings touch.

7. `[mechanical]` Scope, law, and gates. `tmp/audit/cl8b-status-2.txt` adds exactly
   `src/styles/_mixins.scss` and `src/styles/components/_grid.scss` to round 1's status and removes
   nothing. Both are granted by `units/cl8b-brief-3.md` § Scope for the extraction and nothing else,
   and the grid partial's change is the call site alone. `tests/setupConformance.ts`,
   `tests/src/styles/components/container.test.ts`, `tests/fixtures/**`, `package.json`,
   `configs/**`, and the vendored files are absent from both statuses. The added lines carry no
   `any`, no type assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and no
   case named for a control. Every gate exits 0 on managed Chromium, the styles, browser-setup, and
   app-browser projects exit 0 on Edge, and the independent verifier's chain is green with the status
   identical before and after.
