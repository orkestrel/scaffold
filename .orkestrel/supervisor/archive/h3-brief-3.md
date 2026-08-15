# H3 second successor — the two interface implementations are granted

Amends `h3-brief.md` + `h3-brief-2.md` after the unit's correct deviation stop: the owned list
was scoped by the declaration, not the consumers. What changes, and nothing else:

- **Granted into the owned list:** `tests/setupServer.ts` (its `RecordingSupervisorStore`) and
  `tests/app/setup.ts` (its `ProjectionStore`) — exactly for bringing those two
  implementations into conformance with the extended `SupervisorStoreInterface`. Each follows
  its own nature under the test laws: a recorder records the `list` call and delegates to (or
  reproduces the semantics of) the real store it wraps; an inert projection answers honestly
  from what it holds (an empty catalog answers with an empty page). No behavioral faking; no
  weakening of what either fixture already proves.
- **`app/server/LiveBroker.ts` and `app/server/types.ts` import the type but do not implement
  it** (your own enumeration) — they stay off-limits and must keep compiling; if either
  actually breaks, that is a fresh deviation report.
- Everything else in both prior briefs stands unchanged: the design, the proof matrix, the
  acceptance criteria (which now also require `npm run check` green across the app projects,
  since the granted files sit in the app test tree), the output shape.
