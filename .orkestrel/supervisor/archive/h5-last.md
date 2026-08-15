## Touched files + diffstat

None.

```text
git diff --stat
# empty
```

## Full `app/browser/types.ts` diff

```diff
# empty
```

## Per-criterion proofs

1. Client history read: not implemented. Mandatory deviation stop occurred before types.
2. History manager: not implemented.
3. Operator seam and terminal carrier: blocked. Evidence:

```text
app/server/types.ts:295-299
ApplicationTail {
  frames: readonly ObserveFrame[]
  terminal: boolean
}

app/server/ApplicationHandlers.ts:302-304
renderApplicationJSON({ tail: tail.value.frames })

app/browser/services/Client.ts:129-138
guards { tail: ObserveFrame[] } and returns only result.value.tail
```

The server discards `ApplicationTail.terminal`. Surfacing it requires changing `app/server/ApplicationHandlers.ts` and its tests, but `app/server/**` is off-limits. The carrier is also a boolean terminal-state fact, not a terminal-render fragment.

4. Gates: not run because the deviation contract requires an immediate stop.

## Parity delta

None introduced. The requested history browser APIs and behavior remain undocumented and unimplemented.

## Suites awaiting the Orchestrator

After expanding the unit to permit the server wire change:

```text
npm run format:check
npm run lint:check
npm run check
npm run build:app
npm run test:app:browser
npm run test:app:browser:integration
npm run test:app:server
```

## `git status --porcelain`

```text
# empty
```

## Deviations

Blocked: the terminal carrier requires an off-limits server change, and the actual carrier shape disagrees with the brief’s “terminal-render fragment” description.