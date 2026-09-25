# X-TENETS-STYLES — the shipped cascade against Veneer's tenets: claims

Subject: the styles Veneer `main` ships at `0865c67`, read in the detached worktree `/home/user/veneer-probe`: the
sources `src/styles/**`, the compiled cascade `dist/src/styles/index.css` (built there by `npm run build:src:styles`;
SHA-256 in `index-css-0865c67.sha256.txt`), the proofs `tests/src/styles/**`, `tests/service/tailwind/**`,
`tests/conformance.test.ts`, `tests/setupStyles.ts`, and `tests/setupServer.ts`, and the machine-read record
`guides/veneer.md` (§ Styles, § Tokens with its § Departures and § Additions ledger, § Compatibility). The judge is
Veneer's `ROADMAP.md` § Tenets and § Exit criterion items 2, 3, 5, 6, 7, 8, and 9, read in the same worktree. The
Orchestrator's mechanical sweep of the compiled cascade is `sweep.mjs` with its log `sweep-0865c67.log.txt`, beside this
file under `/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/`. Two changes are in flight and are not claim
subjects: E-ID-BUTTON-CASCADE (it retires `button:not([class], [data-bs-target])` and gives every `button` the surface)
and E-ID-MOTION (D48 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`: the panel transitions move
to Elements' motion contract). A claim about a proof is confirmed only after the lane names the mutation that would make
the proof fail and says whether the assertions distinguish it. Rule every claim.

1. **No component from tag structure.** No rule in the compiled cascade uses `:has()`; no rule selects a tag by an
   ancestor, parent, or sibling tag with no class, attribute, or id in the selector; and no rule outside the `reset` and
   `elements` layers selects by tag alone.
2. **Class scoping on tags.** Every `:not([class])` in the compiled cascade is Bootstrap 5.3.8's own selector
   (`a:not([href]):not([class])`), apart from the `button` scope E-ID-BUTTON-CASCADE retires.
3. **Important declarations.** Every `!important` declaration in the `reset`, `elements`, and `components` layers has a
   Bootstrap 5.3.8 twin with the same selector and property in `node_modules/bootstrap/dist/css/bootstrap.css`, and the
   guide states the important-utility contract as Bootstrap's (a consumer's own `!important` is the escape).
4. **Class control over tag defaults.** The layer order places every `elements`-layer tag default under every
   `components`-layer class rule and every layered rule under an unlayered consumer rule, and a rendered proof in the
   tree reads a component class overriding a tag default and a consumer class overriding a component default, each
   without `!important`.
5. **Every token has a reader.** Every `--vn-*` custom property the cascade declares is read by a `var()` in the
   compiled cascade, by `src/browser/**`, or by a documented consumer contract in `guides/veneer.md` § Tokens that a
   proof exercises. The sweep's unread list names `--vn-color-tertiary-subtle`, `--vn-color-tertiary-border`,
   `--vn-color-tertiary-rgb`, `--vn-focus-reset`, `--vn-ease-out`, `--vn-ease-panel`, and `--vn-motion-panel`; the last
   three are E-ID-MOTION's.
6. **Token overrides move consumers.** For every token group `guides/veneer.md` § Tokens documents, a proof overrides
   the group and reads a resolved property of a consumer move, and the proof fails when that consumer stops reading the
   token.
7. **Motion outside the panels.** Every transition outside the collapse, modal, offcanvas, and carousel panels reads a
   `--vn-motion-*` duration scaled by `--vn-factor-motion` or keeps a Bootstrap literal the ledger records, and each
   transition resolves to none under `prefers-reduced-motion: reduce`, read by a proof.
8. **Elements identity is recorded.** Every value the cascade ships from Elements rather than from Bootstrap 5.3.8 (a
   colour, a type size or weight, a radius, a shadow, a space) is a row of `guides/veneer.md` § Departures or
   § Additions, and the accounting gate reddens on one that is not.
9. **The accounting gate.** The ledger gate compares the unminified compile against the recorded Bootstrap values and
   reddens on an unrecorded value difference, an unrecorded extra name, a stale departure, and a stale deferral, and
   each of those four has a plant or a case that proves it.
10. **Baseline coverage.** Every key the pinned record `tests/fixtures/oracle/inventory.json` carries ends shipped,
    deferred with an owner, or excluded with a reason in `guides/veneer.md`, and a gate fails on a key in none of those
    states.
11. **Tailwind.** The standalone profile and each supported combination are proved in a browser under
    `tests/service/tailwind/`, and in the combined profile a Veneer component class wins over Tailwind's preflight on
    every property both write, without `!important`.
12. **Interactive states render.** Every interactive component class the cascade ships (the `.btn` family, the form
    controls, the nav and pagination links, the list-group actions, the dropdown items, the close button) has a
    rendered browser case that drives hover, press, keyboard focus, and disabled where the class defines them, and
    reads the resolved paint at each.
