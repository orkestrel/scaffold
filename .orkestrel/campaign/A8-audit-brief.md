# Audit A8 — falsify unit U8b (`@orkestrel/tool`: the registry owns an emitter)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane and the cross-engine lane (the
  unit was written on GPT-6 Astra) — adjudicate objective defects you can evidence.
- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/tool`):
  OBJECTIVE lane; **your engine wrote this unit** — attack it harder. Do not attempt a test run
  (the read-only sandbox refuses vitest's temp writes); name each vector as `UNRESOLVED` with its
  exact command and expected reading, and read the Orchestrator's gate log named under Already
  established for the readings that exist.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — acceptance criteria,
  conformance to `patterns.md` § Stateful emitters step by step, scope honesty, parity, and the
  export-name probe against the installed `@orkestrel/test` and `@orkestrel/contract`.

Each lane performs the audit directly and spawns nothing; blind; no hedging. `CONFIRMED` names
the failed attack; undecidable is `UNRESOLVED`; writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `tool` checkout at checkpoint `8f2ad5d` plus the U8a manifest change (`@orkestrel/emitter
^0.0.10` declared and installed by the Orchestrator) and the uncommitted working tree written by
U8b (GPT-6 Astra `sol`; brief `U8-tool-emitter-brief.md` with successor `U8b-tool-emitter-brief.md`;
U8 stopped on the interface-versus-type-alias contradiction, `U8-tool-emitter-astra-deviation.md`).
The writer's report is `.orkestrel/campaign/U8b-tool-emitter-report.md`. Assume the unit has one
more defect.

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A8-diff.patch` (also at
`C:/Users/mikes/WebstormProjects/tool/tmp/codex/A8-diff.patch`): `git diff`, untracked files'
full text, `git status --porcelain`.

**Design record and law:** `.orkestrel/campaign/plan.md` R4 and Re-baseline 2 ruling 1;
`D1-design-planner.md` § 4 first bullet; scaffold `.claude/rules/patterns.md` § Stateful emitters
(the seven steps; `on` reserved for hooks; never inherit; emit directly; `destroy` last) and
§ General; `scaffold/guides/emitter.md` (`EventMap` is a type alias; `emit` after `destroy` does
nothing; listener isolation; `EmitterHooks`, `EmitterErrorHandler`); `.claude/rules/{names,typescript,architecture,tests,documentation,writing,quality}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md`. Installed primitives the unit must have reused:
`@orkestrel/test` 0.0.14 (`createRecorders`, `createRecorder`, `requireValue`, the wait family)
and `@orkestrel/contract` 0.0.17.

## What this round decides

Whether the tool registry's emitter is accepted, whether the tool tarball is repacked and
installed into agent, mcp, and ollama on it, and whether mcp's U4d (server `list_changed` push
and live bridge publishing) builds on it.

## Already established — do not re-run

The Orchestrator's gate run after U8b is at `U8b-tool-gates-orchestrator.log.txt`; the
export-name probe reading is at `P5c-collide-after-u8b.log.txt`.

## Numbered falsifiable claims

1. **The pattern is followed step by step.** `ToolManagerEventMap` is a type alias; `ToolManagerOptions
   { on?, error? }`; `ToolManagerInterface.emitter: EmitterInterface<ToolManagerEventMap>`;
   `ToolManager` stores `readonly #emitter` and exposes `get emitter()`; constructed with
   `new Emitter({ on, error })`; emits directly; no inheritance, no delegation boilerplate, no
   `#notify`; `destroy()` calls `this.#emitter.destroy()` last. Falsify with `file:line`.
2. **Every registry change is published exactly once, in order.** `add(tool)` → one `add` after
   the map holds it; `add(tools)` → one `add` per tool in array order; `add` of a registered
   name → `remove(old)` then `add(new)`; `remove(name)` → `remove` and `true`, missing → nothing
   and `false`; `remove(names)` → one `remove` per removed name in order; `clear()` → one `clear`
   carrying the removed tools in registration order (empty array on an empty registry). Falsify
   with an input or interleaving that emits twice, emits out of order, emits before the map
   changed, or emits with the wrong instance.
3. **`destroy` ends the registry.** It empties the map (emitting `clear`), destroys the emitter
   last, and a later `add` reaches no listener (the emitter guide's after-destroy contract);
   `destroy` twice is safe. Falsify with a listener reached after `destroy` or a second-destroy
   throw.
4. **Hooks and isolation.** `createToolManager({ on })` delivers to the initial listeners; a
   throwing listener does not stop a sibling and `error` receives the throw. Falsify with a
   sibling that is skipped.
5. **`execute` is untouched.** No event fires on execution; the U1 contract (`ToolContext`,
   `ToolCall`, validation, `ToolError`) is byte-unchanged in `Tool.ts`, `errors.ts`, `helpers.ts`,
   `validators.ts`. Falsify with `file:line`.
6. **The guide is true and in parity.** `## Surface` rows for the new declarations equal their
   doc-block paragraphs; the `ToolManagerInterface` `## Methods` table lists `destroy`; the
   `Observe registry changes` fence is executed by `tests/guides.test.ts` with a byte-equal
   transcription and its asserted values are what the code returns; `## Tests` names the new
   proofs. Falsify with a sentence the code contradicts or a fence value the run does not produce.
7. **Nothing re-implements an installed export.** Recording uses `createRecorders` from
   `@orkestrel/test`; no local recorder, deferred, poll, or guard whose job an installed export
   does; the probe reading is clean. Falsify with the export and its signature.
8. **Nothing else moved.** Only owned files changed beyond the U8a manifest and lockfile; no
   version bump; no vendored file; `README.md` pitch unchanged. Falsify with `file:line`.
9. **Rules and tests.** No `any`/`as`/`!`, no suppression, no nested function, no mocks; tests
   named for what they prove; every new test was red before its implementation per the report's
   recorded commands (report-only evidence is `UNRESOLVED`; name the mutation that would leave the
   three weakest new tests green).
10. **Coherent as tool 0.0.15 for mcp's `list_changed` push and the bridge's live publish to
    build on.** Would you ship it?

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line. For the
analyst lane, the report is the final message.
