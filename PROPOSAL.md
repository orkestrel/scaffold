# Proposal — the blueprint advisor

**Status:** proposed · **Surface:** bin only · **Core impact:** none

## Motivation

`scaffold new` collects a blueprint through direct prompts: the caller names the
package, picks surfaces from the closed set, and lists dependencies. That flow is
exact but unassisted — it deduces nothing. The advisor adds the missing layer: from
partial or fuzzy input ("a CLI that talks to the registry", a bare dependency list, a
half-filled flag set), recommend a complete blueprint — surfaces, peers, config —
with a user-readable trace of WHY each recommendation was made, confirmed
interactively before anything compiles. Deduction with explanation is a different
kind of problem from the compiler's closed-vocabulary validation, and it deserves a
purpose-built engine rather than a pile of if/else.

## Design

The flow, end to end:

1. **Collect** — the `new` verb accepts free/partial input alongside the existing
   flags: a description string, a dependency list, any subset of surfaces.
2. **Normalize (native)** — tokenize and fuzzy-map the input onto the closed
   vocabularies (the three surfaces, the `@orkestrel/*` dependency catalog) with
   Dice-coefficient / alias matching modeled on `@orkestrel/interpret`'s string
   algorithms, inlined — a few lines, not a dependency. The output is a plain
   "needs" record: what the caller seems to want.
3. **Qualify (`@orkestrel/qualifier`)** — an advisor `QualificationDefinition`,
   authored as data (not code), rules each candidate surface and peer through
   ordered passes: `restriction` excludes, `condition` includes, `referral` routes
   genuinely ambiguous calls to a human question. `@orkestrel/reason` powers the
   passes as qualifier's injected engine — never a direct scaffold dependency. The
   `QualificationResult` carries per-scope verdicts (which surfaces/peers are in,
   out, or referred) and evidence-rich `findings` whose `message` fields ARE the
   why-trace, rendered to the caller verbatim.
4. **Confirm (`@orkestrel/terminal`)** — every recommendation is a suggestion, never
   a decision: checkboxes pre-checked per the verdicts, referrals asked as explicit
   questions. The caller can override anything.
5. **Compile (existing, unchanged)** — the confirmed selections feed `blueprint()`
   and `createCompiler().compile()` exactly as today; the fail-closed gate stays the
   sole authority on validity.

## Composition — what earns a place and what does not

| Package                                      | Role                                                                                                                             | Verdict          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `@orkestrel/qualifier`                       | The recommender: data-authored rules, scoped verdicts, findings as the why-trace, referral routing                               | ADOPT (bin only) |
| `@orkestrel/reason`                          | The deduction engine INSIDE qualifier's passes                                                                                   | Indirect only    |
| `@orkestrel/interpret`                       | NL→reason bridge — its target is a reason `Subject`/`Definition`, not a `Blueprint`; its useful string algorithms are inlineable | DECLINE          |
| `@orkestrel/terminal` / `@orkestrel/console` | Prompting and reporting, already in the bin                                                                                      | Already present  |

Reason becomes a direct dependency only if the advisor must RANK competing
blueprints by numeric fit (qualifier qualifies, it never scores); that is an open
product decision — the design above assumes filtering, which covers the stated goal.

## Constraints

- **Core stays pure and dependency-free of all three packages.** The advisor is a
  UX layer in `src/bin` (with any I/O helpers in `src/server`); `Blueprint`,
  `Plan`, the compiler, and the gate are untouched.
- **Rules are data.** The advisor definition is a versioned, JSON-serializable
  document — reviewable, testable, and extendable without touching flow code.
- **Suggestions are never silent.** Every advisor-derived selection surfaces in the
  confirmation step; `--yes`-style bypasses accept only what the caller could have
  seen.

## Adoption trigger

Build this when the recommendation rules are genuinely rich enough to be worth
authoring as data — interdependent surface/peer implications, growing dependency
correlations, referral-worthy ambiguity. If the advisor would today amount to a thin
fuzzy-matcher over three surfaces, it stays native and this proposal waits; adopting
an engine for a lookup table would be indirection, not power.

## Non-goals

- No advisor logic in core, ever.
- No network calls in the advisor path (the catalog it matches against is the local
  vendored data; `sync` remains the network surface).
- No autonomous decisions — the gate validates, the human confirms.
