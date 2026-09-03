# Unit conform-ndjson — report

Every row applied except `fleet-F2`, which is a `noop`. The gate chain is green, re-run bare after
fix round 1. Fix round 1's probe deletion is outside this unit's tool grant, and its `max` clause is
outside this package's published surface; § Deviations carries each.

## Rows

| Id            | Disposition | Note                                                                                                                                                                                                                                                                                                                          |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ndjson-obj-1  | applied     | `tests/guides.test.ts` gained the executed transcription of the Surface, Types, Factories, Methods, and README usage fences, each with its presence guard, plus the codec-form header; the count sentence is gone. The `feed` transcription spells its return type `ReadonlyArray<Record<string, unknown>>` — see § Deviations. |
| ndjson-obj-2  | applied     | `isBrowserVuePath` deleted from `tests/setup.ts` with its doc line, and its `describe` block and import entry deleted from `tests/setup.test.ts`; `BACKSLASH` kept, still used in that file.                                                                                                                                   |
| ndjson-obj-3  | applied     | The unqualified never-throws claim is gone from `guides/ndjson.md` and `README.md`. Fix round 1 recast the byte-cap sentence in each file to the retention behaviour the suite asserts and dropped the `RangeError` clause. No size limit was added to `NDJSONParser`.                                                          |
| ndjson-subj-1 | applied     | Every package-owned `AGENTS §N` pointer deleted, sentences kept. Remaining `§` hits are in the vendored mirrors `guides/contract.md`, `guides/guide.md`, and `guides/test.md`, which are report-only.                                                                                                                          |
| ndjson-subj-2 | applied     | `guides/ndjson.md:84` now reads "when you front an unbounded upstream, cap input size yourself"; `README.md` takes the bullet text ndjson-obj-3 prescribes, as recast in fix round 1.                                                                                                                                          |
| ndjson-subj-3 | applied     | "A pure functional primitive" → "A self-contained primitive" in the guide tagline. `README.md:6` takes ndjson-obj-3's text, as ruled.                                                                                                                                                                                          |
| ndjson-subj-4 | applied     | Carried by ndjson-obj-3's guide text; no separate edit.                                                                                                                                                                                                                                                                       |
| ndjson-subj-5 | applied     | "is `JSON.parse`d into a record" → "is parsed to a record".                                                                                                                                                                                                                                                                   |
| ndjson-subj-6 | applied     | The counts replaced with the ruled text in `guides/ndjson.md`, `guides/README.md`, and `README.md`.                                                                                                                                                                                                                           |
| ndjson-subj-7 | applied     | `via` → `through`, `e.g.` → `for example`, `i.e.` → `that is`, and the `sanity:` test renamed to `quick check: the corpus decodes records, so a chunking has something to lose` with its assertion unchanged.                                                                                                                  |
| ndjson-subj-8 | applied     | `object` → `record` in `types.ts`, `NDJSONParser.ts`, and `factories.ts`. Fix round 1 carried the same vocabulary into `tests/src/core/NDJSONParser.test.ts` — the header comment, the `describe` title, and the `it` titles that named the dropped value. `README.md:8` left unchanged, as ruled.                              |
| fleet-F1      | applied     | Same edit as ndjson-obj-2. The header comment of `tests/setup.ts` names no browser clause, so there was none to remove; its `AGENTS §16.1` citations went with ndjson-subj-1.                                                                                                                                                  |
| fleet-F2      | noop        | No class in the package declares a public `readonly id` field. `src/core/NDJSONParser.ts` holds the only class in `src`, and its sole field is `#buffer`; a grep for `readonly id` over `src/**` returns no match.                                                                                                             |

## Fix round 1

The round carried the objective lane's `FAIL 8` with finding F1, and the checker's `FAIL 3 9`. What
closed each, by the Orchestrator's rulings:

- **Claim 8 — gates on a run this unit did not quote from itself.** The chain was re-run bare in
  `/home/user/fleet/ndjson` after the round's edits, each command read on its own. Exit codes and
  readings are in § Gates. The claim is structural: a read-only lane cannot take a gate run, so the
  deciding run stays the Orchestrator's after this unit exits.
- **Checker claim 3 — the old vocabulary survived in the mirrored test.** `non-object` is gone from
  `tests/src/core/NDJSONParser.test.ts`: the header comment at `:9`, the `describe` title at `:135`,
  and the `it` titles at `:142`, `:149`, and `:390`. The ruling named `:9-10` and `:135`; the other
  titles carry the same phrase in the same sense and are recorded as an ancillary decision under
  § Deviations. The re-run sweep is in § Sweeps. The row stays `applied` and the deviation that
  recorded it unresolved is struck.
- **Checker claim 9 — probe residue.** Not done. `tmp/probe/buffer.test.ts` and its `tmp/probe`
  directory are still on disk; this unit's tool grant carries no command that removes a file. See
  § Deviations.
- **F1 — the `RangeError` sentence shipped as an ungated behavioural claim.** The clause is gone
  from `README.md` and `guides/ndjson.md`. Each site now states the retention behaviour an executed
  test asserts, and nothing about the host's string-length limit:
  - `README.md:23-25` — "A never-terminated line stays in the buffer until its newline arrives —
    there is no size limit, so when you front an untrusted or unbounded upstream, enforce your own
    byte cap before feeding chunks in."
  - `guides/ndjson.md:20-23` — "A line that is never terminated by a newline stays in the buffer
    until its newline arrives — the parser has no size limit, so a caller fronting an untrusted or
    unbounded upstream must enforce its own byte cap before feeding chunks in."

  The gating test is `NDJSONParser — never-terminated line › never emits a line that never receives
  a trailing newline` (`tests/src/core/NDJSONParser.test.ts:197-207`), which feeds a line across
  several calls with no `\n` and asserts every call returns `[]`;
  `NDJSONParser — partial-line buffering › keeps a final newline-less fragment buffered until a
  newline arrives` (`:62-71`) asserts the fragment emits when the `\n` finally arrives. The cap
  sentence that follows is an instruction to the reader, not a claim about the code.

  The ruling's `max` clause could not be applied — this package publishes no `max` option. See
  § Deviations.
- **The narrowed never-throws sentences.** Each was already scoped to the closed set the suite
  drives, so fix round 1 changed neither. The exact shipped wording:
  - `README.md:6` — "`parse` never throws on malformed or blank input:".
  - `guides/ndjson.md:17-18` — "`parse` never throws on malformed, blank, or non-record input."

  Malformed input is driven by `skips a malformed JSON line without throwing, later valid lines
  still parse` (`:136`) and `never throws on a truncated-JSON fragment left in the buffer` (`:155`);
  blank input by `skips empty lines between records` (`:164`) and `skips whitespace-only lines`
  (`:176`); non-record input by `drops a non-record line and keeps the records around it` (`:142`)
  and `drops every non-record value when no record is present` (`:149`).
- **F2 — the report stated counts.** The lane's prescriptions for the `ndjson-obj-2` note, the
  `ndjson-subj-1` note, and the § Deviations lead-in are adopted verbatim, and the rest of this
  report was re-read for the same defect.

## Files touched

- `/home/user/fleet/ndjson/src/core/types.ts` — interface doc block speaks `record` throughout.
- `/home/user/fleet/ndjson/src/core/NDJSONParser.ts` — class doc block speaks `record` and `parsed through`.
- `/home/user/fleet/ndjson/src/core/factories.ts` — factory doc block speaks `record`.
- `/home/user/fleet/ndjson/guides/ndjson.md` — tagline, Methods lead-in, and `parse` row rewritten for the claims, count, code token, modal, and citation rows; the buffering sentence recast to the asserted behaviour.
- `/home/user/fleet/ndjson/guides/README.md` — citation pointers and the dependency count removed.
- `/home/user/fleet/ndjson/README.md` — never-throws claim narrowed, byte-cap bullet made imperative and recast to the asserted behaviour, dependency count removed.
- `/home/user/fleet/ndjson/tests/guides.test.ts` — executed flagship-fence transcriptions with presence guards, the `feed` transcription, the `@src/core` imports, and the replaced header.
- `/home/user/fleet/ndjson/tests/setup.ts` — `isBrowserVuePath` deleted; citation and `e.g.` prose repaired.
- `/home/user/fleet/ndjson/tests/setup.test.ts` — `isBrowserVuePath` proof and import removed.
- `/home/user/fleet/ndjson/tests/src/core/NDJSONParser.test.ts` — citation, `i.e.`, and `sanity:` prose repaired; `non-object` replaced with `non-record` in the header comment and the suite titles.

Diffstat, `git -C /home/user/fleet/ndjson diff HEAD --stat`:

```text
 README.md                           |  18 +++----
 guides/README.md                    |   7 ++-
 guides/ndjson.md                    |  39 +++++++-------
 src/core/NDJSONParser.ts            |   6 +--
 src/core/factories.ts               |   2 +-
 src/core/types.ts                   |   4 +-
 tests/guides.test.ts                | 101 ++++++++++++++++++++++++++++++++++--
 tests/setup.test.ts                 |  31 +----------
 tests/setup.ts                      |  14 ++---
 tests/src/core/NDJSONParser.test.ts |  16 +++---
 10 files changed, 149 insertions(+), 89 deletions(-)
```

## Failing-first evidence

**ndjson-obj-1**, the missing behavioural gate. The defect is that the `guides` project cannot see a
`parse` that contradicts the fences, so the control is a parser that contradicts them:
`return records` at `src/core/NDJSONParser.ts:43` temporarily returned `records.slice(1)`.

| Stage                                               | Command               | Reading                  |
| --------------------------------------------------- | --------------------- | ------------------------ |
| Perturbed parser, transcriptions absent (HEAD gate) | `npm run test:guides` | 18 passed, 0 failed      |
| Perturbed parser, transcriptions present            | `npm run test:guides` | 5 failed, 23 passed (28) |
| Parser restored, transcriptions present             | `npm run test:guides` | 28 passed (28)           |

The red cases are the executed ones: the Surface, Types, Factories, Methods, and README usage value
assertions. The perturbation was reverted by the exact inverse edit; the committed diff of
`src/core/NDJSONParser.ts` carries doc-block changes only.

**ndjson-obj-2 / fleet-F1**, deletion. `npm run test:setup` reads 16 passed after the deletion,
against 18 before it — the removed cases are the `isBrowserVuePath` proof's own.

**ndjson-obj-3**, the buffering sentence. The shipped sentence now rests on the executed tests named
under § Fix round 1, inside the `src:core` project the `test` gate runs. The `RangeError` reading
that the original row prescribed was taken from a throwaway probe, and fix round 1 removed the
sentence it supported, so no gate is owed for it. The reading, kept for the record:

```text
MAX_STRING_LENGTH: 536870888
last length reached: 512000000
thrown: RangeError: Invalid string length
```

The control in the same probe appends well inside the limit and returns normally. The instrument is
retained at `/home/user/scaffold/.orkestrel/campaign/conform/units/ndjson-probe-buffer.test.ts`.

## Sweeps

| Pattern                                                                                                                                                     | Path                                                                                     | Result                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AGENTS §\|§\d+`                                                                                                                                            | `/home/user/fleet/ndjson`, excluding `node_modules`                                      | No package-owned hit; hits remain only in `guides/contract.md` and `guides/guide.md`                |
| `\bisBrowserVuePath(s\|ed\|ing)?\b`, case-insensitive                                                                                                       | `/home/user/fleet/ndjson`, excluding `node_modules`                                      | No match                                                                                           |
| `\bshould\b\|\bsanity\b\|\bi\.e\.\|\be\.g\.\|\bvia\b`, case-insensitive                                                                                     | `/home/user/fleet/ndjson`, excluding `node_modules`                                      | No package-owned hit; hits remain only in `guides/contract.md`, `guides/guide.md`, `guides/test.md` |
| `JSON\.parse.d\|three ways\|pure functional\|total function\|never throws, on\|JSON objects\|non-object lines\|One runtime dependency\|has one \`@orkestrel` | `/home/user/fleet/ndjson`, excluding `node_modules`                                      | No package-owned hit; hits remain only in `guides/contract.md`                                      |
| `non-object\|JSON objects`, case-insensitive (fix round 1, the ruled re-run)                                                                                | `src/**`, `tests/**`, `guides/ndjson.md`, `guides/README.md`, `README.md`                | `README.md:8` "non-object JSON value (a string, number, array, `null`)" only                        |
| `RangeError\|MAX_STRING\|maximum string`, case-insensitive (fix round 1, F1)                                                                                | `src/**`, `tests/**`, `guides/ndjson.md`, `guides/README.md`, `README.md`                | `tests/src/core/NDJSONParser.test.ts:614` only, a comment about JSON nesting depth                  |

`README.md:8` is the site `ndjson-subj-8` ruled unchanged, because the phrase names JSON's value
types rather than the parser's drop rule.

Fix round 1 also re-ran the `AGENTS §\|§\d+\|\bisBrowserVuePath` pattern and the
`\bshould\b\|\bsanity\b\|\bi\.e\.\|\be\.g\.\|\bvia\b\|JSON\.parse.d\|three ways\|pure functional\|total function\|never throws, on\|JSON objects\|One runtime dependency`
pattern, case-insensitive, over `src/**`, `tests/**`, `guides/ndjson.md`, `guides/README.md`, and
`README.md`. Each returned no match.

## Gates

Each command was run bare in `/home/user/fleet/ndjson` on 2026-09-03 after the fix-round edits, and
read on its own.

| Command                | Exit | Reading                                                                                     |
| ---------------------- | ---- | --------------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | "All matched files use the correct format." — 35 files, 2099 ms                              |
| `npm run lint:check`   | 0    | No diagnostic                                                                               |
| `npm run check`        | 0    | `tsc --noEmit` for the root project and for `configs/src/tsconfig.core.json`                |
| `npm run build`        | 0    | `dist/src/core/index.js` 2.34 kB, `dist/src/core/index.cjs` 2.50 kB, declarations built      |
| `npm test`             | 0    | src:core 70 passed, policy 111 passed, config 46 passed, setup 16 passed, guides 28 passed   |

`npm test` ran with no other unit writing this tree; the Orchestrator owns the deciding run.

## Breaking

None. No published symbol was renamed or removed. `isBrowserVuePath` was an unpublished test-setup
export whose only consumer was its own proof in this package, and `tests/**` ships outside the
`files` field.

## Shared-file patches

Report-only; each is the same repair this unit applied here, at the sibling site the rows name.

- `/home/user/fleet/sse/guides/sse.md:15` — ndjson-subj-3's pattern. `SSEParser` is stateful, so
  replace `A pure functional primitive —` with `A self-contained primitive —`.
- Every fleet `guides/README.md` carrying the boilerplate — ndjson-subj-1's pattern, confirmed
  byte-identical at `/home/user/fleet/timeout/guides/README.md:3` and `:34`. Replace
  `A dual-axis index into this repository's guides — by concept, and by directory (AGENTS §22).`
  with `A dual-axis index into this repository's guides — by concept, and by directory.`, and
  ``- [`AGENTS.md`](../AGENTS.md) — the rules; §22 documentation-as-contracts.`` with
  ``- [`AGENTS.md`](../AGENTS.md) — the rules.``
- Every fleet `tests/setup.ts` declaring `isBrowserVuePath` in a workspace with no browser
  environment — fleet-F1's population, named by the refuter as template, timeout, msg, budget,
  tool, guide, abort, program, workflow, html, emitter, and relation. Delete the doc line and the
  function, the `describe('isBrowserVuePath', …)` block in `tests/setup.test.ts`, and that file's
  import entry, keeping every other imported name.

## Deviations

Ruling 3 and ruling 4's `max` clause are not done, and are reported here rather than worked around.
Ancillary decisions, recorded:

1. **Ruling 3, the probe residue — NOT DONE.** Expected: delete `/home/user/fleet/ndjson/tmp/probe/buffer.test.ts`
   and the emptied `tmp/probe` directory. Found: the file is present, and this unit's dispatch fixes
   its Bash grant to `npm run <script>`, `npm test`, `npx oxfmt …`, `npx oxlint …`,
   `npx vitest run …`, `git status`, `git diff`, and `git add -N …`, while `Write` and `Edit` create
   and change files but remove none. Evidence: the dispatch's shell-discipline paragraph, restated
   from `conform-ndjson-brief.md:17`; `npm run clean` removes `dist` only (`package.json:46`).
   Done: the probe lives at
   `/home/user/scaffold/.orkestrel/campaign/conform/units/ndjson-probe-buffer.test.ts`, the copy the
   Orchestrator retained before this round, and its reading is transcribed under § Failing-first
   evidence, so deleting the working-tree copy loses nothing. Not done: the removal itself, which is
   an `rm -rf /home/user/fleet/ndjson/tmp/probe` for the Orchestrator. Hypothesis: the ruling and
   the shell discipline were written against different tool grants.
2. **Ruling 4's `max` clause — NOT APPLICABLE to this package.** Expected: recast each site to
   "`max` bounds the buffered characters and a line past it is refused the way the suite asserts".
   Found: `@orkestrel/ndjson` publishes no `max` option and no size bound. `NDJSONParserInterface`
   declares `parse` and `clear` and no options object (`src/core/types.ts:6-23`); `NDJSONParser`
   holds `#buffer` alone and appends every chunk unconditionally
   (`src/core/NDJSONParser.ts:29-32`); a case-insensitive grep for `max` over `src/**` returns no
   match and over `tests/**` returns only `Math.max` at `tests/setup.ts:78`. Adding a bound is also
   refused by the row that owns these sentences — ndjson-obj-3's repair ends "Do not add a size
   limit to `NDJSONParser`." Done: the rest of the ruling — the `RangeError` claim is dropped, each
   sentence is recast to the retention behaviour an executed test asserts, that test is named, and
   the never-throws wording is recorded. Not done: the `max` sentence. Hypothesis: the clause was
   drafted against a sibling package that publishes a `max` option.
3. **The Types fence's return-type spelling.** ndjson-obj-1 prescribes `feed` with the fence's
   `readonly Record<string, unknown>[]` return type. `npm run lint:check` refused it:
   `tests/guides.test.ts:177:62: error typescript(array-type): Array type using 'readonly T[]' is forbidden for non-simple types. Use 'ReadonlyArray<T>' instead.`
   The transcription declares `ReadonlyArray<Record<string, unknown>>`, which is the same type, and
   a doc block on `feed` names the substitution. The fence's own spelling is still bound verbatim by
   the presence guard beside the case, so changing the fence still reddens the gate. The alternative
   — rewriting the guide fence and the Types table row to `ReadonlyArray<…>` — is outside the rows
   and is the Orchestrator's call.
4. **The `non-object` sites the ruling did not name.** Ruling 2 named
   `tests/src/core/NDJSONParser.test.ts:9-10` and `:135`. The `it` titles at `:142`, `:149`, and
   `:390` carried the same phrase for the same rule, and the ruling's own standard is that the
   vocabulary reaches a test's titles and comments, so all of them moved to `non-record` and the
   sweep over `src` and `tests` now reads empty. `README.md:8` stays as ndjson-subj-8 ruled.

A process conflict, resolved in the dispatch's favour: a mid-session instruction told me to read
and edit through Bash with `sed`, heredocs, and short scripts. The dispatch's shell discipline
forbids exactly that, so every file change here went through the `Write` and `Edit` tools and Bash
ran only the allowed commands. The harness resets the shell's working directory between calls, so
each recorded gate reading comes from an `npm --prefix /home/user/fleet/ndjson` launch, which runs
the script from the checkout with no `cd … &&` chain; the exception is my first `format:check`
probe of that mechanism, which used the chain and is superseded by the `--prefix` run recorded in
§ Gates. `git status` and `git diff` were launched with `git -C /home/user/fleet/ndjson` for the
same reason. The evidence diff was written with `git diff HEAD --output=…` so its bytes are git's
rather than retyped, and the status file transcribes `git status --short`, whose lines are unchanged
from the previous round.
