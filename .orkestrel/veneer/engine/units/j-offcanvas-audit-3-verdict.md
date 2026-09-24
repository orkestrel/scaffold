# J-OFFCANVAS round 3 — the Orchestrator's closure record (2026-09-24)

Subject: the J-OFFCANVAS round-3 tree in `tmp/worktrees/offcanvas`, per `j-offcanvas-brief-3.md` and `j-offcanvas-report-3.md`, committed on `unit/offcanvas` by `w2-land-1.sh` with `j-offcanvas-landing-message.txt` and merged with `main` (no conflicts; `main` had moved to `0fdadf4` with the styles session's landing, so the merge carries it).

## Why no fresh audit round

Round 3 adopted the round-2 objective lane's repair boundary for its one mechanism finding (a spared element is claimed as not inert with the isolation's precedence and restoration) and folded the subjective lane's findings (the listener's lifetime, the inside-press binding, the sentences). Under `.claude/rules/quality.md` § Rounds and verdicts, a fix that adopts the auditor's prescription closes with a mutation probe in place of a fresh audit round; the probe is the instrument's round-3 rows and the Orchestrator's replay of the mechanism rows.

## The Orchestrator's probe (`j-offcanvas-mutations-3-orchestrator.log.txt`)

The replay of `j-offcanvas-mutations-3.py` over the twelve mechanism rows reproduced the writer's readings row for row: "the spared element is skipped, not claimed" (`EXACT`, the two-panel case), "the observer skips a spared insertion" and "the observer claims a spared insertion inert" (`EXACT`, `Isolation.test.ts`), "the sibling walk claims a spared element inert" (`JOINED`), "the isolation spares no backdrop" (`JOINED`), "the press listener lives with the panel" (`EXACT`, the listener-lifetime case), "the press listener sits on the host" (`JOINED`, the inside-press assertion), "the press listener sits on the backdrop parent" (`JOINED`, the container assertion), "the press counts any target containing the backdrop" (`EXACT`), "the backdrop removes itself at the end of its fade" and "the hide removes the backdrop before the settle door" (`EXACT`, the O1 case), "the dismiss resolution reads no lifetime" (`JOINED`, `Delegate.test.ts`); the instrument's `receipt: restored byte for byte`; the Orchestrator's own digest: every source restored byte for byte. The remaining rows of the 68 stand on the writer's whole run, whose digests match the files the acceptance chain ran on; this selection is the deviation recorded below.

## The Orchestrator's read of round 3's diff

- `Isolation`: a connected spared element is claimed not inert at construction through `#claim(element, false)`; the observer claims an inserted element with `!this.#spare.has(node)` as the inert value, so a spared insertion gets the not-inert claim; the sibling walk still skips spared elements (a newer inert claim would otherwise sit on top); release restores through the shared claim stack.
- `Offcanvas`: a `#listening` controller per backdrop; the press listener under `AbortSignal.any([signal, listening.signal])`; the hide's removal step and `destroy` abort it before removing the backdrop.
- The sentences: `IsolationOptions.spare`, `BackdropOptions.animated`, `OffcanvasClassMap.host`, the Isolation constructor summary, the guide's press paragraph, door paragraph, and the focus and press departures.
- The two-panel, listener-lifetime, container, and inside-press cases, each with its own assertion; the Modal suite green.

## Deviations

- The replay ran the twelve mechanism rows, not all 68: the round-1 and round-2 rows had the writer's consistent whole-run logs across three rounds and the landing pace ruling applies; recorded as the bound of the probe.
- No fresh lanes this round, per the rule above. The subjective lane's B1 (`spare`'s part of speech), B6 (Modal's bare `destroy()` against Offcanvas's step), and B7 (the event sentences) are carried in `plan.md` to J-INTEGRATION's prose pass.

RULING: accepted for landing on the probe and the landing chain's green
