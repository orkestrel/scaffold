# Orchestrator verification of design-lane claims

Every claim below was re-measured by the Orchestrator against source, independently of the lane that
made it. A lane report is evidence to verify, never authority.

## Settled — claim confirmed, sometimes stronger than reported

| Claim | Lane | Orchestrator measurement | Verdict |
| --- | --- | --- | --- |
| The guide-parity walk is duplicated across the fleet | subjective, "36 packages" | **40 of 41** `guides.test.ts` derive a root from `import.meta.url`; **37** use the byte-identical `fileURLToPath(new URL('../', import.meta.url))`; **39 of 41** walk the filesystem in that same file | Confirmed, stronger |
| `createErrorRecorder` is a one-line delegate | subjective, "10 of 11" | 10 packages have a 5-line body containing one `createRecorder` call; `emitter` alone is 16 lines, re-wrapping for `EmitterErrorHandler` | Confirmed exactly |
| `Promise.withResolvers` is available, so `createGate` is a rename-wrapper | subjective | Fleet `engines.node` is `>=22.12.0` (`emitter`, `worker`, `contract`); `typeof Promise.withResolvers === 'function'` on Node v22.22.2 | Confirmed |
| `TimerHandler` is `@orkestrel/terminal`'s published contract, so a structural copy would be a second declaration | subjective | `terminal/src/core/types.ts:444` — `export type TimerHandler = (callback: () => void, ms: number) => TimerCancel` | Confirmed |
| No fleet test depends on truncating `clear()` | subjective, flagged as its top behavioural risk | 129 `.clear()` call sites across `*.test.ts`; **0** capture `calls` into a variable before calling it | Confirmed — the reassign ruling breaks nothing |
| `middleware`'s temp-directory helper is async, so a sync-only `createScratch` does not serve it | subjective, flagged as a risk | `middleware/tests/setupServer.ts:373` — `export async function buildTempDirectory()` over `node:fs/promises` | Confirmed, risk is real |

## Overturned — the lane's own top risk, already measured

The subjective lane named this as its first risk and said plainly it had not run a probe:

> "The structural `SubscriberInterface` could fail to accept a real emitter under generic inference.
> I verified the member shapes match but not that inference flows through `createRecorderMap`'s two
> type parameters at a real call site."

It had been measured before that lane reported, by the four-arm instrument at `/tmp/typeprobe`. The
proposed shape is:

```ts
interface SubscriberInterface<TMap extends RecorderEventMap> {
	on<TName extends keyof TMap>(event: TName, handler: (...args: TMap[TName]) => void): void
}
```

That is **arm 3** — a locally declared shape whose `on` is generic — and arm 3 fails TS2345 for both
the installed and the local copy. `TMap` cannot be inferred from a generic method, so it falls back
to its constraint. The failure reads exactly like a two-copies failure and is not one.

**Arm 4 is the form that passes**: keep the inferred position non-generic and drive inference from
the event-name array.

```ts
export function createRecorderMap<TMap extends RecorderEventMap, TName extends keyof TMap & string>(
	subscriber: { on(event: TName, handler: (...args: TMap[TName]) => void): void },
	events: readonly TName[],
): RecorderMap<TMap, TName>
```

The lane's proposal and its fallback are therefore both wrong on this point: it offered "explicit
type arguments at each of 13 call sites" as the fallback, and arm 4 shows no call-site cost is
needed at all.

Verdict: **adopt the lane's design, correct its `SubscriberInterface` to the arm-4 shape.**

## Still open, carried into reconciliation

- Whether the objective lane reaches the same helper set, and where the two lanes disagree.
- `exactOptionalPropertyTypes: true` (`emitter/tsconfig.json:15`) and its effect on options
  construction at consumer call sites.
- Whether `createScratch` needs an async sibling, given `middleware` above.

## A rule violation noticed in passing, out of scope

`middleware/tests/setupServer.ts:375` declares `async function cleanup()` nested inside
`buildTempDirectory`. `.claude/rules/architecture.md` bans a function declaration inside another
function body. Recorded against `middleware` for the adoption campaign; not repaired here.

## Second verification pass — the creation gate

Counts of each proposed export, measured as exported symbols in `tests/setup*.ts` (excluding the
vendored `setupPolicy.ts`), then widened to include unexported copies inside `tests/**/*.test.ts`.

| Export | Exported in | Incl. unexported copies | Verdict |
| --- | --- | --- | --- |
| `createRecorder` | 32 | 32 | strong |
| `waitForDelay` | 17 | 17 | strong |
| `isTotal` | 13 | 13 | strong |
| `captureError` | 12 | 13 (csv has a file-local copy) | strong |
| `requireValue` | 4 + `expectDefined` 2 | 6 under two names | confirmed as reported |
| `roundTripJSON` | 5 | 5 | moderate |
| `collect` | 3 | 3 | moderate |
| `invokeRaw` | 3 | 3 | moderate |
| `EXTREME_NUMBERS` | 3 | 3 | moderate |
| `collectStream` | 1 | 3 — `csv`, `html`, `markdown` | confirmed as reported |
| `createRevokedProxy` | 2 | 2 — `contract`, `workspace` | weak but real |
| `deepFreeze` | 2 | 2 — `rater`, `reason` | weak but real |
| `HOSTILE_KEYS` / `TRICKY_KEYS` | 2 | 2 — `interpret`, `reason` | weak but real |
| `createThrowingGetter` | 1 | 2 — `contract`, plus `workspace`'s `createThrowingGetterRecord` | confirmed as reported |
| `createCyclicRecord` | 2 (as `buildCyclicRecord`) | 2 — `contract`, `qualifier` | weak but real |

### Correction — `createDeepRecord` is a 2, not a 3

The lane cited `qualifier:62`, `contract:2627` and `mcp:559` as one group. They are not one group.

- `qualifier`'s `buildDeepRecord` and `mcp`'s `buildNestedRecord` both nest plain records.
- `contract`'s `buildDeepNest` alternates array and object layers —
  `value = layer % 2 === 0 ? [value] : { value }` (`contract/tests/setup.ts:2627`).

Alternating containers is a different fixture for a different purpose. So the shared behaviour has
**two** members, and `contract`'s helper stays in `contract`. Any general form that claimed to cover
all three would have to take a mode argument, which the behaviour-splitting law forbids.

### What this changes

Nothing ships or fails on these counts alone, but the guide must state the real count behind each
export, and three exports rest on exactly two members: `createRevokedProxy`, `deepFreeze`,
`HOSTILE_KEYS`, `createCyclicRecord`, `createDeepRecord`. Two independent members is a genuine
duplicate under the "centralize any pattern repeated twice" law, and it is the weakest evidence in
the set. Record it as such rather than presenting every export as equally earned.
