# Unit CL5b — brief 2

Succeeds `units/cl5b-brief.md`, which stays in force for everything this brief does not name and
is left unedited. What changed and why: a `checker` scope read
(`units/cl5b-scope-read-report.md`) checked brief 1 against the tree at `ea82419` and returned
three amendments, folded in here. Read brief 1 first, then this delta.

## Corrections to brief 1

1. **Where the sweep lives, settled.** Brief 1's first Unknown is closed. The browser-run projects
   load `tests/setup.ts`, `tests/setupBrowser.ts`, and `tests/setupStyles.ts`, so none of those
   can import `node:fs`. The `setup` project runs under Node, and `tests/setupConformance.ts`
   already imports `node:fs` and is the styles domain's filesystem reader.

   - Export the sweep from `tests/setupConformance.ts`.
   - Cover it with cases in `tests/setupConformance.test.ts`.
   - Carry the tree-is-clean case in `tests/setupStyles.test.ts`, which already asserts over the
     built cascade from Node.

   `tests/setupConformance.ts` was off-limits to every unit since CL1, which owns it as the proof
   contract. This brief grants it **for the sweep function alone**: add the export and its types,
   change no existing export, and change no behaviour any current consumer reads.

2. **The image fixture's direction is the reverse of brief 1's.** The component proof declares
   the named constant and the element proof repeats the identical literal inline, unnamed. The
   shared fixture is a plain string needing no filesystem access, so it belongs in
   `tests/setupStyles.ts` rather than the Node-side module. Moving it touches that module, the
   export-name assertion in `tests/setupStyles.test.ts`, and both proofs.

3. **The proofs the extraction could redden, named.** All four read the built cascade rather than
   source, so each must stay green unedited: `tests/src/styles/elements/heading.test.ts`,
   `tests/src/styles/components/type.test.ts`, `tests/src/styles/elements/img.test.ts`, and
   `tests/src/styles/components/image.test.ts`.

## Owned set, restated in full

Brief 1's Owned list, plus `tests/setupConformance.ts` (the sweep function alone),
`tests/setupConformance.test.ts` (its cases), `tests/setupStyles.test.ts` (the tree-is-clean case
and the fixture's export-name assertion), `tests/setupStyles.ts` (the shared fixture alone),
`tests/src/styles/elements/img.test.ts` and `tests/src/styles/components/image.test.ts` (the
fixture's consumers), and `tests/src/styles/elements/heading.test.ts` and
`tests/src/styles/components/type.test.ts` (which the extraction could redden).

Brief 1's Off-limits list otherwise stands, and `package.json` stays off-limits without
exception: this unit adds no dependency, and the scope read confirms the text sweep needs only
`node:fs`, which two setup modules already import.

## Acceptance criteria, amended

Brief 1's criteria stand, with these additions:

- The sweep is exported from `tests/setupConformance.ts` with cases in its own proof, and no
  existing export of that module changes.
- The tree-is-clean case sits in `tests/setupStyles.test.ts` and reddens on a planted duplicate.
- The image fixture is exported once from `tests/setupStyles.ts` and read by both image proofs,
  with neither declaring nor inlining its own copy.
- All four proofs the extraction could redden stay green with no expectation edited.
