<!-- Objective lane: analyst on GPT-6 Astra, thread 01a0d381-0b83-7111-9ae6-1b48c951e6a1, journal tmp/codex/label-contrast-design-analyst.jsonl (swept at acceptance), brief label-contrast-design-brief.md. -->

**Objective-lane proposal: compute label polarity in Sass, keep the bare-button mixer, and resolve the dark-primary direction conflict before implementation.**

The brief’s requirements cannot all hold literally. Dark primary requires a black label. Bootstrap’s default rule then tints that fill, while V11/P6 requires shading it. Bootstrap also overrides its default rule for `light` and `dark`.

Recommend the contrast-driven rule, retaining Bootstrap’s explicit neutral-role exceptions. Record dark-primary lightening as a palette-dependent departure. If V11/P6 must retain its darkening criterion, authorize an explicit dark-primary direction exception; do not describe that exception as following label polarity.

The evidence commands run from `/home/user/veneer-ct` were:

```sh
cat node_modules/bootstrap/scss/mixins/_buttons.scss node_modules/bootstrap/scss/_buttons.scss node_modules/bootstrap/scss/helpers/_color-bg.scss
sed -n '150,215p' node_modules/bootstrap/scss/_functions.scss
rg -n '\$min-contrast-ratio|\$color-contrast-(dark|light)|\$btn-(hover|active).*amount' node_modules/bootstrap/scss/_variables.scss
cat src/styles/_tokens.scss src/styles/_mixins.scss src/styles/_theme.scss
cat src/styles/components/_button.scss src/styles/elements/_button.scss src/styles/utilities/_color-bg.scss
```

These reads establish white-first selection at `4.5:1`, black fallback, label-dependent state direction, the neutral-role exceptions, and Veneer’s retained `12%` hover and `22%` active weights.

**Mechanism.** Keep the palette unchanged. In `_tokens.scss`, centralize the existing color literals as typed Sass values in `$palette`, `$grays`, and mode-keyed `$fills` maps. Emit the existing custom properties from those values. Resolve gray references through the same `$grays` entries; do not maintain a separate copied contrast palette or parse CSS `var()` expressions.

Add these functions in `_mixins.scss`:

| Function | Contract |
|---|---|
| `luminance($fill)` | Convert an opaque Sass color to sRGB, clip channels for measurement, and calculate relative luminance. Reject unresolved or translucent inputs. |
| `contrast-label($fill)` | Return the palette key `white` when white reaches `4.5:1`; otherwise return `black`. This owns the sole label-selection rule. |
| `state-mixer($label)` | Return `black` for a white label and `white` for a black label. |
| `mode-color($light, $dark)` | Return the shared expression when equal; otherwise emit `light-dark($light, $dark)`. |

Use Sass’s color conversion facilities rather than implementing OKLCH conversion. Those facilities are documented in the [Sass color module](https://sass-lang.com/documentation/modules/color/).

Compute each mode’s label from its fill. Compute hover and active fills from the resting label’s direction, then run those fills through the same label function. This matches Bootstrap’s separate selection of resting, hover, active, and disabled labels. The evaluated palette keeps its selected label across the proposed state weights.

Emit palette-token references into the existing `--bs-btn-*` properties and the utility’s `color` declaration. Use `light-dark()` only to select between already-computed results. `_theme.scss` already sets `color-scheme` on each explicit mode scope; the CSS function selects by the element’s color scheme. See [CSS Color’s mode-selection definition](https://www.w3.org/TR/css-color-5/#light-dark).

This adds no public CSS token and requests no D43 change. It also avoids ancestor-selector overrides that could select the wrong mode inside nested islands.

Keep `--vn-state-mixer` exclusively on the existing transparent-ground button treatments:

- `src/styles/elements/_button.scss`: the bare button’s hover and active declarations.
- `src/styles/components/_button.scss`: the base `.btn` hover and active properties.

Retain its light endpoint, `color(srgb 0.00742457 0.0232852 0.0925134)`, and its dark endpoint, `var(--vn-palette-white-base)`. Filled and outline variants stop reading that mixer.

In the button role loop, retain explicit endpoint overrides for `light` → black and `dark` → white, as Bootstrap’s loop does. These are state-direction exceptions, not another contrast calculation. Keep Veneer’s outline active mix as a recorded departure; Bootstrap’s outline active background is the unmodified role fill.

**Computed role resolution.** The following table reports opaque canonical fills. Contrast columns give the selected label’s resting ratio. The direction applies to filled hover and active states and Veneer’s outline active state; outline hover uses the base fill.

| Role | Light fill | Light label / ratio / direction | Dark fill | Dark label / ratio / direction |
|---|---|---|---|---|
| primary | `oklch(0.48 0.255 264)` | white / `7.132` / shade | `oklch(0.7 0.15 233)` | black / `8.122` / tint |
| secondary | `oklch(0.446 0.043 257.281)` | white / `7.564` / shade | `#6c757d` through gray-600 | white / `4.689` / shade |
| tertiary | `oklch(0.541 0.281 293.009)` | white / `5.881` / shade | same fill | white / `5.881` / shade |
| success | `oklch(0.527 0.154 150.069)` | white / `4.943` / shade | same fill | white / `4.943` / shade |
| info | `oklch(0.5 0.134 242.749)` | white / `5.854` / shade | same fill | white / `5.854` / shade |
| warning | `oklch(0.555 0.163 48.998)` | white / `5.051` / shade | same fill | white / `5.051` / shade |
| danger | `oklch(0.505 0.213 27.518)` | white / `6.420` / shade | same fill | white / `6.420` / shade |
| light | `#f8f9fa` through gray-100 | black / `19.922` / shade, explicit exception | same fill | black / `19.922` / shade, explicit exception |
| dark | `#212529` through gray-900 | white / `15.426` / tint, explicit exception | same fill | white / `15.426` / tint, explicit exception |

Dark primary’s proposed black label measures `8.943:1` on hover and `9.728:1` on active. An explicit shading exception would instead produce `6.365:1` and `5.117:1`, so darkening is feasible without changing the palette; it contradicts the default direction rule.

The utility paints rounded RGB triplets rather than the canonical OKLCH fill. The same calculation selects the same labels: dark primary measures `8.112:1`, info `5.856:1`, and warning `5.031:1`. Tertiary has no shipped `text-bg-*` class.

The following executed command read the literals and computed the table, state ratios, utility ratios, and shading alternative. Its controls returned `false` for white on white and `true` for black on white. These are numerical results, not rendered measurements.

```sh
node --input-type=module <<'NODE'
import {readFileSync} from 'node:fs';
import * as sass from 'sass';
const source=readFileSync('src/styles/_tokens.scss','utf8');
const luminance=rgb=>rgb.reduce((sum,c,i)=>sum+[.2126,.7152,.0722][i]*(c<=.04045?c/12.92:((c+.055)/1.055)**2.4),0);
const contrast=(rgb,label)=>label==='white'?1.05/(luminance(rgb)+.05):(luminance(rgb)+.05)/.05;
for(const mode of ['light','dark']){
 const values=source.split('$'+mode+': (')[1].split('\n);')[0];
 for(const role of ['primary','secondary','tertiary','success','info','warning','danger','light','dark']){
  const read=key=>values.match(new RegExp("'"+key+"': '([^']+)'"))?.[1]??source.match(new RegExp('--vn-color-'+key+': ([^;]+);'))?.[1];
  let fill=read(role)??read(role+'-base');
  if(fill.startsWith('var('))fill=source.match(new RegExp(fill.slice(4,-1)+': ([^;]+);'))[1];
  sass.compileString('a{x:measure('+fill+');}',{functions:{'measure($fill)':args=>{
   const raw=args[0].assertColor('fill').toSpace('srgb').channels.toArray();
   const clip=c=>Math.max(0,Math.min(1,c));
   const rgb=raw.map(clip), label=contrast(rgb,'white')>=4.5?'white':'black';
   const mixer=role==='light'?0:role==='dark'?1:label==='white'?0:1;
   const states=[0,.12,.22].map(p=>contrast(raw.map(c=>clip(c*(1-p)+mixer*p)),label).toFixed(3));
   const pair=read(role+'-rgb').split(',').map(Number).map(c=>c/255);
   console.log(mode,role,fill,label,mixer?'tint':'shade',states.join('/'),'text-bg',contrast(pair,label).toFixed(3));
   if(mode==='dark'&&role==='primary')console.log('primary shade alternative',...[.12,.22].map(p=>contrast(raw.map(c=>clip(c*(1-p))),label).toFixed(3)));
   return new sass.SassNumber(0);
  }}});
 }
}
console.log('controls',contrast([1,1,1],'white')>=4.5,contrast([1,1,1],'black')>=4.5);
NODE
```

**Sites and ownership.** Carry the implementation through these units after the direction ruling.

| Unit | Owned files and symbols | Ordering |
|---|---|---|
| LABEL-CONTRAST | `src/styles/_tokens.scss`: typed palette and fill maps; `src/styles/_mixins.scss`: calculation functions; `src/styles/components/_button.scss`: role loop; `tests/src/styles/mixins.test.ts`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/components/button.test.ts`, `tests/src/styles/elements/button.test.ts`, `tests/src/styles/tokens.test.ts`; affected button tables in `tests/setupStyles.ts` and their setup proofs | Start from landed THEME. Keep `_theme.scss` mode scopes and THEME’s retuned values intact. |
| UTIL-FRAMES, amended P9 scope | `src/styles/utilities/_color-bg.scss`: replace `$dark-labels`; `tests/src/styles/utilities/color-bg.test.ts`; `TEXT_BG_CASES` in `tests/setupStyles.ts` | Consume LABEL-CONTRAST’s functions. Serialize edits to shared setup files. Do not land a separate label rule. |
| LABEL-CONTRAST verification | Existing passive and utility scenarios in `tests/app/browser/integration.test.ts`; affected assertions and capture evidence | Run after the cascade change and the frames units land. Reuse their specimens and placements. |

Submit `guides/veneer.md` changes as a shared patch for serial integration.

FOCUS-FRAME retains focus placement and indicator ownership. FORMS-FRAMES retains forms specimens and the range hairline. PASSIVE-FRAMES retains button state specimens and frames. OVERLAY-FRAMES retains its capture work. Their source scopes do not require the contrast mechanism, but their final captures must use the integrated cascade. UTIL-FRAMES directly overlaps this design and needs the dependency stated in its brief.

These ownership boundaries were read with:

```sh
cat /home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-brief.md
cat /home/user/scaffold/.orkestrel/veneer/units/b-forms-frames-brief.md
cat /home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-brief.md
cat /home/user/scaffold/.orkestrel/veneer/units/b-overlay-frames-brief.md
cat /home/user/scaffold/.orkestrel/veneer/units/b-util-frames-brief.md
```

Other consumers can call `contrast-label()` with their actual fill. Do not route every white label through primary: `_nav.scss`, `_pagination.scss`, `_list-group.scss`, `_dropdown.scss`, and `_progress.scss` bind their active or bar backgrounds to `--vn-palette-blue`. Their fills differ from Veneer’s primary. Tables also calculate their own background mixes. Those sites require their actual backgrounds as inputs, not a role-name substitution.

**Proofs and defect closure.** Use the installed `measureContrast`, `measureLuminance`, and rendered contrast helpers from `@orkestrel/test/browser` as the independent browser instrument. Their declarations were read in `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`.

| Obligation | Proof and negative control |
|---|---|
| V11/P6 | Measure resting, hovered, pressed, `.active`, and checked primary luminance in dark mode. A darkening assertion remains red under the default rule. If the explicit exception is authorized, restoring the white variant endpoint must redden it. |
| P7 | Require black text and contrast at least `4.5:1` on dark filled primary, checked outline primary, and opaque `text-bg-primary`. Restoring the fixed white label must redden each affected case. |
| P9 | Require the selected label and contrast floor for every shipped pair in each mode. Restoring black labels for info and warning must redden their cases. |
| Bare-button veil | Compare bare `button` and base `.btn` rest/hover/active paint against their retained endpoints in each mode. Replacing the dark veil endpoint with black must redden the proof. |
| Mode selection | Exercise default mode, explicit modes, nested light/dark/light islands, and a mode attribute on the button itself. Replacing `light-dark()` with a fixed light result must redden dark primary. |
| Shared calculation | Exercise black, white, threshold boundaries, gray references, and out-of-gamut OKLCH inputs. Reject unresolved and translucent inputs. Compare emitted results with the independent contrast instrument. |
| Consumer contracts | Preserve utility opacity, utility/link precedence, button variable overrides, and forced-colors treatment. Preserve the canonical token registry exactly. |

Retain red-before-fix evidence and mutation logs. Replace the existing button tests that pin failing contrast ratios with contrast-floor assertions plus explicit direction assertions.

**Ledger changes.** Update the existing declaration keys rather than replacing their inventory status. The affected keys are:

- `.btn-{role}`: `--bs-btn-color`, `--bs-btn-hover-color`, `--bs-btn-active-color`, `--bs-btn-disabled-color`, `--bs-btn-hover-bg`, and `--bs-btn-active-bg`, wherever emitted values change.
- `.btn-outline-{role}`: `--bs-btn-hover-color`, `--bs-btn-active-color`, and `--bs-btn-active-bg`.
- `.text-bg-primary`, `.text-bg-info`, and `.text-bg-warning`: `color`.
- The tertiary addition descriptions, button bindings, and state-mixer documentation.

Keep the release values, selector keys, conditions, and unrelated dropped rows intact. Describe the palette-dependent direction departures, neutral exceptions, and any authorized dark-primary exception explicitly. The `text-bg-*` backgrounds retain their release-compatible opacity expressions.

The ledger semantics and bindings were read with:

```sh
sed -n '5990,6070p' guides/veneer.md
sed -n '6138,6168p' guides/veneer.md
sed -n '7941,7948p' guides/veneer.md
```

After implementation, reconcile exact emitted values through `npm run build:src && npm run test:conformance`; do not infer ledger cleanliness from this proposal.

**Blockers and risks.** V11/P6 needs the direction ruling stated at the start. A blanket “all variants follow label polarity” rule also conflicts with Bootstrap’s neutral exceptions.

Rendered mode selection remains unverified. The attempted `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node --input-type=module` browser probe failed during launch with `EROFS` while creating Playwright’s temporary artifact directory. Sass accepted the proposed expressions, but that does not prove browser behavior.

Compile-time selection covers the shipped opaque palette and default state weights. Arbitrary runtime fill overrides, palette endpoint overrides, background opacity, and changed state percentages can invalidate the selected label. Preserve the existing override interfaces and document the consumer’s obligation to retune the foreground with the fill.

The proposal preserves palette values and the engine-owned registry, supplies a shared calculation, and separates the veil from variant states. P7 and P9 have concrete closure criteria. V11/P6 cannot be claimed closed until its direction requirement is reconciled.