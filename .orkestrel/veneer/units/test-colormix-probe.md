# Probe: Test's paint readings against this host's Chromium (2026-09-22)

Instrument: `units/colormix-probe.mjs`, run with the Test clone's Playwright against
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (HeadlessChrome/141.0.0.0).

```text
oklchDirect   oklch(0.208 0.042 265.755)
colorMixDark  color(srgb 0.0571957 0.0900803 0.168835)
colorMixLight color(srgb 0.885857 0.910275 0.942677)
outOfGamut    oklch(0.7 0.4 30)
```

Reading: the sRGB control serialises with fractional channels, so no 8-bit quantisation explains
the failure of `tests/src/browser/helpers.test.ts` cases "measures the dark oklch text against the
browser sRGB control" and "measures the contrast ratio of an oklch box-shadow on a focused
control" (`units/test-release-prep.log.txt`: contrast `17.844838…` against `17.843383…`, a
difference of `0.00145` where `toBeCloseTo(…, 3)` admits `0.0005`). The gap is between Test's own
oklch-to-sRGB conversion and Chromium 141's, which the previous session's Chromium 151 and Edge 153
matched within the tolerance. The two cases pin a host-varying agreement to three decimals; the
carrier is a Test unit that asserts the property with a tolerance the measured cross-version gap
justifies, and that unit needs push access to `orkestrel/test`.
