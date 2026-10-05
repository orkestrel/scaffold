# tokens-t4 fix pass: all 15 confirmed findings disposed; the gamut helper reproduces 7 and 0.0225

Handed back by the Opus lane on 2026-10-05 after the review (`review/t4-review.json`); saved verbatim by the Orchestrator.

All 15 confirmed findings are fixed in `/home/user/.wave/veneer-t4`. The gamut helper reproduces the figures exactly: 7 of the 10 hue bases lie outside sRGB, and `yellow-500` moves by OKLab 0.0225 (to four decimals), so the item did not stop. Every acceptance command exits 0 except `npm run test:setup`, which fails 2 of 156: both are cases in `tests/setupServer.test.ts`, untouched, failing with `ENOENT` on `dist/src/tailwindcss/index.css`, which the worktree never built. With T3's built `dist/` (sheet `9a20b966…`) linked in temporarily, the same command passes 156 of 156; the link is removed. Nothing is committed or staged. The base is `eb06d35`.

## Review disposition

| Finding | What changed |
| --- | --- |
| 1, 6, 8, 13 (contrast floor) | `guides/veneer.md:1677`, the paragraph is rewritten. Every text pairing reads at or over the lesser of Bootstrap's own ratio and 4.5:1. Adjacent surfaces separate at 1.05 or more. The three inherited pairings are the exception, named in the same sentence: 1.019 against 1.025, 1.23 against 1.29, and 1.045 against 1.054. This matches T2's case, which sets the floor to `Math.min(bootstrap, 4.5)` (1.05 for surfaces) and exempts the three `inherited` ids. The case citation follows the sentence. |
| 2 | `guides/veneer.md:1514`, the policy sentence. A role token takes the step its role names in each color mode. A hue's base takes the step that keeps every shipped pairing at or over the lesser of Bootstrap's ratio and 4.5:1, apart from the three inherited pairings. Otherwise it takes the nearest step by OKLab distance. The policy is four sentences. |
| 8 | `guides/veneer.md:1674`: "keeps its text at" becomes "reads its text at". |
| 3, 10 (law citation) | `guides/veneer.md:1533-1538`. The Prohibitions section of `.claude/rules/styles.md` in `@orkestrel/scaffold` admits a derived build's substitution of the framework's token literals under a switch the guide records. The guide says the clause has been on scaffold `main` since 2026-10-05 and ships in the release after 0.0.92, and that 0.0.92 and every earlier release lack it, as read on 2026-10-05. Evidence: `4e94add7` (2026-10-05) added lines 77 to 81; the 0.0.92 release commit `333c7ee2` is an ancestor of it, and `git show 333c7ee2:.claude/rules/styles.md` has 0 matches. The earlier report's "lines 74 to 76" was wrong; those lines hold the reset clause. |
| 4, 11 (roadmap journey) | `ROADMAP.md:175` cites T3's sixth pass from `report-5.md`: the final journey of 2026-10-05 at 858.59 s, preservation 148.99 s at `light-1280`, paired engine states 90.33 and 86.57 s at 1280 px and 25.50 and 55.15 s at 390 px, and partition 143.16 s. |
| 5 | All six citations carry the full title `reads every Tailwind reading the caption claims under the three faces in %s color mode`: lines 1289 to 1292, 1500, and 2207. |
| 7 | `guides/veneer.md:1694-1697`, the M7 sentence: six Tailwind utilities beside "the Bootstrap elements that carry the same mapped step, five components and a `--bs-teal` swatch". |
| 12 (consumer theme) | Case `reaches the sheet from a consumer theme through font, radius, and shadow references and never through a color` (`tests/guides.test.ts:174`). It compiles the tuned sheet from `src/tailwindcss/index.scss` into a scratch file, then compiles the recipe over it with an `@theme` block setting `--font-sans`, `--radius-md`, `--shadow-md`, and `--color-blue-600`. It reads the three consumer values beside the `var(--font-sans,`, `var(--radius-md, 0.375rem)`, and `var(--shadow-md,` references. It reads `--bs-btn-bg: #155dfc;` with no `var(--color-blue-600` and no `#ff0000`. Under `prefix(tw)` it reads `--tw-font-sans` and no unprefixed `--font-sans`, `--radius-md`, or `--shadow-md`. The guide prose (`1645-1655`) cites this case instead of "the token probe" and drops the M2 Chromium numbers. |
| Gamut (ruled in) | `tests/setup.ts` gains `TokenGamut` (line 42), `readTokenLinear` (469), and `measureTokenGamut` (496), with TSDoc. `convertTokenColor` (447) calls `readTokenLinear`, so the conversion math exists once; the per-row rounding check over all 288 palette rows still passes. Proof in `tests/setup.test.ts:88`: in-gamut blue reads under 0.001, `yellow-500` reads outside at `0.0225`, zero lightness reads `{ outside: false, distance: 0 }`, and a hex value is refused. Guide case `reads seven hue bases outside sRGB and the farthest clip on yellow-500` (`tests/guides.test.ts:205`) pins the seven named tokens, `yellow-500` as farthest, and `0.0225`. The guide (`1690-1693`) cites the case instead of a computation. |
| 14 | `guides/veneer.md:2114-2117`: the faces are named `tailwindcss` and `unexcluded` in backticks, and the sentence ends "after the exclusions the neutrality case declares". |
| 15 | Each code token at the listed places takes a following noun: "the `dark:bg-black` class under the `:where(...)` selector" (2344), "Under the `@import 'tailwindcss' prefix(tw)` form" (1651), "The `./bootstrap` sheet keeps SHA-256" (`ROADMAP.md:143`), and "A Sass `$palette` switch" (`ROADMAP.md:173`). |
| 9 and the refuted items | Unchanged, as ruled. The second fence case and the § Compare edit stay. The `constants.test.ts` patch and the showcase rebuild are the Orchestrator's at merge; the patch is at `tmp/units/tokens-t4/constants.test.patch`. |

One correction beyond the findings: a probe showed that under `prefix(tw)` Tailwind emits only `--tw-font-sans`, through `--tw-default-font-family`, and emits neither `--tw-radius-md` nor `--tw-shadow-md`. The guide says only that no unprefixed variable is declared, which is what the case asserts. The probe is deleted.

## Mutation runs on the final files

Each run's log is in `tmp/units/tokens-t4/mutations/`, and every file was restored and checked with `cmp` exit 0.

- Planted reference: appending `.btn-primary { --bs-btn-bg: var(--color-blue-600, #155dfc); }` to the scratch sheet fails the consumer case (exit 1; 1 failed, 18 passed).
- Changed consumer value: setting `--radius-md` to `0.5rem` in the case's theme fails the consumer case (exit 1; 1 failed, 18 passed).
- Gamut bound: reducing the helper's gamut test to `channel > 1` only fails the seven-hue case (exit 1; 1 failed, 18 passed).
- The earlier table-cell and fence mutations still hold for the two cases from the first pass.

## Acceptance (in order, npm 11.21.0)

Logs in `tmp/units/tokens-t4/acceptance-review/`.

| Command | Exit | Seconds | Result |
| --- | --- | --- | --- |
| `npm run check` | 0 | 71.599 | No diagnostics |
| `npm run lint:check` | 0 | 1.766 | No diagnostics |
| `npm run format:check` | 0 | 4.648 | All 359 files formatted |
| `npm run test:setup` | 1 | 20.119 | 2 failed, 154 passed: the two `setupServer.test.ts` cases, `ENOENT` on the unbuilt `dist/` |
| `npm run test:setup` with T3's `dist/` linked | 0 | – | 156 passed (`test:setup-with-t3-dist.log`) |
| `npm run test:guides` | 0 | 4.105 | 19 passed (17 before this pass) |
| `npm run test:policy` | 0 | 3.762 | 119 passed, 1 skipped |
| `git diff --check` | 0 | – | No output |
| `git status --porcelain` | 0 | – | Owned files plus `tests/setup.ts` and `tests/setup.test.ts` |

`git status --porcelain`: ` M ROADMAP.md`, ` M app/browser/constants.ts`, ` M guides/veneer.md`, ` M tests/guides.test.ts`, ` M tests/setup.test.ts`, ` M tests/setup.ts`.

`git diff --stat` against `eb06d35`: ROADMAP.md 10, app/browser/constants.ts 2, guides/veneer.md 499, tests/guides.test.ts 152, tests/setup.test.ts 15, tests/setup.ts 79; 6 files changed, 611 insertions, 146 deletions.

The rest of the earlier report stands: the 67-row table and its pin, items 6 to 9, the other corrections, and the `constants.test.ts` patch. Two of its cells change: the consumer-theme and wide-gamut rows of the consumer-story table cite the new cases in place of runs. The "no `prove` tool" note still applies.

## Deviation state

No stop condition fired. The gamut item reproduced its figures, the `findDrift` gate passes 19 of 19, and every write succeeded. Two claims in the guide rest on runs outside the repository: the M7 sRGB pixel reading (T0, 2026-10-04) and the header probe counts (T3's P4, 2026-10-04); both stay as ruled.
