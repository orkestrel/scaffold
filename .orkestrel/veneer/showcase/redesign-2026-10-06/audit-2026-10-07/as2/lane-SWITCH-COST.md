# Scrollspy re-seat timing

Current-build pair removes automatic engine boot from both pages to match the header test, which mounts Showcase alone. Within that pair the control changes only the exact destroy/create expression to void 0. Each switch measures event dispatch, forced remaining layout, two animation frames, and completion of header-button color animations before starting the next switch. An additional diagnostic performs the same re-seat after header mutations to measure whether batching those writes matters; it leaves the original harmless lookup in place. Three warmup cycles (retained in raw data, including first/cold switches), then eight measured cycles per theme and viewport. Summaries exclude warmup cycles. The booted landing page is an additional historical control with different markup; it is not used to isolate re-seat cost.

No page errors. Exact source hash: `4f5269890bd9592d4c995fc6868f3d654afdc457a5f7f047d0eeb1f32c8a2d83`. Each table value is the mean of eight steady-state switches; all cold/warm-up and steady-state samples, extrema and medians remain in [face-switch-cost.json](face-switch-cost.json).

The re-seat moves mandatory stylesheet layout into the click handler. End-to-end means change from352.048 to358.006ms at414 and365.473 to354.573ms at1280. Late placement reads366.423/365.681ms and does not improve the result. The measured net change is small and changes sign by viewport; this does not prove zero overhead. Keep the required current implementation.

The header diagnostic completed in14797ms with all contrast assertions passing, only203ms below its normal15000ms budget. The original completed application gate timed out that case, then the next outline case encountered two Bootstrap controls while asynchronous pointer cleanup delayed `showcase.destroy()`. Both test bodies/budgets are in unowned `tests/app/browser/Showcase.test.ts`. No test timeout was changed.

| Width | Theme | Switch to | No re-seat: handler+layout / settled | Current re-seat: handler+layout / settled | Late re-seat: handler+layout / settled | Current timed re-seat |
|---:|---|---|---:|---:|---:|---:|
| 414 | light | unexcluded | 226.775 / 287.800 | 231.963 / 291.875 | 225.462 / 283.037 | 229.000 |
| 414 | light | tailwindcss | 339.688 / 409.025 | 360.000 / 428.675 | 375.700 / 448.400 | 353.637 |
| 414 | light | bootstrap | 259.800 / 338.913 | 281.650 / 346.913 | 267.625 / 337.462 | 272.350 |
| 414 | dark | unexcluded | 221.575 / 289.550 | 225.150 / 285.088 | 231.438 / 294.538 | 222.025 |
| 414 | dark | tailwindcss | 372.063 / 452.637 | 375.537 / 454.737 | 390.012 / 474.625 | 370.737 |
| 414 | dark | bootstrap | 254.450 / 334.363 | 262.325 / 340.750 | 279.575 / 360.475 | 250.950 |
| 1280 | light | unexcluded | 248.688 / 313.400 | 235.325 / 295.750 | 247.325 / 309.388 | 232.675 |
| 1280 | light | tailwindcss | 370.050 / 450.663 | 357.362 / 433.912 | 384.638 / 463.375 | 350.688 |
| 1280 | light | bootstrap | 265.625 / 343.238 | 267.938 / 336.938 | 264.225 / 340.663 | 259.112 |
| 1280 | dark | unexcluded | 237.450 / 305.262 | 237.212 / 294.963 | 233.863 / 297.913 | 234.600 |
| 1280 | dark | tailwindcss | 377.462 / 455.663 | 355.725 / 432.487 | 373.825 / 450.088 | 350.000 |
| 1280 | dark | bootstrap | 243.125 / 324.613 | 261.237 / 333.387 | 253.850 / 332.662 | 252.613 |
