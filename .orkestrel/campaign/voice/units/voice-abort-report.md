# Unit voice-abort — report

Every TSDoc block under `src/` of `/home/user/fleet/abort` opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The tree is uncommitted and holds only `src/` changes.

## Blocks rewritten by kind

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative             | 5     |
| First sentence given a verb                    | 7     |
| First sentence reworded to drop the symbol name| 0     |
| Boolean `@returns`                             | 1     |

Blocks in the package: 13. Rewritten: 12. Untouched: the `AbortInterface.abort` block, whose first
sentence ("Aborts the handle, firing `signal`.") already satisfies the rule.

### From the imperative

- `src/core/Abort.ts` `Abort` constructor: `Create a cancellation handle.` → `Creates …`
- `src/core/factories.ts` `createAbort`: `Create a cancellation handle — …` → `Creates …`
- `src/core/helpers.ts` `validateAbortOptions`: `Validate and normalize …` → `Validates and normalizes …`
- `src/core/helpers.ts` `linkSignal`: `Link an own …` → `Links an own …`
- `src/core/validators.ts` `isAbortSignal`: `Determine whether …` → `Determines whether …`

### Given a verb

- `src/core/types.ts` `AbortOptions`: `Options for …` → `Represents the options for …`
- `src/core/types.ts` `AbortOptions.signal`: `A parent signal — …` → `Holds a parent signal — …`
- `src/core/types.ts` `AbortInterface`: `A cancellation handle — …` → `Represents a cancellation handle — …`
- `src/core/types.ts` `AbortInterface.id`: `The trace label …` → `Holds the trace label …`
- `src/core/types.ts` `AbortInterface.signal`: `The observable signal — …` → `Holds the observable signal — …`
- `src/core/types.ts` `AbortInterface.aborted`: "Whether `signal` has aborted." → "Reports whether `signal` has aborted."
- `src/core/Abort.ts` `Abort` class: `A cancellation handle — …` → `Represents a cancellation handle — …`

### Boolean `@returns`

- `src/core/validators.ts` `isAbortSignal`, whose old and new text sit in the
  fenced block that follows.

```text
 * @returns `true` only when the platform getter accepts `value` as an
 *   `AbortSignal`; otherwise `false`.
```

It now reads:

```text
 * @returns True if the platform getter accepts `value` as an
 *   `AbortSignal`; false otherwise.
```

## Files touched

- `/home/user/fleet/abort/src/core/types.ts`
- `/home/user/fleet/abort/src/core/Abort.ts`
- `/home/user/fleet/abort/src/core/factories.ts`
- `/home/user/fleet/abort/src/core/helpers.ts`
- `/home/user/fleet/abort/src/core/validators.ts`

Diffstat: 5 files changed, 14 insertions(+), 14 deletions(-). No `app/` directory exists in this
repository.

## Gates

Run from `/home/user/fleet/abort` after the final edit.

| Command                | Exit | Result                                                     |
| ---------------------- | ---- | ---------------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (39 files)         |
| `npm run lint:check`   | 0    | No diagnostic                                               |
| `npm run check`        | 0    | `tsc --noEmit` on the root and core projects                |
| `npm run build`        | 0    | `dist/src/core/index.js` and `index.cjs` emitted            |
| `npm test`             | 0    | src 51, policy 111, config 46, setup 2, guides 18 — passed |

No failure excerpt: no gate failed. `npm test` timing is an observation; the Orchestrator's landing
chain is the authoritative run.

## Acceptance instrument

`node /home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs` reports for this package:

```text
abort       files=  6 blocks=  13 imperative=   0 verbless=   0 returnsBad=   0
```

Launch reading was `imperative=5 verbless=6 returnsBad=1`.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-abort.diff`
- `/home/user/scaffold/tmp/units/voice/voice-abort.status`

## Deviations

No stop-and-report deviation. Two disclosures:

1. **Seven blocks gained a verb, not the measured six.** The extra block is
   `AbortInterface.aborted`, whose first sentence read "Whether `signal` has aborted." The
   scanner's heuristic does not flag a sentence opening with `Whether`, but the sentence carries no
   third-person `-s` verb, so the unit's objective requires it. It now reads
   "Reports whether `signal` has aborted." The scanner counts the rewritten form as third person,
   so the acceptance reading is unaffected either way.
2. **The boolean `@returns` needed a wrap that keeps `; false otherwise` on one line.** The first
   wrap split the phrase across two comment lines, and `voice-scan.mjs` then still reported
   `returnsBad=1` because its pattern requires a single space between `;` and `false`. The final
   wrap breaks after `as an`, matching the launch tree's own wrap point, and the scan reports 0.
   The gate chain was re-run in full after that edit; every exit code in the preceding table is from
   the re-run.

No guide or test pins a rewritten sentence. `tests/guides.test.ts` compares symbol names, fence
languages, fence imports, and links, never a first sentence; `guides/abort.md` writes its own
surface-table descriptions rather than quoting TSDoc.
