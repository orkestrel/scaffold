# Unit probe-mechanisms — report

Run 2026-09-01, node v22.22.2, `instruments/mechanisms.mjs`, output `results/mechanisms.out`.
Isolated mechanism patterns, no contract import. Identity control (try/catch A vs B): 7.7%
spread — within round noise; the instrument discriminates.

| mechanism | defensive form | candidate form | ratio | verdict |
| --- | --- | --- | --- | --- |
| M-B required-key presence | fresh `Set` + apply per key: 307 ns | `hasOwnProperty` apply per key: 69 ns (plain reads 73 ns) | 4.4x | candidate wins |
| M-C array element read (4 items) | snapshot with sort + round-trip + freeze: 929 ns | honest packed walk with hole check: 12 ns | 76x | candidate wins |
| M-D `WeakMap` memo read | `Reflect.apply(get, memo, [k])`: 17.7 ns | pre-bound get: 17.5 ns; plain `memo.get`: 17.8 ns | 1.0x | NO win — drop the de-Reflect strategy on evidence |
| M-E internal keys array | `freeze(keys(v))`: 74 ns | bare `keys(v)`: 27 ns | 2.8x | candidate wins (semantics ruling needed: the frozen array is internal) |
| M-A `attempt` + `Result` per call | 2.9 ns measured | try/catch: 9.3-10.1 ns | inverted | UNRESOLVED in isolation |

M-A reading: with a tiny inlinable body V8 escape-analyzes the closure and the `Result` object
away, so the isolated instrument measures inlining, not the mechanism; the in-situ cost is real
(`attempt` at 5.6% of deep-audit samples, GC ~10% on a boolean guard path). The question passes
to a library-level strategy probe on the real code. Reported unanswered per
`.claude/rules/quality.md` § Instruments rather than answered with the weaker instrument.

Coverage: single-process A/B with per-variant call sites; IC pollution across variants possible;
magnitudes only. Library-level effect of every adopted strategy re-measures against the ops
baseline per process at implementation time.
