# Probe — what each overwrite will replace or remove in taverna, lloyds, and supervisor

## Role and engine

`grok` on Cursor Grok (bench), read-only. Return distilled evidence with `file:line` pointers,
never raw dumps, and no decisions.

## Question

Before the fleet visit runs `npx scaffold overwrite` in each of `C:/Users/mikes/WebstormProjects/taverna`,
`C:/Users/mikes/WebstormProjects/lloyds`, and `C:/Users/mikes/WebstormProjects/supervisor`, what
will the replacement of planned files and the removal of foreign paths drop that the repository
relies on?

## Read

- The vendored host the visit installs: `C:/Users/mikes/WebstormProjects/scaffold/dist/host/` (the
  0.0.60 floor: `vite.config.ts`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
  `tests/config.test.ts`, `.claude/settings.json`, `AGENTS.md`, `CLAUDE.md`, and the rest) and
  the inventory `C:/Users/mikes/WebstormProjects/scaffold/host.json` (every planned path).
- The plan's ownership groups and the foreign rule in
  `C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md` (§ Ownership groups, § Fleet
  catalog, the `foreign` finding, `--groups`).
- Each repository's `vite.config.ts`, `package.json` scripts, `.claude/settings.json`,
  `.claude/launch.json` if present, `.claude/settings.local.json` if present, `.mcp.json`,
  `configs/**`, `tests/setup*.ts`, and its `AGENTS.md` and `CLAUDE.md`.
- Terrain's visit as the precedent: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/scaffold/visit-terrain-report.md`
  § The read-only audit and § The overwrite (which files were replaced, which 85 paths removed).

## Return, per repository

1. **Replaced files.** For every planned path the repository holds at different bytes, what the
   repository's copy carries that the floor copy does not: Vitest projects (name, include
   globs, setup files, environment), scripts (name and command), hooks, permissions, plugins,
   aliases. `file:line` for each.
2. **Removed paths.** Every path the plan does not own beneath its groups (the `foreign` set):
   list them grouped by directory with counts, and flag any that is git-ignored (a git-ignored
   copy becomes a permanent foreign finding) or untracked.
3. **Kept paths outside the plan.** Paths the plan neither owns nor sweeps (a `tests/app/**`
   suite, `app/**`, `src/**`, `guides/**`, `scripts/**`): confirm they are outside every group.
4. **The two operator overlays.** Whether `.claude/settings.local.json` and `.claude/launch.json`
   are planned, foreign, or outside the plan, with the guide line that decides it.
5. **Test selection after the overwrite.** Which of the repository's current test projects and
   scripts survive because the floor declares them, which vanish, and which the repository must
   re-declare in a file the plan does not own (name that file per the guide).
6. **Anything else the visit's deviation contract would trip on:** a vendored file the repository
   edited, a planned path that is a directory here and a file in the floor, a canon path holding
   product code.

Name the scope every search covered. Bound each section to what a visit brief can act on.
