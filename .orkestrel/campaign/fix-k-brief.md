# FIX-K — make the prose true where FIX-J moved the code

## Role and engine

`implementer` — Claude Opus 5, subjective implementation. You are a native subagent. Perform the work
directly and spawn nothing. You are the sole serial writer in this checkout for the files below.

## Objective

FIX-J changed how the emitted distribution proof resolves an exports map. Four guide sentences and
three code comments now describe behaviour that no longer exists, or never existed. Make each true.

This is a prose unit with a real gate behind it, not a copy-edit: `guides/scaffold.md` is vendored
into every target, and `tests/guides.test.ts` asserts export parity, that every relative link
resolves to a real file, and that code fences import only real exports.

## Context

Read before acting: `AGENTS.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`,
`.claude/rules/names.md`, and `guides/scaffold.md` itself. No skill is named for this unit.

`AGENTS.md` § Writing and `.claude/rules/writing.md` govern every sentence you write. The counts ban
is live: never state a number answering "how many" about a set anyone can add to. Name the members
instead.

Host facts: Linux, 4 CPUs. `npm` is unauthenticated and no step here needs it.

## The work

### K1 — the guide's classifier prose, which FIX-J falsified

`guides/scaffold.md`:

- **Line 1461-1463.** "The declaration is read under `['types', 'import']` and then under
  `['types', 'require']`. Those condition sets are iterated rather than coalesced: a set that answers
  with JavaScript has resolved no declaration, so the next set is read rather than that answer
  returned." That described a first-wins search. FIX-J now resolves the import declaration and the
  require declaration **independently** and keeps both on the entry, so a dual subpath's `require`
  declaration is compiled against rather than merely existing. State what it does now.
- **Line 1468-1470.** "A target is a runtime target when its own file name carries no extension at
  all, or carries `.js`, `.mjs`, or `.cjs`." FIX-J added `.node`, because `require` loads a native
  addon through its own handler and it publishes names. Add it, and give the reason.
- **Line 1478.** "and no manifest in the `@orkestrel` line publishes such a target." This is a
  live-state measurement with no date, in a document mirrored into workspaces outside that line, and
  it goes stale the first time any package adds such an export. `.claude/rules/writing.md` § Claims
  and time forbids it. Cut it, or replace it with the property that does not go stale — the
  classifier errs toward naming a subpath it cannot vouch for.
- **Line 1484-1487.** "Classification reads every target the entry names under every condition, and
  every member of a fallback list with them." FIX-J now applies Node's package-target rules inside a
  fallback array, so an invalid member is **skipped** rather than read. "Every member" is false.
  State the rule as it now stands, including that a standalone invalid target is still reported
  rather than skipped, because Node throws on one.

**Do not touch line 1470-1471**, the sentence explaining that an extensionless target loads. An audit
round claimed it was wrong and an independent refuter broke that claim: Node loads an extensionless
file under both module systems, resolving format from the nearest `package.json` `type`. The sentence
stands. Do not revive the claim and do not "improve" the sentence into hedging.

### K2 — the emitted guard's retired reason of record

`src/core/templates.ts:1799`, inside the `guard` template that scaffold writes into a target:

> the launcher and the bundler one needs are not imported here

`vite` is not what keeps the browser branch conditional. The settled reason of record is already
written twice, and this copy is the one lagging:

- `src/core/compilers.ts:1302-1307` — names `playwright`, `@vitest/browser-playwright`, and
  `./configs/browsers.js`, and says plainly that `vite` sits in `BASE_DEV_DEPENDENCIES` and every
  workspace declares it.
- `guides/scaffold.md:1500-1505` — states the same correction.

Bring the emitted comment to that reason. Do not re-decide it; two artifacts already agree and this
is the third copy. FIX-J already replaced the superseded predicate quote in the same comment, so only
the launcher-and-bundler clause remains.

### K3 — the third copy of the superseded predicate quote

`tests/src/core/compilers.test.ts:666` still opens a comment with `` `it.runIf(!entry.browser)` ``.
That predicate is spelled nowhere in the emitted file any more. Bring the comment to what the code
actually does.

### K4 — `bytes` where the comparison trims

`src/bin/CLI.ts` compares a setup module against its seed with `.trim()` on both sides (lines 1317
and 1325-1326), and `guides/scaffold.md:631-634` correctly says the comparison reads both trimmed and
that a trailing newline is not authorship. These comments say `bytes` and contradict it:

- `src/bin/CLI.ts:1285`, `:1290` (twice in one sentence), `:1336`
- `tests/src/bin/CLI.test.ts:78`, `:81`, `:2125`

**Rule every hit by the sense the word carries, not by the match.** `src/bin/CLI.ts:923` and other
sites use `bytes` for real file content and are correct — leave them. The justification reasoning at
`src/bin/CLI.ts:1290-1293` survives intact; only the noun is wrong.

### K5 — the guide sentence claiming a door is shut

`guides/scaffold.md:637-638`: "Holding each module to the seed the same blueprint plans at its own
path reports only what a maintainer wrote, and a seed that grows in a later release needs no change
here."

An independent refuter reproduced the failing state with the built CLI. `tests/setupGlobal.ts` is
birth-owned, so a target keeps the seed of whichever release materialized it, permanently — `repair`
reports it aligned and never rewrites it. A release whose planned seed differs from that one raises
the question against a module scaffold itself wrote and a maintainer never touched.

State the limit rather than the reassurance: a release that moves a planned seed raises the question
on every target materialized before it, and a maintainer meeting it closes it by writing the proof or
by taking the current seed. **Do not change the mechanism** — that is a recorded successor row, not
this unit. No seed moved in 0.0.50, so nothing fires on this release.

## Owned files

- `guides/scaffold.md`
- `src/core/templates.ts` — the `guard` template's comment only (K2)
- `src/bin/CLI.ts` — comments only (K4)
- `tests/src/bin/CLI.test.ts` — comments only (K4)
- `tests/src/core/compilers.test.ts` — the comment at line 666 only (K3)
- `host.json` — regenerated, never hand-edited

## Off-limits

- Any behaviour change anywhere. This unit moves prose and regenerates a digest. If a sentence cannot
  be made true without changing code, stop and report it.
- `src/core/compilers.ts` — it already carries the correct reason; K2 copies from it.
- Everything under `.orkestrel/`.

## Unknowns, named as unknowns

- Whether `tests/guides.test.ts` asserts anything about the exact sentences you are rewriting is not
  known to the Orchestrator. It is known that the project runs only `tests/guides.test.ts`, and that
  it checks export and member parity, relative-link resolution, code-fence imports, and executes
  three named examples — none in the classifier section. Run it and read the result rather than
  assuming.

## Acceptance criteria, in this order

**The regeneration comes first**, because `guides/scaffold.md` is vendored and editing it restales
the digest that the parity and policy gates read. A gate ordered ahead of it cannot pass, and you
would stop on a criterion your own work already satisfied.

1. `npm run build && npm run build:inventory`, then `git diff --stat host.json` shows the digest moved.
2. `npx oxfmt --config .oxfmtrc.json --check` over your owned files exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned files exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project
   name — K2 edits a template string and the emitted corpus must stay an oxfmt fixed point.
7. The vitest project covering `tests/src/bin/CLI.test.ts` is green, run by explicit project name.
8. No `bytes` remains in the files you own where the sense is the trimmed comparison; every `bytes`
   you left is one where the sense is real file content, and you name each one you left and why.

Report any whole-suite result as an OBSERVATION with its reading, not as a criterion. The
authoritative run belongs to an independent verifier after you exit.

## Deviation contract

A conflict with the objective stops you: a sentence that cannot be made true without a behaviour
change, an owned file that turns out to need a sibling you do not own, or a gate that cannot pass
from your owned files alone. Report expected, found, exact evidence, done or not done, and at most
one short hypothesis. Where a clause sits, which of two true phrasings reads better, and how a
paragraph is ordered are yours to decide, record, and carry on from.

## Output

- Each of K1 through K5: the file, the line, the old sentence, the new sentence.
- The `bytes` hits you left in place, each with the sense that justifies leaving it.
- The gate results, in the order above, with their real output.
- Anything you could not close, named, with the command that would settle it.
- Any claim of your own you would flag as weak.

No process diary.
