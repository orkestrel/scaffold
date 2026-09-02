# Unit reason-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- F1 closed — `tests/src/core/builders/DefinitionBuilder.test.ts:320-328`: "throws DESTROYED after
  the variables manager is destroyed"; with the `#ensureAlive()` guard present 28 passed; with it
  planted out, 27 passed and that case failed (`expected a ReasonError`); guard restored exactly.
- R1 closed — `src/core/types.ts:1191`, `src/core/builders/managers/VariableManager.ts:65,67`:
  the parameter is `variables`; no TSDoc or guide row named it.
- Required change closed — `guides/reason.md:935-936`: `seat` precedes `build` with the comment
  "swap a whole collection in one silent step — an authoring surface's \"load this revision\"".
- R2 closed — `guides/reason.md:98`: the Value factories intro opens on the concept.
- Observations closed — `tests/src/core/factories.test.ts:39,44` drop the ordering language;
  `README.md:65` links `guides/reason.md`.

Gates: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0 (src 1063, policy 111,
config 46, setup 26, guides 83).

```text
 6 files changed, 18 insertions(+), 8 deletions(-)
```

Committed by the Orchestrator as `c363201`.
