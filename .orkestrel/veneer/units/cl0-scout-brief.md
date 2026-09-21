# Scout — Elements' content specimens for the CL0 calibration instrument

Role: `grok` (Cursor Grok 4.6, read-only), a bounded scouting question. Return distilled
evidence with `file:line` pointers, never raw dumps. Design nothing, decide nothing.

Subject: the Elements checkout at `C:/Users/mikes/WebstormProjects/elements` (HEAD `3b41900`),
whose built showcase `dist/showcase/index.html` serves the calibration source for Veneer's
tokens. The Content/layout family needs a calibration reading (`CL0`) that the existing
`research/calibration.md` in scaffold (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md`,
read it: it records type sizes, weights, line heights, and control spacing, and its instrument
`research/calibration.mjs` shows how a reading is taken from the built showcase) does not yet
carry. Answer, with pointers, so a `builder` can write the instrument:

1. For each surface, the showcase route, the page file, and the exact DOM the specimen renders
   (tag, classes, nesting), plus the SCSS partial that paints it: paragraphs and their rhythm
   (`p + p` spacing), headings (all six), lists (`ul`, `ol`, `dl` with `dt`/`dd`), blockquote,
   horizontal rule, anchors (rest and hover: colour, decoration, thickness, underline offset),
   tables (cell padding, border, caption, striping or row tint if any, hover tint), figures and
   figcaption, images (`img` sizing, thumbnail-like treatments if any), the code family
   (`code`, `pre`, `kbd`, `samp`, `var`), `small`, `mark`, `abbr`, `address`, `sub`/`sup`.
2. The computed-style properties the instrument must read on each (font size, line height,
   weight, margins, padding, color, background, border, text-decoration and its thickness and
   offset, `border-spacing`/`border-collapse`), and where the value is a `color-mix` or a
   `--set-*` token, the token and its declared value in light and dark.
3. How the showcase selects light and dark (the `data-mode` write path the U7f scout found)
   and any reset-to-known-state step the instrument needs between pages.
4. What `research/calibration.mjs` already does that the new instrument can reuse (its
   navigation, its readers, its output shape) and what it lacks for these surfaces.

Output: four numbered sections mirroring the questions, tables with `file:line` pointers and a
one-line reading each, then one line naming what could not be found.
