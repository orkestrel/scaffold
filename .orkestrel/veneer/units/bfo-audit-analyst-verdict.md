# B-FORMS-CONTROL, round 1 — `analyst` on GPT-6 Astra, objective lane

Journal: `tmp/codex/bfo-audit-analyst.jsonl` (session `01a0cc8b-6d8b-7872-a047-572227aa4c50`, launched 2026-09-23 04:35 UTC through `bfo-audit-analyst.sh`, exit 0). The verdict text is the lane's last message verbatim.

1. **CONFIRMED** — The selector and construction claims held. `npx --no-install sass --no-source-map src/styles/components/_form-control.scss` exited 0. Comparing selector/condition pairs with the installed release found no missing owned selector and no excluded upload-button alias. The size tuple, swatch loop, transition twins, border-reset mixin, and logical margins are present at `src/styles/components/_form-control.scss:10`, `:94`, `:144`, and `:185`. The attack for missing conditional or generated selectors failed. Declaration priority has a separate finding below.

2. **CONFIRMED** — The token-binding attack found no unauthorized substitution among the named bindings. The padding, typography, focus, motion, negative margins, and height expressions match the family’s precedents at `src/styles/components/_form-control.scss:28`, `:61`, `:96`, and `:151`. Bootstrap’s independent `$form-color-width: 3rem` declaration at `node_modules/bootstrap/scss/_variables.scss:935` supports the direct `--vn-space-24` binding; D33’s padding-derived multiple does not require replacing it. The date literals match the release. The token file is unchanged.

3. **UNRESOLVED** — The assertions distinguish the primary mutations, but the reported reduced-motion plant’s additional F failures depend on transition timing.

   F compares the shadow spread with a token gauge and retunes it (`tests/src/styles/components/form-control.test.ts:193`, `:215`). M checks placeholder color (`:259`); G checks the media rule and disabled transition (`:309`, `:329`); T changes density and padding tokens (`:139`, `:155`); H compares enabled hover with refused states (`:350`); L compares the swatch declaration (`:98`). These mechanisms distinguish the named primary plants.

   The R assertions at `:63` distinguish altered padding, type, border geometry, opacity, cursor, outlines, file-button margins, minimum heights, color-control dimensions, and reduced-motion durations. The hover R row has an empty values object at `tests/setupStyles.ts:4008`; it proves the driven state, while H owns the paint assertion. C distinguishes an enabled cursor changed to `auto`, or a refused file cursor changed to `pointer` (`form-control.test.ts:387`). J distinguishes missing keyboard focus or a missing/recolored ring (`tests/app/browser/integration.test.ts:943`).

   F does not directly assert that motion stopped. Its incidental failure under the missing-twin plant cannot be established from these assertions. Settle the reported failure sets on the host by rebuilding each named plant and running `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts`, then restoring and repeating.

4. **NOT-EVIDENCED** — The ladder implementation matches the stated assignments: resolved pseudo readings at `tests/src/styles/components/form-control.test.ts:63`, CSSOM declaration readings at `:89`, and Gecko compile assertions at `tests/setupStyles.test.ts:1829`. The Node reading confirmed the Gecko declaration and excluded aliases; removing the Gecko radius in memory made the expected declaration absent.

   Date-part corroboration is missing. `guides/veneer.md:781` explicitly records that no date specimen or frame exists, while `tmp/units/b-forms-design-verdict.md:73` requires frame corroboration. Add the date specimen and registered captures, then run the form-control browser proof and `CAPTURE=1 npm run test:journey` on the host. The swatch frame supports its declared rung; it cannot corroborate the date parts.

5. **BROKEN** — The Node case binds tokens per selector, not per property. At `tests/setupStyles.test.ts:1801`, declarations become one string; `:1823` searches that entire string for each token.

   Reproduced input: change only `.form-control-sm`’s compiled minimum height to `calc(1.5em + 0.5rem + var(--bs-border-width) * 2)`. The Node binding predicates still report no failure because padding retains `--vn-space-2`. Removing the placeholder color produces a failure, confirming that the reader executes and detects a missing selector-level reference.

   `tmp/units/b-passive-family.md:119` requires the token beside the property it drives. Store expected references per property and compare each declaration separately. The browser density assertion already catches this particular height mutation; that adjacent coverage does not repair N’s claimed binding. Inventory membership, frozen rows and collections, export rows, and markup assertions are present.

6. **CONFIRMED** — Direct Node execution of the ledger readers returned empty unrecorded and stale departure/addition lists. Deferral and tag assertions also passed. Changing the control padding to `99px` produced the expected stale and unrecorded ledger rows; adding a deferral for `.form-control` reported that shipped selector.

   The guide carries the departure table at `guides/veneer.md:2693`, excluded aliases at `:1054`, file row at `:203`, compatibility row at `:3071`, and test link at `:3291`. The measured color-width departures remain attributed to `is-valid` and `is-invalid`: their selectors contain the `form-control-color` class rather than the `form-control` class. The attack against that attribution failed. These readers do not establish declaration priority, as the outside finding explains.

7. **NOT-EVIDENCED** — The CONTROL specimens and registered portfolio are supported, but FLOATING’s CONTROL carrier remains open.

   The section and specimen declarations match at `app/browser/sections/FormControlSection.ts:18` and `app/browser/constants.ts:1044`. The journey traverses the keyboard, checks focus, and compares the ring with `FOCUS_RING` at `tests/app/browser/integration.test.ts:943`. Every registered CONTROL frame exists for `light-1280`, `dark-1280`, `light-390`, and `dark-390`.

   I opened every named frame. They show the rounded text field, focused text-control page, inset dark file button, rounded color swatch, muted disabled surface, and ordinary dark readonly surface. These appearances agree with the release’s control structure and the authorized token departures. The readonly appearance is correct because the release defines no separate readonly fill.

   This worktree supplies no integrated floating text-control capture. The obligation at `/home/user/scaffold/.orkestrel/veneer/units/bfo-audit-claims.md:52` remains: integrate FLOATING and CONTROL, retire FLOATING’s carrier and bare-controls sentence, and recapture its text controls. Settle with the integrated floating styles proof and `CAPTURE=1 npm run test:journey`.

8. **UNRESOLVED** — Every proposed patch context matches the current validation file. The inset calculation gives `9px` at the control’s `16px` font size, consistent with `src/styles/components/_validation.scss:48`. Staging reduced motion before the validity change makes the immediate border assertion read the committed state; G separately checks the ordinary transition contract.

   The later assertions remain unexecuted. The swatch assertions at `tests/src/styles/components/validation.test.ts:89` and `:330` are not automatically stale: those fixtures omit the base `form-control` class, so their inherited font still supports `81px`. Apply the returned patch on the host, rebuild the integrated stylesheet, and run `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/validation.test.ts`.

9. **BROKEN** — The changed prose does not consistently follow the named writing rules. At `guides/veneer.md:759` and `:761`, the timing code spans lack following nouns. The links at `:775` and `:788` lack the required “see” introduction; the former also makes “classes” the subject of “reads.” The proposed ROADMAP prose at `/home/user/scaffold/.orkestrel/veneer/units/b-forms-control-report.md:281` leaves the class, token, and filename without their identifying nouns; `:282` does the same for the fixture identifier.

   Add the nouns and rewrite the proof reference as a sentence introducing the linked proof. The changed guide prose passed the 100-column check and the case-insensitive substitution-term sweep. The arithmetic multiplier is a value, not a prohibited count. Each ROADMAP row names a carrier; the audit brief separately reassigns D31 to B-FORMS-CLOSE.

10. **CONFIRMED** — `npm run check` exited **0**. A TypeScript AST inspection of added lines found no prohibited assertions, `any` types, non-null assertions, or disallowed nested functions. The frozen case and specimen collections are present; the additions introduce no replacement helper for an installed `@orkestrel/test` export.

    The actual diff and status match the supplied evidence byte for byte. The off-limits paths, including `validation.test.ts`, are unchanged; `tmp/probe/` is absent. The partial’s SHA-256 matches the reported restored digest. The attack for concealed scope changes or an unrestored plant failed.

**Outside the claims — SWATCH-PRIORITY: BROKEN.** At `src/styles/components/_form-control.scss:187`, the shared swatch loop emits `border: 0` without priority. Bootstrap emits `border: 0 !important` for each swatch at `node_modules/bootstrap/dist/css/bootstrap.css:2294` and `:2298`.

A direct PostCSS comparison reported important declarations in the release and normal declarations in the subject. Setting the priority in memory closed that comparison. This changes the cascade contract when a competing normal swatch-border declaration exists; the supplied resting frame cannot expose that difference.

Restore the release’s priority in the shared loop and assert priority independently of the value. `tests/setupServer.ts:1425` retains declaration values without their priority, and the L/N assertions likewise read only values. Their green results therefore do not refute this finding. The selectors, radius bindings, and resting swatch appearance remain supported.

VERDICT: FAIL 3, 4, 5, 7, 8, 9; outside the claims: SWATCH-PRIORITY