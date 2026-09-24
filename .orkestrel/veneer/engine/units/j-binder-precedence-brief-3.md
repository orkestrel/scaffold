# Unit J-BINDER-PRECEDENCE — successor brief 3: the round-1 audit's findings

This brief supersedes `j-binder-precedence-brief.md` and `j-binder-precedence-brief-2.md` for the unit's third round, run on the same uncommitted worktree. What changed and why: the round-1 audit (`units/j-binder-precedence-audit-verdict.md`, reconciling the objective lane's `FAIL 1, 7` with F1, the subjective lane's `FAIL 1, 4, 7`, and the checker) confirmed the stamp mechanism, the `style` record, the resolver guard, `CollapseVocabulary`, and the `null` detail, and found: the precedence sentence promises more than the code delivers (a taken value keeps the older recording's order, so "saved that target first" understates it; and a target one restoration has already written back is written again by a later-saved restoration, so the sentence must be bounded to targets neither has yet written back); the `class`-attribute removal is judged once by the writing restoration, so an overlapping or sequential restoration by another engine can leave an empty `class` attribute (the objective lane's interleavings A and B), which the Orchestrator rules a documented bound for this unit and carries the mechanism that closes it (a presence record shared across snapshots) to a later unit; `readTag` returns a proxy's non-string `tagName` (the Orchestrator reproduced it on Chromium 153, `units/j-binder-precedence-probe-readtag.log.txt`: `23`); and the presence records' take branch has no proof (F1). Every ruling is an edit here.

## Role and engine

`sol` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer-precedence` from this file. The executor that opens this brief is the Astra engine inside its CLI: the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` (branch `unit/precedence`, rounds 1 and 2 uncommitted). Perform the assignment directly and spawn nothing; write only under that worktree and the system temporary directory; return the report as your final message.

## Objective

Make the precedence sentence true of the code at every site, pin the two overlap interleavings as executed cases that document the bound, prove the presence records' take branch, make `readTag` return only a string, and keep the scoped gates green.

## Context

**Evidence.** `units/j-binder-precedence-audit-verdict.md` (every ruling), `units/j-binder-precedence-audit-objective-verdict.md` (claim 1's interleavings A and B with their setups and traces; the smallest fix; F1's two surviving mutations and its fix; the bound on the `emitEvent` example), `units/j-binder-precedence-audit-subjective-verdict.md` (claim 1's inherited-stamp reading and its sentence; claim 4's attack), `units/j-binder-precedence-probe-readtag.test.ts` and `.log.txt` (the reproduction). Locate each site by its symbol.

**Law, host, standing conditions, scope, tools, and limits.** As in `j-binder-precedence-brief.md`.

## The edits

- **Q1 (claim 1): the sentence.** At the four sites (the `HostSnapshot` class remark, the `#publish` comment, `HostSnapshotInterface.restore`'s remark, the guide's § Ownership and restoration), the precedence sentence says: where two restorations overlap on a target neither has yet written back, the restoration holding the earliest recording of that target writes it back, a taken value keeping the order of the recording it came from, because the earliest recording holds the value the target carried before either engine wrote it; a restoration that publishes a target another restoration already wrote back writes its own recorded value. Replace the recreation-only sentence with: each restoration judges the removal of a `class` or `style` attribute it recorded as absent once, after its own token or property writes, so an overlapping or later restoration by another engine can leave that attribute present and empty; the tokens and properties themselves are always restored. Retitle the overlap proof for what it pins.
- **Q2 (claim 1): the interleavings as cases.** Add executed cases for the objective lane's interleaving A (an earlier-saved restoration has written the target back before a reaction to its later write starts the later-saved restoration, which then writes its own recorded value; and the same door on the `classed` record over a trigger carrying a `Button`-shaped first save and a second save, ending with the empty `class` attribute the bound names) and interleaving B (a later token write empties the list after the removal was judged, ending with the empty attribute), each asserting the documented outcome, so the bound is pinned rather than implied. Their mutation rows: an implementation that removes the attribute at the end of every restoration would make them fail; name it.
- **Q3 (F1): the take branch.** Add a `style` handoff case modelled on the `class` handoff case (a property saved inside a restoration's property write takes the pending presence entry and its later restore leaves no `style` attribute; `hasAttribute('style') === false`), and a presence-stamp case in which a taken `classed` entry wins an overlap; the two surviving mutations (`element.hasAttribute('style')` in place of the take branch; `stamp` in place of `classed?.stamp ?? stamp` and `styled?.stamp ?? stamp`) must each redden a case.
- **Q4 (claim 4): `readTag` returns a string or nothing.** Read the `tagName` into `unknown` and return it only when it is a string; the Orchestrator's probe becomes the red-first case (a proxy around a real SVG element whose `get` trap answers `23` reads `undefined`); the TSDoc's `@returns` says so.
- **Q5 (bounds).** The `emitEvent` example in `helpers.ts` passes no detail argument where the maps say `null`; the guide lines the objective lane named as over-long are rewrapped to the paragraph's width.

## Unknowns

1. Whether interleaving B is reachable without a malformed token through the engines (the objective lane: only through the public `HostSnapshot`), which decides whether the case uses two consumer snapshots (Q2): rule and report.

## Output

Your final message is the report: per edit Q1 to Q5, what changed; the exact new sentences; each new case's red and green readings and the mutation that reddens it; the Unknown's answer; the output of the scoped validation commands verbatim; `git status --short` and `git diff --stat`; the deviation state.

## Acceptance criteria

1. `npm.cmd run check:src:browser` exits 0. 2. The scoped oxlint and oxfmt checks exit 0. 3. `npm.cmd run test:src:browser` exits 0 with every new case recorded red first where the brief names a red reading. 4. `npm.cmd run test:guides` and `npm.cmd run test:policy` exit 0. 5. `grep` for "saved that target first" in `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, and `guides/veneer.md` returns no hit, and for "neither has yet written back" returns the four sites.

## Review evidence

The actual diff and `git status --short`, captured by the Orchestrator as `j-binder-precedence-3.diff` and `j-binder-precedence-3-status.txt`, and the report.
