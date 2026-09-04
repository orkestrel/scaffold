The unit is complete. Here is the brief's Output section.

## Rewrites

`/home/user/fleet/brief/src/core/BriefManager.ts:166`
- before: `	// seeding all-or-nothing once every entry has been staged.`
- after: `	// seeding all-or-nothing after every entry has been staged.`

`/home/user/fleet/brief/src/core/helpers.ts:869`
- before: ` * The throwing half of the intake pair: this returns its argument by IDENTITY once the`
- after: ` * The throwing half of the intake pair: this returns its argument by IDENTITY after the`

`/home/user/fleet/brief/guides/brief.md:591`
- before: `argument once the guard passes — so it is a helper, not a factory, and lives beside the` / `other pure leaves.`
- after: `argument after the guard passes — so it is a helper, not a factory, and lives beside` / `the other pure leaves.`
- One word moves across the line break so the paragraph keeps its wrap width; the sentence is otherwise unchanged.

`/home/user/fleet/brief/guides/brief.md:933`
- before: `	text: 'migrate the 3 legacy stores to the new driver seam',`
- after: `	text: 'migrate the 3 legacy stores to the replacement driver seam',`
- The fence's documented outputs at `:945`-`:950` read `'migrate'`, the extracted count `'3'`, and the gate's `true`; the replaced word feeds none of them.

No transcription line needed updating. The patterns `guard passes` and `migrat` over `tests/guides.test.ts` each return no hit, so that file transcribes neither changed guide line.

## The sweep with rulings

Pattern `\b(new|should|once)\b`, case-insensitive, over `src`, `guides/brief.md`, `guides/README.md`, `README.md`, `tests/guides.test.ts`. `guides/README.md` and `README.md` return no hit. No `should` survives in any swept path.

Every surviving `new` is constructor syntax — `new BriefError`, `new BriefCompiler`, `new BriefManager`, `new Emitter`, `new Map`, `new Set`, `new WeakMap`, `new WeakSet`, `new Error`, `new RegExp` — at `src/core/BriefCompiler.ts:54`, `:83`, `:213`, `:226`, `:302`, `:396`, `:471`; `src/core/cloners.ts:36`, `:47`, `:125`; `src/core/factories.ts:36`, `:55`; `src/core/BriefManager.ts:28`, `:36`, `:49`, `:54`, `:105`, `:139`, `:150`, `:182`, `:199`; `src/core/helpers.ts:533`, `:539`, `:579`, `:587`, `:706`, `:805`, `:819`, `:854`, `:897`; `src/core/errors.ts:16`, `:46`; `guides/brief.md:188`, `:529`, `:677`, `:711`; `tests/guides.test.ts:144`, `:213`, `:241`, `:251`, `:275`, `:299`.

Every surviving `once` means "at one time" — a value read, materialized, or listed a single time — at `src/core/BriefCompiler.ts:243`, `:265`; `src/core/cloners.ts:12`; `src/core/helpers.ts:513`, `:557`; `src/core/types.ts:438`, `:453`, `:455`; `guides/brief.md:460`, `:466`, `:829`, `:837`, `:1205`; `tests/guides.test.ts:221`.

Permitted, past-time sense, recorded as the brief directs: `src/core/types.ts:155` ("vocabulary this once held") and `tests/guides.test.ts:303` ("the exact member this package once shipped dead").

### Sites outside Owned

- `tests/src/core/helpers.test.ts:872` — the test name "returns the same value by identity once the guard passes" carries temporal `once`, the same sense the `src/core/helpers.ts:869` rewrite closed. Outside Owned and outside the sweep's paths; left as written.
- `tests/src/core/integration.test.ts:29` and `tests/src/core/BriefCompiler.test.ts:57` — each carries `'migrate the 3 legacy stores to the new driver seam'` as its own sample data. Neither transcribes the guide, so the `guides/brief.md:933` rewrite leaves both true. Left as written.

## `git status --short`

```
 M README.md
 M guides/brief.md
 M src/core/BriefCompiler.ts
 M src/core/BriefManager.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/BriefCompiler.test.ts
 M tests/src/core/BriefManager.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```

The unit's 22 modified paths, no untracked path.

## Gate exit codes

Run from `/home/user/fleet/brief` after the four rewrites, on 2026-09-04:

- `npm run format:check` — exit 0 (53 files, "All matched files use the correct format")
- `npm run lint:check` — exit 0
- `npm run check` — exit 0 (`tsconfig.json` then `configs/src/tsconfig.core.json`)
- `npm run test:guides` — exit 0 (20 tests passed, 1 file)

The report is appended at `/home/user/scaffold/tmp/units/conform/conform-brief-report.md` under `## Fix round 2b`. No deviation.
