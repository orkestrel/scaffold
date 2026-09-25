# J-ORACLE-FIX-OFFCANVAS rounds 3 to 5 — audit claims (2026-09-25)

**Subject.** Veneer `88d06f4` on `unit/oracle-fix-offcanvas` over `dcff520`, which round 2 was audited at. Round 3 is `43fa73d`, round 4 changed no tracked file, and round 5 is `88d06f4`. Read the files at `88d06f4` with `git -C C:/Users/mikes/WebstormProjects/veneer show 88d06f4:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, which holds `88d06f4` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The design verdict `j-oracle-fix-offcanvas-design-verdict.md` is the rule, with both proposals it names.
- The round-3 ruling `j-oracle-fix-offcanvas-round-3-ruling.md`.
- The reports for rounds 3, 4, and 5: `j-oracle-fix-offcanvas-report-3.md`, `-report-4.md`, and `-report-5.md`.
- The diffs `j-oracle-fix-offcanvas-3.diff` and `-5.diff`, and the status file `-5-status.txt`.
- Round 5's instruments and logs:
  - the probe `-5-holds-probe.sh`, `-5-holds.block.ts.txt`, and `-5-holds-probe.log.txt`;
  - `-5-red-5.sh`, `-5-mutate-7.sh`, `-5-mutant.mjs`, and `-5-mutate-helper-7.sh`;
  - `-5-accept-5.sh` and `-5-accept-5.log.txt`;
  - `-5-compare-5.py` and `-5-compare-5.log.txt`.
- The Orchestrator's replay: `j-oracle-fix-offcanvas-replay-5.log.txt` (the instrument is `../tools/replay-oracle-fix-offcanvas-5.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, in particular § Minimal public API.
- `.claude/rules/names.md`, `tests.md`, `browser.md`, `documentation.md`, and `writing.md`.
- `../decisions.md` § E24, § E28, and § E35.

## Claims

1. **The press rule is the design verdict's.** `#press` cancels its `mousedown` default action exactly when two things hold after its synchronous `void this.hide()`:
   - `#isolation` held an isolation before and no longer holds it;
   - `holdsFocus(trigger)` reads `true` for that isolation's `trigger`.

   A static backdrop keeps its `#prevent` path.
2. **`holdsFocus(element)`** reads `true` exactly when the element's own root, a `ShadowRoot` of either mode or its document, reports it as its `activeElement`, so a trigger in a closed root reads correctly through a held reference. A removed or detached element reads `false`, and a shadow host whose tree holds focus reads `true`. Rule whether that last reading misleads any caller.
3. **`IsolationInterface.trigger`** returns the element destruction returns focus to: the `trigger` option, or else the element focused at construction, which is a retargeted shadow host when focus sat inside a shadow root.
4. **The proofs bind.**
   - Both round-3 inputs read red at `43fa73d` by assertions and green at `88d06f4`: the closed root the panel carries, and the panel in a shadow root with focus outside it.
   - So do the new rows:
     - the listener that focuses the trigger and prevents the hide;
     - the trigger inside the panel;
     - fallback H, with and without `delegatesFocus`;
     - the `redirected` guard row.
   - Every earlier case and guard row holds.
5. **The mutations bind.**
   - Reading the document's `activeElement`, dropping the release condition, always cancelling, and never cancelling each redden their named cases by an assertion.
   - The `matches(':focus')` swap stays green. The probe reads `:focus` equal to the root read in every row, so no case can tell them apart. Rule whether that leaves a hole.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
6. **The prose is true, and it states the limits.** The class TSDoc, the `#press` comment, § Offcanvas, the Bootstrap-difference bullet, `#### IsolationInterface`, and the `holdsFocus` Surface row hold for the code. They state two limits:
   - under reduced motion, a focus move a `hidden.vn.offcanvas` listener makes is undone by a default action the press kept;
   - a fallback trigger that is a shadow host.

   No sentence names a shadow depth the press misses.
7. **The census is unchanged.** The `offcanvas` and `modal` recordings and `departures.json` are byte-identical to round 3's, with 66 departures, all `inert` attribute rows.
8. **Removal and scope.**
   - `readFocusedElement` exists nowhere in the tree.
   - The changed paths are the nine the report lists.
   - No compatibility path remains.
9. **The probe's release stand-in.** The probe read release through a sentinel element's inert state, because `#isolation` is private. Rule whether that stand-in is faithful to the field the code reads.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `88d06f4`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
