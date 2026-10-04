# Tailwind flip: objective check

GPT-6 Astra (Codex, read-only sandbox, session `01a10587-e74d-7e30-8465-7eb8fd04c726`, 607 s, 2026-10-04) attacked the load-bearing claims of `design-verdict.md` at scaffold `14811194` under `tmp/codex/flip-check-brief.md`. The verdict took every correction; the report follows verbatim. Citations are relative to this folder, `measurements/`, `design/`, `/home/user/veneer/`, or `/home/user/scaffold/`.

CONFIRMED: 2 / REFUTED: 5 / UNDECIDABLE: 2.

References to verdict and measurement files are relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/`. Repository paths beginning `src/` refer to `/home/user/veneer/`.

1. CONFIRMED — R1’s withholding mechanism and refusal of counters.

The deletion census finds the exact shared rules, their opacity-variable halves, and no selectors containing surviving shared-utility tokens. This establishes absence of Bootstrap’s rules for those names, not absence of other rules affecting an element carrying them. See [verify.md:33](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/verify.md:33).

The counter’s collateral effects follow from the measured cascade: layered importance beats unlayered importance, and `revert-layer !important` skips unlayered declarations. Bootstrap generates `border-primary-subtle`, responsive `text-md-start`, and responsive `mt-md-5` as unlayered important declarations. Consequently, a counter on their co-occurring shared name defeats them. The same problem affects `border border-top-0`, `mb-3 mb-md-0`, and `rounded rounded-top-0`. See [m1-cascade.md:56](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m1-cascade.md:56), [m1-cascade.md:134](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m1-cascade.md:134), and [Bootstrap utilities:174](/home/user/veneer/src/bootstrap/_utilities.scss:174), [:479](/home/user/veneer/src/bootstrap/_utilities.scss:479), [:721](/home/user/veneer/src/bootstrap/_utilities.scss:721), [:954](/home/user/veneer/src/bootstrap/_utilities.scss:954).

2. UNDECIDABLE — R4’s complete preservation claim.

The normal-declaration cascade is supported. M1 f.1 demonstrates `base` defeating `reset`; M2 records the heading changes and retained body values. M6 demonstrates why heading classes need their Bootstrap-layer declarations. See [m1-cascade.md:157](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m1-cascade.md:157), [m2-bare.md:626](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:626), [:752](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:752), and [m6-counter-output.json:17](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m6-counter-output.json:17).

The measurements do not exercise the proposed class-copy mechanism, completed curation, or `until-found`. M2’s construction puts both important reboot rules inside `reset`; that differs from the proposed unlayered datalist rule. Its picker reading expressly supplies no witness. See [m2-bare.md:610](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:610) and [:616](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:616).

The deciding probe is P1/P6 against the actual tuned Sass output: compare bare headings, heading-class carriers, `.small`, `.mark`, and each curation witness against Bootstrap alone; inspect the datalist rule’s layer context; mount `[hidden]` and `[hidden="until-found"]`, with and without `.d-flex`, under the recipe and raw composition. Read `display` and `content-visibility`. Run at the declared wide and narrow viewports. These inputs extend the probes specified at [design-verdict.md:95](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:95).

3. UNDECIDABLE — Sass byte equality and copy ordering.

The supplied source contains neither `restrict` nor the proposed hooks. The proposal’s `restrict` body is a placeholder. Existing measurements therefore cannot establish their compilation behavior. See [proposal-consumer-proof.md:54](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md:54) and [Bootstrap mixins:5](/home/user/veneer/src/bootstrap/_mixins.scss:5).

The Sass risks are:

| Risk | Evidence and deciding check |
| --- | --- |
| Configuration order | Bootstrap tokens configure `mixins` before output. A prior load of either module can prevent subsequent `@use … with` configuration. Compile the normal Tailwind entry and entries that first load Bootstrap tokens, mixins, or its barrel. See [Bootstrap tokens:2](/home/user/veneer/src/bootstrap/_tokens.scss:2). |
| Selector restriction | Test pseudo-elements, selector lists, descendant and child combinators, attributes, and pseudo-classes. Restrict the selected element without requiring its ancestors to carry the class. The source includes `ol ul`, `a > code`, and `legend + *`. See [reset:125](/home/user/veneer/src/bootstrap/_reset.scss:125), [:204](/home/user/veneer/src/bootstrap/_reset.scss:204), [:324](/home/user/veneer/src/bootstrap/_reset.scss:324). |
| Unsatisfiable selectors | `a:not([href]):not([class])` cannot match an element restricted to a curated class. Record whether unification returns nothing or emits an unsatisfiable selector; do not count the latter as an effective repair. See [reset:175](/home/user/veneer/src/bootstrap/_reset.scss:175). |
| Lifted media ordering | `@at-root (without: layer rule)` retains media context. Sass’s existing lifting behavior is explicitly documented as moving a lifted media rule. Heading sizes have media overrides whose order matters. See [mixins:75](/home/user/veneer/src/bootstrap/_mixins.scss:75) and [reset:55](/home/user/veneer/src/bootstrap/_reset.scss:55). |
| Repeated content and importance | Wrapping declarations in `curate` must preserve fallback order, comments, and `unlayer` behavior. In particular, copying the datalist block must not accidentally duplicate its important declaration. See [reset:235](/home/user/veneer/src/bootstrap/_reset.scss:235), [:281](/home/user/veneer/src/bootstrap/_reset.scss:281), and [mixins:73](/home/user/veneer/src/bootstrap/_mixins.scss:73). |

The deciding probe compiles untouched and hooked sources with Dart Sass 1.105.1 under default and `$layered: false` configurations, comparing complete output bytes. It then compiles the tuned configuration with empty and populated curation, checks every selector restriction, and compares ordered declarations with their complete layer/media context.

P1’s stated expectation also conflicts with the design: its `reset` block cannot equal the entire lifted reboot minus `[hidden]` while the datalist declaration remains unlayered. See [design-verdict.md:95](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:95) and [verify.md:34](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/verify.md:34).

4. REFUTED — R5 and the partition proof establish neither causal attribution nor harmless exclusions.

The specified classifier contradicts its negative control. Under the unexcluded face, Tailwind’s `.collapse` utility matches `collapse show` and declares `visibility`. R5 therefore labels the departure `utility`; § 5 predicts `unattributed`. The component partition permits `utility`, so this control does not fail for the stated reason. See [design-verdict.md:11](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:11), [:77](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:77), and [brief.md:36](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md:36).

A matching declaration is not evidence that it caused the computed departure. The algorithm does not resolve winning declarations, same-element dependencies such as `currentColor`, pseudo-element matching, or nested selectors. Its parent-`font-size` condition also excuses unrelated properties without establishing inheritance. The consumer judge identified that exact heuristic as a defect; the verdict retains it. See [judge-consumer.md:29](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/judge-consumer.md:29) and [m3-curation-candidates.md:377](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m3-curation-candidates.md:377).

The exclusions are not universally harmless. Width, height, and insets can determine whether a component remains usable. `tab-size` affects preserved tab characters. A non-list-item container’s list style can affect descendant markers. M3 records substantial geometry changes, while M2’s populated `ul` witness changes list style. Excluding the duplicated `text-decoration` shorthand is supported when its longhands remain checked; zero-width border-style exclusion is bounded to the measured state. See [m3-functional.md:3](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m3-functional.md:3), [m2-bare.md:666](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:666), and [verify.md:37](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/verify.md:37).

The curation seed also misuses `revert`: Bootstrap explicitly supplies SVG `vertical-align: middle`, and M2 reads `middle` in every composition. `vertical-align: revert` discards that authored value rather than restoring it. See [design-verdict.md:65](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:65), [reset:221](/home/user/veneer/src/bootstrap/_reset.scss:221), and [m2-bare.md:663](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:663).

5. CONFIRMED — The derivation pins are mechanically decidable.

Compile equality, set equality, ordered transformation equality, and recipe-to-sheet equality with an explicit rewrite record are finite comparisons. M6 does not invalidate the “nothing else” clause: that clause applies to the tuned sheet before Tailwind processes it; the separate recipe pin accounts for Tailwind’s rewrites. See [design-verdict.md:56](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:56) and [measurements.md:77](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md:77).

This confirms decidability, not successful execution. A withheld rule has no surviving tuned entry. The recipe comparison must account specifically for the removed `display: inline-block` declaration and empty-layer rewriting, including order and multiplicity. M6’s diagnostic uses membership differences, which alone cannot establish ordered or multiplicity-preserving equality. Its counter-output JSON contains computed counter readings, not the inlining rewrite evidence. See [m6-counter-inline-equal.ts:43](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/probes/m6-counter-inline-equal.ts:43) and [m6-counter-output.json:2](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m6-counter-output.json:2).

6. REFUTED — The preflight record redesign does not pass as specified.

The reproduction filter rejects rows whose baseline values differ. The added guard requires every skipped longhand to be absent from enumeration. M2 instead reports enumerated `background-color`, `width`, and other properties with differing values. Only the `row-rule-color` rows satisfy the absence guard. Form-control confinement is supported; the combined acceptance condition is not. See [design-verdict.md:83](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:83), [proposal-consumer-proof.md:441](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md:441), and [m2-bare.md:560](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:560).

The unrecorded movers occur on `html` and `table`, outside the form-control confinement. A record-filtered comparison cannot establish live-to-record completeness for them. See [m2-bare.md:589](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:589).

The grafted record-free case has another invalid implication: it requires a property changed by removing `reset` to equal Bootstrap alone when `reset` is present. Heading `line-height` disproves that inference. The reboot retains `1.2`, but preflight changes the heading’s font size, so M2 reads 19.2px instead of Bootstrap’s 48px. Retaining a declaration does not retain its computed value. See [proposal-tuned-build.md:418](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-tuned-build.md:418), [reset:48](/home/user/veneer/src/bootstrap/_reset.scss:48), and [m2-bare.md:630](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:630).

No cited run executes the redesigned case on Chromium 153.

7. REFUTED — The unit ownership list is not entirely contained in the named lane bullet.

The applicable bullet has been amended. It includes `_reset.scss`, `tests/setup.ts` and its twin, the distribution recipe case, and the rebuilt showcase page. The critic’s earlier objections to those paths are stale. See [lanes.md:81](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:81).

The following assignments remain outside that bullet:

| Unit | Assigned path outside the bullet |
| --- | --- |
| U1 | `/home/user/veneer/tmp/probes/flip2/` |
| U3 | `/home/user/veneer/tmp/units/` writers and scratch configuration |
| U6 | `/home/user/veneer/tests/setupBrowser.test.ts` |
| U7 | Scaffold `AGENTS.md` and `.claude/rules/styles.md` |

See [design-verdict.md:85](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:85) and [:95](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:95).

These omissions do not all mean unauthorized work: orchestration separately permits checkout `tmp/`; the lane table separately assigns showcase-helper test blocks; and the later log expressly records scaffold amendments. They nevertheless refute the requested strict containment claim. See [orchestration.md](/home/user/scaffold/.agents/orchestration.md), [lanes.md:28](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:28), and [:65](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:65).

8. REFUTED — The consumer table contains incorrect and unsupported entries.

The affected rows are:

| Verdict line | Finding |
| --- | --- |
| 44 | With `.d-flex`, Bootstrap alone computes `flex`, not `none`, for `hidden="until-found"`. The later unlayered `.d-flex !important` defeats Bootstrap’s `[hidden]` rule. Raw Tailwind composition also exempts this attribute value from preflight’s hidden selector. |
| 46 | Bootstrap’s `top-50` declares `50%`, not the table’s `100%`. |
| 41 | M5 demonstrates excluded candidate generation, not failure of `@apply`. No cited compile tests `@apply` or custom `@utility` definitions. |
| 36–37 | The 40px heading readings require the measured wide viewport. Bootstrap uses responsive formulas below 1200px. They are not unconditional values. |
| 43 | If `hidden` means a class, the attribution to preflight is wrong: preflight selects the attribute. If it means the attribute, the recorded ordinary-hidden values are supported. |

Evidence: [m2-bare.md:611](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:611), [:616](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md:616), [utilities:131](/home/user/veneer/src/bootstrap/_utilities.scss:131), [reset:51](/home/user/veneer/src/bootstrap/_reset.scss:51), and [measurements.md:20](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md:20).

The related showcase prediction at verdict line 75 is also wrong: retained `.text-md-start` declares physical `left`, not logical `start`. See [utilities:721](/home/user/veneer/src/bootstrap/_utilities.scss:721).

The other table predictions follow from the stated cascade, conditional on successful Sass implementation, generated candidates, and the measured root sizing.

9. REFUTED — Applying the defaults before their prerequisite amendments conflicts with the brief’s retained constraints.

Section 10 contains defaults numbered through 14, rather than stopping at 10. The law-amendment default conflicts with the rules still on disk: cross-face imports are forbidden, and framework normal declarations belong in the framework layer. The brief retains those rules. U2 implements the conflicting mechanism before U7 amends them. See [design-verdict.md:96](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:96), [:102](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:102), [:116](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md:116), [brief.md:58](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md:58), [AGENTS.md:28](/home/user/scaffold/AGENTS.md:28), and [styles.md:72](/home/user/scaffold/.claude/rules/styles.md:72).

Keeping the shared component names is an explicit exception to the brief’s all-shared-name formulation, but Q2 expressly presents that choice for the design to rule on. It is not a measurement contradiction. The landing default matches the amended lane rule. No further direct contradiction is established for the remaining defaults; their unexecuted probes remain evidence gaps. See [brief.md:13](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md:13), [:66](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md:66), and [lanes.md:82](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:82).

The three strongest objections are:

- The partition can accept a break under an allowed attribution. Its own `.collapse` control demonstrates the problem, and its parent-font heuristic and geometry exclusions widen that gap. See design-verdict.md:11 and :77.
- The host-portable acceptance case is internally inconsistent and incompletely covers live movers. The enumeration guard contradicts the value-based filter, while the grafted reboot proof confuses declaration preservation with computed-value preservation. See m2-bare.md:560, :589, :630, and proposal-tuned-build.md:418.
- The proposed Sass mechanism has no compiled evidence, and its acceptance statement contradicts the datalist placement it requires. M6 demonstrates whole-reboot relocation and lifted-sheet inlining, not the proposed selector-copy implementation. See design-verdict.md:95, measurements.md:66, :77, and src/bootstrap/_mixins.scss:75.

The wrong-citation and unsupported-extrapolation list is:

| Verdict location | Cited evidence | What the evidence actually establishes |
| --- | --- | --- |
| Line 9, extended to line 41 | M5 | Excluded candidate rules and the `--color-primary` experiment. It does not test `@apply` failure or custom `@utility` exclusion. |
| Line 10 | M1 g; M2 § 5 | Ordinary `[hidden]` witnesses. Neither measures `until-found`; M2 C also contains an earlier-layer important Bootstrap hidden rule, so its `none` reading does not identify preflight as the winner. |
| Line 65 | “M3 and the judges” | SVG display departures support a display repair. They do not support `vertical-align: revert`; M2 § 6 reads `middle` throughout, supplied by the reboot. |
| Lines 14 and 83 | M2 § 4 through the adopted portable-record design | Form-control confinement holds for the unreproduced recorded rows. The enumeration-absence guard holds only for missing properties, not the enumerated properties with differing values. |
| Line 83 through its adopted record-free case | M2 and tuned-build’s reboot case | M2 records changed computed heading line heights despite retaining the reboot’s relative declaration. It does not support the case’s computed-value implications. |

The `top-50`, `until-found` display, and `text-md-start` errors are value or cascade errors identified in claim 8; the verdict gives them no separate measurement citation that establishes those predictions.