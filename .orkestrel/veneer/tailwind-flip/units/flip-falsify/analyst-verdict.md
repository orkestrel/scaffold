1. **holds** — Attacked HEAD `473edd6`. The live relationship test compared all 192 shared utilities across 19 widths against Tailwind’s own readings. `mt-3` read 12px under the recipe and 16px under Bootstrap and raw composition; `px-8` read 32px under both Tailwind faces. Restoring Bootstrap’s withheld rule changes the asserted result. [Sheet and integration results](/home/user/veneer/tmp/units/flip-falsify/sheets.log).

2. **holds** — At 1280px, bare `h1` read `16px / 400 / 0px` under the recipe and `40px / 500 / 8px` under Bootstrap. The live preflight and value-class assertions passed; deleting `base` changed the readings and failed their equality controls.

3. **holds** — Recounted 17 shared component names. Their recipe readings matched Bootstrap across the relationship widths. The compiled recipe emitted no utility for `collapse`, `container`, `table`, or `col-1`; removing the exclusion restored the forbidden output and the assertion detected it.

4. **holds** — Recounted 1,833 exclusions and 192 shared utilities. The exclusion equals the registry minus shared utilities, follows the tokens, and occupies 23,585 bytes. Source and comparison-record equality passed. This particular conformance case lacks its own mutation control, addressed in claim 43.

5. **holds** — Real Tailwind compilation rejected `@apply collapse` and accepted `@apply mt-3`. The paired inputs distinguish excluded component names from retained utilities. [Conformance results](/home/user/veneer/tmp/units/flip-falsify/conformance.log).

6. **holds** — The built tuned sheet contains Bootstrap-derived output and the exclusion directive, with no Tailwind-generated `base`, `utilities`, `properties`, or `@property` output. CSSOM drops `@source`. Standalone tuned CSS gave `mt-3` no margin; the consumer compile supplied its 12px utility.

7. **holds** — Both recipe records contain the prescribed three-line input. Live compilation places `@layer properties;` before the literal shared order. The conformance ordering assertions passed and distinguish reversed imports and omitted ordering.

8. **holds** — Bootstrap’s built SHA-256 is `7932f7a573bbacf39081c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` **with correction:** the complete measured digest is `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`, matching the claim. `git diff d0603b4..HEAD -- package.json` is empty.

9. **holds** — The drop-in compile, serialized with the Sass CLI’s terminating newline, hashes to `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7`. The saved before, after, and formatted outputs match those bytes. The API string without that newline has a different digest.

10. **holds** — All five switches default to empty lists/maps or `false`; the Tailwind face configures them through `_tokens.scss`. The guide names all five. The default Bootstrap Sass compile equals the built sheet after removing its Vite marker.

11. **holds** — `_tokens.scss:17` rejects `$reset: true` with `$layered: false`. The public barrel forwards only `$layered`. The setup test executed the invalid configuration and matched its error.

12. **refuted** — The entry order and removal of the face’s `_reset.scss` are correct, but [src/tailwindcss/_mixins.scss:1](/home/user/veneer/src/tailwindcss/_mixins.scss:1) remains as one comment. The import graph contains no load of it. Under the appended ruling, this is dead content.

13. **holds** — Native CSSOM recount: 75 lifted reboot rules, 73 tuned reset rules, with `[hidden]` and the datalist important rule excluded. The derivation test preserves their order and detects planted output. [Independent recount](/home/user/veneer/tmp/units/flip-falsify/probes.log).

14. **holds** — Recounted 72 curated copies and seven scoped copies. The complete derivation assertions passed. A planted rule, restored `.mt-3`, and a selector missing a curated class each produced the expected rejection.

15. **holds** — Recounted 199 withheld exact-name rules: 192 unlayered important rules and seven layered normal opacity rules. The full sequence comparison preserves infixed, print, state, and non-shared rules; restoring `.mt-3` is detected.

16. **holds** — Tuned CSS omits Bootstrap’s important `[hidden]` rule. Recipe preflight hides `hidden.d-flex`; `hidden="until-found"` retains its separate behavior and reads `flex` with `d-flex`. The live integration case distinguished these branches.

17. **holds** — CSSOM contains exactly one datalist indicator rule, unlayered and important, with no curated duplicate. The independent recount and derivation equality both passed.

18. **holds** — `curate` requires normal declarations and rejects the restricted `:not([class])` compound. CSSOM contains no such copy. A forbidden extra copy would change the derivation sequence and fail equality.

19. **holds** — Every important declaration is unlayered; normal declarations belong to `reset` or `bootstrap`. Placement assertions passed. Moving an important declaration into a layer would fail the predicate; the case does not execute that mutation itself.

20. **holds** — The source and built tuned sheets match after one Sass round trip and marker removal. The actual case is [tests/setup.test.ts:63](/home/user/veneer/tests/setup.test.ts:63), rather than the brief’s conformance location. Its appended-rule control distinguishes changed output.

21. **holds** — Recounted 8,568 statements with the measured rewrites: one dropstart merge, 215 empty Bootstrap blocks, one empty reset block, the consumed exclusion, 46 joined Bootstrap blocks, 888 joined media blocks, and the additional adjacent scoped-`th` merge. Ordered equality passed; a planted statement failed its control.

22. **holds** — The live CSSOM sequence differs by exactly the specified dropstart `display: inline-block` row. Ordered, multiplicity-preserving equality passed after that single omission; the planted-row control was detected.

23. **holds** — Recounted 46 guide rows: 30 reboot, ten restore, six scoped. They equal the Sass lists/maps. The source-binding and parser cases rejected planted, removed, duplicate, and malformed rows.

24. **holds** — All 46 witness rows matched Bootstrap under the recipe. Removing each row’s repair changed its asserted reading. Every matched witness element was read, and empty witness populations were rejected.

25. **refuted** — [guides/veneer.md:1457](/home/user/veneer/guides/veneer.md:1457) and [1459](/home/user/veneer/guides/veneer.md:1459) give `thead` and `tfoot` only a plain witness. Neither includes the claimed adjacent hazard element. The other four scoped rows include plain and hazard contexts.

26. **holds** — Scoped selectors have specificity `(0,0,1)`, occur in `bootstrap` after restores and before components, and preserve variant/divider precedence. The live witness comparisons passed; the stronger-selector control was rejected.

27. **holds** — Recounted 79 copies and 138 equal specificity pairs. CDP readings confirmed original specificity and placement before components. The stronger scoped selector and late-copy controls both failed the invariant.

28. **holds** — The Sass curation, restore, and scoped maps contain the stated fold dispositions. The forbidden reboot entries and removed restore properties are absent. The source-binding test detects additions or deletions.

29. **holds** — The committed border-width witnesses passed. An additional shipped-page reading covered 87 matching elements under Bootstrap and the recipe, in both themes: all four border widths were zero throughout. [Trim readings](/home/user/veneer/tmp/units/flip-falsify/readings-3.log).

30. **holds** — Bare `p` and `h2` inside `.card-body` retained preflight’s zero margin; `p.card-text` read 16px and its last-child form zero. `h5.modal-title` read 20px/500 under all three faces. Removing curation changes the classed witnesses.

31. **holds** — `.h1`–`.h6` preserved their class typography on headings, paragraphs, divs, and spans; `h1.h1` read 40px. `.small` retained its relative size and `.mark` its marking background. Bare heading properties not declared by those classes still follow preflight, as intended.

32. **holds** — The record contains Chromium major 141 and 2,595 rows. Chromium 141 reproduced the live record and recipe readings. Planted `div`, deleted-row, and deleted-`base` controls were detected. The portability helper’s skip restrictions and rejection controls also passed.

33. **holds** — The writer reads `readChromiumMajor()` into the record; it does not substitute a literal field value. `isPreflightRecord` rejects missing, nonnumeric, nonpositive, and nonintegral majors. The guard and browser-major tests passed. The tracked record writer was not executed.

34. **holds** — Live `[built, unexcluded]` readings reproduced 1,870 incompatible rows. Historical comparison found 760 removed and 304 added rows, confined to `border`, `border-0` through `border-5`, and physical/logical border-style longhands. Planted and removed record controls failed equality.

35. **holds** — The value-class case passed its inherited/current-color, absolute, reboot-only, and heading-ratio assertions. Deleting `base` or `reset` changed the corresponding expected readings, and both controls were distinguished.

36. **holds** — Recipe-only `mt-3` read 12px; adding the Bootstrap export changed it to 16px. Both the committed misuse test and the independent served-page probe reproduced that difference.

37. **holds** — Reversing raw sheet order changed neither the complete shared-name readings nor derived incompatible deltas across 209 names and 19 widths. All 2,595 preflight witness readings also remained equal. The independent probe asserted these equalities directly.

38. **holds** — A later unlayered important `.mt-3` override read 32px. The thumbnail test changed `max-width` from 100% to 50% with an unlayered consumer rule and returned to 100% after removing it.

39. **holds** — Fresh compilation measured `mt-3!` at 12px under both Tailwind compositions, dark background at black, and recipe `w-100`/`top-50`/`start-100` at 400/200/400px. The guide states the first-order-statement limit. Conformance verifies that excluded `bg-primary` produces no Tailwind utility despite the consumer theme token.

40. **holds** — `collectUtilityClasses` admits selectors only inside `utilities`, including nested conditions. Both committed recipe records match fresh compilation and the tuned-sheet digest; both historical `unexcluded` strings are byte-identical. The helper’s removed-layer control empties its census.

41. **holds** — Scaffold’s coding contract contains the cross-face Sass exception. The Tailwind face’s cross-face imports are configured Bootstrap Sass partials; its TypeScript imports no other face.

42. **holds** — Scaffold’s styles rule contains the derived-build clause. The guide names `$reset`, its reset-layer ownership, and its rejection without layered output.

43. **refuted** — Not every amended case has a planted or removed control. Examples are [tests/src/tailwindcss/index.test.ts:37](/home/user/veneer/tests/src/tailwindcss/index.test.ts:37), [tests/conformance.test.ts:1234](/home/user/veneer/tests/conformance.test.ts:1234), and [tests/setup.test.ts:131](/home/user/veneer/tests/setup.test.ts:131). The latter’s negative assertion against `['base']` cannot fail after its preceding exact equality passes; it mutates no input. No prohibited TypeScript construct was found in the flipped additions.

44. **refuted** — [tests/setup.test.ts:131](/home/user/veneer/tests/setup.test.ts:131) still titles the case “assigns reset and bootstrap to the tuned sheet and refuses the mirror ownership.” That violates the explicit ban on `mirror` in flipped test titles.

45. **holds** — The live header exposes `Bootstrap only`, `Tailwind without the layer`, and `Tailwind with the layer`, in order, within `Stylesheets`. The journey and independent page readings agree.

46. **holds** — Live style inventories match the three compositions. Bootstrap uses its built sheet alone; unexcluded precedes the Bootstrap style; the recipe face contains no separate Bootstrap style. The face assertions would detect a missing or additional sheet.

47. **holds** — `assertFace` reads both witnesses and distinguishes `(12px,16px)`, `(32px,16px)`, and `(32px,12px)`. Substituting either adjacent face changes at least one asserted value.

48. **holds** — Recounted nine `FACE_SCENARIOS`, covering every starting face/button pair. The header statechart passed in all four variants. Each transition asserts the resulting face through styles, pressed state, and witnesses.

49. **holds** — All 23 readings matched at 1280px and 390px under every face on both the built application and standalone shipped HTML. Alignment read `left` under all three faces at 768px. [Live readings](/home/user/veneer/tmp/units/flip-falsify/readings.json).

50. **refuted** — As written, this exceeds the implemented proof. [tests/app/browser/integration.test.ts:1058](/home/user/veneer/tests/app/browser/integration.test.ts:1058) selects only `light-1280`, then reads both widths and only shared-name elements. It proves declared winners with exclusions, not exhaustive departure kinds, nonempty kinds, and box preservation in four variants. Later §12 rulings explicitly authorize this narrower proof. Its actual run covered 1,665 signatures representing 8,112 elements, with zero violations and successful mutation controls.

51. **refuted** — [guides/veneer.md:1924](/home/user/veneer/guides/veneer.md:1924) documents the revised winner proof and its skipped resolved values; it does not name the old attribution categories as candidate causes. This follows the later scope ruling. The separate specificity and curation proofs do establish that the scoped hazard is gone.

52. **holds** — J4 passed in all four variants, selected each face through its buttons, checked the readings, and returned to Bootstrap. Paired engine-state comparisons also passed. They explicitly preserve the accepted middle-face collapse-visibility departure.

53. **holds** — At 390px, all three buttons have top `78.875px`. The group is 366px wide, spans x=12 through x=378, and remains within the viewport. No button wraps onto another row.

54. **refuted** — Literal before/after computed equality is false. The fresh chrome probe measured 1,232 longhand changes at each width: 308 each for column `display`, figure `flex-grow`, `min-height`, and `min-block-size`. It found zero box changes and zero forbidden chrome classes. These four changes are explicitly permitted by the showcase brief; the implementation satisfies that narrower contract. [Chrome evidence](/home/user/veneer/tmp/units/flip-falsify/out/p4.json).

55. **holds** — All 23 rendered caption strings match the copy document after whitespace normalization, including its collapsed equal-face forms. The associated live readings agree at the specified widths. The comparison found no missing caption.

56. **holds** — The reported-overrun alternative holds. U8 records exit 1 at 477 seconds. This audit’s four-variant run took 495.764 seconds wall time: 86 passed, three failed, three skipped. The three failures—J8, tooltip refusal, and collapse Enter burst—passed on isolated retry. The full run was not green. [Full run](/home/user/veneer/tmp/units/flip-falsify/journey.log), [J8 retry](/home/user/veneer/tmp/units/flip-falsify/journey-j8.log), [statechart retries](/home/user/veneer/tmp/units/flip-falsify/journey-retry.log).

57. **refuted** — The required Tailwind contract prose, `w-full` guidance, and prohibition on linking Bootstrap beside the recipe are present. Of 95 scoped backticked case references, one does not resolve: [guides/veneer.md:1869](/home/user/veneer/guides/veneer.md:1869), `keeps every fixed text color readable in the %s color mode`. This reference predates the flip; it still falsifies the universal title-resolution claim.

**Findings ranked by severity**

- **F1 — Medium; claim 43.** [tests/setup.test.ts:131](/home/user/veneer/tests/setup.test.ts:131), [tests/src/tailwindcss/index.test.ts:37](/home/user/veneer/tests/src/tailwindcss/index.test.ts:37), and [tests/conformance.test.ts:1234](/home/user/veneer/tests/conformance.test.ts:1234) lack the claimed executable mutation controls. The ownership case adds a logically redundant negative assertion. Right looks like each claimed proof running a concrete altered input through its actual assertion and distinguishing the resulting failure.

- **F2 — Medium; claim 25.** [guides/veneer.md:1457](/home/user/veneer/guides/veneer.md:1457) and [1459](/home/user/veneer/guides/veneer.md:1459) omit hazard witnesses for `thead` and `tfoot`. Right looks like both rows containing plain and variant-bearing subjects, with equality read across every match and removal exposed by the plain subject.

- **F3 — Low; claim 12.** [src/tailwindcss/_mixins.scss:1](/home/user/veneer/src/tailwindcss/_mixins.scss:1) is unimported, comment-only content. Right looks like the file being absent, as the appended ruling specifies.

- **F4 — Low; claim 44.** [tests/setup.test.ts:131](/home/user/veneer/tests/setup.test.ts:131) retains prohibited vocabulary. Right looks like a title describing reset and Bootstrap ownership without the retired term.

- **F5 — Low; claim 57.** [guides/veneer.md:1869](/home/user/veneer/guides/veneer.md:1869) cites a nonexistent case. Right looks like a reference to the actual contrast proof with a description matching that proof’s scope.

- **F6 — Low; claims 50–51.** [tests/app/browser/integration.test.ts:1058](/home/user/veneer/tests/app/browser/integration.test.ts:1058) and [guides/veneer.md:1924](/home/user/veneer/guides/veneer.md:1924) implement the accepted revised scope, while the audit claims retain the superseded exhaustive attribution contract. Right looks like claims describing the default-variant, two-width winner proof, its counted exclusions, and the separate curation proofs. No implementation regression was established.

- **F7 — Low; claim 54.** [Chrome readings](/home/user/veneer/tmp/units/flip-falsify/out/p4.json) falsify unrestricted computed equality while satisfying the permitted four-property change set. Right looks like the claim requiring zero box changes and no longhand changes outside those four permitted kinds.

**Attacked and held**

The sheet/integration run passed 60 tests; focused recipe conformance passed ten; helper and independent probes passed 93. Bootstrap and drop-in output remained byte-identical to their specified digests.

The middle face’s collapsed panels, the recipe’s hidden-element behavior, standalone tuned CSS lacking withheld utilities, and the 768px container widths are intended consequences of their respective contracts. The latter widths differ from the 1280px reading constants; the claimed 768px alignment remains correct.

All three full-run journey failures passed isolated retries. The recorded host limitations remain explicit; no green full-suite result is asserted.

All audit writes remained under `tmp/units/flip-falsify/`. No fix, rebuild, install, record write, or commit was applied. Final HEAD remained `473edd6`; `git status --porcelain` was empty.

VERDICT: FAIL 12, 25, 43, 44, 50, 51, 54, 57; outside the claims: none