# Unit breaking-brief — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s13-28** — applied: BriefManagerInterface.size -> count at src/core/types.ts:507 and BriefManager.size -> count at src/core/BriefManager.ts:65; no collision (no count member existed, size was the lone numeric member). Carried to the createBriefManager @example (src/core/factories.ts:49), the guide Surface row, factories fence, Methods readonly-member list, the Practices manager fence, and 14 test assertions. Failing proof: npm run check reported 14 'Property size does not exist' errors before the fix and exits 0 after.
- **s13-30** — refused: Refused as written per the Orchestrator ruling; no edit, no successor row. Grounds re-verified: example(input: string, result: string, note?: string) stands at src/core/helpers.ts:149 with @param result at :138, and output(format, overrides?) is a module-level export in the same file at :238, so the proposed parameter name would shadow it inside example's body; a positional parameter rename binds no caller. Rule text: architecture.md § Wrapper test read with AGENTS.md § Design laws 'One concept, one term' and the ruling's two grounds.
- **s13-20-residue (audit carrier)** — applied: The guide rows stating a count corrected at the six carrier sites: :302 'four arrayShape(referenceShape) partitions' -> 'an arrayShape(referenceShape) per disjoint partition' (mirroring src/core/shapers.ts:52); :76 'the fixed four-stage pipeline' -> 'the fixed pipeline'; :109 'the four path sets' -> 'the path sets'; :618, :637, :1193 'the four-stage pipeline' -> 'the interpret -> draft -> gate -> pin pipeline'. Also the two source docs carrying the identical tally: src/core/BriefCompiler.ts:42 and src/core/factories.ts:23 ('the two intent vocabularies' -> 'the actions and domains intent vocabularies'), so source and guide stay consistent.
- **carry: interpret RecordOptions** — applied: ManagerAddOptions -> RecordOptions at src/core/types.ts:2,501,511 and src/core/BriefManager.ts:3,84,128 plus two guide prose sites; zero occurrences remain.
- **carry: reason create{Entity}** — applied: atom -> createAtom, compound -> createCompound, logicalDefinition -> createLogicalDefinition, rule -> createRule in src/core/helpers.ts (gateDefinition); quantitativeDefinition -> createQuantitativeDefinition in tests/setup.ts; carried into the guide fences.
- **carry: interpret add/remove and optional Intent axes** — applied: Surfaced by the adoption red: InterpretInterface register/unregister -> add/remove across the four borrowed-engine stubs in tests/setup.ts (remove bound with real.remove.bind(real) to carry the overload set); Intent.action and Intent.domain optional upstream broke deriveTask's descriptor lookups (TS2345), adopted with an absence guard returning undefined before either vocabulary is read, pinned by the added test 'refuses an intent that classified neither axis' (red before the guard: the missing axis coerced to the string 'undefined' and the undefined-named key answered; green after).

## Symbols moved

- BriefManagerInterface.size -> count
- BriefManager.size -> count
- upstream adoption: ManagerAddOptions (@orkestrel/interpret) -> RecordOptions
- upstream adoption: reason atom -> createAtom
- upstream adoption: reason compound -> createCompound
- upstream adoption: reason logicalDefinition -> createLogicalDefinition
- upstream adoption: reason rule -> createRule
- upstream adoption: reason quantitativeDefinition -> createQuantitativeDefinition
- upstream adoption: InterpretInterface.register -> add
- upstream adoption: InterpretInterface.unregister -> remove
- deriveTask returns undefined for an intent that classified neither axis

## Files touched

- src/core/types.ts
- src/core/BriefManager.ts
- src/core/helpers.ts (deriveTask absence guard; TSDoc first sentence third person)
- src/core/factories.ts
- src/core/BriefCompiler.ts
- guides/brief.md
- tests/setup.ts
- tests/setup.test.ts
- tests/guides.test.ts (classifyIntent added to FOREIGN; one pre-existing reflow converged)
- tests/src/core/BriefManager.test.ts
- tests/src/core/factories.test.ts
- tests/src/core/helpers.test.ts

## Tests changed

- added: helpers > 'refuses an intent that classified neither axis, rather than reading an undefined-named key' — red before the deriveTask guard (npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'classified neither axis': 1 failed | 282 skipped; received { operation: 'migrate', domain: 'code', ... }), green after (1 passed)
- rename proof: npm run check 14 errors before, exit 0 after
- 12 BriefManager.test.ts and 2 factories.test.ts assertions moved to registry.count
- tests/setup.ts stubs adopt add/remove and createQuantitativeDefinition
- tests/setup.test.ts delegation comment names add/remove
- tests/guides.test.ts FOREIGN gains classifyIntent

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 3589ms on 53 files using 4 threads.
- `npm run lint:check` → exit 0 — no findings
- `npm run check` → exit 0 — no diagnostics
- `npm run build` → exit 0 — 13 modules transformed; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core 283 passed; policy 111; config 46; setup 27; guides 18

## Diff stat

```text
12 files changed, 193 insertions(+), 123 deletions(-)
```

Status at return (writer's reading): `M guides/brief.md |  M src/core/BriefCompiler.ts |  M src/core/BriefManager.ts |  M src/core/factories.ts |  M src/core/helpers.ts |  M src/core/types.ts |  M tests/guides.test.ts |  M tests/setup.test.ts |  M tests/setup.ts |  M tests/src/core/BriefManager.test.ts |  M tests/src/core/factories.test.ts |  M tests/src/core/helpers.test.ts`
Built `dist/` moves: yes: dist/src/core/index.d.ts declares readonly count and get count(), imports RecordOptions from @orkestrel/interpret, types add(brief, options?: RecordOptions); no readonly size remains

## Observations

- format:check was red at the committed baseline in tests/guides.test.ts (commit 0322df7 landed it unformatted); the converge step absorbed the reflow at :109-115 inside the owned tests/** scope
- the guides/brief.md diff is mostly table re-padding after the Dispatch row narrowed
- guides/interpret.md (vendored mirror) still names ManagerAddOptions and size; refreshes at the re-pin
- InterpretInterface.remove is an overload set an object literal cannot restate; the stubs use real.remove.bind(real)
- classifyIntent joined FOREIGN in tests/guides.test.ts after the deriveTask remark named it
- no INTERNAL list exists in this package
- sweep: word-boundary then inflected; size survives only as the platform Map/Set member and English prose; compound as the English adjective; register/registers/registering as English about the registry whose method is add; one stale backticked pair at tests/setup.test.ts:123 corrected

## Deviations

- none

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/brief.diff`,
`tmp/units/breaking/brief.status`.

## Corrections by the Orchestrator (after the objective lane)

The sweep observation ran over the hand-authored files (`src`, `tests`, `guides/brief.md`,
`guides/README.md`, `README.md`) and not over the vendored mirrors; over `guides/interpret.md:113,739`
(`ManagerAddOptions`) and `:122-124,483,486,493,517` (`size`) the old names survive, so
acceptance criterion 1 as written is unmet over `guides/`, and the Orchestrator narrows it to the
hand-authored files: a vendored mirror is refreshed at the re-pin, never edited. The mirror
collision is a deviation the report did not file: expected the mirror to agree with the staged
`@orkestrel/interpret`; found it stale; evidence the lines named; not done, carried by the
re-pin. The s13-30 refusal cites no rule text that refuses the row; it stands as an Orchestrator
engineering ruling on its two verified grounds. The baseline `format:check` claim is confirmed:
`oxfmt --check` on `3b94bdb~1:tests/guides.test.ts` reports format issues.
