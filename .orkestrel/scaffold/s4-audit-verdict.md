# Unit S4 — audit verdict

Round four, 2026-09-16. Subject: unit S4's delta only. Rounds one through three audited everything
before it.

**Ruling: ACCEPT, after unit S5 closed the two findings.** The objective lane accepted. The
subjective lane rejected on one comment defect and said plainly that the substance was done, that
the fix was mechanical with its replacement text supplied, and that no further adversarial round was
warranted. S5 was dispatched to `builder` on that basis and closed both findings.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `reviewer` holding the objective lane — Opus 5, clean context | ACCEPT | `s4-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, clean context | REJECT | `s4-audit-subjective-report.md` |
| Gates | `verifier` — Sonnet | GREEN | `s4-verify-report.md` |

**Engine substitution, recorded.** The objective lane's default engine is GPT-5.6 Sol. Sol wrote
unit S4, and a fix round's auditor must be an engine that did not write the work, so Opus 5 held
both lanes — separate subagents, clean contexts, blind to each other, each told which perspective it
held.

## What the round settled

**The callable-`then` exclusion is correct, and stronger than what it replaced.** S4 replaced
`instanceof Promise` on its own judgment, and both lanes independently reached the same decisive
evidence: Vite's `asyncFlatten` at `node_modules/vite/dist/node/chunks/node.js:2923-2928`
discriminates a plugin entry from a pending one by reading `then`, not by `instanceof`, and
`Promise.all` resolves anything with a callable `then`. So such an entry is replaced by its resolved
value before any plugin runs, and treating it as a named plugin would be wrong. The predicate now
applies the same test Vite applies, one layer earlier. The objective lane added that `instanceof`
additionally missed a cross-realm promise from a `vm` context. Nothing real is wrongly rejected: the
`Plugin` interface declares no `then` member, and an object carrying a callable `then` cannot
function as a Vite plugin at all.

**One of the two new regression cases pins behaviour for a value the type system forbids.**
`{ name: 7 }` is assignable to no member of `PluginOption`, so that case reaches the merge through
`Reflect.apply`. It proves the guard's runtime honesty rather than a rule a typed caller can reach.
It stands because the Orchestrator ordered the string check on guard-honesty grounds, not because
the vector is reachable. Recorded plainly so a later reader does not assume otherwise. Its sibling,
the structural-promise case, drives a value that **is** constructible from typed code.

## Findings, and how each closed

| Finding | Source | Close |
| ------- | ------ | ----- |
| The census's control paragraphs do not account for the cases they partition | both lanes, independently | S5 item 1 |
| The runner asserts two values derived from the same report | objective F2 | S5 item 2 |

**The census fix took the subjective lane's recast over the objective lane's re-enumeration.** Both
lanes found the defect; they prescribed different closes. The objective lane would have named the
two new cases in the existing list. The subjective lane recast the paragraph as the property it
stood in for, citing `.claude/rules/quality.md` § Rounds and verdicts on a subject that reprices
itself on every edit. The recast wins: the paragraph naming cases *with* controls enumerates too and
would drift the same way on the next controlled case, and this block had already produced a finding
in two consecutive rounds for exactly that reason. The objective lane's clause — that the predicate
cases' discriminating red comes from mutating the predicate rather than from an in-file contrast —
was folded into the replacement text, so both lanes' substance is carried.

## Recorded, not carried

- **The emitted merge comment says "promises" where the exclusion is any callable-`then` entry**
  (subjective F2). Not false, but narrower than the code. The merge text has three hand-maintained
  homes, and changing one word moves emitted bytes across every generated workspace for a case Vite
  resolves before a plugin runs. Carried to whoever next edits the merge text, with the wording
  "promises and any entry carrying a `then` method".
- **The restore pattern is not uniform across the retained instruments** (subjective F3): one nests
  its two restores, three write them flat in one `finally`. Every mutation sits inside its restoring
  block, so the claim holds; this is uniformity.
- **`{ name: 'x', then: true }`** is treated as named by the predicate and as pending by Vite, which
  spins forever on that value regardless. Unobservable.
- **A polluted `Object.prototype.then`, and a throwing `then` getter.** Vite reads the same property
  and fails identically in both cases. The package is no worse than its host.

## Deviations this round

- **The stale session-start file list reached a lane's context again** (subjective R1). That lane
  had no shell, ruled claim 10 over the supplied patch, and named that coverage rather than
  overclaiming — which is the correct handling. The Orchestrator confirms the tree against a live
  read before committing.

VERDICT: ACCEPT — unit S5 closed both findings; the change is ready for the acceptance gate run.
