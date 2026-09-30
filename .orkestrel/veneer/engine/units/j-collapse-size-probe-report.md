J-COLLAPSE-SIZE-PROBE — writer report (opus on Opus 5.5)

## J-COLLAPSE-SIZE-PROBE report

No single `calc-size()` basis matches Bootstrap's pixel path at every phase of both show and hide.
- **Show:** the content bases (`min-content`, `fit-content`, `max-content`) match the pixel path at every phase on the 30px child. `min-content` is the only one that also tracks it on text, within a sub-pixel.
- **Hide:** only `auto` matches at every phase on every fixture.
- **Growth:** every content basis follows content that grows mid-show, and the pixel path does not.

Every control read its expected value on HeadlessChrome 153.0.8010.12. Round 3's reading reproduces: the pixel path ends at `30px`, and `calc-size(auto, size)` ends at `300px`.

### Phase tables, 30px child in a 300px container

Each cell is the computed width / the rect width. The phases are:
- **start:** paused at t=0.
- **half:** paused at t=200ms, through `pausedWidthAtHalf`.
- **end:** after `finish()`, with the inline width still set.
- **complete:** Bootstrap's `complete`. On show that is the class swap plus the inline clear. On hide it is the class swap only, because Bootstrap clears the inline width before the hide transition starts.

Hide adds two phases before the transition:
- **shown:** the open panel before the write.
- **written:** after the inline write, before the class swap.

**Pixel path** (show writes `30px`; hide writes `300px`)

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 24.0625px / 24.06 | 30px / 30 | 300px / 300 |
| hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 0px / 0 | auto / 0 |

**`calc-size(auto, size)`**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 240.719px / 240.72 | 300px / 300 | 300px / 300 |
| hide | 300px / 300 | 300px / 300 | 300px / 300 | 59.2656px / 59.27 | 0px / 0 | auto / 0 |

**`calc-size(max-content, size)`**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 24.0625px / 24.06 | 30px / 30 | 300px / 300 |
| hide | 300px / 300 | 30px / 30 | 30px / 30 | 5.92188px / 5.92 | 0px / 0 | auto / 0 |

**`calc-size(fit-content, size)`**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 24.0625px / 24.06 | 30px / 30 | 300px / 300 |
| hide | 300px / 300 | 30px / 30 | 30px / 30 | 5.92188px / 5.92 | 0px / 0 | auto / 0 |

**`calc-size(min-content, size)`**

| Direction | shown | written | start | half | end | complete |
| --- | --- | --- | --- | --- | --- | --- |
| show | — | — | 0px / 0 | 24.0625px / 24.06 | 30px / 30 | 300px / 300 |
| hide | 300px / 300 | 30px / 30 | 30px / 30 | 5.92188px / 5.92 | 0px / 0 | auto / 0 |

### Growth rows

In these rows the child widens from 30px to 60px while the show is paused at t=100ms. The `grown` column is the reading taken after the growth, still at t=100ms.

| Variant | quarter | grown | half | end | complete |
| --- | --- | --- | --- | --- | --- |
| pixel | 12.25 | 12.25 | 24.06 | 30 (stale) | 300 |
| auto | 122.55 | 122.55 | 240.72 | 300 | 300 |
| maxContent | 12.25 | 24.5 | 48.14 | 60 | 300 |
| fitContent | 12.25 | 24.5 | 48.14 | 60 | 300 |
| minContent | 12.25 | 24.5 | 48.14 | 60 | 300 |

### Differences from the pixel path

These are the rect-width differences in px. Every phase not named matches with 0px difference and an equal computed width.

On the 30px child:
- **`auto`:** show differs at half by +216.66 and at end by +270. Hide matches at every phase.
- **`max-content`, `fit-content`, `min-content`:** show matches at every phase. Hide differs at written by −270, at start by −270, and at half by −53.35. The open panel jumps from 300px to 30px at the write, before any transition.
- **Growth:** the content bases differ at grown by +12.25, at half by +24.08, and at end by +30, because they follow the grown child. `auto` differs at quarter and grown by +110.3, at half by +216.66, and at end by +270.

I added text fixtures because a 30px child cannot separate the content bases:
- **Short text, "Alpha beta":** min-content 39.11, max-content 69.75.
- **Long text:** min-content 53.33, max-content 612.25, fit-content 300.

On text, the pixel show writes `scrollWidth` at width 0: 39px for the short text and 53px for the long text. That is the min-content width rounded to an integer. The differences on text are:
- **`min-content`:** show differs by +0.10 at half and +0.11 at end on the short text, and by +0.26 at half and +0.33 at end on the long text. That is `scrollWidth` rounding. Hide differs at written and start by −260.89 (short) and −246.67 (long).
- **`max-content`:** show differs by +24.67 at half and +30.75 at end (short), and by +448.75 at half and +559.25 at end (long). On the long text the panel overshoots the 300px container to 612.25px. Hide differs at written and start by −230.25 (short) and +312.25 (long).
- **`fit-content`:** show matches `max-content` on the short text, and matches `auto` on the long text (+198.2 at half, +247 at end). Hide differs like `max-content` on the short text, and matches at every phase on the long text.
- **`auto`:** show differs by +209.44 at half and +261 at end (short), and by +198.2 at half and +247 at end (long). Hide matches at every phase on both.

### The brief's unknown

Can a basis both run to the child's scroll width and end in the same state as Bootstrap's inline clear?
- **On show, yes.** `calc-size(min-content, size)` runs to the scroll width, within a sub-pixel, on every fixture measured. After the clear it ends at 300px, the same jump the pixel path makes.
- **On hide, no content basis does.** Bootstrap writes the rect width, which is the auto width, and only `calc-size(auto, size)` matches it.

`min-content` on show paired with `auto` on hide matches the pixel path at every phase on every fixture, apart from the sub-pixel rounding. I did not measure that pairing as its own row. It is the Orchestrator's to rule on.

### Controls

| Control | Expected | Read |
| --- | --- | --- |
| `control.completion.horizontal.static` | `{width:300px, scrollWidth:300, rectWidth:300}` | the same |
| `control.reproduce.horizontal` | pixel finishes 30px and completes 300px; auto finishes 300px and completes 300px | the same (midpoints 24.0625px and 240.719px, as round 3 read) |
| `control.basis.supports` | each basis true, `no-such-basis` false | the same |
| `control.basis.static.horizontal` | auto 300; max, fit, and min 30; scrollWidth at zero 30 | the same |
| `control.basis.static.shortText` | min < max = fit < auto = 300 | min 39.11, max 69.75, fit 69.75, auto 300, scrollWidth at zero 39 |
| `control.basis.static.longText` | min < fit = auto = 300 < max | min 53.33, fit 300, auto 300, max 612.25, scrollWidth at zero 53 |
| `control.instrument.pixel.show` | start 0 < half < end 30 | 0, 24.06, 30 |
| `control.instrument.pixel.hide` | start 300 > half > end 0 | 300, 59.27, 0 |
| `control.instrument.text.transition` | `width` on the short and long text | the same |
| `control.growth.static` | max-content 30 → 60; block 300 → 300 | the same |

### Files, command, and logs

These are the touched files, all in the ignored `tmp/` directory, so there is no diffstat:
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/probe/j-collapse-size-probe.test.ts` is the probe. SHA-256 `3c837a86d4891b32b0c3e37855c2519fb98219a09a8739063df15586571c7245`.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/vite.probe.config.ts` is the run config, composing this worktree's `srcBrowser` with no setup files. SHA-256 `53fc324d37df110b2894fa77143f9f5ec425a59aeadbe0bb3ab28a5cd6bfdd75`.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/run.sh` is the run script. SHA-256 `2ba8be2ce2d7c2f17b5e0efe04de526510170b80756c6abca6f16bc767a9a2f6`.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/compare-runs.sh` compares the `ROW` and `CONTROL` lines of two logs.

The run command is `bash C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/run.sh <LOG_NAME>`. `LOG_NAME` is the log file name the script writes under `tmp/j-collapse-size/`.

The logs are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/`:
- `run-2.log.txt` is the record: final file, `exit=0`, 5 tests passed.
- `run-3.log.txt` is the reproduction. Its `ROW` and `CONTROL` lines are identical to `run-2.log.txt`.
- `run-1.log.txt` came from the file before I added the `host.userAgent` row. Its readings are identical to the later runs.

`git status --short` printed nothing, and HEAD is `92ca407`.

### Validation and deviation state

- **Typecheck:** I did not typecheck the probe, because the root `tsconfig.json` file excludes `tmp`. Vitest ran it on Chromium 153.
- **Deviation:** none. Every control separated its cases.
- **Settled myself, under the deviation contract:**
  - the two text fixtures;
  - the hide `shown` and `written` phases;
  - the `compare.*` and `host.userAgent` rows;
  - the `compare-runs.sh` script.
- **Not measured:** a border or padding on the panel. Bootstrap's hide writes the rect width, which includes both, so this might separate `auto` from the pixel path on hide.
