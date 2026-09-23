# B-FORMS-FLOATING audit — `analyst` on GPT-6 Astra, objective lane

Journal: `tmp/codex/bff-audit-analyst.jsonl` (swept at acceptance); thread `01a0cc46-4b34-75c3-bd55-90229da97294`; exit 0; launcher `bff-audit-analyst.sh`. Claims: `bff-audit-claims.md`. The lane compiled the partial, ran the ledger readers, `attributeSelector`, `findDuplication`, and `npm run check`; it ran no Vitest project.

1. **CONFIRMED.** At `src/styles/components/_form-floating.scss:17`, the read-only Sass compile matches the inventory’s owned selectors, declarations, and conditions, allowing the recorded token substitutions and flattened height calculation. No foreign selectors appear. Removing the reduced-motion emission in memory fails the selector/condition comparison. Grouping the autofill selectors reproduces the minifier’s `:-webkit-any(...)` and `:is(...:autofill)` rewrites, supporting D4. D3 follows the mixin-only dependency; D34 remains excluded as instructed.

2. **BROKEN.** At `src/styles/index.scss:55`, validation loads before floating. For `<div class="form-floating"><input class="form-control is-invalid" placeholder="Address"></div>`, `.form-control.is-invalid` and `.form-floating > .form-control` have equal specificity. Floating’s later padding shorthand at `src/styles/components/_form-floating.scss:53` overrides validation’s `padding-right` at `src/styles/components/_validation.scss:45`. The compiled cascade therefore selects `var(--vn-space-6)` instead of `calc(1.5em + 0.75rem)`. The valid twin has the same defect. Bootstrap orders these declarations oppositely at `node_modules/bootstrap/dist/css/bootstrap.css:2628` and `:2802`.

   Restore the release’s forms order and add combined floating/validation assertions. The `.was-validated` and textarea rules retain their right padding through greater specificity. Settle the rendered regression with `npm run test:src:styles -- tests/src/styles/components/form-floating.test.ts` after adding those fixtures.

3. **BROKEN.** The declaration-only list contradicts the claim: `tests/setupStyles.test.ts:2245` pins the control autofill, plaintext autofill, autofill-label, and class-qualified disabled-label selectors. The table correctly contains those entries; correct the claim’s enumeration.

   The named mutation assertions distinguish their changed values by source inspection:

   | Mutation | Distinguishing assertion |
   |---|---|
   | Wrong transform | Exact matrix at `form-floating.test.ts:163`; declaration expression at `:484` |
   | Label never fades | Color alpha at `:128` and `:405`; element opacity correctly remains `1` |
   | Lost focus padding | Empty focused control’s padding at `:161`; selector presence at `:461` |
   | Surviving reduced-motion transition | Transition becomes `none`/`0s` at `:336` |
   | Wrong backdrop radius | Resolved radius at `:252` and override at `:407` |
   | Dropped bare disabled rule | Disabled select, without `.form-control`, at `:296` |
   | Literal label inset | Density response at `:356`; token reference at `:459` |

   No wholly unread recorded declaration was found. These are assertion-adequacy rulings, not independently repeated browser mutation runs. The portfolio lacks captures for the focused empty textarea, focused cleared plaintext control, reduced-motion treatment, and factor/global overrides. Their rendered claims remain unevidenced here. The settling command is `npm run test:src:styles -- tests/src/styles/components/form-floating.test.ts`, with the named mutations and corresponding captures produced on the host.

4. **CONFIRMED.** The missing-scenario attack failed: the registry at `tests/setup.ts:764` and `:942` resolves to frames for every declared variant. The inspected frames show resting and floated labels over native controls, including the filled disabled textarea; D5 stands. `app/browser/sections/FormFloatingSection.ts:18` consumes the declared specimens. The journey waits before photographing and checks focus and transform afterward at `tests/app/browser/integration.test.ts:956`. Capture records corroborate the floated matrix at `tmp/capture/light-390.txt:1026`. Styled control parity remains outside these frames.

5. **CONFIRMED.** Running the ledger readers against the compiled tree produced no floating departure drift, additions, or floating deferrals. An in-memory wrong-transform control produced unrecorded departures, demonstrating that the comparison rejects a changed value. The recorded rows are at `guides/veneer.md:2683`; the sorted shipped entry is at `tests/conformance.test.ts:104`. Running `attributeSelector` at `tests/setupServer.ts:1531` assigns `.input-group > .form-floating` to `form-floating` with GROUP shipped, including when `form` also ships. With only GROUP shipped, the control reading assigns it to `input-group`.

6. **BROKEN.** `guides/veneer.md:833` claims a retune of every Bootstrap global the family reads. The override table at `tests/src/styles/components/form-floating.test.ts:390` omits `--bs-secondary-bg`; the disabled-backdrop case at `:276` reads only its default. Add an ancestor override and assert the disabled backdrop follows it.

   The universal autofill impossibility statement at `guides/veneer.md:835` also exceeds the evidence. The installed protocol exposes `Autofill.trigger` at `node_modules/playwright-core/types/protocol.d.ts:1471`; its success on these fixtures remains unresolved. Bound the sentence to the suite’s absent driver, or settle a host CDP probe with `npm run test:probe -- tmp/probe/form-floating.test.ts`. The disabled-twin declaration path follows from the overlapping rules. The native-select line-height limit requires the browser reading at `form-floating.test.ts:62`.

   The section placement and links hold. D2 changes table padding and separator dashes, so it is formatting-only, but not literally whitespace-only.

7. **BROKEN as worded.** D32’s implementation holds at `tests/setupServer.ts:685`: direct Node readings return no live-tree duplication findings, and the whole-four overlap is refused under the new floor but reported under the old floor.

   The claim that **each** scratch case distinguishes the floors is false. The whole-five case at `tests/setupServer.test.ts:280`, the four-of-eight/five-of-eight case at `:307`, and the five-of-ten/five-of-nine case at `:374` return the same results under either floor. The whole-four case at `:336` and the live-tree coincidence case distinguish the change. Correct the claim to describe collective regression coverage; no floor implementation repair is indicated.

8. **CONFIRMED.** An AST sweep over added TypeScript lines found no prohibited assertions, `any`, or disallowed nested functions; its negative control reported those constructs. Runtime inspection confirmed the exported floating tables and entries are frozen at `tests/setupStyles.ts:3750`, `tests/setup.ts:942`, and `app/browser/constants.ts:1319`. The diff adds no competing helper. Palette color comes from the token at `src/styles/components/_form-floating.scss:130`; transparent and global-based colors preserve the release declarations. The transition uses the mixin, and no repeated variant blocks were introduced.

9. **CONFIRMED.** The scope-drift attack failed: live status and diff match `.orkestrel/veneer/units/bff-status.txt:1` and `bff.diff:1` byte-for-byte. `tmp/probe/` is absent. The protected token, theme, mixin, validation, roadmap, and vendored files have no changes.

10. **UNRESOLVED.** `npm run check` independently exited `0`. The remaining gate claims in `.orkestrel/veneer/units/bff-report.md` under “Commands” remain writer-reported and require the Orchestrator’s independent chain after GROUP and integration edits. Run the named format, lint, build, setup, styles, app, conformance, guides, policy, and journey gates, followed by each declared `CAPTURE=1` variant. No browser or Vitest project ran in this audit.

VERDICT: FAIL 2, 3, 6, 7, 10; outside the claims: none