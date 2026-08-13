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
