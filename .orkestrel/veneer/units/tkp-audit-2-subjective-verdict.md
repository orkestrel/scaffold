Lane: subjective (`reviewer` on Opus 5.5). Every claim was ruled on the uncommitted tree at `/home/user/veneer-tkp` and the evidence under `/home/user/scaffold/.orkestrel/veneer/units/`. I ran nothing, so every executed reading below comes from the unit's retained logs.

## Verdicts

**1. CONFIRMED.**
- Evidence: `tkp-instruments/r2/logs/tkp-2-plant-link-decoration-hover.log.txt`.
  - The plant rewrites only occurrence 2 of 2, the `.btn-link:hover` rule (`_button.scss` around line 204). The log's `git diff` shows that one hunk.
  - It fails at `tokens.test.ts:776:58` with `AssertionError: expected 'underline' to be 'overline'`.
  - Line 776 is the case's last assertion, so every earlier assertion held.
  - Restore: `restored-byte-identical`, `src-diffstat-lines=0`.
- Mutation: hard-code `.btn-link:hover` to `underline`.
  - The twin's hover reading expects `underline` and still passes.
  - The inside button's hover reading expects `overline` and fails.
  - The rest rule (around line 200) is a separate rule, so the assertions tell a hover-only break apart from a rest break.

**2. CONFIRMED.**
- Evidence: the `placement-*` logs.
  - Each plain plant makes `_validation.scss` read `--vn-form-*` directly. Each fails at its own plain assertion: 878, 881, 884, 887.
  - Each mode plant hard-codes one `--bs-form-*` alias in `theme-tokens`. Each fails at its own mode assertion: 888, 889, 890, 891.
  - Every failure is `AssertionError`, and every restore is byte-identical.
- Mutation, both directions:
  - A rule that reads the canonical token directly breaks the plain hold.
  - An alias that stops resolving over the token breaks the mode move.
- The case therefore tells the two placements apart. I checked the line mapping against `tkp-3.diff` (the hunk starts at 679, the case at 837).

**3. CONFIRMED.**
- Evidence:
  - `tkp-2-plant-alias-border.log.txt` fails at 918:89.
  - `tkp-2-plant-alias-feedback.log.txt` fails at 921:79.
  - Both are `AssertionError`, and the restores are byte-identical.
- Mutation: `_validation.scss` paints the valid border or the valid feedback as a literal. The twin's rest assertions still hold and the inside assertion fails.
- The case sets the border alias to green and the color alias to red (`tokens.test.ts:895`). A crossed wire, where the border reads the color alias, would also fail.

**4. CONFIRMED.**
- Scope plant (`r3/tkp-3-plant-scope.log.txt`):
  - It adds `--bs-success: var(--vn-color-success-base)` to the mode scope.
  - It fails at 948 (`readToken(island, '--bs-success')`) with `expected 'rgb(1, 2, 3)' to be 'oklch(52.7% .154 150.069)'`.
- Held plant (`r3/tkp-3-plant-held.log.txt`):
  - It adds `--vn-color-primary-base: inherit` to the mode scope.
  - It fails at 957 (`readToken(held, '--bs-primary')`).
- Both restores read `restored-byte-identical` and `src-diffstat-lines=0`.
- The `finally` block at 958–962 removes all three document-element overrides.
- Pre-override readings are checked against the override values at 944–946, so a hold cannot pass by coincidence.
- Mutations named: mode scope re-declares a root-only alias → the island hold breaks. Mode scope stops re-declaring the token → the held-island assertion breaks. The assertions distinguish both.

**5. BROKEN.**

Most of the item-by-item checks hold:
- The mode-scope item's families match `r3/tkp-2-probe-scopes.log.txt` line 3. That includes `--bs-btn-close-filter` and `--bs-carousel-*` (`_mixins.scss` around lines 531–534).
- The root-only item matches line 1 and `_tokens.scss` around lines 496–568. That includes `--bs-gradient` (around 538) and `--bs-focus-ring-width` and `-opacity` (around 562–563).
- The `:root` item's exception is executed by the held plant.
- The alias item is executed by the alias case.

The fourth item fails as a statement to a developer about the built cascade:
- `guides/veneer.md:7377-7379` reads "An override on any other element moves only the rules that read the token directly:" followed by a list. With the colon, and with the list parallel to items 2 and 3 (which claim 5 says are complete), a reader takes that list as every direct reader. It is not.
- Other rules read canonical tokens directly:
  - `_button.scss:25` declares `--bs-btn-border-radius: var(--vn-radius-base)` on `.btn`.
  - `_button.scss:28` puts `var(--vn-focus-width)` and `var(--vn-focus-color)` in the button's focus shadow.
  - `_button.scss:66-70` reads `--vn-motion-feedback`.
  - `elements/_pre.scss:12-13` reads `--vn-border-color` and `--vn-radius-base`.
  - The spacing and size tokens are read throughout `elements/` and `components/`.
- The failing state is `<div style="--vn-radius-base: 20px"><button class="btn">…</button><pre>…</pre></div>`. The button's radius and the `pre` block's radius follow the override. Neither is named in the fourth item.
- Put `data-bs-theme="light"` on that `div` and they still move. That contradicts the third item (`guides/veneer.md:7372-7376`), which says "the radii" and "the focus ring width" keep their `:root` value under a `[data-bs-theme]` override. That is true of the `--bs-*` aliases, but a developer sees `.btn` round and its ring thicken.
- This is a derivation from source. It rests on a mechanism the file already executes: `--bs-btn-disabled-opacity: var(--vn-button-opacity)` is declared on `.btn` at `_button.scss:47`, the same shape as line 25, and the case at `tokens.test.ts:1041` proves that shape moves under a plain ancestor.
- Settling probe: mount the state above plus a twin outside, and read the `border-top-left-radius` property on each. Repeat with `data-bs-theme="light"` on the ancestor.
- Origin: the enumeration is the Orchestrator's own wording in `token-proofs-brief-3.md` step 2. It is not in D51a, and `token-proofs-report-3.md` does not list it among its wording beyond D51a. The source does not support it as a complete list.

Required change at `guides/veneer.md:7362-7381`: separate the two axes the list mixes.
- Placement governs tiers and aliases only:
  - `:root` → every derived tier and alias, except inside a mode scope when the token is one whose value the mode changes. Link § Color modes, which states that rule at around line 3802.
  - `[data-bs-theme]` → the mode-scope families.
  - Any other element → no tier and no alias.
- State two rules that hold for every placement:
  - A rule that reads the token itself follows it wherever you declare it. Examples: the link, button, heading, `pre`, and focus-ring rules. Present these as examples, not as a closed list.
  - A rule that reads a `--bs-*` alias follows that alias wherever you set it.
- Recast the third item's subject as "the aliases only `:root` declares" rather than "a second `:root` block". Say that these aliases hold under a mode-scope override while a rule reading the token directly still moves.
- The lead-in "what an override moves from each placement" does not fit the third and fifth items, which are not placements. The restructure removes that mismatch.
- The executed proofs already cover this shape, so no test changes.

**6. CONFIRMED.**
- The mapping holds as claimed:
  - `:root` item and held-island exception → 956–957.
  - Root-only item → 948–949.
  - Mode-scope primary fill → 947.
  - Form pair → 837.
  - Any-other-element list → the round-1 cases at 694, 716, 747, 964, 991, 1019, 1041, 1053, and 1065.
  - Alias item → 893.
- Mutations named:
  - Mode scope re-declares `--bs-success` → 948 breaks (executed).
  - Validation reads `--vn-form-*` directly → 878 breaks (executed).
  - A listed consumer stops reading its token → the round-1 plants break (round 1, confirmed).
- The families not exercised by an override case are still pinned by membership. The case at `tokens.test.ts:143` compares the dark scope's `--bs-*` set to `BOOTSTRAP_DARK_VARIABLES` plus `THEME_DARK_ADDITIONS`. Moving `--bs-gradient` into, or `--bs-btn-close-filter` out of, the mode scope would break it.

**7. CONFIRMED on the instrument logs.**
- `r3/tkp-3-check.log.txt` and `r3/tkp-3-lint-check.log.txt` read `exit=0`.
- `r3/tkp-3-oxfmt.log.txt` reads both files `OK` and `unchanged-exit=0`.
- `r3/tkp-3-tokens.log.txt` reads `Tests 46 passed (46)` and `exit=0`. The `exit=$?` in `tkp-3-gates.sh` sits inside the braces before the `grep -v` pipe, so it reports vitest's status.
- `r3/tkp-3-test-guides.log.txt` and `r3/tkp-3-test-policy.log.txt` read `exit=0`, the latter with `109 passed | 1 skipped (110)`.
- The writer's own gate script produced these logs. The authoritative run belongs to `verifier`.

**8. BROKEN.** Scope, the non-negotiables, the reading discipline, and the case titles all hold:
- `tkp-3-status.txt` names only the two files, and every plant log ends `src-diffstat-lines=0`.
- The added code has no `any`, no `as`, no `!`, no suppression, no nested function, no hidden helper, and no mock.
- Every rest literal passes against the built cascade, and the scope case reads its baselines.

The writing sub-claim fails:
- `.claude/rules/writing.md` § Code tokens requires a code token to be followed by a noun, and a selector takes one. The guide elsewhere writes "the `:root` selector" (around lines 3795–3810).
- The bare selector appears at `guides/veneer.md:7365` ("An override on `:root` moves") and `guides/veneer.md:7372` ("follow only an override on `:root`").
- Required change: write "an override in a `:root` rule", or an equivalent that follows the token with a noun, at both sites.
- The rest of § Customization has no banned term (the "declares once" hit is the permitted sense, meaning a single time) and no count, and its actors are components or the developer.

## Findings outside the claims

**F-OVERRIDE-HEADER (BROKEN standard).**
- `tests/src/styles/tokens.test.ts:683-685` states: "Each override case sets one token on an ancestor and reads a shipped consumer inside it beside a twin outside it. The twin is read first…" This is false for three cases in the block:
  - The case at 837 sets two tokens and has no twin outside.
  - The case at 893 sets two `--bs-*` aliases, not a token.
  - The case at 927 sets three tokens, reads aliases rather than a shipped consumer, and has no twin.
- `tokens.test.ts:923-924` names the two alias sets as "the first set and not the second". `AGENTS.md` § Writing forbids naming an item by its position.
- Why it matters: the block header is the reader's map of what the proofs establish. After round 3 it describes only the round-1 shape.
- Right looks like:
  - Scope the header's first two sentences to the consumer cases ("Each consumer case sets a token on a plain ancestor…").
  - Keep the placement sentence.
  - Add one clause saying the scope case reads the published `--bs-*` aliases directly.
  - Rewrite 923–924 as "so a mode-scope override reaches the mode aliases and not the root-only ones".

## Attacked and held

- **Claim 4, against the tenet.** I checked whether reading `--bs-primary` through `readToken` is the "generated value alone" that `ROADMAP.md` line 45 bars. It holds:
  - The `--bs-*` aliases are the published Bootstrap contract (D7), and any consumer rule reads exactly that computed value.
  - § Customization says "against a shipped consumer or alias", which is honest about it.
- **Claim 4, the title.** It says "the token" beside three tokens, and it states the held-island hold only by contrast ("outside a mode scope"). This is readable, so I did not rule it.
- **Claim 2, simplification.** The mode half of the placement case at 837 re-asserts what the cases at 780 and 810 assert. The plain half also reads the rest value, which is what their twins read. This is a simplification candidate, not a defect.
- **Claim 5, wording beyond D51a.** Each named addition is supported by the source:
  - The close button and carousel values: `_mixins.scss` around lines 531–534.
  - The gradient: `_tokens.scss` around line 538.
  - The island exception: the held plant.
- **Claim 5, adjacent wording.** "The body, emphasis, … colors and backgrounds" reads as if an emphasis background exists, and none does. That wording is D51a's own. "The fonts" stretches to cover `--bs-body-line-height`. Neither is ruled.

VERDICT: FAIL 5, 8; outside the claims: F-OVERRIDE-HEADER
