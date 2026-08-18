1. **CONFIRMED** — Attacked every member/messageId branch, both receiver names, and computed literals. The shared AST paths map each listed member correctly; renamed aliases remain the documented boundary.

2. **CONFIRMED** — Attacked recorder calls, `#` fields, `registry.mock`, unlisted `vi` members, literals containing rule examples, and the plugin source. None reaches either reporter.

3. **BROKEN** — Add an override disabling `policy/no-mocking` for `src/**/*.ts`. RuleTester still drives the imported rule directly, while the real-binary fixtures live outside `src`; the config project remains green although source enforcement is disabled. Add an override audit or representative filename controls covering every enforced population.

4. **BROKEN** — `POLICY_SUPPRESSION_GLOB` scans root `js`, `ts`, and module variants but omits root `.jsx`, `.tsx`, and `.vue`, which Oxlint accepts. A root `control.tsx` carrying a disable directive escapes the sweep. Include every supported root code extension and pin the boundary with a root-file control.

5. **CONFIRMED** — Attacked control firing, population membership, the documentation exclusion, and self-matching. The suppression control fires, the excluded control stays silent, and token composition prevents the instrument from reporting its own definitions.

6. **CONFIRMED** — Attacked each U1 amendment against the landed configuration and rule ownership. The three-leaf, instrument split, visitor exception, accessibility, `as const`, and sweep statements match the implementation without duplicating another rule’s normative home.

7. **CONFIRMED** — Attacked dependency and import drift. Baseline and current manifest hashes match byte-for-byte, and `configs/policy.ts` contains no import.

8. **BROKEN** — `configs/policy.ts` mixes interfaces, constants, free functions, and the plugin object although architecture applies to `configs/**/*.ts` and grants no self-contained-plugin exception. The fix’s widening also stranded exported `PolicyCall` and `PolicyClassMember` with no consumer. Remove the stale types and either centralize by kind or add the narrow explicit exception required by the zero-import plugin design.

9. **CONFIRMED** — Attacked every changed vendored path and the new assertions. `configs/policy.ts` is registered, all other changed vendored files were already covered, and new tests compare rule IDs or messageIds rather than diagnostic prose.

10. **BROKEN** — Shipping would propagate an override-blind wiring proof, an incomplete suppression population, and an undocumented placement exception to every fleet target. Close claims 3, 4, and 8 and run the successor audit before release.

Findings outside the claims: none.

VERDICT: FAIL — 4 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims