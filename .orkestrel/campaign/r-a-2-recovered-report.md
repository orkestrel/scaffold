I'll read the recovery brief and the orchestration contract first, then gather the evidence it asks for.The brief is a read-only recovery lane. Next I’ll load the listed evidence files and locate the original writer transcript.Context files are in. Next I’ll locate the original writer journal and the recovered patch, then map the Roughnotes edits.The patch is large and the writer journal isn’t in this repo. I’ll search Claude session storage next and keep reading the rest of the patch.The writer journal is in the Claude session tree. I’ll extract its test commands and the remaining patch, then cite the Roughnotes source.The journal lines are huge. I’ll pull the writer’s actual Bash commands and outputs, then cite the on-disk Roughnotes files.The hide-gate cases ran red. I’ll pull the remaining writer commands and the on-disk Roughnotes lines the checklist needs.I’ll parse the writer journal for every test command and its actual output, then finish the source-side checklist.The shell parse was blocked. I’ll keep extracting the journal by targeted greps and line reads.I have the later greens. Next I’ll pin the census red/green commands, the hide-gate re-run, and the installed `isReachable` surface.# Recovered historical evidence — unit R-A-2

Writer: `opus` `a148d5ec4bb874bea` in Claude session `d7d4417a-5b51-47b1-85d7-d00611fbd930`, workflow `wf_f03d3778-7b0`, baseline `86a9ef6`. Interrupted by the weekly limit at `2026-09-17T23:50:58.422Z` after the last green suite. `tmp/units/r-a-2-report.md` was never written. Checker and verifier never ran. This is reconstructed from the writer journal, the supplied patch/status, and the on-disk Roughnotes tree. It is not a fresh gate result and not an acceptance.

Effective brief: `.orkestrel/campaign/r-a-brief-2.md` over `r-a-brief.md`. Prescriptions: `r-a-audit-verdict.md` Findings carried.

---

## Brief items → implemented files and behavior

**True reason (item 1).** Replaced in `app/browser/App.vue:55-59` and `guides/README.md:144-146`. Old sentence “the compact masthead keeps its own action beside the open menu” is gone from `app/` and `guides/`. Split `Get started, Menu` kept.

**One naming rule (item 2).** Home invite section is `:aria-label="COPY.join"` (`HomeView.vue:259`); invite control is `buildName(COPY.started, COPY.join)` (`:272`). `COPY.join` sits in the region-copy block (`constants.ts:210-212`, after `introduction` / `offerings`). Guide states the shell-destination rule at `guides/README.md:220-231`. Extra beyond the invite: hero `Get started` now announces `Get started, Introduction` (`HomeView.vue:39`, `:64`); `startSubscription` in `setup.ts:715` clicks that composed name.

**Empty-state collisions (item 3).** Products recovery: `buildName(COPY.contact, COPY.offerings)` (`ProductsView.vue:36`); continuation stays bare `{{ COPY.contact }}` (`:67`). Media recovery: `buildName(COPY.contact, group.label)` (`MediaView.vue:38`); continuation stays bare (`:96`). Magazine empty recovery renamed to `buildName(COPY.publications, COPY.issue)` (`MagazineView.vue:36-46`) — that collision was in the red census, not named in item 3’s Contact pair. Shop and marketplace empty notices still paint bare `{{ COPY.contact }}` (`ShopView.vue:50`, `MarketplaceView.vue:40`); their continuations are not Contact.

**Census infrastructure (item 4).** `SHELL_NAMES`, `CENSUS_ROUTES` (renamed from `ROUTES`), `readHeading`, `followRoute`, `readShared` exported from `setup.ts:987`, `:1025`, `:1051`, `:1065`, `:1104`. `App.test.ts:22-40` imports them. No remaining declarations of those names in the test file.

**Mirrored `buildName` case (item 5).** `helpers.test.ts:48-55`: composed form, `', '` separator, label leading.

**Guide (item 6).** Settle described as class-based today (`guides/README.md:154-155`); `readMenuSettled` still reads `show` / `showing` / `hiding` (`setup.ts:740-747`). Speech-input sentence gone; Label in Name at `:230-231`. `aria-expanded` described as written from shown/hidden, read by `App.test.ts`, with the note that focus may move before it flips (`:151-157`). Redundancy cost recorded (`:233-237`). Paragraph at former `:222` rewrapped (`:239-245`). `DATA_CASES` documented beside the table (`:377-381`).

**Hide gate and watcher (item 7).** `hideMenu` returns false when the node lacks `aria-modal`, then calls `Offcanvas.getInstance` and `hide()`; it no longer reads `classList.contains('show')` (`App.vue:70-81`). Watcher is `watch(app.location, onLocation)` (`:99`). Tests: `hides the compact menu on a navigation taken while it is still opening` (`App.test.ts:300`); `hides the compact menu on a navigation that stays on one view` (`:324`), `/products/roughnotes-pro` → `/products/advantage-plus` via `SIBLING_SLUG`.

Prescription said “gate on the offcanvas instance’s shown state.” Observed code gates on `node.hasAttribute('aria-modal')`, with a comment that this tracks the instance’s shown span. No `_isShown` (or other instance shown API) is read. `aria-expanded` remains bound to `opened` (`App.vue:160`), flipped on `shown` / `hidden`, not on `show`.

---

## Controls — exact commands and outputs

**Baseline (not a control).** `npm run test:app:browser 2>&1 | tail -20` at `23:25:15Z` → `Test Files  38 passed (38)` / `Tests  162 passed (162)`.

**R-A-2-C1 — data-state census red, then green.**

Red, before the view repairs (`23:35:11Z`):

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts -t "in any state the guide declares" 2>&1 | tail -60
```

Output (`23:35:24Z`):

```text
× |app:browser (chromium)| tests/app/browser/App.test.ts:272:2 > App > leaves no reachable control sharing a name in any state the guide declares 6042ms
   → expected [ …(6) ] to deeply equal []
AssertionError: expected [ …(6) ] to deeply equal []
+   "1280 px | /products | Absent | Interactive target \"Contact\" is ambiguous across 2 elements",
+   "1280 px | /magazine | Absent | Interactive target \"Publications\" is ambiguous across 2 elements",
+   "1280 px | /media | Absent | Interactive target \"Contact\" is ambiguous across 4 elements",
+   "390 px | /products | Absent | Interactive target \"Contact\" is ambiguous across 2 elements",
+   "390 px | /magazine | Absent | Interactive target \"Publications\" is ambiguous across 2 elements",
+   "390 px | /media | Absent | Interactive target \"Contact\" is ambiguous across 4 elements",
 Test Files  1 failed (1)
      Tests  1 failed | 14 skipped (15)
```

Green after the view repairs is not a second isolated `-t` run. The named case passed inside `App.test.ts` after the gate fix (`23:40:43Z`): `✓ … leaves no reachable control sharing a name in any state the guide declares 5644ms` with `Test Files  1 passed (1)` / `Tests  15 passed (15)`. Later full suites: `Tests  166 passed (166)`.

**R-A-2-C2 — hide-gate and same-view red, then green.**

Red, before `App.vue` item 7 (`23:34:53Z` start):

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts -t "hides the compact menu" 2>&1 | tail -40
```

Output (`23:35:07Z`):

```text
× … hides the compact menu on a navigation taken while it is still opening 4325ms
   → Condition "the compact menu has left the screen" did not hold within 4000ms (waited 4002.2000000178814ms)
× … hides the compact menu on a navigation that stays on one view 4513ms
   → Condition "the compact menu has left the screen" did not hold within 4000ms (waited 4033.7999999821186ms)
 Test Files  1 failed (1)
      Tests  2 failed | 13 skipped (15)
```

Green after the gate fix (`23:40:11Z`):

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts 2>&1 | grep -E "✓|×|Tests |Test Files " | head -25
```

Output (`23:40:43Z`):

```text
✓ … hides the compact menu on a navigation taken while it is still opening 425ms
✓ … hides the compact menu on a navigation that stays on one view 808ms
 Test Files  1 passed (1)
      Tests  15 passed (15)
```

**R-A-2-C3 — `buildName`, invite name, shell pin, suites.** No isolated `helpers.test.ts` log. `buildName` sits in the browser project that later printed `166 passed`. Shell-name pin: `✓ … names every shell destination for the region carrying it 8ms` in that same `App.test.ts` run. Invite name has no dedicated test line; it is exercised by the census and by `startSubscription`.

`npm run test:app:browser` (`23:41:44Z` and again `23:50:58Z`): `Test Files  38 passed (38)` / `Tests  166 passed (166)`.

`npm run test:journey` (`23:42:25Z` and again `23:50:58Z`): `Test Files  4 passed (4)` / `Tests  76 passed | 4 skipped (80)`.

**R-A-2-C4 — scoped format/lint, check, format:check, policy.**

- Format owned files: `./node_modules/.bin/oxfmt.cmd … --write <owned files>` → `Finished in 357ms on 10 files using 16 threads.`
- Lint owned files: `./node_modules/.bin/oxlint.cmd … --deny-warnings <owned files>` → `(Bash completed with no output)`.
- `npm run check` (`23:44:32Z`): `CHECK_EXIT=0` after `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`.
- `npm run format:check` (`23:44:44Z`): `vite.config.ts (1ms)` / `Format issues found in above 1 files.`
- `npm run lint:check` (`23:46:11Z`): `LINT_EXIT=0`.
- `npm run test:policy` (`23:44:42Z`): `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`.
- `npm run test:config` (bundled later `23:46:57Z`): `Test Files  1 passed (1)` / `Tests  171 passed | 3 skipped (174)`.

Unowned red, not a control: `npm run test:conformance` failed `expected [ 'bootstrap-icons' ] to include 'vue'` (`tests/conformance.test.ts:107`). Off-limits `vite.config.ts`.

---

## Census population and state names

`DATA_CASES` (`setup.ts:1248-1278`), states as the guide table spells them:

- Absent: `/products` empty products; `/magazine` empty articles; `/marketplace` empty markets; `/shop` empty skus; `/media` empty assets
- Missed: `/products/no-such-record`, `/magazine/no-such-record`, `/shop/no-such-record`
- Reduced: magazine empty category; marketplace missed search; shop wheels department on `{ skus: [UNINDEXED_SKU] }`
- Refused: `/shop/unindexed-title`; empty subscribe/newsletter/contact/payment submits
- Accepted: filled subscribe/newsletter/contact/payment submits

Writer population probe (`23:49` range), after a temporary `console.info('POPULATION …')` on the data-state case:

```text
npx vitest run … App.test.ts -t "in any state the guide declares" 2>&1 | grep "POPULATION" | … | head -50
```

Visible 1280 px rows (reachable-name counts): `/contact` Accepted 33, Refused 41; `/magazine` Absent 30, Reduced 37, Missed 29; `/marketplace` Absent 29, Reduced 31; `/media` Absent 35; `/newsletter` Accepted 29, Refused 32; `/payment` Accepted 29, Refused 35; `/products` Absent 29, Missed 29; `/shop` Absent 31, Reduced 35, Missed 29, Refused 33; `/subscribe` Accepted (line truncated in the journal extract). The 390 px block was requested in the same `head -50`; this extract does not quote it.

The probe then stubbed `readNames` to `return []`, which reddened both census tests (`expected [ '1280 px | /', …(29) ]` and `…(40)`). That stub was restored (`setup.ts` `readNames` today has no `if (true) return []`). Final suites after restore: 166 / 76 as above.

---

## Differences from the prescription

- Hide gate uses `aria-modal` presence, not an Offcanvas “shown” field. Comment asserts those are the same span.
- Census red named a `/magazine` Absent `Publications` collision as well as the Contact pair; MagazineView was repaired though item 3 named products and media.
- Hero `Get started` was suffixed `Introduction`; item 2 named the invite section.
- Shop and marketplace empty recovery links still say bare Contact; item 3’s owned list included “any listing view whose empty notice carries a recovery link.” Those screens’ continuations are not Contact, so they were not in the red findings list.
- `ROUTES` was renamed `CENSUS_ROUTES`.
- Guide says the shell hides on `location` and gates hide on `aria-modal` (`guides/README.md:158-160`).
- Installed `@orkestrel/test` in Roughnotes `package.json` is `^0.0.17`. `node_modules/@orkestrel/test` was not present to this lane, so `isReachable` / `aria-modal` declarations were not read. T4’s modal clause is in 0.0.18; this tree is not re-pinned.

---

## Mechanical checklist (observable MET / UNMET)

1. **MET.** `keeps its own action beside the open menu` matches nothing under `app/` and `guides/`. Replacement: `App.vue:55-57` “The journey layer counts a control the open dialog covers as reachable…”; `guides/README.md:144-146` same reason.

2. **MET.** `HomeView.vue:259` `:aria-label="COPY.join"`; control suffix `COPY.join` at `:272`. `constants.ts:212` `join: 'Join the community'` in the region-copy block with `introduction` / `offerings`.

3. **MET on the named files; shop/marketplace unchanged.** `ProductsView.vue:36` vs `:67`; `MediaView.vue:38` vs `:96`. Absent rows in `DATA_CASES`: products, magazine, marketplace, shop, media (`setup.ts:1249-1269`).

4. **MET.** Import `App.test.ts:22-40`. Declarations live in `setup.ts` as above. Grep of `App.test.ts` finds no `const SHELL_NAMES`, `const ROUTES`, `function readHeading`, `function followRoute`, `function readShared`.

5. **MET.** `helpers.test.ts:48-55`.

6. **MET on the named sentences; longest-line length not measured here.** `readMenuSettled` at `setup.ts:740-747` (classes). Guide `:154-155` does not claim the suite already settles on the announced state. Shell-destination examples at `:220-223` announce `Site` / cluster names; `Get started, Menu` is labeled an exception at `:144-146`. Label in Name at `:230-231`. Redundancy at `:233-237`. Data-state table rows (`:383-399`) are the longest visible lines; this lane did not record a character length.

7. **Show class gone; gate is `aria-modal`, not an instance shown API.** `App.vue:76-80`, `:99`. Tests named at `App.test.ts:300` and `:324`.

8. **UNMET.** No `tmp/units/r-a-2-report.md` / `.orkestrel/campaign/r-a-2-report.md`. Controls exist only in this reconstruction. Writer `git status --short` / `git diff --stat` at `23:44:25Z`:

```text
 M app/browser/App.vue
 M app/browser/components/HomeView.vue
 M app/browser/components/MagazineView.vue
 M app/browser/components/MediaView.vue
 M app/browser/components/ProductsView.vue
 M app/browser/constants.ts
 M guides/README.md
 M tests/app/browser/App.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/setup.ts
 10 files changed, 495 insertions(+), 184 deletions(-)
```

Supplied status adds `?? .codex/`. No `TODO` / `.only` / `it.todo` in the owned test files. Owned-file set matches R-A-2’s list; `app/core/constants.ts` was not touched; `.codex/` is not owned.

---

## Ownership anomalies

- `MagazineView.vue` edited (empty `Publications` collision from the red census).
- `ShopView.vue` / `MarketplaceView.vue` empty Contact recovery not edited.
- `view` computed remains in `App.vue:51` (template still uses it).
- Temporary `readNames` stub and `POPULATION` `console.info` were restored; current `setup.ts:1085-1092` is the restored form.
- Conformance failure on `vite.config.ts` / `vue` in `optimizeDeps` is outside R-A-2 ownership.

---

## Missing proof

- Writer report with C1–C4, census population, diff stat, status.
- Checker `CHECK:` line; verifier `GATES:` table.
- Orchestrator re-run of `r-a-audit-reproduction/probe-1.test.ts.txt` claim-5 (`readRefusal('Contact')` on empty `/media` and `/products` at both widths).
- Isolated `helpers.test.ts` log.
- Isolated post-fix census `-t` log that reprints an empty findings array (green is the named `✓` plus `166 passed`).
- Full 390 px population block from the `POPULATION` probe.
- Installed `@orkestrel/test/browser` `isReachable` / `aria-modal` declarations (package tree absent here).
- Independent `npm run format:check` / `lint:check` / `check` / browser / journey after this recovery (this lane did not read the concurrent verifier).

---

## Next evidence needed

A checker against this tree using `r-a-2-check-brief.md`. A verifier using `r-a-2-verify-brief.md`. The claim-5 empty-catalog Contact probe at both widths. A read of installed `@orkestrel/test` 0.0.17 `isReachable` if the hide-gate / modal overlap must be measured rather than inferred from T4’s 0.0.18 notes.
