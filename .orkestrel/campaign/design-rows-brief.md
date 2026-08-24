# Unit DESIGN-ROWS — design the campaign that closes the open non-supervisor ROADMAP rows

## Role and engine

Two blind lanes on this one brief: `planner` on Claude Opus 5 (native subagent, subjective lane)
and `analyst` on GPT-5.6 Sol (journaled codex CLI, objective lane). Each lane answers alone and
sees nothing of the other.

## Objective

Propose the campaign design: per-question rulings, the unit decomposition with dependencies,
ownership, serial and parallel order, acceptance criteria, and risks.

## Context

**Evidence.** Read, in order:
1. `/home/user/scaffold/ROADMAP.md` § 1 — the rows. Supervisor rows are OUT of scope. The probe
   mintty row's trigger (a Windows campaign) has not fired on this Linux host; propose only its
   disposition wording.
2. `/home/user/scaffold/tmp/cursor/absorb-rows.log` — the measured sites for every row
   (`file:line` evidence, taken 2026-08-24).
3. `/home/user/scaffold/tmp/units/cascade-map.md` — the runtime-dependency cascades and the
   published `files` surfaces (none of the six packages ships `guides/` or `tests/`).

**Law.** `AGENTS.md`; `.claude/rules/tests.md`, `workspace.md`, `architecture.md`, `names.md`,
`typescript.md`, `patterns.md`, `quality.md`, `documentation.md`, `writing.md`;
`.agents/orchestration.md`. Skills the campaign will bind: `orkestrel-harden-package` for
package-hardening units, `orkestrel-falsify` for audit rounds, `orkestrel-publish` for the
closing release. Guides: each package's own guide under its repository's `guides/`.

**Host.** POSIX bash, repositories at `/home/user/orkestrel/<name>` and `/home/user/scaffold`,
all committed clean on `main`. Analyst lane: read-only sandbox, no network.

**Measurements.** All in the two evidence files; take any further reading you need directly from
the trees.

**Control identifiers.** none.

**Standing conditions.** none — every tree is green at HEAD.

## Unknowns

The rulings themselves. Answer the following numbered questions; each answer is a proposal the
Orchestrator reconciles, never a decision.

1. **mcp backpressure.** For `StdioServerTransport.send` (site and transport-family map in the
   absorption log § 4): rule on backpressure and error surfacing for a caller-owned output
   stream — what the contract promises, what `send` does with the write's boolean, drain
   handling, an `error` subscription's lifecycle, and whether the sibling transports' behavior
   moves too or stays ruled-consistent as-is. Name the executed pins that hold the ruling and
   whether `dist/src` moves (it obliges an mcp release and a probe re-pin).
2. **brief constants.** The `Interpretation` member-name literal (absorption § 5): the
   constant's name under the naming rules, its declaration shape (including whether a
   compile-time completeness pin against `keyof Interpretation` is right, given `Interpretation`
   lives in `@orkestrel/interpret`), consumer rewiring, and the tests that pin it. `dist/src`
   moves; brief has zero runtime dependents.
3. **process assertions.** Strengthen the weak negative assertion (absorption § 6) to assert the
   spawn happened; propose the exact mechanism. And rule on the spawning-proof placement row:
   which proof moves where under the workspace project rules, given the package's whole subject
   is spawning and its `src:server` include collects the spawn-heavy family.
4. **html entities.** The membership-strength question (absorption § 7): does size plus spot
   membership prove the reviewed set? Propose the mechanism that closes it — and whether it
   changes `src` (a `dist/src` move cascades to markdown, browser, and guide) or tests only.
5. **setup proofs.** The proof shape for a root `tests/setup.ts` module: what a setup proof
   asserts for a package whose setup exports helpers (per `.claude/rules/tests.md` § Shared test
   infrastructure and § Cross-cutting proofs), the smallest honest proof for a module exporting
   one path helper, and the ruling for `queue` whose `tests/setup.ts` exports nothing. Also:
   given registration is baked from the proof file's presence (absorption § 1), confirm the
   per-target visit order (write proof → `scaffold repair` → gates) and propose the fleet wave's
   shape over the reported packages (absorption § 2), including slicing and what each visit
   commits. html and middleware ride this same shape with their own rows.
6. **test guide fences.** The transcription campaign for the residue headings (absorption § 9):
   how many units, which fences execute in `tests/guides.test.ts` directly versus which take
   browser or server carriers with marker lines, what the presence guard asserts, and the
   `below` → `later` fix. Bound each unit so one writer owns one repository at a time.
7. **guides-cache ruling.** The planned `test:guides` carries `--no-cache` with every other
   planned `test:*` script; every fleet target declares it without (absorption § 10). Rule which
   side owns the value and name the landing (a scaffold `src` edit, or a fleet-wide script
   adoption, and when each would ship).
8. **Release tail.** Given the cascade map: propose the closing release wave — which packages
   bump (scaffold's pending 0.0.52 release is already obliged), the layer order, and where the
   user's approval gates it. The `orkestrel-publish` skill owns the mechanics; you own only the
   wave's membership and order.
9. **Recorded, not rescoped.** The absorption surfaced `isBrowserVuePath` duplicated across many
   `tests/setup.ts` modules while `@orkestrel/test` owns fleet-repeated helpers. Propose the
   disposition: in-scope for a named row, or recorded for the next matrix — and defend it
   against the rescope rule in `.claude/rules/quality.md`.

## Scope

Read-only. Owned: nothing. Off-limits: every write. Tools: read, grep, glob (analyst: plus its
sandboxed shell, read-only).

## Execution

**Planner lane (native subagent):** perform the assignment directly and spawn nothing.

**Analyst lane (bench engine reading this brief inside its own CLI):** perform the assignment
directly and spawn nothing.

## Output

Per numbered question: the proposal with its reasoning compressed to what changes a decision,
plus, at the end: a unit list (name, subject, owned repository, dependency edges, suggested
role), the campaign's risks ranked, and anything the questions missed that the exit criterion
already requires. Deliver as your final message (planner) or final printed answer (analyst).

## Deviation contract

none — read-only proposal work; answer every question or name it unanswerable with the reason.

## Acceptance criteria

1. Every numbered question answered with a concrete proposal.
2. Every proposal cites the evidence line or rule it rests on.

## Review evidence

none — proposals; the Orchestrator reconciles both lanes.
