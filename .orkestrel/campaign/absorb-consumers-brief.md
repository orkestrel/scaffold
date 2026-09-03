# Absorb — taverna, lloyds, and supervisor before their campaign

## Role and engine

`grok` on Cursor Grok (bench), read-only. Return distilled evidence with `file:line` pointers,
never raw dumps, and no decisions.

## Question

For each of `C:/Users/mikes/WebstormProjects/taverna`, `C:/Users/mikes/WebstormProjects/lloyds`, and `C:/Users/mikes/WebstormProjects/supervisor`,
what does an Orchestrator need to know before (a) bringing the repository to scaffold 0.0.60 and
the latest `@orkestrel/*` packages through the fleet visit, and (b) applying the
`enterprise-bootstrap` and `orkestrel-prove-journey` skills to its browser surface?

## Read

- Each repository's `package.json` (scripts, `dependencies`, `devDependencies`, `files`), its
  `AGENTS.md`, `guides/README.md`, `vite.config.ts`, `configs/**`, `tests/**` layout (which
  projects exist: src, app, browser, policy, config, setup, guides), `app/**` and `src/**`
  top-level layout, and its `.claude/agents/orkestrel.md` if present.
- The catalog at `C:/Users/mikes/WebstormProjects/scaffold/.claude/agents/orkestrel.md` for the
  latest versions, and `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-publish/references/wave.md`
  § Visit a repository for what the visit does.
- The two skills at `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md`
  and `.../orkestrel-prove-journey/SKILL.md`, to name what each repository lacks against them.
- Terrain's reference suite at `C:/Users/mikes/WebstormProjects/terrain/tests/app/browser/integration.test.ts`
  and `setup.ts` as the shape a consumer suite takes.

## Return, per repository

1. Identity: what the application is, the browser framework and Bootstrap route (Halfmoon or
   plain), how the app boots, where the shell and the primary toolbar live (`file:line`).
2. Pins: every `@orkestrel/*` range against the catalog, the scaffold version it carries, whether
   `@orkestrel/test` and `@orkestrel/probe` are declared, and the git status rows the user keeps
   (a staged lockfile change is expected in both).
3. Test infrastructure: the Vitest projects declared, whether an `app:browser` project exists,
   the browser setup files, any existing journey or capture tests, and any local helpers that
   duplicate `@orkestrel/test/browser` verbs.
4. Structure drift the visit will remove or replace: files at canon paths the current scaffold
   no longer vendors (`.agents/skills/**`, `.claude/rules/**`, `.claude/agents/*` other than the
   catalog agent, `.codex/**`, `.cursor/**`, `.mcp.json`), and vendored files that differ.
5. Against `enterprise-bootstrap`: inline `style` attributes, `<style>` blocks, custom class
   names outside Bootstrap's cascade, colour literals, icon usage, theme toggle, the destructive
   actions and their button variants (`file:line` for each category, counts as evidence).
6. Against `orkestrel-prove-journey`: the journeys a person takes on the primary surface (add,
   select, delete, import, export, retry), the refusals, the state a control carries (a statechart
   candidate), persistence (a transport candidate), and the variants (themes, viewports) the
   surface declares.
7. Risks: anything that would make the visit's overwrite destructive (uncommitted work, a
   git-ignored file at a canon path), a TypeScript major question, a lockfile in an unusual state,
   or a test suite already red.

Bound each repository's section to what an Orchestrator can plan from; name the scope any
search covered.
