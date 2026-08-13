# Ruling — the guide-parity duplication

Two blind lanes on one brief.

| Lane | Engine | Decision |
| --- | --- | --- |
| Subjective | Opus 5 | **A** — ship nothing; split the corpus per package using what already ships |
| Objective | GPT-5.6 Sol | **D** — ship nothing from this package; put a `compareParity` in `@orkestrel/guide` |

## What both lanes agreed, independently

**`@orkestrel/test` exports nothing on this question.** Neither lane, arguing from opposite
perspectives, wanted a single new export here. That is the ruling, and it needs no reconciliation.

Their reasons differ and both survive:

- Opus: after subtracting `@orkestrel/guide`'s published helpers — `missingSymbols`, `findMissing`,
  `findUnexampled`, `symbolKey`, `fenceImports`, `isExternalLink`, `resolveLink` — what remains in
  the 43-line region is one regex, one conditional, and three filter-map chains. Exporting those is
  the superfluous-wrapper failure with a large member count attached, and the count does not repair
  the shape.
- Sol: the values are `GuideInterface`, `SourceInterface`, `SurfaceSymbol` and `MethodGroup`, all
  `@orkestrel/guide`'s published contract. Naming them here is forbidden by this package's contract;
  restating them structurally is forbidden by the structural-shape doctrine's first clause, since
  they are one package's contract rather than a host-level shape.

Both reach the same place `quality.md` already points: *fix the lowest package that owns the general
mechanism*. That package is `@orkestrel/guide`, not this one.

## Two premises the round corrected

**My brief overstated the foreign-type trap.** Sol compiled the actual boundary — a local-source
`GuideInterface` and `SourceInterface` passed to parameters typed from the installed published copy —
and reported `local_to_published_diagnostics=0` against a negative control at `1`. The trap that
killed `createRecorderMap` does **not** bind these particular interfaces. It remains irrelevant to
the outcome, because the contract forbids the foreign type here regardless, but the brief asserted a
mechanism more broadly than the measurement supports.

**Opus named the instrument that would overturn its own ruling, and the Orchestrator ran it.** If the
41 files diverge only accidentally, `guides.test.ts` is a fourth member of scaffold's vendored family
and the question belongs to `scaffold`. Whole-file normalization returns **41 distinct classes across
41 files**, with **37 packages asserting against `source.exports()` and 3 against `source.surface()`**
— different claims under the same test names. Vendoring would impose one semantics on all 41 or grow
a mode switch. The alternative fails on its own nominated instrument.

## The ruling

1. **`@orkestrel/test` ships nothing further.** The surface stays where the audit rounds leave it —
   5 types and 11 values, once round 2 struck `hasSymbolicLink`. The
   research phase closes having added no export, which is the correct outcome when the evidence says
   so.
2. **The per-package corpus split is adoption work.** Moving each package's corpus into its own
   `tests/setupGuides.ts` on top of the already-shipping `resolveRoot` and `readInventory` removes
   about 26 of 143 lines per package and touches no proof. `database`, `guide`, `html` and `mcp`
   already do it, and `html` proves the property that matters: its registration count is unchanged
   at 17. This belongs to the adoption campaign, and it needs nothing new published.
3. **`compareParity` is recorded against `@orkestrel/guide`, not built here.** It is a genuine
   finding and it is out of this campaign's scope: the designated branches are `orkestrel/scaffold`
   and `orkestrel/test`, and it would change a published runtime surface in a third repository,
   obliging a version bump and a cascade. That is the user's decision, not an auditor's finding.

## Adoption costs this round surfaced

- `guide` and `mcp` call a **local** `readInventory(root, directories, ['.ts', '.md'])` — an array
  third argument — where the published form takes an `InventoryOptions` object. Same name, different
  contract. Adoption repairs the call or records why the local variant survives.
- The corpus differs per package in ways a parity row can see: `abort` adds `AGENTS.md` to its
  corpus and `mcp` does not.
- `mcp` carries roughly 200 lines of comments recording live scope guards and deliberately-recorded
  upstream limits. Those are `mcp`'s decisions and have nowhere to live in a shared registrar, which
  is the concrete reason a registrar was rejected rather than a stylistic one.
