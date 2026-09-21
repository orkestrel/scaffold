# CL5b scope read — settle the sweep's home and check the brief against the tree

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every row below with `holds`, `amend`, or `unclear`, each with `file:line` evidence, so
CL5b's brief is corrected before a writer opens it. A row you rule `amend` names the correct
fact. Row 1 is the one the brief cannot be dispatched without.

## The brief under review

`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/cl5b-brief.md`, with its measurements at
`.orkestrel/veneer/units/sweep-styles-authored.log.txt` and
`units/sweep-styles-source-2.log.txt`. The subject checkout is
`C:/Users/mikes/WebstormProjects/veneer`, HEAD `ea82419`, tracked tree clean.

## Rows

1. **Where a filesystem-reading proof can live.** The sweep reads the styles source directory, so
   it cannot sit in a module a browser-run project loads. Read `vite.config.ts`, the files under
   `configs/`, and `package.json`'s scripts, and name: every test project and whether each runs
   under Node or in a browser; which `tests/setup*.ts` modules each project loads; which of those
   setup modules already read the filesystem, with the call that proves it; and therefore the
   setup module that should export the sweep, the proof that covers that module, and the proof
   that should carry the tree-is-clean case. Name a concrete path for each of the three.
2. **The extraction sites.** Confirm the four partials the brief names carry the shared blocks
   the measurement reports, quoting each block. Confirm `src/styles/_mixins.scss` defines no
   mixin that already emits either block.
3. **The proofs that pin the affected declarations.** Name every proof that asserts any
   declaration in either shared block, so the brief grants each one the extraction could redden.
   Say for each whether it reads the declaration from the built cascade or from source.
4. **The image fixture.** `tests/src/styles/components/image.test.ts` declares a local source
   constant repeating the one in `tests/src/styles/elements/img.test.ts`. Quote both, name where
   a shared fixture belongs under the tests rule, and say which files a move would touch.
5. **The dependency bar.** Confirm `source-map-js` is absent from `package.json`, and name which
   declared package pulls it in. Confirm `sass` and `postcss` are declared, with their ranges.
   Then say whether any module a Node-run test project loads could import the sweep's needs
   without a new dependency.
6. **The owned set.** Read the brief's Owned and Off-limits lists line by line against the tree.
   Name any path that does not exist where the brief says it does, any file the change will make
   false that appears in neither list, and any Owned entry the change does not need.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `styles.md`, `architecture.md`, `workspace.md`.
The user has ruled that this campaign covers implementation only: report no wording or prose
finding, and rule on no guide row.

## Output

The row table (`Row | Ruling | Evidence`), then the amendments the brief needs, each as the exact
sentence that replaces the one it corrects. No process diary.
