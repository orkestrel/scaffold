# Journey durations

Band ratio: 4.000000. Inner ceiling: 0 ms.

Only passed assertions contribute durations. A failed run remains in the header. Repeated --run paths count once. Inputs are caller-selected; this instrument does not verify tree identity or lock ownership.

| Folder | seconds | outside.seconds | Passed | Failed | Band |
| --- | ---: | ---: | ---: | ---: | --- |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/command-fast | 1 | unavailable (command) | 1 | 0 | command (no R5) |
| /home/user/veneer/tmp/units/journey-cost/fixtures/durations/command-slow | 2 | unavailable (command) | 1 | 0 | command (no R5) |

R3 = ceil(max × max(band, ratio) / 100) × 100 ms for settle readings only, where a settle ratio is the slowest over the fastest per-run slowest reading among the runs whose slowest reading is at or above the 150 ms settle floor, and needs two such counting runs. The shared margin is the largest of the band and every settle ratio; the shared budget is ceil(ceiling × margin / 100) × 100 ms over the slowest settle reading. R4 = ceil(max × max(band, ratio) / 1000) × 1000 + ceiling ms. Figures need at least two distinct eligible runs and a positive minimum. Slack = supplied timeout minus the title maximum across variants. Out-of-band runs and omitted run/title pairs contribute no readings. Command readings carry no load and take no R5 test.

R5 test: flag when the title ratio exceeds the band and there exists an eligible pair with slow/fast > band but outside(slow) <= outside(fast). The pair is printed as the witness. This conservative inversion test is diagnostic, not proof of a cause; an unmarked title is not cleared of timing defects. R5 figures are provisional and await diagnosis.

Unspecified means no variant key was present. Unattributed means the title repeats without a usable variant key; its pooled range is descriptive and cannot size an individual variant. Timing entries identify unique titles; for repeated all-passed titles their own milliseconds appear in separate variant rows. Report array order is never a variant key.

| Title | Variant | Eligible runs | Min ms | Max ms | Ratio | Slack ms | R4 ms | R5 | Min runs | Max runs | Passed readings and R5 inputs |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| showcase statecharts drives the 'face' header table through the header buttons | light-1280 | 2 | 1000.0 | 3000.0 | 3.000000 | unavailable | 12000 | not applicable (command) | command-fast | command-slow | command-fast: 1000.0 ms, seconds=1, outside.seconds=unavailable (command) (report.json); command-slow: 3000.0 ms, seconds=2, outside.seconds=unavailable (command) (report.json) |

## Settle probes

| Family | Motion | Description | Readings | Eligible runs | Counting runs | Fastest run max ms | Max ms | Ratio | R3 ms | Slack ms | Slack check | Slowest run |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| face | header | visible | 2 | 2 | 2 | 200.0 | 300.0 | 1.500000 | 1200 | unavailable | unavailable | command-slow: 300.0 ms, seconds=2, outside.seconds=unavailable (command) (Settle probe (light-1280)) |

Shared margin: 4.000000 (band 4.000000; largest own ratio 1.500000 from visible [face, header]: 300.0 ms in command-slow over 200.0 ms in command-fast).
Shared budget: ceil(300.0 × 4.000000 / 100) × 100 = 1200 ms (ceiling: visible [face, header], 300.0 ms in command-slow).
Shared budget slack check: below every available slack.

## Statechart rows

| Table | Row | Readings | Min ms | Max ms |
| --- | --- | ---: | ---: | ---: |
| showcase statecharts drives the 'face' header table through the header buttons | show | 2 | 50.0 | 75.0 |
