All nine probes exited 0 twice, with byte-identical JSON confirmed by `cmp`. Chromium: **141.0.7390.37**. Final `git status --porcelain` output is empty.

| Probe | Verdict | Reading |
|---|---|---|
| P1 | Differs | **73** reset-layer rules versus **74** expected; the curated datalist copy also remains unlayered. Default digests match; all **199** utility rules are withheld. |
| P2 | Differs | **18** additional Tailwind property-initialization declarations remain after removing the three specified layers. Exclusions, `.mt-3`, and the expected merged declaration match. |
| P3 | Differs | **214,550** preflight-attributed departures remain after three passes. **194** repair rows, **169** outside the seed, plus **4** admitted image rows. `svg.bi`’s predicted `vertical-align` restore was not reproduced. |
| P4 | Differs | **1,188** longhand departures at each width versus zero expected; **zero box departures**. Three header buttons fit without overflow, with text wrapping. |
| P5 | Differs | At 768 px, responsive alignment reads **`left / left / left`**, versus **`left / left / start`** expected. All other triples match. |
| P6 | Differs | Until-found reads **`flex / hidden`** on every face; Bootstrap and unexcluded expected **`none / hidden`**. All requested candidates emit. |
| P7 | Matches | Panel inline styles, computed positioning, and modal body padding match Bootstrap. |
| P8 | Matches | No departures from the stated dark-mode ownership expectations. |
| P9 | Matches | All commands completed; exits were **0, 1, 0, 1**. The source was restored. |

P9 formatting reported: ``Format issues found in above 1 files. Run without `--check` to fix.`` The build reported: `Error: [sass] @use rules must be written before any other rules.`

Nothing was omitted. Full expected/measured tables, durations, Sass hazards, and residuals are in [report.md](/home/user/veneer/tmp/probes/flip2/report.md). Curation witnesses and residuals are in [curation.json](/home/user/veneer/tmp/probes/flip2/curation.json).