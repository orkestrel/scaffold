# U3 audit round 3 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 6
(`.orkestrel/veneer/units/u3-brief-6.md`, report `units/u3-report-4.md`), on top of the round-2
tree the verdict `u3-audit-verdict-2.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the
deciding evidence (`file:line` or exact text); read the diff over `b661142` and the live files,
never the reports alone; execute a reading in memory where a claim names one. Round 2 confirmed
claims 1, 6, 7, 8, 10, 11, and 14 of `u3-audit-claims-2.md`; re-read those sites only where a
brief-6 item touched them. Law: scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `writing.md`, `documentation.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **The alpha form.** `guides/veneer.md` teaches `rgba(var(--vn-color-primary-rgb), 0.5)` and
   no `rgb(var(…-rgb) / …)` form anywhere in the guide; the customization fence the integration
   proof executes uses the same form.
2. **The deferred section.** § Deferred names lists only names the release does not declare; the
   `interpolate-size` paragraph sits with motion or the departures.
3. **The factor rows.** Each factor row's `Source` cell states the value `1` and the scale it
   multiplies.
4. **The `Source` sentence.** The sentence about `Source` cells is scoped to the reference-map
   tables; the tier and departures tables are not covered by it.
5. **The coupling sentence.** The integration proof's TSDoc states the recipe is copied from the
   fence and must change with it, claiming no enforcement.
6. **The inset shadow.** `--vn-shadow-inset`'s lengths carry `var(--vn-factor-elevation)` like
   the rungs; the guide row publishes the authored value; the values proof reads it.
7. **The selector scanner.** `splitTopLevelCompounds` tokenizes the normalized selector with
   parentheses, brackets, and quotes respected; `extractCompoundTags` reads every bare-tag
   alternative of an `:is()`/`:where()` list; `extractSelectorCompounds` groups them with their
   combinators; `matchesLooseTagPair` compares adjacent compounds over every tag combination
   (execute the live functions in memory): `:is(h1, p)` false, `:where(h1, p)` false,
   `:is(.title,h1)+p` true, `h1, p` false, and the earlier cases (`details + summary` true,
   `:is(h1)+:is(p)` true) still hold; the four readings are cases; each renamed reader's name
   matches what it returns and its TSDoc describes it as it is; no caller of the old names
   survives.
8. **Values in the value maps.** Under `src/styles/**` no literal colour appears outside
   `_tokens.scss` (data URIs included; a `color-mix(…, transparent)` over tokens is the permitted
   form); the five image-valued dark variables are entries of the `$dark` map in `_tokens.scss`
   emitted by the dark-only `theme-assets` mixin, and `_theme.scss` holds scopes and includes
   alone; the emitted `url()` declarations are byte-identical to before (report 4's reading); the
   dark-partition proof and `THEME_DARK_ADDITIONS` are green.
9. **No data at proof module scope.** No proof file U3 owns declares a module-scope `const`;
   the moved constants (`PROBE_CASCADE` in `tests/setupBrowser.ts`; `BOOTSTRAP_VERSION`,
   `BOOTSTRAP_DIGEST`, and `CUSTOMIZATION_RECIPE` in `tests/setupStyles.ts`; `TOKEN_PREFIX` in
   `tests/setup.ts`) are exported `UPPER_SNAKE_CASE`, frozen where they are collections; the
   Bootstrap cascade text is read at case scope through `BOOTSTRAP_CASCADE_PATH` and sits at no
   module scope (report 4's D1, with its measured reason: a raw CSS import resolves to an empty
   string in the Node project); nothing at module scope in `tests/setup*.ts` is unexported or
   mutable data: the registry is the exported `SpecimenManager` class with `#nodes` and one
   exported instance `specimens`, the three free functions are gone, and every proof drives
   `specimens.mount`, `specimens.load`, and `specimens.clear`.
10. **Writing hits.** No "Both modes", "both modes", or "two projects" tally survives in
    `src/styles/_theme.scss` or `tests/setupStyles.ts`; a sweep of the changed prose for the
    substitution table, counts over growable sets, and time words finds nothing.
11. **The member-shape rule.** `text.secondary`, `text.tertiary`, and `surface.raised` are leaves
    of `TOKEN_NAMES` whose cascade tokens are `--vn-text-secondary`, `--vn-text-tertiary`, and
    `--vn-surface-raised`, declared three times each in the built cascade (`:root`, light, dark)
    with no `-base` form surviving anywhere under `src/`, `tests/`, or `guides/`; the guide's rule
    sentence states the convention the registry follows (a group's own colour takes the `base`
    member, a tierless colour takes no suffix) and the report's mixin reading supports it; the
    parity and partition proofs are green on the renamed tokens.
12. **Rival cleanup.** Every rival node the setup-browser proof creates through installed `render`
    or `mount` is removed in `finally`.
13. **The exclusion sentence.** The retained tables' TSDoc names why the text-valued tokens
    (`--vn-font-mono`, `--vn-surface-gradient`) sit outside both tables.
14. **Law over the diff.** No `any`, non-null assertion, type assertion beyond `as const`, `@ts-`
    directive, `eslint-disable`, default export outside a config file, nested function, or hidden
    declaration; readonly public shapes; TSDoc and guide prose under `writing.md`; parity under
    `documentation.md`.
15. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
    0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
    `test:distribution` green; `scaffold audit` reports no drift.
