# FIX-Q — make the CommonJS decision correct, and bind the instrument to every call site it names

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`, rooted at
`/home/user/scaffold`, sandbox `workspace-write`. Do the work yourself. Spawn nothing.

**Write limit, named before dispatch:** your sandbox refuses writes under `.agents/`. Nothing in this
brief needs that directory. If a fix appears to need it, stop and report rather than finding another
mechanism.

## Objective

Seven findings from a round both lanes failed with eight broken each, agreeing independently on every
substantive one.

## Why you

You wrote the selector's third and fourth attempts. Both were broken by shapes nobody had tried. This
is the round that decides whether the approach changes.

## Context

`src/core/templates.ts` holds `ARTIFACT_TEMPLATES.tests.distribution`, a template string scaffold
writes into every target as `tests/distribution.test.ts`. The helpers named here live inside that
string and are exported from nothing. This repository's own `tests/distribution.test.ts` is a
different, bespoke proof — leave it alone.

Read before acting: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`,
`.claude/rules/tests.md`, `.claude/rules/quality.md`, `.claude/rules/writing.md`,
`.claude/rules/documentation.md`, `guides/scaffold.md`, and
`.orkestrel/campaign/audit-p-reconciliation.md`.

Host facts: Linux, 4 CPUs, Node v22.22.2, `engines.node` is `>=22.12.0`, TypeScript `^6.0.3`. `npm` is
unauthenticated and no step needs it. `tmp/` is untracked.

## Q1 — the CommonJS decision, and the ruling you must make yourself

**Four selectors have shipped and all four were wrong.** In order: `entry.module === false`, broken by
a dual subpath; "something resolves under require conditions", broken by an ESM-only package; "the
walk traversed an explicit `require` key", broken by a `module-sync`-first branch and by a `node`
branch; and the shipped one, which classifies the resolved target's extension against the **root**
manifest's `type`. Two lanes broke that one on two shapes, and the Orchestrator confirmed both
against real Node:

```text
extensionless under require, "type": "module"   node: requires fine   predicate: false
.js under a nested "type": "commonjs"           node: requires fine   predicate: false
```

Two readings from the audit you must not rediscover:

- **The file contradicts itself.** `isModule` returns `true` for an extensionless target and its
  comment gives the reason — `require` reads such a file through its JavaScript handler — while
  `resolvesCommonJS` returns `false` for the same name. `guides/scaffold.md` publishes the `isModule`
  rule and names an extensionless path as its worked example.
- **The signature carries the second defect.** `resolvesCommonJS(entry, packageType)` takes a
  package-level fact to answer a file-level question, so no call site can supply a correct value.

**The property to establish: the CommonJS compile probe includes exactly the subpaths a typed
CommonJS consumer can take.**

**Rule for yourself between two mechanisms, and supply the evidence either way:**

1. **Observe.** The proof already spawns a real CommonJS driver that requires the specifier. That
   drive is the ground truth four predicates have been guessing. If the probe can be gated on an
   observed result, say how the ordering works — the compile probe needs the answer before the drives
   run — and what happens when a require legitimately throws.
2. **Enumerate completely.** Node's format rules for `require` are finite and documented. If you take
   this route, **the enumeration itself is the evidence**: list every rule Node applies — `.cjs`,
   `.mjs`, `.json`, `.node`, extensionless, `.js` by nearest enclosing `package.json` between the
   target and the installed root — cite where each comes from, and show the predicate implements each.

A fifth partial enumeration presented without that evidence is refused. Say which you chose and why.

Constraints, all measured:

- Both shapes above must become `true`.
- The four cases already pinned must keep their answers: `module-sync` first true, `node` condition
  true, plain ESM-only false, plain dual true.
- `/home/user/orkestrel/indexeddb` must still pass its regenerated proof — `6 passed | 2 skipped`.
- Do not admit `.mjs` under `require` as CommonJS.

## Q2 — the instrument binds one call site of three

`tests/guides.test.ts` asserts that the emitted `buildStage` contains the substring
`collectTargets(entry)`. Two lanes evaded it:

- `collectTargets(entry).slice(0, 1)` passes the substring while dropping a fallback member.
- Changing the `resolveTarget` call in `buildStage` to a fixed lookup stops the proof traversing
  fallback lists during resolution — half the rule the guide states — and the assertion still passes.

A sweep of the whole test tree returns no assertion binding any `resolveTarget` or `resolvesCommonJS`
call site inside `buildStage`.

The test already holds the `buildStage` AST node. Assert its call expressions rather than a substring:
require `collectTargets`, `resolveTarget`, and whatever Q1 leaves as the CommonJS decision among them.
Prove it with a firing control that mutates a **call site**, and one that uses the `.slice(0, 1)`
shape specifically, because that is the mutation the current instrument admits.

## Q3 — a graft in the compiler copy

`src/core/compilers.ts` reads:

```text
	// emitted, and its proof still carries no branch: those imports follow a
	// declared by either axis, so they do not select the branch. `vite` selects nothing either,
```

The replacement was spliced onto the surviving fragment `those imports follow a`. The sentence states
nothing. The other two copies are correct. Repair it and match the wrap width of its neighbours.

## Q4 — the emitted copy's undefined term

`src/core/templates.ts`'s emitted `guard` comment says "those imports are declared by either axis".
That ships into a consumer's `tests/distribution.test.ts`, where **"axis" has no antecedent** — that
file never names the `src` or `app` axis. The clause it replaced was anchored by "only a published
face is owed one" in the same comment.

State it in terms the file's own reader has. The literal ban covers only `playwright` and
`configs/browsers.js`, so nothing forces the undefined term.

## Q5 — the guide names a different condition set than the code uses

`guides/scaffold.md` says the proof resolves under "the typed CommonJS consumer's runtime conditions",
and the same section defines those as `node-addons`, `node`, `require`, `module-sync`. The code uses
`['node', 'require']`. On the `module-sync` shape those give **opposite** answers, so a maintainer
reproducing the rule from the guide gets the opposite of the gate.

Name the set the code uses and why it differs from the runtime set the section already defined. State
what an extensionless target and a `.mjs` target are classified as, since the paragraph's own examples
include one. Whatever Q1 decides, this paragraph must describe it.

## Q6 — reflow both paragraphs

`guides/scaffold.md` carries a short line mid-paragraph in the release-skew paragraph and another in
the browser-branch paragraph, both introduced by recent edits.

`tests/guides.test.ts` asserts a fragment that sits wholly inside one line of the release-skew
paragraph. **The coupling constrains where the break falls, not whether the paragraph is reflowed** —
keep that fragment on one line. No test reads the browser paragraph.

## Q7 — banned prose in the campaign report

`.orkestrel/campaign/fix-p-report.md` carries temporal `now`, and counts over growable sets — cases,
vectors, controls, paragraphs, lines. Delete each `now`; name the members instead of tallying them.
`AGENTS.md` § Writing governs it.

## Owned files

- `src/core/templates.ts`
- `tests/src/core/templates.test.ts`
- `tests/guides.test.ts`
- `guides/scaffold.md`
- `src/core/compilers.ts`
- `.orkestrel/campaign/fix-p-report.md`
- `host.json` — regenerated, never hand-edited

## Off-limits

- `.agents/` in every form — your sandbox refuses it.
- `tests/distribution.test.ts`, `src/bin/CLI.ts`, `ROADMAP.md`.

## Unknowns, named as unknowns

- Whether the observation route is reachable given the compile probe's ordering is not known. Rule on
  it and say why.
- Whether `.mjs` under `require` and the `module-sync` entry are decided correctly under TypeScript
  `^6.0.3` was referred by a lane that could not execute it. Settle it: a `.cts` consumer under
  `--module node16` and again `--module nodenext`, over a fixture publishing
  `{"module-sync":"./s.js","require":"./s.cjs","import":"./s.js"}` under `"type":"module"`, and a
  second publishing `{"types":"./x.d.mts","require":"./x.mjs"}`.

## Execution and probes

Probes only under `tmp/fix-q/`, never inside `tests/` except the two owned test files. Delete them
before returning. Do not run a tree-wide gate. Scope every run.

Your sandbox denies a grandchild process, a nested `npm install`, a loopback listener, and writes
under `.agents/`. Six times in this campaign a reported denial led to a host reading that found a real
defect. Report; never substitute the reachable half.

## Acceptance criteria, in this order

**Regeneration first** — you edit a vendored file (`guides/scaffold.md`), and a gate reading
`host.json` cannot pass until the digest moves.

1. `npm run build && npm run build:inventory`, then `git diff --stat host.json` shows the digest moved.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned TypeScript files exits 0.
3. `npx oxfmt --config .oxfmtrc.json --check` over your owned TypeScript files exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green by explicit project name.
   **This includes the emitted-corpus oxfmt fixed-point test**, which `oxfmt --check` on
   `src/core/templates.ts` does not cover, because the template is a string literal.
7. The vitest project covering `tests/src/core/compilers.test.ts` is green by explicit project name.
8. Q1 has a test covering both new shapes and the four already pinned, with a firing control.
9. Q2's assertion reds on a call-site mutation **and** on the `.slice(0, 1)` shape. Record both.
10. Name each test for what it proves, never for this brief's labels.

Report any whole-suite or distribution-proof result as an OBSERVATION. The authoritative runs are the
Orchestrator's, including the indexeddb end-to-end proof.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
if Q1's property cannot be established by either mechanism, or if a criterion needs a file you do not
own. Otherwise decide phrasing and placement yourself and carry on.

## Output

- Q1: which mechanism you chose, why, the enumeration or the ordering argument as evidence, and the
  six-case table.
- Q2: both firing-control transcripts.
- Q3 through Q7: what changed.
- The TypeScript settlement for the referred `.mjs` and `module-sync` cases.
- The gate results in order with their real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
