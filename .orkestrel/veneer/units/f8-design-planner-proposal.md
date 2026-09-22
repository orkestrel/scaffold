# F8 TAILWIND design round — `planner` proposal (Opus, subjective lane)

Native `planner` subagent on Opus (served as Opus 5 by CLI 2.1.278; see ROADMAP § Routing), clean context. Brief: `.orkestrel/veneer/units/f8-design-brief.md`.

I hold the SUBJECTIVE lane.

## 1. What a profile is

**Ruling.** A **profile** is one complete set of stylesheets a document loads, named for the Tailwind part that distinguishes it. Veneer has three, and they differ only in which Tailwind imports the consumer entry carries — never in layer order, and never in what Veneer ships.

| Profile      | Entry carries                                                                                          | Layer order declared                                    | Tailwind parts     | Status                                               |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------ | ---------------------------------------------------- |
| `standalone` | `@orkestrel/veneer/styles` alone                                                                        | `theme, reset, base, elements, components, utilities`   | none               | the product                                          |
| `utilities`  | the order line, `tailwindcss/theme.css` and `tailwindcss/utilities.css` in their layers, then the cascade | the same line                                            | theme, utilities   | the recommended combination                          |
| `preflight`  | the order line, the bare `@import 'tailwindcss'`, then the cascade                                      | the same line                                            | theme, preflight, utilities | supported with a recorded departure table |

One layer-order line serves every profile, because it is the order Veneer's own cascade already declares at `/home/user/veneer/src/styles/_tokens.scss:4` and asserts at `/home/user/veneer/tests/src/styles/index.test.ts:33`. Tailwind's own `@layer theme, base, components, utilities` (terrain 3, item 1: `index.css:1`) is a subsequence of that line, so the merge is a no-op and Veneer's order stands. This is the design's core simplification: the consumer copies one order line and never edits it again; adding or dropping preflight changes an import, not a cascade.

`standalone` is the existing `src:styles` project and needs no new build: `/home/user/veneer/configs/src/vite.styles.config.ts:46` names the project and `:52` loads `./dist/src/styles/index.css` as a setup file. F8 owes `standalone` one new thing — a case in that project proving no Tailwind sheet reaches that document, so the promise stays true as the tree grows rather than by care.

Preflight is out of the recommended profile. Under the merged order Tailwind's preflight lands in `base`, which sits after Veneer's `reset` and before `elements` (`_tokens.scss:4`), so every property Bootstrap's reboot declares is overridden back by Veneer's `elements` layer. What survives is what preflight declares and Bootstrap's reboot does not: `ol, ul { list-style }` (terrain 3, `preflight.css:202` and `:203`) against a reboot that declares only `padding-left` for those tags (terrain report § D, `inventory.json:3341` and `:3355`), and `img { display }` (terrain 3, `preflight.css:214`) against a reboot that declares only `vertical-align` (§ D, `inventory.json:3959`). That is the reason the profile is named and measured rather than recommended, and it is the same collision Elements and Mailbox absorbed by writing reversal rules (`/home/user/elements/tests/src/styles/elements/_lists.test.ts:33`; `/home/user/mailbox/tests/src/styles/_base.test.ts:407`).

**Veneer ships no rule whose reason is Tailwind.** A reversal rule in `src/styles` would shape the standalone product around a dependency the tenet forbids requiring (`/home/user/veneer/ROADMAP.md:41`). The preflight profile's consequences are recorded in the guide and pinned by a proof; they are never patched in the cascade.

## 2. Where the profile lives

**Ruling.** The Tailwind profiles live in `tests/` only. Veneer publishes no Tailwind-shaped entry and adds no export subpath. The consumer-facing product is a recipe fence in `guides/veneer.md` § Styles, and the test-side files carry the same load-bearing lines so the recipe is executed rather than asserted.

- `tests/setup.css` — the `utilities` profile: the order line, the theme and utilities imports in their layers, `@source '../src/styles'`. This is the file `.claude/rules/workspace.md:188` names, and it carries the recommended profile because that is the one a consumer copies.
- `tests/fixtures/tailwind/preflight.css` — the `preflight` profile: the same order line, the bare `@import 'tailwindcss'`, the same `@source` target.

The `@source` rule points at `/home/user/veneer/src/styles` — Veneer's own SCSS, where every Bootstrap class name it ships appears as a selector. The generated Tailwind utility set is therefore derived from Veneer's shipped names, which is what makes the shared-class proof self-updating as later `B` units ship more of the record. Elements takes the same target (`/home/user/elements/tests/setup.css:26`).

Two departures from the workspace rows follow, and § Departures from the workspace rows already holds their home (`/home/user/veneer-f6/guides/veneer.md:458`, with the deferral bullet at `:495` to `:498` rewritten as the landed rows):

- `tests/setup.css` is wired into the Tailwind project alone, not into `tests/setupBrowser.ts` or `tests/setupStyles.ts`. The row's wiring would put Tailwind in `src:browser`, `app:browser`, `app:showcase`, `app:journey`, and `src:styles`, and the standalone profile would stop being standalone.
- The bare `@import 'tailwindcss'` the row names sits in the preflight fixture rather than in `setup.css`, because the canonical file carries the recommended profile.

## 3. Bootstrap wins

**Ruling.** "Bootstrap's declaration wins" is a property-level rule, not a class-level one, and the proof partitions the derived shared set into three cases and asserts the right thing in each.

| Case                                                     | What decides                                                                 | What the guide says                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Same property, Veneer's declaration important             | importance, which beats a normal declaration at any layer position           | Veneer's value stands; no layer order can change it                      |
| Same property, Veneer's declaration normal                | layer order; `utilities` is last, so Tailwind's utility wins unless Veneer's rule is more specific | each such name is a recorded row, with the property and the winner       |
| Different property                                        | nothing; both apply                                                           | each such name is a recorded row, because Tailwind's declaration is additive |

The third case is the one the D2 and D6 wording does not reach, and it is where a consumer gets hurt: `collapse` is in the measured shared set (`f8-tailwind-intersection.json:43`), Bootstrap's `.collapse:not(.show)` controls `display`, and Tailwind's `collapse` utility sets `visibility`, so an expanded Bootstrap collapse under that profile is present and invisible. A proof that reads only "did Bootstrap's property keep its value" passes over that. The guide's existing sentence at `/home/user/veneer-f6/guides/veneer.md:152` stays and gains the additive case beside it.

**How the set is derived.** Never from a literal list. At run time the proof reads the loaded Tailwind sheet's rules through the installed readers, keeps every selector of the exact form `.NAME`, and intersects that with the selectors the Veneer cascade sheet declares — `readCascadeSheet` and `collectNestedRules` already do that walk (`/home/user/veneer/tests/setupBrowser.ts:847` and `:878`). The Orchestrator's measurement is the calibration floor, not the input: the proof asserts the derived set contains `container`, `collapse`, `table`, `gap-0`, and `rounded`, and is no smaller than the 209 names that probe recorded for Tailwind 4.3.3 (`f8-tailwind-intersection.json:218`, measured by `f8-tailwind-intersection.mjs` on 2026-09-22), so a `@source` rule that scans nothing fails loudly instead of passing vacuously.

**What the proof reads.** A differential in one document. Mount the element with the class, read `getComputedStyle` for every property the Veneer cascade's rule for that name declares, load the profile sheet through `scene.load` (`/home/user/veneer/tests/setupBrowser.ts:778`, which appends to `document.head` and records the removal, the position a consumer's sheet occupies), read again, and compare. `scene.clear` in `afterEach` returns the page, the way `/home/user/veneer/tests/src/styles/index.test.ts:14` already does.

**The mutation that makes it fail.** A planted sheet declaring `@layer utilities { .gap-0 { gap: 99px } }` must leave the shipped value in place, and the same rule with `!important` must move it. That pair distinguishes a reading that detects a winner from a reading that cannot: it is the same plant discipline the tree already uses at `/home/user/veneer/tests/src/styles/index.test.ts:41`, and it is the executed form of the escape paragraph at `/home/user/veneer-f6/guides/veneer.md:155` to `:170`.

## 4. The reboot under preflight

**Ruling.** The preflight profile keeps every property Bootstrap's reboot declares, because Veneer's `elements` layer sits after `base`; and it adds properties Bootstrap's reboot does not declare, which are the profile's recorded departures. Both halves are asserted per element, over the elements the Orchestrator measured as overlapping (`f8-tailwind-intersection.json:312` to `:344`, 31 elements on 2026-09-22).

Per element the proof mounts the bare tag, reads the standalone values, loads the preflight profile sheet, and reads again:

- every property the reboot record declares for that tag resolves to the same value — a failure here is a layer-order defect, not a departure;
- every property that moved is a row in the guide's preflight departure table, keyed by tag, property, standalone value, and profile value. An unrecorded moved property reddens the gate, and a recorded row that stopped moving reddens it as a stale row.

That second gate is what keeps the table honest across a Tailwind bump, and it is the same shape as the accounting gates F5b lands (`/home/user/veneer/ROADMAP.md:263`).

The guide states the ruling plainly: the recommended profile is preflight-free; a consumer who keeps preflight keeps Bootstrap's reboot values and receives Tailwind's extra resets, listed in full.

## 5. The build and the projects

**Ruling.** Compile with `@tailwindcss/postcss` in a package-owned Vite wrapper, in a new `src:tailwind` project, run through `--config`.

- **Plugin.** `@tailwindcss/postcss` `^4.3.3` is installed (`/home/user/veneer/package.json:100`, `tailwindcss` at `:110`), and the fleet attaches it in `css.postcss` (`/home/user/elements/vite.config.ts:164` and `:185`; `/home/user/mailbox/vite.config.ts:162`). Refuse `@tailwindcss/vite`: it is not installed, adding it is a package the user did not request, and Elements records that the Vite plugin skips Sass output (`/home/user/elements/guides/styles.md:203`). Refuse a `node` probe as the proof: the tenet requires the browser (`/home/user/veneer/ROADMAP.md:42`), and a probe compiles CSS without ever resolving a cascade.
- **Project.** `configs/src/vite.tailwind.config.ts`, spreading `srcBrowser()` and replacing the differing fields by assignment, the way the styles wrapper does (`/home/user/veneer/configs/src/vite.styles.config.ts:17` to `:21`, with the reason at `:12` to `:16`). Its `test.name.label` is `src:tailwind`, its `include` is `tests/src/tailwind/**/*.test.ts`, and its `setupFiles` mirror the styles project's, ending in `./dist/src/styles/index.css`. The root `vite.config.ts` is scaffold-content-owned (`/home/user/veneer/ROADMAP.md:216`), so the project is not registered there and the script reaches it with `--config`, exactly as the guide records for `src:styles` (`/home/user/veneer-f6/guides/veneer.md:483` to `:488`).
- **Script.** `test:src:tailwind` builds the cascade first and then runs the config, matching `/home/user/veneer/package.json:64`. `test:src` gains it beside `test:src:styles` (`:61`).
- **Why not `src:styles`.** That project's document must stay Tailwind-free; it is the standalone proof. Separation by project is what makes the standalone promise structural instead of careful.
- **Loading a profile per case.** Import each profile file with Vite's `?inline` query so the proof holds the compiled text and loads it through `scene.load`. The tree already imports built CSS as text (`/home/user/veneer/tests/src/styles/elements/input.test.ts:5` uses `?raw`), and `?raw` is the wrong query here because it returns the uncompiled `@import`. If `?inline` does not run the PostCSS chain under Vitest browser mode, the fallback is one project per profile, each importing its profile file from a setup entry. The Orchestrator settles that before F8a is briefed.

## 6. The guide

**Ruling.** § Styles owns the entire Tailwind contract. § Compatibility owes nothing: its Component column carries an inventory key and its rows replay Bootstrap's recorded engine (`/home/user/veneer-f6/guides/veneer.md:964` to `:967`), and Tailwind is in neither record.

§ Styles gains a `### Tailwind` subsection after § Files (`/home/user/veneer-f6/guides/veneer.md:172`), carrying:

- the profile table from question 1, each row naming its entry and its proof;
- one copyable recipe fence: the order line, the profile's Tailwind imports, `@source`, then `@import '@orkestrel/veneer/styles'`, with the sentence that the order line never changes between profiles;
- the shared-class rule as the three cases of question 3, written as prose for the important case and as tables for the normal-declaration and additive cases, attached to the important-utility paragraph already at `:149` to `:153`;
- the preflight ruling and its departure table;
- the sentence that Veneer ships no rule whose reason is Tailwind.

The deferral bullet at `:495` to `:498` becomes the two landed departure rows of question 2. § Tests (`:1150`) gains the new proof files beside the layer-order entry at `:1167`.

## 7. Risks

The risks and the criterion that catches each are in the unit table's Risks column. The one to read first: `readCascadeSheet` selects a sheet by its `theme` layer block and calls that Veneer's own signature (`/home/user/veneer/tests/setupBrowser.ts:838` to `:843`), and Tailwind's compiled sheet declares a `theme` layer block too (terrain 3, item 1: `index.css:3`). In the Tailwind project that reader can return Tailwind's sheet, and every reading taken through it would then describe the wrong stylesheet while reading normal.

## Units

`guides/veneer.md` is owned by each unit in turn; the units are serial, one writer in the Veneer checkout. `ROADMAP.md` is report-only in every brief.

| Unit               | Role and engine                    | Owned files                                                                                                                                                                              | Shared files                                       | Depends on | Acceptance criteria                                                                                                                                                                                                                                                                                                                                                                                                                                 | Risks                                                                                                                                                                                                                              |
| ------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F8p IMPORT-FORM    | Orchestrator on Opus 5.5, probe    | a scratchpad probe script and its log                                                                                                                                                    | none                                                 | F5c, F6    | The probe records: the `layer()` import form for `tailwindcss/theme.css` and `tailwindcss/utilities.css` compiles under `@tailwindcss/postcss` 4.3.3 and lands its rules in the named layers; `?inline` returns PostCSS-processed text under Vitest browser mode; `@source '../src/styles'` generates a utility for `gap-0`, `container`, and `rounded`. Each reading is pasted with the command that produced it.                                     | The composable import form is unstated in the installed files (terrain 3, item 2), so reasoning about it would enter three briefs as a fact. A probe that only compiles, without reading the emitted layer, settles half the question. |
| F8a PROFILES       | `opus` on Opus 5.5                 | `tests/setup.css`, `tests/fixtures/tailwind/preflight.css`, `configs/src/vite.tailwind.config.ts`, `package.json` scripts, `tests/src/tailwind/profiles.test.ts`, `tests/src/styles/index.test.ts`, `guides/veneer.md` | `tests/setupBrowser.ts`, `tests/setupStyles.ts`     | F8p        | `npm run test:src:tailwind` exits 0. Each profile sheet loads and its declared layer order reads `theme, reset, base, elements, components, utilities`, identical between the two files. The Tailwind sheet carries a rule for `gap-0`. The reader that selects the Veneer cascade returns a sheet carrying a Veneer-only rule while the Tailwind sheet is loaded, proved by a plant. A case in `src:styles` fails when a Tailwind profile sheet is loaded into that document. The guide's profile table, recipe fence, and the two workspace departure rows land. | The `theme` layer collision can make the cascade reader return Tailwind's sheet. The `?inline` fallback is one project per profile. Scaffold content-owns the root `vite.config.ts`, so registration belongs in the wrapper alone. |
| F8b SHARED         | `opus` on Opus 5.5                 | `tests/src/tailwind/shared.test.ts`, `guides/veneer.md`                                                                                                                                  | `tests/setupBrowser.ts`, `tests/setupStyles.ts`     | F8a        | The derived shared set is read from the loaded sheets, contains `container`, `collapse`, `table`, `gap-0`, and `rounded`, and is no smaller than the measurement recorded on 2026-09-22. Every name lands in one of the three cases. Each important-utility name resolves to its standalone value under both Tailwind profiles. Each normal-declaration name and each additive name has a guide row naming the property and the winner, and an unrecorded name reddens the gate. The plant pair — the non-important override that must not move the value and the important override that must — both behave as stated. | A class-level reading passes over the additive case and reports green. A set derived from a scan that found nothing passes vacuously. A name whose two declarations share a value hides a real loss; the floor names and the plant pair are what catch it. |
| F8c PREFLIGHT      | `opus` on Opus 5.5                 | `tests/src/tailwind/preflight.test.ts`, `guides/veneer.md`                                                                                                                               | `tests/setupBrowser.ts`, `tests/setupStyles.ts`     | F8b        | For each of the measured overlapping elements, every property Bootstrap's reboot declares resolves to its standalone value under the preflight profile. Every property that moved has a departure row keyed by tag, property, standalone value, and profile value. An unrecorded moved property and a stale row each redden the gate, each proved by a plant. `src/styles/**` is off-limits, so no reversal rule lands. The guide's preflight ruling and the sentence that Veneer ships no rule whose reason is Tailwind land. | A property that fails to survive tempts a reversal rule in the cascade, which would shape the standalone product around Tailwind. The honest close is a layer-order correction or a departure row, and the off-limits scope is what enforces it. |

## Tensions for the other lane

The profile name `utilities` collides with the layer name `utilities`. I kept it because each profile is named for the Tailwind part that distinguishes it, which is the mapping a reader can derive rather than remember. Rule on the collision.

`tests/setup.css` carrying the preflight-free profile departs from the workspace row's bare `@import 'tailwindcss'`. I chose the recommended profile for the canonical file. The alternative is the row's literal form, with the recommended profile in the fixture.

## Alternatives

**One supported profile, preflight declared unsupported with no proof.** Cost: the import a Tailwind consumer writes by default is unmapped, and the tenet names resets as an axis the consumer must keep deliberate control over (`/home/user/veneer/ROADMAP.md:42`), so the reset axis is ruled without evidence. The recommended design costs one more proof file and closes it with measurements.

**A published consumer entry, `src/styles/tailwind.css`, behind a second export subpath.** Cost: `@import 'tailwindcss'` enters the published surface, so the manifest advertises a coupling the runtime tenet forbids (`/home/user/veneer/ROADMAP.md:27`), and a consumer without Tailwind who resolves that subpath fails to build. The guide recipe carries the identical text with no coupling, and the test-side profile files execute it.

PROPOSAL: Name three profiles — `standalone`, `utilities`, `preflight` — that share one layer-order line and differ only in which Tailwind parts the consumer entry imports, prove the Tailwind two in a package-owned `src:tailwind` project whose shared-class set is derived from the loaded sheets and partitioned into important, layer-decided, and additive cases, and keep every Tailwind-shaped file in `tests/` so the standalone product ships no rule whose reason is Tailwind.
