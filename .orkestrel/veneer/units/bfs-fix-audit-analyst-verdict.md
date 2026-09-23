# B-FORMS-SELECT, round 2 (the fix round) — `analyst` on GPT-6 Astra, objective lane

Journal: `tmp/codex/bfs-fix-audit-analyst.jsonl` (swept at acceptance); thread `01a0cc62-af26-7750-bcc0-d19e111386d6`; exit exit=0; launcher `bfs-fix-audit-analyst.sh`. Claims: `bfs-fix-audit-claims.md`.

1. **CONFIRMED — assertion adequacy.** [form-select.test.ts:154](/home/user/veneer-bfs/tests/src/styles/components/form-select.test.ts:154) requires each mode’s body color and rejects the wrapper’s color. The attack that replaces the binding with inheritance therefore fails. Removing the declaration is also distinguishable through the recorded-color row. [setupStyles.ts:3771](/home/user/veneer-bfs/tests/setupStyles.ts:3771) carries the color and background rows; the in-memory removal control exposed the missing color row. The TSDoc and [guide:779](/home/user/veneer-bfs/guides/veneer.md:779) identify the separately tested image, transition, and focus declarations. The reported browser red/green history was not independently rerun.

2. **CONFIRMED.** Reconstructed the round-1 partial from the supplied diff and compiled it alongside [the current partial:82](/home/user/veneer-bfs/src/styles/components/_form-select.scss:82), entirely in memory. The outputs were byte-identical. Changing the caret height from `12px` to `13px` made the comparison fail. The emitted small and large rules preserve the release’s order and declarations.

3. **CONFIRMED.** Swept every backticked span in [the guide section:723](/home/user/veneer-bfs/guides/veneer.md:723). Individual spans carry their nouns; coordinated lists share the closing nouns “tokens,” “aliases,” “selectors,” or “variables.” The attack seeking a remaining bare filename or property found none. The sentence at line 733 identifies the token file as the location of the maps.

4. **CONFIRMED.** The omission attack against [the carrier row:133](/home/user/scaffold/.orkestrel/veneer/units/bfs-2-report.md:133) failed. Searching the guide and proofs for `select-indicator`, `theme scope`, and `--bs-form-select-bg-img` found the named guide sentences, dark-caret title and comment, and theme assertions. The row assigns them to B-FORMS-ASSETS and explicitly identifies the token case’s comparison against the dark-variable inventory.

5. **CONFIRMED.** [The focus comment:53](/home/user/veneer-bfs/src/styles/components/_form-select.scss:53) claims agreement with the button’s ring. Comparing their bindings supports that statement. The counterexample in [pagination:22](/home/user/veneer-bfs/src/styles/components/_pagination.scss:22) no longer contradicts the comment because the package-wide claim is gone.

6. **BROKEN.** [The guide:749](/home/user/veneer-bfs/guides/veneer.md:749) still overstates the validated exception: “a validated select keeps the release’s end padding and caret inset at any density.”

   Counterexample: `<select class="form-select is-valid" multiple>` with the root density token set to `2`. Compiling the actual barrel and inspecting its declarations shows that [the literal validation geometry:69](/home/user/veneer-bfs/src/styles/components/_validation.scss:69) excludes multiple selects and multi-row sized selects. Those controls retain [the list rule’s token-bound end padding:64](/home/user/veneer-bfs/src/styles/components/_form-select.scss:64), so their padding continues to scale.

   Smallest fix: restrict the literal-geometry exception in the guide and partial comment to non-multiple validated selects whose size is absent or `1`. Preserve the list forms’ density scaling. The B-FORMS-CLOSE carrier row is present and correctly assigned.

   Browser settlement: temporarily add `several.classList.add('is-valid')` to the existing spacing case, then run:
   `npm run build:src:styles && npx --no-install vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-select.test.ts -t 'reads its spacing'`.
   Its existing list-padding assertions distinguish continued scaling from literal validation padding.

7. **CONFIRMED — assertion preservation and discrimination.** Compared the assertion sets reconstructed from the prior diff with [the current proof:39](/home/user/veneer-bfs/tests/src/styles/components/form-select.test.ts:39), normalizing the mode-variable rename. No assertion disappeared; deleting the single-row assertion made the comparison report it.

   The named mutations remain distinguishable: broadening the sized selector removes the single-row caret; applying component treatment to the bare select changes its appearance or ring; removing the disabled attribute defeats the traversal rejection; retaining the Gecko selector changes the CSSOM lookup; replacing the focus-width token with a literal defeats the retune assertion. The split case titles identify those subjects. Browser settlement for these readings is:
   `npm run build:src:styles && npx --no-install vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-select.test.ts`.

8. **CONFIRMED.** [The caret case:186](/home/user/veneer-bfs/tests/src/styles/components/form-select.test.ts:186) consistently uses light and dark bindings. Comparing the renamed assertions with their predecessors found no reversed expectation. The supplied established absence check covers the retired terms.

9. **CONFIRMED.** [The carrier rows:143](/home/user/scaffold/.orkestrel/veneer/units/bfs-2-report.md:143) separately assign the repeated motion literal and the guide-wide token-noun sweep to B-PASSIVE-CLOSE. The attack seeking conflicting ownership failed; the motion row names every proof specified by the claim.

10. **CONFIRMED — enumerated syntax and scope checks.** The TypeScript AST check over added lines found no prohibited assertion, non-null assertion, `any` type, suppression, or improperly assigned nested function. Planted syntax controls were detected. [The set declaration:2211](/home/user/veneer-bfs/tests/setupStyles.test.ts:2211) supplies a generic type argument, not an assertion. Evaluated case tables and rows are frozen; the diff introduces no replacement helper for an installed test primitive. The established status matches the authorized file set, the protected files remain outside the diff, and `tmp/probe/` is absent. My `npm run check` exited **0**.

Findings outside the claims: none.

Attacked and held: Chromium’s absence of the Gecko rule is an explicit evidence boundary, while the compiled-declaration proof retains that rule’s contract. A nested light island retaining the dark caret follows the release’s descendant selector and is correctly asserted.

VERDICT: FAIL 6; outside the claims: none