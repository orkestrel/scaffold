# J-CAROUSEL audit round 4 (the landing round) — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 24 tool uses, 93 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, mechanical conformance lane only, `Read`/`Grep`/`Glob`.

## Numbered verdicts (claims file `j-carousel-audit-claims-4.md`)

1. **A mouse release ends the tap exemption** — `CONFIRMED`. `Carousel.ts:194-199` registers `pointerup`→`#defer` beside `pointermove`/`pointerdown`/`pointerup`→`#notice`, gated on `resolved.touch && resolved.pause`; `#notice` (line 638-642) acts only on `event.pointerType === 'mouse'` while `#touched`, clears it, and disarms only `if (this.#host.matches(':hover'))`. `#defer` (666-675) unchanged for touch/pen. The red-first log (`j-carousel-red-4.log.txt:10-22`) shows the named case failing `expected 20 to be +0` before the fix, and the mutations log row (`j-carousel-mutations-4.log.txt:110`) shows `EXACT exit=1 | a mouse release does not end the tap exemption | ... | named: ['holds the timer under the hover after a mouse held inside the host is released following a trusted tap...']`. Prose: `Carousel.ts:67-69` names the release beside move/press; guide `#### Carousel` not independently re-verified beyond the plugin-row check, but no evidence contradicts it.

2. **The two titles** — `CONFIRMED`. Both case titles found verbatim (`Carousel.test.ts:655`, `:1005`), and the mutation log rows `mouse activity does not end the tap exemption` (line 108) and `ending the tap exemption leaves the timer armed` (line 109) both name the renamed title `holds the timer under the hover after the mouse moves inside the host following a trusted tap, and arms it when the pointer leaves`.

3. **The merge keeps both units** — `CONFIRMED` on the mechanical sub-clauses checked: barrel order `Swipe`→`Carousel` after `Dropdown` (`index.ts:14-17`); `index.test.ts` export list is sorted and contains both `Carousel` and `Swipe`; guide places `CarouselVocabulary` row (line 42) after landed vocabulary rows and `#### Carousel` (line 1561) after `#### Dropdown` (line 1367); the six named `plugin` rows (Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel — `guides/veneer.md:7438-7443`) all read `shipped` with the correct Proof path. Not independently re-verified: `constants.ts`/`validators.ts`/`parsers.ts`/`helpers.ts` exact append order and the § Delegation qualification sentence — no contrary evidence found, but I did not line-diff every file; leaving those sub-facts `UNRESOLVED` for lack of direct citation. No conflict marker found in scanned files; `git diff --diff-filter=U` output itself not independently run (read-only lane, no command tool).

4. **One delegate** — `CONFIRMED`. `Delegate.ts` confirms: `#driven`/`#owned` unions include `Carousel` (147-181); `#discard` reads `Carousel.find` (788); `#conflicts` collects the carousel via `#slideControl`/`#slideHost` (428-429, 444) refusing on `Set` smaller than list (446); `#activate` runs `#routeCarousel` last after `#routeDropdown` (395-396); one `#scan` in one `try` acquires scrollspies then ride-`load` carousels, destroying/rethrowing on refusal (343-379); no `isDisabled` site in the carousel route (675-689, confirmed absent). Mutation rows for this item (log lines 67, 74-79, 83) all show `EXACT`/`JOINED exit=1` reddening their named cases, and the `GREEN?` row for `Delegate.test.ts` reads `0 failed of 93` (line 113) — the report's claimed 93-case, 0-failed figure is corroborated by the instrument log rather than only the report.

5. **Gates and the instrument** — `CONFIRMED` on the writer's own gates log and instrument log (`j-carousel-gates-4.log.txt` lines 1-184 show all listed gates exit 0 with matching counts: 490/17, 19, 109+1 skipped, 22, 281; `j-carousel-mutations-4.log.txt:119` ends `receipt: restored byte for byte`, matching digests before/after). **The Orchestrator's replay `j-carousel-mutations-4-orchestrator.log.txt` and the post-replay `j-w2-land-2b.sh` gates are `UNRESOLVED`** — per the brief's own note, that file is absent by design while I read, so this cannot be confirmed from evidence I have; it is not a FAIL.

6. **Scope and the added lines** — `CONFIRMED` on the status file: every entry in `j-carousel-4-status.txt` is `X  path` (two-space, staged-only) format with no unstaged (` M`) or unmerged (`U`) prefix — matches the claim's "now staged, with no unstaged and no unmerged entry." The report (`j-carousel-report-4.md:172-173`) states no commit/install/merge-abort/discard command was run and no `prove` call was made — this is the writer's own report and, per the brief's rule, is `UNRESOLVED` as an independent fact rather than `CONFIRMED`, since no independent corroboration (e.g., reflog, orchestrator log) was supplied to me. The banned-syntax sweep of the diff (`any`, `as `, `!.`, `@ts-`, `eslint-disable`, access modifiers, default export) found no true positives in the sampled diff — `CONFIRMED` for the portion sampled; the diff is large and I did not sweep its full length, so I bound this to the paths I searched (whole-diff grep, no hits).

## Checklist

| item | status | evidence |
|---|---|---|
| status lists only owned files, no off-limits | met | `j-carousel-4-status.txt` shows only merge-landed and Carousel round files; no unrelated off-limits engine edit beyond `A` (added-by-merge) entries |
| case titles present verbatim | met | grep hits at `Carousel.test.ts:655,1005,1057` |
| mutation rows match report | met | `j-carousel-mutations-4.log.txt` lines 108-110, digest receipt line 119 |
| no `.bs.` wire name outside constants.ts/guide prose | met | grep of `src/browser` found no `.bs.` hits; guide hits are Bootstrap-side prose (permitted) |
| no banned syntax in added lines | met (sampled) | diff-wide grep for `any`/`as `/`!.`/`@ts-`/`eslint-disable`/access modifiers/default export returned no true positives |
| readonly on added interface properties | met | `types.ts:137,139,141,2101-2113` all `readonly` |
| Carousel.ts one class plus imports | met | `Carousel.ts:1-37` imports only, one `export class Carousel` |
| element guards read `isInstance`/`Element` or subclass | met | `Carousel.ts:123,654-655,685`; `Delegate.ts` uses `isInstance`/`instanceOf` throughout |
| barrel exports match `index.test.ts` assertion | met | `index.ts:1-18` vs. sorted list in `index.test.ts:46-131` |
| plugin rows `shipped` with correct Proof | met | `guides/veneer.md:7438-7443` |
| Orchestrator's replay log independent evidence | not evidenced (by design) | file absent per brief note — treated as `UNRESOLVED`, not `FAIL` |
| shared-file patches named only types.ts/guide/ROADMAP | met (vacuous) | report names no shared-file patch |
| report records no `prove` call | UNRESOLVED | report's own claim only (`j-carousel-report-4.md:173`); no independent corroboration supplied |

## Referrals

- Whether the § Delegation guide qualification sentence and the exact append order in `constants.ts`/`validators.ts`/`parsers.ts`/`helpers.ts` (claim 3) match `main`'s files plus appended declarations is a line-by-line merge-fidelity judgment better suited to a lane with diff-execution tools; I did not line-diff every file.
- The Orchestrator's replay log and post-replay gates (claim 5) require that artifact to exist; re-check once it lands rather than accepting the writer's report alone.
- The "no `prove` call" and "no destructive git command" facts rest only on the writer's report; an independent auditor with shell/log access should corroborate before this closes as `CONFIRMED`.

VERDICT: UNRESOLVED 5, 6; outside the claims: none

---

The Orchestrator's readings: the worktree's `git status` and `git diff --diff-filter=U` were run by the Orchestrator before the lanes launched (no unstaged, no unmerged entry) and the reflog shows no commit after `60ea4a0`; the replay and the landing gates follow the lanes and the landing verdict records them; the `prove` clause is the writer's self-report and is accepted as such.
