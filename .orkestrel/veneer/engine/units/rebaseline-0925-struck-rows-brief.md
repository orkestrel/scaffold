# STRUCK-ROWS — find the evidence that closes each struck carried finding

## Role and engine

`grok` on Cursor Grok, read-only, in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Every path below is relative to `C:/Users/mikes/WebstormProjects/`.

## Objective

For each struck row listed in the following section, find the retained record or the Veneer test that meets the row's close condition, or report that none does. Do not rule. Return evidence.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/rebaseline-0925.md`, the struck rows (around lines 18 to 29).
- `scaffold/.orkestrel/veneer/engine/units/rebaseline-0925-records.md` item 4, each row's prior "Closes with" text.
- `scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E25, with every amendment.

## The rows

Each row names its close condition, then where to look. Search every file under `scaffold/.orkestrel/veneer/engine/units/` whose name starts with the unit prefix given, and the Veneer tests under `veneer/tests/src/browser/`. The Veneer checkout at `veneer/` is at `main` `0865c67`.

1. **Same-direction takeover, Offcanvas hide and Modal show.** Close: a case per door per engine, each read red first on Veneer `7fd28dc`. Look in `j-sameway-*` (reports, red logs, mutation logs, verdicts of every round) and in `veneer/tests/src/browser/Offcanvas.test.ts` and `Modal.test.ts`.
2. **Construction that leaves a holder.** Close: each engine's construction releases what it saved and claimed when a later construction step throws, with a case per engine. Look in `j-sameway-*` (round 2 and round 3 reports and verdicts, B5) and in the Veneer tests: each case whose title says it releases its claim when an option read throws during construction, or similar.
3. **Modal `#holdOpen` and `#releaseOpen`, Isolation's claims, and ScrollLock's holder set.** Close: each routes through the shared record, or a ruling says why one stays. Look in `j-holders-*` claims and both verdicts.
4. **`HostSnapshot`'s inline held-target shape.** Close: each shape is named once in `src/browser/types.ts`. Look in `j-holders-*` claims and both verdicts, and in `veneer/src/browser/types.ts`.
5. **The ScrollLock signal case and the ColorMode persist case.** Close: a signal case and a present-value case asserting `toBe(error)`, each read red under a mutation. Look in `j-holders-*` (round 2 report, mutation logs, both verdicts) and in `veneer/tests/src/browser/ScrollLock.test.ts` and `ColorMode.test.ts`. Name the mutation log line for each case, or say none names it.
6. **A stopped show after `isolation.destroy()`, and `backdrop.show()` after a reaction started `hide()`.** Close: each incoherent sweep point reads red first, under one invariant. Look in `j-sameway-*`, `j-reentry-*`, `j-snapshot-shared-*`, and in `veneer/tests/src/browser/Modal.test.ts`, `Offcanvas.test.ts`, and `Backdrop.test.ts`.
7. **Fixture lookups.** Close: one lookup helper, or the lookups' removal. Look in `scaffold/tmp/cursor/evidence/veneer-roadmap.md` around line 548, and in `veneer/tests/setupBrowser.ts` for `requireMatch`, and count the tests that still query fixtures some other way.
8. **J-CASCADE's part of the fade row.** Close: the shipped sheets, the false comments gone, a Popover `animated: true` case, a motion-factor case per fade engine and Offcanvas, and a trusted touch drag. Look in `j-cascade-*`, both verdicts and both reports, and in the Veneer tests.
9. **`ConfigSanitizer`'s walk on Chromium 141.** Close: a Chromium 141 reading of the sanitizer suite. Read `scaffold/.orkestrel/veneer/engine/units/rebaseline-0925-styles-141-sanitizer.txt`, which holds the styles session's pruned 141 logs.

## Output

One section per row:
- the close condition, quoted;
- **met**, **partly met**, or **not found**;
- the evidence, each item with `file:line`;
- for "partly met" or "not found", the exact missing piece.

Then a distillate of two lines at most per row. Then your unknowns. Cite a line only where you read it.
