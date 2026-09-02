# Unit console-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- F1 closed — `src/core/factories.ts:139` and `:172`: the capture TSDoc names `destroy()` running
  on every path (sync success, sync throw, each async handler) instead of "stops in a finally".
- F2 closed — `README.md:28,48,57,70`: `@src/core` → `@orkestrel/console`, `@src/browser` →
  `@orkestrel/console/browser`, `@src/server` → `@orkestrel/console/server`, confirmed against
  `package.json` `exports`. The guides project walks `src`, `guides`, `tests` and never
  resolves the README's fence specifiers (unknown answered; recorded for the next change).
- RC-1 closed — `src/core/types.ts:386, 460, 720, 860, 1010, 1149`: each options block links the
  class through `import('./X.js').X`.
- RC-2 closed — `src/browser/factories.ts:15`, `src/server/factories.ts:14`: "Creates".
- Observation closed — `guides/console.md:402`: the third pair uses the slash form.

Gates: `npm run format:check` 0; `npm run lint:check` 0; `npm run check` 0; `npm run build` 0;
`npm test` 0. The Orchestrator re-ran `npm run test:src` before committing (see the commit).

```text
 README.md                |  8 ++++----
 guides/console.md        |  2 +-
 src/browser/factories.ts |  2 +-
 src/core/factories.ts    | 12 +++++++-----
 src/core/types.ts        | 12 ++++++------
 src/server/factories.ts  |  2 +-
 6 files changed, 20 insertions(+), 18 deletions(-)
```

Committed by the Orchestrator as `77ab53f`.
