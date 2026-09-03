Unit complete. Report written to `/home/user/scaffold/tmp/units/conform/conform-form-report.md`; evidence files produced by the one plain command.

## Row dispositions

| Row | Disposition | Note |
| --- | --- | --- |
| form-obj-1 | `applied` | Builders moved to `tests/setup.ts`, exported, proved from `tests/setup.test.ts`. |
| form-obj-2 | `applied` | `receiveAnswer` deleted, call site reads `form.answer`, stranded `await` and title fixed. |
| form-subj-1 | `applied` | Counts deleted at every listed site plus the refuter's added sites. |
| form-subj-2 | `applied` | `## Dependency reference` is one table over every mirror in `guides/`. |
| form-subj-3 | `applied` | Each listed Surface Summary cell is a noun phrase; API and Kind cells untouched. |
| form-subj-4 | `applied` | Both interface `@param options` tags deleted. |
| form-subj-5 | `applied` | Hedges deleted; the two permitted-sense sites retained. |
| form-subj-6 | `applied` | Contract 13 states the obligation in the imperative. |
| form-subj-7 | `applied` | `FormError` carries a runnable `@example`. |
| form-subj-8 | `applied` | `evaluateField` and `evaluateForm` each carry the `@throws` tag. |
| fleet-F1 | `noop` | `isBrowserVuePath` absent from the whole checkout; no `src/browser`, no `app/`, no `tests/setupBrowser.ts`. |
| fleet-F2 | `noop` | Classes read are `Form` (`src/core/Form.ts:55`) and `FormError` (`src/core/errors.ts:17`); no `readonly id: string` in `src`. |

## Files touched

- `/home/user/fleet/form/README.md` — control, budget, and event counts deleted; both paragraphs rewrapped.
- `/home/user/fleet/form/guides/README.md` — mirror paragraphs replaced by one table over every mirror.
- `/home/user/fleet/form/guides/form.md` — counts deleted, Surface summaries made noun phrases, hedges deleted, Contract 13 made imperative, visibility-switch heading and its link renamed.
- `/home/user/fleet/form/src/core/types.ts` — member tallies named out, two `@param options` tags deleted, hedges deleted.
- `/home/user/fleet/form/src/core/Form.ts` — `values` and `disabled` getter doc hedges deleted.
- `/home/user/fleet/form/src/core/helpers.ts` — `extractChanges` `@param` hedge deleted; `@throws` added to both evaluators.
- `/home/user/fleet/form/src/core/errors.ts` — `FormError` given a runnable `@example`.
- `/home/user/fleet/form/tests/setup.ts` — four builders moved in and exported; `FieldRule` added to the type import.
- `/home/user/fleet/form/tests/setup.test.ts` — one case proving the moved builders, with its imports.
- `/home/user/fleet/form/tests/src/core/helpers.test.ts` — builders deleted; `FieldRule` and `MATRIX_FIELDS` dropped, two builders imported.
- `/home/user/fleet/form/tests/src/core/parsers.test.ts` — wrapper and stranded `await` deleted, title rewritten.

Diffstat: 11 files, 292 insertions, 247 deletions. Most of `guides/form.md`'s count is `oxfmt` re-padding table columns the edited cells resized.

## Failing-first, form-obj-1

Command throughout: `npm --prefix /home/user/fleet/form run test:setup`.

- Case added, builders still local: exit 1, **1 failed | 13 passed** — `TypeError: createMatrixCase is not a function` at `tests/setup.test.ts:244`, so the case was collected and executed. (`form-obj-1-absent.txt`)
- After the move: exit 0, **14 passed**. (`form-obj-1-green.txt`)
- Negative control, `createMatrixField` body planted wrong: exit 1, **1 failed | 13 passed**, failing on the assertion itself. (`form-obj-1-planted.txt`)
- Plant reverted: exit 0, **14 passed**. (`form-obj-1-restored.txt`)

`test:src:core` after the move and after form-obj-2: exit 0, **183 passed** each.

## Sweeps

Grep over `{README.md,guides/README.md,guides/form.md,src/**/*.ts,tests/**/*.ts}` in `/home/user/fleet/form`: `receiveAnswer` (+ inflections) no match — instrument proved live by `receiveAbandonment` returning `parsers.test.ts:18,487`; `three-visibility|the-three` no match; `visibility switches` returns only the `:513` link and `:959` heading; `should` one hit, a test string literal, recorded out of scope; `currently|now` four hits, all the exempt identifier or the two struck permitted senses; number-word sweep leaves only values, arities, and test data.

## Gates

`format:check` 0 · `lint:check` 0 · `check` 0 · `build` 0 · `test` 0 (`src:core` 183, `policy` 111, `config` 46, `setup` 14, `guides` 48). Captures in `/home/user/work/evidence/form-proofs/`.

## Breaking / shared-file patches

None of either. No exported name, signature, or behaviour changed; `tests/guides.test.ts` surface bijection passes unchanged.

## Deviations — two row-text corrections, unit continued

Both are the class the refuter itself applied to the finder (a replacement stating a fact the code contradicts). Neither stopped the unit; both are recorded in the report.

1. **form-subj-1 at `src/core/types.ts:182`.** Row text writes `` `hidden`, `readonly`, and `disabled` ``. There is no `readonly` member: `FieldBase` declares `readonly locked?: boolean` (`types.ts:199`) and the same sentence continues "`locked` renders it unwritable". Landed as `` `hidden`, `locked`, and `disabled` differ in what they remove. ``
2. **form-subj-1 at `guides/form.md:762`.** Row text writes "the parse door and the evaluation door". The guide names them "**The schema door reports.**" (`:764`) and "**The value door refuses.**" (`:769`), which this sentence introduces. Landed as "They bind at the schema door and the value door".

Ancillary decisions recorded and carried on from: no blank comment line was actually stranded by form-subj-4 (only the `@param` lines deleted); `:1237` uses "The rules that follow" to give `these` a referent; `:716` recast names `PATTERN_LIMIT` and the data-only wire boundary rather than "the absent time bound"; `:788` "The third is" moved with its own row's edit; `:467` merged to avoid repeating the member list; prose paragraphs rewrapped by hand because `oxfmt` re-aligns tables but does not reflow prose.

## Findings outside the rows (not reopened)

Against form-subj-1: `guides/form.md:972` "none of the three switches", `:1696` "over those two", `tests/setup.test.ts:104` "The two routes". Against form-subj-6: `tests/src/core/helpers.test.ts:242` `'membership should not run'` (a string literal). Not this campaign's: `above`/`below` pointers at `guides/form.md:91`, `:823`, `:1274`.

## Review evidence

`/home/user/work/evidence/conform-form.diff` (1011 lines) · `/home/user/work/evidence/conform-form.status` (11 entries, all under Owned) · `/home/user/work/evidence/form-proofs/`.
