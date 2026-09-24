# Unit J-INTEGRATION, round 2 — a change the host takes over leaves a coherent state

Successor to `j-integration-brief.md` (in force for everything this file does not change). What changed and why: the round-1 audit (`j-integration-audit-verdict.md`) confirmed INT1, INT3, INT5, the Modal removal door, and the Backdrop insertion door, and failed claims 3 and 5. The backdrop INT2 restores can stand over a host the stopped hide already made invisible, and a takeover inside the backdrop's removal leaves a shown host with no backdrop. Your round-1 observations named the same class. The Orchestrator ruled E22 (`decisions.md` § E22) and folded the carried J-HELD rows into this round. INT4 stays ruled (the repetition stays); do not touch `HostSnapshot.ts`.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed with its context, in the same worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`. Perform the assignment directly and spawn nothing.

## Obligations (red first; each case asserts what a user perceives — computed display, the transform under the shipped cascade, the hit target — beside the tokens)

- **H1 A stopped hide.** On `Modal` and `Offcanvas`, a hide the host takes over at any door after its first write (the `shown` token removal, the fade, the `display` and ARIA writes, the backdrop's fade, the backdrop's removal) ends with the host in the shown state it chose: its `display`, `aria-hidden`, `aria-modal`, and `role` as the show wrote them, the Offcanvas `hiding` token cleared, and the backdrop shown, re-inserted when the hide had already removed it. One step does it, per E22: it writes only what the hide wrote, dispatches no event, and reads no further door. The scroll lock and the isolation keep E13's rule. Drive at least the takeover before the `display` write, during the backdrop's fade, and inside the backdrop's removal, for each engine.
- **H2 A stopped show.** A show the host takes over (the host drops its `shown` token) at any door after the backdrop's insertion ends with the backdrop hidden and removed and the `showing` token cleared, per E22.
- **H3 The Backdrop's identity check.** A Backdrop case in which a reaction inside the insertion starts another call on the same backdrop (rather than destroying it) and the first call writes no `shown` token and resolves `false`; the mutation that removes only the identity half of the post-insertion read reddens it.
- **The instrument.** Add a mutation per new step (each rollback write dropped; the re-insertion dropped; the identity check dropped), run each against its one test file with digests before and after, and report each as the round-1 evidence did.

## Scope, tools, output, deviation

As `j-integration-brief.md`; `guides/veneer.md` is owned in `#### Modal` and `#### Offcanvas` for the sentences this round makes false (the takeover paragraphs) and nothing else. Test in widening rings: the one case while it is red, then `Modal`, `Offcanvas`, `Backdrop`, and `Delegate`, then the whole browser suite once. Re-run the acceptance chain once at the end. Return the round-2 report in the brief's Output shape, with the new cases' red and green readings, the mutation table, the acceptance output, `git status --short`, and the deviation state. Stop on a rollback step that needs a door (report the reaction that runs inside it), or on a rollback that would restore something the change did not write.
