# E-ID-BUTTON documentation search — Grok research, read-only

You are the Cursor Grok bench on the `grok` route (bounded primary-source research). Perform the assignment directly,
spawn nothing, edit nothing, and return evidence, never decisions.

## Question

Which CSS classes does Bootstrap 5.3.8's own documentation and example markup put on a `<button>` element? The source is
the `twbs/bootstrap` repository at tag `v5.3.8`: `site/src/content/docs/**/*.mdx` (and `*.md`), and `site/src/assets/examples/**/*.astro`
or `site/content/docs/5.3/examples/**` wherever the examples live at that tag. Search for every `<button` opening tag
(including ones inside shortcode or example blocks) and collect the full `class` attribute of each.

## Output

1. The search: the repository path, the tag, the files or directories read, and the pattern.
2. A table of every distinct class composition on a `<button>`, one row each: the class attribute value, one
   `file:line` where it appears, and whether the composition includes one of these base classes: `btn`, `btn-close`,
   `navbar-toggler`, `accordion-button`, `dropdown-item`, `nav-link`, `list-group-item`, `page-link`,
   `carousel-control-prev`, `carousel-control-next`. Mark a `<button>` with no class, and one carrying `data-bs-target`
   with no class.
3. A list of every class that appears on a `<button>` as its only Bootstrap component class and is not one of the
   preceding base classes, with each `file:line`. Leave out utility classes (spacing, display, text, color, sizing, and
   so on) and documentation-site classes (`bd-*`), but name any you excluded as documentation-site classes.
4. Anything the search could not read, named as unread.

State no count. Cite a `file:line` for every row.
