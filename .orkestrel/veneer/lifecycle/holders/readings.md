# H6 readings — contention between parallel holders (2026-10-05)

Instrument: browser `tmp/probes/holders/` (`node tmp/probes/holders/main.ts [--load] --sizes 1,2,3 --count 5`), driving the built `browse` binary of browser `main` after `e931740` (0.0.24 plus the concurrent-replay fix) over stdio; Windows 10.0.26300, Node 24.21.0, Edge 154.0.4258.53, 16 logical cores. Every control passed (`report-h6b.md`: acquisition against execution, concurrent delivery, distributions, completed work and replay failure, refusals, cancellation, cleanup by state, loss-to-success, memory and CPU, idle settling, background load). The body of work is the same at every size: interactive holders on the heavy fixture, an interactive holder beside a looping replay, recording beside replay, concurrent replays, holder turnover, and a loss with every browser leased; 19 completed items per body at every size.

| Size | Quiet wall (5 bodies) | Loaded wall (5 bodies) | Idle summed working set, settled | Loss to success, every browser leased |
| --- | --- | --- | --- | --- |
| 1 | 80.6 s, SD 0.7 | 86.4 s, SD 1.8 | 2.18 GB quiet, 2.06 GB loaded | 2.45 s |
| 2 | 66.5 s, SD 0.7 | 73.6 s, SD 0.7 | 4.12 GB quiet, 3.86 GB loaded | 2.99 s |
| 3 | 64.9 s, SD 1.0 | 73.1 s, SD 1.3 | 5.77 GB quiet, 5.55 GB loaded | 2.98 s |

- Runs: quiet `run-9IesXQ`, loaded `run-7fAPBz` (the background `npm run test:src:core` loop passed every run, 36 of 36).
- Size 2 against size 1: 17.5% less wall quiet and 14.8% under load, each many times the spread.
- Size 3 against size 2: 2.4% less quiet; 0.7% under load, inside the spread.
- Summed working set counts shared pages once per process, so it overstates unique memory; each extra browser adds about 1.7 to 2.0 GB of it. Idle CPU readings ranged 23% to 68% of one core across sizes and runs without a size trend (Edge background work); they do not separate the sizes.
- The size-2 pilot first exposed concurrent replays of one journey failing `BROWSER_JOURNEY_LOCKED` across holders, fixed at browser `e931740` before these runs.

Reading against the rule (`synthesis.md` § Measurement plan): size 2 finishes the body faster with the load passing; size 3 adds no measurable gain under load. The default-size ruling waits on the contexts probe (browser `tmp/codex/contexts-probe-brief.md`), which measures whether a holder as an isolated context inside a shared browser costs less per extra holder.
