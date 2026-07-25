# AGENTS.md

> TypeScript · types-first · zero unsolicited dependencies · single-word public APIs.
> This is the authoritative root for how humans and agents write code in this project.

## Authority and loading

- These instructions apply to every project in this style; never import assumptions, names, or logic from another repository.
- The user's current instruction wins. Otherwise, this file and its linked rules outrank existing code. Existing code is evidence to verify, not ground truth.
- `*/types.ts` is authoritative for public APIs. Implementation and tests conform to it; never undo a user's type edit.
- `CLAUDE.md` governs Claude-specific orchestration only. It cannot weaken this coding contract.
- External delegates, including Cursor Composer and Grok, have no exemption. Their dispatch must restate the non-negotiables, applicable rules, and owned files; their output receives independent review.
- Before working, read in order:
  1. this file;
  2. every applicable file in `.claude/rules/` from the rule map below;
  3. `guides/README.md`, the matching guide/spec, and `ROADMAP.md` when present.
- Rules state **how to write**. Guides/specs state **what to build** and the domain workflow. When they conflict, stop and surface the conflict.

## Project model

```text
src/      published library: core, browser, server, optional styles
app/      application: core, browser, server
tests/    mirrors source; setup*.ts owns shared test infrastructure
configs/  thin target wrappers around root Vite/TypeScript configuration
```

- `core` is host-independent. Browser and server may import core; core imports neither.
- Application surfaces may import library surfaces.
- `tsconfig.json`, `vite.config.ts`, and each `*/types.ts` are their respective sources of truth.
- Use only the surfaces the project needs; do not delete structural files merely because they are empty.

## Non-negotiable rules

- **NEVER** use `any`; accept `unknown` and narrow with guards.
- **NEVER** use non-null assertions (`!`) or type assertions (`as`); narrow or validate.
- **NEVER** use `@ts-nocheck`, `@ts-ignore`, `@ts-expect-error`, or `eslint-disable`; fix the cause.
- **NEVER** add an npm package unless the user explicitly requests it; prefer native APIs.
- **NEVER** remove a symbol to silence lint. Implement it or annotate `// TODO: [Feature] Brief purpose`.
- **NEVER** undo user edits in `*/types.ts`.
- **NEVER** put `readonly` on parameters.
- **NEVER** use TypeScript `private`; use runtime-enforced `#` fields.
- **NEVER** use default exports except where a framework requires them, such as Vue SFCs or config files.
- **ALWAYS** make interface properties and public return collections readonly.
- **ALWAYS** define reusable/public types in `*/types.ts` before implementation.
- **ALWAYS** finish the requested implementation: no empty stubs, deferred logic, or concealed follow-up work.
- **ALWAYS** follow the repository's naming, placement, export, and dependency-direction rules exactly.

## Design laws

- **Types first.** Public contracts precede implementation.
- **Single-word entity APIs.** Properties, methods, option keys, and events use one descriptive word. If one word is insufficient, change the shape: group options, extract a sub-entity/manager, or split behaviors.
- **Self-describing helpers.** Module-scope helpers normally use `{verb}{Noun}` because they lack entity context.
- **One concept, one term.** Do not alternate synonyms; lifecycle verbs have fixed meanings.
- **Boolean behavior.** A binary behavioral switch is a boolean, not a two-literal union.
- **Real domain states only.** Literal unions represent irreducible modes, phases, discriminants, or external values—not decorative labels for already-represented facts.
- **Absence is `undefined`.** Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`. Use `null` only when an external format distinguishes it from omission.
- **Derive state.** Compute facts from existing fields; do not store a second flag or label that can drift.
- **Named discriminants.** Name the axis that varies (`relationship`, `command`, `category`), never `kind` or `type`.
- **Centralize by kind.** Types, constants, helpers, validators, parsers, factories, errors, and similar declarations live in their designated centralized files. Implementation files contain one class plus imports.
- **Export and test reusable logic.** No hidden module helpers or declarations; fold trivial one-use logic into its caller or export it from the correct centralized module and test it.
- **No nested functions.** Extract function declarations/assignments from bodies. Anonymous callbacks passed directly as arguments are the sole exception.
- **Functional core, imperative shell.** Export pure leaves; retain stateful or defining orchestration as class methods. Classes must compose behavior, not forward 1:1 to helpers.
- **Minimal public surface.** Add capability with its real consumer; do not speculate. Prefer one minimal interface and one shared engine, allowing native backend overrides only for genuine faster paths.
- **No compatibility shims.** This is greenfield: update every consumer in the same change.
- **Mechanism, not product policy.** Framework code supplies reusable mechanisms and stops before application decisions.
- **No polling architecture.** Park idle work on events/abort signals; yield long work cooperatively.

## TTTDD: Types Then Tests Driven Development

1. **Types:** define or revise the contract in `*/types.ts`; entity-scoped names must satisfy the naming rules and properties must be readonly.
2. **Implementation:** conform exactly to the types; place every declaration in its prescribed file.
3. **Consolidation:** remove duplication and route repeated behavior through one shared implementation.
4. **Tests:** cover happy paths, edge cases, failures, and boundary values with targeted deterministic tests.
5. **Documentation:** update the matching guide/spec and parity coverage.

If the user changes a type mid-task, treat it as immediately authoritative. Type failures identify implementation that has not caught up.

## Work process

1. **Understand:** clarify scope and entities; read `*/types.ts`, the rule files, and the matching guide before editing.
2. **Design:** change types first and typecheck the proposed contract.
3. **Implement:** match the interface, extract centralized logic, and update the sole barrel.
4. **Consolidate:** remove duplication without expanding the API.
5. **Test:** mirror source structure and run the narrowest relevant project.
6. **Document:** update the guide, examples, and parity contract.
7. **Verify:** run the required gates and read their actual output before claiming success.

Quality gates before commit, in order:

```text
npm run format → npm run lint → npm run check → npm run build → npm test
```

- Use scoped checks/tests during development; do not run the whole suite casually.
- Type error: read the complete diagnostic, compare implementation with `*/types.ts`, fix one cause, and rerun the relevant check.
- Unused contract symbol: stop; implement it or leave the prescribed TODO—never delete it for lint.
- Compound entity member: stop; correct the API shape before implementation. This does not apply to descriptive module helpers.

## Rule map

All files below are normative extensions of this root. Read every rule relevant to the files or concepts you touch; path frontmatter only controls Claude's automatic loading.

| Rule                             | Governs                                                                |
|----------------------------------| ---------------------------------------------------------------------- |
| `.claude/rules/names.md`         | Identifiers, API shape, acronyms, lifecycle vocabulary, files/folders  |
| `.claude/rules/typescript.md`    | TypeScript syntax, imports, immutability, errors, TSDoc                |
| `.claude/rules/architecture.md`  | Centralized files, exports, classes, modules, extension points, stores |
| `.claude/rules/patterns.md`      | Options, managers, emitters, guards, parsers, contracts                |
| `.claude/rules/tests.md`         | Test behavior, helpers, browser tests, Vitest configuration            |
| `.claude/rules/workspace.md`     | Surfaces, aliases, environment isolation, builds, scripts, tooling     |
| `.claude/rules/browser.md`       | Vue/browser architecture and platform usage                            |
| `.claude/rules/styles.md`        | SCSS/CSS centralization, tokens, mixins, layers, naming                |
| `.claude/rules/documentation.md` | Guides, parity, roadmap, showcase, examples                            |

## Documentation contract

- Specs precede code. Read the matching guide, form the intended design, then compare the implementation.
- Public exports and behavioral methods must remain in guide parity; TypeScript, SCSS, Markdown, tests, and showcase must agree.
- Never suppress a parity failure. Correct the drift.

## Communication

- Do the obvious work without asking for ceremonial permission.
- Keep chat summaries short; show exact changes as diffs when useful.
- Never claim a gate passed until you ran it and read the result.
