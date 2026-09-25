1. **CONFIRMED — Verbatim.** The live diff equals the retained `tkp-4.diff`. Comparing it with `tkp-3.diff` found only the prescribed paragraph/list replacement and comment replacements. The brief’s text matches [guides/veneer.md:7359](/home/user/veneer-tkp/guides/veneer.md:7359), [tokens.test.ts:683](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:683), and [tokens.test.ts:925](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:925), including the required original indentation. The attack for an extra edit or altered replacement failed.

2. **CONFIRMED — Direct readers.** The named examples have canonical-token readers and plain-ancestor consumer assertions. The wording “rules of this kind” does not claim completeness. The mutation evidence distinguishes each tested override from its unchanged twin.

   The following log paths are relative to `/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/`.

   | Consumer and assertions | Mutation and discrimination | Retained logs read |
   | --- | --- | --- |
   | Link and link-button colors, `tokens.test.ts:709`, `:734` | Replace the canonical reads with their resting color literals. The twin assertions hold; the overridden consumer assertions fail. | `logs/tkp-plant-link-base-anchor.log.txt:38`, `logs/tkp-plant-link-base-button.log.txt:38`, `logs/tkp-plant-link-hover-anchor.log.txt:46`, `logs/tkp-plant-link-hover-button.log.txt:37` |
   | Link decoration, `tokens.test.ts:762` | Replace the decoration reads with `underline`, including the separate hover declaration. Assertions distinguish the overridden `overline` value at rest and during hover. | `logs/tkp-plant-link-decoration-anchor.log.txt:44`, `logs/tkp-plant-link-decoration-button.log.txt:37`, `r2/logs/tkp-2-plant-link-decoration-hover.log.txt:43` |
   | Button state mixes, `tokens.test.ts:978`, `:1005`, `:1033` | Freeze the hover percentage, active percentage, or mixer at its resting value. The overridden fill assertions fail after the corresponding twin holds. | `logs/tkp-plant-state-hover.log.txt:37`, `logs/tkp-plant-state-active.log.txt:38`, `logs/tkp-plant-state-mixer.log.txt:38` |
   | Disabled opacity, `tokens.test.ts:1052` | Replace the canonical read with `0.65`. The inside assertion requires `0.3` and fails. | `logs/tkp-plant-button-opacity.log.txt:44` |
   | Heading weight, `tokens.test.ts:1064` | Replace the description-term read with `600`. The inside assertion requires `800` and fails. | `logs/tkp-plant-weight-heading.log.txt:43` |
   | Standard easing, `tokens.test.ts:1076` | Replace the easing reads with `ease`. The inside assertion requires `linear` throughout and fails. | `logs/tkp-plant-ease-standard.log.txt:44` |

   The declarations are in `src/styles/elements/_a.scss:3`, `src/styles/elements/_dl.scss:11`, and `src/styles/components/_button.scss:30`, `:47`, `:64`, `:194`, and `:200`. These confirmations concern the tested placements; the broader ancestry sentence has the separate finding that follows.

3. **BROKEN — Tiers and aliases.** The statement “An override on any other element moves no tier and no alias” at [guides/veneer.md:7370](/home/user/veneer-tkp/guides/veneer.md:7370) contradicts an executed case in this block.

   The input is a plain ancestor declaring `--vn-button-opacity: 0.3` around a disabled button. The button declares `--bs-btn-disabled-opacity: var(--vn-button-opacity)` at [components/_button.scss:47](/home/user/veneer-tkp/src/styles/components/_button.scss:47) and consumes that alias at line 123. The assertion at `tokens.test.ts:1053` requires the resulting opacity to be `0.3`. The guide itself lists this property in its Alias column at `guides/veneer.md:7246`. Freezing the alias to `0.65` fails that assertion in `logs/tkp-plant-button-opacity.log.txt:44`; the restored suite passes in `r4/tkp-4-vitesttokens.log.txt:28`. Thus the passing case requires an alias to move.

   The scope and placement proofs still distinguish their intended mutations. Redeclaring the success alias in mode scopes fails in `r3/tkp-3-plant-scope.log.txt:52`; making the primary token inherit through those scopes fails in `r3/tkp-3-plant-held.log.txt:53`. The placement assertions distinguish direct canonical validation reads from inherited aliases, and frozen mode aliases from working derivations, as recorded in the `r2/logs/tkp-2-plant-placement-plain-*.log.txt` and `tkp-2-plant-placement-mode-*.log.txt` files.

   Smallest fix: limit the immobility statement to declarations on an ancestor of the override. Explicitly allow aliases declared on the overridden element or its descendants to resolve against inherited canonical values. The exclusion of literal close-button and carousel filters is correct.

4. **BROKEN — Alias readers.** The “any ancestor” promise at [guides/veneer.md:7372](/home/user/veneer-tkp/guides/veneer.md:7372) omits intervening mode scopes.

   Counterexample: take the alias case at `tokens.test.ts:895`, but place its inside control and feedback inside a nested `data-bs-theme="light"` element. Keep the alias overrides on the outer plain ancestor. The nested scope redeclares the validation aliases through [theme.scss:21](/home/user/veneer-tkp/src/styles/_theme.scss:21) and [mixins.scss:526](/home/user/veneer-tkp/src/styles/_mixins.scss:526), replacing the inherited overrides. The validation rules therefore read the mode’s values, not the outer ancestor’s red feedback and green border. The built stylesheet contains these redeclarations.

   The existing assertions distinguish frozen border and feedback readers: `r2/logs/tkp-2-plant-alias-border.log.txt:44` and `r2/logs/tkp-2-plant-alias-feedback.log.txt:44` record their failures. They do not test an intervening mode scope. This counterexample is a source-and-cascade ruling; no retained log executes that exact nested fixture.

   Smallest fix: qualify inheritance with “unless an intervening element redeclares the alias.” The existing plain-ancestor case remains valid.

5. **BROKEN — Comments.** The header at [tokens.test.ts:683](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:683) says each consumer case sets a token on a plain ancestor. The valid and invalid consumer cases instead set their canonical token on an explicit light-mode ancestor at lines 784 and 814. Those cases read shipped control and feedback consumers beside outside twins.

   Their mutations are effective: freezing the validation aliases fails the inside readings in `logs/tkp-plant-form-valid-border.log.txt:37`, `tkp-plant-form-valid-feedback.log.txt:44`, `tkp-plant-form-invalid-border.log.txt:37`, and `tkp-plant-form-invalid-feedback.log.txt:37`. The defect is the comment’s description of placement, not those assertions.

   Smallest fix: name the direct-token consumer cases as using plain ancestors and the canonical validation cases as using mode scopes. The rewritten scope comment at line 925 names the mode aliases and root-only aliases without positional references. The reduced-motion statement also matches the explicit hover and press drives.

6. **CONFIRMED — Writing.** At [guides/veneer.md:7359](/home/user/veneer-tkp/guides/veneer.md:7359), every code token has its following noun. A case-insensitive sweep of this paragraph against the substitution table, with code spans excluded and inflections checked, found no prohibited term. Manual inspection found no count or claim of exhaustive examples. The behavior sentences name the acting rule or override. These writing checks do not establish the behavioral universals ruled broken elsewhere.

7. **CONFIRMED — Gates.** The attack for missing completion, a failing exit, or an undiscovered tokens file failed. The retained logs record `exit=0` at `r4/tkp-4-check.log.txt:29`, `tkp-4-lintcheck.log.txt:5`, `tkp-4-oxfmtcheck.log.txt:5`, `tkp-4-buildstyles.log.txt:14`, `tkp-4-vitesttokens.log.txt:33`, `tkp-4-testguides.log.txt:15`, and `tkp-4-testpolicy.log.txt:15`. The tokens log reports the file passing; the policy log explicitly reports its skip. These are retained execution results, not gates rerun by this lane.

**F-DIRECT-SCOPE — BROKEN, outside the claims.** The unconditional direct-reader sentence at [guides/veneer.md:7363](/home/user/veneer-tkp/guides/veneer.md:7363) also fails across a mode boundary. Put an anchor inside a light-mode island beneath a plain ancestor declaring `--vn-link-base: rgb(200, 30, 40)`. The island redeclares that canonical token through `src/styles/_theme.scss:21` and `src/styles/_mixins.scss:479`. The anchor’s direct read at `src/styles/elements/_a.scss:3` therefore receives the island’s link color. The existing link case at `tokens.test.ts:698` has no intervening island. Its retained mutation logs establish the plain-ancestor behavior, not this unconditional ancestry promise. This finding is source-derived; no retained log executes that exact nested fixture.

Smallest fix: qualify the sentence with “unless an intervening element redeclares the token.” Preserve the passing plain-ancestor behavior.

**Attacked and held.** A root-only alias retaining its root value beneath a mode-local canonical override is correct. A component-local alias resolving against an inherited canonical override is also correct. The documentation must distinguish these declaration locations.

VERDICT: FAIL 3, 4, 5; outside the claims: F-DIRECT-SCOPE