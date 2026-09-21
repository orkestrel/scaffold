# CL5b scope read — report

Executor: `checker` on native Sonnet, read-only, under `units/cl5b-scope-read-brief.md`, reading
`units/cl5b-brief.md` against the Veneer checkout at `ea82419`.

## Row table

| Row | Ruling | Evidence |
| --- | --- | --- |
| 1 where a filesystem-reading proof can live | amend | `vite.config.ts:104-328` defines the projects. The source-browser, app-browser, and setup-browser projects run in the browser and load `tests/setup.ts` and `tests/setupBrowser.ts`; `configs/src/vite.styles.config.ts:44-54` gives the styles project `tests/setupStyles.ts` and the built cascade as well. So those three setup modules are browser-loaded and cannot import `node:fs`. The `setup` project (`vite.config.ts:297-310`) runs under Node, and neither `tests/setupConformance.ts` nor `tests/setupPolicy.ts` appears in any browser project's setup list. `tests/setupConformance.ts:20` already imports `existsSync`, `readFileSync`, and `realpathSync`, and is the styles domain's filesystem reader. `tests/setupStyles.test.ts:1,7` itself imports `node:fs` and already asserts over the built cascade and the guide, which is the same population class the sweep must read. **So: export the sweep from `tests/setupConformance.ts`, cover it in `tests/setupConformance.test.ts`, and carry the tree-is-clean case in `tests/setupStyles.test.ts`.** |
| 2 the extraction sites | holds | `src/styles/elements/_heading.scss:1-12` and `src/styles/components/_type.scss:1-12` both write the four heading declarations; `src/styles/elements/_img.scss:1-7` and `src/styles/components/_image.scss:1-6` both write the two sizing declarations. `src/styles/_mixins.scss` defines no mixin emitting either block. |
| 3 the proofs that pin the affected declarations | holds | `tests/src/styles/elements/heading.test.ts:20-24` and `tests/src/styles/components/type.test.ts:32-38` assert the four heading properties; `tests/src/styles/elements/img.test.ts:21,24` and `tests/src/styles/components/image.test.ts:24-25,53` assert the two sizing properties. All four read the built cascade rather than source, so the extraction could redden any of them. |
| 4 the image fixture | amend | The direction is the reverse of what the brief says. `tests/src/styles/components/image.test.ts:7-8` declares the named constant and `tests/src/styles/elements/img.test.ts:16` repeats the identical literal inline, unnamed. The tests rule puts a shared fixture in a setup file; a plain string needs no filesystem access, so it belongs in `tests/setupStyles.ts` rather than the Node-side module. A move touches that module, its export-name assertion in `tests/setupStyles.test.ts`, and both proofs. |
| 5 the dependency bar | holds | `package.json` lists no `source-map-js`; `sass` at `^1.104.1` is what pulls it in transitively, and `postcss` at `^8.5.15` is declared. The text form needs only `node:fs`, which two setup modules already import, so it needs neither declared package nor a new one. |
| 6 the owned set | amend | Every named partial and every off-limits path exists as named. The one unresolved Owned entry resolves per row 1 to three concrete paths that must be added by name. No Owned entry is unneeded, and nothing the change makes false sits outside both lists once those three are added. |

## Amendments

1. Replace the unresolved Owned entry with `tests/setupConformance.ts` for the sweep function,
   `tests/setupConformance.test.ts` for its cases, and `tests/setupStyles.test.ts` for the
   tree-is-clean case.
2. Correct the fixture's direction: the component proof declares the named constant and the
   element proof repeats the literal inline, unnamed. The shared fixture belongs in
   `tests/setupStyles.ts`, which is browser-loaded and needs no filesystem access for a string.
3. Add those three paths to the Owned list by name.

The dependency bar, the extraction sites, and the existing-proof grant hold as written.
