# Tailwind completion: re-triage against the landed state (2026-10-05)

The Tailwind track is still open on 2026-10-05.
- **What the landed state closes:** 4 items outright and part of 36 more.
- **What remains:** 15 bounded units before stage B, plus one open fix slot (unit F) for the falsify round's findings. Unit J, the journey tuning unit, is already running. Beside that: one batch for the user, record drifts in 11 files, and later items.

All 136 items are accounted for by id in the last section.

How to read this document:
- **Paths.** `RECORDS` is `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer`, `VENEER` is `/home/user/veneer`, `SCAFFOLD` is `/home/user/scaffold`, and `V` is `RECORDS/tailwind-flip/tokens/design-verdict.md`.
- **Line readings.**
  - Veneer lines are read at `4d21de7` (`main`, the reflog head).
  - Record lines are read at scaffold worktree `ef47ff1e`. That commit adds only the audit folder after `886d5a67`.
  - Every record line re-read here matches the checklist's `886d5a67` citation.
- **Tags.** Each id carries its sweep tag: `flip`, `token`, `tree`, `lanes`, or `units`. The same number names different items in the `tree` and `lanes` sweeps.

## 1. Closed by the landing

### Closed outright

Each of the following items is closed by a landed commit or line. Any residue has its own id elsewhere.

- token U8-LAND: veneer `main` fast-forwarded `77c65cf` to `4d21de7` (`RECORDS/lanes.md:78`). The landing gates are at `RECORDS/tailwind-flip/units/tokens-landing/gates-4d21de7.txt:1-54`. The unrecorded landing rule is units landing-rule (§ 4).
- token U8-T3: T3 committed at `44b3610` and archived at scaffold `7bea0535` (`RECORDS/tailwind-flip/units/tokens-t3/report-3.md` to `report-5.md`, `review/`). It is logged at `RECORDS/lanes.md:96-103`. The gate-record defect is units t3-gate-record (§ 4).
- lanes TW-02: `b242bce` and `07694f8` are on `main` (`RECORDS/lanes.md:78`, `:92`). App browser, setup browser, and the journey read the overwritten configuration (`gates-4d21de7.txt:21-30`). The roadmap residue merges into the § 4 Scaffold propagation edit.
- lanes TW-10: the merged-tree gates ran, `build:showcase` is committed whole, and `main` is fast-forwarded (`RECORDS/lanes.md:76-81`; `gates-4d21de7.txt:31-33`). The residue merges into units npm-test-whole (unit A7).

### Closed in part

Each of the following lines names the half the landed state closes and where the rest goes.

- tree TW-01: the re-pin is landed (`b242bce`, `07694f8`; `RECORDS/lanes.md:78`). Rest: the per-script rulings at `RECORDS/lanes.md:92` (§ 4).
- token X-9: entries at `RECORDS/lanes.md:64-103` log T3's sixth pass, T4, `5ea6cc19`, and browser 0.0.24 with scaffold 0.0.91 and 0.0.92. Rest: the user's word of 2026-10-05 (§ 4).
- token X-7: `VENEER/ROADMAP.md:143` ("landed 2026-10-05") is true on `main` at `4d21de7`. Rest: `RECORDS/plan.md:19` (§ 4).
- token X-10: the T3 archive is at `7bea0535` and the T4 archive at `a72ffeed`. Rest: the raw outputs (unit A1).
- token U8-LAW: the clause is landed at scaffold `4e94add7` (`SCAFFOLD/.claude/rules/styles.md:77-81`). Rest: ROADMAP item 12 (§ 4).
- token U8-T1: T1 `6874b79` is on `main`. Rest: the `contrastColor` twin clause of V:124 (unit A5).
- token S7-8: the guide floor is right at `VENEER/guides/veneer.md:1676`, and V:13 was amended at `a72ffeed`. Rest: V:132 (§ 4).
- token Q-1: the guide wording is repaired (`VENEER/guides/veneer.md:1676`). Rest: the user's answer (§ 3).
- token S7-7: the gamut half is pinned by `reads seven hue bases outside sRGB and the farthest clip on yellow-500` (`VENEER/guides/veneer.md:1691`). Rest: the `m7.json` archive (unit A1).
- token O11-CLIP: V:184 answers the question, and `VENEER/guides/veneer.md:1688-1698` states the residual. Rest: the § 11 closure (§ 4) and the archive (unit A1).
- token R-F: findings 1 to 11 and 13 to 16 are closed by T3 `44b3610` and T4 `4d21de7` on `main`. The partition control was amended at `5ea6cc19` (V:139). Rest: finding 12's scale controls (unit A5) and the closure note (§ 4).
- token S7-10: the cases are at `44b3610` (`VENEER/tests/app/browser/Showcase.test.ts:347`, `:466`). Rest: the Header sentence (unit B5).
- flip FV-X10: the re-pin is at `b242bce` and `07694f8`, and the 0.0.92 publication is logged at `RECORDS/lanes.md:105-109`. Rest: ROADMAP (§ 4).
- flip FV-X13: the stale titles are fixed at `4d21de7`. Rest: the gate (unit A4).
- units guide-titles: the six truncated citations are fixed at `4d21de7`. Rest: the gate (unit A4).
- flip FV-R4:
  - Closed: P9 accepted the toolchain (`RECORDS/tailwind-flip/design-verdict.md:170`). The amendments are at scaffold `427a733d`, carried by 0.0.91 and 0.0.92, and adopted at `b242bce` and `07694f8`.
  - Rest: the pin (unit A2) and the roadmap record (§ 4).
- flip FV-O1: U0 to U8, the falsify round, and the fix wave landed with `77c65cf` (`RECORDS/lanes.md:156`). Rest: `npm test` (unit A7).
- flip FV-D1: the amendments shipped and were adopted (the preceding line). Rest: the user's confirmation (§ 3) and the roadmap (§ 4).
- flip FV-X16: the record obligation is met by `VENEER/ROADMAP.md:175` on `main`. Rest: the tuning itself (unit J).
- Journey tuning (token L-3, token O11-M6, lanes TW-12, units journey-tuning, tree TW-28):
  - Closed: the design round is ruled (`RECORDS/showcase/journey-cost-2026-10-05/verdict.md:11-13`), and Q1 was answered yes (`verdict.md:196`; `RECORDS/lanes.md:64-67`).
  - Rest: the unit and its attribution (unit J).
- Setup-browser timeout (tree TW-02, lanes TW-09):
  - Closed: the timeout did not recur at the landing (`gates-4d21de7.txt:23-24`, `:42`, 156 passed).
  - Rest: the lanes record (§ 4) and the stall (unit J, item 9).
- units t3-gate-record: the timeout feeds journey item 9 (`verdict.md:50`). Rest: the copies (unit A1) and `RECORDS/lanes.md:100` (§ 4).
- Token defaults (tree TW-17, lanes TW-19, units token-defaults):
  - Closed: default 5 is landed at `4e94add7`. Default 6 is met with no release between the landings (`RECORDS/lanes.md:80`).
  - Rest: defaults 1 to 4 (§ 3).
- token D9-4: the sentence and its case are on `main` (`VENEER/guides/veneer.md:2336-2348`). Rest: the user's answer (§ 3).
- token L-1 and token L-2: the roadmap lines are on `main` (`VENEER/ROADMAP.md:173`, `:174`). Rest: confirming the deferral (§ 3) and the later items (§ 5).
- lanes TW-23: the veneer-release half is ruled (`RECORDS/lanes.md:50`, `:80`). Rest: the scaffold release that carries `4e94add7` (§ 3 report, § 4).
- lanes TW-33:
  - Closed: the re-pin ask moved (`RECORDS/lanes.md:132`), `24ae43d` was pushed (`:322`), and `_mixins.scss` stays (`RECORDS/tailwind-flip/units/flip-falsify/reviewer-verdict.md:38`).
  - Rest: the engine-host reading clause (§ 3, the Windows question).
- lanes TW-37: the elements addendum is read at scaffold `18bdc494`, and the remainder-map corrections are at `98c1613e`. Rest: § 5.

## 2. Units before stage B

Every command that launches Chromium or loads the CPU runs through `flock /home/user/.wave/journey.lock` and the unit's Node runner. Every lane pauses during a price window. Sources: `RECORDS/lanes.md:40`; `verdict.md:114-116`.

Worktrees follow the journey verdict's form:
- They sit under `/home/user/.wave/<name>/`.
- Each gets a `cp -a` copy of `node_modules`, made only after `cmp` shows the lockfiles equal.
- No `node_modules` sits in `/home/user/.wave` or `/home/user` (`verdict.md:118`).

The Host line of each unit means:
- **Node:** a worktree with Node gates through the queue.
- **Browser:** a Chromium suite through the queue.

### Order

1. Unit J runs throughout.
2. Units A1 to A8 and F run beside it, in this order: A1, A2, A3, A7, A4, A5, A6, A8, then F. Each A unit writes no file that unit J writes or imports.
3. Units B1 to B5 run after unit J lands on `main`, in that order, then B6, which the user adopted on 2026-10-05 with § 3 item 26.
4. Unit F runs after unit A8. Where F touches a unit J file, it waits for unit J and runs before B1.

### J. Journey run-cost tuning (in flight, governed by its verdict)

- **Closes:** flip FV-X16, token O11-M6, token L-3, lanes TW-12, units journey-tuning, and tree TW-28.
- **Owner:** lane M, under `RECORDS/showcase/journey-cost-2026-10-05/verdict.md` (`RECORDS/lanes.md:64-67`).
- **Close condition, part 1:** lane M's record (`verdict.md:180`, step 14) adds a growth attribution:
  - J-B0's per-case durations against `journey-4.json` (the 591.13 s run);
  - P-A's split of the preservation controls and of the three partitions per width.
- **Close condition, part 2:** R, frozen in `RECORDS/lanes.md` (`verdict.md:88-94`), stands as the recorded budget that answers M6 (V:183). Plan v3's best model leaves about 615 to 640 s (`plan-v3.md:20-21`).
- **At its landing:** `VENEER/ROADMAP.md:175` records the landed result.
- **Stall rule (lanes TW-09, stall half):** a repeat of the 15 s `setup:browser` stall blocks a landing, because § Host-bound set names no `setup:browser` title (`RECORDS/lanes.md:60`).

### A1. Records copies and the durable writers

- **Closes:** flip FV-X4, flip FV-D11 (record half), lanes TW-28, units writers-durable, token X-10, token S7-7 (rest), token O11-CLIP (archive half), units bash-gate-script (record half), lanes TW-35 (copy half), and units t3-gate-record (copy half).
- **Role:** the Orchestrator. It changes no veneer path.
- **Copy scope, writers.** Every source is under `VENEER/tmp/units/` and every destination under `RECORDS/tailwind-flip/`:
  - `tokens-t2/preflight.test.ts` replaces `writers/flip-integration/preflight-record.test.ts`. The current copy asserts Chromium 141 at `:12` and reads `dist/src/bootstrap/index.css` at `:3`.
  - `tokens-t1/write-tokens.test.ts`, `TokenWriter.ts`, `vite.writers.config.ts`, `generate.ts`, and `helpers.ts` go to `writers/tokens-t1/`.
  - `tokens-t2/maps.test.ts`, `preflight.test.ts`, `vite.writers.config.ts`, and `vite.preflight.config.ts` go to `writers/tokens-t2/`.
  - `tokens-t4/write-table.ts` goes to `writers/tokens-t4/`.
- **Copy scope, run evidence.** Destinations are under `RECORDS/tailwind-flip/units/`:
  - `VENEER/tmp/probes/tokens2/out/m2.json` and `m7.json` go to `tokens-probe-2/`. Then fix the link at `tokens-probe-2/report.md:27` and the path at `last.md:9`.
  - `tokens-t4/consumer-reading.json` and `gamut-reading.txt` go to `tokens-t4/`.
  - `tokens-t3/out/p4-6a.json` and `tokens-t3/p4-cmp-6.json` go to `tokens-t3/`.
  - `tokens-t3/review/setup-browser-gates-timeout.err`, `setup-browser-verbose.log`, and `setup-groups-iso.log`, plus the review files the archived `tokens-t3/brief.md` cites, go to `tokens-t3/review/`.
  - `tokens-t3/review/overwrite-0.0.92.log` and the `ow-*.log` files (the `07694f8` overwrite gates) go to `tokens-landing/`.
- **Same commit:** correct `RECORDS/lanes.md:197` (§ 4).
- **Acceptance:** each copy's SHA-256 equals its source's.
- **Host:** none. The unit launches nothing.

### A2. Cross-face load case

- **Closes:** flip FV-X1, tree TW-18, lanes TW-14, units cross-face-policy, and flip FV-R4 (pin half).
- **Role:** `astra`.
- **Scope:** one Node case in `VENEER/tests/conformance.test.ts`, with its reader as a module-scope helper in that file. The case:
  - reads every `@use`, `@forward`, `@import`, and `meta.load-css()` call;
  - reads every TypeScript import and re-export under `src/bootstrap`, `src/tailwindcss`, and `src/styles`;
  - admits a cross-face load only where `src/tailwindcss` `@use`s a `src/bootstrap` partial, as `SCAFFOLD/AGENTS.md:28` grants ("may `@use` that extension's Sass partials … and imports none of its TypeScript").
- **Acceptance:**
  - The admitted set equals the five loads at `VENEER/src/tailwindcss/index.scss:2-5` and `VENEER/src/tailwindcss/_tokens.scss:422`, and the shipped tree passes.
  - Each of four controls fails: `@use '../tailwindcss/tokens'` in a `src/styles` partial, `@forward '../bootstrap/mixins'` in a `src/styles` partial, `import '../bootstrap/sheet.js'` in `src/tailwindcss/index.ts`, and `@use '../../tailwindcss/mixins'` in a `src/bootstrap` partial.
  - The controls run on in-memory copies and write nothing under `src/`.
- **Gate:** the conformance file, then `npm run test:conformance`, `lint:check`, `format:check`, and `check`.
- **Host:** Node.

### A3. Packed `./tailwindcss/scss` cases

- **Closes:** flip FV-X3 and units packed-scss-distribution (case half).
- **Role:** `astra`.
- **Scope, cases:** two cases in the `packed Tailwind recipe` describe (`VENEER/tests/distribution.test.ts:875`), mirroring the Bootstrap pair (`:832`, `:855`):
  - A Vite build of the bare fence `@use '@orkestrel/veneer/tailwindcss/scss';` (`VENEER/guides/veneer.md:1244`) from the packed consumer.
  - A `compileString` of the `pkg:` form through `NodePackageImporter`.
  - Each equals the packed `dist/src/tailwindcss/index.css` after one round trip with `/*$vite$:1*/` stripped, as `VENEER/tests/conformance.test.ts:1655-1658` does from source. Each has a planted-rule control.
- **Scope, skip reason:** the skip line (`:992`) must name the cause the ping reports.
  - `PING` (`:65`) passes `--loglevel=silent`, which hides the `EBADDEVENGINES` refusal from the npm floor (`VENEER/package.json:158-164`).
  - Drop that flag, and carry the ping's exit code and its first stderr line into the skip message.
- **Acceptance:**
  - With `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` and the registry reachable, both cases pass and neither is skipped.
  - Each control fails.
  - With npm 10 first, the skip line names `EBADDEVENGINES` (one reading).
- **Gate:** `npm run test:distribution`, `lint:check`, `format:check`, and `check`.
- **Host:** Node.

### A7. Full-suite reading on the landed tree

- **Closes:** flip FV-X2, flip FV-O1 (rest), flip FV-D12 (Vue half), flip FV-D10 (packed half), units npm-test-whole, units packed-scss-distribution (run half), and lanes TW-10 (rest).
- **Role:** `verifier`. It edits no source.
- **Scope, scripts:** on veneer `main` at the commit that carries A3, with npm 11 first on `PATH` and outside price windows, run each of these bare:
  - `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`, and the same with `--project app:core`;
  - `npm run test:src:styles`, `npm run test:src:vue`, `npm run test:app:vue`, `npm run test:journey:vue`, and `npm run test:config`;
  - then `npm run test:distribution`.
- **Scope, coverage proof:** confirm with `git diff --stat 4d21de7 HEAD` that no commit since `4d21de7` touched a file these projects collect. Each other `npm test` sub-script carries its reading in `gates-4d21de7.txt:9-45`, or in the gate of the unit that last changed its files.
- **Records:** counts and the packed recipe case titles go into a gate file under `RECORDS/tailwind-flip/units/tokens-landing/` and a `RECORDS/lanes.md` § Log entry. The § 4 roadmap edit cites the run at `VENEER/ROADMAP.md:143`.
- **Acceptance:** every failure is in § Host-bound set (`RECORDS/lanes.md:54-60`), and the distribution cases ran. A failure outside the set blocks stage B.
- **Host:** Browser.

### A4. Guide case-title gate

- **Closes:** flip FV-X13 (rest) and units guide-titles (rest).
- **Role:** `astra`.
- **Scope:** one case in `VENEER/tests/guides.test.ts`, registered in the `GuideCommand` `execute` callback (`SCAFFOLD/.claude/rules/documentation.md`, Parity). It resolves every span that `VENEER/guides/veneer.md` cites as a case against the test titles under `VENEER/tests/`:
  - A span counts when `case` or `cases` follows it, or when it sits in a column headed `Case`.
  - `%s`, `$name`, and `${...}` in a title match any text.
  - The case does not import the ignored `VENEER/tmp/flip-guide/resolve.ts`, which flags 48 spans that are not titles at `4d21de7`.
- **Acceptance:** zero unresolved spans. A planted unresolved title fails. A planted CSS-value span (`1280px`) with no `case` after it is not read.
- **Gate:** `npm run test:guides`.
- **Host:** Node.
- **Effect on unit J:** after A4 lands, unit J's lane 0 must keep its retitled citations at `VENEER/guides/veneer.md:2140` and `:2174-2175` resolving, because `test:guides` is in J's acceptance list (`plan-v3.md:652`).

### A5. Token proof residues and the one-row palette title

- **Closes:** token U8-T1 (rest), token R-F (finding 12 half), units tests-unit-paths, and units one-row-palette.
- **Role:** `astra`.
- **Scope, contrast twin:** the palette case (`VENEER/tests/conformance.test.ts:1426-1470`) computes the base rule of V:13 through a TypeScript twin of Bootstrap's `color-contrast()` function, as V:124 asks.
  - No `contrastColor` exists under `VENEER/tests/`. Add it to `VENEER/tests/setupServer.ts` with its proof in `setupServer.test.ts`.
  - Control: the identity-row change that `RECORDS/tailwind-flip/tokens/design/judge-mechanism.md:84` and `:128` describe.
- **Scope, scale controls:** the derivation case's control loop (`VENEER/tests/src/tailwindcss/index.test.ts:433-444`) gains ramp's two scale controls (`RECORDS/tailwind-flip/tokens/rulings.md:23`): one extra changed `--bs-gutter-x`, and one `xl` rule left at `1200px`. Each reads a sequence unequal to the expected one.
- **Scope, scratch paths:** the tracked cases stop writing under `tmp/units/tokens-t1` and `tmp/units/tokens-t2` (`index.test.ts:81`, `:128`; `conformance.test.ts:1564`).
  - Readings log through `console.info`.
  - The conformance case takes `createScratch`'s default parent.
- **Scope, retitle:** this unit edits the case at `conformance.test.ts:1556`, so the one-row-palette trigger fires here.
  - Retitle `keeps the Bootstrap digest under empty switches and changes it under a one-row palette` to `keeps the Bootstrap digest under empty switches and changes it under a palette that changes one row`.
  - Change `VENEER/guides/veneer.md:1532` to the same title.
  - The V § 4 and § 5 amendments are in § 4.
- **Acceptance:** every existing control stays, and each added control fails.
- **Gate:** `test:src:tailwindcss`, `test:conformance`, `test:setup`, `test:guides`, `lint:check`, `format:check`, and `check`.
- **Host:** Browser. `test:src:tailwindcss` is a Chromium project (`VENEER/ROADMAP.md:84`), which corrects the checklist's "Node-gated" (`checklist.md:108`).
- **Order:** runs after A2, which also writes `conformance.test.ts`.

### A6. Consumer rows for `./tailwindcss` linked alone and linked beside

- **Closes:** flip FV-X9 (linked-alone half), lanes TW-15, and units consumer-rows.
- **Role:** `astra`. The brief carries the exact row text.
- **Scope, readings:** two readings in `VENEER/tests/integration.test.ts`, with the recipe as each control:
  - Under `[tuned]`, the shared name `mt-3` reads no rule, and the CSSOM holds no `@source` rule.
  - Under `[tuned, recipeRecord.unexcluded]` (the composition at `:385`), `.collapse.show` reads `visibility: collapse`.
- **Scope, guide:**
  - The composition table (`VENEER/guides/veneer.md:1281-1292`) gains the "Tailwind absent, `./tailwindcss` linked alone" row (unsupported) and the linked-beside row, each citing its case. The bare-`h1` reboot reading cites the case at `integration.test.ts:384`.
  - The sentence at `VENEER/guides/veneer.md:1236-1239` cites both cases.
  - The `h5.modal-title` row names `h1.modal-title.fs-5` and cites `reads every Tailwind reading the caption claims under the three faces in %s color mode`. Those rows read `<h1 class="modal-title fs-5">` (`VENEER/tests/setupBrowser.ts:684-701`; `VENEER/app/browser/sections/tailwindcss.html:224`).
- **Same commit:** the § 4 hand fixes for the guide's § Tailwind compatibility sheet and § Compare.
- **Acceptance:** each reading fails with its recipe control.
- **Gate:** `test:integration`, `test:guides`, `lint:check`, `format:check`, and `check`.
- **Host:** Browser.

### A8. One falsify round over the token round as landed

- **Closes:** tree TW-13 and lanes TW-08.
- **Roles:** each lane takes an engine that did not write the claims it attacks.
  - `reviewer` (Opus) attacks the T1 to T3 claims and V § 11, because Astra wrote T1 to T3.
  - `analyst` (Astra) attacks the T4 claims, because Opus wrote T4.
- **Subject:** veneer `main` at the commit after A5. The numbered claims are:
  - T1's switches, functions, 571-site edit, and writer;
  - T2's derivation through `substituteTokens`, the relation case, the infix case, and the RFS cap case;
  - M8, M1, and M7 (V:190).
  - Of T3 and T4, only the claims their reviews repaired are re-audited (`RECORDS/lanes.md:86`, `:99`; `SCAFFOLD/.agents/orchestration.md:60`).
- **Scope:** read-only lanes. Every Chromium reading goes through the queue. The lanes write only under `VENEER/tmp/units/tokens-falsify/`.
- **Record:** the Orchestrator's ruling that the round completes the audit step the large size gate names (`orchestration.md:57`) and runs under the user's word of 2026-10-05 (§ 3 item 27).
- **Host:** Browser readings.

### F. The falsify round's fix unit

- **Role:** chosen by finding, and fixed by A8's verdict.
- **Order:** it lands before stage B. Where it writes a unit J file, it waits for unit J and runs before B1.

### B1. Journey observer repair

- **Landed:** veneer `2ba68b9` on 2026-10-05 (`RECORDS/lanes.md`, the B1 entry); the journey host-bound set emptied.
- **Closes:** units journey-observers.
- **Role:** `astra`.
- **Owned files:** the engine section of `VENEER/tests/setupBrowser.ts` (`actOnDisclosureControl`, `observeShowcaseStability`), the J8 toast read in `VENEER/tests/app/browser/integration.test.ts`, and `RECORDS/lanes.md:59`.
- **Scope:**
  - Capture a failing collapse trace first. The seventh diagnosis traces only the accordion (`RECORDS/tailwind-flip/units/flip-journeys/seventh-diagnosis.md:12-16`).
  - Then repair the Enter-burst count, the refusal recorder's root filter, and J8's read under `.toast.showing`.
  - Remove each title from `RECORDS/lanes.md:59` after it passes two full runs.
- **Gate:** `test:setup:browser` and `test:journey` twice.
- **Host:** Browser.
- **Why it waits:** `verdict.md:15-27` holds the host-bound set fixed while unit J runs.

### B2. Nested-aware reader and two TSDoc fixes

- **Landed:** veneer `ec37454` on 2026-10-05 (the B2 entry).
- **Closes:** flip FV-X14, lanes TW-16, units nested-reader, tree TW-19, and tree TW-20 (remark half).
- **Role:** `astra`.
- **Owned files:** `VENEER/tests/setupStyles.ts` (`:713`, `:1251-1284`), `VENEER/tests/setupStyles.test.ts`, and `VENEER/tests/setupBrowser.ts` (`:284-298`, `:1769`).
- **Scope, nesting proof:** a proof that `scanSheetRules` on `.container { @media (min-width: 40rem) { max-width: 40rem } }` pins whether the `CSSNestedDeclarations` comes back with its `@media` context and layer.
  - The control is a flat rule. Preflight's `::placeholder` rule with its nested `@supports` is a real witness.
  - If the declarations do not come back: descend into `CSSStyleRule` (as `collectLayerClasses` at `:1824` does), give `SheetEntry` a selector field, re-read the counts that other proofs pin, and build `readPartitionRules` on the shared walk.
  - If they do come back: record why `readPartitionRules` keeps its own walk, or retire that walk.
- **Scope, TSDoc:**
  - The `@param coupled` TSDoc (`:713`) names the visible-to-auto half it follows, and that a clip-to-hidden coupling reads `unattributed` and fails closed.
  - `mapReading` gains a `@remarks` sentence: it maps record rows, not breakpoint-band states, at a 16 px root (`:312`).
- **Gate:** `test:setup:browser`, `test:src:tailwindcss`, and `test:integration`, plus `test:journey` if `readPartitionRules` changes.
- **Host:** Browser.
- **Why it waits:** unit J's lane 2 edits the partition code (`verdict.md:45`).

### B3. `flip-preservation-modes`: dark mode, open states, and a `curated` cause

- **Landed:** veneer `ae7d545` on 2026-10-06 after seven launches (the B3 entry), followed by the re-pin `47c0765` and the rows fix `9bc0003`, which moved the per-state elapsed time out of the preservation rows.
- **Closes:** flip FV-R2 and units resolved-copies.
- **Role:** `astra`.
- **Owned files:** `VENEER/tests/setupStyles.ts` (`attributeDeparture` at `:574`, `DepartureCause`), `setupStyles.test.ts`, the preservation halves in `VENEER/tests/app/browser/integration.test.ts`, `collectComponentPreservation` in `VENEER/tests/setupBrowser.ts`, and the witness baseline in `VENEER/tests/src/tailwindcss/index.test.ts`.
- **Scope:**
  1. Rerun probe-4's matrix (`VENEER/tmp/probes/flip5/`) over the mapped tuned sheet in both color modes. Cover the six open states: tooltip, popover with the engine-built `h3.popover-header`, dropdown, modal, offcanvas, and toast.
  2. Where the probe reads zero `preflight` and zero `unattributed` residuals, widen the gate to `dark-1280` and the open states. Fold each derived row under the Orchestrator's ruling.
  3. Split copies out of `resolved` into a `curated` cause. Control: a planted copy that exists only in the recipe and departs on an element that is not a witness.
  4. Rerun the copy check against the mapped tuned sheet.
  5. Give the scoped hazard witnesses a baseline that has the map and no copies (`mapTokenSheet(lifted, record, 'band')`).
- **Gate:** `test:setup:browser`, `test:src:tailwindcss`, and `test:journey`. Record the gate's added cost.
- **Host:** Browser.
- **Order:** after B2, which also writes `setupStyles.ts`.

### B4. `TAILWIND_READINGS` rows for the containers and tables captions

- **Landed:** veneer `638435a` on 2026-10-06 (the B4 entry); the rows half of TW-22 closed, the table half with B5.
- **Closes:** tree TW-22 (rows half).
- **Role:** `astra`.
- **Owned files:** `TAILWIND_READINGS` in `VENEER/tests/setupBrowser.ts` (after `:843-859`).
- **Scope:** two rows, sourced from `VENEER/app/browser/sections/containers.html:65-67` and `tables.html:299-300`:
  - `.container-sm` `max-width` at 1280 px reads `1140px`, `1140px`, and `1280px`.
  - `.table-responsive-sm` `overflow-x` reads `visible` at 1280 px and `auto` at 390 px, with per-face minimum widths of 576, 576, and 640 px.
- **Gate:** `test:setup:browser` and `test:journey`, because J4 reads every row.
- **Host:** Browser.
- **Order:** after B3, which also writes `setupBrowser.ts`.

### B5. `showcase-guide`, carrying every § Showcase fix

- **Landed:** veneer `90b96bb` on 2026-10-06 (the B5 entry); fourteen fixes, `ROADMAP.md:144` and `:188` read closed.
- **Closes:** flip FV-X17, flip FV-X5, token A-1, token S7-10 (rest), token X-8, lanes TW-13, tree TW-08, tree TW-05, flip FV-D8 (guide half), and flip FV-D9 (guide half).
- **Role:** `opus`.
- **Owned files:** § Showcase of `VENEER/guides/veneer.md` (`:2049-2701`) and `VENEER/ROADMAP.md:182`.
- **Scope:**
  - Rule claims 3, 4, 5, 18, and 21 (`RECORDS/showcase-audit-verdict.md:52`) and record each disposition.
  - Apply the § Showcase hand fixes in § 4.
- **Depends on:**
  - unit J, because lane 0 rewrites `:2140` and `:2174-2175` and lane 4 rewrites `:2578`;
  - B3 (the Faces bound) and B4 (two readings rows);
  - the user's answer to § 3 item 9.
- **Gate:** `test:guides` and `test:policy`.
- **Host:** Node.

### B6. Chromium 153 host reading (adopted on 2026-10-05 with § 3 item 26)

- **Read:** on veneer `638435a` on 2026-10-06 under Chromium 153.0.8010.12 from `/home/user/.wave/pw-153`, no veneer change (the B6 entry); four readings move against 141 and feed D-10; the host keeps 141.
- **Closes:** units host-reading, lanes TW-21, and tree TW-15 (reading half). It feeds D-10 (`RECORDS/lanes.md:149`).
- **Role:** `verifier`.
- **Why it waits for unit J:**
  - `/opt/pw-browsers` holds only `chromium-1194`, while `VENEER/node_modules/playwright-core/browsers.json:6-8` pins revision 1243 (`153.0.8010.12`).
  - A journey run counts only when it resolves J-B0's executable (`verdict.md:98`).
- **Scope:**
  - Install revision 1243 through the queue.
  - Read bare `test:src:browser`, `test:src:tailwindcss`, `test:setup:browser`, `test:integration`, and `test:journey`.
  - Log which § Host-bound set titles pass under 153, and which version-gated branches the token and preflight proofs take.
- **Host:** Browser.

## 3. Defaults and questions for the user, in one batch

No record holds the user's word on any of the following items (`RECORDS/stage-b/remainder-map-2026-10-04.md:116`; `RECORDS/lanes.md:64-334`). Put them in one message. After the answers, record them in `RECORDS/plan.md` § Standing rulings and in a `RECORDS/lanes.md` § Log entry (`RECORDS/lanes.md:3`).

The flip verdict's § 10 (`RECORDS/tailwind-flip/design-verdict.md:115`) is built and landed at `77c65cf`. The aggregates are flip-defaults, tree TW-16, and lanes TW-18.

1. **§ 10 item 1, the two scaffold law amendments (flip FV-D1).**
   - **As built:** the landed wording differs from the draft at `:117`, so quote the landed sentences:
     - `SCAFFOLD/AGENTS.md:28`: "No extension face imports server code or another extension's face, with one exception: a styles extension that builds another styles extension's recreation for a utility library (`src/tailwindcss` building Bootstrap for Tailwind) may `@use` that extension's Sass partials, configured through their `_tokens.scss` switches, and imports none of its TypeScript."
     - `SCAFFOLD/.claude/rules/styles.md:74-76`: "A derived build of that recreation for a utility library may place the framework's reset rules in `reset` under a switch the guide records, keeping every `!important` declaration outside every layer."
   - **Releases:** 0.0.91 (`913b0542`) and 0.0.92 carry both. Veneer adopted them at `b242bce` and `07694f8`. The 0.0.91 bump record does not name them (`/home/user/.wave/scaffold-main-wt/.orkestrel/release.md:22`).
   - **Consumer effect:** none directly. The layer's build depends on them.
   - **Recommendation:** confirm. Unit A2 is the pin.
2. **§ 10 item 2, three faces (report, no answer needed).**
   - **As built:** R12 replaced the labels with `Bootstrap`, `Tailwind, no layer`, and `Tailwind + layer` (`VENEER/tests/setupBrowser.ts:481-485`; `RECORDS/tailwind-flip/brief.md:96`).
   - **Consumer effect:** none.
3. **§ 10 item 3, the 17 shared component names stay Bootstrap's (flip FV-D3).**
   - **As built:** an exception to R1, "Tailwind wins at every conflict" (`RECORDS/tailwind-flip/brief.md:13`).
   - **Consumer effect:** `container`, `collapse`, `col-*`, and `table` keep Bootstrap's rules under the recipe, and Tailwind generates nothing for those names (`VENEER/tests/integration.test.ts:772`, `:921`).
   - **Recommendation:** confirm.
4. **§ 10 item 4, Bootstrap's documented markup reads Tailwind's meaning on a shared name (flip FV-D4).**
   - **Consumer effect:** `w-100` reads `calc(var(--spacing) * 100)`, and the guide names `w-full` (`VENEER/guides/veneer.md:1306-1312`). A form's `mb-3` reads 12 px.
   - **Recommendation:** confirm.
5. **§ 10 item 5, `[hidden]` is withheld from the Tailwind build (flip FV-D5).**
   - **Consumer effect:** under the recipe, `hidden="until-found"` reads `content-visibility: hidden`, not `display: none`. `hidden` beats `d-flex` under both Tailwind faces (`VENEER/tests/integration.test.ts:652-683`).
   - **Recommendation:** confirm.
6. **§ 10 item 6, linking `./bootstrap` beside the recipe is unsupported (flip FV-D6).**
   - **Consumer effect:** `mt-3` reads 16, 12, and 16 px across the three compositions (`VENEER/guides/veneer.md:1268-1274`; `VENEER/tests/integration.test.ts:983`).
   - **Recommendation:** confirm.
7. **§ 10 item 7, curation coverage (flip FV-D7).**
   - **As built:** two Orchestrator deviations.
     - `:where(.table) tfoot` and `:where(.table) tr` stay on hazard witnesses, although probe-4 did not reproduce them (`RECORDS/tailwind-flip/units/flip-fold-2/brief.md:131`).
     - 19 derived rows stay out (`:130`), among them the description-list margins: 16 px and 8 px under `bootstrap`, 0 px under `tailwindcss` (`VENEER/tests/setupBrowser.ts:2022-2028`).
   - **Consumer effect:** those margins are the consumer's to set.
   - **Recommendation:** confirm, after § 12 records both deviations (§ 4).
8. **§ 10 item 8, the chrome replaces five shared names (flip FV-D8).**
   - **As built:** in the narrower form R12 gives it, Tailwind's scale reaches only page chrome outside the header (V:157). P4 read zero box departures (`RECORDS/lanes.md:268`).
   - **Consumer effect:** none. It affects the showcase only.
   - **Recommendation:** confirm in that form.
9. **§ 10 item 9, the showcase page weight (flip FV-D9).**
   - **As built:** read on 2026-10-05 with `git show COMMIT:showcase/browser.html | wc -c` (`checklist.md:241-248`):
     - 951,698 bytes at `d0603b4`;
     - 1,378,489 bytes at `77c65cf` (+44.8 %);
     - 1,384,109 bytes at `4d21de7`.
   - **Consumer effect:** the published page grows. The package sheets do not.
   - **Recommendation:** accept. Unit B5 records the figure.
10. **§ 10 item 10, no bundler package; the recipe is proved through Tailwind's `compile` API (flip FV-D10).**
    - **Consumer effect:** the bundler path stays unproven.
    - **Recommendation:** confirm. Unit A7 reads the packed proof, and § 4 adds the limit sentence.
11. **§ 10 item 11, record writers under `tmp/units/` with durable copies (flip FV-D11).**
    - **Consumer effect:** none.
    - **Recommendation:** confirm. Unit A1 repairs the copies.
12. **§ 10 item 12, the Vue entry is unaffected, browse serves the page, and U6 records the cost (flip FV-D12).**
    - **Consumer effect:** none.
    - **Recommendation:** confirm. Unit A7 reads the Vue projects.
13. **§ 10 item 13, the landing rule (flip FV-D13).**
    - **As built:** both landings met it together with the journey reading (`RECORDS/lanes.md:249`, `:157`, `:78-79`).
    - **Consumer effect:** none.
    - **Recommendation:** confirm. The host clause follows item 26.
14. **§ 10 item 14, percentage shared names read Tailwind's spacing (flip FV-D14).**
    - **Consumer effect:** `w-25` reads 6.25rem, `top-50` reads 12.5rem, and `start-100` reads 25rem under the recipe.
    - **Recommendation:** confirm. § 4 adds the guide sentence.

The token round's defaults are reversible at the user's word (`RECORDS/tailwind-flip/tokens/rulings.md:3`; V:172). All six are landed at `4d21de7`. The aggregates are token-defaults, tree TW-17, and lanes TW-19.

15. **Default 1, font, radius, and shadow references (token D9-1).**
    - **Consumer effect:** a consumer's `@theme` font, radius, and shadow reach Bootstrap's components, and the fallback pins the default rendering (`VENEER/guides/veneer.md:1645-1655`).
    - **Recommendation:** confirm.
16. **Default 2, colors pinned to Tailwind's palette as sRGB hex, and the Sass `$palette` deferral (token D9-2, token L-1).**
    - **Consumer effect:** a consumer's `--color-*` value does not reach `.btn-primary` (`VENEER/guides/veneer.md:1645-1650`).
    - **Recommendation:** confirm both. The switch waits for a first Sass consumer under the Minimal public API law (`SCAFFOLD/AGENTS.md:65`).
17. **Default 3, container widths equal Tailwind's breakpoints (token D9-3).**
    - **Consumer effect:** `.container` reads 1280 px at a 1280 px viewport, against Bootstrap's 1140 px. Documented layouts move in four bands (`VENEER/guides/veneer.md:1657-1660`).
    - **Recommendation:** confirm.
18. **Default 4, `@custom-variant dark` as an optional guide sentence (token D9-4).**
    - **Consumer effect:** none unless the consumer adds it (`VENEER/guides/veneer.md:2336-2348`).
    - **Recommendation:** confirm.
19. **Defaults 5 and 6 (report, no answer needed).**
    - Default 5 is landed at scaffold `4e94add7` (`SCAFFOLD/.claude/rules/styles.md:77-81`). No release carries it (item 29).
    - Default 6 is met: no veneer release shipped between the landings (`RECORDS/lanes.md:80`).
20. **R12's face-neutral chrome, re-read under R11 (token D-R12, lanes TW-20).**
    - **As built:** the header departs between faces only by token rows: 134 palette and 16 font departures (`VENEER/guides/veneer.md:2113-2116`). The face-neutral clause is the Orchestrator's reading at `RECORDS/tailwind-flip/brief.md:96`, not the user's own words at `:94`.
    - **Consumer effect:** none. It affects the showcase only.
    - **Recommendation:** confirm, and record the answer beside R12.
21. **The contrast floor (token Q-1).**
    - **As built:** text floors at the lesser of Bootstrap's ratio and 4.5:1, and surfaces at 1.05 (`VENEER/tests/src/tailwindcss/index.test.ts:123`; V:13, amended at `a72ffeed`).
    - **Consumer effect:** 33 text pairings read under Bootstrap's own ratio, all at 4.5:1 or more. For example, `alert-success@green` reads 6.483 against 10.351 (T2 `contrast.json`).
    - **Recommendation:** accept. Holding Bootstrap's ratio needs a darker step per role, and no run measures that.
22. **The `oklch()` output form, deferred past stage B (token L-2).**
    - **As built:** the sheet emits sRGB hex. M7 read no pixel difference on an sRGB display (V:184).
    - **Consumer effect:** a wide-gamut display can paint a Tailwind utility and its mapped component differently (`VENEER/guides/veneer.md:1696-1698`).
    - **Recommendation:** confirm the deferral.
23. **The landing rule's host clause and the reading arbiter (flip FV-R5, the reader half).** These merge into item 26.
24. **The D-4 Linux `browse` run timing (lanes TW-22; report, no answer needed).**
    - **As built:** the user set the timing on 2026-10-04: after the flip lands, in the cloud session.
    - The queue rule holds it (`RECORDS/lanes.md:73`), and it waits for a settled browser release (`RECORDS/lanes.md:134`).
    - **Consumer effect:** none.
    - **Recommendation:** run it after this checklist and unit J, against 0.0.25 or the contexts release.
25. **Release timing at the Tailwind landing (lanes TW-23, veneer half; report, no answer needed).** No veneer release ships until the user says so (`RECORDS/lanes.md:50`, `:80`).
26. **Is a Windows reading needed, or is this host the arbiter? (lanes TW-21; also units host-reading, tree TW-15, flip FV-D13 reading clause, lanes TW-33 residue)**
    - **As built:** § Rules names the engine session's host (`RECORDS/lanes.md:47`), and that session runs no veneer reading (`:132`).
    - **Consumer effect:** none.
    - **Recommendation:** no Windows reading; this host is the arbiter. Take one Chromium 153 reading here after unit J lands (unit B6). That reading also answers the host half of D-10 (`RECORDS/lanes.md:149`).
27. **The falsify round over the token round (report, no answer needed).** Unit A8 runs under the user's word of 2026-10-05. That word is the user's instruction that `SCAFFOLD/.agents/orchestration.md:167` asks for before an accepted criterion is reopened.
28. **Which scaffold release carries the token clause (lanes TW-23, scaffold half; report, no answer needed).**
    - **As built:** no release through 0.0.92 carries `4e94add7`, as the guide states (`VENEER/guides/veneer.md:1535-1536`).
    - The desktop session prepares releases (`RECORDS/lanes.md:9`). § 4 logs the ask.
29. **The token clause wording, for the record.** `SCAFFOLD/.claude/rules/styles.md:77-81`: "A derived build of a recreation for a utility library may substitute the framework's token literals (colors and scale values) with the utility library's theme values under a switch the guide records, when a committed record maps every substituted literal to its source token and resolved value and a proof reads the derived sheet against the framework's own compile from the mapped bases; the substitution changes no selector, declaration order, or declaration count."

## 4. Record drifts to fix by hand

Lines are re-resolved against the current tree.
- **Scaffold records** go in records commits on scaffold.
- **Veneer prose** goes in one commit on `main`, gated by `format:check`, `test:policy` (the prose sweep), and `test:guides` through the queue.
- **§ Showcase lines** ride unit B5.

### `RECORDS/plan.md`

- `:18` (flip FV-X7), after the § 3 answers.
  - Current: "…the showcase and its journeys show three faces, `Bootstrap only`, `Tailwind without the layer`, and `Tailwind with the layer`; the two law amendments of the verdict's § 10 item 1…"
  - Replacement: "…show three faces, `Bootstrap`, `Tailwind, no layer`, and `Tailwind + layer` (R12, `tailwind-flip/brief.md:96`); the 17 shared component names and the two law amendments of § 10 item 1 are defaults the user confirmed on YYYY-MM-DD (`lanes.md` § Log)…"
- `:19` (token X-7, lanes TW-26, units landing-records plan half).
  - Current: "…opened on 2026-10-04 and has not landed; until it lands, the layer keeps Bootstrap's own token values."
  - Replacement: "…opened on 2026-10-04 and landed on veneer `main` at `4d21de7` on 2026-10-05 (`lanes.md` § Log, the landing entry)."
- `:22` (lanes TW-26).
  - Current: "…never Fable as a subagent, never the Claude CLI."
  - Replacement: "…never Fable as a subagent; routes follow `.agents/orchestration.md:25-29` (the `opus` route serves Opus), and the user's ruling that Anthropic models run natively (`ledger.md:7`) binds the Windows desktop host."
- `:28` (flip FV-X7, token L-4, lanes TW-35).
  - Current: "…and the preflight mirror of normal declarations only, with the exemption table naming preflight's `[hidden]` important rule…"
  - Replacement: append "(the Tailwind flip of 2026-10-04 in § Standing rulings removes the mirror and the exemption table; the curation table replaces them)".
  - At the end of the bump list, add "and the T1 token writer, durable at `tailwind-flip/writers/tokens-t1/`".
- `:35`.
  - Current: "The journey tuning unit and the Tailwind completion checklist follow before stage B."
  - Replacement: add "(the user's word of 2026-10-05, `lanes.md` § Log)".
- `:37` (flip FV-X8).
  - Current: "`showcase/status.md` beside this file holds its state and its remaining units."
  - Replacement: "`lanes.md` § Sessions and § Log beside this file hold its state; `showcase/status.md` is retired."

### `RECORDS/lanes.md`

- New § Log entry at the top (token X-9; lanes TW-24, word gap).
  - Text: "### 2026-10-05 — cloud session (the user's word: the Tailwind track completes before stage B)" followed by "- **The user's word (2026-10-05)**: finish the Tailwind track completely before stage B and leave nothing out. Stage B opens after `tailwind-flip/completion-2026-10-05/re-triage.md` § 2 closes; this supersedes the 2026-10-04 reading 'read as the flip and its token units T1 to T4 landed on `main`' (`:147`)."
- `:47` (units landing-rule, lanes TW-11, tree TW-14, flip FV-R5 rule half).
  - Current: "…lands on `main` when every failure … is in that set and `src/`, `tests/src/`, and `tests/integration.test.ts` equal `main` byte for byte… The engine session reads those projects on its host after the landing and logs any difference."
  - Replacement: "A unit lands on `main` when every gate failure is a § Host-bound set title, read with the journey reading of the 2026-10-04 baseline entry (a journey title that fails at the pre-flip `main` on this host, or shares its observer with one that does), and `src/browser/**`, `src/core/**`, and `tests/src/browser/**` equal `main` byte for byte unless the unit is an engine unit; any other failure blocks the landing. This host's reading is the arbiter [the § 3 item 26 answer]."
  - Also add to the 2026-10-05 landing entry (`:76-81`): "The landing met that rule: the three engine paths equal `77c65cf`, and every failure is a § Host-bound set title (`gates-4d21de7.txt:46-54`)."
- `:49` (lanes TW-23, lanes half).
  - Current: "The engine session prepares a scaffold release; the user publishes it."
  - Replacement: "The desktop session prepares a scaffold release; the user publishes it."
  - Add an entry that asks the desktop session to carry scaffold `4e94add7` in its next release.
- `:54` (lanes TW-24, header gap).
  - Current: "…at veneer `43ca8a0` on 2026-10-03 for the `src:browser` titles, and at the pre-flip `main` `d0603b4` on 2026-10-04 for the journey titles…"
  - Replacement: "…at the token landing `4d21de7` on 2026-10-05 (`tailwind-flip/units/tokens-landing/gates-4d21de7.txt:46-54`: the six `src:browser` titles and the journey's accordion title at light-390 and collapse title at dark-390), with the journey titles classified at the pre-flip `main` `d0603b4` on 2026-10-04…"
- `:92` (tree TW-01).
  - Current: "The overwrite's scripts notice (the per-surface `test:src:*` and `test:app:vue` values differ from the plan) stands as before: veneer builds each surface before its tests."
  - Replacement: one ruling per script.
    - `test:src:bootstrap`, `test:src:tailwindcss`, and `test:src:styles` keep the declared script, because each face builds and runs its own `configs/src` wrapper (`ROADMAP.md:66`).
    - `test:src:vue` keeps the declared script, because it builds the browser and Vue faces first (`package.json:94`).
    - `test:app:vue` takes the ruling the Orchestrator records against the planned value.
- `:100` (units t3-gate-record, tree TW-02, lanes TW-24 gate gap, lanes TW-09 archive half).
  - Current: "…the Orchestrator's own run (`units/tokens-t3/gates-44b3610.txt`): …, setup browser 156, …"
  - Replacement: "…(`units/tokens-t3/review/gates-orchestrator-final-tree.txt`): …, setup browser 155 of 156 (`component preservation readings > groups component carriers and matching descendants while excluding bare content`, `tests/setupBrowser.test.ts:1234`, timed out at 15000 ms; the verbose rerun read 156 with the case at 49 ms, `review/setup-browser-verbose.log`; the landing read 156, `units/tokens-landing/gates-4d21de7.txt:42`; non-reproducing, not host-bound), …"
- `:197` (flip FV-X4, claim half; units writers-durable, claim half).
  - Current: "…the durable preflight writer drops its `141` assertion."
  - Replacement: "…the ignored preflight writer drops its `141` assertion; the durable copy takes T2's port (unit A1, DATE)."
  - This goes in the A1 commit.
- `:211` (lanes TW-24, layout gap): move the "Newest first. Each entry: …" preamble to sit directly under `## Log` (`:62`).
- `:158` and `:251`: retire both asks after the § 3 item 26 answer.

### `RECORDS/showcase/status.md`

This file is retired (flip FV-X8; token X-12, status half; lanes TW-25; tree TW-27, status half; units landing-records, status half).
- **Stale lines:**
  - `:3` and `:9`, the owner;
  - `:10`, veneer `main` at `9401839`;
  - `:11`, the unused branch;
  - `:12`, scaffold 0.0.88;
  - `:14`, the browse row;
  - `:18`, "`showcase-proofs` runs its fourth time";
  - `:23-24`, `showcase-guide` and the 0.0.22 re-pin as planned;
  - `:41`, "two faces";
  - `:43`, "The Tailwind preflight mirror uses `revert-layer`";
  - `:55`, `proposal.json` as the design of record;
  - `:58`, the strict landing rule.
- **Replacement:** delete the file. Move the binding resume rules (`:53`, `:54`, `:56`, `:57`, `:59`, `:61`) and the standing rulings (`:44-48`) into `RECORDS/lanes.md` § Rules. Repoint `RECORDS/plan.md:37` and `RECORDS/showcase/browse.md:3`.

### `RECORDS/ledger.md`

- `:3` (flip FV-X18, scope half; lanes TW-27; token X-12, ledger half; units landing-records, ledger half).
  - Current: "Every dispatch of the foundation campaign, its engine, its transport, its duration, and its outcome…"
  - Replacement: append "The flip and token lanes of 2026-10-04 and 2026-10-05 are recorded one folder per lane in `tailwind-flip/units/` and in the `lanes.md` § Log entries of those dates; this file holds no row for them."

### `RECORDS/tailwind-flip/design-verdict.md`

- `:159` (flip FV-X6, flip FV-D7 record half): append three § 12 lines after it.
  - "§ 2 to § 4 after fix unit A (2026-10-04, veneer `527ea39`, reviewer F10): `$shared`, `$curation`, and `$defaults` at `:29`, `:57`, `:58`, and `:67` read `$withhold`, `$curated`, and `$restored`, and the 'four switches' at `:12` and `:22` read five, with `$scoped`."
  - "§ 5 and § 10 item 2 after R12 (2026-10-04, `ca2c90e`): the three compositions stand with the labels `Bootstrap`, `Tailwind, no layer`, and `Tailwind + layer`."
  - "§ 4 and § 10 item 7 after probe-4 and fold-2 (2026-10-04, `bc35a3e`): `:where(.table) tfoot` and `:where(.table) tr` stay on hazard witnesses although probe-4 did not reproduce them, and 19 derived rows stay out, the description-list margins among them."
- `:113` and `:129` (flip FV-R5, flip FV-D13): after the § 3 item 26 answer, append a § 12 line naming this host as the arbiter in place of "the engine session reads … on its host".

### `RECORDS/tailwind-flip/tokens/design-verdict.md`

- `:43` (token X-1).
  - Current dark cell: "`#d1d5dc` (body text)".
  - Replacement: "`#e5e7eb` (body text, `gray-200`, § 3.1)".
- `:51` (token X-1).
  - Current dark cell: "`rgba(209, 213, 220, 0.75)`, `rgba(209, 213, 220, 0.5)`".
  - Replacement: "`rgba(229, 231, 235, 0.75)`, `rgba(229, 231, 235, 0.5)` (§ 3.1)".
- `:94` (token X-2).
  - Current: "The `swatch` function reads the context from the declaring block's selector (`[data-bs-theme=dark]`)".
  - Replacement: "The `swatch($literal, $context: null)` function takes the context as an argument: the six dark body-color sites (`src/bootstrap/_tokens.scss:177-188`) pass `dark`, and the dark block's `--bs-dark-text-emphasis` and `--bs-highlight-color` (`:198`, `:221`) keep `gray-300`".
- `:104` (token X-2).
  - Current: "`swatch($literal)` reads the 7 spellings".
  - Replacement: "`swatch($literal, $context: null)` reads the 7 spellings".
- `:56`, `:60`, and `:95` (token X-3).
  - Current: "by the WCAG formula (T2 measures it)" and "by the WCAG formula until T2's contrast case measures them".
  - Replacement: "8.081" and "6.483" in T2's contrast run (`units/tokens-t2/contrast.json`).
- `:123` and `:124` (token X-4, lanes TW-29).
  - Replacement: the tree's titles, `agrees every tuned amount row with Bootstrap's own Sass compiled from the map's bases within one channel unit` and `resolves every palette row from the installed Tailwind theme as Chromium serializes it`.
  - Neither `48ebf405` nor `5ea6cc19` touched these lines.
- `:132` (token S7-8, rest).
  - Current: "no pairing reads under Bootstrap's where Bootstrap passes 4.5:1".
  - Replacement: "every text pairing reads at or over the lesser of Bootstrap's own ratio and 4.5:1".
- `:149` (tree TW-27, verdict half).
  - Current: "The curation table (46 rows)".
  - Replacement: "The curation table (56 rows: 38 reboot, 11 restore, 7 scoped; veneer `bc35a3e`)".
- `:106` and `:119` (units one-row-palette), in the A5 commit.
  - `:106`, current: "51 `min-width` px conditions and 25 `.98px` `max-width` conditions". Replacement: "64 conditions (39 grid `min-width` and 25 `.98px` `max-width`; the 12 RFS conditions stay literal)".
  - `:119`, current: "a one-row `$palette` changes the digest". Replacement: "a full identity palette with one changed row changes the digest".
- `:166` (token X-14): append "The Faces table and the Token map table of `guides/veneer.md` hold the token readings; the composition table gains none (ruled 2026-10-05, T4 brief item 3)."
- `:190` (units token-open-risks; token O11-CLIP, closure half): append a closure.
  - M8 is closed by `tests/conformance.test.ts:1329`.
  - M1 is closed by `tests/src/tailwindcss/index.test.ts:104`, with the `mapReading` dark-context residual.
  - M7 is closed by T4's ruling (`units/tokens-t4/report-2.md:59`), with V:184, `guides/veneer.md:1688-1698`, and `tests/guides.test.ts:206`.

### Other records

- `RECORDS/tailwind-flip/tokens/rulings.md:16` (token R-F, closure half): add a closure note.
  - Findings 1 to 11 and 13 to 16 are closed by their cases on `main` at `4d21de7`, finding 5 also by V:139 at `5ea6cc19`.
  - Finding 12's scale controls stay open under unit A5.
- `RECORDS/tailwind-flip/units/flip-falsify/reviewer-verdict.md` after `:40` (units falsify-claims): add a dated note.
  - Claims 50 and 51 are superseded by § 12 and the preservation gate at `77c65cf`.
  - Claim 54 is superseded by the showcase brief's four permitted longhand kinds and the census fix A widened at `527ea39`.
  - The refutation of claim 51 at `:11` ("no `resolved` member") has been false since `77c65cf`.
  - The briefs stay as written.

### `VENEER/ROADMAP.md`

- `:15` (tree TW-09).
  - Current: "every computed longhand preflight moves on a bare element away from lifted Bootstrap".
  - Replacement: "every computed longhand preflight moves on a bare element away from the `./tailwindcss` sheet alone".
- `:54` (tree TW-09): after "the curated, restored, and scoped copies in `bootstrap`", add "with Bootstrap's design tokens taking Tailwind's values through the `$palette` and `$scale` switches".
- `:99` (tree TW-09): add "and the `$palette` and `$scale` switches of the token map" to both partials' switch lists.
- `:100` (tree TW-09): add "`$palette`, `$scale`, `swatch` (a color literal through the palette), and `measure` (a scale value through the scale)".
- `:143`: after "proves the recipe from a packed install", add the unit A7 reading (commit and date).
- `:144` (token X-13, lanes TW-06, units roadmap-showcase-proofs, tree TW-07 showcase half).
  - Current: "`showcase-proofs` is open, and `showcase-guide` follows both".
  - Replacement: "`showcase-proofs` landed on 2026-10-03 at `3807993`, `608d646`, and `4929856`, and `showcase-guide` is open".
- `:151` (flip FV-X11, token X-11, tree TW-10, lanes TW-02 rest).
  - Current: "Scaffold `0.0.88` carries… and `0.0.88` on 2026-10-03 at `9885975`."
  - Replacement: "Scaffold `0.0.88` and later releases carry… `0.0.88` on 2026-10-03 at `9885975`, `0.0.90` on 2026-10-03 (pinned at `8159757`, overwritten at `24ae43d`), and `0.0.92` on 2026-10-05 (pinned at `b242bce`, overwritten at `07694f8`); `b242bce` replaced the `0.0.91` pin at `a036694` before any overwrite."
- `:160` (flip FV-X11).
  - Current: "Browser `0.0.22` follows … from `^0.0.21` to `^0.0.22` …"
  - Replacement: "Veneer re-pinned browser to `^0.0.22` at `8159757`, and `b242bce` replaced it with `^0.0.24` on 2026-10-05."
- `:163` (flip FV-D1 roadmap half, flip FV-R4 adoption half, flip FV-X10).
  - Current: "…at `427a733d`, after the `0.0.90` release."
  - Replacement: "…at `427a733d`; carried by scaffold `0.0.91` (`913b0542`) and `0.0.92`; adopted on 2026-10-05 at `b242bce` and `07694f8`."
- New item 12 (token U8-LAW; units styles-clause-propagation; lanes TW-23, roadmap half): "12. The token round's substitution clause: `.claude/rules/styles.md` lets a derived build substitute the framework's token literals under a switch the guide records. Landed on scaffold `main` on 2026-10-05 at `4e94add7`, after the `0.0.92` release; no release through `0.0.92` carries it."
- `:165` (token X-11, tree TW-10).
  - Current: "…fail (read at `43ca8a0` on 2026-10-03): the three integration cases that read `tests/fixtures/tailwindcss/preflight.json`…"
  - Replacement: "…fail (read at `4d21de7` on 2026-10-05): the six `Placement` and `Tip` titles of `src:browser` and two journey titles; the three `preflight.json` integration cases left that set at `1b15a22`."
- `:177` (tree TW-07, order half).
  - Current: "Two tracks run in parallel; … so neither track waits on the other."
  - Replacement: "The journey tuning unit, then the Tailwind completion re-triage (scaffold `.orkestrel/veneer/tailwind-flip/completion-2026-10-05/`), then stage B at the user's word; inside stage B, two tracks run in parallel…"
- `:181-183`: delete showcase items 1 and 3, and renumber. Unit B5 marks `showcase-guide` closed.
- `§ Next`, after `:175`: add the § 5 later-item lines (the token writer follow-up, the inherited-longhand fixture, band keying, and the caption-text reader), each with its trigger.

### `VENEER/guides/veneer.md` (§ Tailwind and § Compare in the A6 commit; § Showcase in B5)

- After `:1312` (flip FV-D14, guide half; flip FV-X9, percentage half): add "The percentage names follow that rule: under the recipe `w-25` reads `6.25rem`, `top-50` `12.5rem`, and `start-100` `25rem`, Tailwind's spacing multiples, where Bootstrap reads `25%`, `50%`, and `100%`, as the `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap` case reads."
  - The composition table (`:1281-1292`) gains the verdict's § 2 row for `w-100`, `top-50`, and `start-100` (`RECORDS/tailwind-flip/design-verdict.md:46`).
- After `:1407`, the end of the repair-form list (units guide-consumer-owned; flip FV-D7, guide half): add one paragraph. It names:
  - the description-list margins with the `mb-2` path;
  - the `.card > hr` residual;
  - the preservation case's admission (`tests/setupBrowser.ts:2022-2028`), citing `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths`.
  - The `:1395` sentence then names those exceptions.
- `§ Load real Tailwind` (`:1835`; flip FV-D10, prose half), after the § 3 item 10 answer: add "The recipe is proved through Tailwind's `compile` API; the bundler path is unproven."
- `:2037` (units consumer-rows, adjacent drift).
  - Current: "and under the `unexcluded` composition".
  - Replacement: "and under the `./tailwindcss` sheet beside the compile without the Veneer import".
- `:673` (lanes TW-36).
  - Current: "engine.destroy()".
  - Replacement: "veneer.destroy()". The fence at `:672` declares `const veneer`, and `:676` claims the factory proofs run it.
- `:1535-1536`, after the desktop session's release: name the release that carries `4e94add7`.
- `:2054` (B5, claim 3): add "at rest; while a placed component is open, the engine's placement writes inline styles on the reference, the panel, and the arrow" (`ROADMAP.md:144`).
- `:2068-2073` (B5; flip FV-D8, guide half): name the `row-gap-3 column-gap-3`, `rounded-2`, and four side-border replacements. Change `:2071` to say the census case refuses all five replaced names (`tests/app/browser/sections/integration.test.ts:229-259`).
- `:2113-2128` (B5; token S7-10): add that the neutrality case asserts the R12 invariants under every face at 390, 768, and 1280 px (`tests/app/browser/Showcase.test.ts:498-527`), citing 116, 48, and 48 px (`RECORDS/tailwind-flip/units/tokens-t3/report-5.md:131`).
- `:2140` (B5; flip FV-X5): state the preservation case's bound (light page color mode at 1280 and 390 px, closed states, host elements, the dark-wrapped specimens kept), or lift it after B3.
- `:2215-2237` (B5; tree TW-05): add the seven `TAILWIND_READINGS` specimens and B4's two rows, with the checkbox in both color modes and a note that the description list sits in the typography section.
- `:2480-2481` (B5; token X-8): add "under the Bootstrap face".
- `:2312` and `:2326` (B5; flip FV-D9): put the page weight with its date and commit beside them.

## 5. Later items

Each of the following can wait past stage B. Each line names its reason, its trigger, and its home.

- **Sass `$palette` switch (token L-1, token D9-2 tie).**
  - Reason: the Minimal public API law refuses a capability before its first real consumer (`SCAFFOLD/AGENTS.md:65`).
  - Trigger: a Sass consumer asks for color control.
  - Home: `VENEER/ROADMAP.md:173`. Confirmed in § 3 item 16.
- **`oklch()` output (token L-2).**
  - Reason: the `-rgb` triplets, mixes, and `%23` escapes need sRGB channels (V:16), and M7 read no sRGB pixel difference (V:184).
  - Trigger: demand for wide-gamut fidelity.
  - Home: `VENEER/ROADMAP.md:174`. Confirmed in § 3 item 22.
- **The Chromium-floor-tied inherited set (tree TW-21).**
  - Reason: the 115 members are Chromium 141's (`VENEER/tests/setupStyles.ts:438`), and D-10 decides the source (`RECORDS/lanes.md:149`).
  - Trigger: the floor ruling. Then re-derive the set from that version's metadata and pin it by set equality to a committed fixture.
  - Home: a `ROADMAP.md` § Next line.
- **The routing ledger section (flip FV-X18, rows half; lanes TW-27; token X-12, ledger half; units landing-records, ledger half).**
  - Reason: the § 4 pointer at `RECORDS/ledger.md:3` makes the ledger truthful, and every dispatch is in `tailwind-flip/units/` and the § Log.
  - Trigger: the campaign debrief.
  - Home: the debrief carry list.
- **The token writer follow-up (token L-4, lanes TW-35).**
  - Reason: `tailwindcss` 4.3.3 and `bootstrap` 5.3.8 are pinned exactly (`VENEER/ROADMAP.md:14-15`), and the token round re-derived none of the map records.
  - Trigger: the next version. Then rewrite each missing writer as a script with a proof (`RECORDS/tailwind-flip/brief.md:40`): `tailwind-oracle.ts`, `cascade-classes.ts`, `tailwind-comparison.ts`, `tailwind-rows.ts`, `tailwind-relations.ts`, `cascade-inventory.ts`, `cascade-regions.ts`, `cascade-port.ts`, `class-names.ts`, and the T1 token writer.
  - Home: a `ROADMAP.md` § Next line and `RECORDS/plan.md:28`. Unit A1 makes the durable copies.
- **Band keying in `mapReading` (tree TW-20, later half).**
  - Reason: every caller reads at 1280 or 390 px, and B2 adds the remark.
  - Trigger: a caller that reads inside a band.
  - Home: `ROADMAP.md` § Next.
- **The caption-text reader (tree TW-22, later half).**
  - Reason: the reader compares computed values and never reads caption text, so it needs its own design.
  - Home: `ROADMAP.md` § Next.
- **The bash gate runners (units bash-gate-script, runner half).**
  - Reason: `VENEER/tmp/units/journey-cost/run.ts` under the lock replaces `gates.sh` (`RECORDS/lanes.md:73`).
  - Home: a debrief item that names `tmp/units/flip-gates-2/gates.sh` and `tmp/units/tokens-t3/review/overwrite-gates.sh`.
- **The D-4 Linux `browse` run (lanes TW-22).**
  - Reason: it is a `browse` package task under the queue hold, against a settled browser release.
  - Home: a § Log entry that places it after this checklist and unit J.
- **Stage B prerequisites (lanes TW-37).**
  - Keep: rulings 1 to 5, P0, the 153 question (unit B6), and the addendum's 19 correction rows and open questions (`RECORDS/stage-b/elements-clone-addendum-2026-10-05.md:26-50`, `:497`).
  - Drop: the addendum read (`18bdc494`) and the map corrections (`98c1613e`).

## 6. Items refused or merged

### Merged

Each of the following groups closes through one unit or one line.

- Cross-face pin (unit A2): flip FV-X1, tree TW-18, lanes TW-14, units cross-face-policy, flip FV-R4 (pin half).
- Packed Sass case (unit A3): flip FV-X3, units packed-scss-distribution (case half).
- Full-suite reading (unit A7): flip FV-X2, flip FV-O1, units npm-test-whole, lanes TW-10 (rest), units packed-scss-distribution (run half), flip FV-D12 (Vue half), flip FV-D10 (packed half).
- Title gate (unit A4): flip FV-X13, units guide-titles.
- Falsify round (unit A8): tree TW-13, lanes TW-08.
- Consumer rows (unit A6): flip FV-X9, lanes TW-15, units consumer-rows.
- Nested reader (unit B2): flip FV-X14, lanes TW-16, units nested-reader, tree TW-19, tree TW-20.
- `showcase-guide` (unit B5): flip FV-X17, token A-1, lanes TW-13, tree TW-08, token S7-10, token X-8, tree TW-05, flip FV-X5.
- Journey tuning (unit J): flip FV-X16, token O11-M6, token L-3, lanes TW-12, units journey-tuning, tree TW-28, lanes TW-09 (stall half).
- Defaults: flip-defaults with tree TW-16 and lanes TW-18; token-defaults with tree TW-17 and lanes TW-19; token D-R12 with lanes TW-20.
- The Windows question: units host-reading, lanes TW-21, tree TW-15, flip FV-R5, flip FV-D13, lanes TW-33.
- Landing rule: units landing-rule, lanes TW-11, tree TW-14.
- Status retirement: flip FV-X8, token X-12, lanes TW-25, tree TW-27, units landing-records.
- Scaffold propagation edit: flip FV-X10, flip FV-X11, token U8-LAW, token X-11, units styles-clause-propagation, tree TW-10, lanes TW-02 (rest).
- Roadmap showcase edit: token X-13, lanes TW-06, units roadmap-showcase-proofs, tree TW-07.
- Durable writers (unit A1): flip FV-D11, flip FV-X4, lanes TW-28, units writers-durable.
- T3 gate record: units t3-gate-record, tree TW-02, lanes TW-24 (gate gap), lanes TW-09 (archive half).
- Sass palette: token L-1 merges with token D9-2.
  - Verify pass L-1 says "D9-2 points at nothing", but it read the records, not the audit's ids.
  - Likewise, verify pass O11-CLIP's "L-2" is this audit's `oklch()` item.

### Refused

Each of the following options is refused, with the rule or record that forecloses it.

- **The cross-face case in the policy files.** `VENEER/AGENTS.md`: "Edit none of the scaffold-owned files here."
- **A cross-face case that admits only `_tokens.scss`.** It fails the shipped `VENEER/src/tailwindcss/index.scss:2-5`.
- **One case for both linked rows.** They read two compositions (`RECORDS/tailwind-flip/design-verdict.md:47`; `VENEER/guides/veneer.md:1236-1239`).
- **The "consumer-theme unit" as a vehicle.** No such unit exists; the consumer theme case landed at `VENEER/tests/guides.test.ts:174`.
- **The name `flip-preservation-2`.** `RECORDS/tailwind-flip/units/flip-preservation/brief-2.md:1` holds it.
- **Keeping the `resolved` split as a later item.** Its trigger fired at T3 without the split.
- **Folding the observer repair, or a control-stripping ablation, into unit J.** `verdict.md:17`: "The Orchestrator rules that the unit loses no proof."
- **Rewording `a036694`.** It is on `origin/main`, so a reword is a force push.
- **The D-4 run against browser 0.0.24.** The browser branch has not settled (`RECORDS/lanes.md:134`).
- **A Windows reading by the desktop session.** "The desktop session runs no veneer reading on its Windows host" (`RECORDS/lanes.md:132`).
- **Leaving the 153 reading to stage B.** The integration and journey code that the flip and the token round changed has never run on 153, and the user puts the track first.
- **A Chromium paint case for M7.** T4's ruling keeps the sentence run-backed (`RECORDS/tailwind-flip/units/tokens-t4/report-2.md:59`).
- **Closing claim 5 as superseded.** `collectPseudos` still feeds the header case (`VENEER/tests/setupBrowser.ts:1510`, `:1635`).
- **"Stage B does not wait on `showcase-guide`".** The user's word of 2026-10-05 puts the whole track first.
- **Sizing the setup case's budget from a contended run.** The case runs in 49 ms; the timeout is a stalled CDP round trip, not a tight budget.
- **A bare `npm test` alone.** Its `&&` chain (`VENEER/package.json:86`) stops at the six host-bound `src:browser` failures (`:88`).
- **A bash runner for these gates.** `SCAFFOLD/AGENTS.md`: "Never write a bash, PowerShell, or Python script."
- **"L-3" as the journey unit's name.** The records use L-3 for an unrelated item (`RECORDS/lifecycle/reassessment-2026-10-04.md`).
- **Every "fix in the T4 merge" or "before the landing" disposition.** The T4 merge and the landing are past; each item moves to a unit or to § 4.
- **Copying 27 lanes into ledger rows before stage B.** That creates a second home for the same facts; the rows section is a later item (§ 5).

## Account by id

Every one of the 136 ids appears here with its section.

- **flip:**
  - § 3: FV-D1, FV-D3 to FV-D14.
  - § 1 partial: FV-O1, FV-R4, FV-X10, FV-X13, FV-X16.
  - § 2: FV-R2 (B3), FV-X1 (A2), FV-X2 (A7), FV-X3 (A3), FV-X4 (A1), FV-X5 (B5), FV-X9 (A6), FV-X14 (B2), FV-X17 (B5).
  - § 3: FV-R5.
  - § 4: FV-X6, FV-X7, FV-X8, FV-X11, FV-X18.
- **token:**
  - § 1 closed: U8-T3, U8-LAND.
  - § 1 partial: S7-7, S7-8, Q-1, S7-10, U8-T1, U8-LAW, D9-4, R-F, O11-CLIP, O11-M6, L-1, L-2, L-3, X-7, X-9, X-10.
  - § 3: D-R12, D9-1, D9-2, D9-3.
  - § 4: X-1, X-2, X-3, X-4, X-11, X-12, X-13, X-14.
  - § 2: X-8 (B5), A-1 (B5).
  - § 5: L-4.
- **tree:**
  - § 1 partial: TW-01, TW-02, TW-17, TW-28.
  - § 2: TW-05 (B5), TW-08 (B5), TW-13 (A8), TW-18 (A2), TW-19 (B2), TW-20 (B2), TW-22 (B4).
  - § 3: TW-15, TW-16.
  - § 4: TW-07, TW-09, TW-10, TW-14, TW-27.
  - § 5: TW-21.
- **lanes:**
  - § 1 closed: TW-02, TW-10.
  - § 1 partial: TW-09, TW-12, TW-19, TW-23, TW-33, TW-37.
  - § 2: TW-08 (A8), TW-13 (B5), TW-14 (A2), TW-15 (A6), TW-16 (B2), TW-28 (A1).
  - § 3: TW-18, TW-20, TW-21, TW-22.
  - § 4: TW-06, TW-11, TW-24, TW-25, TW-26, TW-27, TW-29, TW-36.
  - § 5: TW-35.
- **units:**
  - § 2: packed-scss-distribution (A3, A7), npm-test-whole (A7), writers-durable (A1), tests-unit-paths (A5), consumer-rows (A6), cross-face-policy (A2), nested-reader (B2), journey-observers (B1), one-row-palette (A5), resolved-copies (B3).
  - § 1 partial: t3-gate-record, guide-titles, token-defaults, journey-tuning.
  - § 3: flip-defaults, host-reading.
  - § 4: guide-consumer-owned, styles-clause-propagation, landing-rule, landing-records, roadmap-showcase-proofs, falsify-claims, token-open-risks.
  - § 5: bash-gate-script.
