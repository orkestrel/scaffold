# Fix-up report: middleware referral repairs (2026-09-01)

Unit: Opus 5 implementer, brief `fix/middleware-fixup-brief.md`, evidence
`fix/referrals-middleware-report.md`. Every repair applied; full gate chain green; committed on
the middleware campaign branch as `6152c80` "Close the referral probes' static fallback and asset
cache findings".

- **HEAD parity** — `src/server/helpers.ts` accepts `HEAD` beside `GET` for the fallback;
  pinning test inverted from the old `HEAD → undefined` expectation and ran red first.
- **etag and cache apply** — the fallback arm `fstat`s the shell handle and falls through the
  primary path's response block; `If-None-Match` answers 304; the new test ran red first at the
  `etag` assertion. Consequence pinned: `Range` on the fallback now answers 206.
- **dotfiles and the shell path** — documentation route: `StaticOptions` `index` and `fallback`
  TSDoc state the fallback serves the configured index whatever `dotfiles` says; a test pins both
  halves.
- **Asset cache finiteness** — `AssetOptions.source` and `AssetSourceInterface` remarks require a
  bounded key set and `undefined` for an unknown key; a test asserts retention and miss behavior.
- **Guide** — `guides/middleware.md` Static and Assets sections carry the resulting contract with
  an executed assertion behind each behavioral sentence.

Deviations recorded by the unit: the brief cited `src/core/types.ts` for the TSDoc repairs while
the interfaces live in `src/server/types.ts` (applied where they live; TSDoc-only, not off-limits);
the retained probes are recorders rather than red-first proofs, so the package's own pinning tests
carried the red-then-green record. Not touched, per the brief: the `MultipartError` re-wrap and the
`SessionStoreInterface.set` seam (work order).

Audit: folded into the next `orkestrel-falsify` round over middleware, whose claims attack the
fall-through's header parity and the 206 consequence.
