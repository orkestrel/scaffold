## Verdict

**Per-claim verdicts**

**1. Scope.** CONFIRMED, with one sub-clause UNRESOLVED.
- File scope: `apt-4-status.txt` is line-for-line identical to `apt-3-status.txt` (both list the same 14 modified paths). CONFIRMED.
- Hunk-scope ("nothing else... changed"): compared `apt-4.diff` against `apt-shared-3.patch` (`guides/veneer.md`, `tests/setupStyles.ts`) and `apt-3.diff` (`src/styles/utilities/_font.scss`) hunk-by-hunk.
  - `guides/veneer.md` first hunk `@@ -6151,16 +6151,25 @@`: byte-identical between round 3 and round 4 (no round-4 edit lands here — the "None of these entries takes a breakpoint infix" line was already round 3's own text, per `apt-shared-3.patch:5-13`).
  - `guides/veneer.md` second hunk: round 3 (`apt-shared-3.patch:37-46`) has "The partial writes every entry…"; round 4 (`apt-4.diff:40-49`) reads "The `_font.scss` partial writes every entry…" — the only delta, rest is pre-existing round-3 text pulled into the wider hunk boundary. CONFIRMED as the sole change.
  - `src/styles/utilities/_font.scss`: round 3 (`apt-3.diff:108-109`) has "None of the release's font entries is responsive, so the walk"; round 4 (`apt-4.diff:530-531`) has "…takes a breakpoint infix, so the walk". Surrounding hunk (`fluid-size`/`$caps` block) identical in both. CONFIRMED as the sole change.
  - `tests/setupStyles.ts`: round 3 (`apt-shared-3.patch:715-717`) has "the 2.25rem row sits under a 20px root"; round 4 (`apt-4.diff:644-646`) has "…resolves against a 20px root." All surrounding hunks (`computeFluidSize`, `TEXT_FLOOR_CASES`, `FLUID_WIDTHS`, `CAPPED_WIDTHS`, `TYPE_HEADING_CASES`/`TYPE_DISPLAY_CASES` TSDoc) byte-identical between the two diffs. CONFIRMED as the sole change.
- "the compiled cascade is byte-identical to round 3's" — UNRESOLVED. `apt-instruments-4/apt-4-build-styles.log.txt` (read in full) contains only the Vite build output (`✓ built in 2.15s`, `286.38 kB`); it contains no `cmp` invocation or comparison output. The report's gate table marks the `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` row "ran inline; recorded here" with no log file — that is the writer's own report quoting itself, which is not evidence of the run. Command needed: `cmp dist/src/styles/index.css tmp/units/apt-3-index.css`, run and logged, to close this.

**2. L1.** CONFIRMED. `tests/setupStyles.ts`, `FLUID_SIZE_CASES` `@remarks` (`apt-4.diff:640-652`): floor relation uses "scales over the 1.25rem floor" (3rem/root16 row, true: 48px > 20px floor) and "sits under it" (1rem/root16 row, true: 16px < 20px floor); root relation uses the distinct phrase "resolves against a 20px root" (2.25rem/root20 row) rather than reusing "sits under", closing the L1 finding (`apt-audit-3-verdict.md:24`).

**3. L2 and L3.** CONFIRMED.
- L2: guide sentence now names `_font.scss` (`apt-4.diff:40,44`); comparison against `apt-shared-3.patch:37-46` shows the `_font.scss` insertion is the only word-level change, the rest is pre-existing round-3 text folded into the widened hunk.
- L3: `_font.scss` comment now reads "None of the release's font entries takes a breakpoint infix, so the walk" (`apt-4.diff:530-531`), stating what the empty infix means; comparison against `apt-3.diff:108-109` shows no other word in that comment changed.

**4. L4 and L5.** CONFIRMED.
- L4: `tests/src/styles/utilities/font.test.ts:274-298` ("reads no mode or density factor…") and `:331-349` ("keeps its priority over a later unlayered consumer rule") both compute a `resting`/`utilityResting` baseline at runtime and assert against it rather than against a hardcoded `.fs-3` literal, so the erratum's claim that these assertions "stay true under every supplied mutation" holds on the code as read.
- L5: the erratum text ("the edited guide paragraphs are rewrapped by hand to 100 columns") states no count, correcting round 3's "The two edited guide paragraphs" defect (`apt-audit-3-verdict.md:28`).

**Counts the report states**

`ap-type-report-4.md` gate table lists 5 logged gates (Format, Lint, Typecheck, Guides test, Styles build) plus one unlogged inline row (CSS parity).

**Findings outside the claims (BROKEN standard)**

- **F1 — count law violation in the deliverable's own title.** `ap-type-report-4.md:1` ("AP-TYPE round 4 report — three comment lines and two report errata") and its source `ap-type-brief-4.md:1` state two counts ("three comment lines", "two report errata") over sets that can grow (edits, errata), which `AGENTS.md` § Writing bans unconditionally ("NEVER state a count… findings… are such sets"). Carrier: next prose touch to either file.
- **F2 — acceptance criterion 3's log requirement not met as specified.** The brief (`ap-type-brief-4.md:70`) requires the `cmp` command to be "logged"; the report records it "ran inline" with no log file under `tmp/units/`, so the byte-identical-cascade claim in claim 1 rests only on the report's self-report. Carrier: re-run and log the `cmp` command.

**VERDICT: FAIL none; outside the claims: F1, F2**
