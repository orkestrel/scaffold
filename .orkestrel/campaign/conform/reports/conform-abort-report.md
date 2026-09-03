# Unit conform-abort — report

Every numbered row is applied, together with the successor row abort-obj-5b that fix round 1 added.
Of the fleet rows, fleet-F2 and fleet-F1 are both noop on evidence. The gate chain is green, re-run
bare after the last edit of fix round 1.

## Rows

| Id           | Disposition | Note                                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| abort-obj-1  | applied     | `tests/setup.test.ts:2` now imports `'./setup.js'`.                                                                           |
| abort-obj-3  | applied     | Each hand-rolled capture block now calls `captureError` from `@orkestrel/test`.                                               |
| abort-obj-5  | applied     | `tests/guides.test.ts` gains an executed `flagship fences` block over the parent-linking and create-and-abort fences.          |
| abort-obj-5b | applied     | The `flagship fences` block also executes the Surface quick-start fence, minus its `fetch` line, and guards that fence line.   |
| abort-obj-6  | applied     | Each self-derived `received` expectation is a literal, and `preview` left the import.                                         |
| abort-obj-7  | applied     | The README Requirements bullets now state the declared engine range and the published entry points.                           |
| abort-subj-3 | applied     | Every numbered `AGENTS` citation is replaced by the section's name; the `See also` bullets describe the pointer file.          |
| abort-subj-4 | applied     | `via` is `through` in the guide, the README, and the `package.json` description.                                              |
| abort-subj-5 | applied     | `via` is `through` in the `createAbort` `@remarks` and its `@example` fence.                                                  |
| abort-subj-6 | applied     | `@param options` states the object's role; the default moves into `@remarks` and `types.ts` in the fixed `Default: ` form.    |
| abort-subj-7 | applied     | The `tests/guides.test.ts` header comment carries no number.                                                                  |
| fleet-F1     | stopped     | The row's noop condition is false here (`tests/setup.ts:5` declares the helper; `src` holds `core` alone), so the truthful state is a stop the Orchestrator ruled and routed: deleting the helper needs a blueprint change through scaffold (the `setup` axis needs a case), carried to a fleet follow-on. See § Fix round 1. Label corrected at landing on the round-2 objective lane's REF-1. |
| fleet-F2     | noop        | No class has the shape. `src/core/Abort.ts:31` declares `readonly #controller` before `readonly id: string` at `:32`.          |

## Fix round 1

The round carries the Orchestrator's rulings on the round-1 objective verdict
(`/home/user/work/l1r/08-abort-objective-r1-a1d6ce62bea0f5c83.json`, `FAIL 8`, referrals R1 and R2)
and the checker verdict (`/home/user/work/l1r/09-abort-checker-r1-a6dea196b98b734ab.json`, `PASS`).

**Claim 8 — the gate chain.** The chain was re-run bare in `/home/user/fleet/abort`, each command
its own invocation with no pipe, and each exit code read from the run. The readings are in § Gates.

**R1, fleet-F1 — ruled noop.** `isBrowserVuePath` is the sole export of `tests/setup.ts:5`, and its
`describe` block at `tests/setup.test.ts:4-14` is the sole case of the `setup` project, which
`vite.config.ts:79` collects and the `test:setup` script at `package.json:70` runs from the `test`
chain at `package.json:56`. The blueprint's `setup` axis therefore needs a case, so deleting the
helper needs a blueprint change through scaffold, which the Orchestrator carries to a fleet
follow-on outside this round. The helper, its doc comment, its import entry, and its `describe`
block are all at the baseline text: `tests/setup.ts` is absent from `git status --short`, and the
only change to `tests/setup.test.ts` is abort-obj-1's `.js` extension.

**R2 — granted as abort-obj-5b.** `guides/abort.md:16` reads
`abort.abort() // cancels the in-flight fetch through the native signal; \`aborted\` flips true`, and
the fence is now transcribed into `tests/guides.test.ts:207-216` with the `fetch` line dropped, the
way the create-and-abort transcription drops `openStream`, asserting `expect(abort.aborted).toBe(true)`.
The presence guard over that fence line sits with the others at `tests/guides.test.ts:232-234`; it is
safe now that abort-subj-4 has landed its rewrite of the line. Its failing-first proof is in
§ Instrument controls and counts.

## Files touched

- `/home/user/fleet/abort/tests/setup.test.ts` — the local module specifier carries its `.js` extension.
- `/home/user/fleet/abort/tests/src/core/helpers.test.ts` — each capture block became a `captureError` call; each `preview(…)` expectation became the literal `'null'` or `'object'`; `preview` left the import.
- `/home/user/fleet/abort/tests/src/core/Abort.test.ts` — the capture block became a `captureError` call; the header comment names `AGENTS.md` § Non-negotiable rules.
- `/home/user/fleet/abort/tests/guides.test.ts` — the header comment drops its number, and a `flagship fences` describe block executes the parent-linking, create-and-abort, and quick-start fences with their presence guards beside them.
- `/home/user/fleet/abort/guides/abort.md` — numbered citations replaced by section names, and `via` replaced by `through`.
- `/home/user/fleet/abort/guides/README.md` — the index line drops its citation and the `See also` bullet describes what `AGENTS.md` is.
- `/home/user/fleet/abort/README.md` — the Requirements bullets state the real runtime floor and the real module formats; `via` replaced by `through`.
- `/home/user/fleet/abort/package.json` — the `description` field says `through` instead of `via`.
- `/home/user/fleet/abort/src/core/factories.ts` — `via` replaced by `through`; `@param options` names the object's role and the default moves into `@remarks` in the fixed form.
- `/home/user/fleet/abort/src/core/types.ts` — the `AbortOptions` `@remarks` states `Default: a random UUID.`

Diffstat:

```text
 README.md                      |  8 ++---
 guides/README.md               |  4 +--
 guides/abort.md                | 18 +++++------
 package.json                   |  2 +-
 src/core/factories.ts          |  9 +++---
 src/core/types.ts              |  6 ++--
 tests/guides.test.ts           | 70 ++++++++++++++++++++++++++++++++++++++++--
 tests/setup.test.ts            |  2 +-
 tests/src/core/Abort.test.ts   | 13 +++-----
 tests/src/core/helpers.test.ts | 39 ++++++-----------------
 10 files changed, 105 insertions(+), 66 deletions(-)
```

## Instrument controls and counts

No row names a product defect, so no row carries a red-then-green regression count. Each row that
adds or rewrites an assertion carries a mutation control instead: the load-bearing line is disabled,
the named test is watched failing, and the line is restored. The restore is proved by
`git diff --stat -- <file>` returning the file to its pre-control diffstat, and by the gate chain
re-run after every control.

**abort-obj-5, executed half.** Control: `src/core/Abort.ts` `this.#controller.abort(reason)` changed
to `this.#controller.abort()`, and `src/core/helpers.ts` `return parent === undefined ? own :
AbortSignal.any([own, parent])` changed to `return own`.

- `npm run test:guides` before the control: exit 0, `Tests 21 passed (21)`.
- `npm run test:guides` under the control: exit 1, `Tests 2 failed | 19 passed (21)`, failing
  `flagship fences > cascades a parent abort into the child, flipping aborted and firing the signal`
  and `flagship fences > keeps the abort reason the create-and-abort fence claims`.
- After restore: exit 0, `Tests 21 passed (21)`; `git diff -- src/core/Abort.ts src/core/helpers.ts`
  is empty.

**abort-obj-5, presence guards.** Control: `guides/abort.md` line `parent.abort() // child.aborted is
now true; child.signal has fired` changed to `parent.abort() // the child is cancelled too`.

- `npm run test:guides` under the control: exit 1, `Tests 1 failed | 20 passed (21)`, failing
  `flagship fences > carries the fence lines the transcriptions copy`.
- After restore: exit 0, `Tests 21 passed (21)`.

**abort-obj-5b, executed half (fix round 1).** Control: `src/core/Abort.ts` `get aborted(): boolean`
body changed from `return this.signal.aborted` to `return false`, which is the line the fence
comment's `aborted` claim rests on.

- `npm run test:guides` before the control: `Tests 22 passed (22)`.
- `npm run test:guides` under the control: `Tests 2 failed | 20 passed (22)`, failing
  `flagship fences > flips aborted on the handle the quick-start fence creates` with
  `AssertionError: expected false to be true` at `tests/guides.test.ts:215:25`, and
  `flagship fences > cascades a parent abort into the child, flipping aborted and firing the signal`.
- After restore: `git diff --stat -- src/core/Abort.ts` is empty, and the chain's `test:guides` leg
  reads `Tests 22 passed (22)`.

Coverage of that control: it reddens every case asserting `aborted`, so it proves the new case binds
the flag the fence claims, and it does not isolate the quick-start case from the parent-linking case.
The isolating half is the presence guard control that follows, which reddens one case only.

**abort-obj-5b, presence guard (fix round 1).** Control: `guides/abort.md:16` changed from
`abort.abort() // cancels the in-flight fetch through the native signal; \`aborted\` flips true` to
`abort.abort() // cancels the request`.

- `npm run test:guides` under the control: `Tests 1 failed | 21 passed (22)`, failing
  `flagship fences > carries the fence lines the transcriptions copy` at `tests/guides.test.ts:232:21`.
- After restore: `git diff --stat -- guides/abort.md` reads `9 insertions(+), 9 deletions(-)`, the
  file's pre-control diffstat, and the chain's `test:guides` leg reads `Tests 22 passed (22)`.

**abort-obj-6.** Control: `src/core/helpers.ts` `received: preview(own)` changed to
`received: 'signal'`.

- `npm run test:src` under the control: exit 1, `Tests 1 failed | 50 passed (51)`, failing
  `linkSignal > rejects a non-native own signal with exact placement context`.
- After restore: exit 0, `Tests 51 passed (51)`; `git diff -- src/core/helpers.ts` is empty.

Coverage of that control: it proves the literal assertion binds the value the source renders. It does
not reproduce a change inside `preview` itself, which is the drift class the row names, because
`preview` is an export of `@orkestrel/contract` and this unit edits no dependency.

**`preview` return values, read from the installed package** rather than from the sibling source the
row cites: `node -e "const c=require('@orkestrel/contract'); …"` printed `"null"` for `preview(null)`,
`"object"` for `preview({aborted:false})`, and `"7"` for `preview(7)`.

**Vitest on a file with no case**, the measurement behind fleet-F1's ruling. A throwaway pair under
`tmp/probe/` — one file declaring a case as the control, one declaring none — run through
`npm run test:probe`: exit 1, control passed, and the caseless file reported
`Error: No test suite found in file …/tmp/probe/empty.test.ts`. The probe files were removed. That
reading is why the `setup` project needs a case, and why fleet-F1's deletion is a blueprint change
rather than a package edit.

## Sweeps

Each sweep names its pattern and the paths it walked. The subject population is this package's own
files: `src`, `tests`, `guides/abort.md`, `guides/README.md`, `README.md`, `package.json`. The
vendored mirrors `guides/contract.md`, `guides/guide.md`, `guides/probe.md`, `guides/scaffold.md`,
and `guides/test.md` are off-limits and are excluded.

- abort-obj-1, pattern `from '\./setup'` over `tests/`: before, `tests/setup.test.ts:2`; after, no
  hit (exit 1). Every remaining local specifier under `tests/` carries `.js`.
- abort-obj-3, patterns `catch (caught)` and `let error: unknown` over `tests/`: after, no hit for
  either (exit 1).
- abort-obj-6, pattern `preview` over `tests/`: after, no hit (exit 1).
- abort-subj-4 and abort-subj-5, pattern `\bvia\b` (word boundary) and case-insensitive
  `\bvia(s|ed|ing)?\b` over the subject population: after, no hit for either (exit 1).
- abort-subj-3, patterns `AGENTS §` and `§[0-9]` over the subject population: after, no hit
  (exit 1). The `§` character survives only in the replacement prose that names a section by name.
- abort-subj-7, pattern `\b(two|three|…|ten) (constants|rules|rows|members|exports|files|options|steps|cases|stages|findings|tests)\b`, case-insensitive, over `src`, `tests`, `guides`, `README.md`:
  the only hit is `guides/contract.md:53`, inside an off-limits vendored mirror.
- abort-obj-7, pattern `Node\.js >= 24|ESM-only` over `README.md`: after, no hit. (Added at landing on
  the round-2 objective lane's F2; the lane ran the pattern over the checkout excluding
  `node_modules` and found only `tests/distribution.test.ts:60`, an untouched file whose "ESM-only"
  names a `.d.mts` spelling.)
- abort-subj-6, patterns `defaults to a random UUID` and "when omitted or `undefined`" over `src`:
  after, no hit. (Added at landing on the same finding, from the lane's own run.)

## Gates

Run in order in `/home/user/fleet/abort`, each its own invocation, each read bare with no pipe, after
the last edit of fix round 1.

| Command                | Exit |
| ---------------------- | ---- |
| `npm run format:check` | 0    |
| `npm run lint:check`   | 0    |
| `npm run check`        | 0    |
| `npm run build`        | 0    |
| `npm test`             | 0    |

`npm run format:check` read `All matched files use the correct format.` over 39 files.
`npm run build` emitted `dist/src/core/index.js` and `dist/src/core/index.cjs` and copied
`index.d.ts` to `index.d.cts`. `npm test` project readings: `src:core` 51 passed, `policy` 111
passed, `config` 46 passed, `setup` 2 passed, `guides` 22 passed. The baseline tip read the same
except `guides`, which read 18 passed before abort-obj-5 and abort-obj-5b added their cases. The
whole-suite reading is an observation, not a criterion; the container carried no other load during
the run, and the Orchestrator takes the deciding run.

`git status --short` lists modified files only, every one inside Owned, and no untracked file. Nothing
needed `git add -N`. `dist/` is ignored, so the build left the status unchanged.

## Breaking

None. No row renames or removes a published symbol. The `package.json` `description` text changed,
which moves published metadata rather than an export, so no consumer edit follows.

## Shared-file patches

None. No confirmed row obliges an edit outside `/home/user/fleet/abort`, and this package's gates
are green without one. Report-only pointers for the Orchestrator to route:

- The vendored mirrors carry the same stale numbered citations abort-subj-3 removed:
  `guides/guide.md:9`, `:190`, `:211`, `:318`, `:517`; `guides/contract.md:228`, `:488`, `:694`,
  `:695`, `:697`, `:1053`. `.claude/rules/documentation.md` § Parity forbids rewriting a mirror, so
  the repair belongs to `@orkestrel/guide` and `@orkestrel/contract` upstream, followed by a
  re-vendor here. No patch is offered against a mirror.
- `/home/user/fleet/timeout/tests/setup.test.ts:2` omits the `.js` extension, the sibling of
  abort-obj-1 named in that row's evidence. It is that package's own row.
- The README Requirements block abort-obj-7 corrected is identical in `timeout`, `relation`,
  `emitter`, `router`, and `server`, as that row's note states. Each is that package's own row.
- fleet-F1's deletion needs the `setup` axis removed from the blueprint — the `setup` project at
  `vite.config.ts:75-84` with its entry in the project list at `:133`, the `test:setup` script at
  `package.json:70`, and its link in the `test` script at `:56` — which reaches every package whose
  `tests/setup.ts` exports `isBrowserVuePath` alone. The Orchestrator's ruling routes it to a fleet
  follow-on through scaffold.

## Deviations

fleet-F1 stays a recorded stop, routed by the Orchestrator's ruling to a fleet follow-on (see § Rows
and § Fix round 1).

**Ancillary breaches of the brief's Bash allowlist, recorded at landing on the round-2 objective
lane's F1.** The unit ran `node -e "const c=require('@orkestrel/contract'); …"` to read two installed
values (§ Instrument controls and counts), which the brief names among the banned mechanisms and which
the Read or Grep tool would have answered; and it removed its probe files under `tmp/`, which no
permitted command performs. Neither touched the tip: `tmp/` is gitignored and the status is clean of
it, and the lane confirmed the `node -e` reading against
`node_modules/@orkestrel/contract/dist/src/core/index.js:3693` and `:3727`. The rule stands as the
lane states it: read installed values with Read or Grep, and where a reading needs a runtime, stop and
report it under this section rather than run it.

**Ancillary decisions, recorded and carried on from.**

- The unit brief's § Output names the report path as `/home/user/fleet/abortRT_PATH`, which resolves
  to nothing. The report is at the path the dispatch named:
  `/home/user/scaffold/tmp/units/conform/conform-abort-report.md`.
- abort-subj-6 prescribes ending the `@remarks` paragraph with the fixed `Default: ` sentence. The
  paragraph already ended with `or let it default to a random UUID`, an informal statement of the
  same default, so that clause was rewritten into the fixed form rather than left beside it; keeping
  it would have restored the duplicate-copy defect the row names, inside one paragraph. The
  `types.ts` `@remarks` paragraph was rewrapped for the shortened sentence, with no other wording
  change.
- abort-obj-5 prescribes asserting `child.aborted`. The fence comment it binds claims both that the
  child reads aborted and that the child's signal fired, so the presence guard binds that whole
  line, and a `createRecorder` from `@orkestrel/test` proves the event beside the flag. The
  prescribed assertion is unchanged.
- abort-obj-5 and abort-obj-5b keep their presence guards in one case rather than beside each
  transcription, so the transcriptions read as the fences do.
- abort-subj-3 permits a pointer where one is wanted. Every `(AGENTS §22)` site carries the claim the rule
  governs, so each received the pointer form.
- The `@param reason` block at `src/core/types.ts:32-34` states what `signal.reason` becomes when the
  reason is `undefined`, outside the fixed `Default: ` form. It describes what the host substitutes
  on the resulting signal rather than a parameter default, so it sits outside the sites abort-subj-6
  names and was left alone. Recorded for the next matrix.
