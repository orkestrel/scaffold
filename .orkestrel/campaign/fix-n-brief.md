# FIX-N — correct a reason three artifacts agree on and none of them checked, and land two rules

## Role and engine

`implementer` — Claude Opus 5, subjective implementation, native subagent. Perform this directly and
spawn nothing. You are the sole serial writer; no other writer is running.

## Objective

Four things: a false cause stated in three places, three writing-rule violations, any sentence FIX-M
falsified, and two process rules the campaign has earned.

## Context

Read before acting: `AGENTS.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`,
`.claude/rules/names.md`, `.agents/orchestration.md`, and `guides/scaffold.md`.

`AGENTS.md` § Writing and `.claude/rules/writing.md` govern every sentence. The counts ban is live and
this unit exists partly because it was violated: never write a number answering "how many" about a set
anyone can add to. Never write `should`, `just`, `simply`, `easy`, `above`, or `below`.

`.claude/rules/documentation.md`, `.claude/rules/quality.md`, and `.agents/orchestration.md` are
**vendored**. Editing any of them restales `host.json`, so the regeneration comes before every gate
that reads it.

## N1 — the browser branch's reason of record is false, in three copies

Three artifacts state that the browser branch is conditional because the launcher and bundler it
needs are not imported. An audit lane falsified it and the Orchestrator confirmed the measurement,
running the built compiler across three blueprints:

```text
  src core only             playwright=false  provider=false  configs/browsers.ts=false  browserDrive=false
  src core + app browser    playwright=true   provider=true   configs/browsers.ts=true   browserDrive=false
  src browser published     playwright=true   provider=true   configs/browsers.ts=true   browserDrive=true
```

The middle row falsifies it. With `src: ['core'], app: ['browser']` every import the reason names is
present — `playwright`, `@vitest/browser-playwright`, and `configs/browsers.ts` — and the branch is
still absent.

**The true cause: the branch follows a published `src` browser face, because only a published face
needs a browser drive in the distribution proof.** An application browser face is not published, so
no distribution drive is owed for it. Import availability is a consequence of publishing such a face,
not the cause of the branch.

Correct all three, and keep them saying one thing:

- `src/core/templates.ts` — the emitted `guard` template's comment. Note the constraint that shaped
  its current wording: `tests/src/core/compilers.test.ts` bans the literals `playwright` and
  `configs/browsers.js` from the emitted proof's whole content, so this copy names imports by role
  rather than by specifier. Keep that, and fix the cause.
- `src/core/compilers.ts` — the comment around the browser-branch emission.
- `guides/scaffold.md` — the matching passage.

The `vite` correction in each is right and survives: `vite` sits in every workspace's base
development dependencies and is not what keeps the branch conditional. Keep that clause.

## N2 — three writing-rule violations

- `src/bin/CLI.ts:1289` writes `just`. `.claude/rules/writing.md` § Substitutions: delete it.
- `src/bin/CLI.ts:1335` writes "the filter above decides". § Code tokens, references, and links
  refuses `above`; the preceding filter is what it means.
- `guides/scaffold.md:640` writes "That reading carries one limit." That is a count over a set anyone
  can add to. Name the limit instead of tallying it.

Sweep your owned files for the whole substitution table case-insensitively and across inflections
before you finish, rule each hit by the sense the row bans rather than by the match, and name the
pattern and the paths you swept — including a clean result.

## N3 — sentences FIX-M falsified

FIX-M repaired the CommonJS probe's selector and added executed guide assertions. Its report is at
`.orkestrel/campaign/fix-m-report.md` and lists every `guides/scaffold.md` sentence its change
falsified. Read that list and correct each. Read `src/core/templates.ts` for what is true now rather
than describing it from any report.

## N4 — two rules this campaign earned

Land both in `.agents/orchestration.md` § Dispatch anatomy, under "Check the brief before you send
it", where the other brief-writing failures live. Write them as directives with an observable
trigger, per `AGENTS.md` § Instruction files. Do not narrate the campaign; state the rule.

**Rule one — a unit that changes a mechanism owns the sentences describing it.** Three times in one
campaign a repair landed correctly and left the comment or guide sentence beside it describing the
mechanism the same commit deleted, and two independent audit lanes broke a unit on it twice. Scope
every writing unit to include the prose in its owned files that its own change makes false. Where a
brief deliberately scopes prose out so two writers do not share a file, it names the carrier that
takes it, and the carrier is dispatched before the change ships.

**Rule two — agreement between copies is not evidence.** A fact restated in several artifacts was
checked against the other copies rather than against the code, and all of them were wrong. Before a
brief tells a unit that a fact is settled and must not be re-decided, verify that fact against the
thing it describes — run it, or read the code that implements it. Copies agreeing means one of them
was copied, not that any of them is true.

## Owned files

- `guides/scaffold.md`
- `src/core/templates.ts` — the `guard` template's comment only
- `src/core/compilers.ts` — the browser-branch comment only
- `src/bin/CLI.ts` — comments only
- `.agents/orchestration.md`
- `host.json` — regenerated, never hand-edited

## Off-limits

- Any behaviour change. This unit moves prose and regenerates a digest. If a sentence cannot be made
  true without changing code, stop and report.
- `tests/` in every form, and everything under `.orkestrel/`.

## Acceptance criteria, in this order

**Regeneration first**, because you edit two vendored files and a gate that reads `host.json` cannot
pass until the digest moves.

1. `npm run build && npm run build:inventory`, then `git diff --stat host.json` shows the digest moved.
2. `npx oxfmt --config .oxfmtrc.json --check` over your owned files exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned files exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project
   name — you edit a template string and the emitted corpus must stay an oxfmt fixed point.
7. The vitest project covering `tests/src/core/compilers.test.ts` is green, run by explicit project
   name — it holds the literal ban that constrains N1's wording.
8. The vitest project covering `tests/src/bin/CLI.test.ts` is green, run by explicit project name.
9. Your substitution sweep is reported with its pattern and paths, including a clean result.

Report any whole-suite result as an OBSERVATION. The authoritative run is the Orchestrator's.

## Deviation contract

Stop and report if a sentence cannot be made true without a behaviour change, if N1's true cause does
not hold when you check it against the compiler yourself, or if a gate cannot pass from your owned
files alone. Otherwise decide phrasing, placement, and paragraph order yourself and carry on.

## Output

- N1: each of the three copies, old text and new text.
- N2: each hit, and the sweep's pattern, paths, and result.
- N3: each sentence FIX-M falsified, old and new.
- N4: both rules as landed, and where.
- The gate results in order with their real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
