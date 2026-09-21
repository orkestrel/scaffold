# CL5c scope read — report

Executor: `checker` on native Sonnet, read-only, under `units/cl5c-scope-read-brief.md`, reading
`units/cl5c-brief.md` against the Veneer checkout at `ea82419` with CL5b's completed change in
the working tree.

## Row table

| Row | Ruling | Evidence |
| --- | --- | --- |
| 1 the three sections share one body | holds | Read line for line, the three section files are structurally identical except the doc description, the example's class name, the imported constant names, the class name, and the label each reads from its own copy object. No line differs in control flow, method count, or behaviour; every method body is byte-identical apart from those data references. |
| 2 what a shared shape must keep | holds | `tests/app/browser/index.test.ts:8-24` pins the exact export-name set, so a shared implementation must still surface each section under its own name rather than a collapsed one. `tests/app/browser/sections/ContentSection.test.ts:1,9` imports and instantiates that class by name. `tests/app/browser/Showcase.test.ts:57-133` asserts the region labels and the specimen order, which are behavioural and unaffected by internal shape. `app/browser/index.ts:1-7` exports the types, the constants, the shell, and all four sections. |
| 3 the button section's shape | holds | It differs in kind rather than degree: it owns an engine array, mounts through a private pair rather than one linear loop, applies a grid class instead of a paragraph and per-specimen sequence, conditionally constructs an engine per specimen by matching a selector, and releases those engines before removing its region. A shape built for the three data-only sections could not cover it without carrying engine lifecycle those three do not need. |
| 4 the mark pair as shipped | holds | The tag pads on the inline axis only (`src/styles/elements/_mark.scss:3`) while the class pads on all sides (`src/styles/components/_type.scss:43`), and the class paints from the Bootstrap highlight properties (`:44-45`) rather than the system colours the record measured. The divergence the ruling assumes is real in the shipped tree. |
| 5 the system colours are usable | **amend** | **No predicate anywhere inspects a declaration's colour value.** The conformance predicates govern step and binding obligations, not CSS values, and a full-text search across the conformance setup, the policy setup, and the policy proof for colour terms returns nothing that reads a declaration's colour. The only governing text is `.claude/rules/styles.md:42-43`, prose with no mechanical enforcer: never use a literal colour, use a token reference or a mix over tokens. **A bare system colour keyword is neither a literal in the hex or functional sense nor a token reference, so it satisfies neither form the rule names.** |
| 6 the caption and figure pairs | holds | The class reads the Bootstrap secondary colour and the tag reads the Veneer muted token through the caption mixin. `tests/src/styles/components/image.test.ts:64-67` already asserts the two do **not** resolve alike, recording the difference rather than an equality. |
| 7 the retune tables and the colour case | holds | The retune values are disjoint from the default tables' sizes by construction, and nothing asserts that disjointness: the freezing case checks token names and freeze state only. The type proof mounts one shared host per heading case and carries the painted-colour assertions inline, which is what the brief's obligation asks to split out. |
| 8 the owned set | **amend** | `tests/setupStyles.test.ts` is absent from the Owned list, yet it holds the case that must gain the disjointness assertion; only the data module is granted. Every other Owned and Off-limits path exists as named. CL5b's changes to the styles setup module and both image proofs sit inside files this brief already grants and carry no conflict; its change to the conformance setup module sits in a file already off-limits, and this unit needs nothing from it. |

## Amendments

1. Row 5: no predicate anywhere inspects a declaration's colour value. The only governing text is
   the styles rule's prose ban on a literal colour, which names a token reference or a mix over
   tokens as the permitted forms. The successor must read that rule itself rather than defer to
   an enforcer that does not exist.
2. Row 8: add `tests/setupStyles.test.ts` to the Owned list, for the case that freezes the case
   tables and must gain the disjointness assertion.
