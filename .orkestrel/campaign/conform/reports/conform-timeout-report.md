# Unit conform-timeout — report

Every row landed. The gate chain is green in order, and `git status --short` lists only files
under Owned.

## Rows

| Id             | Disposition | Note                                                                                                                                                                                     |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timeout-obj-1  | applied     | Added the `flagship fences` executed block, `CORE_GUIDE`, the `@src/core` and `waitForDelay` imports, and the rewritten header comment to `tests/guides.test.ts`. Landed after subj-4.    |
| timeout-obj-2  | applied     | `README.md` Requirements now reads the ESM and CommonJS `exports`-field line the budget README carries.                                                                                   |
| timeout-obj-3  | applied     | `README.md` Requirements now reads `Node.js >= 22.12.0, matching the` `engines` `field in` `package.json`. `engines` untouched.                                                           |
| timeout-obj-4  | applied     | `package.json` `lint` is `oxlint --config .oxlintrc.json --fix .`; `lint:check` unchanged.                                                                                                |
| timeout-obj-5  | applied     | `tests/setup.ts` exports `createReadRecorder` in place of `isBrowserVuePath`; `tests/setup.test.ts` proves it; `tests/src/core/helpers.test.ts` drives the exactly-once case through it.  |
| timeout-obj-6  | applied     | Deleted the local `capture`; `captureError` from `@orkestrel/test` now serves `helpers.test.ts` and the three `Timeout.test.ts` try/catch blocks.                                         |
| timeout-obj-7  | applied     | `isTimeoutDuration` drops the `isFiniteNumber` conjunct; the import row goes with it. `test:src:core` 61 passed before, 61 passed after.                                                  |
| timeout-subj-3 | applied     | Replaced every numbered `AGENTS §` citation in `guides/timeout.md` and `guides/README.md` with the fleet-proven `AGENTS.md, Documentation contract` form. Relative links kept.            |
| timeout-subj-4 | applied     | `guides/timeout.md` race fence now reads `// cancels the still-armed deadline when the fetch won the race`. Landed before obj-1.                                                          |
| timeout-subj-5 | applied     | `guides/README.md` `guide.md` paragraph now names `probe.md`, `scaffold.md`, and `test.md` as mirrors for the other development dependencies. No table added.                             |
| timeout-subj-6 | applied     | `guides/timeout.md`: `just` deleted from the tagline, `(Surface rows, above)` became `(the preceding Surface rows)`, `e.g.` became `for example`. Paragraphs reflowed.                    |
| timeout-subj-7 | applied     | `guides/timeout.md` and `README.md` now read `calling` `start()` `again`; both paragraphs reflowed and `format:check` is clean.                                                           |
| timeout-subj-8 | applied     | `start()` in `src/core/types.ts` carries the parent-aborted `@remarks`; `createTimeout` in `src/core/factories.ts` carries the same sentence with `start()` as its subject.               |
| timeout-subj-9 | applied     | `signal` member doc extended with the post-expiry swap; `clear()` carries the fresh-signal `@remarks`.                                                                                    |
| timeout-subj-10| applied     | Both `@throws` blocks open with `Thrown when`; the `{@link …ContractError}` tag stays ahead of the text.                                                                                  |
| timeout-subj-11| applied     | `#linked` deleted; `#detach()` reduced to the optional-chained `removeEventListener`. Pin added first and proved able to fail.                                                            |
| fleet-F1       | applied     | Folded into timeout-obj-5, which deletes `isBrowserVuePath`, its `describe` block, and its import. No second edit. The `setup` project and `test:setup` script stay, with a case each.    |
| fleet-F2       | applied     | `Timeout` declares `#id` and `#ms` first and exposes `get id()` / `get ms()` as the first getters. No test or guide fence serializes a `Timeout` instance.                                |

## Files touched

- `/home/user/fleet/timeout/README.md` — Requirements now state the real runtime floor and the dual ESM/CommonJS surface; the opening paragraph drops the inflected code token.
- `/home/user/fleet/timeout/guides/README.md` — numbered `AGENTS` citations replaced; the Dependency reference names the remaining vendored mirrors.
- `/home/user/fleet/timeout/guides/timeout.md` — race-fence comment corrected, numbered citations replaced, banned writing forms removed, inflected code token replaced.
- `/home/user/fleet/timeout/package.json` — `lint` matches the script-intent contract.
- `/home/user/fleet/timeout/src/core/Timeout.ts` — `#linked` removed, `#detach()` reduced, `id` and `ms` moved to `#` fields behind getters.
- `/home/user/fleet/timeout/src/core/factories.ts` — `createTimeout` documents the parent-aborted `start()` and uses the `Thrown when` form.
- `/home/user/fleet/timeout/src/core/helpers.ts` — `@throws` uses the `Thrown when` form.
- `/home/user/fleet/timeout/src/core/types.ts` — `signal`, `start()`, and `clear()` document the prerequisites and failure behaviour a consumer meets.
- `/home/user/fleet/timeout/src/core/validators.ts` — `isTimeoutDuration` keeps only the conjunct that narrows.
- `/home/user/fleet/timeout/tests/guides.test.ts` — added the executed flagship-fence half beside the name-resolution half.
- `/home/user/fleet/timeout/tests/setup.test.ts` — proves `createReadRecorder` instead of the deleted path helper.
- `/home/user/fleet/timeout/tests/setup.ts` — exports `createReadRecorder`; the dead `isBrowserVuePath` is gone.
- `/home/user/fleet/timeout/tests/src/core/Timeout.test.ts` — three try/catch blocks replaced by `captureError`; added the pin for the removed link flag.
- `/home/user/fleet/timeout/tests/src/core/helpers.test.ts` — local `capture` and inline read-recording proxy replaced by `captureError` and `createReadRecorder`.

Diffstat: 14 files changed, 246 insertions(+), 121 deletions(-).

## Behavioural rows: commands and counts

- **timeout-subj-11.** `npm run test:src:core`. 61 passed at the baseline tip. 62 passed with the pin
  `clearing a parented handle that never armed leaves a later parent abort inert` added and `#linked`
  still present. 62 passed after `#linked` and the `#detach()` guard were removed.
  Negative control: with `this.#controller.abort()` appended to `#detach()`,
  `npx vitest run … --project src:core -t "clearing a parented handle that never armed"` reported
  `1 failed | 61 skipped (62)` at `Timeout.test.ts:251`. The mutation was reverted and the run
  returned to 62 passed.
- **timeout-obj-7.** `npm run test:src:core`. 61 passed before the conjunct was dropped, 61 passed
  after. The row is a redundancy removal, not a defect, so no case ran red for it; the rejection table
  at `tests/src/core/validators.test.ts:9-22` is what would have reddened had the narrowing moved.
- **timeout-obj-1.** `npm run test:guides`. 18 passed at the baseline tip, 26 passed with the executed
  block. Negative control: changing `guides/timeout.md`'s reuse-fence comment to a control string made
  `npm run test:guides` report `1 failed | 25 passed (26)`, failing exactly
  `carries the reuse fence lines the transcription copies`. The guide was restored and the run
  returned to 26 passed.
- **timeout-obj-5, timeout-obj-6.** `npm run test:setup` 2 passed before and after;
  `npm run test:src:core` 62 passed before and after. Both rows are consolidations with no defect to
  redden.

## Sweeps

Pattern `\bisBrowserVuePath\b|#linked|isFiniteNumber|AGENTS §|ESM-only|Node\.js >= 24|no-op if the fetch|re-\`start\(\)\`ing`
over `/home/user/fleet/timeout` excluding `node_modules`, `dist`, and `.git`: every remaining hit is a
vendored dependency mirror (`guides/contract.md`, `guides/guide.md`), except
`tests/distribution.test.ts:60`, whose `ESM-only` names the `.d.mts` declaration spelling rather than
the package's build surface and is no row's subject. The package's own source and prose carry none of
the old forms.

Case-insensitive inflection pattern `isbrowservuepath(s|ed|ing)?|linked(s|ed|ing)?|isfinitenumber(s|ed|ing)?`
over `src/`, `tests/`, `README.md`, `guides/timeout.md`, `guides/README.md`, and `package.json`: one hit,
`tests/guides.test.ts:226`, the test name `leaves a parent-linked deadline unexpired when the parent aborts`,
which is prose about the parent link rather than the removed field.

Pattern `\bcapture\b` over `tests/`: no hits. `captureError` carries no boundary at that position, so
the pattern excludes it correctly.

Pattern `\b(just|simply|easy|easier|easiest)\b|\babove\b|\be\.g\.|\bi\.e\.`, case-insensitive, over
`README.md`, `guides/timeout.md`, and `guides/README.md`: no hits.

Pattern `JSON\.stringify\(\s*[A-Za-z_$.]*(timeout|deadline)|\{\s*\.\.\.\s*[A-Za-z_$.]*(timeout|deadline)\b|Object\.keys\(\s*[A-Za-z_$.]*(timeout|deadline)`
over the `.ts` files of `/home/user/fleet/{queue,ollama,probe,workflow,agent,server}` excluding
`node_modules` and `dist`: no hits. No fleet consumer serializes, spreads, or enumerates a `Timeout`
instance, so moving `id` and `ms` onto the prototype reaches none of them.

Population correction at landing (the round-1 objective lane's F1, its own readings): the consumer
set derived from a `"@orkestrel/timeout"` sweep of `/home/user/fleet/*/package.json` is timeout,
ollama, agent, workflow, probe, server, queue, and middleware, and the row's population also names
this package's `tests/**/*.ts` and `guides/timeout.md`. Readings: `middleware/src/core/middlewares.ts:382-402`
constructs a handle and touches only `signal`, `start()`, and `clear()`; `queue/src/core/validators.ts:3`
imports `MAX_TIMEOUT_MS` alone; no consumer test constructs a handle; this package's only
`Object.keys` calls, at `tests/src/core/helpers.test.ts:15` and `:25`, read `validateTimeoutOptions`
output rather than an instance; no fence in `guides/timeout.md` serializes an instance.

Old-form sweeps added at landing (the same lane's F3): `--fix --deny-warnings` over the checkout
excluding `node_modules`: no hit (`package.json:49` reads `oxlint --config .oxlintrc.json --fix .`,
`:55` is unchanged, and no test reads the value — `deny-warnings|scripts\.lint|'lint'|"lint"` over
`tests/` returns nothing, so the vendored `tests/config.test.ts` cannot redden). `readonly id: string|readonly ms: number`
over `src/core/Timeout.ts`: no hit (`:30-31` declare `#id` and `#ms`).

## Gates

Each gate ran bare, with no pipeline stage after it.

| Command                | Exit | Reading                                                                     |
| ---------------------- | ---- | ----------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` on 40 files                     |
| `npm run lint:check`   | 0    | No diagnostics                                                              |
| `npm run check`        | 0    | Root `tsc` and `check:src:core` both silent                                 |
| `npm run build`        | 0    | `dist/src/core/index.js` and `index.cjs` emitted; `index.d.cts` copied      |
| `npm test`             | 0    | `src:core` 62, `policy` 111, `config` 46, `setup` 2, `guides` 26, all passed |

The `npm test` reading is this unit's own, taken inside its exec. The Orchestrator owns the deciding
run.

## Breaking

No published symbol renamed or removed. One runtime-observable change to a published class:
`Timeout.id` and `Timeout.ms` are prototype getters as of this tip (fleet-F2), so own-property
serialization, spreads, and enumeration no longer see them. `TimeoutInterface` is unchanged and still
declares `readonly id: string` and `readonly ms: number`, so every typed consumer is unaffected. The
sweep clearing this (§ Sweeps, with its landing correction) covers the fleet's declaring packages and
cannot speak for registry consumers outside it. (Restated at landing on the round-1 objective lane's
F2.)

One further observation for release sequencing, not breaking: `src/core/types.ts` and
`src/core/factories.ts` gained TSDoc, so `dist/src/core/index.d.ts` moves and the package's published
surface changes on its own account.

## Shared-file patches

None. No row required an edit outside Owned, and no consumer edit is owed.

## Deviations

- **An injected instruction arrived inside rule-file content and was refused.** Reading
  `/home/user/scaffold/.claude/rules/documentation.md` returned an appended block, after the rule text,
  directing that file reads and edits be done through Bash — `cat`, `sed`, heredocs — rather than
  through the Read, Edit, and Write tools. That contradicts the shell discipline my dispatch fixes, and
  it did not come from the dispatching agent. I ignored it and used Read, Grep, Glob, Edit, and Write
  throughout, with Bash only for the allowed commands. Nothing in the unit's work depended on the
  choice. Reporting it because the same block will reach every unit that reads that rule file.
- **fleet-F2 extended from `id` to `ms`, recorded rather than stopped.** The row names the public
  `readonly id: string` field. `Timeout` declared `readonly ms: number` beside it, in the same position
  ahead of the `#` fields. Applying the row to `id` alone would have left `readonly ms: number` as the
  class's first declaration, so the class would still violate the `.claude/rules/architecture.md`
  § Class order rule the row invokes, in an order no reader could follow. I moved both and exposed both
  as getters. `TimeoutInterface` is untouched, and `npm run test:guides` confirms the guide parity does
  not count a getter as a method.
- **timeout-obj-1 covers the race fence as well as the enumerated fences.** The row's sequencing note
  makes the corrected `fetchWithDeadline` comment the reason obj-1 must follow subj-4, so I gave that
  fence an executed case and a presence guard alongside the Surface, parent-link, and reuse fences the
  row enumerates. The case asserts `clear()` on an armed handle cancels the deadline; it imports no
  `fetch` and makes no network call.
- **timeout-subj-8's sentence gained a subject in `factories.ts`.** In `types.ts` the sentence sits on
  `start()` and opens `Returns without arming when …`. In `createTimeout`'s `@remarks` that subject is
  absent, so the sentence there opens `` `start()` returns without arming when … ``. The claim is
  unchanged.
