# Unit flip-journeys-2 — finish U6 after the partition-scope ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U6 exactly as `/home/user/scaffold/tmp/codex/flip-journeys-brief.md` specifies (read it first, including its appended rulings and the Orchestrator rulings at its end), starting from the partial tree the first run left uncommitted, under the ruling in § The partition-scope ruling. The first run's report is `/home/user/scaffold/tmp/codex/flip-journeys-last.md` and its complete report `/home/user/veneer/tmp/units/flip-journeys/report.md`: read both for what is done, what is pending, and the measured values.

## State at launch

`git status --porcelain` reads three modified tracked files, all U6's: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`. Done: the nine face rows and six pair rows; the 23 `TAILWIND_READINGS` triples read identically across two setup runs at 1280 and 390 (row 23 reads `left` ×3 at 768); the engine-output equality over the three faces with six shown-popover switches (45 s); `check`, `lint:check`, `format:check` exit 0; the amended `test:setup:browser` 130 passed. Not done: the partition case (killed at the runner cap after 302 s in the case; its 300 s limit stood), the 390px header measurement, the amended full `test:journey` wall time, `test:app:browser`, `build:showcase`, the final gates on the latest edit. The baseline `test:journey` before the amendments read 314.30 s with 40 failures (the retired labels), so no budget reading exists yet.

## The partition-scope ruling

The first run stopped because the partition case ran past its 300 s limit: clause 5 attributes every departure on every showcase element through repeated CSSOM scans, which is the probe's job (`flip-probe-3`, two 1400 s runs), not a journey's.

Rulings:

1. **The partition case proves the delta clauses and nothing else.** On every showcase element that carries one or more of the 192 shared utility names or the 17 shared component names (`caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, `table`), at 1280 and 390: each shared utility reads, under `tailwindcss`, the Tailwind-alone value on every longhand Tailwind's rule for that name declares (the delta against Bootstrap alone where the two differ), and under `unexcluded` Bootstrap's value (the unlayered important wins); each shared component name reads Bootstrap's value under every face on every longhand Bootstrap's rule declares. Elements carrying no shared name are not read in this case. The exhaustive attribution of other departures (clause 5) leaves the journey: the probe and its audit own it, and the sheet's witness case and the integration witness case own component preservation. Controls stay: a planted `.mt-3` reading, the restored withheld important (a scratch sheet appending `.mt-3 { margin-top: 1rem !important }` turns the `tailwindcss` reading to 16px), the `unexcluded` face as the inverse, the stripped curation where a curated witness exists on the page.
2. **Read each composition once.** Compute the Tailwind-alone and Bootstrap-alone per-name longhand maps once per width from the record texts and the built sheet in scratch frames (`readClassLonghands`, `deriveClassDelta`), then read the page's elements once per face and width; no per-element CSSOM scan. Report the case's wall time; it must finish inside its own 300 s limit with margin, and the report states the measured seconds.
3. **One variant.** The partition case runs in the default variant only (light, both widths inside the case), because its readings do not depend on color mode or motion; the specimen-readings case keeps its variant coverage. State the variant selection mechanism you used (a project filter, a `describe.skipIf`, or the configuration the journey project already offers; no timeout raised).
4. **The budget** is read on the first green full `test:journey` run after the amendments: report the wall time against 235 s; an overrun is reported for the Orchestrator's ruling, not fixed by raising a timeout or removing a row.

## Scope deltas against the original brief

None beyond § The partition-scope ruling. The 390px header measurement, `test:app:browser` as an observation, `npm run build` then `npm run build:showcase` with the page digest reported, and every gate stand as written.

## Acceptance criteria

The original brief's list, bare, in order, each with its exit in the report: `npm run check`; `npm run lint:check`; `npm run format:check` (format only owned files first); `npm run test:setup:browser` green; `npm run build`; `npm run build:showcase` (digest reported, not committed); `npm run test:journey` green with the nine face rows and the wall time; `npm run test:app:browser` as an observation; `git diff --check`; `sha256sum dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

## Return shape

As the original brief, plus the partition case's measured wall time, its element and name counts per face and width, the variant mechanism, and the full journey wall time. Nothing committed.

## Deviation contract

As the original brief, with ruling 1 replacing the first run's stop; a case exceeding its own timeout after the ruling is still a stop (expected seconds, found, the case).
