# Unit U2-distill — successor brief 2

## What this supersedes

This brief supersedes `tmp/cursor/u2-distill-brief.md`, which stays in place unedited. Every section
of that brief stands except where this file amends it. Same role and engine: `grok` on Cursor
Grok 4.6 in `--mode=ask`, reading inside your own CLI, performing the assignment directly,
spawning nothing, editing nothing.

## Why a successor

Your first distillate (session `6bd3fb30-0f95-452e-a3f7-cb44d433f2f5`) reported that many `rest`
colour strings were interpolated mid-transition and that overlay `closed` rects were read while a
close was still running, and that `details-close` showed no motion. The Orchestrator corrected the
instrument (settle waits after every mode switch, state drive, and close; a close motion now opens,
waits 700 ms, then samples) and re-ran it as run 5 on 2026-09-20. Both `calibration.json` files
under `research/calibration/<browser>/` are run 5's; read those, not your memory of run 4.

## Amendments

1. Add to § Evidence a section `0. Settled check`: for every specimen and mode, whether the
   `rest` (or `closed`, or `disabled`) `color`, `background-color`, and `border-top-color` strings
   are token endpoints (an `oklch(...)` or `rgb(...)` or `rgba(...)` string) rather than
   interpolations (an `oklab(...)` string with more than three decimals, or a `color(srgb ...)`
   mix), and whether every overlay's `closed` rect is `0×0`. Name each row that still reads as an
   interpolation.
2. In the motion table, add for every motion the elapsed milliseconds of the last frame at which
   any sampled property changed, and whether the `reduced` pass still interpolated (more than one
   distinct intermediate value between the first and the settled frame).
3. Everything else stands: the six evidence sections, the distillate table, the unknowns, the
   journal line (return your session id there), and the deviation line.
