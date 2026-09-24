**Lane held: subjective** (`reviewer` on Opus 5.5). The unit's writer, `opus`, runs on the same engine as this lane, so I pressed hardest on the proofs and names it wrote.

## Per-claim verdicts

**1. UNRESOLVED.** Three parts hold and one does not.
- **Holds:** the `UNDER_BAR` edit matches the measurement. `lc2-journey-light-1.log.txt` lines 13–30 show the list received before the edit, and it equals the edited `tests/setup.ts` list.
- **Holds:** `lc2-journey-light-2.log.txt`, `lc2-journey-dark-2.log.txt`, and `lc2-app.log.txt` each exit 0.
- **Holds:** the TSDoc sentence added at `tests/setup.ts` near line 2665 reads true against that measurement.
- **Does not hold:** the search for other pins has no retained record. No search command or output appears in `lc-instruments/`, so the only evidence is the writer's report.
- **Coverage gap:** the report names patterns for "dark hover and active fill values" only (`b-label-lc-report-2.md` lines 26–27). Brief item 1 also names a label, a `text-bg` color, and a link hover color.
- **What settles it:** retain the search command and output, with patterns for those three paints, over the paths the report names.

**2. CONFIRMED.**
- **Cause of the white readings:** `lc2-probe-1.log.txt` lines 15–18 settle it. With motion on, the label reads white at once with `transition 0.15s`. It reads black 400 ms later, and black at once with motion off.
- **The case:** `tests/src/styles/components/button.test.ts` lines 145–162 assert white before the root takes the attribute and black after it.
- **R1** (root scheme rule after the mode scopes) reddens only this case. The island case stays green (`lc-mutations-2.log.txt` lines 5–9).
- **R2** (transition on) reddens it (lines 16–20).
- **Mutation that distinguishes:** the assertion taken before the attribute is set stops a mutation that makes the root label always black.

**3. BROKEN.** The proofs hold, but the guide sentence at `guides/veneer.md` lines 3002–3004 does not state the behavior they pin.
- **The proofs hold:**
  - `BUTTON_SCHEME_CASES` pins the `declared` case to white and the `lowered` case to black. The fill-equality assertion is at `button.test.ts` line 176.
  - R3 reddens the lowered case.
  - A product mutation that stops lowering the label, or makes the fill mode-dependent, fails one of the two cases.
- **Why the sentence fails:** the package publishes only `./styles` → `dist/src/styles/index.css`. `package.json` line 40 sets that export, and `files` (lines 13–16) ships `dist/src` alone. That stylesheet is lowered: "lowered true native false" (`lc2-probe-1.log.txt` line 14).
  - No consumer of the package receives a native `light-dark()` label.
  - Chromium, a browser that reads `light-dark()` natively, keeps the white label under a plain declaration. That is exactly the `declared` case.
  - A reader who takes "wherever a browser reads `light-dark()` natively" as browser support is told the opposite of what ships.
  - The sentence also omits the default: with the shipped stylesheet, a plain declaration keeps the label.
- **Origin:** the "native" branch comes from brief item 3's wording.
- **Right looks like:** "The shipped stylesheet keeps the label under a `color-scheme` value you set apart from the attribute, and moves it only where your own build lowers that declaration into the same variables; neither moves the fill, so set the `data-bs-theme` attribute instead."
- **Also wrong:** the proof sentence at lines 3004–3006 still lists only the island readings. Name the root-attribute case and the consumer-scheme cases.

**4. CONFIRMED.**
- **The assertion:** `tests/src/styles/utilities/link.test.ts` lines 67–82 compute `rest·(1−LINK_SHIFT) + endpoint·LINK_SHIFT` per channel in sRGB. That is the right operand order for `color-mix(in srgb, endpoint 20%, rest)` at `_link.scss` lines 22–26.
- **R4** (`$shift: 10%`) reddens all 16 role and mode cases (`lc-mutations-2.log.txt` lines 42–57).
- **Also distinguished:** a mode-dependent shade endpoint. The expected value reads the light scope's `--vn-state-mixer` token (line 70), while `$endpoints` compiles the light value literally (`_tokens.scss` line 240).

**5. BROKEN.** The rename still gives one concept two names, the class of defect F3 named.
- **The pair of light and dark triplets has two names:**
  - `$pair` at `src/styles/_tokens.scss` lines 214–218.
  - `$mode-triplets` for the same value in `_mixins.scss` lines 219–223 and 233–235, and in `components/_button.scss` lines 142–145.
- **One name covers two things:** `$mode-triplets` also names the map from role to pair. The clash shows in one line at `_button.scss` line 142: `$mode-triplets: map.get(tokens.$mode-triplets, $role);`.
- **Contrast with the triplet names:** `$triplets` and `$triplet` separate the map from the element cleanly.
- **The prose splits too:** the unit changed some comments from "channel triplet" to "sRGB triplet" (in `_mixins.scss`, `_tokens.scss` lines 169 and 209, and the fixture) and left "channel triplet" in:
  - `_tokens.scss` line 16, which is the concept's definition;
  - `_mixins.scss` line 397;
  - `utilities/_color-bg.scss` line 11;
  - `components/_validation.scss` line 7.

  The guide uses "channel triplet" throughout (lines 5979, 6051, 6466), so round 2 created the synonym split.
- **Right looks like:**
  - Give the per-role pair one name everywhere: the `_tokens.scss` loop local, the `label` and `endpoint` parameters, and the button local. `$pair` works.
  - Give the map a different name, for example keep `$mode-triplets` for the map only.
  - Revert the prose to "channel triplet", the guide's term, at every rewritten site.
- **Not ruled by this lane:** whether the built cascade is byte-identical. See referral R-b.

**6. BROKEN.** The tables are in place, but the parity comment and two proof titles do not read true.
- **Holds:** the island, transition, and scheme tables live in `tests/setupStyles.ts` (near lines 3006–3063).
- **Holds:** the floor wording at `guides/veneer.md` lines 6404–6407 matches `button.test.ts` lines 57–70.
- **Holds:** the retune sentence reads true.
  - Tooltip color sits in `@layer components` with no `!important` (`_validation.scss` lines 12 and 31).
  - The link hover color is `!important` in the utilities layer (`_link.scss` line 36).
  - The hover mixes over `--vn-color-{role}-rgb` (line 25).
- **Broken, the parity comment:** `src/styles/_mixins.scss` lines 189–190 say "every fill Veneer and the release ship picks as the release does, which the `tests/src/styles/fixtures/contrast.scss` fixture proves."
  - The fixture iterates only the release's `$theme-colors` (`contrast.scss` line 30), and `mixins.test.ts` near line 578 reads only those roles.
  - No proof puts Veneer's own fills through the release's rounded table: tertiary, success, info, warning, danger, and the primary and secondary fills in each mode.
  - This is the round-1 claim-2 defect (a parity comment claiming more than its proof) in a new place.
  - **Right looks like:** scope the sentence to the release's fills, or extend the fixture to run each `$mode-triplets` entry through the release's `color-contrast` function and assert the same pick.
- **Broken, a proof title:** `tests/setupStyles.test.ts` line 2666 says "pairs each direction transition with a later state it moves to".
  - Its assertions check that `from` differs from `to` and that each `to` is unique, and nothing about "later".
  - Reversing the first row to `{ from: 'filled hover', to: 'filled rest' }` passes this proof.
  - It also pins `LINK_SHIFT` (line 2671), which has nothing to do with transitions. Move that pin to the link-constants proof.
- **Broken, a proof title:** line 2648 says "names each island button once", but no assertion checks uniqueness. Adding a second `Root primary` button and a matching second row passes. Either assert uniqueness or retitle the proof.

**7. CONFIRMED.**
- **The diff:** no added line brings in an `any`, an `as` (the only `as const` is in unchanged context), a non-null `!`, a suppression, a nested function, or a mock.
- **Callbacks:** `Array.from(…, ([, name]) => name)` and the `find` callback are anonymous arguments, which the rule allows.
- **Gates:** `lc2-gates.log.txt` lines 1–9 print exit 0 for every gate.
- **Adjudication:** the objective lane owns this claim in full.

## Findings outside the claims

**G1. A proof title claims more than its assertions check.**
- `tests/src/styles/components/button.test.ts` line 43 says "keeps the %s label legible over every filled and outline state". The case reads the outline's hover, active, and checked states only (lines 63–68).
- The outline rests are the rows `UNDER_BAR` records as under the bar, so the title is false.
- Round 1 struck this wording from the guide (`lc-audit-verdict.md` line 34), but the title keeps it.
- **Right looks like:** name the states read, as the guide at lines 6405–6407 does.
- **Same file, line 145:** the title uses a temporal "once". The `.claude/rules/writing.md` substitution table replaces it with "after" or "when".

**G2. `LINK_SHIFT` was inserted between an export and its TSDoc.**
- At `tests/setupStyles.ts` lines 1181–1188, "Holds the underline offsets at the specimen's explicit 16px font size." sits directly on top of the `LINK_SHIFT` doc block.
- `LINK_SHIFT` therefore carries two stacked doc blocks, and the first one describes offsets.
- `LINK_OFFSET_CASES` (line 1188) is left with no TSDoc.
- **Right looks like:** move the `LINK_SHIFT` block and its declaration above line 1181, so the offsets comment sits on `LINK_OFFSET_CASES` again.

**G3. The retune text breaks "one idea per sentence".**
- At `guides/veneer.md` lines 6397–6404, the F2 text is joined onto the button-variable sentence with a semicolon and a colon.
- The result is one sentence of roughly 95 words carrying four ideas: the button obligation, the tooltip fix, the utilities-layer escape, and the link direction. Its "because" clause justifies two unlike things.
- `AGENTS.md` § Writing requires one idea per sentence.
- **Right looks like:** end the button sentence at "retunes." and give the other sites their own sentence. That also meets the reported decision of one sentence per item, which rests only on the writer's word.

## Attacked and held

- **R1 is specific to the root case.** It leaves the island case green, because the root rule and the island's attribute selector sit on different elements.
- **The `lowered` case is not just the island case again.** The inline "Scheme primary" and the `declared` case read the same thing from different sources, and the `declared` case adds the fill assertion.
- **The remaining "mixer" wording is correct.** In `link.test.ts` line 64 and `_tokens.scss` line 237 it names the published `--vn-state-mixer` token, not the renamed function.
- **The transition map works.** Reading the `Map` by the table's `from` and `to` keys goes through `requireValue`, so a row naming a state that was never read fails loudly.
- **The mixins comment matches the code.** The `endpoint` function comment (`_mixins.scss` lines 227–232) agrees with `$endpoints`.

## Referrals

- **R-a (objective lane):** `lc2-journey-dark-1.log.txt` passed the composed-contrast case at 14:55:34. The report never places that run before or after the `UNDER_BAR` edit. If it ran before, the `dark-390` variant cannot tell the edit apart, and `lc2-journey-dark-2.log.txt` is not evidence for it.
- **R-b (objective lane):** the byte-identity claim in claim 5 rests on `lc2-build-base.log.txt`. That log records no command line and no commit, so the baseline's source is the writer's word. The gate 5 `cmp` also has no negative control.
- **R-c (objective lane):** "the app project reads `light-dark()` natively" (claim 3) has no retained run. The only probe covers the styles project.
- **R-d (Orchestrator):** the showcase app compiles the Sass source, so it shows a native `light-dark()` label that no consumer of the published package receives. This is a product-coherence question outside this unit.

VERDICT: FAIL 1, 3, 5, 6; outside the claims: G1, G2, G3
