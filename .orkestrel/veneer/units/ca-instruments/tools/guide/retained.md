The theme scopes declare `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and
`--bs-carousel-control-icon-filter` with the release's own light and dark values, written through a
palette token where the release writes a literal. The release records those theme-scope
declarations under its `theme` vocabulary rather than under the `carousel` key, so no ledger row
measures them there. The `carousel` key measures the same three variables where the `.carousel-dark`
class declares them, and its rows in § Departures record the black the class paints through
`--vn-palette-black-base`. The control marks keep the release's filter treatment, because a data URI
cannot read a custom property; a `mask-image` treatment is outside the baseline.
`--bs-btn-close-filter` belongs to the `btn` vocabulary instead, so § Departures measures it, and its
rows there record the empty light-scope declaration this cascade writes against the filter the
release records.
