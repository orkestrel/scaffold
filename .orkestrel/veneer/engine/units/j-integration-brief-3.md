# Unit J-INTEGRATION, round 3 — a returning step that yields to a change started inside it

Successor to `j-integration-brief-2.md`, in force for everything this file does not change. The landing audit's objective lane on Astra (thread `01a0d54e-8a31-74b1-835f-069958cc211b`, `j-integration-audit-2-objective-verdict.md`) confirmed the lifetime read, the backdrop's lifetime, and the scope. It failed claims 1, 2, 3, 6, 7, and 8. The checker passed its claims (`j-integration-audit-2-checker-verdict.md`). Read the objective verdict start to finish before acting. The branch holds the round-2 commit `8cb9840` merged with `main` as `55a3b11`: work on top of it, and do not commit.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed, in the same worktree. Perform the assignment directly and spawn nothing.

## Obligations (red first)

- **R1 Re-entry into a returning step (claims 1, 2, 3).** `#holds` releases `#changing` before the returning step runs. A reaction to one of the step's writes can therefore start a `show` or `hide` that completes synchronously, and the stale step then writes over it. Examples: a nested `hide()` from the `display: block` reaction, after which the old step restores the shown ARIA state onto a hidden host; a nested `show()` from the `display: none` reaction, after which the old step strips the shown host's modal semantics; an Offcanvas `show()` from the `showing` removal, after which the old step removes the new show's attributes and destroys the reused backdrop. Make every returning write stop once another change has started since the step began, in each engine. A change identity that the step captures and `#revert` compares serves; a boolean that the nested call clears when it completes does not. Record your mechanism. E22's lifetime read stays. Red first: one case per engine and direction, starting another change inside a returning write, with and without that change completing synchronously, asserting the host and backdrop end in the nested change's state.
- **R2 The proofs' grain (claim 6).** Each write of a returning step either has a mutation that reddens a case, or is removed as superfluous and the removal recorded. Examples: `#rehide`'s `backdrop.hide()` before `destroy()` may be superfluous, because the element leaves; the Offcanvas press-listener abort is observable through `recordListeners`.
- **R3 E13 resources in the cases (claim 7).** H1 and H2 read the isolation (sibling inertness, and focus containment where focus is on) beside the lock or `open` token, in rows where the change acquired it, and assert it stays as E13 rules.
- **R4 The removal proof (claim 8).** Restore the round-1 coverage that the round-2 rewrite dropped: destruction inside the Modal backdrop's removal, beside the takeover row. The mutation that ignores the lifetime at that door must redden it.
- **The instrument.** Add a row per new mechanism, and re-run the whole round-2 set plus the new rows once at the end, with the digests. Never run it beside the acceptance chain.

## Output

The new cases' red and green readings, the mechanism for R1, the mutation table, the acceptance output, `git status --short`, and the deviation state.
