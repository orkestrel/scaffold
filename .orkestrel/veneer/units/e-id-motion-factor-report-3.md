# Unit E-ID-MOTION-FACTOR round 3 report

## Items

1. `_progress.scss`, `--bs-progress-bar-transition` comment.
   - Before: "The fill's width change is feedback to the value the bar reports, so its transition
     reads the feedback token scaled by the release's own ratio to it, and keeps the release's
     curve; the motion factor reaches it only through that token."
   - After: "The fill's width change is feedback to the value the bar reports, so its transition
     reads four times the feedback token on the release's curve, and the motion factor reaches the
     transition only through that token."

2. `_form-floating.scss`, header comment sentence.
   - Before: "The label's lift is feedback to the control's own input, so its transition reads the
     feedback token scaled by the release's own ratio to it, the way the height reads a multiple of
     a space token, and the motion factor reaches it only through that token."
   - After: "The label's lift is feedback to the control's own input, so its transition reads the
     feedback token scaled by the release's own ratio to that token, the way the height reads a
     multiple of a space token; the motion factor reaches the transition only through the feedback
     token." Reflowed the surrounding paragraph at 100 columns without changing another word.

3. `_pagination.scss`, transition comment.
   - Before: "The curve stays the release's `ease-in-out`, because `--vn-ease-standard` resolves to
     `ease`."
   - After: "The curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to."
     Reflowed the comment at 100 columns without changing another word.

4. `guides/veneer.md` § Factors, the "A scaled duration reads" sentences.
   - Before: "A scaled duration reads a `--vn-motion-*` token or a multiple of one, so it doubles
     from its own resting value at a factor of `2` and starts no transition at a factor of `0`. At a
     factor of `1`, a scaled duration that keeps the release's timing resolves to the release's
     value, and one § Departures records against the release, such as the `.icon-link` transform's,
     resolves to its token's value."
   - After: "A scaled duration reads a `--vn-motion-*` token, alone or scaled by a fixed ratio, so it
     doubles from its own resting value at a factor of `2` and starts no transition at a factor of
     `0`. At a factor of `1`, it resolves to the value its token and ratio give, which is the
     release's duration wherever Veneer keeps that duration. § Departures records each scaled
     duration that differs from the release's, such as the `.icon-link` transform's, and §
     Additions records each transition the release does not write." Kept the paragraph's first
     sentence and re-wrapped the paragraph at 100 columns.

5. `guides/veneer.md`, following paragraph.
   - Before: "...keeps the root's lengths, because a custom property..."
   - After: "...keeps the root's lengths and durations, because a custom property..." Re-wrapped the
     paragraph at 100 columns.

6. `tests/setupBrowser.ts`, `sweepMotionFactor` `@throws` text.
   - Before: "Thrown when the drive throws, with the drive's own error, after the factor and the
     scene are restored."
   - After: "Thrown when the drive throws, with the drive's own error, after the factor is restored
     and the scene is cleared."

7. Motion-factor cases in `form-floating.test.ts`, `progress.test.ts`, `navbar.test.ts`, and
   `fade.test.ts`.
   - Before: each case called `requireValue(resting, …)` / `requireValue(doubled, …)` (or, in
     `fade.test.ts`, `requireValue(resting?.[0], …)`) with no presence assertion.
   - After: each case now writes `expect(resting).toBeDefined()` before `requireValue(resting, …)`
     and `expect(doubled).toBeDefined()` before `requireValue(doubled, …)`; `fade.test.ts` writes
     `expect(resting?.[0]).toBeDefined()` before its `requireValue(resting?.[0], …)`. No other line
     in those cases changed.

## Plant reading

Set both `_form-floating.scss` label-transition durations from `calc(var(--vn-motion-feedback) /
1.5)` to `0s`, rebuilt, and ran `form-floating.test.ts`. The motion-factor case failed with
`AssertionError: expected undefined to be defined` at the new `expect(resting).toBeDefined()` line
(`mfac-instruments/r3/mfac-3-plant-zeroed.log.txt`). Restored `_form-floating.scss` byte-identically
(confirmed with `diff`) and rebuilt; the rebuild exited `0`.

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| Build | `npm run build:src:styles` | 0 | `mfac-instruments/r3/mfac-3-build.log.txt` |
| Plant build | `npm run build:src:styles` (after zeroing) | 0 | `mfac-instruments/r3/mfac-3-plant-build.log.txt` |
| Plant test | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-floating.test.ts` | 1 (expected failure) | `mfac-instruments/r3/mfac-3-plant-zeroed.log.txt` |
| Restore build | `npm run build:src:styles` (after restore) | 0 | `mfac-instruments/r3/mfac-3-build-restore.log.txt` |
| Owned styles tests | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/{form-floating,progress,navbar,fade}.test.ts` | 0 | `mfac-instruments/r3/mfac-3-styles-owned.log.txt` |
| Format | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | `mfac-instruments/r3/mfac-3-oxfmt.log.txt` |
| Typecheck | `npm run check` | 0 | `mfac-instruments/r3/mfac-3-check.log.txt` |
| Lint | `npm run lint:check` | 0 | `mfac-instruments/r3/mfac-3-lintcheck.log.txt` |
| Setup browser | `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | 0 | `mfac-instruments/r3/mfac-3-setupbrowser.log.txt` |
| Guides parity | `npm run test:guides` | 0 | `mfac-instruments/r3/mfac-3-guides.log.txt` |
| Policy | `npm run test:policy` | 0 | `mfac-instruments/r3/mfac-3-policy.log.txt` |

Every log carries its command, exit status, and `/proc/loadavg` reading.

## Artifacts

- `mfac-3.diff` — `git diff b613ae4`, the accumulated diff over rounds 1 through 3.
- `mfac-instruments/r3/mfac-3-delta.diff` — this round's changes alone, against the round-start backups under
  the unit worktree's `tmp/units/backup/`.
- `mfac-instruments/r3/mfac-3-status.txt` — `git status --porcelain` after this round.
