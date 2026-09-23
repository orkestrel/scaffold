## Verdict — checker, NAVBAR (`nb`) audit round 3, claims 1, 2, 5

### Claim 1 — Delta and scope

**CONFIRMED**, with one sub-clause **UNRESOLVED**.

- File-list identity: `.orkestrel/veneer/units/nb-3-status.txt:1-5` and `.orkestrel/veneer/units/nb-2-status.txt:1-5` are byte-identical (` M tests/src/styles/theme.test.ts`, four `??` entries), matching the claim's "exactly the five owned paths round 2 listed."
- Diff confinement: comparing `.orkestrel/veneer/units/nb-3.diff` and `.orkestrel/veneer/units/nb-2.diff`, `app/browser/sections/NavbarSection.ts` (`index 0000000..8f939bc`) and `src/styles/components/_navbar.scss` (`index 0000000..9f25ec0`) carry the identical blob hash in both diffs — unchanged. `tests/src/styles/components/navbar.test.ts` changes hash (`c3c7fad` → `324808a`) and content (import list gains `NAVBAR_DARK_CONSUMER_CASES`/`NAVBAR_EXPAND_READINGS`/`NAVBAR_PAINT_MOVE_CASES`, three inline tuple loops become table imports, e.g. `nb-3.diff:488-496` vs `nb-2.diff:487-495`). `tests/app/browser/sections/NavbarSection.test.ts` changes hash (`58559eb` → `f0214e8`), isolated to the MODE-SCHEME comment (`nb-3.diff:421-423` vs `nb-2.diff:421-422`). `theme.test.ts` hunk is byte-identical in both diffs. This matches the claim's stated confinement exactly.
- Shared-patch file set: `Grep '^diff --git'` on `nb-shared-3.patch` and `nb-shared-2.patch` returns the identical fifteen-file list in identical order.
- Shared-patch delta confinement: comparing `^index ` lines in both patches, only five files carry a changed blob-hash pair — `app/browser/constants.ts` (`bff7c66` vs `bf1957b`), `guides/veneer.md` (`14eb133` vs `4284a28`), `src/styles/_tokens.scss` (`dbc217e` vs `7f34966`), `tests/setupStyles.test.ts` (`f402443` vs `09a2f22`), `tests/setupStyles.ts` (`0248986` vs `3cc1e13`) — the remaining ten files (`ROADMAP.md`, `Showcase.ts`, `app/browser/index.ts`, `src/styles/index.scss`, `Showcase.test.ts`, `index.test.ts`, `integration.test.ts`, `conformance.test.ts`, `setup.ts`, `setupServer.test.ts`) carry identical before/after hashes. This exactly matches the claim's named five-file set.
- Off-limits patch byte-identity: full-text `Read` of `nb-offlimits-3.patch` and `nb-offlimits-2.patch` shows identical content line for line, both `index de17941..fabb089` (`_mixins.scss`) and `index 93abb90..edd8b00` (`_nav.scss`), matching the `a658879` blobs the report cites.
- Retirement-patch delta: comparing `^diff --git|^index|^@@` in `nb-retirement-3.patch` vs `nb-retirement-2.patch`: `_theme.scss` and `theme.test.ts` hunks are index- and header-identical in both; `_tokens.scss` and `setupStyles.test.ts` carry different index hashes (base moved under the round-3 shared patch, as the claim states), and `setupStyles.test.ts`'s hunk header shifts from `@@ -601,15 +601,6 @@` (round 2) to `@@ -607,15 +607,6 @@` (round 3) — the exact 601→607 shift the claim names, with otherwise identical hunk bodies.
- No file outside the named set (`src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`) appears in any of the three patches' file lists, per the `diff --git` header enumeration above.
- **UNRESOLVED sub-clause:** "`git apply --check` of the shared and off-limits patches exits 0 in the worktree" needs a command I cannot run: `git -C /home/user/veneer-nb apply --check tmp/units/nb-shared-3.patch tmp/units/nb-offlimits-3.patch`. The Orchestrator takes that reading.

### Claim 2 — The nouns, the sentences, and the comment

**CONFIRMED.**

- `NAV_SELECTORS` doc: `nb-shared-3.patch:1066-1073` reads "The release records the `.nav-link` selector unconditionally and again under the reduced-motion query," "The `.card-header-tabs .nav-link.active` selector is recorded under this key and written by the card partial," and "It is the half of the key's official vocabulary that no navbar rule carries" — all three sub-quotes match the claim verbatim.
- `NAVBAR_SELECTORS` doc: `nb-shared-3.patch:1086-1087` reads "The release records the `.navbar-toggler` selector unconditionally and again under the reduced-motion query." — matches.
- `NAVBAR_LENGTH_CASES` doc: `nb-shared-3.patch:1170-1174` reads "the `target` field addresses the element that consumes it, and the `reads` field names the property read there" and "wrapped around the {@link NAVBAR_MARKUP} constant" — matches both sub-quotes.
- `NAVBAR_DARK_SPELLING_CASES` doc: `nb-shared-3.patch:1339-1340` reads "carrying that spelling around the {@link NAVBAR_MARKUP} constant." — matches.
- `_tokens.scss` `$icons` comment: `nb-shared-3.patch:392-393` reads "The forms glyphs and the navbar toggler icon at their light values, each as the escaped data URI the release compiles its own variable to." — matches exactly. The following `$dark`-map sentence (`nb-shared-3.patch:398-401`, "the mode-varying caret, unchecked knob, and toggler icon are entries of the `$dark` map as well…") is byte-identical to the same lines in `nb-shared-2.patch:397-400` — confirming "with the `$dark` sentence kept."
- Guide `### Navbar classes` and `NAVBAR_SPECIMENS` doc: `nb-shared-3.patch:1516-1522` (guide) and `nb-shared-3.patch:63-65` (constants.ts) both carry "opens a light island with its own `data-bs-theme` attribute" wording, not the retired "sets its own scheme to light" wording.
- Section-proof comment: `nb-3.diff:421-423` reads "the class bar opens a light island with its own data-bs-theme attribute, and the white it shows over the card is the class's paint," replacing round 2's "sets its own scheme to light" wording (`nb-2.diff:421-422`) — matches.

### Claim 5 — Law and report

**BROKEN.**

- No `any`, `as`-assertion, `!`-assertion, `@ts-*` suppression, or `eslint-disable` appears in the delta: a scan of `nb-3.diff` and `nb-shared-3.patch` for `: any\b|\bas\s+\w|@ts-|eslint-disable` returns only prose uses of the preposition "as," never a type-assertion.
- No banned writing-rule term (`should`, `simply`, `just`, `via`, `e.g.`, `etc.`, `performant`, `please`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`, and so on) appears in `b-collapse-nb-report-3.md` or `nb-shared-3.patch`.
- **The "no count of a growable set" sub-clause is violated in the report itself:**
  - `b-collapse-nb-report-3.md:131`: "each of the three tables is typed `ReadonlyArray<{...}>` instead" — a count of the tables the round adds.
  - `b-collapse-nb-report-3.md:189`: "The four controls this round adds:" — a count of the mutation controls.
  - `b-collapse-nb-report-3.md:200`: "the two case-title-only mutations (the reordered dark-spelling rows)" — a count of mutations.
  - `b-collapse-nb-report-3.md:285`: "the three inline tuple loops are replaced" — a count of loops.
  Each names a member of a set anyone can add to (a table, a control, a mutation, a loop), which `AGENTS.md` § Writing and claim 5's own text ("no count of a growable set") ban outright regardless of whether the members are also named nearby.
- The retained-path mention appears once (`b-collapse-nb-report-3.md:17`), matching the claim's "once" requirement.
- No new exported helper in the delta duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export: the delta's new exports (`NAVBAR_EXPAND_READINGS`, `NAVBAR_DARK_CONSUMER_CASES`, `NAVBAR_PAINT_MOVE_CASES`, `NAVBAR_SELECTORS`, `NAVBAR_MARKUP`, `NAVBAR_LENGTH_CASES`, `NAVBAR_COLOR_CASES`, `NAVBAR_DARK_CASES`, `NAVBAR_DARK_SPELLING_CASES`, `NAVBAR_EXPAND_CASES`) are all frozen data tables local to `setupStyles.ts`, not helper functions; `@orkestrel/test/dist/src/browser/index.d.ts` exists at that path and none of these names collide with it.

## Counts the report states (listed, for the record)

`b-collapse-nb-report-3.md`: 113 passed (113); 46 passed (46); 71 passed (71); 2 passed (2); 22 passed (22); 19 passed (19); 109 passed | 1 skipped (110); 78 passed (78); 254 passed (254); 112 passed (112); 102 passed (102); 1 failed | 5 passed (6); 6 passed (6); 1 failed | 112 skipped (113) [four occurrences, one per new control]; "three tables"; "four controls"; "two case-title-only mutations"; "three inline tuple loops."

## Referrals

None — every ruling above rests on file-content and hash comparison I performed directly; no judgment call was deferred.

VERDICT: FAIL 5; outside the claims: none
