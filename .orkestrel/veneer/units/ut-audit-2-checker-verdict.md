# Verdict — ut round 2, checker lane (Sonnet, workflow wf_0271a2cb-dfc)

## Verdict

**Claim 1 — Scope and delta.** CONFIRMED.
- `ut-2-status.txt` (`.orkestrel/veneer/units/ut-2-status.txt:1-16`) lists exactly round 1's owned paths (matching the `diff --git` file list in `ut.diff`) plus `src/styles/utilities/_color-bg.scss` and `tests/src/styles/utilities/color-bg.test.ts`, nothing else.
- The revised shared patch's interdiff against round 1 touches only `src/styles/index.scss`, `tests/conformance.test.ts`, `app/browser/constants.ts`, and `guides/veneer.md` (`.orkestrel/veneer/units/ut-instruments/ut-2-shared-interdiff.txt:1,13,49,105` — exactly four `diff --git` headers).
- `_color.scss`'s only owned-file change from round 1 is the removed pair loop (`ut.diff:322-332` present, absent in `ut-2.diff:336-460`), consistent with "changes only at the T-d sites."

**Claim 4 — T-b: the guide sentences.** CONFIRMED.
- § Text utilities' opening rewritten exactly as the brief specifies (`ut-instruments/ut-2-shared-interdiff.txt:162-170`).
- `text` selector row drops the class enumeration and reads "except the `.text-truncate` helper, which the `text-truncate` row records" while still proving the three named test files (`ut-instruments/ut-2-shared-interdiff.txt:309`).
- Text-opacity statement in the `text` variable row and § Color utilities matches the brief's replacement text verbatim (`ut-instruments/ut-2-shared-interdiff.txt:220-222,310`).
- Prefixed-decoration bullet replaced with § Icon links' own sentence, and that identical sentence is confirmed present at § Icon links in the live guide (`/home/user/veneer-ut/guides/veneer.md:2712`; interdiff `ut-instruments/ut-2-shared-interdiff.txt:282-288`).
- Link rows and Tailwind paragraph gain "proof"/"flag" as specified (`ut-instruments/ut-2-shared-interdiff.txt:298-299,129-130`).

**Claim 6 — T-e and T-f: the specimen and the copy.** CONFIRMED.
- `COLOR_SPECIMENS`'s `Text roles` markup renders the dark role (`text-dark`) on `.text-bg-light` and the light role (`text-light`) on `.text-bg-dark` (`ut-shared-2.patch:584-595`).
- `ColorSection.test.ts` reads `[data-specimen="Text roles"] .text-bg-light > .text-dark` and the `.text-bg-dark > .text-light` twin (`ut-2.diff:613-618`).
- Mutation: reverting the dark role to a bare `<p class="text-dark">` off the light pair is the named mutation; the retained run shows it reddens `renders every declared specimen through the shared section contract` (`ut-instruments/ut-mutations-2.log.txt:65-73`, matching the report's `Tests 1 failed | 2 passed (3)` at `b-utilities-ut-report-2.md:143-145`). The assertion at `ut-2.diff:617` (`.text-bg-light > .text-dark`) is exactly what the mutation removes, so it distinguishes the mutation from the passing case.
- `COLOR_COPY` reads "...and the pairs that set the foreground the release records on each role's fill" (`ut-shared-2.patch:568-572`), matching T-f.

**Claim 8 — Law and report.** BROKEN.
- No `any`, disallowed `as`, `!` non-null assertion, or suppression comment found added in `ut-2.diff` or `ut-shared-2.patch` (targeted greps returned no code-syntax hits; only SCSS `@use ... as *` and prose "as").
- The report violates the temporal-word ban: "new" is used as a fact label five times — `b-utilities-ut-report-2.md:13` (`**`src/styles/utilities/_color-bg.scss` (new, owned).**`), `:28`, `:219`, `:221`, `:235`. `AGENTS.md` § Writing: "Do not write `currently`, `now`, `new`, `latest`, or `soon`." No exception is stated for a file-status label.
- The report violates the code-token-noun rule repeatedly in its "Fixes" subheadings: a file-path code token is followed by a parenthetical scope tag rather than a noun, at minimum `b-utilities-ut-report-2.md:13` (`... (new, owned).`), `:17` (`... (owned).`), `:20`, `:22`, `:36`, `:139`, `:149`. `.claude/rules/writing.md` § Code tokens: "Put a code token in backticks and follow it with a noun." (Contrast: `:28` and `:126` do comply, showing the rule is followed elsewhere but not uniformly.)
- No stated tally of a growable set was found; every number in the report is a run result cited with its command (`b-utilities-ut-report-2.md:54,56,59,70,144,159-162,187-199`), so that sub-clause holds.

Counts the report states, listed: `Tests 1 failed | 3 passed (4)`; `Tests 1 failed | 21 passed (22)`; `130 recorded sites and 130 cascade sites`; `Tests 3 failed | 8 passed (11)`; `Tests 12 passed (12)`; `Tests 1 failed | 2 passed (3)`; `Tests 2 failed | 2 passed (4)`; `Tests 3 failed | 1 passed (4)`; `Tests 4 failed (4)`; `Tests 95 passed (95)`; `Tests 122 passed (122)`; `Tests 22 passed (22)`; `Tests 19 passed (19)`; `Tests 109 passed | 1 skipped (110)`; `Tests 1 failed | 17 passed (18)`.

Findings outside the claims: none.

VERDICT: FAIL 8; outside the claims: none
