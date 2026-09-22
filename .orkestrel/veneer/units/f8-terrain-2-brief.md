# F8 TAILWIND terrain brief, pass 2 — the installed Tailwind surface

Read-only absorption. Do not edit, write, or create any file. Return evidence only — no design, no
recommendation, no raw file dump. Cite every fact as `file:line`, quoting at most one line per
pointer.

Pass 1 (`/home/user/scaffold/tmp/cursor/f8-terrain-result.md`) could not read Tailwind because no
checkout had it installed. Veneer now has `tailwindcss` 4.3.3 and `@tailwindcss/postcss` 4.3.3 under
`/home/user/veneer/node_modules/`. Produce only sections D, E, and F of the pass-1 brief, over that
installed copy:

D. **Shared class names and shared elements.** From the oracle inventory
`/home/user/veneer/tests/fixtures/oracle/inventory.json` (its `components` object: every key's
`selectors[].classes`) and the installed Tailwind surface (`/home/user/veneer/node_modules/tailwindcss/utilities.css`,
`preflight.css`, `theme.css`, `index.css`, and the compiled `dist/` files: name each file you read
and what it holds), list every class name both define, one row each with both pointers. Check first:
`container`, `visible`, `invisible`, `fixed`, `sticky`, `static`, `absolute`, `relative`, `border`,
`rounded`, `shadow`, `flex`, `grid`, `block`, `inline`, `inline-block`, `hidden`, `truncate`,
`float-start`, `float-end`, `clearfix`, `text-start`, `text-end`, `text-center`, `text-truncate`,
`bg-*`, `w-*`, `h-*`, `m-*`, `p-*`, `gap-*`, `order-*`, `z-*`, `opacity-*`, `overflow-*`,
`object-*`, `align-*`, `justify-*`, `top-*`, `bottom-*`, `start-*`, `end-*`, `focus-ring`,
`visually-hidden`, `sr-only`, `lead`, `small`, `table`, `badge`, `card`, `progress`, `spinner`,
`placeholder`, `collapse`, `transition`. Tailwind v4 generates utilities on demand from candidates
in scanned sources, so read `utilities.css` for the static utility declarations and the compiled
`dist/lib.js` or equivalent for the utility name registry (name the file and how the registry is
expressed). Then list every element Tailwind's `preflight.css` styles that the inventory's `reboot`
entry also styles, with the property each side sets.

E. **Primary-source facts, bounded.** From the installed package's own files and README: the
cascade-layer names Tailwind declares and their order (`index.css`); the `@import 'tailwindcss/preflight'`,
`'tailwindcss/theme'`, `'tailwindcss/utilities'` composition and the `layer(...)` and `important`
modifiers on `@import` (`README.md`, `index.css`, the compiled sources); the `@source` rule's form;
how the consumer's own `@layer` statement before the import interacts with Tailwind's layers
(quote the file that declares `@layer theme, base, components, utilities`); how the PostCSS plugin
is registered (`/home/user/veneer/node_modules/@tailwindcss/postcss/README.md` or `dist/`). Where the
installed package lacks a fact, name the published documentation page for 4.3 rather than
guessing.

F. **Sizing.** The count of shared class names D found and the count of preflight rules overlapping
the reboot.

Capture `git -C /home/user/veneer status --porcelain` before and after; it prints nothing on a
clean tree, and you must leave it that way.
