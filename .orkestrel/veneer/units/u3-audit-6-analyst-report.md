1. **REFUTED — Identifiers and escapes.** The named readings hold, but the quoted-text boundary fails. At [setupStyles.ts:846](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:846), the reader decodes a literal backslash before checking whether it belongs to a string:

   `readIdentifier(walkSelector('[a="\\64"]'), 4)` requires `undefined`; actual result is `{ text: 'd', end: 7 }`.

   The control, `[a="d"]` at index `4`, returns `undefined`. This directly contradicts the contract at lines 833–834: “no identifier begins inside an attribute selector’s string.” The compound reader’s depth checks prevent this particular input from leaking through attribute selectors; the exported identifier reader itself remains incorrect.

   The escape terminator also uses JavaScript `\s` at [setupStyles.ts:741](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:741). It consumes U+00A0, which CSS treats as an identifier character. `det\61\u00A0ils` therefore becomes `details` instead of `deta\u00A0ils`. The normalizer and compound splitter repeat that whitespace mismatch at lines 899 and 936. See the [CSS whitespace definition](https://www.w3.org/TR/css-syntax-3/#whitespace).

   The “new readings are cases” arm is also false. The live test file contains no calls covering:

   - `matchesLooseTagPair('h1\\64 p')`
   - `matchesLooseTagPair('h1\\64x p')`
   - `extractCompoundTags('h1\\+p')`

   These readings pass when executed independently. Their absence was checked through TypeScript call expressions, including the argument values, rather than textual spelling alone.

2. **CONFIRMED — The functional name.** [setupStyles.ts:994](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:994) obtains the leading identifier and pseudo-class name through `readIdentifier`, lowercases the name, and checks the opener’s depth and literal status. `:IS(h1)+p`, `:is(h1)+p`, and escaped-name controls return `true`. The selector readers use the shared walk; the whole-scope Bootstrap predicate is the stated exception. The TSDoc records this arrangement.

3. **REFUTED as written — The guard’s test.** The behavioral arms hold. The “changes nothing else” arm does not: [tokens.scss:100](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:100) also adds the explanation beginning “The map is configurable…”. Removing that comment addition and `!default` in memory reproduces the retained token snapshot exactly. Correct the claim’s wording; the explanatory comment needs no removal.

   The case at [setupStyles.test.ts:162](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:162) compiles the shipped partials. Independent in-memory execution produced:

   | Reading | Required | Actual |
   |---|---|---|
   | `$assets: ('probe-absent': '--vn-probe')` | Error naming `probe-absent` | `"tokens.$assets names probe-absent, which tokens.$dark does not declare."` |
   | `$assets: ('select-indicator': '--vn-probe')` | Emitted image declaration | Contains `--vn-probe: url("data:image/svg+xml,` |
   | Missing-key input with guard removed in memory | Rejection assertion fails | Compilation succeeds; no error |
   | Live `_theme.scss` against `tmp/u3/theme-before-9.scss` | Identical bytes | Identical bytes |

4. **CONFIRMED — The legend sentence.** [veneer.md:93](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:93) names what the following `Source` table lists. Every table inside the Tokens section follows a sentence. This includes the legend, factors, palette, roles, tiers, reference groups, departures, and deferred names.

5. **REFUTED as written — The departures cells.** The requested size and font cells are bare keys, and their aliases appear in the sentence at [veneer.md:338](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:338). However, the claim covers the entire Token column: [veneer.md:332](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:332) still contains `` `--vn-surface-body-base` dark ``. That is a key plus a mode qualifier. Narrow the claim to the edited cells, or move the mode qualifier into the value cell.

6. **CONFIRMED — The either/or.** [veneer.md:382](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:382) reads “the first unit that animates a keyword length.” The guide names disclosure behavior and drawer surfaces elsewhere, but names neither a disclosure unit nor a drawer unit.

7. **CONFIRMED — Law over the diff.** The added TypeScript declarations contain none of the prohibited syntax or hidden module declarations named by this claim. The public shapes are readonly. Placement follows the source, setup, fixture, and mirrored-proof rules.

   The prose sweep covered added Markdown and comment lines from every path in `u3-diff-6.patch`, using case-insensitive substitution, judged-word, and tally patterns. The remaining hits describe fixed grammar, fixed argument relationships, named members, or repetition rather than temporal `once`. No prohibited hit survived review.

   The live cascade’s SHA-256 is exactly:

   `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`

8. **CONFIRMED — Scope honesty.** The supplied status matches the ownership grants: original style/core files and proofs; brief 4’s guide, README, and setup grants; brief 5’s `tests/setup.test.ts`; brief 7’s conformance additions; and the named integrated config/distribution sites. Every added line in the rendered patch matches its corresponding live file. No listed path falls outside those grants.

9. **UNDECIDABLE — Gates.** The retained independent verifier reports end at `u3-gate-report-5.md`, which covers the preceding tree. Report 7 supplies writer-reported results for this tree, but no independent round-6 verifier report was available. I ran no build, browser suite, distribution command, or other command that writes. The Orchestrator must settle this claim from the current verifier evidence.

10. **Additional finding — Functional arguments lose complex-selector structure.** At [setupStyles.ts:1008](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1008), every `:is()`/`:where()` alternative is passed directly to `extractCompoundTags`, although those alternatives can be complex selectors. See the [Selectors grammar](https://www.w3.org/TR/selectors-4/#forgiving-selector).

    Consequently, `:is(.title > h1)+p` and `:where(.title > h1)+p` require `true` and return `false`. The reader loses the `h1` after the internal combinator. `:is(details p) summary` also returns `false`, incorrectly treating the outer relationship as the permitted `details summary` pair.

    These failures survive Sass compilation in memory. The consumer at [index.test.ts:26](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/index.test.ts:26) consequently accepts these selectors. Preserve the alternative’s complex-selector relationships when evaluating it. Keep ordinary alternative lists such as `:is(h1,p)` non-pairs.

The following tables report the executed readings. Backslashes are literal selector characters; `\u00A0`, `\r`, and `\n` denote the corresponding input characters.

| Reader | Input | Required | Actual |
|---|---|---|---|
| `matchesLooseTagPair` | `details-card summary` | `true` | `true` |
| Same | `detai\ls summary` | `false` | `false` |
| Same | `det\ails summary` | `true` | `true` |
| Same | `details summary` | `false` | `false` |
| Same | `h1\64 p` | `false` | `false` |
| Same | `h1\64x p` | `true` | `true` |
| Same | `:IS(h1)+p` | `true` | `true` |
| Same | `:is(h1)+p` | `true` | `true` |
| `extractCompoundTags` | `detai\ls` | `["details"]` | `["details"]` |
| Same | `det\ails` | `["det\nils"]` | `["det\nils"]` |
| Same | `h1\64 p` | `["h1dp"]` | `["h1dp"]` |
| Same | `h1\+p` | `["h1+p"]` | `["h1+p"]` |

The additional attacks produced these results.

| Reader | Input | Required | Actual |
|---|---|---|---|
| `readIdentifier`, start `4` | `[a="\64"]` | `undefined` | `{text:"d",end:7}` |
| Same | `[a="d"]` | `undefined` | `undefined` |
| `matchesLooseTagPair` | `:i\73(h1)+p` | `true` | `true` |
| Same | `:W\48 ERE(:IS(h1),:where(p))+p` | `true` | `true` |
| Same | `\64 etails s\75 mmary` | `false` | `false` |
| Same | `DETAILS SUMMARY` | `false` | `false` |
| Same | `details_card summary` | `true` | `true` |
| Same | `details\-card summary` | `true` | `true` |
| Same | `h1[title="+ ~ > , :IS(p)"]` | `false` | `false` |
| Same | `:is([title="),>+~"],:where(h1))+p` | `true` | `true` |
| Same | `:not(:IS(h1))+p` | `false` | `false` |
| Same | `det\61\u00A0ils summary` | `true` | `false` |
| Same | `h1\u00A0p` | `false` | `true` |
| Same | `h1 p` | `true` | `true` |
| Same | `details\u00A0summary` | `false` | `false` |
| Same | `:is(.title > h1)+p` | `true` | `false` |
| Same | `:where(.title > h1)+p` | `true` | `false` |
| Same | `:is(details p) summary` | `true` | `false` |
| Same | `:is(details) summary` | `false` | `false` |
| Same | `:is(h1 p)` | `true` | `false` |
| Same | `:is(h1,p)` | `false` | `false` |
| Same | `h1\ ,p` | `false` | `false` |
| `extractCompoundTags` | `det\61\u00A0ils` | `["deta\u00A0ils"]` | `["details"]` |
| Same | `h1\ ` | `["h1 "]` | `["h1 "]` |
| Same | `\000064etails` | `["details"]` | `["details"]` |
| `normalizeComplexSelector` | `h1\u00A0p` | Unchanged | `h1 p` |
| `splitTopLevelCompounds` | `h1\u00A0p` | `["h1\u00A0p"]` | `["h1","p"]` |
| `readEscape`, start `0` | `\D800` | U+FFFD, span `5` | U+FFFD, span `5` |
| Same | `\110000` | U+FFFD, span `7` | U+FFFD, span `7` |
| Same | `\10FFFF` | U+10FFFF, span `7` | U+10FFFF, span `7` |
| Same | `\000061b` | `a`, span `7` | `a`, span `7` |

The raw CRLF attack also differs: `matchesLooseTagPair('det\\61\r\nils summary')` requires `false` under CSS input preprocessing and returns `true`; its LF control returns the required `false`. CSS normalizes CRLF before consuming escapes. Sass independently rewrites the CRLF input to `deta ils summary`, so this observation does not establish a defect reachable through the compiled cascade. See [CSS input preprocessing](https://www.w3.org/TR/css-syntax-3/#input-preprocessing).

The retained report-4–6 selector readings also held. In the following record, each arrow gives **required = actual**; quoted strings use JSON escape notation.

```text
matchesLooseTagPair:
  ":is(h1,:where(.title))+p" → true
  ":is(h1:not(.x), p) + p" → true
  "[title=':is(h1)'] + p" → false
  ":is(h1, p)" → false
  ":where(h1, p)" → false
  ":is(.title,h1)+p" → true
  "h1, p" → false
  "details + summary" → true
  ":is(h1)+:is(p)" → true
  "details > summary" → false
  "body" → false
  ":root" → false
  ":is(.title[title=\"(\"], h1)+p" → true
  ":is(.title[title=\"x\"], h1)+p" → true
  "h1[title=\"(\"], p" → false
  "h1[title=\"x\"], p" → false
  "h1\\+p" → false
  "h1+p" → true

normalizeComplexSelector:
  "h1\\+p" → "h1\\+p"
  "h1+p" → "h1 + p"
  "h1\\ p" → "h1\\ p"
  "details   >   summary" → "details > summary"
  " details summary " → "details summary"
  ":is(h1, h2)+p" → ":is(h1, h2) + p"
  ":is(h1,  p)+p" → ":is(h1,  p) + p"
  "[title=\"a  b\"] + p" → "[title=\"a  b\"] + p"
  "[title=\"a b\"] + p" → "[title=\"a b\"] + p"

splitTopLevelList:
  "h1[title=\"(\"], p" → ["h1[title=\"(\"]","p"]
  "h1[title=\"x\"], p" → ["h1[title=\"x\"]","p"]
  ".title[title=\"(\"], h1" → [".title[title=\"(\"]","h1"]
  "rgba(0, 0, 0, 0.5) 0 1px, #fff 0 2px"
    → ["rgba(0, 0, 0, 0.5) 0 1px","#fff 0 2px"]
  ":is(h1, h2) + p" → [":is(h1, h2) + p"]
  "a, , b" → ["a","b"]

splitTopLevelCompounds:
  "h1\\+p" → ["h1\\+p"]
  "h1\\ p" → ["h1\\ p"]
  "h1 p" → ["h1","p"]
  ":is(h1, p) + p" → [":is(h1, p)","+","p"]
  ".card h1 ~ p" → [".card","h1","~","p"]
  "[title='a b'] p" → ["[title='a b']","p"]
  "[title=\"a\\\" b\"] p" → ["[title=\"a\\\" b\"]","p"]
  "h1" → ["h1"]
  "  " → []

findGroupEnd:
  ":is(h1)", 3 → 6
  ":is(h1,:where(.title))", 3 → 21
  "[title=')']", 0 → 10
  "[title=\"a\\\"]\"]", 0 → 13
  ":is(h1", 3 → 6
  ":is(.title[title=\"(\"], h1)", 3 → 25

extractCompoundTags:
  "h1" → ["h1"]
  "P.lead" → ["p"]
  ":is(h1)" → ["h1"]
  ":where( p )" → ["p"]
  ":is(h1, p)" → ["h1","p"]
  ":where(h1, p)" → ["h1","p"]
  ":is(.title,h1)" → ["h1"]
  "p:is(p, .lead)" → ["p"]
  ":is(h1,:where(.title))" → ["h1"]
  ":is(h1, :where(p, .title))" → ["h1","p"]
  ":is(h1:not(.x), p)" → ["h1","p"]
  ":not(h1)" → []
  ":not(:is(h1))" → []
  ":root" → []
  ".card:hover::after" → []
  "[data-bs-theme='dark']" → []
  "[title=':is(h1)']" → []
  ":is(.title[title=\"(\"], h1)" → ["h1"]
  ":is(.title[title=\"x\"], h1)" → ["h1"]

walkSelector:
  "'a", literal flags → [true,true]
  ":is(h1)", depths → [0,0,0,0,1,1,0]
  ":is(h1", depths → [0,0,0,0,1,1]
  "[a=\"(\"]", literal flags → [false,false,false,true,true,true,false]
  "h1\\+p", literal flags → [false,false,true,true,false]
  "[a=\"\\\"]\"]", depths → [0,1,1,1,1,1,1,1,0]
```

The execution instrument extracted the live declarations through TypeScript, transpiled them in memory, and ran them without filesystem writes. Its negative control changed the pair reader to return `false`: the required `true` result for `h1+p` then failed. These results establish runtime behavior, not a typecheck or gate-chain result.

Verdict: fix round — claim 1 and finding 10 require code fixes; claims 3 and 5 require claim corrections; claim 9 remains UNDECIDABLE.