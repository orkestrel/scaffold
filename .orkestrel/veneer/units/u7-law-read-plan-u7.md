<!-- checker on native Sonnet, workflow wf_8a54447e-081, agent acf38fa89baafd301; law read of the pending document; retained 2026-09-20 -->

## Table 1 — Lines in scope directing forbidden or contradicted action

Scope read: `plan.md` `### U7 Button` (lines 480–537) and `## Close each component on browser evidence` (lines 539–565), cross-checked against `u7-design-verdict.md`.

| Line | Text | Rule (file:line) | Departure |
|---|---|---|---|
| plan.md:495 | "…forced-colors fallbacks, RTL, and the 150 ms feedback transition with its reduced-motion pair." | plan.md:436-438 (U-styles standing ruling: "the `index.rtl.css` twin is out of scope by the user's ruling of 2026-09-20: it stays as emitted, unexported, and no unit spends on it") | Directs the executor to author RTL-specific rules in the Button partials, contradicting the standing ruling that no unit spends on RTL. |
| plan.md:501-502 | "…option validation through `@orkestrel/contract` (declared as the first runtime dependency)…" | u7-design-verdict.md:15 (ruling row 2: "no runtime dependency in U7 (Button declares no options a guard would earn…"); AGENTS.md:71 (Minimal public API — expand a capability only with its first real consumer) | Contradicts the design round's ruling. `@orkestrel/contract` is also not in U1a's declared dev-dependency list (plan.md:152-157), so this line also adds an undeclared package as a new runtime dependency. |
| plan.md:502 | "…`createButton` in `factories.ts`;…" | u7-design-verdict.md:16 (ruling row 3 factory: "none"); `.claude/rules/architecture.md:159` (Wrapper test — delete pass-through factories) | Contradicts the design round's explicit ruling of no factory, and directs a wrapper this plan's own U1-conform unit (plan.md:385-387) already treats as a pass-through factory to delete. |
| plan.md:505-512 | "…`data-bs-toggle="button"` through the `./browser/auto` entry…the adapter the design round places behind the `./browser/auto` entry…" | u7-design-verdict.md:41-50 (user's correction: "you're making up surfaces, follow our project conventions"; "no new subpath export, no side-effect entry, no second build, no rule change"); `.claude/rules/workspace.md:17-30,35` (environments table; only `src/styles/index.ts` is a documented side-effect entry) | Directs implementing a `./browser/auto` subpath export/side-effect entry the user refused and no workspace rule admits; the design round replaced it with `Delegate` exported from the existing `./browser` barrel. |
| plan.md:525 | "…the packed CSS, `./browser`, and `./browser/auto` offline as a vanilla consumer;…" | Same as preceding row | Exercises the same refused entry in the distribution stage. |

## Table 2 — File paths the document directs an executor to create or edit

| File path | Placing rule row | Note |
|---|---|---|
| `elements/_button.scss` | No row — `.claude/rules/styles.md:13-20` names only `_mixins.scss`, `_tokens.scss`, `_theme.scss`, `index.scss` as centralized files; the `elements/` folder is a project-local convention this plan itself introduced at plan.md:319-321, not rule-derived. | Consistent with prior plan usage, not with a written rule. |
| `components/_button.scss` | No row — same basis as preceding row. | — |
| `src/browser/Button.ts` | `.claude/rules/architecture.md:213-217` (Entity subfolders — flat class at module root until a family exists); `.claude/rules/workspace.md:22` (`src/browser/` published browser-only library) | Placement matches the rule. |
| `factories.ts` (for `createButton`) | `.claude/rules/architecture.md:29,66` (module-root `factories.ts` is the centralized location) | Placement rule exists, but the design verdict rules the file must not be created at all (Table 1, row 3). |
| `tests/src/browser/Button.test.ts` | `AGENTS.md` Project model (`tests/` mirrors source); `.claude/rules/workspace.md:29` | Placement matches the rule. |
| `./browser/auto` (implied new entry file) | No row — `.claude/rules/workspace.md:17-30` admits no such path under `src/browser/`, and only `src/styles/index.ts` (workspace.md:35) is a documented side-effect entry. | Forbidden per Table 1, row 4. |
| `guides/veneer.md` (§ Browser, § Compatibility, § Styles edits) | `.claude/rules/documentation.md` (one-guide-per-package authority; guide parity) | Placement matches the rule. |
| `tests/app/browser/integration.test.ts` | `.claude/rules/workspace.md:29`; already authored under U1a (plan.md:169) | Extension of an existing file, placement matches. |

The document adds one surface beyond core, browser, server, and styles: a `./browser/auto` subpath export / side-effect entry under the browser environment, which the design verdict's user correction (u7-design-verdict.md:41-50) has already refused.
