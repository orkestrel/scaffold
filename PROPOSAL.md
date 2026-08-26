# PROPOSAL: scaffold as the single host for the instruction set

Stop propagating the instruction files into targets. Scaffold keeps the one canonical
copy, every target carries a small pointer, and a session attaches scaffold beside the
repository it works. Researched and drafted on 2026-08-26; the owner rules on it in a
scaffold session.

## The problem, measured

- A Claude Code cloud session that attaches the whole fleet injects every checkout's
  memory set into the model context. The session panel on 2026-08-26 read 335.2k tokens
  of memory files — 33.5% of a 1M window — across 44 files: eleven repositories times
  the four files each root auto-loads.
- The per-repository bytes behind that reading, measured in this checkout: `CLAUDE.md`
  2,844, `AGENTS.md` 17,950, `.agents/orchestration.md` 63,388, and
  `.claude/rules/writing.md` 8,220 — roughly 92 KiB of always-loaded prose per
  repository, byte-identical across all of them.
- The damage exceeds the visible percentage. A non-fork subagent inherits the full
  memory hierarchy, so in that session an agent pinned to a smaller-window model failed
  to boot at all — every launch died on "Prompt is too long" before doing any work.

## The harness facts, grounded

Each fact carries its source; "undocumented" marks where the documentation is silent and
the session must measure.

- Claude Code loads `CLAUDE.md` from the working directory and every ancestor at launch,
  after managed policy and `~/.claude/CLAUDE.md`; subtree copies load on reads into
  those subtrees (see the memory page, code.claude.com/docs/en/memory).
- Locally, `--add-dir` directories do **not** load memory by default; the
  `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` variable opts in. Cloud multi-repo
  loading is undocumented, and the observed cloud behavior loads every attached root
  with no documented off switch.
- The `claudeMdExcludes` settings key skips memory files by path or glob at any settings
  layer (memory page). Whether the cloud harness honors it is undocumented.
- An `@path` import inlines content per importing file — deduplication across importers
  is undocumented, so assume none — and an import resolving outside the working
  directory triggers an approval dialog. A pointer written as an import would therefore
  recreate the duplication or stall on approval; a pointer must be plain prose the agent
  follows with a Read.
- Rules without `paths` frontmatter load at launch like `.claude/CLAUDE.md`; rules with
  `paths` frontmatter load when matching files are read (memory page).
- `node_modules` is never auto-loaded as memory. A copy there is present on disk, read
  on demand, and injected never — the right property for a fallback.
- A non-fork subagent receives every level of the memory hierarchy the main session
  loads (see the subagents page, code.claude.com/docs/en/sub-agents).

## The design

- Scaffold's own working tree stays exactly what it is: the canonical `AGENTS.md`,
  `CLAUDE.md`, `.agents/`, `.claude/`, `.codex/`, `.cursor/`, and `.mcp.json`. Editing
  them here is the whole change process — no propagation, no fleet churn, no drift, and
  `scaffold audit` stops policing copies that no longer exist.
- Every target carries small pointer files in their place. The pointer says, as prose:
  the coding and orchestration authority is `@orkestrel/scaffold`; when a scaffold
  checkout sits beside this repository, read `../scaffold/AGENTS.md` and
  `../scaffold/.agents/orchestration.md` before working; otherwise read the same files
  from `node_modules/@orkestrel/scaffold/dist/host/`. Write the pointer pair as two
  small files (`CLAUDE.md` and `AGENTS.md`) rather than a symlink — the documented
  `ln -s` trick breaks on Windows checkouts.
- The Codex and Cursor bridges already instruct by reference — `developer_instructions`
  in `.codex/config.toml` and the `alwaysApply` rule in `.cursor/rules/` both say "read
  `AGENTS.md`, `.agents/orchestration.md`, …" — so they shrink to the same pointer
  paths rather than changing shape.
- A session then attaches scaffold beside the repositories it works. Scaffold's memory
  loads once; each target contributes a pointer of a few hundred bytes. A whole-fleet
  session carries one canonical copy instead of eleven.
- Dispatch briefs name `/home/user/scaffold/AGENTS.md` and its siblings as the files an
  executor reads before working, which the brief template already parameterizes.

## The migration, mechanically

The propagation surface is mapped; every pointer below was verified against this
checkout on 2026-08-26.

1. Split membership. `HOST_PATHS` (`src/core/constants.ts:124-159`) is one flat list
   that drives both staging into `dist/host` (`stageHost`,
   `src/server/helpers.ts:1382-1534`) and restoration into targets (`Materializer`,
   `src/bin/CLI.ts` `audit`/`repair`). Introduce the distinction the `inferGroup`
   labels already sketch (`src/core/helpers.ts:216-227`): the instruction members —
   `AGENTS.md`, `CLAUDE.md`, `.agents/*`, `.claude/agents`, `.claude/rules`,
   `.claude/skills`, `.codex/*`, `.cursor/*`, `.mcp.json` — leave the
   vendored-into-target set; the tool surface — editor and git dotfiles, oxlint,
   oxfmt, prettier ignore, `configs/`, `scripts/`, the policy tests, `LICENSE`,
   `guides/guide.md`, `guides/scaffold.md` — stays vendored. Rule during design
   whether `.claude/settings.json` stays vendored (the permissions floor is tool-read
   per repository) and whether the instruction files keep shipping in `dist/host` as
   the `node_modules` fallback while no longer being written into targets — the
   fallback in the pointer requires that they do.
2. Add the pointer files to the vendored set, so `repair` installs and polices them:
   the same destinations (`CLAUDE.md`, `AGENTS.md`), new small content, new digests —
   `repair` rewrites them in every target as stale entries.
3. Regenerate. `stageInventory` rewrites `host.json`, and
   `tests/config.test.ts:594-686` holds committed `host.json` equal to a fresh
   generation, so the membership change closes there.
4. Sweep the orphans. `repair` writes only missing and stale entries
   (`src/server/Materializer.ts:291-314`); a file removed from the inventory is
   unmanaged, not deleted. Each target needs a one-time deletion of the superseded
   full copies (`.agents/`, `.claude/agents`, `.claude/rules`, `.claude/skills`,
   `.codex/`, `.cursor/`, `.mcp.json`) in the same visit that re-pins and repairs.
5. Re-scope the policy tests. `tests/setupPolicy.ts` inspects the skill family under
   `.agents/skills` (`:1242-1434`) and the provider bridges under `.claude/skills`
   (`:1444-1561`); with those trees absent from targets, verify the inspections pass on
   absence in a target while still binding in scaffold's own tree, and re-scope them
   where they do not.
6. Release. The vendored surface moves, so scaffold bumps and publishes on its own
   account; every target re-pins, runs `repair`, takes the one-time sweep, and proves
   its gates green.

## Options ruled

- **Scaffold as single host with target pointers** — the preceding design.
  Recommended: it removes the multiplier, ends propagation churn, and makes scaffold
  the authority in fact.
- **`claudeMdExcludes` in session settings** — documented, immediate, no restructuring.
  It leaves propagation and drift in place, needs per-environment configuration, and
  its cloud behavior is unverified. Usable as a stopgap while the restructure lands;
  not the fix.
- **Slimming the file content** — refused: the multiplier stays, and the churn stays.
- **Attaching fewer repositories per session** — complementary practice, and no help to
  a fleet campaign that genuinely needs every checkout.

## Open checks for the executing session

- Measure whether the cloud harness honors `claudeMdExcludes`, and whether it loads
  `.claude/rules/*.md` per attached root — the documentation is silent on either.
- Confirm the policy inspections on absent skill trees (step 5).
- Confirm a cloud session attaching scaffold plus one target loads exactly one
  canonical copy, by reading the context panel before and after.
