# CL9 audit — claims (round 2, the fix round under brief 2)

Subject: the whole CL9 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over
the base `8c70787` (the CL8b landing), after the fix round `sol` ran under
`.orkestrel/veneer/units/cl9-brief-2.md` (over `units/cl9-brief.md`, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl9-audit-verdict.md`; the fix report is `units/cl9-report-2.md`.
Terrain: `units/cl9-terrain.md`, the single home for this key's measurements. Evidence: the rendered
diff `tmp/audit/cl9-diff-2.patch` and status `tmp/audit/cl9-status-2.txt`, round 1's
`tmp/audit/cl9-diff.patch` for a diff-to-diff reading, the live tree, and the built cascade.

**Scope of this round.** Implementation only. Report no wording or prose finding; the guide's rows
stay in scope as a contract. **Round 1's rulings carry unchanged and are not reopened** — the shipped
selectors, the accounting, the downward arithmetic, the departures, the responsive probe, and the
loops were accepted there.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

**What this round is.** Round 1 accepted the implementation and forced a round on five findings, three
forcing. The subjective lane refuted two claims and the objective lane raised a third forcing finding;
the two lanes contradicted each other on both refutations and the Orchestrator verified each
first-party, upholding the subjective lane on both. This round rules on those five and on nothing
round 1 settled.

**The status is unchanged from round 1**, path for path — every fix landed in a file the unit already
owned.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; record a
report-only claim as report-only; add an implementation-defect finding only after the last claim, with
a site and a one-line failure scenario, saying whether it forces another round.

1. **The shared normalizer's guard now distinguishes a literal colon.** The even-child branch tests
   both the preceding character and whether it was literal, which is what its neighbour in the same
   function already did. **Rule the two guards side by side** and say whether they now agree, and
   whether any other branch in that function carries the older shape.

2. That fix is proved through the machinery whose blast radius it affects. A case drives the **real
   presence scanner** with an inert inventory carrying an escaped-colon selector, and it failed before
   the fix and passes after (report-only red-then-green). **Rule whether driving the scanner with a
   constructed inventory is a sound proof** of the shared behaviour, or whether it only exercises the
   normalizer by another name.

3. **No already-shipped key's reading moved.** The change is to a function every key's presence scan
   uses, so rule whether any other key's normalization differs before and after — the conformance run
   passing is evidence, not a ruling.

4. **The accent fallback is now tested.** The accent slot is given a distinguishable value, read on an
   unstriped cell, with stripe and state precedence verified while it remains set; and replacing the
   final fallback with a literal reddens the case in both themes (report-only red-then-green).
   **Rule whether the corrected case would also catch the original defect** — a chain that ignores the
   accent — rather than only the literal substitution the control used.

5. **The partial uses the shared role list, and the cascade did not move.** It loops the token
   module's Bootstrap-aligned list rather than a re-declared copy. **Rule the choice between the two
   lists the token module carries**: one matches the record's roles and the broader one adds Veneer's
   own, which the record does not carry — so rule whether the chosen list is the only one the
   comparison permits, and what would happen under the other.

6. The two non-forcing findings are closed: the freeze assertions now cover every new table and check
   each row as the sibling proofs do, and the state iterations release both the applied class and the
   pointer, with the earlier cases doing the same.

7. Nothing round 1 accepted moved. The partial's rules beyond the role-list change, the guide rows,
   the conformance listing, the comparison's tuple, and the downward arithmetic are as round 1
   accepted them; the diff-to-diff delta is confined to the files these findings touch.

8. `[mechanical]` Scope, law, and gates. `tmp/audit/cl9-status-2.txt` is identical to round 1's
   status, path for path, with no addition and no removal. `tests/setupConformance.ts`,
   `src/styles/_tokens.scss`, `src/core/constants.ts`, `tests/fixtures/**`, `package.json`,
   `configs/**`, every other partial and proof, and the vendored files are absent from both. The added
   lines carry no `any`, no type assertion outside `as const`, no non-null assertion, no suppression
   comment, no `public`/`private`/`protected`, no parameter property, no default export, no skipped
   case, and no case named for a control. Every gate exits 0 on managed Chromium, the styles,
   browser-setup, and app-browser projects exit 0 on Edge, and the independent verifier's chain is
   green with the status identical before and after.
