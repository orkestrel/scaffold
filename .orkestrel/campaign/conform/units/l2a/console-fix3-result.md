All changes are within Owned files from prior rounds plus this round's `src/server/factories.ts`, `src/core/helpers.ts`, `tests/src/server/factories.test.ts`. No off-limits file touched. All gates green, only the expected `configs/browsers.ts` audit row.

## Fix round 3 report

# Unit conform-console fix round 3 — report

## Rows

| Row | Site | Line now |
| --- | --- | --- |
| 1 | `tests/src/server/factories.test.ts:11` | `it('routes error and warn to the stderr stream, everything else to stdout', () => {` |
| 2 | `tests/src/server/factories.test.ts:87` | `it('applies styled:false to stdout and stderr even when one target is a TTY', () => {` |
| 2 | `tests/src/server/factories.test.ts:98` | `it('applies styled:true to stdout and stderr even when neither target is a TTY', () => {` |
| 3 | `tests/src/server/factories.test.ts:375` | `it('routes only error and warn to stderr; info / debug / an omitted level go to stdout', () => {` |
| 4 | `tests/src/server/factories.test.ts:214` | `it('reports the live stdout-stream width on a TTY', () => {` |
| 4 | `src/server/factories.ts:77` | `// A fixed override wins; otherwise the live stdout-stream width (tracks a resize), with the` |
| 5 (F3-1) | `src/core/helpers.ts:167-169` | `selectWriter('error', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stderr'` / `selectWriter('debug', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stdout'` / `selectWriter(undefined, { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stdout'` |

Row 5's confirmation: the remark at `src/core/helpers.ts:156-158` states that the server sink routes `warn` alongside `error` by supplying its error stream for both, matching `console.warn` writing to `stderr`. The corrected example's folded set (`warn: 'stderr'`) now demonstrates exactly that fold, where fix round 2's set left `warn` at `'stdout'` and disagreed with the remark.

## Capture and sweep (row 6, R3-B)

`\b(out|err)\b` (case-sensitive) re-run through the `Grep` tool over `src`; `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `guides/console.md`; `guides/README.md`; `README.md`. The tool's verbatim output is written to `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, keeping the `[Omitted long matching line]` rendering at `guides/console.md:400` and no row from the three excluded files. `guides/README.md` and `README.md` return no matches.

Rulings for the remaining hits, by sense:

- **`fan out` / `fan-out` / `fans out` prose** across `src/core/types.ts`, `src/core/loggers/LoggerManager.ts`, `src/core/constants.ts`, `src/core/Reporter.ts`, the mirrored tests, and `guides/console.md` — ordinary English for the registry's broadcast behavior.
- **Other ordinary-English `out`** — `kept out`, `lay out`, `pad(s) out`, `copies out`, `SGR string out`, `out-of-range`, `swapped out`, `leaks out`, `on its way out`, and similar — none names a target.
- **Local bindings and the prose describing them** — `src/server/factories.ts`'s permitted `out` / `err` bindings, and every `const out = …` / `const err = …` binding plus its describing prose across `src/core/factories.ts`, `tests/src/core/**`, `tests/src/server/ProcessCapture.test.ts`, `tests/setupServer.ts:38`, `guides/console.md:522`, and the remaining `out.target` / `err.target` / `out.writes` / `err.writes` / `no level → out` sites in `tests/src/server/factories.test.ts` — each is that file's own local variable, not a `ServerSinkOptions` field name.
- **`selectWriter`'s generic sample strings** at `tests/src/core/helpers.test.ts:1164-1195` — off-limits under this round's scope, names no renamed target.
- **`RangeError('out')`** at `tests/src/core/helpers.test.ts:945-946` — an unrelated error-message fixture.

No title, comment, or example in the recorded set names a `ServerSinkOptions` target with the old words after this round.

## Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23 passed (3 files), `guides` 91 passed |

## Audit as read

```
┌─────────────────────┬─────────┬───────┐
│ path                │ group   │ drift │
├─────────────────────┼─────────┼───────┤
│ configs/browsers.ts │ configs │ stale │
└─────────────────────┴─────────┴───────┘
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

This `configs/browsers.ts` row is the Orchestrator's, unchanged from fix round 2's disposition; this round's rows do not touch it (`git status --short` shows the file unmodified). Read as reported, not stopped on.

`node /home/user/scaffold/tmp/work/evidence.mjs console` wrote `/home/user/work/evidence/conform-console.diff` (3896 lines) and `/home/user/work/evidence/conform-console.status` (39 entries).

No deviation occurred. Files touched this round: `tests/src/server/factories.test.ts`, `src/server/factories.ts`, `src/core/helpers.ts`, `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, `/home/user/scaffold/tmp/units/conform/conform-console-report.md`.
