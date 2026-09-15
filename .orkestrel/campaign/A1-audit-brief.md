# Audit A1 — falsify unit U1b (`@orkestrel/tool` execution context, contract validation, advertising vocabulary)

## Role and lane

This one brief goes, unchanged, to three blind lanes. State which you hold in your first line.

- `reviewer` on Opus 5 (native subagent; Read, Grep, Glob): the SUBJECTIVE lane by default —
  design fit, vocabulary, guide voice, coherence — AND, because this is the cross-engine lane for
  a unit written on GPT-6 Astra, adjudicate any objective defect you can evidence from the diff and
  the source rather than referring it.
- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects/tool`): the OBJECTIVE lane. **Your engine wrote this unit.**
  Attack it harder than you would a stranger's work; a clean pass on your own engine's output is
  the least valuable result you can return. You cannot write a probe here: name every vector you
  would run as `UNRESOLVED` with the exact command and the expected reading, and the Orchestrator
  runs it.
- `checker` on Sonnet (native subagent; Read, Grep, Glob): the mechanical lane — acceptance
  criteria met or not met with `file:line` evidence, letter-of-the-law conformance, scope honesty,
  guide parity.

Each lane performs the audit directly and spawns nothing. Do not see, guess at, or reconcile
another lane's answer. Do not hedge toward an imagined consensus. `CONFIRMED` requires naming the
attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED` — say what
would settle it. A claim whose only evidence is the writer's report is `UNRESOLVED`.

## Subject

The `tool` checkout (`C:/Users/mikes/WebstormProjects/tool`) at `main` (`17bba1c`, clean before
the unit) plus the uncommitted working tree written by unit U1b (GPT-6 Astra, thread
`01a0a364-721c-7832-aaa8-752f708b0d11`). Chain: U1 stopped before editing on a brief defect (no
edits); U1b is the first and only round that wrote.

**Review evidence (the actual diff and status):**
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A1-diff.patch` (also at
`C:/Users/mikes/WebstormProjects/tool/tmp/codex/A1-diff.patch` for the exec): `git diff` of the
13 modified files, the full text of the untracked `src/core/errors.ts`, and `git status
--porcelain`. Read the working tree itself for context; the diff is the subject.

**The unit's brief and report:**
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U1b-tool-contract-brief.md` (the contract it
was told to land, exact) and
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U1-tool-contract-report.md` (the
writer's report; its gate readings are the writer's own and establish nothing here).

**Design record:** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md`
(rulings R1–R4, exit criteria X1–X3), `D1-design-planner.md` § 1, `D1b-design-astra.md`
§ Constraints 1.

**Law:** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold's
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`
(`quality.md` § Falsification governs your conduct); the skill
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` fixes the
verdict shape and its single terminal line. The installed contract declarations are at
`C:/Users/mikes/WebstormProjects/tool/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`
(`compileSchema` 979; `ContractInterface` 1376–1422; `createContract` 1505; `Fault` union near
1700–1746; `schemaToParameters` 5831).

## What this round decides

Whether the tool contract is accepted as written, packed, and installed into `agent`, `mcp`, and
`ollama` for their adoption units, and whether `tool` bumps and publishes on it. A finding here
costs a fix unit; a defect found after publication costs a version number and every consumer's
re-pin. A finding is worth more than a clean pass.

## Already established — do not re-run

Verified by the Orchestrator directly, 2026-09-15: the new members exist at
`src/core/types.ts:4` (`ToolContext`), `:12` (`ToolAnnotations`), `:22` (`ToolErrorCode`), `:123`
(`ToolInterface.execute(args, context: ToolContext)`), `:148` (`contract?: ContractShape`), `:216`
and `:224` (the manager's two overloads with `context?: ToolContext`); `src/core/errors.ts` declares
`ToolError extends Error` with `readonly code`, optional `readonly context`, and `name =
'ToolError'`; the tree's status is exactly the 13 modified files plus the untracked `errors.ts`;
no off-limits file changed. The Orchestrator's own gate run is in progress and is not evidence for
this round.

## Numbered falsifiable claims

1. **Every handler invocation receives a context with a live `AbortSignal`.** Through
   `Tool.execute` directly (required parameter), through `ToolManager.execute(call)` with no
   context (a minted, non-aborted signal), and through a batch (one shared context object,
   identical by reference for every call). Falsify with an input, state, or interleaving where a
   handler runs without a context or with a different context than its batch siblings.
2. **An already-aborted signal never enters a handler, and the check is per call.** For a batch
   whose signal aborts while an earlier call is running, later calls are refused with a
   `ToolFailure` naming the reason and their handlers are never entered; the refused result keeps
   its `id` and `name`. Falsify by finding an interleaving where a handler runs after the abort.
3. **`ToolCall` is plain JSON and nothing reads `caller` from it.** No code under `src/` reads
   `call.caller`; `isToolCall` accepts a record with extra keys without reading them (a hostile
   accessor on an extra key is never triggered). Falsify by finding a read.
4. **Contract-derived `parameters` are correct and derived once.** With `contract`,
   `tool.parameters` equals `schemaToParameters(createContract(shape).schema)`; it is computed at
   construction, not per read; a shape whose projection is `undefined` leaves `parameters`
   `undefined`; giving both `contract` and `parameters` throws `ToolError` code `SCHEMA` before the
   instance exists. Falsify with a shape where the derivation differs or is recomputed.
5. **Validation precedes the handler and its failure is contained correctly.** With `contract`,
   `explain(args)` runs before the handler; a fault throws `ToolError` code `ARGUMENTS` from
   `Tool.execute` (direct callers see the throw) and `ToolManager.execute` contains it as a
   `ToolFailure` whose `error` names the first fault's path and reason (plus `expected`/`received`
   only when that arm carries them) and whose message never reads a member the arm lacks; the
   handler is never entered on a fault. Falsify with a fault arm (`type`, `missing`, `constraint`,
   `variant`, `oneOf`) that produces a wrong or crashing message, or an input that reaches the
   handler despite a fault.
6. **The coercion gap is either closed or stated.** The report says `explain` uses parse
   (coercion) semantics and the handler receives the ORIGINAL arguments unchanged. Then an argument
   the contract accepts only by coercion (for example a numeric string for a number member, if the
   installed `explain` coerces) reaches the handler in its un-coerced form while the advertised
   `parameters` promised the coerced type. Decide: is this reachable with the installed contract
   (find a shape and input where `explain` reports no fault yet the raw value's type differs from
   the schema's), and if so, does the guide state it? A reachable, unstated gap is `BROKEN`; a
   stated gap or an unreachable one is `CONFIRMED` with the vector you tried.
7. **Advertising projection is exact.** `toolToDefinition` forwards `name`, `title`,
   `annotations`, substitutes `summary` for `description`, forwards `parameters`, and never
   forwards `execute`, `contract`, or `summary` itself; a definition is a fresh object (no shared
   mutable reference to the tool's `annotations` record leaks — or, if it does, the guide states
   the record is the tool's own and readonly). Falsify by mutation or by an extra member.
8. **Every pre-existing behaviour is unchanged.** Missing tool → `ToolFailure` `tool not found:
   <name>`; a thrown handler → contained message, `Unknown thrown value` for a non-stringifiable
   throw; batch results in input order; `add` overwrites by name without changing position;
   `remove` batch returns `true` only when every name was present; `clear`; `count`. Falsify by a
   diff hunk that changes any of these or a test that was weakened rather than migrated.
9. **The types and names obey the rules.** One-word members; booleans as assertions (`pure`,
   `untrusted`, `consequential`); `ToolErrorCode` a real domain state; `{Entity}Context` and
   `{Entity}Annotations` forms; `readonly` on every interface member and public collection; no
   `any`, no `as` (other than `as const` on a literal), no `!`, no nested function declarations,
   no module-scope declarations in the two class files, `errors.ts` holding only the error class,
   `validators.ts` only guards, `helpers.ts` only pure helpers; TSDoc on every public export with a
   third-person `-s` opening verb. Falsify with `file:line`.
10. **The tests prove what they name and use real implementations.** No mock, spy, fake clock, or
    module replacement; abort timing uses `waitForDelay` from `@orkestrel/test`, never an inline
    timeout; the derived-`parameters` test compares against the installed projection computed in
    the test, never against the tool's own derivation; every new test would fail for the defect it
    names (pick the three you think are weakest and show what change would leave each green).
11. **The guide is true, not merely present.** Every fence's comments state what the code returns
    and the transcription in `tests/guides.test.ts` executes exactly that; the Methods tables match
    the interfaces member for member; the tagline and README pitch agree; the guide states the
    coercion behaviour (claim 6), the pre-abort refusal, the batch-shared context, and the
    `summary`/`description` substitution. Falsify with a sentence the code contradicts or a member
    a table omits.
12. **The package is coherent as tool 0.0.15 and adoptable by its consumers.** A consumer whose
    tools were written as `execute(args, caller?: unknown)` compiles against the new declaration
    only if its handler's second parameter type admits `ToolContext` — state whether an old handler
    typed `(args, caller?: unknown)` compiles unchanged (it does, `unknown` admits the object) and
    therefore silently receives a `ToolContext` as its "caller". Is this migration hazard named
    anywhere a consumer will read it (guide, TSDoc, or the report)? Unnamed is `BROKEN` for this
    claim; named is `CONFIRMED`. Would you ship it?

## Unknowns

- The Orchestrator's gate run (`format:check`, `lint:check`, `check`, `test`) is in flight; if
  your lane can execute, run the scoped `npm.cmd run test:src:core` (analyst: only if the read-only
  sandbox permits; otherwise `UNRESOLVED` with the command).
- Whether the installed `explain` coerces at all (claim 6): read the `ContractInterface` TSDoc at
  `index.d.ts:1380–1422` and the shape builders; report the reading.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts one per claim in order
(`CONFIRMED` with the failed attack, `BROKEN` with the exact input/state/interleaving and the
smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` where a capture is
missing); findings outside the claims, each to the `BROKEN` standard; attacked-and-held; one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`.
No process diary.

For the analyst lane: the report is your final message (read from `--output-last-message`).
