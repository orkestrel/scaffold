# Unit U8 report: the accepted U7-audit findings, landed

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/process`.
Brief: `unit-u8-brief.md`. Returned 2026-08-21. Fixes 1, 3, 4, 5, 6 landed green; fix 2
(the latency pin) was withdrawn on measurement, reported as a deviation, and ruled on by
the Orchestrator in the amendment appended to `audit-u7-reconciliation.md`.

## The deviation, measured

The brief predicted a late `stop()` waits a fresh full drain against the unfixed tree. The
measurement refutes the prediction. Vector: `orphan` fixture (descendant holds the read
ends forever), `drain: 1_000`, park 800 ms after `child.code !== null`, then measure
across `await child.stop()`:

| Run | Tree | Result |
| --- | --- | --- |
| unfixed | assertion `elapsed < drain / 2` | passed, elapsed 203.29 ms |
| unfixed | assertion forced to `toBeLessThan(0)` | `expected 203.2895000000001 to be less than 0` |
| fixed | same forced assertion | `expected 188.7548999999999 to be less than 0` |

Mechanism: the redundant `waitForClose` that `#kill` armed resolves on the host `close`
that `#settle`'s read-end destruction fires, so the two overlapping waits end within one
close-event latency of each other on every constructible timing. The structural defect —
two bounded waits, a redundant timer, a redundant field — is real; its predicted latency
is not observable. The unit removed the pin rather than land a test that never ran red,
and landed fix 1 as a consolidation proven by the existing suite staying green.

## Touched files

- `src/server/Process.ts` — `#cutoff`/`#cut` replaced by one idempotent `#wait()` holding
  a shared `#waiting` promise backed by `waitForClose`; `#expire` starts it, `#kill`
  awaits the same one; `#settle` drops its `clearTimeout`. The comment on `#wait` records
  the listener-order fact that keeps the natural-close path settling `drained: true`.
- `tests/src/server/Process.test.ts` — both comments restated as the observable latch
  rule; no host-close arrival claim remains.
- `guides/process.md` — the `drain` paragraph names both arming conditions; the option
  table row and the fence comment that carried the identical falsified framing corrected
  in scope; the widened table column re-padded by the formatter, scoped to the one file.
- `src/core/types.ts` — the `lines` loss window stated against the terminal moment,
  including the undrained-cutoff loss of an unframed trailing partial.
- `src/core/constants.ts` — the `PROCESS_DRAIN` summary names both arming conditions;
  the measured-basis remark untouched.

## Acceptance evidence

- `git status --porcelain` before and after byte-identical; every owned file already dirty.
- Scoped `oxfmt --check` and `oxlint --deny-warnings` on the owned files: exit 0.
- `tsc --noEmit --project tsconfig.json`: exit 0.
- `test:src:server`: exit 0, `Tests 148 passed | 6 skipped (154)`.
- `test:guides`: exit 0, `Tests 99 passed | 2 skipped (101)`.
- `test:distribution -- --mode release`: exit 0, `Tests 1 passed (1)`.
- `tests/guides.test.ts`: every `toContain` string read; none pins a sentence the fixes
  rewrote; file untouched.

The cross-engine re-check of this unit is `audit-u8-brief.md`; its verdict file is
`audit-u8-verdict.md`.
