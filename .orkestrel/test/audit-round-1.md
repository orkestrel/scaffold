# Audit round 1 — reconciliation and ruling

Two lanes, blind, on one brief of 23 claims. Plus a mechanical conformance checker.

| Lane | Engine | Terminal line |
| --- | --- | --- |
| Subjective | Opus 5 | `FAIL — 5 broken, 6 unresolved, 0 not-evidenced, 2 findings outside the claims` |
| Objective | GPT-5.6 Sol | `FAIL — 10 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims` |
| Mechanical | Sonnet | `PASS` on all 12 conformance categories |

## Dispatch deviation, recorded

**The subjective lane was dispatched without the means to run its attacks.** Its brief told it a
shell and a probe project were available; the `reviewer` role file pins `tools: Read, Grep, Glob`.
It could not execute, said so plainly, and returned `UNRESOLVED` on the six claims that needed
execution rather than confirming them from reading.

That is the exact failure `orkestrel-falsify` warns about — a lens that can only read returns
derivations, and a derivation reads exactly like a verdict. The cost is measurable: the objective
lane, which could execute, **broke four claims the subjective lane had marked `CONFIRMED` by
reading** (7, 17) or could not reach at all (3, 4, 6). The fix is to dispatch that lane through a
role carrying `Bash`, or to state in the brief that the lane is read-only and scope its claims
accordingly.

A second orchestrator error: a probe-project run was made while the objective lane was live, which
collected its three in-flight files. No harm — the run was rescoped and the lane's files were left
alone — but the skill binds the orchestrator on this and it was broken anyway.

## Where the lanes disagreed

Not ties to average. Each answered a different question.

**Claim 7 — `destroy()`.** Subjective `CONFIRMED` by reading `rmSync(path, {force: true})` and
finding no path where `path` is rebound. Objective `BROKEN` by executing: remove the allocated
directory, create a foreign one at the same path, call `destroy()`, and the foreign directory is
gone. Both read the same code correctly. Only one ran it. **Objective wins.** Reproduced.

**Claim 17 — vacuous instruments.** Subjective `CONFIRMED` after looking for an assertion that
passes on an empty population and finding each candidate fails closed. Objective `BROKEN` by
deleting the guide's entire `## Methods` section, which empties `guide.methods()` and makes the
non-vacuous loop pass with no assertion executed. **Objective wins.** The subjective lane checked
whether each control fails closed; the objective lane checked whether the *loop around them* can
have zero iterations.

**Claim 9 — `captureError`.** Subjective `BROKEN`, objective `CONFIRMED`. Both correct, on different
questions. Objective asked "is the thrown value returned exactly?" — yes, including `undefined` and
`null`. Subjective asked "can a thrown `undefined` be distinguished from a completed thunk?" — no.
The **code** is right and the **guide's universal** is false. Reproduced: `threw === completed ===
undefined`.

## Findings, all reproduced by the Orchestrator before ruling

An auditor's finding is a hypothesis until it has been run here.

| # | Finding | Reproduced |
| --- | --- | --- |
| C1 | `readInventory(root, [])` returns `{}` **before** validating the root, so a symlinked or absent root passes silently when the directory list is empty | yes |
| C2 | A root-level file named `__proto__` is silently dropped — the accumulator is `{}`, so the assignment sets the prototype. `KEYS: ["control.txt"]`, `hasOwn: false` | yes, on the objective lane's exact vector after a weaker one of mine came back clean |
| C3 | `destroy()` removes a foreign directory recreated at the allocated path | yes |
| C4 | `roundTripJSON` returns `null` for `NaN`, `Infinity`, `-Infinity` while typed as the input's type; `-0` returns `0`. The `JSONValue` constraint does not make the identity claim sound | yes |
| C5 | Hard links defeat containment in both `readInventory` and `createScratch` — an in-scratch hard link exposes and mutates an outside inode | accepted from the objective lane's executed evidence |
| F1 | The containment guard is written verbatim **four times** in `src/server/factories.ts`, the per-segment symlink walk four times, and the same predicate three more times in `src/server/helpers.ts` — seven copies of one rule in the package whose thesis is de-duplication | yes: 4 identical refusals, 13 `isAbsolute` sites across server |
| F2 | `resolveRoot`'s TSDoc summary says "workspace root"; it returns the parent directory, and the package's own test asserts the result ends `/tests/src/` | yes |
| P1 | Deleting the guide's `## Methods` section makes the parity loop pass with zero iterations | accepted from executed evidence |
| P2 | A typo'd import inside a code fence leaves every parity comparison green; only a Surface-row typo fails | accepted from executed evidence |
| D1 | The guide states a false universal for `captureError` | yes |
| D2 | The guide states a false soundness claim for `roundTripJSON` | yes |
| D3 | The guide states the membership rule as **sufficient**, then excludes three helpers that satisfy it — `createRecorderMap` (13), `createErrorRecorder` (11), `createGate` (8). The contract states it as **necessary** | yes |
| D4 | `createClock` ships with **two** members, which the rule does not permit | yes |
| D5 | The recorded `captureError` member count is 12; the population holds 13 | accepted |
| D6 | The guide backticks excluded, nonexistent exports as though they were package APIs | yes |
| D7 | The README and `package.json` description are scaffold placeholders, and `files` ships the README while `guides/` never reaches the registry. **0 of 41** published packages ship either placeholder | yes |

## Rulings

### The hard-link findings are a threat-model ruling, not an arms race

`quality.md` bounds a fix by reachability and directs that a defect reachable only through a
hypothetical be documented on the interface that owns it rather than defended with coordination
machinery. It also fixes three rounds at one seam as the budget before the next unit is a ruling on
the design rather than a fourth repair.

So the ruling: **`@orkestrel/test` operates on directories the test itself created. It is not a
sandbox against hostile filesystem content.** The symlink refusals exist to stop accidental escape —
a stray link in a checkout — not to defend against an adversary who can create hard links inside the
scratch directory, who by definition already writes wherever the test process writes.

The guide states that boundary explicitly. The refusals stay, because accidental escape is the real
case and they catch it. No hard-link detection is added.

### Fixed now, because they are wrong under any threat model

C1, C2, C3, C4, F1, F2, P1, P2, and every documentation defect. None depends on an adversary.

### `createClock` is struck

It ships with two members. The rule requires three not all inside one dependency cluster, or five
regardless. I shipped it because both design lanes wanted it, which is precisely the failure the
subjective lane named in its own strongest counter-argument: a membership rule that taste overrides
whenever taste feels strongly enough is advisory, not a rule.

Consistency is worth more than one helper. `createClock` and `ClockInterface` are struck, and the
surface becomes **five types and ten values**. `middleware` and `mcp` keep their local clocks until a
third independent consumer appears.

### The membership rule is restated, not amended

It stays a **necessary** condition — a threshold a candidate must clear to be considered, never a
guarantee of shipping. The guide is corrected to say so, and each excluded row states either that it
fails the threshold or that it clears the threshold and is excluded for the named second reason.

## What this round does not touch

- The core semantics that held: `clear()` truncation, `requireValue` presence-not-truth, the
  collectors' ordering and termination, core host-independence, the built entry points loading.
- The zero-dependency promise, confirmed by both lanes independently, one of them against the
  dry-run tarball.
- The mechanical conformance categories, all twelve clean.
