# J-TOOLTIP-DOORS — the Orchestrator's reconciled ruling (2026-09-24)

Lanes on `j-tooltip-doors-brief.md`, blind and parallel: the subjective lane (`planner`, Opus 5.5, `j-tooltip-doors-subjective-verdict.md`) and the objective lane (`analyst`, GPT-6 Astra through `codex exec` read-only, thread `01a0d3c8-b07f-7bd1-83b0-1b082699d234`, `j-tooltip-doors-objective-verdict.md`). Neither executed anything; every behavioural statement in both is a derivation, and round 4 proves each one it adopts red-first.

## Where the lanes agree

- **A (enumerated doors) is rejected as the strategy.** No property makes the enumeration complete; deciding which calls are reaction-free is the judgment that failed three times.
- **B (one guarded step) is adopted.** The siblings already have it: `Modal.#apply`, `Offcanvas.#apply`, `Dropdown.#apply(change, shown, write)`. Tooltip is the one engine that writes its door reads inline and splits its predicate four ways. Every platform write, dispatch, element move, and sanitizer call inside a change becomes one `#apply` step; `#holding` goes.
- **C's exclusion is rejected; C's guarantees are adopted.** A listener reaches the tip through the `inserted` event and the trigger's `aria-describedby`, so a relocation inside the platform's `beforetoggle` dispatch is reachable through shipped code and a documented seam and is repaired, not documented. The only bound that stays documented is E13.
- **D is rejected as the solution.** Detached construction is already the case (`buildTip` ends detached); disconnection at the origin, connection at append and at release, `beforetoggle` at promotion and teardown, trigger attribute reactions, the sanitizer, and listeners remain and go to B.
- **Discard reads ownership before removing.** `#discard` captures the tip and its container, runs the placement teardown, removes the tip only when it is still in that container, unlinks the id while the tooltip is live, and reports whether the tip left the document; `#conceal` stops on a failed report and dispatches no `hidden`.
- **Completion reads the full door before releasing the change and dispatching.** A listener to the completed event may start another change; the completed change is released before the dispatch, and that later change is never undone.
- **`Placement`, `Dropdown`, and `HostSnapshot` keep their contracts; E17 stands; J-POPOVER inherits the mechanism through the R12 seam.**

## Where they differ, and the ruling

| Question | Subjective lane | Objective lane | Ruling |
| --- | --- | --- | --- |
| Read before the write as well as after | No: the previous step's read covers it; the siblings read only after | Yes: a pre-read and a post-read per effect | **Siblings' form.** One read after each step, after each content function, and after each await, plus a read before publication and before the completed-event dispatch. Every interval between consumer code and the next effect ends in a read, which is what the pre-read buys. |
| The predicate's shape | `#holds(change, shown: boolean \| undefined)`; identity from `#change` | Exact expected tip including expected absence; a separate candidate | **`#holds(change, shown)`** in the siblings' positions. `undefined` means the call holds no published tip (the build, the pre- and post-discard intervals). A boolean also reads `#tip !== undefined`, `#tip.parentElement === #container`, and the `shown` token exactly when `shown` is true. Identity comes from the change: only `show`, `#conceal`, and `destroy` replace `#tip`, each under a new change or an abort. |
| `Placement`'s constructor writes after a relocating opening `beforetoggle` | `Placement` unchanged; `#place` constructs, publishes, then reads the door | A constructor-scoped `PlacementOptions.guard` and `Placement.#apply` so the compensation, side, and arrow writes stop too | **`Placement` unchanged this round.** The construction is one step; its remaining writes are style and attribute writes on the tooltip's own tip that its teardown restores, and none of them moves a node, publishes, or completes. The claim is stated for the audit (round-4 claim on the promotion step); a reachable defect with a proof routes a `Placement` change to a successor. |
| Splitting `buildTip` (an exported `readTip`) | One `#apply` step around `buildTip` | Extract `readTip`; guard the sanitizer call and the root detachment separately | **One step.** The root detachment removes the tip from a detached wrapper, where no reaction runs; the sanitizer's return is read by the step's door. No `helpers.ts` change. |
| `#wait` and `#complete` members | `#holds` after each await; the completion door in `show` and `#conceal` | Add both | **No new members beyond `#apply`.** The await is followed by a `#holds` read and the completion reads the door before release and dispatch, inline. |
| Content functions resolved before the first write | Adopt (D narrowly); P6 proves it | Reject: it changes observation order | **Adopt.** The build resolves every content value first, reading the door after each call, so a destroying or taking-over function stops the build before any element moves. The functions run once per build as before; the observation order change is that a function no longer sees an earlier slot already filled, which nothing documents. |
| Round-4 writer | `sol` on Astra | — | **`opus`, the unit's writer (a48b1f17b0f574e7a).** The unit's proof is a Playwright browser suite the bench sandbox cannot drive (a child's child is denied), and the writer holds three rounds of context. The auditor engines: `analyst` (Astra) objective, `reviewer` (Opus) subjective, `checker` for the mechanical claim. |

## The ruling (E18)

- **Invariant.** A change performs no write, dispatch, element move, or sanitizer call after consumer code has run unless it has since read that the tooltip is live, that the change is still its own, and, from the tip's insertion until its removal, that the tip it holds is in the container it went into and carries the `shown` token exactly when the change expects it.
- **Constraint.** The tooltip never moves back, removes, or repositions a tip or an element that other code moved; it undoes a move only while the node is still where the tooltip put it. Through destruction it keeps restoring the attributes it wrote and returning the content still in its slots. It adds no read before a step, no observer, and no inerting, and it does not defend against the E13 re-entry.
- **Interface.**
  - `TooltipInterface.show` `@remarks`: "A listener, a content function, the sanitizer, or a custom element's reaction that runs during the call can destroy the tooltip, start a hide, or move the tip; the call then resolves false, writes and dispatches nothing more, and leaves the tip where that code put it."
  - `TooltipInterface.hide` `@remarks`: "A listener or reaction that moves the tip during the hide, including a listener to the platform's closing `beforetoggle` event, takes the tip over: the call resolves false, dispatches no `hidden` event, and leaves the tip there."
  - `TooltipEventMap.inserted`: "A listener can reach the tip through the trigger's `aria-describedby` attribute; a tip a listener moves out of its container is left where the listener put it, by the show, a hide, and destruction alike."
  - `TooltipEventMap.shown` and `hidden`: "The change is released before this event is dispatched, so a listener may start another change; that change does not undo the completion already announced."
  - `TooltipEventMap.hide` (O1): "Prevention refuses an ordinary hide; after a prevented platform hide has re-promoted this tip once, its next platform close conceals it despite prevention."
- **The guide's door paragraph** is the subjective lane's part 5 with the release-before-dispatch sentence added; the class TSDoc says the same.

## Carried into round 4 beside the ruling

- Round 3's failed claims 6 and 7 and the bounds on claims 2 and 4 (`j-tooltip-audit-3-verdict.md`).
- The subjective lane's two out-of-invariant findings: `fill` called from a content function during a build must refuse before it releases anything; a content function or sanitizer that throws mid-build returns the unfinished tip's content before the error propagates.
- The subjective lane's "destroy leaves a moved tip" behaviour change: adopted as the one undo rule.

## Left as observations

- Whether a detached tip built by fragment parsing is ever upgraded: the mechanism makes it moot for correctness; the rows for the token and id writes are kept as rows whose reachability the instrument reports rather than assumes.
- The siblings' tension: `Offcanvas` exempts its backdrop writes by classification. That is a separate ruling on the sibling idiom, recorded in `plan.md` § Carried findings for J-INTEGRATION.

RULING: adopt B in the siblings' form with the completion and discard doors, C's guarantees on the interface, D's content-first resolution; `Placement`, `helpers.ts`, and `HostSnapshot` unchanged; round 4 to the unit's `opus` writer under `j-tooltip-brief-4.md`
