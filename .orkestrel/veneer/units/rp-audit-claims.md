# RP audit — claims

Subject: the RP unit's change in `/home/user/veneer-rp` (uncommitted over Veneer `1ee0faf`, with the round-5
`@orkestrel/test` build extracted into `node_modules`), briefed by `rp-repin-brief.md` and reported in `rp-report.md`.
The diff is `rp.diff`, the status `rp-status.txt`, and the logs and instruments `rp-instruments/`, all beside this file.
The Orchestrator's control, `rp-instruments/rp-control.sh` with its logs, applies `rp.diff` to `1ee0faf` with the
registry's `@orkestrel/test` 0.0.23 installed and runs the new case. The ruling is `t5-park-ruling-verdict.md`, P1 and
P6. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
   and `tests/setupBrowser.ts` and nothing else; `tests/setup.ts` is the census file the brief's Unknowns search names;
   the format, lint, and typecheck gates the report lists exit 0.
2. **The prose.** The three sites the brief names each state that the release parks the pointer outside the page, and
   no line under `tests/` or in `guides/veneer.md` places the parked pointer at the page's origin or on the wrapper's
   padding. The cascade-key comment's reason for the padding is true of the code.
3. **The kept proofs.** Every `releasePointer` call and every `entered` recorder the diff touches is kept.
4. **The new case proves P1 for the consumer.** Its lifted copy's first element touches the document's origin (the case
   asserts it); its `mouseover` recorder is armed before `releasePointer`; it asserts no element entered and no element
   hovered. It passes on the round-5 build under `journey:light-390` and `journey:dark-1280`, and it fails on the
   registry's 0.0.23 in both projects (the control logs), so its assertions distinguish a park at the origin from a
   park outside the page.
5. **The census entry.** The `primary-parked` scenario and the `parked` capture state are the minimal registration
   the frame manager's `place` method requires, and `parked` is a real capture state under `AGENTS.md` § Design laws
   (Real domain states only), not a label for a fact the `rest` state already names.
6. **Prose law.** Every added or changed comment, TSDoc sentence, and guide sentence follows `AGENTS.md` § Writing and
   `.claude/rules/writing.md`: no count, each code token followed by its noun, no banned term.
