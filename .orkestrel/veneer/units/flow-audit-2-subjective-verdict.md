LANE: flow-audit-2-reviewer

Lane held: **subjective** (reviewer, Opus 5.5). The subject was written by `opus` on Opus 5.5, which is my engine. The `1rem` wording in claim 3's clause also came from my engine's round-1 subjective verdict (`/home/user/scaffold/.orkestrel/veneer/units/flow-audit-subjective-verdict.md:59`), so I attacked it harder.

## Numbered verdicts

1. **CONFIRMED.**
   - **Titles match the brief.** Every density case title has the form F1 prescribes (`e-id-flow-brief-2.md:13-17`).
   - **Where they sit.** `p.test.ts:30`, `address.test.ts:33`, `ol.test.ts:30`, `ul.test.ts:30`, `heading.test.ts:108` (adds `on every level`) and `type.test.ts:95` (adds `on the $twin class`), all under `/home/user/veneer-flow/tests/src/styles/`.
   - **"Release block margins at the default density".** Each case asserts `margin-top` 0 and `margin-bottom` equal to the release specimen (for example `ul.test.ts:39-41`).
   - **"Scales the block-end margin with the density factor".** Each case asserts `release * 2` at `--vn-factor-density: 2`, with `margin-top` still 0 (for example `ul.test.ts:42-45`).
   - **Address has no top-margin rule.** `address` gets its top margin of 0 from the user agent. The release also writes only `margin-bottom` on `address`, so "block margins" still holds.
   - **Retitling left assertions intact.** The round-1 titles (`flow.diff:351,401,452,513,558,601`) had the same assertions, and only the title strings changed. Round 2 dropped "through the space scale", which loses nothing true.
   - **Mutation, default-density half.** Moving the token one step reddens it: `mutation-address-old.log.txt:32` and `mutation-heading-step.log.txt:35-40,67`.
   - **Mutation, density half.** A literal `rem` reddens it: `mutation-p-literal.log.txt:29`, `mutation-list-literal.log.txt:32,57`, `mutation-heading-literal.log.txt:30-35,60` and `mutation-address-literal.log.txt:30`.
   - **Mutation, top-margin half.** `mutation-list-top.log.txt:36,63`.
   - **The assertions distinguish each mutation.** The step mutation fails `toBe(release)` and the literal mutation fails `toBe(release * 2)`.

2. **CONFIRMED.**
   - **Mutation named.** `_address.scss` `var(--vn-space-8)` → `1rem` (`mutation-address-literal.log.txt:1`).
   - **It reads red at the density assertion.** `address.test.ts:48` expected 32 and received 16 (log:35-48).
   - **The default-density half stays green.** The same case's `toBe(release)` passed (16 = 16), and the two `TEXT_ADDRESS_CASES` passed (log:55, `1 failed | 2 passed`). So the red comes from the density scaling alone, not from a broken build.
   - **Restore is byte-identical.** The digests `95351988…2011` match before and after (log:60-61), and `owned-r2.log.txt:169-174` is green after the rebuild.

3. **BROKEN.**
   - **What holds.** All four Reason cells carry the brief's clause verbatim (`guides/veneer.md:6656-6659` against `e-id-flow-brief-2.md:21-22`). "Where the release writes `0`" is true (`node_modules/bootstrap/scss/_reboot.scss:171-176`). The `.mb-0` half is true (`ul.test.ts:62`, green in `owned-r2.log.txt`).
   - **What breaks: the clause names a fixed `1rem` where the cascade writes a density-scaled token.**
     - **The token.** The list rule writes `margin-bottom: var(--vn-space-8)` (`src/styles/_mixins.scss`, the `list-space` mixin). That token is `calc(1rem * var(--vn-factor-density))` (`src/styles/_tokens.scss:416`).
     - **The density factor is a published knob.** The guide calls it one of "the published radius and density factors" (`guides/veneer.md:4531`).
     - **The ul rule doubles.** At factor 2 the `ul` rule reads 32px (`ul.test.ts:42-45`, green).
     - **The inner list takes the same rule.** A search of `src/styles` for `\bli\b|ul ul|ol ol|li > |:is\(ul|:where\(ul` found no contextual or `li` rule.
   - **Failing state.** Set `--vn-factor-density: 2` on `:root` and mount `<ul><li>Outer<ul><li>Inner</li></ul></li></ul>`. The inner list keeps a bottom margin of 2rem (32px). The guide says it keeps "the list's `1rem` bottom margin".
   - **How that reading was reached.** The nested reading is derived from the executed outer-`ul` reading and the source search. No run at factor 2 on a nested list exists, so the objective lane can run it.
   - **It breaks the guide's own convention.** The guide uses `1rem` for the release's recorded value, and names Veneer's value as the token that rescales: "Its bottom margin reads `--vn-space-8` … rescale with `--vn-factor-density`" (`guides/veneer.md:4861-4862`), and "The recorded `1rem` bottom margin becomes the `var(--vn-space-8)` value, which … rescales" (`guides/veneer.md:5522-5524`).
   - **It undercuts the change it records.** The change exists to move these margins onto the density-scaled token.
   - **Smallest fix.** In all four cells at `guides/veneer.md:6656-6659`, replace "keeps the list's `1rem` bottom margin" with "keeps the list's `--vn-space-8` bottom margin". Keep the rest of the clause, then re-run `npm run format:check` and `npm run test:guides`.
   - **Where the fix belongs.** The unit copied the brief's text faithfully, so the fix goes to the brief text, not to the unit's conduct.

4. **CONFIRMED.**
   - **Readings.** `ul.test.ts:61` reads the bare inner `ul` at 16px, and `ul.test.ts:62` reads the inner `ul.mb-0` at 0px.
   - **Fixture order is guarded.** The class-name asserts at `ul.test.ts:59-60` fail if the two lists swap.
   - **Mutation named.** `_ul.scss` gains `ul ul { margin-bottom: 0; }`. It is inserted one tab deep after the `ul` rule's closing brace, so it sits inside `@layer elements` (`mutation-nested-list.log.txt:1-9`, against `/home/user/veneer-flow/src/styles/elements/_ul.scss:3-8`).
   - **It reads red at the bare-list assertion.** `ul.test.ts:61` expected 16 and received 0 (log:42-53). The other cases passed (log:62). The restore is byte-identical (log:67-68).
   - **The assertion distinguishes the mutation.** It reads 16 without the mutation and 0 with it.
   - **The title states what the case proves.** "keeps the block-end margin on a list nested in a list item" matches line 61, and "the .mb-0 class removes it" matches line 62.

5. **CONFIRMED.**
   - **No new path.** `flow-2-status.txt` and `flow-status.txt` list the same modified paths.
   - **Language bans.** No added line in `flow-2.diff` contains `any`, a type assertion, `!`, or a suppression comment. The only `as const` (`flow-2.diff:253`) is an unchanged context line.
   - **Callbacks.** The added callbacks are anonymous arrows passed straight to `map`, `setProperty`, or `it`, which the nested-function rule permits.
   - **No hidden helper.** Round 2 adds no declaration. The round-1 constants `HEADING_MARGIN` and `FLOW_MARGIN` are exported and registered in `tests/setupStyles.test.ts:414,442`.

## Findings outside the claims

None that meet the BROKEN standard.

## Attacked and held

- **Claim 1, rival reading:** "the title overstates `scales` from a single sample". It held, because the token is linear in the factor (`_tokens.scss:416`) and the literal mutation separates a token from a literal.
- **Claim 4, rival reading:** "the `.mb-0` half is untested under the mutation". It held as scoped, because the claim covers only the named mutation. Line 62 is not reached under that mutation, and it is green without it.
- **Adjacent behaviour that is correct:** the nested case asserts `16` directly instead of reading the `FLOW_MARGIN` specimen its sibling uses (`ul.test.ts:31-41`). That is consistent with F3's "16px" wording. It differs in style, but the reading is correct.

## Referrals (to the objective lane)

- **R1.** Only `ul ul` has an executed reading. The `ol ol`, `ol ul`, and `ul ol` rows rest on source reading plus the conformance proof's check on the deferred name.
  - **Question:** does any existing gate reject `li > ol { margin-bottom: 0 }` added to `@layer elements` in `src/styles/elements/_ol.scss`? For example, a check that refuses selectors that are neither in the release inventory nor recorded as additions.
  - **Why it matters:** if no gate rejects it, the guide's claim about an inner `ol` can go false with every test green.

VERDICT: FAIL 3; outside the claims: none
