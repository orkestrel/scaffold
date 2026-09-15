# Audit A6 — falsify unit U6b (`@orkestrel/ollama` adoption of the tool and agent contracts)

## Role and lane

Two blind lanes; state which you hold in your first line. The unit is a fully specified adoption
written by `builder` (Sonnet), so both lanes are cross-engine.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane, adjudicating objective
  defects you can evidence.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane.

Perform the audit directly; spawn nothing; blind; no hedging. `CONFIRMED` names the failed attack;
undecidable is `UNRESOLVED`; writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `ollama` checkout at `main` (`3f8ceae`, clean) plus the uncommitted tree written by U6b
(after U6 stopped on a clobbered install). Evidence:
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A6-diff.patch` (`git diff`, `git status
--porcelain`). Brief: `tmp/units/U6-ollama-adoption-brief.md`; report: the U6b notification
retained as `.orkestrel/campaign/U6-ollama-adoption-report.md`. Installed contracts:
`node_modules/@orkestrel/tool` (U1c tarball, `ToolContext` count 8) and `node_modules/@orkestrel/agent`
(U2b tarball). Law: scaffold `AGENTS.md`, `.claude/rules/{tests,typescript,names,documentation}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md`.

## What this round decides

Whether ollama's adoption is accepted and ollama bumps with the campaign (its own published
surface is unchanged unless the rebuilt `dist/` differs, which the Orchestrator measures).

## Already established

Verified by the Orchestrator: the pre-unit typecheck reddened exactly fifteen call sites in
`tests/setup.test.ts` and nothing in `src/**` (`M1-consumer-typecheck.md`); both guide mirrors are
byte copies (the Orchestrator's `cmp` is in flight with the gate run).

## Numbered falsifiable claims

1. **Every second-argument handler use in this checkout was examined by reading, and none treats
   a `ToolContext` as a caller value.** Falsify with a handler in `src/**`, `tests/**`, or
   `guides/ollama.md` whose second parameter is read as the caller.
2. **`extractTools` builds `{ id, name, arguments }` and sets no `caller`; the provider's wire
   `tools` projection forwards `description` and `parameters` and drops nothing the agent
   advertises that Ollama accepts.** With `title` and `annotations` now on `ToolDefinition`, state
   whether Ollama's `/api/chat` `tools` field can carry them (read `src/core/OllamaProvider.ts`
   `body()` and the guide) and whether the projection's silence about them is documented.
   Falsify with a field the provider drops without a stated reason.
3. **The fifteen migrated call sites pass a context the tests actually need.** The shared
   `CONTEXT` constant carries a never-aborted signal; no test in `tests/setup.test.ts` asserts
   cancellation through it, so the constant is a compile-time migration, not a behavioural claim.
   State whether any of those tests SHOULD have become a cancellation proof (a fixture whose
   handler could observe a signal) and was left as a signature migration. Falsify with a fixture
   whose behaviour the migration changed.
4. **Nothing else moved.** Only `tests/setup.test.ts`, `guides/tool.md`, `guides/agent.md`
   changed; no manifest or lockfile; both mirrors are byte-identical to their upstream checkouts.
5. **The ollama guide is still true.** No sentence in `guides/ollama.md` describes a tool handler
   signature, a `ToolCall.caller`, or an agent placement that the landed contracts contradict.
   Falsify with the sentence.
6. **Coherent for the campaign release.** Would you ship ollama re-pinned to the campaign's tool
   and agent releases with this tree?

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line.
