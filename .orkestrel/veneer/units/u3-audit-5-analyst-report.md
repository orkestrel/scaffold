The objective audit requires a fix round. The listed selector readings pass, but claim 1’s exclusive-tokenizer condition does not hold.

The numbered verdicts follow the claims file.

1. **REFUTED — One tokenizer.** [tests/setupStyles.ts:913](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:913) still scans selector text with `/:(?:is|where)$/u.test(compound.slice(0, step.index))`. This is outside `walkSelector` and is not the claim’s permitted leading-identifier match. The walker, reader TSDoc links, named readings, and their controls otherwise hold. I executed the live selector functions and the selector assertions from `setupStyles.test.ts` in memory. Disabling the walker’s escaped-character flag made the `h1\+p` control fail: the normalizer returned `h1\ + p`.

2. **CONFIRMED — The tables.** The table introductions appear at [guides/veneer.md:174](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:174), :200, :211, :224, and :242. The remaining token tables retain their introductory prose. The Methods table’s introduction is at :32, preceding its interface heading; that table is not bare.

3. **CONFIRMED — The `role-each` ruling.** [src/styles/_mixins.scss:29](C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:29) records the retention reason and names `theme-tokens`. Its shipped include is at :70. The fixture includes it at [tests/src/styles/fixtures/mixins.scss:32](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/fixtures/mixins.scss:32), and [mixins.test.ts:76](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/mixins.test.ts:76) checks the painted tiers against independently specified mixes.

4. **CONFIRMED — The header.** [tests/setupConformance.ts:2](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:2) names `conformance`, `setup`, and the actual importers. [vite.config.ts:297](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:297) selects the setup proofs and excludes `setupBrowser.test.ts`; :347 selects `conformance.test.ts`. The named files import the module.

5. **CONFIRMED — The paragraph.** The declaration and its proof limit appear in Showcase’s baseline paragraph at [guides/veneer.md:373](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:373). Reference map’s motion subsection contains token documentation and no `interpolate-size` paragraph.

6. **CONFIRMED — The map join.** The guard at [src/styles/_theme.scss:22](C:/Users/mikes/WebstormProjects/veneer/src/styles/_theme.scss:22) produced this error with the asset entry planted only in memory: `"tokens.$assets names absent-probe, which tokens.$dark does not declare."` Removing the guard in memory let that input compile. With ordinary inputs, guarded and unguarded compilation produced identical CSS. The built `dist/src/styles/index.css` also equals `tmp/u3/index-before-8.css` byte-for-byte. Its SHA-256 is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`; an altered-buffer control failed equality.

7. **CONFIRMED — Law over the diff.** TypeScript AST inspection over the rendered patch’s TypeScript files found no prohibited assertions, `any`, nested function declarations or assignments, hidden declarations, or mutable interface properties. The brief-8 declarations use exported setup infrastructure and readonly shapes. The added-prose sweep covered the patch’s Markdown, comments, and case names using the writing substitutions and tally/time terms, including `both|two|three|four|five|six|seven|several|multiple|currently|now|new|latest|soon|once|since|above|below`. The hits describe fixed arity, explicitly named members, execution frequency, or numerical direction. None establishes a prohibited prose tally or time claim.

8. **CONFIRMED — Scope honesty.** [u3-status-5.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-status-5.txt) contains the owned paths and integrated patch sites. The grants are in [brief 4:116](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-4.md:116), [brief 5:41](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-5.md:41), [brief 7:22](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-7.md:22), and [brief 8:24](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-8.md:24). The rendered patch’s changes since the preceding audit are confined to brief 8’s sites.

9. **UNDECIDABLE — Gates.** No round-5 verifier report was present in the retained records. [u3-gate-report-4.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-gate-report-4.md) concerns the preceding tree. Report 6 supplies the writer’s gate results and explicitly leaves distribution to the Orchestrator. The Orchestrator must settle this claim from the current verifier evidence. I ran no gate that writes.

The following findings fit outside the numbered claims.

10. **Incomplete tag recognition can misclassify the cascade.** At [tests/setupStyles.ts:909](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:909), the leading match truncates `details-card` to `details`. Consequently, `matchesLooseTagPair('details-card summary')` returns `false`, incorrectly granting the mandated `details`/`summary` exception. It also reads `detai\ls` as `detai`, so `detai\ls summary` incorrectly returns `true`. The installed Lightning CSS compiler independently normalizes that escaped identifier to `details`. The functional-name check at :913 also ignores `:IS(h1)`, which Lightning CSS normalizes to `:is(h1)`. These errors reach the cascade assertion at [tests/src/styles/index.test.ts:26](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/index.test.ts:26). Repair identifier recognition without changing the existing list, negation, or mandated-containment readings.

11. **The asset guard lacks a retained regression assertion.** [Report 6:273](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-report-6.md:273) records a temporary plant, but no test under `tests/` asserts the missing-key rejection. The suite’s Sass compilation reads ordinary files for import closure; it does not supply the missing-key input. Removing the guard therefore loses its rejection without invalidating ordinary compilation. [.claude/rules/quality.md:76](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md:76) requires promoting the settling instrument into a test. Retain the missing-key assertion with the ordinary-input control.

The additional selector attacks returned the following results. Strings and arrays use JSON notation so escaped characters and trailing spaces remain distinguishable.

| Reader | Input | Required result | Actual result |
|---|---|---|---|
| `normalizeComplexSelector` | `"h1[title=\"a>+~,  b\"]~p"` | `"h1[title=\"a>+~,  b\"] ~ p"` | Required result |
| `matchesLooseTagPair` | `":is([title='a\\' ),>+ '], :where(h1,[title=\"x\"]))+p"` | `true` | `true` |
| `splitTopLevelList` | `"h1\\,p, a"` | `["h1\\,p","a"]` | Required result |
| `normalizeComplexSelector` | `"h1\\\\+p"` | `"h1\\\\ + p"` | Required result |
| `splitTopLevelList` | `"h1\\ ,p"` | `["h1\\ ","p"]` to preserve the escaped identifier | `["h1\\","p"]` |
| `splitTopLevelList` | `"h1\\ x,p"` | `["h1\\ x","p"]` | Required result |
| `matchesLooseTagPair` | `"h1\\ +p"` | `true` | `true` |
| `matchesLooseTagPair` | `"h1\\ ,p"` | `false` | `false` |
| `splitTopLevelList` | `"[title=\"a,  "` | `["[title=\"a,"]` under its documented trimming contract | Required result |
| `normalizeComplexSelector` | `"[title=\"a,  "` | Unchanged | Unchanged |
| `splitTopLevelList` | `":is(h1,  "` | `[":is(h1,"]` under its documented trimming contract | Required result |
| `findGroupEnd`, opener `3` | `":is([title=\")\"],:where(h1,p))"` | `28` | `28` |
| `extractCompoundTags` | `"details-card"` | `["details-card"]` | `["details"]` |
| `matchesLooseTagPair` | `"details-card summary"` | `true` | `false` |
| `matchesLooseTagPair` | `"details summary"` | `false` | `false` |
| `extractCompoundTags` | `"detai\\ls"` | `["details"]` | `["detai"]` |
| `matchesLooseTagPair` | `"detai\\ls summary"` | `false` | `true` |
| `extractCompoundTags` | `"det\\ails"` | `["det\nils"]` under CSS escape decoding | `["det"]` |
| `matchesLooseTagPair` | `"det\\ails summary"` | `true` | `true` |
| `matchesLooseTagPair` | `":IS(h1)+p"` | `true` | `false` |
| `matchesLooseTagPair` | `":is(h1)+p"` | `true` | `true` |

The trailing escaped-space reading exposes a semantic limit at [tests/setupStyles.ts:797](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:797): unconditional trimming removes a character the walker marks literal. The splitter explicitly documents trimming, so I have not treated this boundary as an additional undocumented-behavior finding.

The walker-specific attacks also held.

| Input | Required result | Actual result |
|---|---|---|
| Empty text | Empty steps | Empty steps |
| `"\uD83D\uDE00"` | Separate UTF-16 units at indices `0` and `1`, depth `0`, nonliteral | Required result |
| `"[a='x\\'y']"` | Escaped quote stays literal; final bracket returns to depth `0` | Required result |
| `":is([title=\"(\"],:where(h1,p))"` | Quoted parenthesis opens no group; outer closer has depth `0` | Required result |
| `"\\(\\)\\[\\]"` | Every unit literal, depth `0` | Required result |
| `"]"` | Depth remains `0` | Required result |
| `"[\"x  "` | Quoted tail remains literal at depth `1` | Required result |
| `":is(h1"` | Unclosed contents remain at depth `1` | Required result |

Verdict: fix round — claim 1 and findings 10, 11; claim 9 remains undecidable pending verifier evidence.