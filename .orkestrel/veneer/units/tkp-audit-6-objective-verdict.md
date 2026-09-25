# TOKEN-PROOFS audit round 6 — objective verdict

`analyst` on GPT-6 Astra, `codex exec --sandbox read-only`, thread `01a0d745-da7b-7280-a49c-dbe614d14c59`, journal `tmp/codex/tkp-audit-6-analyst.jsonl`, exit 0. The final message follows verbatim.

1. **CONFIRMED.** The wording matches Items 1–5 after whitespace normalization at `guides/veneer.md:7367`, `guides/veneer.md:7370`, `guides/veneer.md:7379`, `tests/src/styles/tokens.test.ts:689`, and `tests/src/styles/tokens.test.ts:957`. The mismatch attack found no changed words. The [round delta](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-delta.diff:1) contains those replacements and the prescribed title, assertions, and cleanup. The retained full diff matches the live diff.

2. **BROKEN.** The universal claim still exceeds the prose’s valid scope. These counterexamples follow from the compiled declarations in `dist/src/styles/index.css:1`; they are cascade derivations, not fresh browser measurements.

   At `tests/src/styles/tokens.test.ts:688`, “not from a plain ancestor” omits the root exception. A root without `data-bs-theme`, carrying `--vn-form-valid: rgb(200, 30, 40)`, changes its `--bs-form-valid-color` alias and the validation paint outside nested mode scopes. The alias resolves on that root through `src/styles/_mixins.scss:526`.

   At `tests/src/styles/tokens.test.ts:956`, “a mode-scope override reaches the mode aliases and not the root-only ones” also omits the root exception. On `<html data-bs-theme="light">`, overriding `--vn-radius-base: 20px` changes the root-only `--bs-border-radius` alias. Its declaration is at `src/styles/_tokens.scss:549`; the passing assertion at `tests/src/styles/tokens.test.ts:1001` contradicts the unrestricted comment.

   At `guides/veneer.md:3804`, “keeps one value in every scope,” and at `guides/veneer.md:3808`, “with the value the `:root` selector gives them,” confuse declarations with resolved values. Set `--vn-text-heading: blue` on the root and `--vn-text-heading: red` on a descendant containing a light or dark scope. The root’s `--bs-heading-color` resolves to blue; the nested scope’s resolves to red because `src/styles/_mixins.scss:516` redeclares the alias against the inherited token. The descendant can be plain or carry a mode. Normal unlayered rules and inline declarations produce the same distinction.

   **Smallest fix:** qualify the comments’ plain ancestors and mode scopes as below the root. Describe the Color modes values as defaults, and distinguish repeated expressions from their resolved values. Preserve the shipped cascade.

3. **CONFIRMED.** The assertions at `tests/src/styles/tokens.test.ts:1002` distinguish a live primary alias from a fixed light literal. The mutation adds `:root[data-bs-theme] { --bs-primary: oklch(48% .255 264) }`. The [plant log](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-plant-root-primary.log.txt:52) records an `AssertionError` at line 1004, after the earlier assertions held. The [restored run](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-vitest.log.txt:33) passes. The theme file matches baseline bytes, and the `finally` block at `tests/src/styles/tokens.test.ts:1006` removes the attribute and overridden properties.

4. **CONFIRMED.** Comparing the title at `tests/src/styles/tokens.test.ts:960` with the assertions found no missing scenario: descendant-mode overrides, document-root overrides, and mode-bearing document-root overrides are named. The fixed-primary mutation distinguishes the final scenario at line 1004, as the plant log records. The title’s descendant-mode scenario describes the fixture actually asserted; the unrestricted comment is covered by claim 2.

5. **UNRESOLVED.** The retained logs record exit 0 for [check](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-check.log.txt:29), [lint](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-lint.log.txt:5), [styles build](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-buildstyles.log.txt:20), [tokens](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-vitest.log.txt:37), and [guides](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-guides.log.txt:15). Tokens reports 46 passed; [policy](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-policy.log.txt:11) reports 109 passed and 1 skipped. The [formatter log](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/r7/tkp-7-oxfmt-check.log.txt:1) reports correct formatting but contains no exit code. A retained command result recording that exit status would settle the remaining claim.

Outside the claims: none.

Attacked and held: the relative stop in § Customization correctly distinguishes an overriding element from a nested scope. Across root, mode-bearing root, descendant mode, and plain descendant placements, inline and unlayered overrides win locally. Nested mode declarations reset primary and validation aliases; root-only aliases inherit already-resolved values. Redeclaring an expression can preserve an inherited override, as the heading counterexample demonstrates.

VERDICT: FAIL 2, 5; outside the claims: none
