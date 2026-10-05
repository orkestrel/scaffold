# tokens-t4 report

Handed back by the Opus lane on 2026-10-05 (the harness refused the lane's own write of this file; the Orchestrator saved the handback verbatim).

## Summary

1. The guide has a Token map subsection with a 67-row token table (41 palette role groups and 26 scale rows). A writer under `tmp/units/tokens-t4/` generated it from `tokens.json`, and a guide case, `pins the guide token table to the token record`, pins it to the record with planted and removed rows as controls.
2. Items 6 to 9 are done in the worktree. Item 9's lead is pinned by an off-limits test, so `tests/app/browser/constants.test.ts:176` needs the patch at the end of this report, or `test:app:browser` fails on that case.
3. Every acceptance command exits 0: check, lint:check, format:check, test:guides (17 passed), test:policy (119 passed, 1 skipped), and `git diff --check`. Only the four owned files differ.
4. The consumer-theme sentences have no T2 case behind them. They rest on the T0 M2 run, confirmed with a Node compile against the shipped sheet. The `@custom-variant` sentence had no run, so a guide case compiles its fence.
5. Deviation contract: the harness refused the write of the report file; the full report follows.

The token table has 67 rows and is pinned to the record. Changing one table cell (`#155dfc` to `#155dfd`) fails the pin case: 1 failed, 16 passed. Every acceptance exit is 0 in `/home/user/.wave/veneer-t4`, and only owned files differ. Nothing is committed or staged.

## Touched files

- `guides/veneer.md`: § Tailwind compatibility sheet (the token prose and the Token map subsection: policy, table, proofs, consumer story); § Compare (the preflight record paragraph); § Showcase (the Header, Faces, Color mode limit, and Journey families token prose).
- `tests/guides.test.ts`: two cases, `pins the guide token table to the token record` and `compiles the dark variant fence onto the Bootstrap color mode attribute`.
- `ROADMAP.md`: the token round's landed entry, the census of 27 specimens, and the § Next later items.
- `app/browser/constants.ts`: the `tailwindcss` section lead only.

Diffstat against `eb06d35`: ROADMAP.md 10, app/browser/constants.ts 2, guides/veneer.md 463, tests/guides.test.ts 88; 4 files, 443 insertions, 120 deletions. Most of the guide count comes from the formatter re-padding the Faces table and from reflowing edited paragraphs to 100 columns.

## The token table

- Grouping: palette rows that name a Tailwind token (59) are grouped by the role their origin names; a `base(NAME)` row becomes `--bs-NAME` with its value in both modes; `step(MODE:ROLE)` rows become `--bs-ROLE` with the light cell from the `light:` row and the dark cell from the `dark:` row; a dash marks a mode with no step row (`--bs-body-color` and `--bs-code-color` in light mode); the 26 scale rows follow in record order with Bootstrap's literal as the origin; the 67 palette rows that are amount derivations are not in the table and the prose points to the record's `amounts` list.
- Writer: `node --experimental-strip-types tmp/units/tokens-t4/write-table.ts` prints `{"roles":41,"scale":26,"rows":67}`. The guide table equals its output once padding is ignored.
- Pin: the case derives the rows independently of the writer, checks equality and the row count of 67; the planted and removed guides both read unequal.
- Policy: the table's opening paragraph states V § 2 in four sentences.

## Consumer story: each sentence and its evidence

- Consumer `--font-sans`, `--radius-md`, and `--shadow-md`: `--font-sans` reaches the body and a `btn` button, `--radius-md` moves the button's radius from 6 to 12 px, and `--shadow-md` reaches `--bs-box-shadow`. Evidence: the T0 M2 run (2026-10-04, Chromium 141.0.7390.37, `out/m2.json`). No T2 case reads a consumer theme. A Node compile on 2026-10-05 against the shipped sheet (`9a20b966…`) confirms the chain: the consumer's three values are emitted and the sheet references them through `var(--font-sans, …)`, `var(--radius-md, 0.375rem)`, and `var(--shadow-md, …)`; output `tmp/units/tokens-t4/consumer-reading.json`.
- Consumer `--color-blue-600` leaves `.btn-primary` at `rgb(21, 93, 252)`: the same M2 run; the same compile reads `--bs-btn-bg: #155dfc` with no `var(--color-blue-600` reference.
- `prefix(tw)` falls back to Tailwind's defaults: M2.
- The `@custom-variant dark` line (Color mode limit subsection): no case or run existed, so the case `compiles the dark variant fence onto the Bootstrap color mode attribute` compiles the guide's fence with Tailwind 4.3.3 and reads the `data-bs-theme` attribute selector and no `prefers-color-scheme`; the compile without the line is the control; changing the fence to `data-theme` fails the case (1 failed, 16 passed).
- The four breakpoint bands: `differs from Bootstrap alone by the token table and nothing else` reads the departures at 576, 639, 992, 1023, 1200, 1279, 1400, and 1535 px; `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint` covers 640 to 1536 px with 600 px as the control; `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints` reads 40 px at 1279 px with 41.2 px as the control; `changes alignment at each mapped sm boundary under every face` reads 575, 576, 639, and 640 px.
- Gray collapse: the record rows `base(gray-400)` and `base(gray-300)` both resolve to `#d1d5dc`; the `.alert-dark` text reads 5.133 against Bootstrap's 5.472, from `keeps every union text pairing at its floor and every adjacent surface distinct` (T2 `contrast.json`).
- Wide gamut: seven named hue bases lie outside sRGB, and the clip moves `yellow-500` by OKLab 0.0225; evidence: a computation on 2026-10-05 over `palette.json`, output `tmp/units/tokens-t4/gamut-reading.txt` (7 of 10 outside, 0.0225), which reproduces the design round's figure. No case pins it.
- sRGB pixels unchanged: T0 M7 (2026-10-04, Chromium 141.0.7390.37), six pairs with a per-channel difference of 0.
- Separation floor of 1.05 and the three inherited pairings (1.019 against 1.025, 1.23 against 1.29, 1.045 against 1.054): the same contrast case, rows marked `inherited: true`.
- Palette source: `resolves every palette row from the installed Tailwind theme as Chromium serializes it`.

## Law citation

The guide names the Prohibitions section of the `.claude/rules/styles.md` rule in `@orkestrel/scaffold` as governing a derived build's switches, and records `$palette` and `$scale` there. It quotes no sentence. The installed scaffold 0.0.90 copy lacks that clause; scaffold `main` has it at lines 74 to 76.

## Items 6 to 9: exact changes

- Item 6 (`guides/veneer.md` lines 2105 to 2121): the neutrality sentence is replaced verbatim by "The chrome departs between faces only by the token rows: in the light-mode header, the layered face has 134 palette and 16 font departures at 390, 768, and 1280 px, plus 50 font-related geometry departures at 390 px and 60 at 768 and 1280 px; the unexcluded face has no remaining departure after the existing exclusions." followed by "A header probe read those counts in two byte-identical runs on 2026-10-04 in Chromium 141.0.7390.37." The neutrality case is restated as attributing departures to palette, scale, or font-geometry rows after its existing exclusions, with the planted `px-3` control. A sentence covers the header-button contrast case under each face (`reads every header button at 4.5:1 or more, pressed or not, in both color modes`), which also reads the four contrast subjects. The counts were re-read in T3's `out/p4.json` (layered face: palette 134, font 16, geometry 50/60/60; unexcluded face: 0 remaining); `cmp` of the two P4 runs exits 0.
- Item 7: line 1292, the `tailwindcss` column changes from `1140px` to `1280px`; lines 1301 to 1304 give the two causes of `1280px`; line 2215, the Faces container cell changes from `12px`, `1140px`, `none` to `12px`, `1280px`, `none`; lines 2224 to 2229, six Faces rows with the B, U, and L values from `TAILWIND_READINGS` (Link in a Bootstrap alert, light and dark; Bootstrap table with bare cells, light and dark; Primary button, page link, and focus ring; Primary table colors; Radius and shadow scales; Mapped sm breakpoint, 576 / 576 / 640 px); lines 2200 to 2205 name the cases `changes alignment at each mapped sm boundary under every face` (575, 576, 639, 640 px) and `paints and clears the mapped focus halo through Tab under every face and theme`.
- Item 8 (`ROADMAP.md` line 144): "the Tailwind group holds 23 specimens read under each face," becomes "the Tailwind group holds 27 specimens read under each face, four of them the token round's,"; the census is the list of 27 titles in `tests/app/browser/sections/integration.test.ts:186`.
- Item 9 (`app/browser/constants.ts` line 534): the lead becomes `'Bootstrap markup and Tailwind utilities under the three faces, from bare elements through curated components and the utility names both systems declare to the tokens the layer maps.'`; `showcase/browser.html` is not rebuilt.

## Roadmap lines

- § Sequence, Tailwind bullet: a landed entry: the token round landed 2026-10-05 in units T1 to T4 under the user's 2026-10-04 ruling; it covers the switches, the record counts (126 palette, 26 scale, 27 kept, 105 amount rows), hex colors, `var()` references for scales, and breakpoints aligned to `40rem` to `96rem` with the type cap and modal widths kept; digests `./bootstrap` `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` and the tuned sheet `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb`; `preflight.json` at 2793 rows and the guide table pin. No showcase digest and no commit hash.
- § Next: the bullets replace the "next chunk is the token round" paragraph: a Sass `$palette` for Sass consumers; the `oklch()` output form; the journey tuning chunk, which the user's 2026-10-04 ruling gives this lane, with drivers from the 2026-10-04 journey (449 and 487 s: scrollspy-390 at 60 to 79 s, paired engine states at 41 to 75 s, partition at 67 s, carousel at 59 s) and from T3's final journey on 2026-10-05 (761.76 s: preservation at 135.43 s, paired engine states at 82.27 and 85.83 s at 1280 px and 24.25 and 53.77 s at 390 px, partition at 84.29 s).

## Other corrections, each pinned

- Renamed cases: the guide uses the T2 names `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else` (with its token controls listed) and `pins every curation witness against the tuned sheet alone and rejects each removed repair` (with the `navbar-text` lifted-baseline control).
- Stale numbers in rewritten sentences: scoped copies 7 becomes 8 (`tests/src/tailwindcss/index.test.ts:418`); recipe statements 8568 becomes 8573 (`tests/conformance.test.ts`, `toHaveLength(8573)`).
- Body color and baseline: the body color changes from `rgb(33,37,41)` to `rgb(3, 7, 18)`, and the reboot-only readings compare against the `./tailwindcss` sheet alone (`tests/integration.test.ts:513-515`).
- § Compare preflight paragraph: 2793 rows (792 bare, 2001 pseudo) with the `./tailwindcss` sheet alone as the baseline; edited because T2's regeneration made the old 2595/678/1917 figures false.
- Partition sentence: describes the unmapped container control in T3's final tree (`/home/user/veneer/tests/app/browser/integration.test.ts:1553-1573`, matching V § 5 as amended 2026-10-05); that control is absent from `eb06d35`, so the sentence is true only after the merge onto T3's final tree.
- Left as found: the guide cites `reads every Tailwind reading the caption claims under the three faces`, but the test title adds ` in %s color mode` (`tests/setupBrowser.test.ts:900`).

## Shared-file patch (not applied; the file is off-limits)

Saved at `tmp/units/tokens-t4/constants.test.patch`; the file is identical in `eb06d35` and in T3's checkout.

```diff
--- a/tests/app/browser/constants.test.ts
+++ b/tests/app/browser/constants.test.ts
@@ -173,7 +173,7 @@
 		const section = SECTIONS.find((entry) => entry.id === 'tailwindcss')
 		expect(section?.title).toBe('Tailwind on Bootstrap markup')
 		expect(section?.lead).toBe(
-			'Bootstrap markup and Tailwind utilities under the three faces, from bare elements through curated components to the utility names both systems declare.',
+			'Bootstrap markup and Tailwind utilities under the three faces, from bare elements through curated components and the utility names both systems declare to the tokens the layer maps.',
 		)
 	})
```

## Tests and proof

- Two cases: `pins the guide token table to the token record` and `compiles the dark variant fence onto the Bootstrap color mode attribute`. The prose landed first, so neither case failed before its text; each can fail under a mutation run (1 failed, 16 passed for each), and the guide was restored byte for byte.
- Probes: both probes are deleted; the variant half was promoted into the second case; the outputs remain as evidence in `consumer-reading.json` and `gamut-reading.txt`. The consumer-theme reading and the gamut figure have no case; closing them needs a Chromium case for a consumer `@theme` and a gamut helper in `tests/setup.ts`, both outside this unit's files.

## Acceptance (worktree, npm 11.21.0)

Logs in `tmp/units/tokens-t4/acceptance-final/`.

| Command | Exit | Seconds | Result |
| --- | --- | --- | --- |
| `npm run check` | 0 | 95.154 | No diagnostics |
| `npm run lint:check` | 0 | 2.051 | No diagnostics |
| `npm run format:check` | 0 | 7.800 | 359 files formatted |
| `npm run test:guides` | 0 | 4.128 | 17 passed (15 before this unit) |
| `npm run test:policy` | 0 | 4.618 | 119 passed, 1 skipped; prose sweep clean |
| `git diff --check` | 0 | – | No output |
| `git status --porcelain` | 0 | – | Owned files only |

After a final edit to the roadmap bullets, `format:check`, `test:guides` (17 passed), and `test:policy` (119 passed, 1 skipped) were re-run; all exit 0 (`*-after-bullets.log`). Per the launch ruling, no browser suite, `test:app:browser`, or `build:showcase` ran in the worktree.

`git status --porcelain`: ` M ROADMAP.md`, ` M app/browser/constants.ts`, ` M guides/veneer.md`, ` M tests/guides.test.ts`.

## Deviation state

- One condition fired: the harness refused the report write; this file is the Orchestrator's save of the handback.
- `findDrift`: no drift; test:guides passes 17 of 17.
- V § 7 claims: every claim has a case or a run behind it; the two that rest on runs rather than cases are the consumer-theme sentences (T0 M2) and the wide-gamut figure (the 2026-10-05 computation).
- README: the pitch and the guide tagline are unchanged and still equal.
