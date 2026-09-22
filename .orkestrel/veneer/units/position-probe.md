# Probe: rendered position independence of the elements layer (2026-09-22)

Instrument: `position-probe.mjs` beside this file, run with Veneer's installed Playwright 1.63.0
against `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (Chromium 141.0.7390.37) over a copy
of `dist/src/styles/index.css` built at Veneer `751c3ed`. Readings: `position-probe.log.txt`.

Predicate: for every styled tag, the set of elements-layer style rules the browser's own
`Element.matches` reports on that tag is the same when the tag is mounted alone in a `div`, when it
is nested inside each other styled tag outside the mandated pairs, and when it follows each other
styled tag as a sibling. A pair whose set differs is positional, reported as `<outer> > <inner>` or
`<outer> + <inner>`.

```text
without plant: rules 80, usable 80, unusable [], findings [], about 1.1 s
with plant    : rules 81, usable 81, unusable [], findings ["h1 + p"], about 1.0 s
```

Reading: every elements-layer selector the build ships is accepted by `matches`; the shipped layer
reports no positional pair; a planted `@layer elements { p:not(h1 + p) { margin: 0 } }`, which the
retired grammar's `matchesLooseTagPair` accepted (audit claim 7), reads as the finding `h1 + p`.
The cross product over the styled tags costs about one second on this host. Carrier: F5a
ACCOUNTING-SPLIT replaces the grammar's tag-pair case with this predicate as an exported reader in
`tests/setupBrowser.ts` and a planted-sheet control in `tests/src/styles/index.test.ts`.
