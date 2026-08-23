# FIX-P — decide CommonJS support by what the target is, not by which condition names were walked

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`, rooted at
`/home/user/scaffold`, sandbox `workspace-write`. Do the work yourself. Spawn nothing.

## Objective

Five findings from an adversarial round both lanes failed. The first is the load-bearing one and the
rest are bounded.

## Context

`src/core/templates.ts` holds `ARTIFACT_TEMPLATES.tests.distribution`, a template string scaffold
writes into every target as `tests/distribution.test.ts`. The helpers named here live inside that
string and are exported from nothing. This repository's own `tests/distribution.test.ts` is a
different, bespoke proof — leave it alone.

Read before acting: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`,
`.claude/rules/tests.md`, `.claude/rules/quality.md`, `.claude/rules/writing.md`,
`.claude/rules/documentation.md`, and `guides/scaffold.md`.

Host facts: Linux, 4 CPUs, Node v22.22.2, `engines.node` is `>=22.12.0`. `npm` is unauthenticated and
no step needs it. `tmp/` is untracked.

## P1 — the CommonJS predicate is the wrong question, not the wrong condition set

`resolvesCommonJS` asks whether the resolution walk traversed a literal `require` key. Two audit
lanes each found a shape it wrongly excludes, and **neither lane's proposed fix covers the other's
vector.** The Orchestrator ran both shapes against both predicates:

```text
  case                                  shipped(NodeCJS)  proposed(TS-CJS)
  module-sync first (subjective lane)   false             true
  node condition   (objective lane)     false             false
  plain ESM-only   (must stay false)    false             false
  plain dual       (must stay true)     true              true
```

The two vectors:

```json
{ "module-sync": "./x.js", "require": "./x.cjs", "import": "./x.js" }
```

The walk returns at `module-sync` before it reaches `require`. TypeScript's require-mode set does not
enable `module-sync`, so TypeScript resolves `require` → `./x.cjs` and accepts a CommonJS consumer.

```json
{ "node": { "types": "./index.d.cts", "default": "./index.cjs" },
  "default": { "types": "./index.d.mts", "default": "./index.js" } }
```

No `require` key is met at all, and Node's `require` returns the CommonJS module:

```text
  require -> {"flavour":"commonjs"}
  CommonJS conditions resolve  : ./index.cjs
  traversed an explicit require: false
```

**The ruling: the proxy is wrong.** Which condition names a walk passed through cannot answer whether
a typed CommonJS consumer can take the subpath. A third condition-set patch is the fourth selector and
will fail on the next shape nobody tried.

**The property to establish: `entry.commonjs` is true when a typed CommonJS consumer can take the
subpath.** That is decided by what the resolved target *is* — its extension, and the package's `type`
field for a `.js` target — not by which keys the walk visited.

Constraints, all measured and none to be rediscovered:

- The two vectors above must become `true`.
- Plain ESM-only (`{types, import, default}` resolving `.js` under `"type": "module"`) must stay
  `false`. It is the control that makes the predicate mean anything.
- Plain dual (explicit `import` and `require` branches) must stay `true`. That was J2 and J3's repair.
- `/home/user/orkestrel/indexeddb` must still pass its regenerated proof. It reported
  `6 passed | 2 skipped`, exit 0 after FIX-M, having reported `1 failed | 5 passed` before it.

Design the predicate yourself. If reading the target's format needs the installed package's `type`
and you cannot reach it from where the predicate runs, say so rather than approximating.

## P2 — the fallback assertion binds the helper, not the caller

`tests/guides.test.ts` gates the guide's fallback-target rule by extracting the emitted classifier and
running it. An audit lane replaced `collectTargets(entry)` inside the emitted `buildStage` with an
empty array and **the assertion still passed**; mutating the extracted helper made it fail. So it
proves `collectTargets` works, not that the proof uses it.

Bind it to the shipped call site: drive `buildStage`, or assert the call closure, so that removing the
call reds it. Prove that with a firing control that mutates the **caller**, not the helper.

## P3 — the reason of record is wrong for the third time, in three copies

The shared clause "those imports follow a published face rather than selecting the branch" is false.
Measured:

```text
src/core/compilers.ts:677   if (machinery.browser) imports.push("… '@vitest/browser-playwright'")
src/core/compilers.ts:1314  const browser = blueprint.src.includes('browser')
```

`machinery.browser` is the `src` **or** `app` axis; the branch selector reads `src` alone. So the
imports follow either axis. Each copy states the falsifying counterexample in the sentence
immediately before the clause.

Correct the clause in all three copies — `src/core/compilers.ts`, the emitted `guard` template in
`src/core/templates.ts`, and `guides/scaffold.md`. What is true: the imports are declared by either
axis, so they do not select the branch. Keep everything else in those sentences: "the browser drive
measures the packed artifact and only a published face is packed" is correct, and so is the `vite`
clause.

The emitted copy is constrained: `tests/src/core/compilers.test.ts` bans the literals `playwright`
and `configs/browsers.js` from the emitted proof's whole content, so that copy names imports by role.

## P4 — one landed rule duplicates two existing homes

`.agents/orchestration.md` § Dispatch anatomy → "Check the brief before you send it" gained a bullet
opening "Check a fact against the thing it describes before the brief states it as settled". That
directive already lives in the same file twice: the assumption-checking bullet under **Context and
decomposition**, and the "Paste the command and its output for every factual claim" bullet directly
above the new one.

`AGENTS.md` § Instruction files: give a rule one home. Delete the restated directive and fold the one
additive clause into the paste-the-command bullet as its last sentence — that several artifacts
stating a fact is not evidence for it, because agreement proves one copy was taken from another.

Keep the second added rule, which scopes a mechanism change to own its prose; it is unique. Strip the
explanatory tail from it, per `AGENTS.md` § Instruction files: state the trigger and the action, not
the consequence.

## P5 — two over-width guide paragraphs, and a test coupled to one

`guides/scaffold.md` carries a 111-character line and a 154-character line in paragraphs that
otherwise wrap at 100. No gate sees it, because `oxfmt` formats no Markdown.

**The trap:** `tests/guides.test.ts` asserts the exact text of a line inside one of those paragraphs.
Re-wrapping reflows it and reds that assertion. Both files are yours for this reason. Re-wrap both
paragraphs at the file's width, and move the assertion to a fragment short enough to survive any
wrap.

## Owned files

- `src/core/templates.ts`
- `tests/src/core/templates.test.ts`
- `tests/guides.test.ts`
- `guides/scaffold.md`
- `src/core/compilers.ts`
- `.agents/orchestration.md`
- `host.json` — regenerated, never hand-edited

## Off-limits

- `tests/distribution.test.ts`, `src/bin/CLI.ts`, `ROADMAP.md`, everything under `.orkestrel/`.

## Unknowns, named as unknowns

- Whether the predicate can read the installed package's `type` from where it runs is not known.
  Determine it or report it unresolved with what you tried.
- Which existing assertions P1 makes false is not known. Do not grep for them — run the suite and read
  the failures.

## Execution and probes

Probes only under `tmp/fix-p/`, never inside `tests/` except the two owned test files. Delete them
before returning. Do not run a tree-wide gate. Scope every run to a named vitest project or an
explicit path.

Your sandbox denies a grandchild process, a nested `npm install`, and a loopback listener. **Five
times in this campaign that denial hid something; each time the unit reported it as an observation
and the host reading found the defect, once a regression that would have hit five packages.** Do the
same. Never substitute the reachable half.

## Acceptance criteria, in this order

**Regeneration first** — you edit two vendored files (`guides/scaffold.md`, `.agents/orchestration.md`),
and a gate reading `host.json` cannot pass until the digest moves.

1. `npm run build && npm run build:inventory`, then `git diff --stat host.json` shows the digest moved.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned TypeScript files exits 0.
3. `npx oxfmt --config .oxfmtrc.json --check` over your owned TypeScript files exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project
   name. **This includes the emitted-corpus oxfmt fixed-point test**, which `oxfmt --check` on
   `src/core/templates.ts` does not cover, because the template is a string literal.
7. The vitest project covering `tests/src/core/compilers.test.ts` is green — it holds the literal ban
   constraining P3's emitted copy.
8. P1 has a test proving all four cases in the table, with a firing control: revert the predicate
   alone, show it reds, restore it, show it greens.
9. P2's assertion reds when the **caller** is mutated. Record that transcript.
10. No line in `guides/scaffold.md` exceeds the width its paragraphs use.
11. Name each test for what it proves, never for this brief's labels.

Report any whole-suite or distribution-proof result as an OBSERVATION with both readings. The
authoritative runs are the Orchestrator's after you exit, including the indexeddb end-to-end proof.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
if P1's predicate cannot be built from what the proof can reach, if P3's clause cannot be fixed within
the literal ban, or if any criterion needs a file you do not own. Otherwise decide phrasing and
placement yourself and carry on.

## Output

- P1: the predicate, why, and the four-case table under it.
- P2: the caller-mutating control transcript.
- P3: each of the three copies, old and new.
- P4 and P5: what changed.
- The gate results in order with their real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
