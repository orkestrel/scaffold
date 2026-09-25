# J-SAMEWAY round 3 (J-INTEGRATION round 6) — audit claims (2026-09-25)

**Subject.** Veneer commit `e557bfe` on `unit/integration`, over round 2's `dc838aa`. A read-only snapshot of `src`, `tests`, and `guides` at `e557bfe` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-sameway3-e557bfe/`. Beside it are the round's diff `j-sameway-3.diff`, its changed paths `j-sameway-3-status.txt`, the writer's report `j-sameway-report-3.md`, and the Orchestrator's two logs `j-sameway-red-3-orchestrator.log.txt` and `j-sameway-mutations-3-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show e557bfe:<path>`. Never read the worktree.

**What this round answers.** The round-2 objective verdict `units/j-sameway-audit-2-objective-verdict.md` (its defect outside the claims, and the instrument defect) and the brief `units/j-sameway-brief-3.md` (D1 and D2), under `decisions.md` § E24 and its amendments.

**The Orchestrator's ruling on the writer's deviation 2.** The backdrop element is the engine's own, as Bootstrap's is. A consumer that moves the backdrop into another parent is outside the contract, so a show's move of it back into the body is not a write the returning step owes. No claim here covers that input.

**The writer's rulings on the host's insertion into the body and on Offcanvas's leftover `showing` token.** Claim 1 covers both, so the lane rules on each reason.

## Claims

1. **Every write has its entry.** In `Modal` and `Offcanvas`, the show and the hide each make writes to the host, the body, the backdrop's token, and the backdrop's connection. Each such write falls in exactly one of the following, and the report's D1 table states which, matching the source:
   - it is recorded as an entry the returning step (`#rehide` or `#reshow`) returns;
   - it is an acquisition under E13;
   - it is a release under E22's amendment 3;
   - it is the host's own move of the `shown` token;
   - it is not returned, for the reason the table gives.
2. **The lane's witness closes.** On a non-fading Modal shown with `focus: false`, the backdrop's `show` token is removed. A custom element appended to the backdrop adds `show` to the host from its `disconnectedCallback`, and then `hide()` is called. The hide resolves `false`. The host is back at the display and ARIA state the show wrote. The backdrop is connected again to the parent it was removed from, and it still carries no `show` token. The same holds for Offcanvas's panel and its backdrop.
3. **A stopped show returns only its own backdrop writes.** Take a show stopped after its backdrop step. When the show found the backdrop outside the page, the returning step destroys it; in Offcanvas it also ends the press listener. When the show found the backdrop in the page without the token, the returning step removes only the token and leaves the backdrop, and Offcanvas's listener, in place. When the show found the backdrop with the token, the returning step writes nothing to it.
4. **A stopped hide returns only its own backdrop writes.** The hide records a connection entry exactly when the backdrop had a parent at the removal step. It records a token entry exactly when it found the backdrop with the token. Its returning step puts the element back into that parent and adds back only a removed token. A takeover after the closing destruction returns the host's writes alone.
5. **Each backdrop return reads the call.** Each backdrop return runs inside `#revert` and reads the call's identity and the engine's lifetime before its write, as each host return does. Each reads `this.#backdrop` when it runs, so a return after a destruction, or after a reaction's own change, writes nothing to the backdrop. The owner read that round 2's `Backdrop.show(owned)` added still runs first inside a token return.
6. **The proofs bind.** On `dc838aa`'s sources, the four cases round 3 adds read red, each through an assertion (`units/j-sameway-red-3-orchestrator.log.txt`). The instrument's 60 rows read as the log states: every killed row's cause is an `AssertionError`, the D2 plant is refused as a `ReferenceError`, and the controls hold (`units/j-sameway-mutations-3-orchestrator.log.txt`). Round 2's A1 and A2 plants now bind `expected`. For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish that mutation from the passing case.
7. **Greenfield and scope.** The changed paths are the five the report names. `types.ts` and `tests/setupBrowser.ts` are unchanged. No field, import, parameter, or helper is left without a use: check `#revert`, the `BackdropInterface` import, and every removed `backdrop` parameter. No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `e557bfe`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
