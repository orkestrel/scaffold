# Absorption lane — gather the consumer patches the landed units returned for the L4 to L6 packages

## Role and engine

`grok` on the Cursor bench (GPT-5.6 Luna), read-only, in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Return evidence with `file:line` pointers; rule nothing, edit nothing, run no command that changes a tree.

## Question

For each target package — `brief`, `probe`, `program`, `worker`, `workflow`, `agent`, `ollama`, `toolbox`, `mcp`, `server` — list every consumer edit a landed unit's report returned for it, so the Orchestrator can write that package's brief addendum. The reports sit under `/home/user/scaffold/.orkestrel/campaign/conform/reports/conform-<pkg>-report.md`; the entries live under each report's `## Shared-file patches` and `## Breaking` sections (headings vary: `§ Shared-file patches`, `Consumer patches`, `Shared-file patches`).

## Evidence to return

For each target package, one section `### <target>` listing every entry found, each as:

- the source report (`reports/conform-<pkg>-report.md:<line>`);
- the target file path and line as the report names it;
- the exact substitution or the diff block the report gives, quoted verbatim (fenced);
- whether the entry is a source or test edit the target's gates need (`required`), a prose or guide edit (`prose`), or a vendored-mirror refresh (`mirror`, listed once per report and not expanded).

Also, for each target, state whether its `tests/guides.test.ts` carries a `symbol.kind` line (`grep -n "symbol.kind" /home/user/fleet/<target>/tests/guides.test.ts`), which guide's landed rename to `symbol.keyword` obliges (`reports/conform-guide-report.md` § Shared-file patches).

Sweep, in addition to the sections, every report for the target's name as a consumer (`grep -n "<target>" reports/conform-*-report.md`) and list any entry the sections missed.

Reports to read for these targets at minimum: `conform-interpret-report.md` (brief's `complete` patches), `conform-qualifier-report.md` and `conform-rater-report.md` (program's patches, program's own README and guide included), `conform-queue-report.md` (worker, workflow, agent), `conform-terminal-report.md` and `conform-workspace-report.md` (toolbox), `conform-router-report.md` (server, mcp, middleware, ollama), `conform-guide-report.md` (every target), `conform-server-report.md` if present, `conform-codec-report.md` (server's `encodeHex` note), `conform-reason-report.md` (qualifier's staged reason drop, in case program reads it).

## Output

The sections named, then `## Unknowns` (any report or section you could not read, with its path), then `## Journal` (leave for the driver) and `## Deviation` (any tree change observed, or none). No process diary.
