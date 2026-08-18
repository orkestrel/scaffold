### Per-member ruling

| Member | Verdict | Reason |
|---|---|---|
| `assert` | public as-is | It is the real polymorphic readiness check; exposing it preserves the disconnected and closed-page guards. |
| `request` | public renamed → `send` | Raw CDP access is legitimate, but `request` duplicates the existing `send`; add per-call timeout support there. |
| `raw` | removed | Its sole fixed-expression use can issue and decode `Runtime.evaluate` directly; publishing unguarded evaluation would undermine `evaluate()`’s result-limit guarantee. |
| `update` | public renamed → `sync` | The subclass needs synchronous URL-cache reconciliation, and `sync` describes that responsibility more precisely than `update`. |

### Resulting interface additions

```ts
assert(): void

send(
	method: string,
	params?: Readonly<Record<string, unknown>>,
	timeout?: number,
): Promise<unknown>

sync(url: string): void
```

`raw` and `request` add no separate interface members.

### Risks

- `sync(url)` trusts caller-observed state. A false value can desynchronize `url`; this weakens the absolute URL-truth guarantee.
- `send()` remains an explicit escape hatch. Raw CDP commands can bypass high-level guards and mutate state outside normal navigation flows.
- `assert()` becomes a compatibility commitment, including its error conditions and subclass override behavior.
- The new methods and changed `send` signature require complete TSDoc, guide method rows, examples, and parity coverage; visibility changes alone break guide parity.
- Internal `request` and `raw` callers must use the page’s owned client/session directly where preserving current no-extra-assert and unguarded-URL behavior matters.