# Unit voice-emitter — report

Every TSDoc block under `src/` of `/home/user/fleet/emitter` opens with a third-person `-s` verb
sentence, no first sentence repeats its symbol's name, and the gate chain exits 0 at every step.
The package has no `app/` directory.

## Blocks rewritten by kind

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative              | 1     |
| First sentence given a verb (was verbless)      | 9     |
| First sentence reworded to drop the symbol name | 0     |
| Boolean `@returns` rewritten                    | 0     |

The launch scan reported imperative=2, verbless=7. The kinds differ from those buckets for two
classifier reasons, and the population is the same blocks plus one the scan missed:

- `EmitterHooks` ("Initial event listeners for an emitter …") is a bare noun phrase the classifier
  bucketed as imperative, because `Initial` matches its leading-word pattern. Rewritten as verbless.
- `EmitterOptions` ("Options for `createEmitter` …") is a bare noun phrase the classifier scored as
  third person, because `Options` ends in `-s`. It is a genuine hit and is rewritten.

Every other block already satisfied the rule and is untouched.

## Files touched

- `/home/user/fleet/emitter/src/core/types.ts` — first sentences of `EventMap`, `EmitterHandler`,
  `EmitterErrorHandler`, `EmitterHooks`, `EmitterOptions`, `EmitterOptions.error`,
  `EmitterInterface`, and `EmitterInterface.destroyed` moved to a third-person `-s` verb.
- `/home/user/fleet/emitter/src/core/Emitter.ts` — class block opens `Implements a typed
  synchronous event emitter …`.
- `/home/user/fleet/emitter/src/core/helpers.ts` — `extractKeys` opens `Extracts …`.

`src/core/index.ts` and `src/core/factories.ts` carry no block needing a change; `createEmitter`
already read `Creates a typed event emitter …`.

Every `@remarks`, `@param`, `@typeParam`, `@returns`, and `@example` line, every later sentence,
and every code token are byte-identical to the launch tree. Line breaks inside each rewritten
block are unchanged: only the line carrying the first sentence's opening moved.

## Gates

| Command                | Exit | Note                                             |
| ---------------------- | ---- | ------------------------------------------------ |
| `npm run format:check` | 0    | 37 files, all correctly formatted                 |
| `npm run lint:check`   | 0    | no warnings under `--deny-warnings`               |
| `npm run check`        | 0    | root project and `configs/src/tsconfig.core.json` |
| `npm run build`        | 0    | `dist/src/core/index.cjs` 6.28 kB, built in 1.86s |
| `npm test`             | 0    | src:core, policy, config, setup, guides all pass  |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.
`npm test` timing is an observation from this unit's own exec; the landing chain is authoritative.

Acceptance instrument re-run (`.orkestrel/campaign/instruments/voice-scan.mjs`):

```text
emitter     files=  5 blocks=  18 imperative=   0 verbless=   0 returnsBad=  0
```

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-emitter.diff`
- `/home/user/scaffold/tmp/units/voice/voice-emitter.status`

`git status --short` lists `src/core/Emitter.ts`, `src/core/helpers.ts`, and `src/core/types.ts`,
and nothing else. The tree is uncommitted and unstaged.

## Deviations

none.
