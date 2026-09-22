# F8 TAILWIND terrain brief, pass 3 — the primary-source facts, bounded

Read-only absorption. Do not edit, write, or create any file. Return evidence only — no design, no
recommendation, no raw file dump. Cite every fact as `file:line`, quoting at most one line per
pointer. Read only these files, and read each once: `/home/user/veneer/node_modules/tailwindcss/index.css`,
`/home/user/veneer/node_modules/tailwindcss/theme.css`, `/home/user/veneer/node_modules/tailwindcss/preflight.css`,
`/home/user/veneer/node_modules/tailwindcss/utilities.css`, `/home/user/veneer/node_modules/tailwindcss/README.md`,
`/home/user/veneer/node_modules/@tailwindcss/postcss/README.md`, and
`/home/user/veneer/node_modules/@tailwindcss/postcss/package.json`. Open nothing under `dist/`. The
class-name intersection and the preflight-versus-reboot overlap are already measured elsewhere; do
not attempt them.

Produce section E of the pass-1 brief for Tailwind 4.3.3:

1. The cascade-layer names `index.css` declares and the order it declares them in (quote the
   `@layer` statement's line).
2. Each `@import` `index.css` performs, with its `layer(...)` modifier, so a consumer can compose a
   profile without preflight (`tailwindcss/theme.css`, `tailwindcss/preflight.css`,
   `tailwindcss/utilities.css`), and what `utilities.css` contains (quote its one line).
3. The `@source` rule's form and the `important` modifier on `@import "tailwindcss"` (from
   `README.md` or the CSS comments; where the installed files lack the fact, name the published
   documentation page for 4.3 instead of guessing).
4. How a consumer's own `@layer` statement written before `@import "tailwindcss"` interacts with
   Tailwind's `@layer theme, base, components, utilities` statement (cite the CSS spec rule as
   Tailwind's README or comments state it; else name the documentation page).
5. What `preflight.css` sets on `button`, `a`, `img`, `svg`, `table`, `input`, `select`, `textarea`,
   `progress`, `summary`, `hr`, `h1` to `h6`, `code`, `kbd`, `pre`, `samp`, `sub`, `sup`, `small`,
   `strong`, `b`, `abbr`, `ol`, `ul`, `optgroup`, `iframe` (one line per element naming the
   properties), because Bootstrap's reboot styles the same elements.
6. How `@tailwindcss/postcss` registers in a PostCSS config and what its `package.json` names as its
   entry and its peer or runtime dependencies.

Return the six numbered answers and nothing else.
