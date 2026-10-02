# Showcase status: the parallel cloud session

Informational. The cloud session on the branch `ccr-d15a48b1-yyyll6` owns the veneer showcase, is active on 2026-10-02, and has not handed this work off. Do not start, resume, or reassign a unit in this file. Take the work over only after the user says the handoff has happened; the cloud session hands off when it reaches its weekly usage limit, and it rewrites the § Status rows of this file first. Until then, read this file to know which veneer paths the showcase writes.

## Status

| Row | Value |
| --- | --- |
| Handoff | not handed off; the cloud session is active (2026-10-02) |
| Integration branch | veneer `ccr-d15a48b1-yyyll6`; veneer main receives it by merge |
| Veneer main | `0738ccf` carries the interactive showcase through `9793ce1` |
| Ahead of main | `42685f7`, one concept per matrix with every specimen visible; it lands on main with `J0b` |
| In flight | `J0b`, the journey tuning unit, on an `astra` lane in the cloud host's veneer checkout |
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
- Three `tests/integration.test.ts` cases (near lines 324, 339, and 595, the row-rule color) and six `tests/src/browser` cases (Placement, Tip, Tooltip) fail on Chromium 141 and pass on 153; neither session owes a fix for them.

## Remaining units, in order

1. `J0b`, in flight: each variant project proves its own variant only, every test applies its project's theme and viewport, J2 resolves each Tab stop from the focused element, and browser concurrency stays under the memory limit.
2. Rigor fixes from the round-1 critic, open at `42685f7`:
   - pin the face-invariance population so the block ids equal every non-Tailwind section id;
   - derive the pseudo list of `collectPseudos` from `collectPreflightPseudos` (`tests/setupStyles.ts`), so `::-webkit-search-decoration` is read;
   - replace the `.mt-3` and `.gap-4` rows of `TAILWIND_READINGS`, which read the same with or without the exclusion, with rows that depart when the exclusion is removed;
   - assert the face and theme pair states in the statechart, for example `tailwindcss` with `dark`;
   - bind every number a `tailwindcss.html` caption states to a reading, or drop the number.
3. Component statecharts: one state table per live component family, driven through its controls. `statecharts-partial.patch` beside this file is unverified scaffolding against `42685f7`; `J0b` rewrites the same three files, so read the patch as a design reference.
4. Polish rounds: a subjective review of the `CAPTURE=1` portfolio, then class-only fixes.
5. Browse recheck through the `browse` server of `@orkestrel/browser`, exploratory; file each gap it hits as a browser `ROADMAP.md` item: no viewport control, screenshots only in replay, and smooth-scroll replay timing.
6. Docs: the showcase sections of `guides/veneer.md`.
7. Falsify: one objective and one subjective lane over the claims, then a completeness critic.
8. Adopt scaffold 0.0.86 in veneer through `scaffold overwrite`, which declares missing planned dependencies; veneer is on 0.0.85.
9. Merge main and push each accepted state to veneer main.

## Resume after the handoff

- Merge veneer `origin/main` into `ccr-d15a48b1-yyyll6` before the first unit.
- Read `proposal.json` beside this file as the design of record: the accepted proposal with its scores and corrected claims. § Remaining units carries the open findings of the round-1 build reports, which lived on the cloud host.
- Run `npm run build` before the journeys, because the page reads `dist/src/bootstrap/index.css`.
- Iterate on one variant with `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:VARIANT -t PATTERN`, where `VARIANT` is `light-1280`, `dark-1280`, `light-390`, or `dark-390` and `PATTERN` filters test names.
- Read these gates bare: `format:check`, `lint:check`, `check`, `test:app:browser`, `test:setup:browser`, `test:journey`, `CAPTURE=1 npm run test:journey`, and `test:policy`.
- On a POSIX host, the `workspace-write` sandbox of `codex exec` denies the journeys' grandchild processes, loopback server, and `.git` writes, so the showcase's `astra` lanes run at `danger-full-access`; record that deviation in the ledger for each such lane.
- Treat the cloud host's `/home/user/.wave/` as lost when its container is reclaimed; this folder holds the durable copies.
