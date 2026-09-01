# Fix report: emitter

## Dispositions

- **s18-29** applied (src/core/types.ts, src/core/Emitter.ts, src/core/factories.ts): Re-verified: every enumerated emitter site still carried its citation at the exact named line. Deleted `(AGENTS §13)`, `(AGENTS §8)`, `(AGENTS §14)`, `(§13)`, and `(the §13 pattern)` at types.ts:8/:21/:32/:41, Emitter.ts:14/:55/:59/:170/:187, and factories.ts:5/:9. No replacement text was needed: the surrounding prose already states each rule (listener isolation routes a throw to the `error` handler and never rethrows; the reserved `on` option wires initial listeners at construction; construction is the validation boundary that guards with `isFunction`). Rewrapped the affected comment lines and reflowed two `//` blocks in Emitter.ts whose wrapping went ragged after the deletion — ancillary formatting, no wording change. Per the brief's TSDoc-voice clause (b), the one imperative first sentence I rewrote became third-person: factories.ts `Create a typed event emitter` -> `Creates a typed event emitter`. `grep -rn 'AGENTS §|§[0-9]' src/` now returns no match.
- **s18-37** applied (src/core/types.ts): Re-verified: `EmitterInterface`'s members still carried no TSDoc. Documented every member in third-person voice — `destroyed` (`True after `destroy()`; false otherwise.`), `on`, `once`, `off`, `emit`, `count`, `clear`, `destroy` — with `@param` on each parameter and `@returns` on `count`. Documented the destroy no-op on `on`/`once`/`emit`, previously only in the `Emitter` class `@remarks`. Every claim was checked against Emitter.ts and the guide's Contract section: snapshot-before-loop, throw routed to `EmitterOptions.error` and never rethrown, `off` removing a `once` registration by its original handler, `clear` leaving `destroyed` unchanged, `destroy` idempotent. Ancillary wording departure: the repair quoted one shared string for both members, `@param event - The event to read or clear. Omit to apply to every event.` — "or clear" is false on `count` and "read" is false on `clear`, so I wrote the same substance per member instead (`The event to count listeners for. Omit to count across every event.` and `The event to clear. Omit to clear every event.`). Exact TSDoc wording is the executor's under the brief's deviation contract.

## Gates

- npm run format:check: pass — oxfmt --config .oxfmtrc.json --check . — no reformat reported; no converge pass was needed
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — clean
- npm run check: pass — tsc --noEmit -p tsconfig.json and configs/src/tsconfig.core.json — no diagnostics
- npm run build: pass — vite build configs/src/vite.core.config.ts + copy dist/src/core/index.d.ts -> index.d.cts
- npm test: pass — src 42/42, policy 111/111, config 46/46, setup 2/2, guides 18/18 — identical to the pre-edit baseline I captured on the same tree

## Diffstat

```text
 src/core/Emitter.ts   | 24 +++++++++----------
 src/core/factories.ts |  6 ++---
 src/core/types.ts     | 64 +++++++++++++++++++++++++++++++++++++++++++--------
 3 files changed, 69 insertions(+), 25 deletions(-)
```

- dist moves: true

## Deviations

None blocking; the gate chain never failed and no off-limits file was touched. Three items to surface.

1. Unclosed citations outside finding s18-29's enumerated sites. The finding listed exact sites in `src/core` only, and I stayed inside them. The same unresolvable-citation pattern survives elsewhere in the repository, all within my owned scope but named by no finding, so I left it for a successor unit rather than expanding this one: `guides/emitter.md` (lines 3, 15, 25, 34, 52, 69, 73, 89, 92, 95, 118, 136, 202, 203, 205, 218 — including a `## References` bullet that enumerates `§13`, `§8`, `§4.1`, `§10`, `§22` against `../AGENTS.md`, which resolves to a real file with no numbered sections), `tests/src/core/Emitter.test.ts:7` and `:11`, and `tests/src/core/helpers.test.ts:4`. The guide sites are the consumer-visible half of this defect and are the more valuable ones to close.

2. TSDoc voice is now mixed inside the package, as the brief's clause (b) implies. `factories.ts` reads `Creates` because I rewrote that sentence to delete its citation; `helpers.ts` still reads `Extract the own enumerable keys` and the type-alias and interface descriptions in `types.ts` remain noun phrases. I did not convert the noun-phrase descriptions on `EmitterErrorHandler`, `EmitterHooks`, `EmitterInterface`, or the `Emitter` class, because a third-person `-s` verb form does not apply to a type description and converting them is the deferred voice wave's work, not this finding's.

3. `dist_moves` is true, but only through comments. Both applied changes are documentation-only; no runtime code, signature, or export changed. The effect on the built artifact is confined to the emitted declarations — `dist/src/core/index.d.ts` now carries the new `EmitterInterface` member TSDoc and no longer carries the `AGENTS §` citations. Flagging it because a published-surface diff on this package will show as material text under a rule that excludes only sourcemaps and whitespace, and the ruling on whether comment-only declaration movement obliges a bump is the Orchestrator's, not mine.
