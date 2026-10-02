# Showcase status: the parallel cloud session

Read `../lanes.md` first: it holds the lane contract between this session and the engine session, and their message log (opened 2026-10-02 by the engine session, at the user's request).

Informational. The cloud session on the branch `ccr-d15a48b1-yyyll6` owns the veneer showcase, is active on 2026-10-02, and has not handed this work off. Do not start, resume, or reassign a unit in this file. Take the work over only after the user says the handoff has happened; the cloud session hands off when it reaches its weekly usage limit, and it rewrites the § Status rows of this file first. Until then, read this file to know which veneer paths the showcase writes.

## Status

| Row | Value |
| --- | --- |
| Handoff | not handed off; the cloud session is active (2026-10-02) |
| Integration branch | veneer `ccr-d15a48b1-yyyll6`; veneer main receives it by merge |
| Veneer main | `0df5a3b` carries the showcase with the tuned journeys (`5d99d2e`), the rigor fixes (`8a84e5f`), and the polish round (`0df5a3b`) beside the engine's `plugins.ts` convention (`99ab620`), every gate green on the cloud host |
| Ahead of main | the branch `ccr-d15a48b1-yyyll6` at `fc4c4a2` adds the component statecharts (18 tables, 564 rows, every gate green: journeys 66 of 66) but takes 362 s for the journey gate, so main waits for the cost unit `J0c` |
| In flight | a read-only design workflow over the journey cost (five lenses, an adversarial check of each proposal, one synthesized brief), then `J0c` on an `astra` lane to bring the journey gate back to 235 s or less |
| Page | `showcase/browser.html` on veneer main, built by `npm run build:showcase` |

## Ownership boundary

The user's rulings of 2026-10-02 split veneer between the two sessions.

- The showcase session writes `app/browser/`, `showcase/`, `tests/app/browser/`, `tests/setupBrowser.ts`, `tests/setupServer.ts` with their proofs, `configs/app/vite.journey.config.ts`, `src/bootstrap/`, and `src/tailwindcss/` with their proofs and fixtures, and the showcase rows of `guides/veneer.md` and `ROADMAP.md`.
- The engine session writes `src/browser/`, `tests/src/browser/`, `src/styles/`, and `src/core/`; the showcase session never writes them.
- When the engine changes a contract the showcase consumes (`createEngine`, the plugin factories, the event constants), migrate the showcase's call sites on main in the same change, as `4eeb089` did; the showcase session merges main before each unit.

## Rulings the showcase works under

- One single-file page built from `app/browser` by `appShowcase('browser')` shows every `CLASS_NAMES.bootstrap` leaf, alone and beside Tailwind, under two faces that differ only in the shipped sheets the document links.
- D1: full utility matrices. D3: `browse` runs are exploratory and never gate. D5: the page carries a committed Tailwind compile pinned to `tailwindcss` 4.3.3.
- The Tailwind preflight mirror uses `revert-layer` (`68c8f04`), which closed the image departure; the `[hidden]` row is the recipe's one named departure.
- `app/browser` is the showcase plus the live engine; the engine demonstration is the page's Interactions group.
- Every specimen is interactive and none carries `inert`; the page guards `href="#"` links and form submits; a static offcanvas specimen uses `showing`, because the engine opens every `.offcanvas.show` on load.
- `bootstrap-icons` 1.13.1 is a development dependency for the icon specimens.
- The page looks simple, calm, and professional: one concept per matrix, readable captions, no raw dumps.

## Readings

The cloud host is Linux with 4 cores, a 14 345 035 776-byte memory cgroup, and Chromium 141 under Playwright's pinned 153 (2026-10-02).

- `npm run test:journey` at `42685f7` took 464.65 s: 40 passed, 1 failed, 7 incomplete, and the kernel killed Chromium for out-of-memory. The four variant projects ran concurrently and each ran the full four-variant matrix (about 132 s per project); J3 took 50 to 75 s and J2 34 to 40 s; the statechart timed out at 120 s in `light-390` and passed alone in 23.1 s of test time.
- After `J0b` (`5d99d2e`), each variant project reads its own variant once and J2 reads each Tab stop from the focused element: 188.79 s, 48 passed, a sampled peak of 9 963 581 440 bytes with four concurrent projects (two concurrent projects took 302.53 s); per variant the matrix fell from about 132 s to 30 to 33 s and J2 from 34 to 40 s to 6 to 8 s. J3 (50 to 74 s) is the largest remaining cost. On `a443edf` the gate read 182 s, 48 passed.
- Three `tests/integration.test.ts` cases (near lines 324, 339, and 595, the row-rule color) and six `tests/src/browser` cases (Placement, Tip, Tooltip) fail on Chromium 141 and pass on 153; neither session owes a fix for them.

## Remaining units, in order

1. `J0b`, landed as `5d99d2e` (§ Readings).
2. `R1`, landed as `8a84e5f`: the rigor fixes from the round-1 critic (brief `r1-brief.md`, evidence `g1-rigor-distillate.md`):
   - pin the face-invariance population so the block ids equal every non-Tailwind section id;
   - derive the pseudo list of `collectPseudos` from `collectPreflightPseudos` (`tests/setupStyles.ts`), so `::-webkit-search-decoration` is read;
   - replace the `.mt-3` and `.gap-4` rows of `TAILWIND_READINGS`, which read the same with or without the exclusion, with rows that depart when the exclusion is removed;
   - assert the face and theme pair states in the statechart, for example `tailwindcss` with `dark`;
   - bind every number a `tailwindcss.html` caption states to a reading, or drop the number.
3. `S1b`, merged on the branch as `fc4c4a2` (report `s1b-report.md`; it missed its 45 s and 235 s budgets): component statecharts, with the toast dismiss buttons named per toast, one state table per live component family, driven through its controls. `statecharts-partial.patch` beside this file is unverified scaffolding against `42685f7`; `J0b` rewrote the same three files, so read the patch as a design reference through `g2-statechart-distillate.md` § 4.
4. `P1`, landed as `0df5a3b`: 16 rendered findings closed in `app/browser/` (matrix widths at 390, contrasting surfaces for fixed light and dark variants, paired figures with equal-height cards, shorter captions). A later round can rule the toggle-button figure's light surface in dark mode.
5. Browse recheck through the `browse` server of `@orkestrel/browser`, exploratory; file each gap it hits as a browser `ROADMAP.md` item: no viewport control, screenshots only in replay, and smooth-scroll replay timing.
6. Docs: the showcase sections of `guides/veneer.md`.
7. Falsify: one objective and one subjective lane over the claims, then a completeness critic.
8. Adopt the first scaffold release after 0.0.86 in veneer through `scaffold overwrite`; veneer is on 0.0.85. Never adopt 0.0.86 itself: it predates scaffold's `plugins.ts` kind (`65eb6f0eb`), so its overwrite would remove the `no-misnamed-plugin` rule veneer carries by hand (`ebe7081`).
9. Merge main and push each accepted state to veneer main.
10. `J0c`, next: cut the journey gate from 362 s to 235 s or less without losing a claim; at `fc4c4a2` the summed test time is 1364 s, led by J3 (55 to 79 s per variant), the header statechart (38 to 47 s per variant), and the scrollspy, dropdown, carousel, and tooltip tables (47 to 62 s each).

## Resume after the handoff

- Merge veneer `origin/main` into `ccr-d15a48b1-yyyll6` before the first unit.
- Read `proposal.json` beside this file as the design of record: the accepted proposal with its scores and corrected claims. § Remaining units carries the open findings of the round-1 build reports, which lived on the cloud host.
- Run `npm run build` before the journeys, because the page reads `dist/src/bootstrap/index.css`.
- Iterate on one variant with `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project 'journey:VARIANT*' -t PATTERN`, where `VARIANT` is `light-1280`, `dark-1280`, `light-390`, or `dark-390` and `PATTERN` filters test names; one J2 run took 19.73 s and one statechart run 29.03 s, and a whole variant 137.18 s.
- When the handoff happens mid-unit, the cloud session pushes `sc/statecharts` and any uncommitted lane state to veneer first and names them in § Status.
- Read these gates bare: `format:check`, `lint:check`, `check`, `test:app:browser`, `test:setup:browser`, `test:journey`, `CAPTURE=1 npm run test:journey`, and `test:policy`.
- On a POSIX host, the `workspace-write` sandbox of `codex exec` denies the journeys' grandchild processes, loopback server, and `.git` writes, so the showcase's `astra` lanes run at `danger-full-access`; record that deviation in the ledger for each such lane.
- Treat the cloud host's `/home/user/.wave/` as lost when its container is reclaimed; this folder holds the durable copies.
