Each mode selector is a plain attribute selector, so any element carrying the attribute opens an
island, and every token beneath that element takes the island's mode. A custom property carries its
`var()` references already substituted, so each mode scope declares again every token whose value
the mode changes, every tier mixed from one, and every `--bs-*` alias reading one. A light island
nested in a dark one therefore returns its subtree to the light closure. A name no mode changes is
declared at the `:root` selector alone, and every island inherits it from there.
