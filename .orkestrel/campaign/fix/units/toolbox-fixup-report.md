# Report — unit toolbox-fixup

Executor: `builder` on Claude Sonnet, native subagent. Brief:
`tmp/units/breaking/toolbox-fixup-brief.md`.

## Findings closed

1. Line 310 (contract row 5): "An omitted task `run` is the native JSON-`null` no-op." → "An
   omitted task `behavior` is the native JSON-`null` no-op."
2. Line 982 (See also, `server.md`): "the `openStream` SSE primitive `createTerminalRoutes`'s GET
   route is built over." → "the `createStream` SSE primitive `createTerminalRoutes`'s GET route is
   built over."
3. Line 332 (contract row 15): "since it joins nothing forward" → "because it joins nothing
   forward". The two causal `since` at line 348 (contract row 23) stay, per the ruling.
4. Line 53 (`TerminalBridge` Surface row): "Own the shared terminal-route options and bound
   GET/POST handlers projected by `createTerminalRoutes`." → "Bridge a terminal manager onto the
   wire, owning the shared route options, the token gate, and the bound GET stream and POST answer
   handlers that `createTerminalRoutes` projects." The table was realigned by `npm run format`.

## Sweep

```text
grep -n 'openStream' guides/toolbox.md          → no output
grep -n 'task `run`' guides/toolbox.md           → no output
grep -n -i '\bsince\b' guides/toolbox.md         → line 348 only (contract row 23, two occurrences)
```

## Gates

- `npm run format:check` — exit 0 (after one `npm run format` pass to converge the table).
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run build` — exit 0.
- `npm test` — exit 0 (`src` 451 passed, `policy` 111 passed, `config` 46 passed, `setup` 17
  passed, `guides` 28 passed).

## `git diff --stat`

```text
 guides/toolbox.md | 14 +++++++-------
 1 file changed, 7 insertions(+), 7 deletions(-)
```

## `git status --short`

```text
 M guides/toolbox.md
```

## Deviations

none.
