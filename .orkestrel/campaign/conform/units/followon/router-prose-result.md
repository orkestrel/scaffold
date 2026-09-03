# Unit router-prose — report

## Row 1 — citation rewrites

- `src/core/types.ts:214` now reads: "The once-per-path compile output of `compilePath` (the path compiler in `helpers.ts`):"
- `src/core/constants.ts:63` now reads: "Consumed by `computeSpecificity` (the path compiler in `helpers.ts`) when ranking candidate"
- `src/core/constants.ts:78` now reads: "Consumed by `computeSpecificity` (the path compiler in `helpers.ts`) alongside {@link TIER_LITERAL}"
- `src/core/constants.ts:94` now reads: "Consumed by `computeSpecificity` (the path compiler in `helpers.ts`)."
- `tests/src/core/Dispatcher.test.ts:15-21` now reads: "// The net-new test mirror slice of `src/core/Dispatcher.ts` covers the type-level // surfaces (RouteHandler context typing, TState generic flow, DispatcherInterface // member shape, factory return type), the emitter event payload shapes, destroy // idempotence, and the cross-face grammar parity fixture driven through // `Dispatcher.match`. The full functional dispatch matrix (auto-HEAD, auto- // OPTIONS, 404/405 responders, handler-throw propagation) is this file's own // suite, in the describe blocks that follow." The full functional matrix (auto-HEAD at line 223, auto-OPTIONS at line 259, default responders at line 178, handler-throw propagation at line 389) is present in this same file, so the rewrite names the file's own describe blocks rather than a separate unit.

## Row 2 — tally rewrite

- `tests/guides.test.ts:38` now reads: "guide spans the core, browser, and server faces, so a fence importing any of them".

## Row 3 — sweeps

**Sweep `\b[UOS][0-9]+\b` over `src` and the non-vendored `tests`** (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`): no citation hits remain. The only matches are `u1` inside `{ userId: 'u1' }` fixture literals at `tests/src/core/factories.test.ts:71,81,92` and `tests/src/core/Dispatcher.test.ts:418,419` — a fixture value, not a unit citation. Ruled permitted.

**Sweep `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` case-insensitively over the non-vendored `tests`** (same exclusions): every hit ruled by sense.

- Owned-file hits, all permitted: `tests/guides.test.ts:52` ("one-class-per-file", a fixed rule name, not a count), `:73` and `:115` ("at least one", a minimum quantifier, not a fixed count), `:193` ("is one `guides/router.md` fence", a per-item descriptor); `tests/src/core/Dispatcher.test.ts:124-125` ("one\none `it` case per face", a per-item ratio, not a total over the growable face set).
- Non-owned hits, out of scope for edit, all ruled permitted as singular pronoun, per-item ratio, or fixed-idiom usage rather than a count over a growable set: `tests/src/server/handlers.test.ts:7,12`; `tests/src/server/helpers.test.ts:28,47,84,98,123,249` ("expected one captured request"); `tests/src/browser/Navigator.test.ts:574,765-766,791`; `tests/src/core/Group.test.ts:7,61`; `tests/src/core/factories.test.ts:41`; `tests/src/core/helpers.test.ts:21,277,293`; `tests/src/core/DispatchGroup.test.ts:6`; `tests/setupBrowser.test.ts:8`.
- Two non-owned hits ruled as the same tally-over-a-growable-set sense the brief closes in Owned files, left unedited because they sit outside Scope: `tests/src/core/parsers.test.ts:11` ("narrows every one of the seven registrable methods") and `tests/src/core/Router.test.ts:462` ("duplicated verbatim across the three files"). `tests/src/core/Router.test.ts:9` ("the two promotions") is ruled permitted — the pair is named in the same sentence, not counted over a growable set.

Acceptance criterion 1 holds: the sweeps read empty of unit citations and tally senses in the Owned files (`src/core/types.ts`, `src/core/constants.ts`, `tests/src/core/Dispatcher.test.ts`, `tests/guides.test.ts`).

## Gates

- `npm --prefix /home/user/fleet/router run format:check` — exit 0. "All matched files use the correct format." (73 files). The earlier per-file `oxfmt` write reformatted the four Owned files' whitespace only; `git diff --stat` confirmed only the four Owned files changed.
- `npm --prefix /home/user/fleet/router run lint:check` — exit 0, no output.
- `npm --prefix /home/user/fleet/router run check` — exit 0 (`tsc --noEmit` root, core, browser, server all clean).
- `npm --prefix /home/user/fleet/router run build` — exit 0. All targets (core, browser, server) built; declaration files generated.
- `npm --prefix /home/user/fleet/router test` — exit 0. `test:src` 265/265 passed across 13 files; `test:policy` 111/111; `test:config` 46/46; `test:setup` 9/9; `test:guides` 45/45.

## Offline audit

`cd /home/user/fleet/router && npx scaffold audit --offline` — exit 0: "0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12." This differs from the brief's stated standing condition of one drift row at `configs/browsers.ts`; the tree at dispatch time reports no drift rather than that one baseline row. Recorded as a deviation from the brief's Host section, not a gate failure — the audit still exits 0 and reports fewer rows than expected rather than more.

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs router` — wrote `/home/user/work/evidence/conform-router.diff` (79 lines) and `/home/user/work/evidence/conform-router.status` (4 entries).

## Git status

`git -C /home/user/fleet/router status --short` lists exactly the four Owned files as modified: `src/core/constants.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/Dispatcher.test.ts`. No other file touched.

## Deviation note

The offline audit's reported row count (0 drifted, 45 planned paths) does not match the brief's stated baseline (one drift row at `configs/browsers.ts`). Expected: one drift row naming `configs/browsers.ts` as stale. Found: `0 of 45 planned paths drifted from the plan.` (exit 0). This is a Host-section fact mismatch, not a gate reddening on rows this unit touched, so work proceeded per the deviation contract's second clause (stop only when a gate reddens on something the rows did not touch). Hypothesis: the vendored baseline drift the brief described was already repaired in the tree before this unit's dispatch.
