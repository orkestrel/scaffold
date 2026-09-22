# F8 TAILWIND terrain brief

Read-only absorption. Do not edit, write, or create any file. Return evidence only — no design, no
recommendation, no raw file dump. Cite every fact as `file:line`, quoting at most one line per
pointer.

Campaign: Veneer (`/home/user/veneer`), a Bootstrap 5.3.8 baseline that must remain compatible with
Tailwind CSS without requiring it, Bootstrap winning every shared class name. Governing law:
`/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/styles.md`, `workspace.md`,
`tests.md`.

The F8 unit will prove Veneer's standalone profile and each supported Tailwind profile in the
browser, and land `tests/setup.css` the way the scaffold workspace rules describe it. Produce a
terrain record with these sections:

A. **The fleet's Tailwind wiring.** In `/home/user/elements` and `/home/user/mailbox`: the
`tailwindcss` and `@tailwindcss/postcss` (or `@tailwindcss/vite`) versions in `package.json`; the
`tests/setup.css` file (its `@layer` order line, its `@import 'tailwindcss'` form, its `@source`
rule); the Vite or PostCSS configuration that applies the plugin (`vite.config.ts`, `configs/**`,
any `postcss.config.*`); the browser setup that wires `setup.css` and the styles setup that loads it
(`tests/setup*.ts`); every proof that asserts a Tailwind utility or a preflight rule against the
package's cascade (grep `tailwind`, `preflight`, `@layer` under `tests/`); and every guide sentence
in Elements' `guides/styles.md`, `tokens.md`, `mixins.md`, `components.md`, `modifiers.md`,
`patterns.md`, `composables.md`, and `README.md` that states the Tailwind contract (layer order,
preflight, class conflicts, what the consumer declares).

B. **Scaffold's rules.** `/home/user/scaffold/.claude/rules/workspace.md` (the rows around lines
185 to 192 on `tests/setup.css`), `/home/user/scaffold/.claude/rules/styles.md` (around line 51 on
layer order before `@import 'tailwindcss'`), and every skill under `/home/user/scaffold/.agents/skills/`
whose files mention Tailwind (name the skill and the lines): the exact requirement each states.

C. **Veneer today.** `/home/user/veneer/src/styles/_tokens.scss` (the `@layer` declaration),
`src/styles/index.scss`, `configs/src/vite.styles.config.ts`, `vite.config.ts` (every project and
what CSS each loads), `tests/setupBrowser.ts` (how the cascade reaches the browser projects),
`tests/src/styles/index.test.ts` (the layer-order case), `guides/veneer.md` § Styles (the
important-utility contract and the Tailwind conflict rule, if present; else quote
`/home/user/scaffold/.orkestrel/veneer/units/f6-brief.md` Obligation 6's wording), the guide lines
around 445 to 452 on `tests/setup.css`, and `ROADMAP.md` lines 7, 27, 41, 42, 133, 144, 148, 236,
263, and 374.

D. **Shared class names and shared elements.** From the oracle inventory
`/home/user/veneer/tests/fixtures/oracle/inventory.json` (component keys and their selectors) and
Tailwind v4's installed surface under `/home/user/elements/node_modules/tailwindcss/` (name the
files you read: the preflight stylesheet, the theme stylesheet, the utilities source or its
compiled index), list every class name both define, one row each with both definitions' pointers
(candidates to check first: `container`, `visible`, `invisible`, `fixed`, `sticky`, `border`,
`rounded`, `shadow`, `flex`, `grid`, `block`, `truncate`, `float-start`, `float-end`, `clearfix`,
`text-start`, `text-end`, `text-center`, `text-truncate`, `bg-*`, `w-*`, `h-*`, `m-*`, `p-*`,
`gap-*`, `order-*`, `z-*`, `opacity-*`, `overflow-*`, `object-fit-*`, `align-*`, `justify-*`,
`top-*`, `bottom-*`, `start-*`, `end-*`, `focus-ring`, `visually-hidden`, `sr-only`); and every
element Tailwind's preflight styles that Bootstrap's reboot (the inventory's `reboot` entry)
also styles, with the property each side sets.

E. **Primary-source facts, bounded.** From the installed Tailwind package's own files and README
(`/home/user/elements/node_modules/tailwindcss/README.md`, its `index.css`, `preflight.css`,
`theme.css`, `utilities.css` or their compiled equivalents; name each file): the cascade-layer
names Tailwind declares and the order it declares them in; the `@import 'tailwindcss'` variants
that compose a profile without preflight (`tailwindcss/preflight`, `tailwindcss/theme`,
`tailwindcss/utilities`); the `@source` rule's form; the `important` modifier on the import; and
how a consumer's own `@layer` statement before the import interacts with Tailwind's layers. Where
the installed package lacks a fact, name the published documentation page for that version instead
of guessing.

F. **Sizing.** The count of shared class names D found and the count of preflight rules that
overlap the reboot, so the Orchestrator can size the profiles.

Capture `git -C /home/user/veneer status --porcelain` before and after; it prints nothing on a
clean tree, and you must leave it that way.
