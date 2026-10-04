# Tailwind flip probe report

The measured differences qualify the design predictions. Every result in this report comes from the probe runs recorded in the execution table. Values in triples are ordered Bootstrap, unexcluded Tailwind plus Bootstrap, and the tuned Tailwind recipe.

Chromium: 141.0.7390.37. Host: Linux, Node v22.22.2. The browser launches at the pinned executable. The static server binds to 127.0.0.1 on an ephemeral port and serves dist/app/browser. No external network is used.

The execution results record process exits and byte comparisons of the complete per-probe JSON files.

| Probe | Expected | Measured | Mark |
| --- | --- | --- | --- |
| P1 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 4.285 s; run 2: exit 0, 4.432 s; cmp exit 0 | pass |
| P2 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 2.982 s; run 2: exit 0, 2.706 s; cmp exit 0 | pass |
| P3 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 880.074 s; run 2: exit 0, 852.888 s; cmp exit 0 | pass |
| P4 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 29.412 s; run 2: exit 0, 29.260 s; cmp exit 0 | pass |
| P5 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 8.128 s; run 2: exit 0, 8.132 s; cmp exit 0 | pass |
| P6 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 7.748 s; run 2: exit 0, 7.620 s; cmp exit 0 | pass |
| P7 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 8.325 s; run 2: exit 0, 8.262 s; cmp exit 0 | pass |
| P8 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 7.818 s; run 2: exit 0, 8.816 s; cmp exit 0 | pass |
| P9 | two exit-0 runs; cmp exit 0 | run 1: exit 0, 11.577 s; run 2: exit 0, 11.574 s; cmp exit 0 | pass |

The probe files, helper files, copied Sass, sheets, and records all live under tmp/probes/flip2. Run snapshots are out/pN.run1.json and out/pN.run2.json; out/pN.json holds the second result. The execution table covers the final repeat runs. Compiler errors are observations and do not make a probe exit nonzero. P1 measures the requested two-class seed configuration. The final P2 and P5–P8 repeats use the last P3 iteration’s tuned sheet and recipe. The canonical sheets match the saved final iteration byte for byte, as recorded in restore-check.json. Every requested probe and P9 command ran to completion.

The probe verdicts summarize the measured differences.

| Probe | Verdict | Finding |
| --- | --- | --- |
| P1 | differs | 73 reset-layer rules versus 74 expected; the original datalist rule and its curated copy are unlayered. Default digests match; 199 utility rules are withheld. |
| P2 | differs | 18 additional declaration rows after removing theme, base, and utilities; 1 removed declaration. First statement, exclusions, and mt-3 emission match. |
| P3 | differs | 214550 preflight-attributed departures remain after 3 passes; 194 repair rows, 169 outside the seed; 0 state errors. |
| P4 | differs | 1280px: 1188 longhand departures, 0 box departures; 390px: 1188 longhand departures, 0 box departures |
| P5 | differs | 768px .text-center.text-md-start text-align: expected ["left","left","start"], measured ["left","left","left"] |
| P6 | differs | All requested candidates emit alone and in the full set. Until-found reads flex / hidden on all faces; Bootstrap and unexcluded were predicted to read none / hidden. |
| P7 | matches | The tables compare every panel style attribute, requested inline and computed property, and body padding-right. |
| P8 | matches | 0 readings depart from the declared dark-mode ownership expectation. Shared border, shadow, radius, background, and text readings appear in the table. |
| P9 | matches | Command exits in requested order: 0, 1, 0, 1. Formatting and Sass ordering fail; the source is restored. |

## P2 — Recipe composition

The table compares the recipe after removing exactly the theme, base, and utilities blocks named by the brief. Tailwind property-initialization rows remain in this comparison.

| Reading | Expected | Measured | Mark |
| --- | --- | --- | --- |
| first statement | @layer properties; | @layer properties; | pass |
| @source survives | false | false | pass |
| utilities .collapse | false | false | pass |
| utilities .container | false | false | pass |
| utilities .table | false | false | pass |
| utilities .col-1 | false | false | pass |
| utilities .mt-3 | true | true | pass |
| flattened removed declarations | .dropstart .dropdown-toggle::after display: inline-block | [{"context":"@layer bootstrap","selector":".dropstart .dropdown-toggle::after","property":"display","value":"inline-block","priority":""}] | pass |
| other added declarations | [] | [{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-space-y-reverse","value":"0","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-divide-y-reverse","value":"0","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-border-style","value":"solid","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-tracking","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-shadow","value":"0 0 #0000","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-shadow-color","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-shadow-alpha","value":"100%","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-inset-shadow","value":"0 0 #0000","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-inset-shadow-color","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-inset-shadow-alpha","value":"100%","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-color","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-shadow","value":"0 0 #0000","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-inset-ring-color","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-inset-ring-shadow","value":"0 0 #0000","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-inset","value":"initial","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-offset-width","value":"0px","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-offset-color","value":"#fff","priority":""},{"context":"@layer properties &gt; @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))","selector":"*, ::before, ::after, ::backdrop","property":"--tw-ring-offset-shadow","value":"0 0 #0000","priority":""}] | differs |
| sequence after known rewrite | true | false | differs |

The tuned sheet yields 8814 declaration rows in this run; the recipe yields 8831 after Tailwind-owned layers are removed. Empty layer blocks and layer statements contain no declaration rows.

## P5 — Reading triples

The shipped specimens are selected through their labelled figures. Missing heading, card, icon, and border-width specimens are built in a separate scratch page with the same sheets, root font, theme, and viewport. The responsive alignment graft is read at 768 px.

| Specimen / subject | Longhand | Width | Source | Expected triple | Measured triple | Mark |
| --- | --- | --- | --- | --- | --- | --- |
| Tailwind padding on a Bootstrap button / button | padding-left | 1280 | shipped page | ["12px","32px","32px"] | ["12px","32px","32px"] | pass |
| Shared spacing and radius follow Tailwind / .mt-3 | margin-top | 1280 | shipped page | ["16px","16px","12px"] | ["16px","16px","12px"] | pass |
| Shared spacing and radius follow Tailwind / .gap-4 | column-gap | 1280 | shipped page | ["24px","24px","16px"] | ["24px","24px","16px"] | pass |
| Shared spacing and radius follow Tailwind / span.rounded | border-top-left-radius | 1280 | shipped page | ["6px","6px","4px"] | ["6px","6px","4px"] | pass |
| Collapse stays visible / .collapse | display | 1280 | shipped page | ["block","block","block"] | ["block","block","block"] | pass |
| Collapse stays visible / .collapse | visibility | 1280 | shipped page | ["visible","collapse","visible"] | ["visible","collapse","visible"] | pass |
| Container keeps Bootstrap's widths / .container | padding-left | 1280 | shipped page | ["12px","12px","12px"] | ["12px","12px","12px"] | pass |
| Container keeps Bootstrap's widths / .container | max-width | 1280 | shipped page | ["1140px","1280px","1140px"] | ["1140px","1280px","1140px"] | pass |
| Pill radius beside rounded-full / button | border-top-left-radius | 1280 | shipped page | ["800px","800px","800px"] | ["800px","800px","800px"] | pass |
| Tailwind grid in a card body / .grid | display | 1280 | shipped page | ["block","grid","grid"] | ["block","grid","grid"] | pass |
| Tailwind variant at the md breakpoint / .md\:flex | display | 1280 | shipped page | ["block","flex","flex"] | ["block","flex","flex"] | pass |
| Arbitrary margin value / .mt-\[1rem\] | margin-top | 1280 | shipped page | ["0px","16px","16px"] | ["0px","16px","16px"] | pass |
| Bare heading beside a heading class / #bare-heading | font-size | 1280 | scratch page | ["20px","20px","16px"] | ["20px","20px","16px"] | pass |
| Bare heading beside a heading class / .h5 | font-size | 1280 | scratch page | ["20px","20px","20px"] | ["20px","20px","20px"] | pass |
| Bootstrap card on Tailwind's reset / .card-title | font-weight | 1280 | scratch page | ["500","500","500"] | ["500","500","500"] | pass |
| Bootstrap card on Tailwind's reset / .card-text | margin-bottom | 1280 | scratch page | ["16px","16px","16px"] | ["16px","16px","16px"] | pass |
| Bootstrap card on Tailwind's reset / #bare-paragraph | margin-bottom | 1280 | scratch page | ["16px","16px","0px"] | ["16px","16px","0px"] | pass |
| Bare image and list / img | display | 1280 | shipped page | ["inline","block","block"] | ["inline","block","block"] | pass |
| Bare image and list / ul | list-style-type | 1280 | shipped page | ["disc","none","none"] | ["disc","none","none"] | pass |
| Icon in a Bootstrap button / svg.bi | display | 1280 | scratch page | ["inline","block","inline"] | ["inline","block","inline"] | pass |
| Hidden attribute with a display utility / [hidden] | display | 1280 | shipped page | ["flex","none","none"] | ["flex","none","none"] | pass |
| Border width without a border style / .border-1 | border-top-width | 1280 | scratch page | ["0px","1px","1px"] | ["0px","1px","1px"] | pass |
| Tailwind padding on a Bootstrap button / button | padding-left | 390 | shipped page | ["12px","32px","32px"] | ["12px","32px","32px"] | pass |
| Shared spacing and radius follow Tailwind / .mt-3 | margin-top | 390 | shipped page | ["16px","16px","12px"] | ["16px","16px","12px"] | pass |
| Shared spacing and radius follow Tailwind / .gap-4 | column-gap | 390 | shipped page | ["24px","24px","16px"] | ["24px","24px","16px"] | pass |
| Shared spacing and radius follow Tailwind / span.rounded | border-top-left-radius | 390 | shipped page | ["6px","6px","4px"] | ["6px","6px","4px"] | pass |
| Collapse stays visible / .collapse | display | 390 | shipped page | ["block","block","block"] | ["block","block","block"] | pass |
| Collapse stays visible / .collapse | visibility | 390 | shipped page | ["visible","collapse","visible"] | ["visible","collapse","visible"] | pass |
| Container keeps Bootstrap's widths / .container | padding-left | 390 | shipped page | ["12px","12px","12px"] | ["12px","12px","12px"] | pass |
| Container keeps Bootstrap's widths / .container | max-width | 390 | shipped page | ["none","none","none"] | ["none","none","none"] | pass |
| Pill radius beside rounded-full / button | border-top-left-radius | 390 | shipped page | ["800px","800px","800px"] | ["800px","800px","800px"] | pass |
| Tailwind grid in a card body / .grid | display | 390 | shipped page | ["block","grid","grid"] | ["block","grid","grid"] | pass |
| Tailwind variant at the md breakpoint / .md\:flex | display | 390 | shipped page | ["block","block","block"] | ["block","block","block"] | pass |
| Arbitrary margin value / .mt-\[1rem\] | margin-top | 390 | shipped page | ["0px","16px","16px"] | ["0px","16px","16px"] | pass |
| Bare heading beside a heading class / #bare-heading | font-size | 390 | scratch page | ["20px","20px","16px"] | ["20px","20px","16px"] | pass |
| Bare heading beside a heading class / .h5 | font-size | 390 | scratch page | ["20px","20px","20px"] | ["20px","20px","20px"] | pass |
| Bootstrap card on Tailwind's reset / .card-title | font-weight | 390 | scratch page | ["500","500","500"] | ["500","500","500"] | pass |
| Bootstrap card on Tailwind's reset / .card-text | margin-bottom | 390 | scratch page | ["16px","16px","16px"] | ["16px","16px","16px"] | pass |
| Bootstrap card on Tailwind's reset / #bare-paragraph | margin-bottom | 390 | scratch page | ["16px","16px","0px"] | ["16px","16px","0px"] | pass |
| Bare image and list / img | display | 390 | shipped page | ["inline","block","block"] | ["inline","block","block"] | pass |
| Bare image and list / ul | list-style-type | 390 | shipped page | ["disc","none","none"] | ["disc","none","none"] | pass |
| Icon in a Bootstrap button / svg.bi | display | 390 | scratch page | ["inline","block","inline"] | ["inline","block","inline"] | pass |
| Hidden attribute with a display utility / [hidden] | display | 390 | shipped page | ["flex","none","none"] | ["flex","none","none"] | pass |
| Border width without a border style / .border-1 | border-top-width | 390 | scratch page | ["0px","1px","1px"] | ["0px","1px","1px"] | pass |
| Responsive alignment at md / .text-center.text-md-start | text-align | 768 | scratch page | ["left","left","start"] | ["left","left","left"] | differs |

## P6 — Tailwind emissions

The emissions below retain their declaration priority and enclosing conditions. Each candidate is compiled alone and added to the complete recipe candidate set.

| Candidate / population | Expected | Measured rows or error | Mark |
| --- | --- | --- | --- |
| hidden / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".hidden","property":"display","value":"none","priority":""}] | pass |
| hidden / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".hidden","property":"display","value":"none","priority":""}] | pass |
| collapse! / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".collapse\\!","property":"visibility","value":"collapse","priority":"important"}] | pass |
| collapse! / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".collapse\\!","property":"visibility","value":"collapse","priority":"important"}] | pass |
| container! / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".container\\!","property":"width","value":"100%","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 40rem)","selector":".container\\!","property":"max-width","value":"40rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 48rem)","selector":".container\\!","property":"max-width","value":"48rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 64rem)","selector":".container\\!","property":"max-width","value":"64rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 80rem)","selector":".container\\!","property":"max-width","value":"80rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 96rem)","selector":".container\\!","property":"max-width","value":"96rem","priority":"important"}] | pass |
| container! / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".container\\!","property":"width","value":"100%","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 40rem)","selector":".container\\!","property":"max-width","value":"40rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 48rem)","selector":".container\\!","property":"max-width","value":"48rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 64rem)","selector":".container\\!","property":"max-width","value":"64rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 80rem)","selector":".container\\!","property":"max-width","value":"80rem","priority":"important"},{"context":"@layer utilities &gt; @media (width &gt;= 96rem)","selector":".container\\!","property":"max-width","value":"96rem","priority":"important"}] | pass |
| col-6! / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".col-6\\!","property":"grid-column-start","value":"6","priority":"important"},{"context":"@layer utilities","selector":".col-6\\!","property":"grid-column-end","value":"auto","priority":"important"}] | pass |
| col-6! / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities","selector":".col-6\\!","property":"grid-column-start","value":"6","priority":"important"},{"context":"@layer utilities","selector":".col-6\\!","property":"grid-column-end","value":"auto","priority":"important"}] | pass |
| md:collapse / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities &gt; @media (width &gt;= 48rem)","selector":".md\\:collapse","property":"visibility","value":"collapse","priority":""}] | pass |
| md:collapse / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities &gt; @media (width &gt;= 48rem)","selector":".md\\:collapse","property":"visibility","value":"collapse","priority":""}] | pass |
| print:table / alone | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities &gt; @media print","selector":".print\\:table","property":"display","value":"table","priority":""}] | pass |
| print:table / full | emitted; exact exclusion does not exclude variants or important modifiers | [{"context":"@layer utilities &gt; @media print","selector":".print\\:table","property":"display","value":"table","priority":""}] | pass |

The until-found specimen is a scratch div with d-flex and the hidden attribute value until-found. “visibility” in the JSON record names content-visibility.

| Face | Expected display / content-visibility | Measured display / content-visibility | Mark |
| --- | --- | --- | --- |
| bootstrap | {"display":"none","visibility":"hidden"} | {"display":"flex","visibility":"hidden"} | differs |
| unexcluded | {"display":"none","visibility":"hidden"} | {"display":"flex","visibility":"hidden"} | differs |
| tailwindcss | {"display":"flex","visibility":"hidden"} | {"display":"flex","visibility":"hidden"} | pass |

Bootstrap d-flex follows the hidden rule with the same unlayered important priority. Tailwind preflight exempts until-found. The measured display is therefore flex under every face, while Chromium keeps content-visibility hidden.

## P9 — Toolchain reaction

The extra @use follows the layer-order statement. The commands run to completion with a ten-minute timeout each, with npm 11 first on PATH. The finally block restores src/tailwindcss/_tokens.scss through the authorized git checkout command.

The build stops at Sass directive ordering. This run therefore measures the inserted line at the requested position; it does not establish whether a correctly ordered cross-face configuration passes the build.

| Command | Expected | Exit / first error lines | Mark |
| --- | --- | --- | --- |
| npm run lint:check | reaction observed; failure permitted | {"exit":0,"lines":[]} | pass |
| npm run format:check | reaction observed; failure permitted | {"exit":1,"lines":["Format issues found in above 1 files. Run without `--check` to fix.",""]} | pass |
| npm run test:policy | reaction observed; failure permitted | {"exit":0,"lines":[]} | pass |
| npm run build:src:tailwindcss | reaction observed; failure permitted | {"exit":1,"lines":["error during build:","Build failed with 1 error:","","[plugin vite:css] /home/user/veneer/src/tailwindcss/index.scss","Error: [sass] @use rules must be written before any other rules.","  ╷","3 │ @use '../bootstrap/tokens' with ($layered: true);","  │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^","  ╵","  src/tailwindcss/_tokens.scss 3:1  @use","  src/tailwindcss/index.scss 1:1    root stylesheet"]} | pass |

| Restoration reading | Expected | Measured | Mark |
| --- | --- | --- | --- |
| original bytes restored | true | true | pass |
| git status --porcelain |  |  | pass |

## Final tree reading

The final git status --porcelain command reports:

```text
```

Exit code: 0. The output is empty.
## P7 — Engine inline styles

Each face is mounted and each panel is opened independently through its page control. Inline positioning follows the measured page geometry.

| Panel | Reading | Expected A | Measured F | Mark |
| --- | --- | --- | --- | --- |
| dropdown | style attribute | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px; | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px; | pass |
| dropdown | inline margin | 2px 0px 0px | 2px 0px 0px | pass |
| dropdown | computed margin | 2px 0px 0px | 2px 0px 0px | pass |
| dropdown | inline inset | auto | auto | pass |
| dropdown | computed inset | 0px | 0px | pass |
| dropdown | inline width | 160px | 160px | pass |
| dropdown | computed width | 160px | 160px | pass |
| dropdown | inline position | fixed | fixed | pass |
| dropdown | computed position | fixed | fixed | pass |
| dropdown | body style | null | null | pass |
| dropdown | body inline padding-right |  |  | pass |
| dropdown | body computed padding-right | 0px | 0px | pass |
| popover | style attribute | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: --vn-placement-1-1, flip-block, --vn-placement-1-3; inset: auto; margin: 0px 0px 8px; width: 276px; | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: --vn-placement-1-1, flip-block, --vn-placement-1-3; inset: auto; margin: 0px 0px 8px; width: 276px; | pass |
| popover | inline margin | 0px 0px 8px | 0px 0px 8px | pass |
| popover | computed margin | 0px 0px 8px | 0px 0px 8px | pass |
| popover | inline inset | auto | auto | pass |
| popover | computed inset | 0px | 0px | pass |
| popover | inline width | 276px | 276px | pass |
| popover | computed width | 276px | 276px | pass |
| popover | inline position | fixed | fixed | pass |
| popover | computed position | fixed | fixed | pass |
| popover | body style | null | null | pass |
| popover | body inline padding-right |  |  | pass |
| popover | body computed padding-right | 0px | 0px | pass |
| tooltip | style attribute | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: --vn-placement-1-1, flip-block, --vn-placement-1-3; inset: auto; margin: 0px 0px 6px; width: 110.75px; | position-anchor: --vn-placement-1; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: --vn-placement-1-1, flip-block, --vn-placement-1-3; inset: auto; margin: 0px 0px 6px; width: 110.75px; | pass |
| tooltip | inline margin | 0px 0px 6px | 0px 0px 6px | pass |
| tooltip | computed margin | 0px 0px 6px | 0px 0px 6px | pass |
| tooltip | inline inset | auto | auto | pass |
| tooltip | computed inset | 0px | 0px | pass |
| tooltip | inline width | 110.75px | 110.75px | pass |
| tooltip | computed width | 110.75px | 110.75px | pass |
| tooltip | inline position | fixed | fixed | pass |
| tooltip | computed position | fixed | fixed | pass |
| tooltip | body style | null | null | pass |
| tooltip | body inline padding-right |  |  | pass |
| tooltip | body computed padding-right | 0px | 0px | pass |
| modal | style attribute | display: block; | display: block; | pass |
| modal | inline margin |  |  | pass |
| modal | computed margin | 0px | 0px | pass |
| modal | inline inset |  |  | pass |
| modal | computed inset | 0px | 0px | pass |
| modal | inline width |  |  | pass |
| modal | computed width | 1280px | 1280px | pass |
| modal | inline position |  |  | pass |
| modal | computed position | fixed | fixed | pass |
| modal | body style | overflow: hidden; padding-right: 0px; | overflow: hidden; padding-right: 0px; | pass |
| modal | body inline padding-right | 0px | 0px | pass |
| modal | body computed padding-right | 0px | 0px | pass |

## P8 — Dark mode

Dark mode is data-bs-theme="dark" with a light operating-system color scheme. The specimen population includes the requested shared classes and every chrome subject. Expected values preserve the Bootstrap reading unless the subject carries a shared class that owns that property; those rows expect Tailwind ownership and report the actual triple.

| Width / subject | Longhand | Expected triple | Measured triple | Mark |
| --- | --- | --- | --- | --- |
| 1280 / 0 header.border-bottom.bg-body-tertiary | background-color | ["rgb(43, 48, 53)","rgb(43, 48, 53)","rgb(43, 48, 53)"] | ["rgb(43, 48, 53)","rgb(43, 48, 53)","rgb(43, 48, 53)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-block-end-color | ["rgb(73, 80, 87)","rgb(73, 80, 87)","rgb(73, 80, 87)"] | ["rgb(73, 80, 87)","rgb(73, 80, 87)","rgb(73, 80, 87)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-block-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-bottom-color | ["rgb(73, 80, 87)","rgb(73, 80, 87)","rgb(73, 80, 87)"] | ["rgb(73, 80, 87)","rgb(73, 80, 87)","rgb(73, 80, 87)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-inline-end-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-inline-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-left-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-right-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-top-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | box-shadow | ["none","none","none"] | ["none","none","none"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 0 header.border-bottom.bg-body-tertiary | border-radius | ["0px","0px","0px"] | ["0px","0px","0px"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | background-color | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-block-end-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-block-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-bottom-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-inline-end-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-inline-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-left-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-right-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-top-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | box-shadow | ["none","none","none"] | ["none","none","none"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 1 div.container-xxl.d-flex.flex-wrap.align-items-center.gap-3.py-3 | border-radius | ["0px","0px","0px"] | ["0px","0px","0px"] | pass |
| 1280 / 2 div.me-auto | background-color | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | pass |
| 1280 / 2 div.me-auto | border-block-end-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-block-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-bottom-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-inline-end-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-inline-start-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-left-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-right-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-top-color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | box-shadow | ["none","none","none"] | ["none","none","none"] | pass |
| 1280 / 2 div.me-auto | color | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | ["rgb(222, 226, 230)","rgb(222, 226, 230)","rgb(222, 226, 230)"] | pass |
| 1280 / 2 div.me-auto | border-radius | ["0px","0px","0px"] | ["0px","0px","0px"] | pass |
| 1280 / 3 h1.h4.mb-0.d-flex.align-items-center.gap-2 | background-color | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"] | pass |
=== P3 summary (Orchestrator reading, 2026-10-04)
## P3 — Curation fixed point

The fixed point leaves 214550 preflight-attributed departures in the final iteration. The attribution order is utility, preflight, inherited, then unattributed, after the requested exclusions. Logical and physical longhand aliases are read together for the horizontal writing mode of these specimens. Nested utility rules retain their parent selector; media and supports conditions are evaluated in the browser.

The literal attribution exposes a conflict with the predicted shared-utility exclusion. On div.container.border, Bootstrap border-top-color reads rgb(222, 226, 230), while the recipe reads rgb(33, 37, 41) in the light wide run. Tailwind .border declares width and style; preflight declares the color through its border shorthand. R5 therefore assigns preflight and the fixed-point procedure proposes a restore row on container. The design describes this same color change as an intentional shared-utility move. The derived table includes those rows, records them outside the seed, and requires an attribution ruling before adoption.

Declaration attribution uses indexed CSSStyleDeclaration names. A var() shorthand can declare padding-left while getPropertyValue("padding-left") returns an empty string; the .p-2 control records that case in declarations.ts. Testing value truthiness would incorrectly assign that utility move to preflight.

The representative open controls are the first live tooltip, popover, and dropdown triggers; the modal-live-archive and offcanvas-live-start triggers; and the toasts-live-toast opener.

The wide population includes every element under main, the generated utility matrices, added title/card/icon specimens, and engine-built tooltip/popover roots. The narrow population includes navbar, offcanvas, collapse, modal, containers, and tables, plus the added specimens and open panels. Every element is read through indexed computed-style names. Generated before/after, list markers, visible placeholders, and top-layer backdrops are read when present. Finite animations finish; infinite animations are paused at their first frame. Each open state is driven by its page control and waits for shown.bs.FAMILY. The tooltip control receives a click so its focus keeps the panel open across the origin scroll. When a witness carries several component names, each name receives the observed row.

| Iteration | Expected final preflight departures | Measured preflight departures | Reboot classes | Restore selectors | Mark |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 220084 | [] | [] | differs |
| 1 | 0 | 214662 | ["accordion-header","alert-link","btn-close","card-link","card-text","card-title","display-1","display-2","display-3","display-4","display-5","dropdown-menu","focus-ring","focus-ring-danger","focus-ring-dark","focus-ring-info","focus-ring-light","focus-ring-primary","focus-ring-secondary","focus-ring-success","focus-ring-warning","icon-link","icon-link-hover","lead","link-body-emphasis","link-danger","link-dark","link-info","link-light","link-primary","link-secondary","link-success","link-warning","list-unstyled","modal-title","nav-link","offcanvas-title","pagination","placeholder-glow","popover-header","stretched-link","table-active","table-group-divider","visually-hidden-focusable"] | ["div:where(.container)","div:where(.container-sm)","div:where(.container-md)","div:where(.container-lg)","div:where(.container-xl)","div:where(.container-xxl)","div:where(.container-fluid)","svg:where(.bi)","div:where(.small)","div:where(.col)","div:where(.offset-1)","div:where(.offset-sm-1)","div:where(.offset-md-1)","div:where(.offset-lg-1)","div:where(.offset-xl-1)","div:where(.offset-2)","div:where(.offset-sm-2)","div:where(.offset-md-2)","div:where(.offset-lg-2)","div:where(.offset-xl-2)","div:where(.offset-3)","div:where(.offset-sm-3)","div:where(.offset-md-3)","div:where(.offset-lg-3)","div:where(.offset-xl-3)","div:where(.offset-4)","div:where(.offset-sm-4)","div:where(.offset-md-4)","div:where(.offset-lg-4)","div:where(.offset-xl-4)","div:where(.offset-5)","div:where(.offset-sm-5)","div:where(.offset-md-5)","div:where(.offset-lg-5)","div:where(.offset-xl-5)","div:where(.offset-6)","div:where(.offset-sm-6)","div:where(.offset-md-6)","div:where(.offset-lg-6)","div:where(.offset-xl-6)","div:where(.offset-7)","div:where(.offset-sm-7)","div:where(.offset-md-7)","div:where(.offset-lg-7)","div:where(.offset-xl-7)","div:where(.offset-8)","div:where(.offset-sm-8)","div:where(.offset-md-8)","div:where(.offset-lg-8)","div:where(.offset-xl-8)","div:where(.offset-9)","div:where(.offset-sm-9)","div:where(.offset-md-9)","div:where(.offset-lg-9)","div:where(.offset-xl-9)","div:where(.offset-10)","div:where(.offset-sm-10)","div:where(.offset-md-10)","div:where(.offset-lg-10)","div:where(.offset-xl-10)","div:where(.offset-11)","div:where(.offset-sm-11)","div:where(.offset-md-11)","div:where(.offset-lg-11)","div:where(.offset-xl-11)","img:where(.figure-img)","img:where(.img-fluid)","input:where(.form-check-input)","input:where(.btn-check)","input:where(.form-range)","div:where(.col-sm-8)","img:where(.card-img-top)","a:where(.card-link)","a:where(.icon-link)","img:where(.card-img)","img:where(.card-img-bottom)","div:where(.carousel-indicators)","div:where(.carousel-item)","div:where(.carousel-inner)","div:where(.carousel-item-start)","div:where(.carousel-item-next)","div:where(.carousel-item-prev)","div:where(.carousel-item-end)","div:where(.modal-dialog)","div:where(.ratio)","div:where(.ratio-4x3)","div:where(.modal-sm)","div:where(.tab-content)","div:where(.toast)","div:where(.text-bg-primary)","div:where(.clearfix)","div:where(.text-bg-light)","div:where(.text-bg-dark)","a:where(.focus-ring)","a:where(.focus-ring-primary)","a:where(.focus-ring-secondary)","a:where(.focus-ring-success)","a:where(.focus-ring-danger)","a:where(.focus-ring-warning)","a:where(.focus-ring-info)","a:where(.focus-ring-light)","a:where(.focus-ring-dark)","a:where(.icon-link-hover)","div:where(.ratio-16x9)","a:where(.stretched-link)","a:where(.visually-hidden-focusable)","span:where(.small)","div:where(.ratio-21x9)","div:where(.row-gap-0)","div:where(.row-gap-sm-0)","div:where(.row-gap-md-0)","div:where(.row-gap-lg-0)","div:where(.row-gap-xl-0)","div:where(.row-gap-xxl-0)","div:where(.row-gap-1)","div:where(.row-gap-sm-1)","div:where(.row-gap-md-1)","div:where(.row-gap-lg-1)","div:where(.row-gap-xl-1)","div:where(.row-gap-xxl-1)","div:where(.row-gap-2)","div:where(.row-gap-sm-2)","div:where(.row-gap-md-2)","div:where(.row-gap-lg-2)","div:where(.row-gap-xl-2)","div:where(.row-gap-xxl-2)","div:where(.row-gap-3)","div:where(.row-gap-sm-3)","div:where(.row-gap-md-3)","div:where(.row-gap-lg-3)","div:where(.row-gap-xl-3)","div:where(.row-gap-xxl-3)","div:where(.row-gap-4)","div:where(.row-gap-sm-4)","div:where(.row-gap-md-4)","div:where(.row-gap-lg-4)","div:where(.row-gap-xl-4)","div:where(.row-gap-xxl-4)","div:where(.row-gap-5)","div:where(.row-gap-sm-5)","div:where(.row-gap-md-5)","div:where(.row-gap-lg-5)","div:where(.row-gap-xl-5)","div:where(.row-gap-xxl-5)","a:where(.nav-link)","ul:where(.list-unstyled)","button:where(.btn)","button:where(.btn-secondary)","button:where(.btn-primary)"] | differs |
| 2 | 0 | 214550 | ["accordion-header","alert-link","btn-close","card-link","card-text","card-title","display-1","display-2","display-3","display-4","display-5","dropdown-menu","focus-ring","focus-ring-danger","focus-ring-dark","focus-ring-info","focus-ring-light","focus-ring-primary","focus-ring-secondary","focus-ring-success","focus-ring-warning","icon-link","icon-link-hover","lead","link-body-emphasis","link-danger","link-dark","link-info","link-light","link-primary","link-secondary","link-success","link-warning","list-unstyled","modal-title","nav-link","offcanvas-title","pagination","placeholder-glow","popover-header","stretched-link","table-active","table-group-divider","visually-hidden-focusable"] | ["div:where(.container)","div:where(.container-sm)","div:where(.container-md)","div:where(.container-lg)","div:where(.container-xl)","div:where(.container-xxl)","div:where(.container-fluid)","svg:where(.bi)","div:where(.small)","div:where(.col)","div:where(.offset-1)","div:where(.offset-sm-1)","div:where(.offset-md-1)","div:where(.offset-lg-1)","div:where(.offset-xl-1)","div:where(.offset-2)","div:where(.offset-sm-2)","div:where(.offset-md-2)","div:where(.offset-lg-2)","div:where(.offset-xl-2)","div:where(.offset-3)","div:where(.offset-sm-3)","div:where(.offset-md-3)","div:where(.offset-lg-3)","div:where(.offset-xl-3)","div:where(.offset-4)","div:where(.offset-sm-4)","div:where(.offset-md-4)","div:where(.offset-lg-4)","div:where(.offset-xl-4)","div:where(.offset-5)","div:where(.offset-sm-5)","div:where(.offset-md-5)","div:where(.offset-lg-5)","div:where(.offset-xl-5)","div:where(.offset-6)","div:where(.offset-sm-6)","div:where(.offset-md-6)","div:where(.offset-lg-6)","div:where(.offset-xl-6)","div:where(.offset-7)","div:where(.offset-sm-7)","div:where(.offset-md-7)","div:where(.offset-lg-7)","div:where(.offset-xl-7)","div:where(.offset-8)","div:where(.offset-sm-8)","div:where(.offset-md-8)","div:where(.offset-lg-8)","div:where(.offset-xl-8)","div:where(.offset-9)","div:where(.offset-sm-9)","div:where(.offset-md-9)","div:where(.offset-lg-9)","div:where(.offset-xl-9)","div:where(.offset-10)","div:where(.offset-sm-10)","div:where(.offset-md-10)","div:where(.offset-lg-10)","div:where(.offset-xl-10)","div:where(.offset-11)","div:where(.offset-sm-11)","div:where(.offset-md-11)","div:where(.offset-lg-11)","div:where(.offset-xl-11)","img:where(.figure-img)","img:where(.img-fluid)","input:where(.form-check-input)","input:where(.btn-check)","input:where(.form-range)","div:where(.col-sm-8)","img:where(.card-img-top)","a:where(.card-link)","a:where(.icon-link)","img:where(.card-img)","img:where(.card-img-bottom)","div:where(.carousel-indicators)","div:where(.carousel-item)","div:where(.carousel-inner)","div:where(.carousel-item-start)","div:where(.carousel-item-next)","div:where(.carousel-item-prev)","div:where(.carousel-item-end)","div:where(.modal-dialog)","div:where(.ratio)","div:where(.ratio-4x3)","div:where(.modal-sm)","div:where(.tab-content)","div:where(.toast)","div:where(.text-bg-primary)","div:where(.clearfix)","div:where(.text-bg-light)","div:where(.text-bg-dark)","a:where(.focus-ring)","a:where(.focus-ring-primary)","a:where(.focus-ring-secondary)","a:where(.focus-ring-success)","a:where(.focus-ring-danger)","a:where(.focus-ring-warning)","a:where(.focus-ring-info)","a:where(.focus-ring-light)","a:where(.focus-ring-dark)","a:where(.icon-link-hover)","div:where(.ratio-16x9)","a:where(.stretched-link)","a:where(.visually-hidden-focusable)","span:where(.small)","div:where(.ratio-21x9)","div:where(.row-gap-0)","div:where(.row-gap-sm-0)","div:where(.row-gap-md-0)","div:where(.row-gap-lg-0)","div:where(.row-gap-xl-0)","div:where(.row-gap-xxl-0)","div:where(.row-gap-1)","div:where(.row-gap-sm-1)","div:where(.row-gap-md-1)","div:where(.row-gap-lg-1)","div:where(.row-gap-xl-1)","div:where(.row-gap-xxl-1)","div:where(.row-gap-2)","div:where(.row-gap-sm-2)","div:where(.row-gap-md-2)","div:where(.row-gap-lg-2)","div:where(.row-gap-xl-2)","div:where(.row-gap-xxl-2)","div:where(.row-gap-3)","div:where(.row-gap-sm-3)","div:where(.row-gap-md-3)","div:where(.row-gap-lg-3)","div:where(.row-gap-xl-3)","div:where(.row-gap-xxl-3)","div:where(.row-gap-4)","div:where(.row-gap-sm-4)","div:where(.row-gap-md-4)","div:where(.row-gap-lg-4)","div:where(.row-gap-xl-4)","div:where(.row-gap-xxl-4)","div:where(.row-gap-5)","div:where(.row-gap-sm-5)","div:where(.row-gap-md-5)","div:where(.row-gap-lg-5)","div:where(.row-gap-xl-5)","div:where(.row-gap-xxl-5)","a:where(.nav-link)","ul:where(.list-unstyled)","button:where(.btn)","button:where(.btn-secondary)","button:where(.btn-primary)","button:where(.accordion-button)"] | differs |

Every condition records its population and attribution totals.

| Iteration / width / theme / state | Expected preflight at fixed point | Measured attribution counts | Elements / subjects | Shown event | Mark |
| --- | --- | --- | --- | --- | --- |
| 0 / 1280 / light / closed | 0 | {"layout":24060,"invisible":37278,"utility":7321,"preflight":15562,"unattributed":4103,"admitted":4,"inherited":3142} | 15023 / 15402 |  | differs |
