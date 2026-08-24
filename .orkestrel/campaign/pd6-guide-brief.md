# Unit PD6 — probe: guide prose for every documented ruling

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. LAST writer in the probe chain. Read `/home/user/orkestrel/probe/AGENTS.md`,
`.claude/rules/writing.md`, and `.claude/rules/documentation.md` (vendored there) before
editing.

## Objective

In `/home/user/orkestrel/probe`, the guide (`guides/*.md` — locate the probe guide) takes the
prose every landed ruling obliges, per
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read it first; the ruling
numbers here are its):

1. **Ruling 1/5 (deadlines and destroy).** The documented bound: an overrun is the budget plus
   the longest single language-service call. The stage-level teardown prose stops claiming every
   stage holds a local bound — state the lint bound, the type stage's uninterruptible-call
   limit, and the coordinator-bounded runtime teardown distinctly. Verify each sentence against
   the landed code first.
2. **Ruling 2 (relatedness).** The guide states relatedness as the reader's obligation, with the
   end-to-end unrelated-control-earns-receipt proof, and documents the ONE refusal: a control
   byte-identical to its case is refused at admission. Carried from PD4 (exact current text at
   `guides/probe.md` near lines 519-520): the passage still states the NARROW rule ("The
   control's candidate text differs from the case's...") — widen it to the landed behavior:
   the whole case (candidate drafts and test) must differ, and `prove` refuses an identical
   control at admission with `origin: 'claimant'`, `code: 'refused'`. The PD4-FIX report
   (`.orkestrel/campaign/pd4-fix-report.md`) carries the EXACT patches: the
   `guides/probe.md` ~519-520 bullet gains the refusal sentence and the byte-comparison
   sentence (varying `stage` or `reason` alone does not admit), and the
   `claimant`/`refused` table row at ~331 gains the repeating-control clause with the whole
   table repadded to the new widest cell. Apply those patches as written unless the landed
   code contradicts them — verify each sentence against `Probe.#admit` first.
3. **Ruling 3 (re-warm).** The recovery behavior: a failed warm surfaces the workspace fault and
   the next `inspect` warms fresh.
4. **Ruling 8 (fsModuleCache).** The receipt-limits passage gains the dated sentence (the option
   does not exist in the installed Vite 8.2.2, date 2026-08-24), and names the serve-detection
   as the standing guard.
5. **Ruling 9 (realpathSync).** The narrowed claim: the final component is closed by `wx`
   exclusive creation; a directory-component swap is open because Node exposes no
   descriptor-relative no-follow traversal.
6. **Ruling 10 (revision suffix).** The sentence in Revisions: a test asserting its own filename
   reads the declared path instead.
7. **Rulings 6/7 as landed.** The issue-party rule (a file-less diagnostic on an inferred
   project is the workspace's), message hygiene, the overlay query rule, and the serve
   detection with its boundaries (bare specifiers not chased; the type/runtime draft asymmetry).
   Carried exact patches: the `## Surface` server-helpers table needs the
   `relativeWorkspaceMessage` row (the PD5-FIX report in `.orkestrel/campaign/` carries the
   exact row text; insert after the `relativeWorkspaceFile` row in source order and re-pad the
   table — the parity gate reads the first cell only), and the `TypeStageInterface.inspect`
   row near `guides/probe.md:218` still says a file-less diagnostic "reports an `instrument`
   issue for an inferred one" — now false; correct it to the workspace party. The
   `workspace`-issue prose near lines 287-291 can gain the same case. Verify every sentence
   against the landed helper (bounded root spellings only; the runtime stage renames its
   generated specification by exact basename; no revision-shape matching).

Every behavioral sentence is checked against the landed code, and where the documentation rules
require an executed assertion for a prose claim (a fence or a behavior the parity gate cannot
see), verify one exists in the suites the chain landed — a missing one is a deviation to report,
not prose to soften.

## Environment

Native run; `node_modules` installed. `npm run test:guides` proves parity; run it.

## Scope

- Owned: the probe guide file(s) under `guides/`.
- Off-limits: everything else. No commits.

## Acceptance criteria (cheap-first)

1. Prose obeys the writing rules (no banned substitution-table hits in edited passages; sweep
   your own edits and name the pattern and paths).
2. `npm run test:guides` green.
3. Every ruling above has its sentence(s), each verified against code — cite file:line per
   sentence in the report.

## Deviation contract

Stop and report on: a landed behavior contradicting a ruling's sentence, or a prose claim with
no executed assertion where the documentation rules demand one. Ancillary wording is yours.

## Output

Final message = report: per-ruling sentence list with code citations, parity gate tail,
`git diff --stat`, `git status --porcelain`, deviations or none.
