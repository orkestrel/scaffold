## Fix round 2

Audit round 2's Luna checker held claims 1, 3, 5, 7, 9 on the narrow pattern; the objective lane (Opus, from the Luna distillate) held every claim but 3 and named the five prose sites and the `selectWriter` example that survived fix round 1 as the old words `out` / `err`. Each row following names the line now at its site.

| Row | Site | Line now |
| --- | --- | --- |
| 1 | `src/server/types.ts:67` | "the same consumer enable or disable its styler for the `stdout` target." |
| 2 | `src/server/constants.ts:24` | "when the `stdout` stream is not a TTY (so" |
| 3 | `guides/console.md:603` | `const styler = createStyler({ enabled: sink.styled }) // keep generated ANSI paired with the sink's stdout stripping` |
| 4 | `tests/src/server/factories.test.ts:28` | `it('infers styling independently for a TTY \`stdout\` target and a piped \`stderr\` target', () => {` |
| 4 | `tests/src/server/factories.test.ts:224` | `it('falls back to 80 when the \`stdout\` stream is not a TTY', () => {` |
| 5 | `src/core/helpers.ts:167-169` | `selectWriter('error', { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stderr'` / `selectWriter('debug', { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stdout'` / `selectWriter(undefined, { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stdout'` |

Row 3's presence guard: `Grep` for `out stripping` in `tests/guides.test.ts` returned no hit, so no transcribed fence line quoted the old comment and no guard needed a matching update.

Row 5's alignment check: `Grep` for `selectWriter(` across `tests/**` found only `tests/src/core/helpers.test.ts:1167-1203`, which exercises the generic `WriterSet<T>` overload with its own arbitrary sample strings `'out'` / `'err'` / `'warn'`, unrelated to `ServerSinkOptions` and outside this round's scope (off-limits) — no assertion there reads the renamed example's strings, so no alignment edit was needed.

Row 6's sweep — the `\b(out|err)\b` pattern replacing the round 1 narrow `\b(out|err)\s*:` pattern — is recorded in § Sweeps under "The re-run narrow sweeps (console-fix1-2, claim 3)" and captured at `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`. Every remaining hit is ruled permitted: `fan out` / `fan-out` prose, other ordinary-English `out`, the Orchestrator's already-permitted local bindings in `src/server/factories.ts`, and the matching local `out` / `err` bindings (and the prose describing them) in `src/core/factories.ts`'s example, `tests/src/server/factories.test.ts`, `tests/src/server/ProcessCapture.test.ts`, `tests/src/core/**`, `tests/setupServer.ts`, and `guides/console.md:522`'s capture example — none of which names the renamed `ServerSinkOptions.stdout` / `.stderr` field.

Gates, run from `/home/user/fleet/console` after the rows landed:

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23 passed (3 files), `guides` 91 passed |

`npx scaffold audit --offline` printed:

```
┌─────────────────────┬─────────┬───────┐
│ path                │ group   │ drift │
├─────────────────────┼─────────┼───────┤
│ configs/browsers.ts │ configs │ stale │
└─────────────────────┴─────────┴───────┘
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

The Orchestrator's disposition: this `configs/browsers.ts` stale row is the same vendored-file drift carried in the Orchestrator's drift database at 16:19 UTC, settled at landing with `scaffold repair`, not a condition this unit's rows touch or own (`git status --short` shows the file unmodified). The audit's zero-drift criterion is read at the landing's deciding run, not inside this unit's exec.

`git status --short` continues to list only Owned paths beside the unit's earlier entries. Full output in `/home/user/work/evidence/conform-console.status`; the diff in `/home/user/work/evidence/conform-console.diff`.
