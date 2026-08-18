# Design brief — the simplest implementation of the probe mechanism

Read `/home/user/scaffold/PROBE.md` first. It is the accepted ruling and its measurements are
settled. This brief asks a narrower question that the user has now fixed.

## The question

How SIMPLE can this be? Rank designs by machinery, not by capability.

The user's exact constraints:

- "I don't care about the work that goes into apply across the fleet, that's the whole point of
  the scaffold project." Propagation cost is FREE. Do not weigh it.
- "All that matters is how simply and uniformly we can apply it once and then propagate."
- "The idea is to have as little machinery as possible and at specific points."
- "We should still consider latency, it still needs to be fast, just be considerate of the
  trade-offs and be upfront about them and provide the different ways we could do this if I
  could choose."

So: produce an OPTION SET the user can choose from, each with an exact machinery inventory, an
honest latency number, and the hazards it inherits. Then recommend one.

## Measurements that bound the options (all taken in this checkout, 2026-08-18)

1. One-shot process, no residency, all three stages concurrent: 3182–3459 ms wall, 2259–2566 ms
   internal. Verdicts correct (a probe with a type error and a failing assertion reported
   `types=1 test=fail`).
2. Resident service, all three stages warm: median 337 ms over 12 calls, range 315–440 ms.
   Stage split warm: type 57–83 ms, lint 15–22 ms, runtime 259–346 ms.
3. Today's `npm run test:probe`: 3874 ms cold, 2751 ms warm, and it delivers ONLY the runtime
   signal. It also exits 1 when `tmp/probe/` is empty.
4. Cold costs that residency removes: TypeScript LanguageService 1198 ms, Vitest boot 358 ms plus
   cold run 771 ms, Oxlint LSP initialize 269 ms.
5. REVALIDATION IS CHEAP. Walking `src`, `tests`, and `configs` finds 60 files; the walk costs
   1.4 ms and re-statting every file to detect what moved costs 0.5 ms per call. The staleness fix
   — stat, `invalidateFile` for moved files, version TypeScript snapshots by modification time —
   is therefore roughly 20 lines and about 2 ms.
6. Oxlint CANNOT lint a gitignored path. `--no-ignore` fails in every argument position tested,
   with an absolute or relative path. The only mechanisms that work are relocating the bytes to a
   non-ignored path (`/dev/shm` proven) or the LSP with a virtual document URI (proven, 1–5 ms
   warm, and the URI need not exist).
7. A naive one-shot that lints the real `tmp/probe/` file reports 0 findings for a file containing
   `export default n`. That is a REFUSAL READING AS A PASS, and any option must state how it
   avoids it.
8. Node process boot is 38–43 ms, a Unix socket round trip 1.26 ms, `fs.watch` notice 0–1 ms.

## Convention constraints, already verified in this repository

- `src/server/index.ts` star-exports `types`, `constants`, `validators`, `helpers`, `factories`,
  and three classes. A new class costs one barrel row.
- `.claude/rules/architecture.md`: one class per implementation file with `#` fields; no
  module-scope declarations in it; types in `types.ts`; factories in `factories.ts` named
  `create*`; `helpers.ts` and `validators.ts` import no implementation class; NO function declared
  inside another function; class order is `#` fields, constructor, public getters then methods,
  `#` private methods. `prove` is named at line 163 as an example of a composition that stays a
  private method.
- `.claude/rules/names.md`: entity methods are ONE word; `{Entity}Interface`, `{Entity}Options`,
  `{Entity}Input`, `{Entity}Result`; factory `create{Entity}`; fixed lifecycle vocabulary reserves
  `start`, `stop`, `destroy`, `execute`, `clear`, `abort` with exact meanings.
- The four `scripts/*.sh` files share one shape: `#!/bin/bash`, a comment header, a
  `[ "${CLAUDE_CODE_REMOTE:-}" != "true" ] && exit 0` guard, a `command -v` capability check, one
  echoed status line, and an unconditional `exit 0`. They are wired in `.claude/settings.json`
  under `SessionStart` and are `HOST_PATHS` plus `EXECUTABLE_PATHS` members. NOTE the guard: they
  do nothing in a local session.
- `src/core/compilers.ts:361-362` and `:801-802` emit `test:probe` and the `probe` Vitest project
  into every generated workspace; `tests/config.test.ts` uses `probe` as its own negative control.
- No code anywhere in `src/` holds a resident resource, spawns a long-lived child, or opens a
  socket today. This would be the first.
- NEVER propose adding an npm package. `typescript`, `vitest`, `vite`, and `oxlint` are installed.

## What to produce

1. `OPTIONS` — three to five designs, ordered from least machinery to most. For each give:
   - `machinery`: the EXACT file list touched, and roughly how many lines are new.
   - `latency`: warm and cold, from the measurements above, and say which are projected.
   - `hazards`: which of PROBE.md's five laws the option must implement, and which it escapes.
   - `invocation`: literally what the agent types or calls.
   - `kills`: what this option does NOT deliver.
2. `RECOMMEND` — one option, with the reason, and the trigger that would move you to another.
3. `SURFACE` — for your recommendation only: the real signatures, obeying the naming rules above.
   Name the entity. Justify the name against `.claude/rules/names.md`.
4. `TOUCHPOINTS` — the ordered list of edits to make this land once and propagate, each naming its
   file. Include the rule and guide changes.
5. `REJECTED` — designs you killed and why.
6. `RISKS` — ranked, each with the cheapest probe that exposes it.

Keep it under 700 lines. No process diary.
