# Unit design2 — rule the full wiring sweep and the one-process deletion

## Role and engine

One identical brief serves each lane, blind and in parallel. The dispatch names the lane:

- Subjective lane: `planner` on Opus 5, native subagent.
- Objective lane: Cursor Grok (`cursor-grok-4.6-high`) through the bench CLI, the user-directed
  substitution for GPT-5.6 Sol (the Codex bench is dark this session). Grok's rulings are
  proposals the Orchestrator verifies.

## Objective

Rule on the design for the owner-approved follow-up to the host-split campaign: move the
remaining harness wiring into the instruction canon so a target holds nothing that references
files it does not have, and extend `overwrite` so one run deletes every superseded canon copy —
collapsing the fleet visit to re-pin, `scaffold overwrite`, gates.

## Context

**Fixed by the owner (not open to the lanes):**

- The sweep scope: `.claude/agents` role files, `.codex/agents`, `.codex/config.toml`,
  `.cursor/mcp.json`, `.cursor/rules`, and `.mcp.json` leave the vendored-into-target set and
  join the readable canon.
- The keep-set: `.claude/settings.json`, `scripts/*.sh`, the catalog file
  `.claude/agents/orkestrel.md`, the toolchain dotfiles, `configs/`, the policy and config tests,
  `guides/guide.md`, `guides/scaffold.md`, `LICENSE`.
- The deletion: `overwrite` deletes the superseded canon copies in the same run that repairs the
  pointers; `repair` still never deletes; `audit`'s canon question stays as the read-only
  preview.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`,
`patterns.md`, `tests.md`, `workspace.md`, `quality.md`, `documentation.md`, `writing.md`;
`.agents/orchestration.md`. Skill: none. Guide: `guides/scaffold.md` (the vendored data root,
verbs, and groups sections describe the shipped state this design extends).

**Evidence, verified by the Orchestrator on 2026-08-27 at branch tip `308f728`:**

- Shipped membership: `CANON_PATHS` is `AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md`,
  `.agents/skills`, `.agents/templates`, `.agents/transports`, `.claude/rules`,
  `.claude/skills`. `HOST_PATHS` still vendors `.claude/agents` (whole directory),
  `.codex/agents`, `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json`,
  beside the keep-set.
- The dangling references motivating the sweep: every `.claude/agents/*.md` role file says
  "Read `.agents/orchestration.md` first"; `.cursor/rules/orchestration.mdc` and
  `.codex/config.toml` `developer_instructions` name `.agents/orchestration.md`,
  `.claude/rules/*.md`, and `.agents/skills` — all absent in a target.
- The shipped invariant, stated in `src/core/constants.ts` (CANON_PATHS remarks) and
  `guides/scaffold.md`: no host-origin artifact claims a canon path; the one deliberate overlap
  is the template-origin pointer pair at `AGENTS.md` and `CLAUDE.md`, which
  `blueprintToDocumentArtifacts` plans and the `canon` advisory subtracts.
- `Materializer.catalog` requires `.claude/agents/orkestrel.md` to exist with its marker pair
  and does not create it; `isDeferredPath` keeps it presence-owned so `catalog` owns the table
  and `repair` restores only absence. The CLI fetch list already excludes deferred paths, so the
  catalog file is never overlaid live.
- `#canonQuestion` (`src/bin/CLI.ts`) names each `CANON_PATHS` member present in the target
  minus the paths `blueprintToDocumentArtifacts` plans; it is reported by `audit` and by the
  writing verbs' terminal audits, refuses nothing, and is non-blocking.
- `overwrite` today deletes tracked foreign findings under expanded planned host directory
  roots, refuses a dirty tree without `--dirty`, requires git, and never deletes `src/`, `app/`,
  or git-protected paths (`src/server/helpers.ts` protection list, `Materializer.remove`).
- `stageHost` walks `[...HOST_PATHS, ...CANON_PATHS]`; `host.json` records
  storage/destination/executable/digest; `tests/config.test.ts` holds it byte-identical to a
  fresh stage.
- Targets' `.mcp.json` registers the `probe` MCP server
  (`node_modules/@orkestrel/probe/dist/bin/main.js`) and `codex mcp-server`;
  `.claude/settings.json` (kept) sets `enableAllProjectMcpServers: true` and the SessionStart
  hooks that run the kept `scripts/*.sh`.
- The campaign record: `.orkestrel/scaffold/plan.md`, the unit reports, `a1-audit-verdict.md`,
  `f1-verify-report.md`, `v1-gate-report.md`, `probe-e2e.md`.

**Host.** POSIX shell at `/home/user/scaffold`, clean committed tree at `308f728`, `dist/`
built, all gates green. Lanes are read-only.

## Design questions to rule

1. **The `.claude/agents` split.** The directory joins the canon while
   `.claude/agents/orkestrel.md` stays planned (owner-fixed). Rule the exact mechanism: how the
   lists express it (the directory as a canon member with the file planned explicitly in
   `nameToHostArtifacts`, or another shape), how the invariant sentence is restated to carry a
   second deliberate overlap without going false, and what `isCanonPath('.claude/agents/orkestrel.md')`
   returning true must not break (fetch filter, hydration, the disjointness rationale). Flag it
   if keeping the catalog file vendored is materially worse than teaching `catalog` to skip on
   absence — the owner fixed the keep, but a material defect must be surfaced rather than built.
2. **The advisory's subtraction.** Generalize from "the planned document paths" to "the planned
   paths" so the catalog file and its parent directory are named correctly: a canon directory
   member holding a planned file must not be named for wholesale deletion. Rule the exact
   naming: the directory, the unplanned children, or both.
3. **The `overwrite` sweep.** Rule its semantics exactly: which paths it deletes (tracked canon
   copies minus planned paths, recursing into a directory member only to spare planned files),
   how it composes with the existing foreign-finding deletion and the protection list, what the
   report shows, and what the negative controls are (a planned pointer never deleted, the
   catalog file never deleted, an untracked canon leftover left for git hygiene or deleted —
   rule it, `src/`app` untouched).
4. **The `probe` server in targets.** Removing `.mcp.json` unregisters the `probe` MCP server
   from bare-target sessions, and the quality rules route TypeScript-edit claims through its
   `prove` tool. Rule whether that instrument functions in the intended scaffold-primary session
   model (scaffold's own `.mcp.json` serving the session, the probe project living per
   workspace), and what, if anything, a target must keep for it. Name the limit honestly if the
   instrument is scaffold-session-only after the sweep.
5. **Codex and Cursor sessions on scaffold.** The canon keeps `.codex/*` and `.cursor/*` only in
   scaffold's tree. Confirm nothing in scaffold's own session flow reads them from a target, and
   that the vendored-file import and policy sweeps have no row binding those trees in targets
   (the policy suite passed on absence for `.agents`/`.claude` trees; rule whether any
   inspection binds `.codex`/`.cursor` presence).
6. **Documentation and parity.** Which guide sections, README passages, wave-reference steps,
   and ROADMAP rows this change owns; the `canon` question's guide paragraph and the Limits
   entry ("No verb removes a superseded instruction copy") both become false and must be
   rewritten to the new verb split (`audit` previews, `overwrite` deletes, `repair` never
   deletes).
7. **Units and order.** The bounded writer units, one at a time, each with checkable acceptance
   criteria, and the exit criterion for this follow-up.

## Unknowns

- Whether any fleet target consumes its own `.codex/agents` or `.cursor/rules` operationally
  (outside scaffold-primary sessions): unmeasurable from this checkout; treat bare-target Codex
  and Cursor sessions as degraded mode unless evidence says otherwise, and report the assumption.

## Scope

**Owned.** None — read-only lanes. Return prose only.

**Off-limits.** Editing anything; `.orkestrel/campaign/`; secrets.

**Tools.** Read, Grep, Glob only.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the
assignment directly and spawn nothing. State which lane you held.

## Output

The `planner` return shape: `Design` (answering every numbered question), `Alternatives` (at
most two), `Units` (role AND engine, ownership, dependencies, acceptance criteria), `Tensions`,
`Risks`. Deliver as your final message; write no files.

## Deviation contract

A conflict between the owner-fixed scope and the law stops the lane with expected/found/evidence
and one short hypothesis. Ancillary calls (names between lawful forms, section placement) are
the lane's to decide and record.

## Acceptance criteria

1. Every numbered question ruled with reasoning grounded in the cited code.
2. Units named with role, engine, ownership, dependencies, and checkable acceptance criteria.
3. No non-negotiable or named rule violated by the design.
4. The follow-up's exit criterion stated.

## Review evidence

The subject is a design proposal: the canon it must satisfy is `AGENTS.md` plus the named rules;
the motivation record is the owner's ruling of 2026-08-27 (this brief's fixed scope) and the
dangling references listed under Evidence.
