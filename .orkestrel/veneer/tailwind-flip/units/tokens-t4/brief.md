# Unit tokens-t4 — the guide's token table and consumer story, the law clause, and the roadmap (R11, T4)

## Role and engine

Guide voice is subjective, so this unit runs on Claude Opus 5.5 through the `opus` route (the Claude CLI), in `/home/user/veneer`, the sole writer of tracked files. Commit nothing. The `.claude/rules/styles.md` clause lands in scaffold `main` by the Orchestrator's hand, not by this unit.

## Launch state

Written 2026-10-04 before T3's acceptance; the Orchestrator appends the launch HEAD (the T3 commit) and the digests under § Orchestrator rulings. The tree is clean at launch.

## Objective

Write what a consumer reads: `guides/veneer.md` gains a token table pinned to `tests/fixtures/tailwindcss/tokens.json` (the guide case `pins the guide token table to the token record` of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md` (**V**) § 5, with planted and removed controls) and the consumer story of V § 7; `ROADMAP.md` records the token round as landed and names the later items; the `README.md` pitch and the guide tagline stay equal.

## Governing texts (read-only)

1. **V** § 1 to § 3 with § 3.1, § 5 (the guide case), § 7, § 9, § 10, § 11.
2. T1 to T3's reports under `tmp/units/tokens-t1/`, `tokens-t2/`, `tokens-t3/`; the records; `tests/guides.test.ts` and the `findDrift` convention (`/home/user/scaffold/.claude/rules/documentation.md` § Parity).
3. `guides/veneer.md` § Tailwind (the compatibility sheet, the recipe, the faces, the curation table, the record subsections) and § Showcase, as the flip and T3 left them; `ROADMAP.md` § Sequence and § Next.
4. Law: `AGENTS.md` § Writing, `/home/user/scaffold/.claude/rules/writing.md` (every substitution row; `must`, `can`, the imperative; numerals with their run; `preceding` and `following`), `documentation.md` (every backticked API resolves; a guide `Summary` cell equals its doc block; falsify a prose claim by running it), `tests.md`.

## Boundaries

- **Owned.** `guides/veneer.md` (§ Tailwind and § Showcase token prose only; the curation table stays), `ROADMAP.md`, `README.md` only if the tagline must move, `tests/guides.test.ts` (the token table case), `tmp/units/tokens-t4/**`.
- **Off-limits.** Everything else, `src/**` and every test outside `tests/guides.test.ts` included.

## Items

1. **The token table**: one row per palette role group and scale row of the record (the Bootstrap token, the Tailwind token, the resolved value in light and dark, the origin), generated from the record by a writer step under `tmp/units/tokens-t4/` and pinned by the guide case; the table's prose names the policy of V § 2 in four sentences at most.
2. **The consumer story** (V § 7): a consumer `--font-sans`, `--radius-md`, and `--shadow-md` reach Bootstrap's components through the references (name the T2 case that reads it); a consumer `--color-blue-600` does not reach `.btn-primary` (name the case); the optional `@custom-variant dark` sentence beside the Color mode limit; the breakpoint bands (576 to 639, 992 to 1023, 1200 to 1279, and 1400 to 1535 px) where Bootstrap's documented layouts move; the gray collapse (`--bs-gray-400` joins `gray-300`); the wide-gamut residual (7 of 10 hue bases are out of sRGB as oklch; the clip moves `yellow-500` by OKLab 0.0225; M7 read equal sRGB pixels); the three inherited pairings and the separation floor of V § 3.1; the palette's source (`palette.json`, Chromium 141's serialization). Every number carries its run (T0 2026-10-04, Chromium 141.0.7390.37, or the T2 case that reads it).
3. **The faces table and the readings table** gain the token rows T3 added, in the forms the flip's guide uses.
4. **`ROADMAP.md`**: the token round landed (the units, the digests, the date); the later items V § 7 names (a Sass `$palette` for Sass consumers; the `oklch()` output form; the journey tuning chunk with its measured cost drivers, which the user's ruling of 2026-10-04 gives this lane).
5. Run `npm run test:guides` and `npm run test:policy` (the prose sweep) and fix every hit in the owned prose.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:guides`; `npm run test:policy`; `git diff --check`; `git status --porcelain` (only owned files).

## Report (write `tmp/units/tokens-t4/report.md`, then return it)

Finding first: the table's row count and its pin, each consumer-story sentence with the case or run behind it, the roadmap lines, the acceptance table, `git status --porcelain`.

## Deviation contract

Stop and report when a claim in V § 7 has no case or run behind it (name it; write no unsupported sentence), when `findDrift` reports a drift this unit's prose cannot close within its owned files, or when a sandbox write is rejected.

## Orchestrator rulings appended before launch

(The launch HEAD, the digests, and the `styles.md` clause text the Orchestrator lands in scaffold `main`, which the guide cites.)

Appended 2026-10-05 before launch: T3's handoff, from `tmp/units/tokens-t3/report-4.md` § P4 repeatability and T4 handoff and the review of 2026-10-05 (`tmp/units/tokens-t3/review/confirmed-index.md` items 6, 7, and 12). Each is an item of this unit:

6. **The guide's Header subsection** replaces its neutrality sentence with the measured one: "The chrome departs between faces only by the token rows: in the light-mode header, the layered face has 134 palette and 16 font departures at 390, 768, and 1280 px, plus 50 font-related geometry departures at 390 px and 60 at 768 and 1280 px; the unexcluded face has no remaining departure after the existing exclusions." Cite the P4 run of the T3 report that this unit's launch ruling names.
7. **The guide's readings** at `guides/veneer.md` lines 1290 and 2005 (as of the T3 tree) say `1140px` for the tailwindcss container where the tests pin `1280px`; the Faces table (lines 1997 to 2014) gains rows for the four T3 figures (primary button, page link, and focus ring; link in a Bootstrap alert; primary table colors; radius and shadow scales) and for the alert and bare-cell token readings, with the B, U, and L values of `TAILWIND_READINGS` in light and dark; lines 1993 to 1995 name the cases `changes alignment at each mapped sm boundary under every face` (575, 576, 639, and 640 px) and `paints and clears the mapped focus halo through Tab under every face and theme`. Read the line numbers afresh at launch.
8. **`ROADMAP.md` line 144** says the Tailwind group holds 23 specimens; the census is 27 (the census list in `tests/app/browser/sections/integration.test.ts`).
9. **The Tailwind section's lead** (`app/browser/constants.ts`, the `tailwindcss` section entry) ends the walk before the mapped-token run; extend it: "… from bare elements through curated components and the utility names both systems declare to the tokens the layer maps." `app/browser/constants.ts` (that sentence only) and `showcase/browser.html` (rebuilt through `npm run build:showcase`) join § Boundaries Owned for this item; `npm run test:app:browser` and `npm run build:showcase` with the three digests join § Acceptance after `test:policy`.
