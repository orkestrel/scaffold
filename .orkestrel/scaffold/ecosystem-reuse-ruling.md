# Ecosystem reuse — the Orchestrator's ruling on U1r (2026-09-02)

The reconciler's return is retained verbatim as `ecosystem-reuse-report.md`. It rules every U1
addition `new` or `compose over @orkestrel/test.readCascade`, keeps `@orkestrel/test` at layer 0
with zero runtime dependencies, and reads a blast radius of no re-pin and no republish under every
ruling. The Orchestrator accepts those rulings and rules the open items:

| Item | Ruling | Carrier |
| --- | --- | --- |
| `extractEscapes` name collides with the character-encoding sense of `escape` in `@orkestrel/html` and `@orkestrel/console` | Rename to `extractStyles`: the markup of every element carrying a `style` attribute and every `<style>` element. `extract*` extracts structure, matching `extractOrphans`. | U1b successor; U4 and U6 briefs and the plan renamed now |
| Root element counted for the `style`-attribute population but unstated for `<style>` | Include `root` in both populations when it is an `Element`. | U1b |
| `STATECHART_ATTRIBUTES` may be one harness's policy | Ship it. The journey skill's `statechart.md` makes the attribute names a fleet contract every harness and gate reads, and the terrain reference implementation is the second consumer; record that reasoning in the `guides/test.md` § Limits row. | U1b (guide row), U4 (`statechart.md`), U6 (terrain) |
| `STATECHART_STATUSES` restates the shape of `TaskStatus` under different values | Ship it; record in the § Limits row that the subject is a harness's reported run state, not a task's derived status, so the vocabularies differ on purpose. | U1b |
| `readClasses` versus `readCascade` reads the two sides of one token type | Ship as composed; the guide states that the difference is the intended reading. | U1b (guide wording) |
| `veneer` must rewrite its `runScenarios(label, create, scenarios)` call sites | Deferred with the elements/veneer deduplication (accepted question 8). | scaffold `ROADMAP.md` row |
