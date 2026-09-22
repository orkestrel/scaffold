I’ll read the seven installed Tailwind files once and return only the six cited facts.The installed `index.css` is inlined and has no `@import`. I’ll read `preflight.css` and `theme.css` once for the element rules and any import or layer comments.1. `index.css` declares the cascade layers in this order: theme, base, components, utilities. `index.css:1` `@layer theme, base, components, utilities;` It then opens theme (`index.css:3` `@layer theme {`), base (`index.css:535` `@layer base {`), and utilities (`index.css:948` `@layer utilities {`). The file contains no `@layer components` block.

2. `index.css` performs no `@import` and contains no `layer(...)` modifier. It inlines `@theme` inside `@layer theme`, the preflight rules inside `@layer base`, and the utilities directive inside `@layer utilities` (`index.css:949` `@tailwind utilities;`). `utilities.css:1` `@tailwind utilities;` `theme.css:1` `@theme default {` `preflight.css` is that reset with no `@layer` wrapper; its first selector is `preflight.css:6` `*,`. The installed files do not state the `layer(...)` import form for `tailwindcss/theme.css`, `tailwindcss/preflight.css`, and `tailwindcss/utilities.css`. That page is https://tailwindcss.com/docs/preflight.

3. The installed READMEs and CSS comments do not state the `@source` rule or the `important` modifier on `@import "tailwindcss"`. `tailwindcss/README.md:26` points documentation at https://tailwindcss.com. The 4.3 pages are https://tailwindcss.com/docs/detecting-classes-in-source-files for `@source` and https://tailwindcss.com/docs/upgrade-guide for the `important` modifier.

4. The installed READMEs and CSS comments do not state how a consumer `@layer` written before `@import "tailwindcss"` interacts with `@layer theme, base, components, utilities`, and they cite no CSS spec rule. That page is https://tailwindcss.com/docs/adding-custom-styles.

5. `*` (`preflight.css:6`) sets `box-sizing`, `margin`, `padding`, and `border` on every element below (`preflight.css:12` `box-sizing: border-box; /* 1 */`, `preflight.css:13`, `preflight.css:14`, `preflight.css:15`).
- `button` (`preflight.css:243`, `preflight.css:377`): `font`, `font-feature-settings`, `font-variation-settings`, `letter-spacing`, `color`, `border-radius`, `background-color`, `opacity`, `appearance`.
- `a` (`preflight.css:92`): `color`, `-webkit-text-decoration`, `text-decoration`.
- `img` (`preflight.css:214`, `preflight.css:230`): `display`, `vertical-align`, `max-width`, `height`.
- `svg` (`preflight.css:215`): `display`, `vertical-align`.
- `table` (`preflight.css:168`): `text-indent`, `border-color`, `border-collapse`.
- `input` (`preflight.css:244`): `font`, `font-feature-settings`, `font-variation-settings`, `letter-spacing`, `color`, `border-radius`, `background-color`, `opacity`. `appearance` is set only for `input:where([type='button'], [type='reset'], [type='submit'])` (`preflight.css:378`).
- `select` (`preflight.css:245`): `font`, `font-feature-settings`, `font-variation-settings`, `letter-spacing`, `color`, `border-radius`, `background-color`, `opacity`.
- `textarea` (`preflight.css:247`, `preflight.css:307`): `font`, `font-feature-settings`, `font-variation-settings`, `letter-spacing`, `color`, `border-radius`, `background-color`, `opacity`, `resize`.
- `progress` (`preflight.css:186`): `vertical-align`.
- `summary` (`preflight.css:194`): `display`.
- `hr` (`preflight.css:59`): `height`, `color`, `border-top-width`.
- `h1` (`preflight.css:78`): `font-size`, `font-weight`.
- `h2` (`preflight.css:79`): `font-size`, `font-weight`.
- `h3` (`preflight.css:80`): `font-size`, `font-weight`.
- `h4` (`preflight.css:81`): `font-size`, `font-weight`.
- `h5` (`preflight.css:82`): `font-size`, `font-weight`.
- `h6` (`preflight.css:83`): `font-size`, `font-weight`.
- `code` (`preflight.css:114`): `font-family`, `font-feature-settings`, `font-variation-settings`, `font-size`.
- `kbd` (`preflight.css:115`): `font-family`, `font-feature-settings`, `font-variation-settings`, `font-size`.
- `pre` (`preflight.css:117`): `font-family`, `font-feature-settings`, `font-variation-settings`, `font-size`.
- `samp` (`preflight.css:116`): `font-family`, `font-feature-settings`, `font-variation-settings`, `font-size`.
- `sub` (`preflight.css:146`, `preflight.css:154`): `font-size`, `line-height`, `position`, `vertical-align`, `bottom`.
- `sup` (`preflight.css:147`, `preflight.css:158`): `font-size`, `line-height`, `position`, `vertical-align`, `top`.
- `small` (`preflight.css:138`): `font-size`.
- `strong` (`preflight.css:103`): `font-weight`.
- `b` (`preflight.css:102`): `font-weight`.
- `abbr` (`preflight.css:69` `abbr:where([title])`): `-webkit-text-decoration`, `text-decoration`, and only when `abbr` has `title`.
- `ol` (`preflight.css:202`): `list-style`.
- `ul` (`preflight.css:203`): `list-style`.
- `optgroup` (`preflight.css:246`): `font`, `font-feature-settings`, `font-variation-settings`, `letter-spacing`, `color`, `border-radius`, `background-color`, `opacity`. `font-weight` is set only for `:where(select:is([multiple], [size])) optgroup` (`preflight.css:263`).
- `iframe` (`preflight.css:219`): `display`, `vertical-align`. `:-moz-focusring:where(:not(iframe))` (`preflight.css:178`) excludes `iframe` from `outline`.

6. `@tailwindcss/postcss/README.md:47` `import tailwindcss from '@tailwindcss/postcss'` registers it as that default import, called inside the PostCSS `plugins` array (`@tailwindcss/postcss/README.md:51` `tailwindcss({`). `@tailwindcss/postcss/package.json:3` is version `4.3.3`. Its entry is the `exports` map (`@tailwindcss/postcss/package.json:20`): import default `@tailwindcss/postcss/package.json:24` `"./dist/index.mjs"`, require default `@tailwindcss/postcss/package.json:28` `"./dist/index.js"`. The file has no `peerDependencies` key. Runtime dependencies (`@tailwindcss/postcss/package.json:32`) are `@alloc/quick-lru` `^5.2.0` (`@tailwindcss/postcss/package.json:33`), `postcss` `^8.5.16` (`@tailwindcss/postcss/package.json:34`), `@tailwindcss/node` `4.3.3` (`@tailwindcss/postcss/package.json:35`), `@tailwindcss/oxide` `4.3.3` (`@tailwindcss/postcss/package.json:36`), and `tailwindcss` `4.3.3` (`@tailwindcss/postcss/package.json:37`).