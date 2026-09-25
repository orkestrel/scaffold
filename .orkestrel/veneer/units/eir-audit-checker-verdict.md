LANE: eir-checker

**Verdict shape (`orkestrel-falsify`), claims 1, 4, 6 of `/home/user/scaffold/.orkestrel/veneer/units/eir-audit-claims.md`**

1. **Claim 1 (Scope) — CONFIRMED.**
   `eir-status.txt:1-6` lists exactly `guides/veneer.md`, `src/styles/components/_button.scss`, `src/styles/elements/_hr.scss`, `src/styles/elements/_tr.scss`, `tests/src/styles/components/button.test.ts`, `tests/src/styles/elements/hr.test.ts` — the owned scope plus the named guide.
   `eir.diff` hunks touch only: `_hr.scss:109` (`border-top` now `var(--bs-border-width)`), `_tr.scss:122` (`border-bottom` now `var(--bs-border-width)`), `_button.scss:83` (`--bs-btn-border-width: var(--bs-border-width)`) and `_button.scss:91-98` (`.btn-check` reduced to `position`/`clip`/`pointer-events`), the matching test proofs (`hr.test.ts:25-30`, `button.test.ts:143-168`), and the guide rows named in claim 4 (`guides/veneer.md:9-34`, `:42`, `:50`, `:58-59`, `:64-71`). No hunk touches any other selector, property, or guide section.

2. **Claim 4 (Records) — CONFIRMED.**
   Stripe row: `guides/veneer.md:27` reads "Bootstrap's 5%, kept by the E-IDENTITY ruling; the stripe stays under the hover and active overlays," matching the brief's specified text (`e-id-record-brief.md:38-39`).
   `.btn-check`/`.btn` ledger: shipped cascade at `_button.scss:91-98` is exactly `position: absolute; clip: rect(0, 0, 0, 0); pointer-events: none;`, which is byte-identical to `node_modules/bootstrap/dist/css/bootstrap.css:2490-2494`. The diff correctly drops the now-false departure rows for `.btn-check { clip }` (`eir.diff:42`), `.btn { --bs-btn-border-width }` (`eir.diff:50`), and the five stale `.btn-check` departure rows for `width`/`height`/`clip-path`/`overflow`/`white-space` (`eir.diff:64-71`), since the shipped selector no longer diverges from Bootstrap on any of those properties.
   Conformance ledger: `eir-instruments/eir-test-conformance.log.txt:10-11` — "Test Files 1 passed (1)", "Tests 26 passed (26)" — a captured execution transcript, not the writer's own narrative claim.

3. **Claim 6 (Law) — CONFIRMED.**
   A search of `eir.diff` for `any`, ` as `, non-null assertion (`!.`), `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`, and `eslint-disable` returned no matches. The only added test, titled "toggles the checkbox from the keyboard and keeps the label focus paint" (`eir.diff:152`), is named for exactly what its body proves: Tab-focus (`:161`), Space-check (`:163`), and the label's focus-visible box-shadow read (`:165-167`). The test body's callback is the permitted anonymous-callback exception; no nested function declaration or hidden module helper was added.

**Findings outside the claims:** none.

VERDICT: PASS
