# Unit absorb-zod — Zod 4.5 method-memoization article and claim verification

## Role and engine

`researcher` on Sonnet, reached as a native Claude subagent. Substitution record: this job belongs
to Cursor Grok first; the Cursor bench reports `Not logged in` (probed 2026-09-01, `cursor-agent
status`), and the Luna step requires the Codex bench, which reports no stored credential (`codex
login status` fails, login pending device approval). The ladder therefore lands on Sonnet.

## Objective

A distilled, source-verified account of the method-memoization pattern the Zod 4.5 release
describes, with every memory claim labeled verified or unverified against a primary source.

## Context

**Evidence.** The user supplied the article URL: `https://zod.dev/blog/reducing-memory-footprint?og`.
The user's summary of the claim: Zod 4.5 reduces schema memory footprint roughly 9x through
"method memoization" — methods lazily bound through prototype getters, auto-bound, consuming no
heap until accessed.

**Law.** `AGENTS.md` (scaffold), `.claude/rules/quality.md` § Evidence before change and
§ Probes before arguments, `.claude/rules/writing.md`. Skill: none. Guide or spec: none.

**Host.** Linux, working path `/home/user/scaffold`, outbound HTTPS through the session proxy
(CA bundle preconfigured). The `WebFetch` and `WebSearch` tools are available and are the route
for every external read. Cross-host redirects come back to the caller; call again with the
redirect URL.

**Measurements.** None taken; this unit produces the measurements' documentary basis, not runtime
measurements.

**Control identifiers.** none.

**Standing conditions.** The article URL carries an `?og` query suffix; if it fails, retry the
bare path `https://zod.dev/blog/reducing-memory-footprint`. Both benches are dark; that is
recorded and is not this unit's problem.

## Unknowns

- The exact Zod pull request, commit, or release tag that landed the pattern. Report the URL and
  title of what you find, or report that it could not be located.
- The measurement methodology behind the headline multiplier (what was measured, on which
  runtime, per schema or per suite). Report what the sources state, and label anything the
  sources do not state as unverified.
- Whether the pattern caches the bound method on the instance after first access, and by what
  mechanism (`Object.defineProperty` on `this`, a `WeakMap`, or another). Report the exact
  mechanism with a source pointer.

## Scope

**Owned.** none — this unit is read-only.

**Shared (report-only).** none.

**Off-limits.** Every file in every repository. No edits, no writes, no repository reads beyond
what the harness supplies in this brief.

**What asserts the state this change ends.** none — no change ships from this unit.

**Tools and limits.** `WebFetch`, `WebSearch`, `Read`, `Grep`, `Glob`. No `Edit`, no `Write`, no
`Bash`. Read-only. Never fetch a credentialed URL.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message, in this shape, no process diary:

- `Question`: one line.
- `Mechanism`: the pattern in exact JavaScript terms — what lives on the prototype, what a getter
  returns, where and how the result is cached, how auto-binding is achieved, how the pattern
  interacts with frozen instances and with destructuring, and what Zod's schemas looked like
  before the change. Precise enough that an implementer could reproduce the pattern in isolation
  without reading the article.
- `Claims`: a list where every claim from the article carries VERIFIED (with the primary-source
  pointer: URL plus section, file, or line) or UNVERIFIED (with what was searched and not found).
  Cover at minimum: the headline memory multiplier, what was measured to produce it, the
  lazy-allocation claim, the auto-binding claim, and any stated tradeoffs or regressions.
- `Resources`: every linked resource the article names, each with one line on what it contains.
- `Prior art`: any earlier library or engine documented as using the same pattern, if the sources
  name one.
- `Unknowns`: unresolved facts, not recommendations.
- `Deviation`: unreachable URLs or blocked fetches, with the exact error.

## Deviation contract

Stop and report only when the article itself cannot be fetched through any route. An individual
unreachable secondary resource is yours to record under `Deviation` and carry on from.

## Acceptance criteria

1. Every claim in `Claims` carries a verdict and a pointer or a search record.
2. `Mechanism` names where the cached value lives after first access, with a source pointer.
3. No recommendation and no design decision appears anywhere in the return.

## Review evidence

This unit is a research distillate: the evidence is the source pointers themselves. No diff and no
status output exist for a read-only unit.
