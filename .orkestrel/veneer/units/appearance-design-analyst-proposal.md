**P7-1 — Apply the tier to semantic role text on the canvas.** Include `.text-primary`, `.text-secondary`, `.text-success`, `.text-info`, `.text-warning`, and `.text-danger`; their `.link-*` counterparts; and the resting and disabled text of their outline buttons. Include `.btn-outline-tertiary`, which exists even though `.text-tertiary` and `.link-tertiary` do not. The populations differ because buttons iterate `$roles`, while the utilities iterate `$aliased`. See [src/styles/_tokens.scss:8](/home/user/veneer/src/styles/_tokens.scss:8) and [src/styles/components/_button.scss:141](/home/user/veneer/src/styles/components/_button.scss:141).

Apply the same ruling to these consumers:

| Consumer | Ruling | Cost and evidence |
| --- | --- | --- |
| `a`, `.nav-link`, `.page-link`, `.btn-link` | Make `--vn-link-base` read the primary emphasis tier in each mode. Retain its separate hover treatment. Re-measure the associated RGB and hover RGB tokens. | Dark links change from the 80% mix to the 70% mix. The consumers already share the link tokens. See [src/styles/_tokens.scss:131](/home/user/veneer/src/styles/_tokens.scss:131), [src/styles/components/_nav.scss:13](/home/user/veneer/src/styles/components/_nav.scss:13), and [src/styles/components/_pagination.scss:20](/home/user/veneer/src/styles/components/_pagination.scss:20). |
| `.valid-feedback`, `.invalid-feedback`, and validation labels | Make the light `--vn-form-valid` and `--vn-form-invalid` tokens read success and danger emphasis, matching dark mode. Preserve the published pairing of text and border aliases. Cover explicit validation classes and `.was-validated` selectors; labels receive the color even without `:checked`. | This also changes light validation borders and checked-control backgrounds. Include that consequence explicitly in acceptance rather than silently treating these tokens as text-only. See [src/styles/_mixins.scss:484](/home/user/veneer/src/styles/_mixins.scss:484) and [src/styles/components/_validation.scss:98](/home/user/veneer/src/styles/components/_validation.scss:98). |
| `.text-light`, `.text-dark`, `.link-light`, `.link-dark`, and corresponding outline buttons | Retain their existing treatments. | These names select fixed light/dark colors. Their emphasis tiers deliberately use gray replacements rather than the semantic-role mix. See [src/styles/_tokens.scss:155](/home/user/veneer/src/styles/_tokens.scss:155). |
| `.text-*-emphasis`, alerts, role list-group items, and active accordion text | Retain their existing emphasis readings. | They already consume the required tier; tinted surfaces require their own contrast checks. See [src/styles/components/_alert.scss:63](/home/user/veneer/src/styles/components/_alert.scss:63), [src/styles/components/_list-group.scss:157](/home/user/veneer/src/styles/components/_list-group.scss:157), and [src/styles/components/_accordion.scss:36](/home/user/veneer/src/styles/components/_accordion.scss:36). |
| Filled-button labels, outline hover/active labels, `.text-bg-*`, and validation tooltips | Retain the foreground selected against their filled surface. | These are labels on role fills, not role-colored text on the canvas. See [src/styles/components/_button.scss:150](/home/user/veneer/src/styles/components/_button.scss:150) and [src/styles/components/_validation.scss:22](/home/user/veneer/src/styles/components/_validation.scss:22). |

For semantic `.link-*` helpers, derive resting text and decoration from emphasis. Derive hover/focus from that tier, retaining the existing 20% state shift but moving toward black in light mode and white in dark mode through palette tokens. The existing endpoint follows the label chosen for a filled button; it does not establish contrast for text against the canvas. Preserve the separate text and underline opacity controls. Standalone `.link-underline-*` utilities remain decorative color choices. See [src/styles/utilities/_link.scss:18](/home/user/veneer/src/styles/utilities/_link.scss:18).

**P7-2 — Use relative RGB syntax to preserve text opacity.** For the semantic role utilities, emit this shape while retaining the local opacity initialization, utility priority, and ordering:

```css
color: rgb(
  from var(--bs-primary-text-emphasis)
  r g b / var(--bs-text-opacity)
) !important;
```

The alias already reaches the required 70% oklab mix. The existing anchor rule supplies the relative-color precedent. This avoids adding separately maintained emphasis-channel tokens. The cost is changing the color source and its serialization; compare resolved colors with `matchesColor`, not string equality between different color syntaxes. See [src/styles/_mixins.scss:376](/home/user/veneer/src/styles/_mixins.scss:376), [src/styles/_mixins.scss:456](/home/user/veneer/src/styles/_mixins.scss:456), and [src/styles/elements/_a.scss:3](/home/user/veneer/src/styles/elements/_a.scss:3).

**P7-3 — Make the fill token the canonical retune point.** Retuning `--vn-color-primary-base` at the scope declaring the theme closure must move `.text-primary` and `.text-primary-emphasis`. Retuning `--vn-color-primary-emphasis` at that scope overrides the tier directly. An element-local `--bs-primary-text-emphasis` override supplies a direct compatibility override.

Replace the existing `.text-primary` RGB-retune expectation with assertions that:

- Changing `--vn-color-primary-base` moves the resolved text to the independently specified 70% mix.
- Changing `--vn-text-body-base` moves the mix partner.
- Changing `--vn-color-primary-rgb` alone leaves semantic text unchanged, while an existing channel consumer still moves.
- The direct emphasis alias override and `.text-opacity-*` compose correctly.

The cost is an explicit override-contract change: `--vn-color-primary-rgb` remains a fill-channel token, but ceases to control semantic text utilities. Do not imply that overriding a base token on an arbitrary descendant recomputes an inherited alias; custom-property substitution occurs at the declaring scope. See [tests/src/styles/utilities/color.test.ts:113](/home/user/veneer/tests/src/styles/utilities/color.test.ts:113) and [src/styles/_mixins.scss:392](/home/user/veneer/src/styles/_mixins.scss:392).

**P7-4 — Accept emphasis identity at full opacity.** `.text-<role>` and `.text-<role>-emphasis` must paint the same tier at their default opacity. The ordinary utility retains the text-opacity contract; the emphasis utility retains its existing direct tier reading. The cost is losing their default visual distinction. Inventing another mix solely to distinguish the names would contradict the appearance ruling and introduce another contrast decision. See [src/styles/utilities/_color.scss:27](/home/user/veneer/src/styles/utilities/_color.scss:27) and [ROADMAP.md:182](/home/user/veneer/ROADMAP.md:182).

**P8-1 — Apply Bootstrap’s responsive calculation to Veneer’s size tokens.** Bootstrap uses a `1.25rem` threshold, a decrease factor of `10`, a `1200px` breakpoint, and a nominal rem conversion of `16px`. For a size \(s\) expressed in rem and greater than `1.25`, the default fluid expression is:

\[
\operatorname{calc}\left(
\left[1.25+\frac{s-1.25}{10}\right]\mathrm{rem}
+1.2(s-1.25)\mathrm{vw}
\right)
\]

At and above `1200px`, use the original size token. Sizes at or under the threshold remain fixed. See [node_modules/bootstrap/scss/vendor/_rfs.scss:12](/home/user/veneer/node_modules/bootstrap/scss/vendor/_rfs.scss:12) and [node_modules/bootstrap/scss/vendor/_rfs.scss:246](/home/user/veneer/node_modules/bootstrap/scss/vendor/_rfs.scss:246).

The following values are derived expectations for a `16px` root, not browser measurements. The body remains `14px`; changing the body size does not change the root rem unit.

| Selectors | Below `1200px`, with shipped tokens | Cap | At `390px` | At `1280px` |
| --- | --- | --- | --- | --- |
| `h1`, `.h1`, `.fs-1` | `calc(1.35rem + 1.2vw)` | `2.25rem` | `26.28px` | `36px` |
| `h2`, `.h2`, `.fs-2` | `calc(1.3125rem + 0.75vw)` | `1.875rem` | `23.925px` | `30px` |
| `h3`, `.h3`, `.fs-3` | `calc(1.275rem + 0.3vw)` | `1.5rem` | `21.57px` | `24px` |
| `h4`, `.h4`, `.fs-4` | `1.25rem`, fixed | `1.25rem` | `20px` | `20px` |
| `h5`, `.h5`, `.fs-5` | `1.125rem`, fixed | `1.125rem` | `18px` | `18px` |
| `h6`, `.h6`, `.fs-6` | `1rem`, fixed | `1rem` | `16px` | `16px` |
| `.display-1` | `calc(1.625rem + 4.5vw)` | `5rem` | `43.55px` | `80px` |
| `.display-2` | `calc(1.575rem + 3.9vw)` | `4.5rem` | `40.41px` | `72px` |
| `.display-3` | `calc(1.525rem + 3.3vw)` | `4rem` | `37.27px` | `64px` |
| `.display-4` | `calc(1.475rem + 2.7vw)` | `3.5rem` | `34.13px` | `56px` |
| `.display-5` | `calc(1.425rem + 2.1vw)` | `3rem` | `30.99px` | `48px` |
| `.display-6` | `calc(1.375rem + 1.5vw)` | `2.5rem` | `27.85px` | `40px` |

The cost is viewport-dependent font sizes and line heights throughout these consumers. Keep the heading weight at `600` and display weight at `300`. Leave `legend` outside this change; its existing formula is not a general implementation of responsive token arithmetic. See [src/styles/_tokens.scss:384](/home/user/veneer/src/styles/_tokens.scss:384), [src/styles/components/_type.scss:24](/home/user/veneer/src/styles/components/_type.scss:24), and [src/styles/elements/_fieldset.scss:15](/home/user/veneer/src/styles/elements/_fieldset.scss:15).

**P8-2 — Calculate from the live token at the consuming element.** Keep `heading-size` as the token selector. Centralize the responsive expression and cap emission in `_mixins.scss`, shared by heading elements, heading/display classes, and font utilities. Do not create root-level derived size tokens: those would resolve before descendant token overrides.

For a positive length token \(S\), define \(D=\max(0\mathrm{rem},S-1.25\mathrm{rem})\). Below the breakpoint, emit the equivalent of:

\[
S-0.9D+(D/1\mathrm{rem})\times1.2\mathrm{vw}
\]

At and above the breakpoint, emit \(S\). Apply the runtime threshold to every named size consumer. Thus h4–h6 remain fixed with the shipped values but become fluid when a consumer retunes their tokens above the threshold. Preserve `!important` on `.fs-*`, without introducing breakpoint-suffixed font classes.

Length divided by a number and addition of compatible lengths suffice for the intercept. The variable slope additionally requires length divided by length to produce a number, followed by number-times-length multiplication. Chromium 141 support for that complete expression remains unverified.

Before implementation, have the Orchestrator run `appearance-fluid-arithmetic` on Chromium 141, through Sass, the production CSS build, and computed `font-size`. Measure the default sizes, the existing pixel retunes, and retunes below, at, and above `1.25rem`, at `390`, `1199`, `1200`, and `1280px`. Include a changed root size. `CSS.supports()` alone is insufficient. The existing `101px` h1 retune must produce `51.7925px` at `390px` and `101px` at `1280px` with a `16px` root.

The cost is dependence on typed arithmetic and extra cap declarations for sizes that become fluid only after retuning. If the probe fails, stop for a successor design; do not silently substitute a fixed slope or freeze the tokens. See [src/styles/_mixins.scss:156](/home/user/veneer/src/styles/_mixins.scss:156), [tests/setupStyles.ts:3211](/home/user/veneer/tests/setupStyles.ts:3211), and [appearance-design-brief.md:54](/home/user/scaffold/.orkestrel/veneer/units/appearance-design-brief.md:54).

**P8-3 — Record the emitted expressions and conditional caps.** Replace the fixed-token Veneer cells with the actual runtime expressions. Change existing dropped cap rows to tokenized cap rows for headings, heading classes, `.fs-*`, and displays. Under the runtime-threshold ruling, h4 also emits a cap even though its default remains fixed. Record the h5/h6, `.h5`/`.h6`, and `.fs-5`/`.fs-6` cap declarations as additions because Bootstrap records no corresponding caps.

Use the emitted condition spelling, following the existing `legend` precedent. Preserve Bootstrap’s recorded values and conditions as the independent baseline. Update the prose that says font sizes remain fixed across viewports. The cost is additional ledger rows; semantic equivalence at default values does not exempt emitted declarations from accounting. See [guides/veneer.md:7658](/home/user/veneer/guides/veneer.md:7658), [guides/veneer.md:7904](/home/user/veneer/guides/veneer.md:7904), [guides/veneer.md:9146](/home/user/veneer/guides/veneer.md:9146), and [tests/conformance.test.ts:330](/home/user/veneer/tests/conformance.test.ts:330).

For P7, add the semantic text departures, revise link and outline-button rows, and revise canonical link and validation token values. Keep `TEXT_COLOR_CASES` as Bootstrap evidence: its setup test compares it with the official inventory. Add separate Veneer expectations instead of rewriting that baseline. See [tests/setupStyles.ts:2782](/home/user/veneer/tests/setupStyles.ts:2782) and [tests/setupStyles.test.ts:2676](/home/user/veneer/tests/setupStyles.test.ts:2676).

The units execute serially within the checkout. Shared files remain report-only for the source units; integrate their exact patches after COLOR, then TYPE. LEDGER owns the final guide reconciliation.

| Unit | Engine | Owned files | Shared files | Acceptance | Proofs | Mutations |
| --- | --- | --- | --- | --- | --- | --- |
| ARITHMETIC | `sol`, GPT-6 Astra; host execution | Proposed retained instrument `/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments/fluid-probe.mjs` | None | Chromium 141 resolves the complete expression after the production build; otherwise TYPE waits for a successor design. | Computed sizes for the P8-2 matrix, with browser identity recorded. Promote successful cases into TYPE’s tests. | Replace the live token with its default literal; remove the cap; use dimensionally invalid multiplication. Each affected assertion must fail. |
| COLOR | `sol`, GPT-6 Astra | `src/styles/_tokens.scss`; `src/styles/utilities/{_color,_link}.scss`; `src/styles/components/_button.scss`; `tests/src/styles/utilities/{color,link}.test.ts`; `tests/src/styles/components/{button,validation}.test.ts`; `tests/src/styles/elements/a.test.ts`; `tests/src/styles/{theme,tokens}.test.ts` | Exact patches for `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md` | P7 population, opacity, overrides, hover/focus, and validation coupling match the rulings. | Execute `readContrast(element) >= 4.5` for every included semantic role in light and dark on an explicitly painted canvas, including tertiary outline text. Exercise each included consumer; measure full-opacity resting and link-state text. Separately assert disabled color routing, opacity steps, retunes, and excluded treatments. | Restore raw dark danger/info; change 70% to 80%; remove the opacity read; restore the RGB dependency; omit a consumer; restore light validation base values. Contrast, formula, routing, or retune assertions must fail as appropriate. |
| TYPE | `sol`, GPT-6 Astra | `src/styles/_mixins.scss`; `src/styles/elements/_heading.scss`; `src/styles/components/_type.scss`; `src/styles/utilities/_font.scss`; `tests/src/styles/elements/heading.test.ts`; `tests/src/styles/components/type.test.ts`; `tests/src/styles/utilities/font.test.ts`; `tests/src/styles/mixins.test.ts`; `tests/src/styles/fixtures/mixins.scss` | Exact patches for `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md` | Every listed selector follows the table and live-token threshold; body and weight contracts hold; utility priority holds. | Execute a size reading for every selector at `390px` and `1280px`, plus breakpoint-boundary and token-retune cases. Check line heights, heading/display weights, and `.fs-*` precedence. Use independent numeric expectations. | Restore fixed sizes; substitute Bootstrap’s larger heading caps; freeze a token reference; keep a default-only slope; remove the threshold; remove the cap or utility priority. |
| SHARED | Orchestrator, mechanical integration | `tests/setupStyles.ts`; `tests/setupStyles.test.ts` | COLOR patches precede TYPE patches | Shared expectations distinguish Bootstrap baseline data from Veneer behavior. No writer races or baseline weakening. | Run setup tests and the affected browser tests after each integration. | Change a Veneer expectation to the raw Bootstrap value; corrupt an official inventory expectation. The corresponding proof must reject each change. |
| LEDGER | `opus`, Opus 5.5 | `guides/veneer.md` | COLOR and TYPE supply exact declaration evidence | Canonical token values, override prose, departures, additions, and media conditions match compiled CSS. | Existing token-reference, conformance, and guide gates; rendered captures of affected showcase regions at `390px` and `1280px` in light and dark. | Remove a restored cap row; retain a stale dropped row; omit an added cap or text departure; restore the old dark link token value in the guide. |
| VERIFY | `verifier`, Terra | None | Integrated checkout, read-only | Independent gate evidence after cross-engine audit. | Run `format:check → lint:check → check → build → test`, plus the relevant Tailwind service proofs. Record executed mutation results and browser identity. | Re-run the named controls against the integrated artifact; reject controls that fail only through collection or build breakage. |

Reuse the installed contrast instrument rather than adding another implementation. Its background walk requires a known opaque surface and accounts for translucent foregrounds. See [node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2061](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2061).

**Risks.**

- Typed arithmetic is the implementation prerequisite still awaiting a host measurement. Default-size agreement alone cannot prove token retunability.
- The 4.5:1 assertion applies to the shipped, full-opacity semantic text against its mode’s canvas. Consumer retunes, opacity utilities, disabled compositing, and arbitrary backgrounds require separate readings.
- The supplied logs establish the semantic-role mix readings, but not tertiary outline text or the revised link states. Dark danger has limited margin at `4.76:1`; those consumer assertions must execute. See [oncanvas-probe-2.log.txt:7](/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments/oncanvas-probe-2.log.txt:7) and [oncanvas-probe-3.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments/oncanvas-probe-3.log.txt:1).
- Validation’s shared tokens intentionally move borders and checked backgrounds with text under this proposal. Review their captures and preserve their override proofs.
- RGB companion tokens can become stale when the dark link mix changes. The existing triplet-to-rendered-color test must remain binding. See [tests/src/styles/tokens.test.ts:171](/home/user/veneer/tests/src/styles/tokens.test.ts:171).