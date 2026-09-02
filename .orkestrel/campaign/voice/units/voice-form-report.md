# Unit voice-form — report

`@orkestrel/form` at `/home/user/fleet/form`, branch `claude/orkestrel-npm-audit-deps-14ibta`,
baseline commit `d51fac8`. Every TSDoc block under `src/` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The tree has no `app/`
directory. The gate chain exits 0 at every step. The tree is uncommitted.

## Blocks rewritten by kind

| Kind                                       | Count |
| ------------------------------------------ | ----- |
| First sentence from the imperative          | 66    |
| First sentence given a verb                 | 78    |
| First sentence reworded to drop the name    | 0     |
| Boolean `@returns`                          | 16    |

Total edited lines: 161 (160 sentence and `@returns` rewrites, plus one re-wrap of the
`FIELD_KEYS` first sentence across its own two lines to hold the 100-column print width).

The two buckets reconcile with the brief's launch measurement (`imperative=70 verbless=74`): the
classifier bucketed 4 noun-phrase openers as imperative because their first word sits outside its
stop list — `Text over many lines.` (`EditorField`), `Structured values that locate or explain this
failure.` (`FormError.context`), and the two `Everything a form …` openers (`FormSchema`,
`FormEventMap`). Reading each block moves those 4 from imperative to verbless: 70 − 4 = 66 and
74 + 4 = 78.

Blocks left untouched because they already satisfied the rule: `defineEntry`, `freezeEntry`, and
`createFieldError` in `src/core/helpers.ts`.

## Files touched

- `/home/user/fleet/form/src/core/Form.ts` — class, constructor, getter, and method first sentences to third person.
- `/home/user/fleet/form/src/core/cloners.ts` — `Clone` → `Clones` on each cloner.
- `/home/user/fleet/form/src/core/constants.ts` — constants gained `Lists`, `Holds`, `Matches`, or `Caps`; `FIELD_KEYS` re-wrapped.
- `/home/user/fleet/form/src/core/errors.ts` — class, field, constructor sentences; one boolean `@returns`.
- `/home/user/fleet/form/src/core/factories.ts` — `createForm` first sentence.
- `/home/user/fleet/form/src/core/helpers.ts` — helper first sentences; five boolean `@returns`.
- `/home/user/fleet/form/src/core/parsers.ts` — `Parse` → `Parses` on each parser.
- `/home/user/fleet/form/src/core/types.ts` — type, interface, member, and method first sentences.
- `/home/user/fleet/form/src/core/validators.ts` — `Determine` → `Determines`; ten boolean `@returns`.

Vocabulary used for the verbless openers: `Represents` for a data shape, `Names` for a literal
union or code, `Lists` for a collection or map, `Describes` for an options or schema shape,
`Declares` for a base shape, `Holds` and `Reports` for a member, `Matches` for a pattern constant,
and `Caps` for a limit constant.

## Gates

| Command                | Exit | Result                                                             |
| ---------------------- | ---- | ------------------------------------------------------------------ |
| `npm run format:check`  | 0    | All matched files use the correct format. 48 files.                |
| `npm run lint:check`    | 0    | No output.                                                          |
| `npm run check`         | 0    | `tsc --noEmit` for the root and `configs/src/tsconfig.core.json`.   |
| `npm run build`         | 0    | `dist/src/core/index.cjs` 68.96 kB; declarations copied.            |
| `npm test`              | 0    | src 183, policy 111, config 46, setup 13, guides 48 — all passed.  |

No mutating `lint` or `format` run was needed: `format:check` passed on the first run.

## Acceptance instrument

`node .orkestrel/campaign/instruments/voice-scan.mjs --list form`, run from `/home/user/scaffold`:

- Launch: `form files= 10 blocks= 147 imperative= 70 verbless= 74 returnsBad= 17`
- After the sweep: `form files= 10 blocks= 147 imperative= 0 verbless= 0 returnsBad= 1`
- `--list` prints no residual first-sentence hit.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-form.diff` (1202 lines; every changed line opens with `*` or `/**`)
- `/home/user/scaffold/tmp/units/voice/voice-form.status` (nine `M` rows, all under `src/core/`)

## Deviations

None. Three disclosures the Orchestrator must rule on:

1. **The acceptance scan lands on `returnsBad=1`, and the residual is not a boolean return.**
   `src/core/types.ts:108` documents `FieldValidator`, declared
   `(value: FieldValue | undefined, values: FormValues) => true | string`. Its `@returns` reads
   ``@returns `true` when the value passes, or the message explaining why it failed.`` That
   function never returns `false`, so the mandated `True if …; false otherwise` form would state
   something the type forbids. The line is byte-identical to the launch tree. The scan flags it
   because its pattern fires on any `@returns` opening with `` `true` ``, which the brief names as
   an over-approximation. Nothing else in the package flags.
2. **`field(name)` keeps the word `field` in its first sentence.** `Find one field by name.` became
   `Finds one field by name.` in `src/core/Form.ts:213` and `src/core/types.ts:515`. `field` is the
   domain noun for what the method returns, which the pilot slice's lesson on keeping a domain term
   that is the value's own name covers. Dropping it costs the sentence its subject.
3. **`clear` keeps an imperative second sentence.** `src/core/Form.ts:428` reads
   `Returns every answer to the ones the form opened with: … Reset the runtime disabled state to the
   schema's declarations.` The wave changes the first sentence only, so `Reset` stays. It is a
   later sentence, outside this wave.
