# Unit J-COLLAPSE — successor brief 4: the round-3 audit's findings, the last round before landing

This brief supersedes `j-collapse-brief-3.md`. What changed and why: the round-3 audit (`units/j-collapse-audit-3-verdict.md`) confirmed every mechanism in both lanes and the Orchestrator's replay reproduced every mutation row; it found four holes in the proofs (three hide doors after the removal and the `href`-named conflict survive their single mutations, `units/j-collapse-probe-r2-r3-single-door.log.txt`), three guide sentences and one comment that state a rule the code does not follow (§ Delegation's missing refusal, its restoration sentence, the `#activate` comment), one remark sentence that is false for the empty string (`parseElement`), one case title that names the wrong moment, and two wraps. The worktree moved: it is now `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse` (E14); nothing in it changed but its path.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 1 to 3, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse` (branch `unit/collapse` at `eab447e` with the round-2 and round-3 edits uncommitted on top; `git status --short` lists the same eight modified files; the Orchestrator's replay and probes restored every byte and left no probe file). Every instrument you write this round takes the new path; `tmp/j-collapse/mutations-3.py` hardcodes the old one, so copy it to `mutations-4.py` with `ROOT` set to the new path.

## Objective

Bind the four unbound doors with proofs and instrument rows, make the § Delegation sentences and the `#activate` comment true, fix the `parseElement` sentence and the case title, rewrap the two lines, and keep every acceptance command green; no mechanism changes.

## Context

**Evidence.** `units/j-collapse-audit-3-verdict.md` (every ruling), `units/j-collapse-audit-3-objective-verdict.md` and `units/j-collapse-audit-3-subjective-verdict.md` (claim 2's guide half with its fix wording; claim 4's fix wording; F1; the wraps), `units/j-collapse-probe-r2-r3-single-door.log.txt` and `.py` (the four surviving mutations, with the exact text each one changes: the `[shown]` read emptied at the host-and-shown removal, at the size clearing, and at the post-`await` read; `#conflicts` narrowed to `trigger.hasAttribute(this.#collapse.attributes.target)`), `units/j-collapse-probe-cross-delegate.log.txt` (the cross-delegate reading, ruled a bound, not yours to change), Bootstrap's `util/index.js` `getElement` (the `object.length > 0` guard returning `null`; the unguarded `document.querySelector(parseSelector(object))`). Locate each site by its symbol.

**Law, host, standing conditions, and scope.** As in `j-collapse-brief.md` and its successors, with the worktree path changed as stated. The `prove` MCP server is not reachable to you; record that you made no call.

## The edits

- **F1 (claim 1, R2): the three doors.** Proofs, each red under its own mutation (the code is already right, so the binding is the instrument row; record each mutation's red and the green): (a) "stops a hide whose host-and-shown removal a reaction answers by adding the shown token back, writing nothing more" (a custom-element panel whose class reaction, on the write that removes `collapse` and `show`, re-adds `show` and arms the observer; assert no record after the reaction, `false`, no `hidden`, the panel `collapsing show`, the triggers untouched); (b) "stops a hide whose size clearing a reaction answers by adding the shown token, dispatching no hidden event" (a `style` reaction on the clearing write re-adds `show`; assert no record after it, `false`, no `hidden`, the tokens as the reaction left them); (c) "stops a hide when the shown token returns during its transition, dispatching no hidden event" (with the cascade loaded, add `show` to the panel after the size clears and before the transition settles, from a listener on the panel's animation `ready` or a `requestAnimationFrame` inside the transition; assert `false`, no `hidden`, no `host` write after the `await`: the panel ends `collapsing show`). Instrument rows: "the host-and-shown removal door admits the shown token" (exactly a), "the size-clearing door admits the shown token" (exactly b), "the post-await read admits the shown token" (exactly c).
- **F2 (claim 2, R3): the `href` conflict.** A refusal proof whose trigger is an anchor naming the panel through `href="#panel"` with no target attribute, asserting what the existing refusal proof asserts. Instrument row: "the conflict read names a panel through the target attribute alone" (exactly this case).
- **F3 (claim 2, the guide half): § Delegation and the `#activate` comment.** After the button-route sentences in § Delegation: "A click whose button host is one of the panels its collapse trigger names inside the root is refused when neither engine exists there, as § Components states under Collapse." The restoration sentence reads "…finds no owner, and the first live delegate whose root contains the host to reach it acquires a fresh engine at once; that engine's snapshot takes…". The `#activate` comment reads "Drops every engine destroyed directly, refuses a click that would have the button route and the collapse route each construct an engine on one element, and otherwise routes it through both…".
- **F4 (claim 4): the `parseElement` sentence.** The last sentence reads: "Where the selector as written is invalid, this reader returns undefined; `getElement` returns null for an empty string and throws for any other selector its escaping leaves invalid."
- **F5 (F1): the title.** "destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document", in the test and in every instrument row that names it.
- **F6 (the wraps).** Rewrap the `#### Collapse` takeover paragraph so no line stands alone mid-sentence (the "finds the" line) and every line fits 100 columns; rewrap the `Collapse.ts` class remark's line ending "completes to. A" to the file's width. Words unchanged.

## Unknowns

none

## Output

Return the report as your final message: per edit F1 to F6, what changed; each new proof's mutation-red reading and green reading verbatim; the instrument's log copied verbatim (`tmp/j-collapse/mutations-round-4.log.txt`, every row); the output of the round-2 acceptance criteria verbatim (the three builds before conformance); `git status --short` and `git diff --stat`; the four patches under `tmp/j-collapse/patches-2/` unchanged or as changed.

## Acceptance criteria

Criteria 1 to 6 of `j-collapse-brief.md` and the conformance gate with the three builds permitted; the four F1 and F2 proofs present, each `EXACT` under its instrument row; `grep -n "in the first delegate to hear it" guides/veneer.md` returns no hit; `grep -c "refused" guides/veneer.md` reads at least 2 in the `## Engine` section (§ Delegation and `#### Collapse`); `grep -n "getElement throws" src/browser/parsers.ts` returns no hit; `grep -n "at its next change" tests/src/browser/Collapse.test.ts tmp/j-collapse/mutations-4.py` returns no hit; `awk 'length < 20 && length > 0' guides/veneer.md` inside the takeover paragraph returns no hit; `git apply --check tmp/j-collapse/patches-2/*.diff` exits 0.

## Review evidence

The actual diff (`git diff HEAD`) and status of the worktree, captured by the Orchestrator as `j-collapse-4.diff` and `j-collapse-4-status.txt`, and the report; the audit is the checker on the mechanical items plus the Orchestrator's gates and replay (the reason recorded in `units/j-collapse-audit-3-verdict.md` § Carrier).
