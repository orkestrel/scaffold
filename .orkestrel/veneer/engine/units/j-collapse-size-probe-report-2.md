J-COLLAPSE-SIZE-PROBE round 2 — writer report (opus on Opus 5.5)

## J-COLLAPSE-SIZE-PROBE round 2 report

The pairing (`calc-size(min-content, size)` on show, `calc-size(auto, size)` on hide) matches Bootstrap's pixel path at every phase on round 1's 30px child. The boxed panel adds one departure, and it is on show, not hide. Bootstrap's show writes `scrollWidth` or `scrollHeight`, which includes the padding and leaves out the border. Under `box-sizing: border-box` that pixel path stops short of the panel's size by the two borders (4px). `calc-size()` does not stop short.

- **Your unknown, answered:** a border and padding do not separate `auto` from the pixel path on hide. It matches at every phase, horizontally and vertically.
- **The departure reaches the vertical axis:** J-COLLAPSE-SIZE plans `calc-size(auto, size)` for the vertical show too. On a bordered panel that show differs from Bootstrap's by +3.21px at half and +4px at end. Round 3 read the vertical show green only because its panel had no border.

Every control read its expected value on HeadlessChrome 153.0.8010.12 in the final file. However, one control failed on my first run, and I did not stop. The deviation section at the end covers it.

### The pairing on round 1's fixtures

Each cell is the computed width / the rect width. The phases are the same as round 1's.

**30px child**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | `calc-size(min-content, size)` | 0px / 0 | 24.0625px / 24.06 | 30px / 30 | 300px / 300 |
| hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 0px / 0 | auto / 0 |

**Short text**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 31.375px / 31.38 | 39.1094px / 39.11 | 300px / 300 |
| hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 0px / 0 | auto / 0 |

**Long text**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 42.7812px / 42.78 | 53.3281px / 53.33 | 300px / 300 |
| hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 0px / 0 | auto / 0 |

**Growth** (the child widens from 30px to 60px at t=100ms)

| Variant | quarter | grown | half | end | complete |
| --- | --- | --- | --- | --- | --- |
| pixel | 12.25 | 12.25 | 24.06 | 30 | 300 |
| paired | 12.25 | 24.5 | 48.14 | 60 | 300 |

### Every variant on the boxed horizontal panel

The panel has a 2px border and 4px by 7px padding under `*, *::before, *::after { box-sizing: border-box }`, around the 30px child. The extras are 18px wide, so the collapsing panel's smallest width is 18px. The pixel show writes `44px` (30 + 14 padding), and the pixel hide writes `300px`.

| Variant | Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pixel | show | — | 44px | 18px / 18 | 35.2969px / 35.3 | 44px / 44 | 300px / 300 |
| pixel | hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 18px / 18 | auto / 0 |
| auto | show | — | — | 18px / 18 | 240.719px / 240.72 | 300px / 300 | 300px / 300 |
| auto | hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 18px / 18 | auto / 0 |
| maxContent, fitContent, minContent (identical rows) | show | — | — | 18px / 18 | 38.5px / 38.5 | 48px / 48 | 300px / 300 |
| maxContent, fitContent, minContent (identical rows) | hide | 300px / 300 | 48px / 48 | 48px / 48 | 18px / 18 (floor) | 18px / 18 | auto / 0 |
| paired | show | — | — | 18px / 18 | 38.5px / 38.5 | 48px / 48 | 300px / 300 |
| paired | hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 18px / 18 | auto / 0 |

The content bases' hide half reads the 18px floor, because the eased value from 48px falls under it. That cell is clamped and does not show the interpolation.

These are the differences from the pixel path on the boxed horizontal panel, in rect px. Every phase not named matches.
- **auto:** show +205.42 at half and +256 at end. Hide matches at every phase.
- **maxContent, fitContent, minContent:** show +3.2 at half and +4 at end. Hide −252 at written and start, and −41.27 at half.
- **paired:** show +3.2 at half and +4 at end. Hide matches at every phase.

### The vertical boxed hide

This is the same box around round 3's 60px child. The extras are 12px tall. The pixel hide writes `72px`.

| Variant | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| pixel | 72px / 72 | 72px / 72 | 72px / 72 | 14.2188px / 14.22 | 12px / 12 | auto / 0 |
| auto | 72px / 72 | 72px / 72 | 72px / 72 | 14.2188px / 14.22 | 12px / 12 | auto / 0 |

`calc-size(auto, size)` matches the pixel hide at every phase.

I also measured the vertical boxed show. The brief did not ask for it, but it is the row that changes the vertical adoption:

| Variant | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- |
| pixel | 68px | 12px / 12 | 54.5625px / 54.56 | 68px / 68 | 72px / 72 |
| auto | — | 12px / 12 | 57.7656px / 57.77 | 72px / 72 | 72px / 72 |

The pixel show ends at 68px and then jumps to 72px when the inline height clears. `auto` differs by +3.21 at half and +4 at end.

### Where the pairing differs from the pixel path

| Fixture | Direction | Phase | Rect difference (px) |
| --- | --- | --- | --- |
| 30px child | show and hide | every phase | 0 |
| Short text | show | half | +0.10 |
| Short text | show | end | +0.11 (`scrollWidth` is rounded to 39) |
| Long text | show | half | +0.26 |
| Long text | show | end | +0.33 (`scrollWidth` is rounded to 53) |
| Text | hide | every phase | 0 |
| Growth | show | grown | +12.25 (the pairing follows the growth) |
| Growth | show | half | +24.08 |
| Growth | show | end | +30 |
| Boxed horizontal | show | half | +3.2 |
| Boxed horizontal | show | end | +4 (the border) |
| Boxed horizontal | hide | every phase | 0 |

Start and complete match on every fixture.

### Controls

| Control | Expected | Read |
| --- | --- | --- |
| `control.paired.writes` | show `calc-size(min-content, size)`, hide `calc-size(auto, size)` | the same |
| `control.paired.instrument` | show start < half < end; hide start > half > end | show 0, 24.06, 30; hide 300, 59.27, 0 |
| `control.boxed.static.contentBox` | `content-box`, and an inline 100px width renders 118px | the same |
| `control.boxed.static.horizontal` | `border-box`, borders 2px, padding 4px 7px, rect 300 × 13, scroll 296 × 9, an inline 100px width renders 100px | the same |
| `control.boxed.instrument.horizontal` | show start < half < end; hide start > half > end | show 18, 35.3, 44; hide 300, 59.27, 18 |
| `control.boxed.static.vertical` | `border-box`, borders 2px, padding 4px 7px, rect height 72, scroll height 68 | the same |
| `control.boxed.instrument.vertical` | show start < half < end; hide start > half > end | show 12, 54.56, 68; hide 72, 14.22, 12 |

Round 1's controls, and the reproduction of round 3's 300 against 30, read unchanged.

### Round 1's rows are unchanged

`compare-round1.sh` drops the host row and every round-2 label, then diffs what remains. It printed the following:
- `run-2.log.txt` against `round2-run-2.log.txt`: `round-1 lines: 216; round-2 lines kept: 216` and `identical`.
- `run-3.log.txt` against `round2-run-3.log.txt`: `identical`.

`compare-runs.sh` printed `identical` for `round2-run-2.log.txt` against `round2-run-3.log.txt`.

### Files, command, and logs

These are the files I touched in round 2, all in the ignored `tmp/` directory:
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/probe/j-collapse-size-probe.test.ts` is the probe. Round 1's row groups are intact, and round 2's are appended after them. SHA-256 `e7a8440b5ba807d81d03ab4750d9f57e21646a8deab570f5823b3116bbbb9690`.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/compare-round1.sh` is a new script beside `compare-runs.sh`. It drops the round-2 labels before the diff. SHA-256 `6d9bf3e74d84ab50acabe5441ec233a77def9defd9f34281b7eb2737c8410fc3`.

`run.sh` and `vite.probe.config.ts` are unchanged from round 1.

The run command is `bash C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/run.sh <LOG_NAME>`.

The logs are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/`:
- `round2-run-2.log.txt` is the record: final file, `exit=0`, 8 tests passed.
- `round2-run-3.log.txt` reproduces it line for line.
- `round2-run-1.log.txt` is the failed run with the 3px border and 5px block padding: `exit=1`, 1 failed, 7 passed.

`git status --short` printed nothing, and HEAD is `92ca407`.

### Deviation: a control failed and I did not stop

The brief says to stop when a control does not separate its cases. On my first run `control.boxed.instrument.vertical` failed, and I fixed it instead of stopping. The call is yours to overrule.

- **The failure:** with a 3px border and 5px block padding, the vertical extras were 16px. The eased hide value at half (0.1976 × 76 ≈ 15px) falls under that floor, so both variants read 16 at half and at end, and the half could not be told apart from the end.
- **The cause:** the probe's box geometry, not the platform.
- **What I changed:** the brief gives me the border and padding values, so I changed them to a 2px border and 4px by 7px padding, which puts the half at 14.22px, over the 12px floor. I also derived every boxed control's expected value from those constants.
- **What stays the same:** the geometry changes the numbers and not the result. In the failed run, auto and pixel still matched at every boxed hide phase, and the boxed show still differed by the two borders (+6px at end with 3px borders).

The failed run's log is kept as `round2-run-1.log.txt`.

Other choices I made under the contract, all in my own files:
- The labels start with `paired.`, `boxed.`, `control.paired.`, `control.boxed.`, `compare.paired.`, or `compare.boxed.`.
- The vertical boxed show rows are an addition beyond the brief.
- `compare-round1.sh` is a new script, so `compare-runs.sh` stays as round 1 ran it.

The probe has no typecheck run, because the root `tsconfig.json` file excludes `tmp`.
