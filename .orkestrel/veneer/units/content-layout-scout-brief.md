# Scout — the Content/layout family's terrain (for its design round)

Role: `grok` (Cursor Grok 4.6, read-only), a bounded scouting question. Return distilled
evidence with `file:line` pointers, never raw dumps. Design nothing, decide nothing.

Subject: the next family the Veneer campaign opens after Button. The ledger
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md` § Units and
§ CSS rows) assigns the `Content/layout` unit these inventory roots: `reboot` (tag-only rows
only; § Exclusions lists the eight compound reboot selectors excluded), `container`, `row`,
`col`, `g`, `gx`, `gy`, `offset`, `table`, `figure`, `img`, `lead`, `display`, `blockquote`,
`initialism`, `icon-link`, `link`, `h1` to `h6`, and whatever else that row names (read the row
in full). The obligations file
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/obligations.md` § Reboot)
lists Reboot's obligation rows. Veneer (`C:/Users/mikes/WebstormProjects/veneer`, HEAD `060ce02`)
ships `src/styles/elements/_html.scss`, `_body.scss`, `_button.scss`, and
`src/styles/components/_button.scss` over the token layer in `src/styles/_tokens.scss` and
`_theme.scss`; its guide is `guides/veneer.md`. Elements (`C:/Users/mikes/WebstormProjects/elements`,
HEAD `3b41900`) is the calibration source. Bootstrap 5.3.8 is installed at
`C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap` (`scss/` sources and
`dist/css/bootstrap.css`). Answer, with pointers:

1. The family's rows: for each root the ledger assigns to `Content/layout`, the Bootstrap SCSS
   source file and the selector count the ledger records, grouped into the mechanisms Bootstrap's
   own sources group them by (reboot tags, typography classes, links, images and figures,
   containers, the grid and gutters, tables). Name the `--bs-*` custom properties each mechanism
   declares or reads.
2. The token bindings the family needs that Veneer's token layer already declares (`--vn-*` in
   `_tokens.scss` and `_theme.scss`: spacing, type scale, line heights, colours, borders, radii,
   breakpoints if any) and the ones it lacks, each named against the Bootstrap variable it would
   bind.
3. Elements' equivalents: where Elements paints headings, paragraphs, links, lists, code, tables,
   images, figures, blockquotes, and its layout primitives (container, grid, gutters), with the
   file and the specimen page for each, and whether Elements has a grid at all.
4. What Veneer's existing proofs and instruments reach: the styles suite under
   `tests/src/styles/` (its readers `readCascade`, `readCascadeSheet`, `collectLayer`, the
   conformance `readDeferrals` and the shipped-set requirement in `tests/setupConformance.ts`),
   the journey suite's capture family, and the distribution stage, so the design round knows
   which proofs a layout family can reuse and which it must add (a viewport axis for the grid,
   for example).
5. The Reboot exclusions and obligations that touch this family: the eight excluded compound
   selectors, the `[hidden]` and no-`href` rows, and the `--bs-body-*` and `--bs-heading-color`
   token obligations, with where each is already satisfied by `_html.scss` or `_body.scss` (read
   them) and where it is not.

Output: five numbered sections mirroring the questions, each a table or a short list of
`file:line` pointers with a one-line reading, then one line naming what could not be found.
