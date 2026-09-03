1. **UNRESOLVED.** earlier lane

2. **UNRESOLVED.** earlier lane

3. **UNRESOLVED.** earlier lane

4. **UNRESOLVED.** earlier lane

5. **UNRESOLVED.** earlier lane

6. **UNRESOLVED.** earlier lane

7. **UNRESOLVED.** earlier lane

8. **UNRESOLVED.** earlier lane

9. **UNRESOLVED.** earlier lane

10. **UNRESOLVED.** earlier lane

11. **UNRESOLVED.** earlier lane

12. **UNRESOLVED.** earlier lane

13. **UNRESOLVED.** earlier lane

14. **UNRESOLVED.** earlier lane

15. **CONFIRMED.** Attack: a re-filmed 390 frame whose floor is `rgb(255, 255, 255)` on a dark variant (the runner's page), a height pin against the pane rather than the document, or a truncation control that would still pass a body-tall frame ending on that canvas. All six 390 rows in `frames.txt` read width 390, height 1192 or 1717–1719 (not 844), and floor `rgb(33, 39, 44)` dark / `rgb(248, 249, 249)` light — never canvas white; trailing uniform rows of that floor are 33–35. The three dark-390 PNGs show the surface from the navbar through empty-state step 3 / TIV with no white band. `place` records `document.documentElement.scrollHeight` and `style(document.body, 'background-color')` (`integration.test.ts` 197–199); the capture proof pins `frame.height >= shot.height` and `frame.floor === shot.background` (496–498). The floor comparison is the truncation control: a pane-clipped frame of this surface ends on `rgb(255, 255, 255)` against a body that is not that color.

16. **UNRESOLVED.** earlier lane

17. **UNRESOLVED.** earlier lane

18. **UNRESOLVED.** earlier lane

19. **UNRESOLVED.** earlier lane

20. **CONFIRMED.** Attack: a fixture taller than the declared pane whose last row is the runner's canvas, or a viewport after `releasePane` that is still the staged size. `captureFrame` (`helpers.ts` 2020–2059) stages at `options.height`, then restages at `measureContent()` (floored at that height, growth carried) until pane and edge agree, and `await releasePane()` in `finally`; `releasePane` (1951–1959) resizes from the `<width>x<height>` stored before the first staging. `helpers.test.ts` 1923–1940 plants 1600 px of `html { background: rgb(0, 128, 0) }` against a 390×844 pane and requires `reading.height === 1600` and `floor === 'rgb(0, 128, 0)'` — without the restage that floor is `CANVAS_COLOR` white. 1843–1854 reads `[innerWidth, innerHeight]`, stages 390×844 then 390×1200, releases, and requires the same pair; without the hand-back the second staging would leak.

21. **CONFIRMED.** Attack: a missing `@orkestrel/test/browser` export, a Surface table without the row, printed fence values with no assertion, or no test on a written frame / missing path. `package.json` `./browser` points at `dist/src/browser/index.js`, which exports `readFrame`; `index.d.ts` declares `FrameReading` (760) and `readFrame` (1226). Source matches: `types.ts` 52–59, `helpers.ts` 2084, barrel `export *`. `guides/test.md` 217 and 287 are the Surface rows; 2590–2608 prints `390`, `844`, and `'rgb(0, 128, 0)'`. `tests/setup.ts` 79 routes that heading to `helpers.test.ts`, which asserts those three values on a written frame (2053–2060) and refuses a missing path with `Capture frame at ${absent} could not be read` (2084–2086).

22. **CONFIRMED.** Attack: a 390 variant still at 1900, a 390 frame whose floor is the runner on a dark variant, a local decoder, or a census/escape control that never joins the walked root. `VARIANTS` declares `{ width: 390, height: 844 }` for both 390 names (`integration.test.ts` 97–98). The capture proof imports `readFrame` from `@orkestrel/test/browser` (22) and calls `await readFrame(path)` (494); `setup.ts` has no `Image` / `OffscreenCanvas` / `readFrame` helper (`fix-terrain.status` is the lockfile pair only). Every 390 frame in `frames.txt` ends on the surface floor, not `rgb(255, 255, 255)`. The census extraction control is an SVG `ABSENT_MARK` appended to `host` before `readClasses(host)` (351–353); the escape control is a `p` with `ESCAPE_DECLARATION` appended to the same `host` before `extractStyles(host)` (342–347).

VERDICT: FAIL — 0 broken, 18 unresolved, 0 not-evidenced, 0 findings outside the claims
