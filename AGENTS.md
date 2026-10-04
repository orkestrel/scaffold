# AGENTS.md

> TypeScript · types-first · zero unsolicited dependencies · single-word public APIs.
> The coding contract for every agent and harness in this project.

## Authority and loading

- The user's current instruction wins. Then this file and the rule files it maps. Existing code is evidence to verify, never authority.
- `*/types.ts` is authoritative for public APIs. Never undo a user's type edit.
- `.agents/orchestration.md` governs agent operation and cannot weaken this file. Harness bridges (`.claude/AGENTS.md`, `.codex/config.toml`, `.cursor/rules/orchestration.mdc`) add harness mechanics only.
- A skill under `.agents/skills/` is a procedure. Follow it when the user or a dispatch names it, or when its trigger fires. A skill cannot weaken this file or a rule.
- Before editing, read: this file; each rule the Rule map scopes to the paths you touch; the named skill and the references it names; the matching guide under `guides/` and `ROADMAP.md` when present. Read nothing else up front.
- Rules state how to write. Guides state what to build. On conflict, stop and report the conflict.
- A rule file's stated exception to a law in this file applies.

## Project model

```text
src/      published library: core, browser, server, optional styles, extension faces
app/      application: core, browser, server, extension faces
tests/    mirrors source; setup*.ts owns shared test infrastructure
configs/  thin target wrappers around root Vite/TypeScript configuration
```

- `core` is host-independent. Browser and server may import core; core imports neither; browser and server never import each other.
- `app/core` is host-independent. `app/server` may import `app/core`, `src/core`, and `src/server`, never browser code. `app/browser` may import `app/core`, `src/core`, and `src/browser`, and reaches server behavior through shared contracts and transports only.
- The browser surface is `src/browser`, `app/browser`, the journey, and the showcase; the styles surface is `src/styles` and its themes. An extension adds a face to a surface: the `vue` browser extension adds `src/vue` and `app/vue`, and a named styles extension adds `src/<name>`.
- `src/vue` and each `src/<name>` may import `src/core` and `src/browser`. `app/vue` may import what `app/browser` may import, plus `app/browser` and `src/vue`. No extension face imports server code or another extension's face, with one exception: a styles extension that builds another styles extension's recreation for a utility library (`src/tailwindcss` building Bootstrap for Tailwind) may `@use` that extension's Sass partials, configured through their `_tokens.scss` switches, and imports none of its TypeScript.
- Published source never imports private app code.
- Enforce boundaries with the toolchain (Oxlint import restrictions, scoped TypeScript projects, Vite graphs). Add no second parser for TypeScript, Oxlint, Vue, HTML, CSS, or Vite.
- `tsconfig.json`, `vite.config.ts`, and each `*/types.ts` are their sources of truth. Keep structural files even when empty.

## Non-negotiable rules

- **NEVER** use `any`; accept `unknown` and narrow with guards.
- **NEVER** use non-null assertions (`!`) or type assertions (`as`); narrow or validate.
- **NEVER** use `@ts-nocheck`, `@ts-ignore`, `@ts-expect-error`, a lint-disable directive, or a formatter-ignore directive, and never exclude a source file from a gate; fix the cause.
- **NEVER** add an npm package unless the user explicitly requests it; prefer native APIs.
- **NEVER** remove a symbol to silence lint. Implement it or annotate `// TODO: [Feature] Brief purpose`.
- **NEVER** write `public`, `protected`, `private`, or a parameter property; use `#` fields.
- **NEVER** use default exports except where a framework requires them.
- **NEVER** use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior. Use real implementations, recorders, temporary resources, protocol-faithful fixture servers, and inert data stubs.
- **ALWAYS** make interface properties and public return collections readonly.
- **ALWAYS** define reusable and public types in `*/types.ts` before implementation.
- **ALWAYS** inspect the declared and installed `@orkestrel/*` capabilities before writing overlapping logic. Reuse a primitive whose semantics match; never wrap one to rename it.
- **ALWAYS** finish the requested implementation: no stubs, deferred logic, or hidden follow-up.
- **ALWAYS** write a script as TypeScript run by Node (`node path/to/script.ts`, type stripping, `node:` modules only): a skill script, a probe, a launcher, an instrument, a one-off tool. Never write a bash, PowerShell, or Python script. The Claude Code Cloud hooks under `scripts/` are the one bash exception, and that folder holds nothing else.

## Design laws

- **Types first.** Public contracts precede implementation.
- **Single-word entity APIs.** Properties, methods, option keys, and events use one word. When one word cannot carry it, change the shape: group options, extract a sub-entity, or split behaviors.
- **Self-describing helpers.** Module-scope helpers use `{verb}{Noun}`.
- **One concept, one term.** Lifecycle verbs have fixed meanings.
- **Boolean behavior.** A binary behavioral switch is a boolean.
- **Real domain states only.** A literal union names an irreducible mode, phase, discriminant, or external value.
- **Absence is `undefined`.** No sentinels. Use `null` only where an external format distinguishes it from omission.
- **Derive state.** Compute facts from existing fields; never store a second flag or label that can drift.
- **Named discriminants.** Name the axis (`relationship`, `command`, `category`), never `kind` or `type`.
- **Centralize by kind.** Types, constants, helpers, validators, parsers, factories, and errors live in their kind file. An implementation file holds one class plus imports.
- **Export and test reusable logic.** Fold a trivial one-use helper into its caller or export it from its kind file and test it.
- **No nested functions**, except a callback passed as an argument or returned as the result; `.claude/rules/architecture.md` § Functions and orchestration bounds the literal positions it climbs.
- **Functional core, imperative shell.** Pure exported leaves; stateful orchestration as class methods. A method never forwards 1:1 to a helper.
- **No superfluous wrappers.** A wrapper adds a boundary, invariant, composition, translation, lifecycle, or materially narrower contract, or it goes.
- **Minimal public API.** Create or substantively expand a capability with its first real consumer; this gate applies at creation, never later. Expose an existing reusable capability through its environment barrel regardless of consumer count. Remove a symbol only when the capability itself must not exist. Prefer one minimal interface and one shared engine, with a native backend override only for a faster path.
- **No compatibility shims.** Update every consumer in the same change.
- **Mechanism, not product policy.** Framework code stops before application decisions.
- **No polling architecture.** Park idle work on events and abort signals. Yield long work cooperatively.

## Work loop

Size the change before touching a file. Take the largest row whose trigger applies: large, then medium, then small. Run only what the row names.

| Size   | Trigger                                                                                                                                                                                                 | Do                                                                                                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| small  | one behavior in one package, no public type change, none of the medium triggers                                                                                                                         | edit, prove or test the claim, run the touched test file, stop                                                                                                                                               |
| medium | a public type or contract change; a capability added or substantively expanded; a defect whose cause is unknown; any change to security, destructive paths, concurrency, a protocol, or untrusted input | types first; one design opinion only when the shape is open; implement; prove; file then project tests; one review pass on the contract and the risky seams by a reviewer who did not write it; scoped gates |
| large  | work across packages; an added independently owned domain; a stated campaign                                                                                                                            | `.agents/orchestration.md` § Campaign                                                                                                                                                                        |

A repair inside an existing file is never large by itself. A private retry, cache, or helper with no public type change is small unless a medium trigger names it.

Within the size, in order:

1. **Types.** Write or revise the contract in `*/types.ts`. Typecheck it.
2. **Prove.** Select the instrument per `.claude/rules/quality.md` § Instruments: a `prove` claim (edit, test, breaking edit, breaking stage) for a TypeScript claim, otherwise the smallest test or probe. Quote a `prove` closing line where the claim is reported. After two failed attempts to form a claim, write the test and continue.
3. **Implement.** Conform to the types. Place each declaration in its kind file. Update the barrel.
4. **Test.** Cover happy paths, edge cases, failures, and boundaries with deterministic tests against real implementations. For a defect, record the failing command and count before the fix and the same command green after.
5. **Consolidate.** Remove duplication, nested functions, and superfluous wrappers without widening the API.
6. **Document.** Update the matching guide and parity. Prose comes last and stays short.

Test ladder, narrowest first; stop at the boundary the change size names:

1. The instrument selected in Prove.
2. The touched file: `npx vitest run --config vite.config.ts --project <project> <file>`, or `npm run test:guides` for a guide proof.
3. The touched project: `npm run test:<project>`, plus the `check:` script for that project where `package.json` declares one.
4. Tree-wide gates, once, by `verifier`: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`.

- Run the mutating `npm run lint` then `npm run format` only to converge before the non-mutating gates.
- A writing unit stops at the project boundary and reports the commands it ran. `verifier` runs the tree-wide gates when dispatched for them and edits no source.
- Never claim a gate passed without running it and reading its output bare, with no `| tail` or `| grep` behind it.
- On a type error: read the whole diagnostic, compare with `*/types.ts`, fix one cause, rerun the scoped check.
- Unused contract symbol: implement it or leave the prescribed TODO. Never delete it for lint.
- Scope closed and gates green: stop. Another pass over the same surface needs an instruction from the user.

## Rule map

Each row is a normative extension of this file. Its `paths` frontmatter controls automatic loading; read the row when its subject matches your change.

| Rule                             | Governs                                                                |
| -------------------------------- | ---------------------------------------------------------------------- |
| `.claude/rules/names.md`         | Identifiers, API shape, acronyms, lifecycle vocabulary, files/folders  |
| `.claude/rules/typescript.md`    | TypeScript syntax, imports, immutability, errors, TSDoc                |
| `.claude/rules/architecture.md`  | Centralized files, exports, classes, modules, extension points, stores |
| `.claude/rules/patterns.md`      | Options, managers, emitters, guards, parsers, contracts                |
| `.claude/rules/tests.md`         | Test behavior, helpers, probes, browser tests, Vitest configuration    |
| `.claude/rules/workspace.md`     | Src/app environments, aliases, isolation, builds, scripts, tooling     |
| `.claude/rules/application.md`   | App composition, entries, manifest safety, lifecycle, integration      |
| `.claude/rules/browser.md`       | Vue/browser architecture and platform usage                            |
| `.claude/rules/styles.md`        | SCSS/CSS centralization, tokens, mixins, layers, naming                |
| `.claude/rules/portability.md`   | Host branching, paths, line endings, processes, terminals, OS claims   |
| `.claude/rules/documentation.md` | Guides, parity, roadmap, showcase, examples, skill files               |
| `.claude/rules/writing.md`       | Prose in guides, replies, commits, and instruction files               |
| `.claude/rules/quality.md`       | Evidence, probes, instruments, research, completion                    |

## Writing

- Lead with the decision or the finding. One idea per sentence. Imperative for instructions.
- Write plainly: no metaphor, aphorism, flourish, or persuasion.
- Never state a count of an open set and never name a list item by its position. Name the members.
- Write a number only as a duration, size, limit, version, date, exit code, or measurement with its run.
- Keep chat summaries short; show exact changes as diffs when useful.
- `.claude/rules/writing.md` owns the substitution table, the developer-prose rules, and the instruction-file rules.
