# F8 TAILWIND design round — `analyst` proposal (GPT-6 Astra, objective lane)

Journal `tmp/codex/f8-design-analyst.jsonl` (swept at acceptance), thread `01a0ca92-a8b1-7d43-9b1b-e8f5e540bd2e`, exit 0. Brief: `.orkestrel/veneer/units/f8-design-brief.md`.

Analyst lane: GPT-6 Astra, holding the objective lane.

**1. What a profile is.** Propose the following profiles, with support contingent on their browser proofs.

| Profile | Stylesheet entry | Effective layer order | Tailwind parts |
|---|---|---|---|
| Standalone | Published `@orkestrel/veneer/styles`, built from `src/styles/index.scss` | `theme, reset, base, elements, components, utilities` | None |
| Tailwind utilities | Consumer CSS recipe; proof entry `tests/fixtures/tailwind/utilities.css` | `theme, reset, base, elements, utilities, components` | `theme.css` and `utilities.css`; no Preflight |
| Tailwind Preflight | Consumer CSS recipe; proof entry `tests/setup.css` | `theme, reset, base, elements, utilities, components` | The complete `tailwindcss` import, containing theme, Preflight, and utilities |

The Tailwind profiles deliberately place `utilities` before `components`. Bootstrap utilities retain their own `!important`; normal Bootstrap component declarations then outrank normal Tailwind utilities. Keeping the standalone order for the combined profile would leave Tailwind’s `.container` above Veneer’s component declaration. The tradeoff belongs in the guide: normal Tailwind utilities can override bare-element defaults, but component declarations take precedence.

Evidence: terrain § C; [src/styles/_tokens.scss:4](/home/user/veneer/src/styles/_tokens.scss:4), [components/_container.scss:4](/home/user/veneer/src/styles/components/_container.scss:4), and terrain-3 § 1–2. The precedence argument follows the [CSS cascade layer rules](https://www.w3.org/TR/css-cascade-5/#layer-order); browser acceptance remains required.

**2. Where the profiles live.** Keep the published stylesheet independent of Tailwind. Make the consumer recipes the integration contract and keep their executable counterparts under `tests/`. Add no Tailwind entry or import under `src/styles/`, and declare no runtime, optional, or peer requirement.

Use `tests/setup.css` for the complete Tailwind profile, satisfying the scaffold requirement for a layer declaration before the Tailwind import and source directives. Use the composable entry for the profile without Preflight. Keep the standalone project’s stylesheet loading isolated from these entries.

Browser setup must expose the profile-loading operation; the styles project setup selects the entry and loads the compiled Veneer cascade. Do not add unconditional Tailwind imports to setup modules shared with standalone proofs. Preserve the fixed root setup-module set.

Evidence: terrain § B–C; [workspace.md:188](/home/user/scaffold/.claude/rules/workspace.md:188), [ROADMAP.md:27](/home/user/veneer/ROADMAP.md:27), [ROADMAP.md:167](/home/user/veneer/ROADMAP.md:167), and [package.json:40](/home/user/veneer/package.json:40). The installed tooling already belongs to `devDependencies` at [package.json:100](/home/user/veneer/package.json:100) and [package.json:110](/home/user/veneer/package.json:110).

**3. What “Bootstrap wins” proves.** Define the declaration rule per element, state, active condition, and resolved property. Where declarations compete, the combined profile must retain the value supplied by Veneer’s Bootstrap-compatible cascade, including its recorded token departures. Importance handles Bootstrap utilities; layer order handles normal component declarations. Resolve shorthand and logical-property interactions through the browser’s longhands.

Class-name membership alone is insufficient. Tailwind’s `.collapse` declares `visibility: collapse`, while Bootstrap’s closed-state rule declares `display: none`. These declarations never compete. Reordering layers leaves the open state invisible. Propose an explicit `visibility: inherit` declaration on the owning `.collapse` component, recorded as an addition and proved with closed, open, ancestor-hidden, and explicit visibility-utility cases. Do not introduce another `!important`. Also exercise `.col-*` inside Bootstrap rows and `.table` on its supported markup: Tailwind adds properties those Bootstrap rules do not declare.

Evidence: [Tailwind’s installed compiler:12](/home/user/veneer/node_modules/tailwindcss/dist/lib.mjs:12), [bootstrap.css:3354](/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.css:3354), and [bootstrap.css:853](/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.css:853).

Drive the complete shared-class proof as follows:

- Promote the supplied measurement unchanged into a tracked test fixture, retaining its version and provenance. Import `sharedClassNames`; never transcribe that list into TypeScript.
- Compile Tailwind against the oracle inventory. Verify that the resulting intersection equals the fixture’s membership, rather than checking only its size.
- Require every shared name to have a real Veneer subject, an emitted Tailwind rule, and a mounted browser case. Missing declarations, missing fixtures, and empty property comparisons fail.
- Compare the combined profile against a Veneer-only control under the same profile prelude. Independently retain the standalone project’s original-order proof. Use relevant component states, containing-block dimensions, and responsive boundaries.
- Read declarations and priorities through CSSOM, and read winners through `readStyle` or the applicable resolved-value reader. Include distinguishing token values and adverse controls where the libraries’ defaults coincide.
- Require controls that remove a Bootstrap priority, put Tailwind above components, omit a candidate from generation, and remove the collapse repair to fail the corresponding assertions.

The installed `findRule` returns a substring match, not the winning declaration. The installed `readLayers` reads background-color layers, not cascade-layer order. Use `readRules` with CSSOM layer statements and parent relationships for cascade structure. `scene` is the repository’s helper, not an installed export. Pass explicitly identified Veneer sheets to scoped readers: `readCascadeSheet` otherwise selects the first sheet containing a `theme` block, which Tailwind also supplies.

Evidence: [intersection.json:7](/home/user/scaffold/tmp/units/f8-tailwind-intersection.json:7), [the retained intersection probe:7](/home/user/scaffold/.orkestrel/veneer/units/f8-tailwind-intersection.mjs:7), [installed readers:1184](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1184), [installed readers:2147](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2147), [installed readers:2437](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2437), and [setupBrowser.ts:847](/home/user/veneer/tests/setupBrowser.ts:847).

**Rebaseline F8’s closing dependency.** The measured intersection is Bootstrap-versus-Tailwind, not shipped-Veneer-versus-Tailwind. Veneer’s barrel ends with the gutter utilities; it does not implement the whole measured vocabulary. Even the F6 checkout retains that limitation. Move final F8 acceptance behind `B-UTILITIES`, which follows the component work, while allowing profile infrastructure to land earlier. Do not shrink the proof to shipped names or substitute Bootstrap’s stylesheet for Veneer.

Evidence: [src/styles/index.scss:43](/home/user/veneer/src/styles/index.scss:43), [F6 index.scss:55](/home/user/veneer-f6/src/styles/index.scss:55), and [ROADMAP.md:267](/home/user/veneer/ROADMAP.md:267), [ROADMAP.md:276](/home/user/veneer/ROADMAP.md:276). This changes sequencing, not the full-set exit criterion.

**4. Reboot under Preflight.** Support Preflight as preserving Veneer’s declared Reboot treatments, not as producing an identical standalone page. Preflight’s normal rules occupy `base`, below `elements` and `components`; Veneer’s important hidden rule remains in the earlier `reset` layer. Preflight can still supply properties Veneer leaves unspecified. For example, Veneer’s bare SVG rule declares vertical alignment, while Preflight additionally makes SVG block-level. Document that difference and recommend the profile without Preflight when consumers want Veneer’s standalone baseline.

Evidence: terrain-3 § 5; [preflight.css:214](/home/user/veneer/node_modules/tailwindcss/preflight.css:214), [elements/_svg.scss:1](/home/user/veneer/src/styles/elements/_svg.scss:1), and [_reset.scss:1](/home/user/veneer/src/styles/_reset.scss:1). Tailwind documents the [composable imports and Preflight omission](https://tailwindcss.com/docs/preflight#disabling-preflight).

Drive every element in `preflightRebootOverlap` through a property matrix. Require membership equality between that fixture and the cases. The matrix must cover these treatments:

| Elements | Resolved assertions |
|---|---|
| `a`, `abbr` | Color, decoration, and applicable cursor treatment; include `abbr[title]` |
| `b`, `strong`, `small`, `h1`–`h6` | Weight, size, line height, and declared margins |
| `code`, `kbd`, `pre`, `samp` | Font family, size, and declared spacing |
| `sub`, `sup` | Size, line height, alignment, and positional offsets |
| `ol`, `ul` | List markers, padding, and margins |
| `button`, `input`, `select`, `textarea`, `optgroup` | Declared typography, spacing, borders, background, appearance, and resize treatment; use valid control contexts and applicable attributes |
| `hr`, `img`, `svg`, `iframe`, `table`, `progress`, `summary` | Declared dimensions, borders, alignment, display, and table treatment |

Include Preflight’s universal reset in these comparisons. Add document, body, pseudo-element, and hidden-attribute cases outside the tag intersection: the supplied tag list does not enumerate those effects. Assert documented Preflight-only differences separately so they cannot disappear behind a declaration-overlap check.

Evidence: [intersection.json:312](/home/user/scaffold/tmp/units/f8-tailwind-intersection.json:312), [preflight.css:7](/home/user/veneer/node_modules/tailwindcss/preflight.css:7), [preflight.css:396](/home/user/veneer/node_modules/tailwindcss/preflight.css:396), and terrain § D.

**5. Build and project ownership.** Use the installed `@tailwindcss/postcss` plugin only in a dedicated `src:tailwind` Vitest project declared in root `vite.config.ts`. Keep the production styles build and existing standalone `src:styles` project free of that plugin.

Place profile compositions in separate browser test files under `tests/src/styles/tailwind/`, using the reserved `integration.test.ts` filename within each profile directory. Give each profile a fresh document, load its prelude before either library establishes layers, and exclude those files from the standalone project’s glob. A later layer statement cannot repair an earlier, wrong order.

Add `test:src:tailwind`, build the real Veneer stylesheet before that project runs, and reach the script from `test:src`. The journey remains an application proof rather than the owner of exhaustive stylesheet compatibility.

The source directives must include `tests/fixtures/oracle/inventory.json`, authored profile fixtures, and the relevant `src` and `app` sources. Resolve paths relative to each stylesheet. Do not rely on runtime construction of class strings to generate the collision set. Verify generation membership from the emitted CSS. Keep compiler imports in configuration, because the existing source sweep also checks test modules for forbidden Tailwind imports.

Evidence: terrain § A; [PostCSS README:47](/home/user/veneer/node_modules/@tailwindcss/postcss/README.md:47), [vite.styles.config.ts:47](/home/user/veneer/configs/src/vite.styles.config.ts:47), [package.json:61](/home/user/veneer/package.json:61), and [conformance.test.ts:157](/home/user/veneer/tests/conformance.test.ts:157). Tailwind’s [source detection documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files) explains explicit source registration.

**6. Guide obligations.** Add the profile table, precedence tradeoff, shared-class guarantee, Preflight differences, supported Tailwind version, and exact test command under § Styles. Preserve F6’s important-utility escape: reopen the utility’s own layer and supply the consumer’s own important declaration.

The complete consumer recipe is:

```css
@layer theme, reset, base, elements, utilities, components;
@import 'tailwindcss';
@import '@orkestrel/veneer/styles';

@source './src';
```

The consumer recipe without Preflight is:

```css
@layer theme, reset, base, elements, utilities, components;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
@import '@orkestrel/veneer/styles';

@source './src';
```

Here, `./src` names the consumer’s source directory relative to the entry stylesheet. Require the entry to precede other imports of either library. Bound support to ordinary, unprefixed Tailwind generation; the global `important` modifier and arbitrary consumer layer reorderings are outside these profiles.

Replace the deferred `tests/setup.css` paragraph and update the setup-loading description. Under § Compatibility, add obligations keyed to the existing Bootstrap components, with executable proof references; place the general profile table under § Styles. An unrelated table under § Compatibility would break its reader, which expects the ledger’s fixed columns.

Evidence: [F6 guide:149](/home/user/veneer-f6/guides/veneer.md:149), [guide:224](/home/user/veneer/guides/veneer.md:224), [guide:448](/home/user/veneer/guides/veneer.md:448), and [setupServer.ts:674](/home/user/veneer/tests/setupServer.ts:674).

**7. Risks and acceptance.** The highest risks are incomplete vocabulary, additive collisions, same-value false positives, stylesheet contamination, and Tailwind entering the published artifact. Acceptance must require the complete shared membership, an observable winner for every applicable property, working component states, the full Reboot matrix, independent profile documents, and a packed standalone consumer without Tailwind installed. Retain the original standalone layer-order assertion.

Evidence: [styles/index.test.ts:19](/home/user/veneer/tests/src/styles/index.test.ts:19), [distribution.test.ts:1017](/home/user/veneer/tests/distribution.test.ts:1017), and [ROADMAP.md:240](/home/user/veneer/ROADMAP.md:240). Browser results are acceptance work on the host; this read-only analyst lane cannot establish them.

The proposed units separate profile infrastructure from the source prerequisites and final acceptance. Shared files remain report-only for executors and receive serial integration.

| Unit | Owned files | Shared files | Depends on | Acceptance criteria | Risks |
|---|---|---|---|---|---|
| F8 Profiles | `tests/setup.css`; `tests/fixtures/tailwind/utilities.css`; promoted intersection fixture | `vite.config.ts`; `package.json`; `configs/src/vite.styles.config.ts`; fixed setup modules | F5c, F6 | Profiles compile with installed PostCSS tooling; source discovery emits the measured intersection; production build receives no Tailwind processing; standalone collection excludes profile files | Wrong first layer declaration; accidental global setup import |
| F8 Vocabulary prerequisite | Existing component and utility units retain ownership of their source and mirrored proofs | `src/styles/index.scss`; guide accounting | Existing B-unit chain through B-UTILITIES | Every measured shared name exists in Veneer and has a real subject; no filtering, skipping, or Bootstrap replacement stylesheet | Treating upstream inventory as shipped coverage |
| F8 Collision semantics | `src/styles/components/_collapse.scss`; its mirrored proof | Guide additions and compatibility ledger | B-COLLAPSE, F8 Profiles | Closed and open collapse states retain Bootstrap behavior with Tailwind loaded; ancestor visibility and explicit utility control remain valid; no added `!important` | Disjoint properties evade ordinary winner checks |
| F8 Browser proofs | Profile `integration.test.ts` files under `tests/src/styles/tailwind/` | Fixed setup modules and their proofs; existing styles integration proof | F8 Profiles, vocabulary prerequisite, collision semantics | Complete shared-class and Reboot matrices pass for each profile; adverse controls fail; Tailwind-only utilities also demonstrably work; sheet identity and isolation are proved | Empty intersections; equal defaults; wrong stylesheet selected |
| F8 Guide | `guides/veneer.md`; applicable `guides/README.md` links and authored guide proofs | `ROADMAP.md` | Browser proofs | Recipes reproduce the tested profiles; precedence and Preflight limits are explicit; deferred setup wording is removed; ledger readers and parity remain green | Prose promises more than the browser proves |
| F8 Acceptance | No implementation files; retained host evidence | Entire integrated change, read-only | All preceding units | Host runs scoped profile and standalone suites, conformance, guide parity, packed standalone consumption, then required gates; manifest and shipped CSS contain no Tailwind requirement or bundled Tailwind | Browser-inaccessible evidence mistaken for acceptance; published CSS contamination |

PROPOSAL: Prove Standalone, Tailwind utilities, and Tailwind Preflight through isolated consumer entries, place normal Tailwind utilities below Bootstrap components, repair additive class collisions explicitly, and close F8 only after the complete shared vocabulary and browser proofs pass.