# Unit voice-ollama — report

## Outcome

Every TSDoc block under `src/` of `/home/user/fleet/ollama` opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The tree is uncommitted and holds no change outside `src/`.

The acceptance instrument agrees. Re-running the launch classifier over the package after the sweep:

```text
TOTAL {"files":8,"blocks":31,"imperative":0,"verbless":0,"returnsBad":0}
```

at launch it read `files=8, blocks=31, imperative=2, verbless=19, returnsBad=1`.

The package has no `app/` directory, so the sweep covered `src/server/` alone.

## Rewrites by kind

Counts are edited lines, disjoint, and sum to the diff's 23 changed lines.

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentence from the imperative               | 1     |
| First sentence given a verb                      | 20    |
| First sentence reworded to drop the symbol's name | 1    |
| Boolean `@returns`                               | 1     |

- Imperative: `createOllama` in `src/server/factories.ts`, `Create` to `Creates`.
- Name repetition: the `OllamaOptions` interface in `src/server/types.ts` opened with "Options for
  createOllama", which leads with its own name's word. It now reads "Represents the configuration
  createOllama accepts for the local Ollama backend."
- Boolean `@returns`: `isOllamaHTTPError` in `src/server/errors.ts`, from "`true` when `value` is
  an `OllamaHTTPError`" to "True if `value` is an `OllamaHTTPError`; false otherwise".
- Verbs chosen by symbol class: `Names` for a module constant, `Represents` for an interface or an
  error class, `Holds` for a wire-shape property, `Sets` for an `OllamaOptions` configuration
  member, `Carries` for the passthrough bag, `Implements` for the provider class, `Exposes` for the
  `format` getter, `Checks whether` for the guard.

## Files touched

- `/home/user/fleet/ollama/src/server/OllamaProvider.ts` — class summary and the `format` getter
  summary take a verb.
- `/home/user/fleet/ollama/src/server/constants.ts` — four constant summaries take `Names`.
- `/home/user/fleet/ollama/src/server/errors.ts` — error-class and guard summaries take a verb; the
  guard's boolean `@returns` takes the ruled form.
- `/home/user/fleet/ollama/src/server/factories.ts` — `createOllama` summary moves to third person.
- `/home/user/fleet/ollama/src/server/types.ts` — three interface summaries and ten member summaries
  take a verb, one of them reworded to drop the symbol's name.

Diffstat: `5 files changed, 23 insertions(+), 23 deletions(-)`.

Every `@param`, `@remarks`, `@throws`, `@example`, and later sentence is byte-identical to the launch
tree; the diff's changed lines are the summary first lines plus the single `@returns` line.

## Gates

Run from `/home/user/fleet/ollama`. No mutating converge step was needed: `format:check` passed on
the first run.

| Command                | Exit | Excerpt                                             |
| ---------------------- | ---- | --------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.`          |
| `npm run lint:check`   | 0    | no output                                            |
| `npm run check`        | 0    | no output                                            |
| `npm run build`        | 0    | `dist/src/server/index.js 22.69 kB`, `built in 2.92s`|
| `npm test`             | 0    | src, setup, policy, config 46, guides 18, conformance 17 all passed |

`npm test` timing is an observation, not a criterion; the Orchestrator's landing chain is the
authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-ollama.diff`
- `/home/user/scaffold/tmp/units/voice/voice-ollama.status` — lists `src/server/OllamaProvider.ts`,
  `src/server/constants.ts`, `src/server/errors.ts`, `src/server/factories.ts`,
  `src/server/types.ts`, and nothing else.

## Deviations

1. **The rule path the brief names does not exist in this checkout.** Expected
   `/home/user/fleet/ollama/.claude/rules/typescript.md`. Found `.claude/` holding `agents/` and
   `settings.json` only (`ls -a .claude` and `find . -name typescript.md -not -path ./node_modules/*`
   both empty of it). This package's `AGENTS.md` resolves every rule path against scaffold, so I read
   the installed copy at
   `node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`, whose § Comments and API
   documentation carries the quoted rule verbatim. Done, not blocking. Hypothesis: the brief's path
   was written from the scaffold checkout's own layout, which a target repository does not carry.
2. **Two blocks sit in a different kind than the launch classifier recorded.** Expected the
   classifier's `imperative=2` and `verbless=19` to name the blocks by kind. Found that
   `src/server/types.ts:98` (`Passthrough sampling options (…)`) counted as imperative but is a bare
   noun phrase, and `src/server/types.ts:69`, opening "Options for createOllama", counted as
   third-person but is also a bare noun phrase, because `Options` matches the classifier's
   `[A-Z][a-z]+s` third-person pattern. Both were read in context and rewritten, so the post-sweep
   scan is clean either way. Done. Hypothesis: the classifier over-approximates by design, as the
   brief states, and `Options` is the false-negative direction that statement did not name.
