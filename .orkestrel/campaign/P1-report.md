# Unit P1 report — probe: Overlay drive-case probe

Implementer (Opus 5) returned 2026-08-26. Clean probe; tree unchanged at `88c2fa6`.

- Instrument: `tmp/probe/overlay-case.probe.test.ts` (removed after the run), real `TypeStage`
  inspections over a scratch workspace, drafts shadowing clean and broken disk files, both
  drive-case directions, the `Overlay.covers` seam through a virtual directory, and a recording
  host capturing every spelling the compiler asked for.
- Ruling: TypeScript 6.0.3 on case-folding NTFS hands back the given drive-letter spelling and
  folds nothing; no overlay miss. The proposed `normalizePath` drive fold is refuted; the Overlay
  is retained unchanged.
- The negative control (drawn from outside the drive-letter population) discriminated — and
  surfaced a reachable defect: a draft whose FILE NAME case differs from the disk spelling
  (`src/CLEAN.ts` over `src/clean.ts`) registers under the draft spelling, the compiler resolves
  to the disk spelling, the overlay is missed, and the committed file is silently type-checked.
  Carried to unit P4.
- Coverage stated: TypeScript 6.0.3, this host, the `fileExists`/`readFile`/`getScriptSnapshot`/
  `directoryExists` seams; nothing about `readDirectory`/`getDirectories` forwarding or other
  compiler versions.
