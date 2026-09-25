LANE: eic-audit-3-reviewer

**Lane held:** subjective, on Opus 5.5. The brief assigned it, and I did not swap lanes. I ran nothing: every reading below comes from the retained logs, the compiled cascade, or the source.

## Verdicts

1. **Scope — CONFIRMED.**
   - The status at `/home/user/scaffold/.orkestrel/veneer/units/eic-3-status.txt:1-11` lists only files the briefs grant:
     - owned: the `_kbd`, `_pre`, and `_samp` partials and their tests (`e-id-code-brief.md:20-21`), and `ContentSection.test.ts` (`e-id-code-brief-2.md:19`);
     - shared: `constants.ts`, `guides/veneer.md`, `_mixins.scss`, and `setupStyles.ts` (`e-id-code-brief.md:22-23`, `e-id-common.md:31`).
   - `_code.scss`, `code.test.ts`, `tests/src/styles/index.test.ts`, and `tests/setupStyles.test.ts` are absent from both the status and `eic-3.diff`. Because the diff is `git diff ca83afb`, each of those files is byte-identical to `ca83afb`.

2. **Withdrawal — CONFIRMED.**
   - In `/home/user/veneer-eic/dist/src/styles/index.css`:
     - The pattern `pre code|a>code|a > code|kbd kbd|kbd>kbd|pre>code` matches nothing.
     - A combinator pattern that puts any tag before or after `code`, `kbd`, `samp`, or `pre` also matches nothing.
     - The code-family rules ship as bare `code{…}`, `kbd{…}`, `samp{…}`, and `pre{…}` only.
   - `RELEASE_TAG_PAIRS` matches nothing in `/home/user/veneer-eic`. The search excluded `node_modules` and `dist` and included `tmp`.

3. **Positional law — CONFIRMED.**
   - `index.test.ts:76-81` asserts `scanPositionalPairs(rules, STYLED_TAGS, MANDATED_TAG_PAIRS)` equals `[]`. It is green in `r3-owned-green.log.txt` (exit 0).
   - The mutations are in `eic3-mutate.py:14-16`. Each inserts the rule inside `@layer elements`, then `eic-run.sh:8` rebuilds and runs the test.
     - m18 re-adds `pre code {font-size: inherit; color: inherit}`. The test receives `['pre > code']` (`r3-mutation-m18-readd-pre-code.log.txt:35`).
     - m19 re-adds `a > code {color: inherit}` and receives `['a > code']` (m19 log:35).
     - m20 re-adds `kbd kbd {font-size: 1em}` and receives `['kbd > kbd']` (m20 log:34).
   - The assertion tells each mutation apart from the passing tree, and names the pair. The scan reports each descendant pair in child form because it mounts direct children. That form still distinguishes the mutation, because a descendant selector also matches a direct child.
   - The positional-law paragraph (`guides/veneer.md:3145-3153`) is not in the diff, so it reads as at `ca83afb`. It is true of the shipped layer: the only exception it names is the content-model pairs.

4. **Hooks — CONFIRMED.**
   - `_kbd.scss:7` and `_pre.scss:11` read `var(--bs-border-width)`. The same reads appear in the compiled `kbd{…border:var(--bs-border-width)…}`.
   - Mutations m13 and m14 swap in `--vn-border-width`. That token resolves at the root, so the case reads `1px` against the `3px` a scope sets. The logs show `expected '1px' to be '3px'` (m13 log:33, m14 log:33), which distinguishes the mutation.
   - A removed border (0px) or a literal `1px` would also redden the case.
   - The title "reads its border width from the release hook a scope retunes" (`kbd.test.ts:162`, `pre.test.ts:177`) states what the case proves.

5. **Corner — CONFIRMED.**
   - `_samp.scss:6` includes `code-surface(var(--vn-surface-raised))`. The compiled `samp{…border-radius:var(--vn-radius-small)…}` matches `radius: 4` at `setupStyles.ts:1472`, which is also the `code` value at line 1297.
   - Mutation m15 restores the bare background line. Both mode cases redden with `expected +0 to be 4` (m15 log:35), which distinguishes the mutation.
   - The `radius-base` corner (6px) would also redden the case.

6. **Records — BROKEN** (the `samp { border-radius }` reason only).
   - **What holds:**
     - The `pre code`, `a > code`, and `kbd kbd` Excluded rows (`guides/veneer.md:6623-6625`) keep their `ca83afb` clause and add a reason that is true. The cascade ships no such rule, and ROADMAP.md:35-36 refuses "component styling from combinations of tags or their surrounding structure".
     - No addition row for those pairs remains.
     - `r3-gate-test-conformance.log.txt:11,15` reads `Tests 26 passed (26)`, exit 0.
     - The m18-m20 conformance runs redden `defers no name the built cascade ships` on each re-add, so the ledger does read these rows.
   - **What breaks:** the row at `guides/veneer.md:9922` gives its reason as "Elements gives sample output the chip corner the rest of the code family carries". The shipped cascade contradicts that under either reading of "code family" the guide supports:
     - Line 6924 defines the family by the `--vn-font-mono-base` stack. That definition includes `pre`, which carries `var(--vn-radius-base)` (`_pre.scss:12`; `TEXT_PRE_CASES` `radius: 6` at `setupStyles.ts:1451`), not the chip corner.
     - The next row, line 9923, says `var` is painted "as inline code", on the same raised surface as `samp`. `var` has no corner at all (`_var.scss:1-11`; `TEXT_VAR_CASES` pins no radius, `setupStyles.ts:1553-1567`).
   - **Same overclaim in the mixin comment:** `_mixins.scss:106-107` says "the chip every inline member of the code family wears", but `var` does not include the mixin.
   - **Why it matters:** the guide ledger is product truth, and the adjacent row at 9923 contradicts this one.
   - **Smallest fix:**
     - Reword 9922 to "Elements gives sample output the chip corner inline code and keys carry."
     - Reword `_mixins.scss:106-107` to name the wearers: "Emits the chip the `code`, `kbd`, and `samp` elements wear: its surface and its corner."

7. **Specimens — CONFIRMED.**
   - The markup is at `app/browser/constants.ts:497-504` in the patched file: `<a href="#main"><code>`, `<pre><code>`, and `<kbd><kbd>…</kbd> + <kbd>…</kbd></kbd>`.
   - Capture evidence: `r3-breakage-probe.log.txt` measures the same shapes in Chromium against the round-3 cascade, at 390 and 1280 pixels. Each tag keeps its own rule:
     - linked code keeps the code color against the anchor color (lines 125-128);
     - code in a block keeps its chip padding and code surface (lines 15-18);
     - the inner keys keep keycap padding, border, and surface (lines 172-177, 183-188).
   - Those readings fit only a cascade with no contextual rule; the round-1 and round-2 rules would have zeroed them.
   - Corroboration from source: the showcase shell paints no specimen (`app/browser/styles/_shell.scss:9-10`), and no app style names `code`, `kbd`, `pre`, or `samp`.
   - `ContentSection.test.ts:41,43,45` pins `Linked code`, `Code block`, and `Key combination` by name, and lines 95, 97, and 99 pin their markup.

8. **Law — CONFIRMED.**
   - The diff adds no `any`, no `as`, no non-null assertion, no suppression, no nested function, and no hidden helper.
   - The added cases are named for what they prove. The `samp` case keeps its title "resolves the samp values in $mode mode", and the radius is one of those values.
   - No added guide or comment prose states a count.

## Findings outside the claims

**F1 — The tenet citation sits on some composition rows and not on their same-ground siblings, under a label ROADMAP.md does not use.**
- The `ol ol`, `ul ul`, `ol ul`, and `ul ol` rows (`guides/veneer.md:6619-6622`) give "infers styling from tag composition". The `legend + *` row (6626) gives inference from adjacency. The ROADMAP.md:36 tenet refuses all of these.
- Only the `pre code`, `a > code`, and `kbd kbd` rows (6623-6625) cite it. A reader therefore infers a different ground for the code rows. That breaks the "one concept, one term" law in `AGENTS.md`.
- "The semantic-tags tenet" is a coined label. ROADMAP.md:35 titles the tenet "Give semantic tags useful defaults without inferring components", so a search for the label finds nothing.
- The cause is the brief, not the writer: `e-id-code-brief-3.md` step 2 mandated the citation for these rows alone.
- **Fix (recommended):** give the citation one home. Add one sentence to the § Deferred selectors lead (`guides/veneer.md:6609-6615`) that names the tenet by its ROADMAP.md title and covers every row that refuses a name for tag composition or adjacency. Restore the three code rows to their `ca83afb` reason text.
- **Alternative:** add the same clause, naming the tenet by title, to the `ol ol`, `ul ul`, `ol ul`, `ul ol`, and `legend + *` rows as well.

## Attacked and held

- **Compounding sizes are not a positional rule.** Code in a block reads 0.9 of the block (11.025 against 12.25), and a nested key reads 0.875 of its outer key. Both come from each tag's own percentage rule, so the positional scan correctly passes them. The tenet's "must not change unpredictably" is met because the ratio is fixed.
- **A retitle was not needed.** The unchanged `samp` title still covers the added radius assertion.
- **The `code-surface($surface)` parameter is a plain single word, and it is used only where the surface differs.**
- **The compiled cascade is a clean build.** Mutations m18-m20 rebuilt with rules in place, yet `dist` holds no contextual selector and does hold the `samp` radius, so a restored build followed.

## Referrals (to the Orchestrator)

- **Should `var` wear the chip corner?** `var` shares `samp`'s raised surface and is painted "as inline code" (`guides/veneer.md:9923`), but it keeps square corners, which is the incoherence this round fixed for `samp`. `var` is outside E-ID-CODE's grant, so this needs a design ruling, not a verdict from this lane.

VERDICT: FAIL 6; outside the claims: F1
