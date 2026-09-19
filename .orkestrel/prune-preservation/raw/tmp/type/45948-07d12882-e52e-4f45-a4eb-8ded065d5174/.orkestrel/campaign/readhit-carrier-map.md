# readHit audit carrier map

Grok4.6 session 7231bb54-555d-42a7-a7de-96c67acf9ab3, duration 234485ms; journal tmp/cursor/readhit-carrier.jsonl. Evidence only.

I'll read the brief and the scaffold contracts it depends on, then gather the evidence it asks for.Authority is loaded. Next I’ll read the debrief skill, seed files, and hit-testing guides before mapping the retained audit.The test tree has no `.orkestrel` folder. I’ll load the required guides and search committed history, tmp, and source for `readHit`.I’ll take git status, then search history, tmp, and the test tree for retained `readHit` audit carriers.History names retain and retire commits for the `readHit` audit. I’ll open those commits and recover the retained verdict contents.The prune commit deleted the retained audit files. I’ll recover the verdict, claims, and lane reports from git history.**Finding.** The adversarial `readHit` audit ran in this checkout on 2026-09-17, returned `REJECT` from the subjective lane and the objective lane, then `ACCEPT` after unit T2. The campaign folder was pruned. The working tree holds the landed product, not the retained audit files.

**Git status.** Before and after this read: identical. `git status --short` empty. Branch `main`. HEAD `f49bc7fcc80a839a082691613d2805a685276e9f` (`chore: release test 0.0.18`).

---

## Seed conflict

Scaffold `retained/debrief-verdict.md:92` (run 2026-09-16) says the unit is committed and gated and no adversarial lane has read it. `remaining-field-map.md:79` still carries that row.

This repository’s history after that date is the missing carrier the seed named as unverified (`debrief-carriers-map.md:192`).

| Date | Commit | What it is |
| --- | --- | --- |
| 2026-09-16T23:40:24-04:00 | `30c515e` | `feat(browser): publish readHit` — `guides/test.md`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts` |
| 2026-09-16T23:40:24-04:00 | `c29d9cd` | Retain unit records — `.orkestrel/test/t1-brief.md`, `t1-report.md` |
| 2026-09-17T07:08:56-04:00 | `87218be` | Retain the audit round — claims, subjective report, objective report, T2 brief/report, `t2-verify-report.md` |
| 2026-09-17T07:08:56-04:00 | `07e32cd` | `docs(browser): say what readHit cannot tell you` — same three product files; implementation bytes of `readHit` unchanged |
| 2026-09-17T07:14:39-04:00 | `9999a20` | `chore: release test 0.0.16` |
| 2026-09-17T09:11:00-04:00 | `5a0e343` | Retain `.orkestrel/test/t1-audit-verdict.md` |
| 2026-09-17T09:32:29-04:00 | `346a8b8` | Retire `.orkestrel/test/` and sweep `tmp/` after retention checks and owner go-ahead |

`git diff --stat 346a8b8^ 346a8b8` deleted those retained files. HEAD has no `.orkestrel/` tree. `rg` over the working tree for `t1-audit` / `READHIT` returned no matches.

---

## Claim map (from `87218be:.orkestrel/test/t1-audit-claims.md`)

Subject: `readHit` at `30c515e`, written by Opus 5 as unit T1, audited before the 0.0.16 release. Shared claims file; lanes blind. Terminal lines: subjective `VERDICT: REJECT`; objective `VERDICT: REJECT`. Reconciliation: `5a0e343:.orkestrel/test/t1-audit-verdict.md` — `VERDICT: ACCEPT — unit T2 closed every carried finding`.

| Claim | Subjective | Objective | Closure carrier |
| --- | --- | --- | --- |
| 1 centre → `elementFromPoint`, `undefined` on miss | CONFIRMED | CONFIRMED | `src/browser/helpers.ts:215-221` |
| 2 `element.ownerDocument` | CONFIRMED | CONFIRMED | `:217` |
| 3 element in, node out | CONFIRMED | CONFIRMED | signature stands; neither lane asked to change it |
| 4 real layout | CONFIRMED | CONFIRMED | `tests/src/browser/helpers.test.ts:615-739` |
| 5 recorded reds / plausible mutations | UNSETTLED | UNSETTLED | verdict: T2 recorded a fresh red per added case; independent gates in `t2-verify-report.md` GREEN |
| 6 wrap is deterministic | CONFIRMED | UNSETTLED | verdict: confirmed for fragment count and gap sign (`helpers.test.ts:649-663`); unproven that every host font produces that geometry |
| 7 guide row / lists | CONFIRMED | CONFIRMED | `guides/test.md:299`, `:1291`, `:1375-1381` |
| 8 no `any` / `as` / `!` / suppression | CONFIRMED | CONFIRMED | verifier extra sweep on `git diff 30c515e` |
| 9 owned files only | UNSETTLED (no diff/status in dispatch) | REFUTED as written for `52d0276..30c515e` | verdict: range also carries `c29d9cd` records; feature commit itself is the three owned files; `package.json` unchanged |
| 10 consumer replacements | CONFIRMED, conditional on republication | CONFIRMED, conditional on installing the API | roughnotes still on `@orkestrel/test@0.0.14` at audit time; live consumer compile after 0.0.16 not in this tree |

---

## Findings the round carried (landed in `07e32cd`)

| Finding | Evidence then | Where it sits now |
| --- | --- | --- |
| Untitled `@example` did not compile (`TS2345`) | subjective F1; objective medium | `helpers.ts:207-213` — `hit !== undefined && link.contains(hit)` |
| Driver-clicks-the-centre claim false for `playwright-core@1.63.0` | objective medium | `helpers.ts:174-179` |
| Unrendered / zero-area / `pointer-events: none` / shadow bounds unnamed | both lanes’ hazards | `helpers.ts:185-197`; guide bounds `guides/test.md:1622-1634` |
| `isOutsideViewport` answers a different question | objective viewport hazard | `helpers.ts:199-205`; test `:722-738` |
| Contract item 16 over-complete | subjective F2 | `guides/test.md:1354-1381` — `readHit` reads beside the pair |
| No bounds entry / no Limits row | subjective F3, F4 | bounds `:1622-1634`; Limits `:1524` Ships |
| Missing collapsed-box and shadow cases | both lanes | `helpers.test.ts:669-716` |
| Summary garden-path | subjective F5 | `guides/test.md:299` |

Verifier (`87218be:.orkestrel/test/t2-verify-report.md`): `format:check`, `lint:check`, `check`, `build`, `npm test`, `test:distribution`, `test:guides` all exit 0. Extracted `readHit` body at `30c515e` vs working tree byte-identical.

---

## Findings recorded, not carried by T2

- Guide `Signature` column compared against nothing → scaffold `ROADMAP.md:26` still open.
- Shadow silence on `isRendered` / `isReachable` → T2 closed it for `readHit` alone. Later scaffold `ROADMAP.md:31` **Closed** (predicate docs, not a second `readHit` audit).
- Case-name recommendation — not separately carried.
- `pointer-events: none` documented, pinned by no case (`07e32cd` message).

Later files in this checkout named T1/T2/T4 (`8f74726`, `17d8b61`, `c1b5d6d`, `tmp/units/t4-brief.md`) are a different campaign. T4’s subject is `isReachable` and an open modal. `tmp/units/t4-report.md:301` only quotes the beside-the-pair sentence.

---

## Unresolved / unreached

- **Required runtime replay, not executed here:**  
  `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t readHit`
- Claim 5 mutation reds: lanes could not re-run them; `tmp/mutate.cjs` / `tmp/mutate2.cjs` named in the objective report are absent from current `tmp/` (later `tmp/probe/mutate.py` files are a different probe set).
- Claim 6 host-font generality.
- Claim 10 consumer replacements after 0.0.16 — not verified in this checkout.
- Driver token `2026.09.15-d2fe57e`: `git tag -l "*d2fe57e*"` and `git log --grep=d2fe57e` empty.
- Lane journal paths / session ids (forbidden raw journals; reports are Orchestrator transcriptions).
- Full text of pruned `t1-brief.md` / `t1-report.md` / `t2-brief.md` / `t2-report.md` / `release-preparation.md` — recovered by name and by the verdict’s citations, not re-dumped.
- Scaffold `debrief-verdict.md` and `remaining-field-map.md` still state the audit is owed; those files were not updated after `5a0e343`.

No audit designed. No acceptance ruled. Spawned nothing.