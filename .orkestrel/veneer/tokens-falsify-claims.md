# Claims: one falsify round over the token round (R11) as landed on veneer `main`

Both lanes read this one file. Line anchors were read at veneer `2f2eea1`, before unit A5 landed; A5 changed `tests/conformance.test.ts` (the palette case and the digest case), `tests/src/tailwindcss/index.test.ts` (two scratch-write sites and the derivation case's control loop), `tests/setupServer.ts` (the `contrastColor` twin and its helpers), `tests/setupServer.test.ts`, and one title in `guides/veneer.md`. In those files re-resolve every anchor by the quoted text at the subject commit 3f8a870; elsewhere the anchors hold. An anchor that no longer resolves is a note in the verdict, never a finding by itself.

Rule for every claim: `CONFIRMED` requires naming the attack you tried that failed; a claim about a proof also names the mutation that would make the proof fail and whether the assertions distinguish it. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Do not hedge toward an imagined consensus. Assume this chain has one more defect: T1 took three runs, T2 one, T3 six passes and one review of 19 findings, T4 two reviews of 15 and 5 findings; each round believed its repairs closed.

## Lane assignment

- The `reviewer` lane (Opus, objective) holds claims 1 to 34 as primary (T1, T2, M8/M1/M7, the T3 repairs), because Astra wrote T1 to T3.
- The `analyst` lane (Astra, objective) holds claims 35 to 47 as primary (the T4 repairs), because Opus wrote T4.
- No lane skips a claim: the secondary lane rules every claim too, in the same shape, and attacks first the self-declared sound-and-unchanged verdicts it judges most likely wrong.
- Prose and doc-block claims (26, 32, 34, 41) are ruled in scope as claims about the guide and the TSDoc being true, under "the guide is true: was a false universal replaced by an unfalsifiable one?"; a claim about wording alone is not a finding.

## Contradictions found in the records

1. Digest control: V:119 says "a one-row `$palette` changes the digest"; T1 report-3.md:140 says a whole-sheet compile with one key contradicts V § 4's missing-key refusal, so the control supplies a complete identity palette with one changed row; landed code follows T1 (tests/conformance.test.ts:1589-1593). A5 retitles the case accordingly.
2. Condition count: V:106 "51 min-width px conditions and 25 .98px max-width conditions, the 12 RFS conditions stay literal"; T1 report-3.md:139 "the 51 includes those 12 RFS conditions, wraps 39 grid minimums plus 25 down conditions".
3. V § 11 citations are at 4d21de7 (M8 conformance.test.ts:1329, M7 guides.test.ts:206, guide 1688-1698); in the tree at 2f2eea1 the oracle case is at conformance.test.ts:1351, the gamut case at guides.test.ts:251, the M7 prose at guides/veneer.md:1718-1728.
4. T4 report-2.md:19 helper lines (TokenGamut :42, readTokenLinear :469, measureTokenGamut :496) sit at tests/setup.ts:930 and :957; the consumer case at guides.test.ts:219 and the gamut case at :251.
5. T4 second review: the consumer-case finding was split (one vote: a planted `var(--color-red-600, #e7000b)` passes both lines; the other: the derivation case at index.test.ts:301 already gates it); ruled survives (t4-review-2.json:117-126).
6. M7 evidence ruled two ways: first review refuted "rests on uncommitted runs" (t4-review.json:365-380); report-2.md:59 says two guide claims rest on runs outside the repository (the M7 sRGB pixel reading, the header probe counts); V:190 calls M7 closed by report-2.md:59.
7. Chaining control wording: V:130 `#f9fafb` elsewhere; T2 report.md:43 `#f9fafb → #fafbfc`; landed code asserts `'#f9fafb #fafbfc'` (index.test.ts:333).

## T1 claims (reviewer lane; Astra wrote T1)

1. Under an empty `$palette`, `swatch` returns its literal unchanged in every one of the seven spellings. Rests on src/bootstrap/_mixins.scss:330-333; proof conformance.test.ts:1520-1533. Falsify: mutate :331-332 to return `-spell` unconditionally and confirm :1521 fails; plant a spelling outside the nine forms (`rgb(17 34 51)`, uppercase `#ABC`).
2. Under a set `$palette`, a literal whose normalized key has no row stops the compile with `@error` naming the key; a `$context` with no context row falls back to the plain key. Rests on _mixins.scss:336-341; proof conformance.test.ts:1542-1554. Falsify: a set map missing one key; a context row present while the plain key is absent; a context other than `dark`.
3. The mapped value keeps the literal's spelling (`#` hex, `%23` escape, triplet, `rgba(`/`RGBA(` with alpha or `var()` tail, short form where equal). Rests on _mixins.scss:311-328; proof :1494-1541. Falsify: a literal whose start/end slicing takes a prefix such as `rgba%28`; reversed channels (control :1534-1541); an identity row on a short hex.
4. `measure` returns `$value` under an empty `$scale`, the unquoted row under a set scale, and refuses a missing role. Rests on _mixins.scss:345-353; proof :1557-1576. Falsify: drop `string.unquote` at :352; check :1568.
5. The 571-site edit is complete: every lifted color occurrence is a record row, every row occurs, every kept literal equal on both sides. Rests on conformance.test.ts:1228-1289 (count :1243). Falsify: plant a lifted literal in a partial the generator skipped; an occurrence in a spelling `collectTokenColors` does not lex; an orphan row (control :1276-1288).
6. The record is a function of the lifted value except the one context row `#dee2e6@dark`. Rests on :1291-1306; six dark sites at src/bootstrap/_tokens.scss:177-188. Falsify: a seventh call site passing `dark`; a second conflicting row for a value other than `#ced4da`.
7. `./bootstrap` keeps SHA-256 `7932f7a5…` under empty switches and a changed row changes the digest. Rests on :1578-1609. Falsify: a non-empty default in src/bootstrap/_tokens.scss:8-9 or _mixins.scss:14-15 breaks :1583.
8. `palette.json` (288 rows, Chromium 141) equals the installed theme's raw values; each recorded hex is within one channel unit of Node's conversion; exactly the ten named rows carry `rounding: 'chromium'`. Rests on :1448-1492. Falsify: controls :1482-1491; a theme upgrade adding a `--color-*` name (:1459).
9. Every palette and amount row's origin evaluates within one channel unit over Bootstrap's bases and over the map's bases. Rests on :1308-1349. Falsify: +2 shift (:1341), invalid origin (:1343), changed amount (:1347).
10. M8 join: every amount row joins Bootstrap's own Sass compiled from the map's bases within one unit; `joined` 105, `unjoined` equals the record. Rests on :1351-1446. Falsify: a row joining only through the `-webkit-` strip at :1425; a preamble regex at :1361 missing a base variable.
11. The `$palette` and `$scale` maps in src/tailwindcss/_tokens.scss:1-159 equal the record entry for entry (126 palette, 26 scale). Rests on :1193-1227. Falsify: planted row or removed role (controls :1209-1210); a map edit after the `$withhold:` split at :1197.

## T2 claims (reviewer lane; Astra wrote T2)

12. The built tuned sheet equals the lifted sheet after `substituteTokens` plus withholding, moving, copying, restoring, and nothing else. Rests on tests/src/tailwindcss/index.test.ts:301-450; controls :317-341, :433-445. Falsify: a `substituteTokens` defect mirrored in Sass (the oracle shares no code with `swatch`); a planted `var(--color-*)` value; a change inside `@keyframes` (`readSequences` skips them).
13. `substituteTokens` picks the dark context row under the same condition Sass does: helper regex tests/setupStyles.ts:91-96 against call-site argument _tokens.scss:177-188 (two encodings of one rule). Falsify: a seventh dark-context site on another property.
14. Scale substitution is keyed by property and container selector and never maps `.modal-xl` or a non-container `max-width`. Rests on setupStyles.ts:115-125. Falsify: a `.container` compound selector whose value equals a container literal on a non-container element.
15. Relation: every (name, width, longhand) departure of the tuned sheet from Bootstrap alone at `RELATION_WIDTHS` is classified color, scale, or band; none unclassified; count 5661. Rests on index.test.ts:46-103. The `.card` control (:86-88) compares the planted sheet against the band oracle and never runs the classifier on the planted sheet. Falsify: a departure equal to a color-stage value by coincidence; the classifier's vacuity under the control.
16. Each Bootstrap infix agrees with its Tailwind variant one pixel before, at, and after 640, 768, 1024, 1280, 1536 px. Rests on :177-220; control at 600 px (:214-219). Falsify: a down form (`-down` rows, _tokens.scss:131-143), which the case does not read.
17. RFS cap stays at `1200px`; only `font-size` rules sit in that condition; `.h1` reads 40px at 1200, 1279, 1280 px, and a cap moved to 1280px reads 41.2px at 1279px. Rests on :147-176; band skip setupStyles.ts:53-61, :131. Falsify: a `1200px` block mixing `font-size` with another property; a grid selector outside the regex at :152.
18. Contrast (M1 population): all 223 pairings meet their floor except three hard-coded inherited ids. Rests on :104-146; floor :123. Falsify: a separation row under 1.05; the inherited exemption (:113-117) applied by id to a regressed row.

## M8, M1, M7 (reviewer lane)

19. M8 closed by the oracle case: no amount row unjoined. Rests on conformance.test.ts:1443-1445; V:185, :190.
20. M1 closed by the contrast case with the context split; residual admitted: `mapReading` selects the dark row by the element's color mode, not the declaring block (tests/setupBrowser.ts:290-293, :324-331). Falsify: the `.dropdown-menu-dark` item (proof setupBrowser.test.ts:944-956); `mapReading` returns an unmapped color silently (:330) while `substituteTokens` throws.
21. M7: Chromium's paint equals the writer's sRGB clip (guides/veneer.md:1722-1728). Only evidence: the T0 probe (V:184; report-2.md:59); no repository case reads a pixel. Falsify: a pixel read of `bg-yellow-500` beside `.btn-warning` under `--force-color-profile=srgb`.
22. M9: the palette's source is Chromium's serialization; the two map hexes are `#162556` and `#dbfce7` (V:95, :186; conformance.test.ts:1467-1480). Falsify: a live Chromium 141 re-serialization of the ten rounding rows.

## T3 repaired claims (reviewer lane), by the finding each repair answered

23. F1: table `vertical-align` attribution reads only the immediate parent of a departing `tr`, `th`, `td` (report-5.md:247; reader near setupStyles.ts:622). Falsify: an ancestor admitted beyond the parent (mutation report-5.md:265).
24. F2, F19: `INHERITED_LONGHANDS` (115) equals Chromium 141's inherited computable longhands intersected with the computed-style enumeration, including `user-select` (report-5.md:92, :248). Falsify: a member outside the enumeration.
25. F3: a declared overflow axis keeps a direct attribution; its coupled twin is `dependent` (report-5.md:249, :267).
26. F5 (prose): the J4 comment no longer states one timeout as a fact about all variants (report-5.md:251). Orchestrator rules whether in scope.
27. F8, F9: container captions use the face form and name classes as code; pinned widths 1140px Bootstrap, 1280px both Tailwind faces at 1280 (report-5.md:252).
28. F10, F16: the `TailwindReading` `minimum` branch is honored: at 600 px Bootstrap reads `left` and the layer `center` (report-5.md:253).
29. F11: the Showcase cases restore their entry viewport in `finally` (report-5.md:254).
30. F13: the unmapped partition reports exactly two clause-2 `max-width` violations at 1280 and the mapped run none (report-5.md:233; integration.test.ts:1553, :1580-1591). Falsify: mapping applied to the wrong face (report-5.md:268).
31. F14: the dark-dropdown limit is documented and proven; mapping behavior unchanged (setupBrowser.ts:290-293; setupBrowser.test.ts:944-991).
32. F15, F17 (doc): `collectPartition` and `attributeChromeToken` doc blocks state both winner models and the thrown errors (report-5.md:257-258).
33. F18: setup fixtures admit palette and radius pairs, refuse off-palette color and unsupported geometry, tie caption rows to the record (report-5.md:259). Falsify: an off-record color in the token caption rows.
34. F4 (doc): reader comments conform to writing.md and typescript.md (report-5.md:250).

## T4 repaired claims (analyst lane; Opus wrote T4)

35. F1, F6, F8, F13: the contrast paragraph (guides/veneer.md:1706-1716) matches the case: floor `Math.min(bootstrap, 4.5)`, 1.05 for separations, three exempt ids (index.test.ts:113-123). Falsify: any id in contrast.json the prose contradicts.
36. F3, F10: the law citation is true: the styles.md § Prohibitions clause landed at `4e94add7` and 0.0.92 lacks it (guides/veneer.md:1563-1566).
37. F4, F11: the ROADMAP journey figures equal T3's sixth pass (858.59 s and the others; report-2.md:15; report-5.md:292, :303-315).
38. F5: every guide citation of the readings case carries the full `%s` title (report-2.md:16). Falsify: the cited-title resolver at guides.test.ts:51 (after A4: the case-title gate).
39. F7: the M7 sentence names six utilities beside five components and a `--bs-teal` swatch (guides/veneer.md:1723-1725).
40. F12: a consumer `@theme` reaches the font, radius, and shadow references, no color reaches the sheet; under `prefix(tw)` no unprefixed variable is declared (guides.test.ts:219-250; prose :1675-1685). Falsify: a planted `var(--color-red-600, …)` (caught at :242); a theme value set to an existing default.
41. F14, F15 (doc): the Header paragraph names the faces in backticks; added code tokens take nouns (report-2.md:20-21).
42. Gamut: seven hue bases are outside sRGB and `yellow-500` is the farthest at 0.0225 (guides.test.ts:251-278; tests/setup.ts:930-977).
43. Second review: the policy sentence states the same-family nearest step and the text-only floor (guides/veneer.md:1544-1547). Falsify: it must produce indigo-600, teal-400, yellow-500, cyan-500 from the record and nearest.json (t4-review-2.json:20).
44. Second review: the law-citation tense no longer forecasts a release (:1565-1566).
45. Second review: the `--bs-btn-bg` declaration takes a noun (:1679).
46. Second review: the gamut setup proof fails when `|| channel > 1` is removed (tests/setup.test.ts:522-523; predicate tests/setup.ts:976).
47. Second review: the consumer case refuses any `var(--color-` reference (guides.test.ts:242).

## Evidence the Orchestrator ran ahead (read-only lanes cannot produce it)

- **M7 pixel reading (claims 21 and 22)**: `tmp/units/tokens-falsify/pixel.ts` painted every one of the 288 `palette.json` rows as its raw `oklch()` value beside its recorded hex under `--force-color-profile=srgb` in Chromium 141.0.7390.37 (`/opt/pw-browsers/chromium-1194`), read each painted pixel through a 1×1 PNG screenshot, and found the two pixels equal on all 288 rows (`tmp/units/tokens-falsify/pixel-m7.md` and `pixel-m7.json`; run `runs/a8-pixel-m7-5`). Control: `--color-yellow-500` painted beside the planted hex `#f0b101` (the recorded `#f0b100` with its blue channel plus one) reads `240,177,0` against `240,177,1`, so the reading discriminates one channel unit. This settles the paint half of M7 for Chromium 141 on this host; it says nothing about another browser or profile.

- **Planted-edit probes (claims 1, 2, 4, 13, 14, 17, 46)**: `tmp/units/tokens-falsify/probes.ts` applied each edit of `probes.json` to the worktree `veneer-a8` (veneer `3f8a870`), ran the named selection through the queue, and restored the bytes (`probes-report.md`, `probes-report.json`; runs `runs/a8-probe-*`):

| Probe | Claim | Planted edit | Expected | Read |
| --- | ---: | --- | --- | --- |
| swatch-empty | 1 | `_mixins.scss`: `list.length($palette) == 0` → `< 0` | red | red: `The palette carries no key #112233` |
| swatch-missing | 2 | `_mixins.scss`: the `@error` block for a missing key removed | red | red: the proof expected `The palette carries no key #abcdef` and read `$string: null is not a string` |
| measure-unquote | 4 | `_mixins.scss`: `string.unquote(map.get($scale, $role))` → `map.get($scale, $role)` | red or a finding | red: the proof reads `width: "40rem"` against `width: 40rem`, so it distinguishes the quoted row |
| context-regex | 13 | `setupStyles.ts`: `occurrence.lifted === '#dee2e6'` → `'#dee2e7'` | red | red: the derivation case fails |
| scale-key | 14 | `setupStyles.ts`: `row.selector.includes('.container') &&` → `true &&` | red | **green: 10 of 10 pass.** The `.container` selector clause is not load-bearing under the shipped sheet: no `max-width` row outside a container selector carries a container literal, so the mutation changes no reading. Claim 14 is attacked with this evidence: is the clause a dead guard, and does the TSDoc or a proof state the condition it guards against? |
| rfs-skip | 17 | `setupStyles.ts`: `if (rfs && rule.conditionText === '(min-width: 1200px)') continue` → the `rfs &&` dropped | red | red: the RFS cap or derivation assertion fails |
| gamut-bound | 46 | `setup.ts`: `channel < 0 || channel > 1` → `channel < 0` | red | red: `expected false to be true` in the gamut proof |

- **The T3 mutation set (claims 23 to 33)**: the four campaign targets (`mutation-targets.json`: table, inherited, coupling, partition) read red then green on `3f8a870` in `veneer-a8` (`runs/a8-t3-mutations/mutations.json`, `success: true`, each target red exit 1 and green exit 0).

## Stakes

This round decides whether the token round's audit step closes under the large size gate's one `orkestrel-falsify` round (`/home/user/scaffold/.agents/orchestration.md:57`; re-triage § A8), which closes tree TW-13 and lanes TW-08 and lets stage B open at the user's word. A `BROKEN` claim opens fix unit F before stage B. A finding is worth more than a clean pass: the alternative is a consumer meeting the defect after the release that carries the flip and the token round as one visual change.

## UNRESOLVED-candidates (writer's report as the only evidence)

- T1 writer determinism and byte-identical rerun (writer and tracer under ignored tmp/; V:108-109; report-3.md:70, :100-101).
- T1 tracer reach 571/571 with 0 original colors left (report-3.md:11); only the count at conformance.test.ts:1243 is in the repository.
- M7 sRGB pixel equality rests on the T0 probe only.
- T3's four mutation probes ran in T3's scratch only (report-5.md:261-270).
- T3 header counts in the guide come from a probe outside the repository (report-2.md:59).
- T4 second round: no report and no mutation record for the 5 repairs among the inputs (fix-gates.txt:1-6 lists gate exits only).

## Open for the Orchestrator

- Whether prose and doc-block claims (26, 32, 34, 41) count as claims under SKILL.md:26 (a claim about a comment or a name is not a claim).
- Inputs the distiller did not reach: full t3-review.json; tokens-t1 report.md and report-2.md; T3 report-1 to report-4; tokens-t4 report.md and token-table.md; tokens.json and palette.json bodies.
