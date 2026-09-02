# Unit template-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- `remove(): void` restored on `TemplateManagerInterface` (`src/core/types.ts:242`) and
  `TemplateManager` (`src/core/TemplateManager.ts:171-177`, the overload and the remove-all
  branch); `count` and `template(id): TemplateInterface | undefined` unchanged.
- TSDoc restored at `src/core/types.ts:220-227` and `src/core/TemplateManager.ts:154-167`; the
  "clear is the sole remove-all" sentences dropped.
- Tests restored at `tests/src/core/TemplateManager.test.ts:202-210` and `:246-257`; the unit's
  array-overload purge case kept at `:259-268`. Failing first against the narrowed signature:
  `2 failed, 123 passed` (`TypeError: target is not iterable`); after: `125 passed`.
- `guides/template.md:194-210`: the `remove` row reads "Remove LISTED templates by id, ONE
  template by id, or ALL templates; emits `remove` per removed id." with `boolean` (or `void`);
  the `clear` row reads "Remove every registered template, emitting `clear`."
- Stale citations dropped at `src/core/TemplateManager.ts:155` and `guides/template.md:209`;
  every other `§` citation left (recorded for the next change).

Gates: `npm run format` and `npm run lint` to converge (guide table alignment only), then
`format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0 (src:core 125, policy 111,
config 46, setup 2, guides 23).

```text
 guides/template.md                     | 12 ++++++------
 src/core/TemplateManager.ts            | 26 +++++++++++++++-----------
 src/core/types.ts                      |  7 ++++---
 tests/src/core/TemplateManager.test.ts | 23 +++++++++++++++++++++++
 4 files changed, 48 insertions(+), 20 deletions(-)
```

Committed by the Orchestrator as `2eccc62`.
