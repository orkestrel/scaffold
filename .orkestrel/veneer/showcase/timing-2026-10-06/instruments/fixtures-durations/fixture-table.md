# Journey durations

Band ratio: 1.200000. Inner ceiling: 250 ms.

Only passed assertions contribute durations. A failed run remains in the header. Repeated --run paths count once. Inputs are caller-selected; this instrument does not verify tree identity or lock ownership.

| Folder | seconds | outside.seconds | Passed | Failed | Band |
| --- | ---: | ---: | ---: | ---: | --- |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/journey-fast | 100 | 10.00 | 2 | 0 | eligible |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/journey-slow | 120 | 11.00 | 2 | 0 | eligible |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/journey-first-poll | 110 | 10.50 | 1 | 0 | eligible |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/command-fast | 1 | unavailable (command) | 1 | 0 | command (no R5) |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/command-slow | 2 | unavailable (command) | 1 | 0 | command (no R5) |

R3 = ceil(max × max(band, ratio) / 100) × 100 ms for settle readings only, where a settle ratio is the slowest over the fastest per-run slowest reading among the runs whose slowest reading is at or above the 150 ms settle floor, and needs two such counting runs. The shared margin is the largest of the band and every settle ratio; the shared budget is ceil(ceiling × margin / 100) × 100 ms over the slowest settle reading. R4 = ceil(max × max(band, ratio) / 1000) × 1000 + ceiling ms. Figures need at least two distinct eligible runs and a positive minimum. Slack = supplied timeout minus the title maximum across variants. Out-of-band runs and omitted run/title pairs contribute no readings. Command readings carry no load and take no R5 test.

R5 test: flag when the title ratio exceeds the band and there exists an eligible pair with slow/fast > band but outside(slow) <= outside(fast). The pair is printed as the witness. This conservative inversion test is diagnostic, not proof of a cause; an unmarked title is not cleared of timing defects. R5 figures are provisional and await diagnosis.

Unspecified means no variant key was present. Unattributed means the title repeats without a usable variant key; its pooled range is descriptive and cannot size an individual variant. Timing entries identify unique titles; for repeated all-passed titles their own milliseconds appear in separate variant rows. Report array order is never a variant key.

| Title | Variant | Eligible runs | Min ms | Max ms | Ratio | Slack ms | R4 ms | R5 | Min runs | Max runs | Passed readings and R5 inputs |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| showcase journeys J8 drives the engine through the component sections | light-1280 | 2 | 500.0 | 500.0 | 1.000000 | unavailable | 1250 | — | journey-fast, journey-slow | journey-fast, journey-slow | journey-fast: 500.0 ms, seconds=100, outside.seconds=10.00 (report.json); journey-slow: 500.0 ms, seconds=120, outside.seconds=11.00 (report.json) |
| showcase statecharts drives the 'face' header table through the header buttons | light-1280 | 2 | 1000.0 | 3000.0 | 3.000000 | 7000.0 | 9250 | not applicable (command) | command-fast | command-slow | command-fast: 1000.0 ms, seconds=1, outside.seconds=unavailable (command) (report.json); command-slow: 3000.0 ms, seconds=2, outside.seconds=unavailable (command) (report.json) |
| showcase statecharts drives the 'popover' table through its controls with motion=true | light-1280 | 3 | 1000.0 | 1200.0 | 1.200000 | 800.0 | 2250 | — | journey-fast | journey-slow | journey-fast: 1000.0 ms, seconds=100, outside.seconds=10.00 (report.json); journey-slow: 1200.0 ms, seconds=120, outside.seconds=11.00 (report.json); journey-first-poll: 1100.0 ms, seconds=110, outside.seconds=10.50 (report.json) |

## Settle probes

| Family | Motion | Description | Readings | Eligible runs | Counting runs | Fastest run max ms | Max ms | Ratio | R3 ms | Slack ms | Slack check | Slowest run |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| face | header | visible | 2 | 2 | 2 | 200.0 | 300.0 | 1.500000 | 500 | 7000.0 | below slack | command-slow: 300.0 ms, seconds=2, outside.seconds=unavailable (command) (Settle probe (light-1280)) |
| J8 drives the engine through the component sections | none | the panel closes | 2 | 2 | 2 | 250.0 | 350.0 | 1.400000 | 500 | unavailable | unavailable | journey-slow: 350.0 ms, seconds=120, outside.seconds=11.00 (Settle probe (light-1280)) |
| popover | true | visible | 3 | 3 | 2 | 200.0 | 400.0 | 2.000000 | 800 | 800.0 | R3 — not below slack | journey-slow: 400.0 ms, seconds=120, outside.seconds=11.00 (Settle probe (light-1280)) |

Shared margin: 2.000000 (band 1.200000; largest own ratio 2.000000 from visible [popover, true]: 400.0 ms in journey-slow over 200.0 ms in journey-fast).
Shared budget: ceil(400.0 × 2.000000 / 100) × 100 = 800 ms (ceiling: visible [popover, true], 400.0 ms in journey-slow).
Shared budget slack check: R3 — not below the slack of showcase statecharts drives the 'popover' table through its controls with motion=true (800.0 ms).

## Statechart rows

| Table | Row | Readings | Min ms | Max ms |
| --- | --- | ---: | ---: | ---: |
| showcase statecharts drives the 'face' header table through the header buttons | show | 2 | 50.0 | 75.0 |
| showcase statecharts drives the 'popover' table through its controls with motion=true | show | 3 | 100.0 | 300.0 |
