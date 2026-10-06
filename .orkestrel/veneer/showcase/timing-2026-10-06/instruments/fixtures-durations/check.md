# Journey durations

Band ratio: 1.200000. Inner ceiling: 0 ms.

Only passed assertions contribute durations. A failed run remains in the header. Repeated --run paths count once. Inputs are caller-selected; this instrument does not verify tree identity or lock ownership.

| Folder | seconds | outside.seconds | Passed | Failed | Band |
| --- | ---: | ---: | ---: | ---: | --- |

R3 = ceil(max × max(band, ratio) / 100) × 100 ms for settle readings only. R4 = ceil(max × max(band, ratio) / 1000) × 1000 + ceiling ms. Figures need at least two distinct eligible runs and a positive minimum. Slack = supplied timeout minus the title maximum across variants. Out-of-band runs and omitted run/title pairs contribute no readings. Command readings carry no load and take no R5 test.

R5 test: flag when the title ratio exceeds the band and there exists an eligible pair with slow/fast > band but outside(slow) <= outside(fast). The pair is printed as the witness. This conservative inversion test is diagnostic, not proof of a cause; an unmarked title is not cleared of timing defects. R5 figures are provisional and await diagnosis.

Unspecified means no variant key was present. Unattributed means the title repeats without a usable variant key; its pooled range is descriptive and cannot size an individual variant. Timing entries identify unique titles; for repeated all-passed titles their own milliseconds appear in separate variant rows. Report array order is never a variant key.

| Title | Variant | Eligible runs | Min ms | Max ms | Ratio | Slack ms | R4 ms | R5 | Min runs | Max runs | Passed readings and R5 inputs |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |

## Settle probes

| Family | Motion | Description | Readings | Eligible runs | Min ms | Max ms | Ratio | R3 ms | Slack ms | Slack check | Slowest run |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |

## Statechart rows

| Table | Row | Readings | Min ms | Max ms |
| --- | --- | ---: | ---: | ---: |
