# Audit claims — `@orkestrel/veneer` at `a04fb7c`, the landed foundation

## Subject

The whole `@orkestrel/veneer` checkout at `/home/user/veneer`, HEAD `a04fb7c`, clean. The chain: the
legacy tree was deleted at `2a8a58d` and the package rebuilt on the scaffold shape through the
Button family (U1 to U7, landed through `7f6d5f6`) and the Content/layout family (CL1 to CL12, landed
through `a04fb7c`; CL13 landed no code). Every unit passed its own audit rounds in the previous
sessions. This round audits the result as one foundation, against
`/home/user/scaffold/.orkestrel/veneer/tenets.txt` and the law, with nothing in `src/` or `tests/`
treated as settled.

## What this round decides

Which parts of the foundation stand for the remaining families and which are rebuilt in the
realignment. A finding here is cheaper than the same defect copied into every later component.

## Already established — do not re-run

Verified by the Orchestrator directly on 2026-09-22, not taken from any writer's report:

- From its lockfile alone the tree fails `npm run check` and the browser suites, because
  `tests/**` import `stageMedia`, `releaseMedia`, `holdAccessible`, `hoverAccessible`,
  `releasePointer`, `sendProtocol`, and `POINTER_HOLD` from `@orkestrel/test/browser`, which the
  registry's `0.0.18` does not export; the `orkestrel/test` tip `00e2b87` exports them and is
  installed here as a tarball (`.orkestrel/veneer/units/test-tip-vendor.md`).
- With that tarball: `format:check`, `lint:check`, `check`, `build` exit 0; every test project exits
  0 except `src:browser`, where two cases read `event.target` after dispatch on a detached host,
  which this Chromium 141 nulls (`.orkestrel/veneer/units/event-target-probe.md`).
- The accounting is one-directional: nothing rejects a selector the cascade ships that the record
  does not carry (outside the grid keys), and nothing compares declaration values
  (`.orkestrel/veneer/units/value-accounting-finding.md`). Do not re-report the gap; claims 12 and
  13 ask how far it reaches.
- The capture frame grammar names the shooting project, not the rendered mode
  (`.orkestrel/veneer/cl13-verdict.md` § Findings, finding 1).

## Review evidence

`/home/user/scaffold/.orkestrel/veneer/units/veneer-audit-evidence.md`: the status output, the diffstat of the
rebuilt package against the deletion commit, the gate readings, and the executed probe readings
`probe-engine.log.txt` and `important-census.log.txt` beside it. The subject is the tree itself; read
the files the claims name.

## Numbered falsifiable claims

Attempt refutation. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot
decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a
proof, name the mutation that would make that proof fail and say whether its assertions distinguish
that mutation from the passing case. Do not hedge toward an imagined consensus.

1. **Runtime independence.** The published entries `dist/src/core/index.js`,
   `dist/src/core/index.cjs`, and `dist/src/browser/index.js` import no package specifier at all,
   the manifest declares no `dependencies` and no `peerDependencies`, and `dist/src/styles/index.css`
   carries no `@import` and no external URL.
2. **Pure browser entry.** Importing `@orkestrel/veneer/browser` registers no listener on `document`
   or `window` and constructs nothing; only a consumer's `new Delegate()` installs the delegated
   click listener.
3. **Button restoration.** For every initial host state (no `aria-pressed`, `aria-pressed="false"`,
   `aria-pressed="true"`, `active` present or absent) `Button.destroy` restores the host byte for
   byte; a second `Button` on a live host throws `BUTTON_HOST_OWNED`; after `destroy` a new owner
   constructs; `toggle` after `destroy` writes nothing and returns the host's live state.
4. **Delegation contract.** `Delegate` toggles the closest `[data-bs-toggle="button"]` host for a
   click on a nested child; refuses a host that is `disabled`, carries class `disabled`, or carries
   `aria-disabled="true"` without toggling or emitting; releases a host removed from the root;
   leaves a host a consumer's own `Button` owns to that owner; and `destroy` restores every host it
   acquired and releases its listener. Reachable through the public API only.
5. **Colour-mode islands.** `ColorMode.apply('light')` removes `data-bs-theme` rather than writing
   `light`, so a controller rooted inside a dark island cannot express a light island. Claim: for
   a root that is not `document.documentElement`, every token a consumer reads on that root under
   `apply('light')` equals the value it reads under an explicit `data-bs-theme="light"`. (The
   executed probe reads `--bs-body-bg` on a nested root under a dark ancestor in both states.)
6. **Keyboard parity.** For the shipped Button behaviour the platform supplies the whole keyboard
   contract Bootstrap 5.3.8's Button plugin supplies, for `<button>` hosts and for `<a>` hosts
   carrying `role="button"`, with no engine keydown handling; name any host kind where Bootstrap's
   plugin toggles on a key and Veneer does not.
7. **Semantic tags.** No rule in the `elements` layer of the built cascade styles a bare tag by its
   position beside or inside another tag (descendant, child, sibling, or `:has`), and the
   `matchesLooseTagPair` proof in `tests/src/styles/index.test.ts` reddens when such a rule is
   planted (name the mutation).
8. **Class control.** Every `!important` in the built cascade sits on a utility or helper class
   whose Bootstrap 5.3.8 twin also carries `!important`, and no Veneer tag default or component
   rule carries one; a consumer's unlayered rule at equal specificity therefore beats every tag
   default and component rule. (The census probe lists the `!important` selectors on each side.)
9. **Token contract.** Every `:root` variable `bootstrap.css` 5.3.8 declares is declared in the built
   cascade bound to a `--vn-*` value; the leaves of `TOKEN_NAMES` equal the set of `--vn-*` names the
   built cascade declares (no name on either side alone); and for every token group the guide
   documents, `tests/src/styles/integration.test.ts` proves that overriding a `--vn-*` token at
   `:root` moves a resolved consumer property, not only that the token resolves.
10. **Theme islands.** A nested `[data-bs-theme='dark']` island retunes every role token in its
    subtree and nothing outside it, sets `color-scheme` on the island, and a `light` island nested
    in a dark one returns its subtree to light.
11. **Elements identity.** For the closed keys, the shipped typography, spacing, radius, border,
    elevation, palette, and motion values equal the values recorded from Elements' specimens in
    `.orkestrel/veneer/research/calibration.md` and `calibration-content.md`, and every difference
    is a row in `guides/veneer.md` § Departures from Bootstrap or § Departures from the workspace
    rows. Sample at least the heading scale, the link colours, the button radius, and the table
    stripe.
12. **Extra selectors.** For the keys the conformance listing admits, no selector the built cascade
    ships is absent from `tests/fixtures/oracle/inventory.json`'s inventory for that key. Report
    each extra selector by key.
13. **Declaration values.** For the keys the conformance listing admits, every emitted declaration
    value equals Bootstrap 5.3.8's recorded value or a tokenization the guide records as a
    departure. Report the differing declarations by class of departure, and which classes the guide
    records nowhere.
14. **Standalone CSS.** Loading `dist/src/styles/index.css` alone, with no Bootstrap, Tailwind, Sass,
    or consumer build, renders the showcase specimens with the same resolved styles as the dev
    cascade the tests load; the file needs nothing the manifest does not ship.
15. **Tailwind claims.** `guides/veneer.md` and `README.md` make no claim of Tailwind compatibility
    that no test proves.
16. **Browser evidence.** Every test under `tests/src/styles/**` that asserts an appearance reads a
    resolved style or rendered pixels in the browser; the only readers of compiled cascade text are
    the accounting proofs. Name any appearance assertion made on text.
17. **No duplicated Test helper.** No export of `tests/setup*.ts` has the name or the job of an
    export of the installed `@orkestrel/test` or `@orkestrel/test/browser` (the tip `00e2b87`
    surface installed here).
18. **The selector grammar.** `tests/setupStyles.ts` carries a hand-written CSS selector and value
    reader (`readEscape`, `walkSelector`, `readIdentifier`, `extractSelectorIdentifiers`,
    `splitTopLevelList`, `normalizeComplexSelector`, `splitTopLevelCompounds`, `findGroupEnd`,
    `extractCompoundTags`, `extractSelectorCompounds`, `matchesLooseTagPair`, `splitTopLevelValues`,
    `matchesEdgeShorthand`, `matchesRadiusShorthand`, `extractShadowLayers`, `parseMediaWidth`).
    Claim: every question those readers answer for a proof can be answered from the CSSOM the
    browser exposes (`CSSStyleRule.selectorText`, `CSSStyleDeclaration`, `CSSMediaRule.media`,
    `CSSLayerBlockRule`) or from `postcss` (declared), with no reader of CSS syntax in the workspace.
    Name each question that cannot, with the reason.
19. **No fakes.** No test replaces DOM events, timers, storage, observers, or project-owned
    behaviour with a mock, spy, fake, or module replacement; every conditional skip names the
    mechanism that makes it inapplicable.
20. **Mechanical law.** Under `src/**`, `app/**`, and `tests/**` (excluding the vendored
    `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`): no `any`, no type
    assertion other than `as const`, no non-null assertion, no `@ts-` directive, no disable
    directive, no default export outside configs, no class member modifier, no parameter property,
    no function declared inside a function body except a callback passed directly as an argument,
    no hidden module-scope declaration in a centralized file, no literal colour outside
    `_tokens.scss` (a colour function over a token is not a literal), no `transition` outside the
    mixin that pairs it with reduced motion, and every helper in `helpers.ts` named `{verb}{Noun}`.
21. **Guide truth.** Every behavioural sentence in `guides/veneer.md` § Methods, § Styles, and
    § Tokens matches the code: sample "Removes the attribute only when this controller wrote it",
    "Importing the browser barrel installs nothing", the layer-order sentence, and the sentence
    naming which file declares the cascade-layer order.
22. **Forbidden runtimes.** The `FORBIDDEN_RUNTIME` sweep in `tests/conformance.test.ts` reaches
    the built `dist/src/**` closure, not only source specifiers, so a bundled copy of a forbidden
    package would redden it. Name the mutation.
23. **API shape.** Every public property, method, option key, and event name is one word or is
    justified by the naming rules; discriminants name their axis; `ColorModeState` is a real domain
    union; the `toggle.vn.button` wire type and the `on` hook shape follow
    `.claude/rules/patterns.md` § Browser/DOM variant; no compatibility alias or wrapper exists.
24. **Foundation coherence.** The engine shape (`Button`, `Delegate`, the DOM `CustomEvent` model,
    `bindEventMap`), the token layering, and the test infrastructure are the pattern the remaining
    families (Collapse, Dropdown, Modal, Offcanvas, Tooltip, Popover, Toast, Carousel, forms) can
    follow without redesign. Would you ship this as the foundation? Name what a later component
    could not express with it.
25. **Journeys drive real input.** `tests/app/browser/integration.test.ts` reaches every state it
    asserts through real pointer and keyboard input on visible controls, never through
    JavaScript-only state changes; name any state reached otherwise.

## Unknowns

- Whether the Chromium 141 on this host reproduces every reading the previous session took on
  Chromium 151 and Edge 153; report a difference as a finding against the assertion, not the host.
- Whether the retained calibration records carry link and grid rows (the handoff says the
  foundation record carries no link rows); report the sample you could not take.

## The threshold

A finding is worth more than a clean pass: the remaining families will copy this foundation, and a
defect found after they land costs every one of them a fix round.
