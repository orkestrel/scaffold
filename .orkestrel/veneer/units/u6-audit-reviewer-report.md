# U6 audit — objective lane (reviewer, native Opus 5, 2026-09-20, 588 s)

Judged against `test/units/u6-diff.patch.txt`, the live checkout, the retained logs, and the design
as amended by `u6-design-verdict.md`.

## Per-claim verdicts

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `types.ts:192-198`; `constants.ts:204` alphabetical after `IMPLICIT_ROLES`; `index.ts:25-28` star-exports. |
| 2 | CONFIRMED | `cdp(` once at `helpers.ts:504`; `readProperty` `:505`; `invokeUnchecked` `:512`; refusal at `:507` and `:510`; `Promise<void>`. |
| 3 | CONFIRMED | overloads `:527`/`:541`; body `:542-544` is `userEvent.hover(resolveRendered(first, second))`; voices unchanged (`helpers.test.ts:922-931`). |
| 4 | CONFIRMED | `:582-583` double-hold refusal; `:585-588` scale; `:589-597` payloads; `:598` marker; `:600-603` read-back, release, refuse; covered case leaves no marker (`helpers.test.ts:1026-1033`). Ordering caveat in finding 14. |
| 5 | CONFIRMED | `:621-622` read and remove; `:623-632` conditional `mouseReleased`; `:634` unconditional `mouseMoved`; idle release resolves (`:1070-1073`); hook adds no second button-up (`:1104-1114`). |
| 6 | CONFIRMED | `:2326-2334` `::` check before `CSS.supports`; `:2335` read; `readPixels` forwards `:2408-2410`; ordering pinned at `helpers.test.ts:3197-3206`. |
| 7 | CONFIRMED | `:2598-2624` and `:2641-2644` as claimed; `print: false` pushes no query. Findings 16 and 21. |
| 8 | CONFIRMED | hooks `:219-220`; every named case present at the cited lines. |
| 9 | CONFIRMED | red logs at `:17-19`/`:19-21`; no plant text; post-removal whole-project green at `u6-2-test-src.log:53-54`. Findings 19 and 20 record what the receipts do not establish. |
| 10 | CONFIRMED | Surface rows `guides/test.md:264, 289, 305-308, 347, 348` byte-equal to doc blocks; signature cells `:357`, `:362`; Voices `:1082-1088`; Limits `:1574-1582`; Bounds `:1606-1624`; fences transcribed at `helpers.test.ts:945`, `:3169`, `:3339`, routed at `tests/setup.ts:75-77`. |
| 11 | CONFIRMED | search over 51 hosted guides, no match; report `:14` records it. |
| 12 | CONFIRMED | six files exactly; no forbidden syntax; `!` occurrences are logical negations; no nested function or new module helper. |
| 13 | UNDECIDABLE | read-only lane; Chromium browser run corroborated by `u6-2-test-src.log`; other gates rest on the report table; Edge not evidenced in the unit's own logs. |

## Findings outside the claims

14. `holdAccessible` scrolls (`resolveAccessible` → `scrollIntoView`, `:364`) before it refuses a
    double hold (`:581-583`); a second hold on an off-screen control scrolls under the held pointer.
    Read and refuse the marker first.
15. The `POINTER_HOLD` marker is parked after `mousePressed` (`:590-598`); a rejected send or an
    abort between the statements leaks a held button with no marker. Park the marker before the
    press; let the release tolerate a marker whose press never landed.
16. `stageMedia` and `releaseMedia` replace the whole override set (`:2608-2617`, `:2642`), so a
    provider-configured `colorScheme`, `forcedColors`, or `reducedMotion` override is cleared.
    Carry unnamed axes through as re-sent features, or state the clobber as a bound naming the axes.
17. The `releaseMedia` summary ("Restores the browser provider's own medium and media preferences",
    `:2630`, guide `:348`) contradicts its remarks (`:2634-2636`, "An earlier override is not
    restored") and is false under finding 16. State what the reset restores.
18. `motion: !reduced` at `helpers.test.ts:3394` and `:3405` stages the host's own preference, so
    the restore assertions at `:3401` and `:3412` cannot fail. Stage `motion: reduced`.
19. `PLANT-SCALE` edited the unscaled assertion's expected value (`u6-plant-scale-red.log:27-31`
    at `helpers.test.ts:970`) rather than the source's `* scale`; the mapped-hold assertion at
    `:1031` carries no receipt. Plant `scale = 1` in the source and record that assertion red.
20. The retained green log (`u6-browser-green.log`, 05:48:28) predates the plant runs (05:49:05,
    05:49:15) and carries the removed tags; after the rename the focused `-t 'PLANT-…'` commands
    match nothing. No control has a red-then-green pair on one command.
21. No case proves the print axis survives a motion-only stage (`:2607` is unexercised in that
    direction).
22. Diagnostic residue: `console.log('U6 hold', …)` at `helpers.test.ts:962-969` and
    `console.log('U6 media restored', …)` at `:3362-3369` ship in the suite and print in every run.
23. The assertions inside the two `it.fails` sentinel bodies (`:1085`, `:3395`) cannot fail the
    suite; they were added to clear `vitest(expect-expect)`. Record the gap where the reader meets it.
24. `guides/test.md:1625` blank line splits the Bounds list. Cosmetic.

## Referrals

None.

Verdict: fix round — 13, plus findings 15, 16, 17, 18, 19, 20, 22.
