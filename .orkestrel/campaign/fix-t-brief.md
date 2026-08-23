# FIX-T — bound the mirror assertion to a declared claim

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, `codex exec`, rooted at `/home/user/scaffold`,
sandbox `workspace-write`. Do the work yourself. Spawn nothing. Your sandbox refuses writes under
`.agents/`; nothing here needs it.

## One item

FIX-S closed five of its six. The sixth — the mirror assertion — is too wide and fails end to end in a
real target. This unit bounds it. **Change nothing else.**

## The failure

Against `/home/user/orkestrel/indexeddb`, with the regenerated proof installed:

```text
FAIL declares types for every module it publishes [requires the registry]
AssertionError: expected [ '.' ] to strictly equal []
```

That target publishes its root as a browser face:

```json
{ "types": "./dist/src/browser/index.d.ts",
  "import": "./dist/src/browser/index.js",
  "default": "./dist/src/browser/index.js" }
```

**There is no `require` condition.** `default` resolves under the require condition set, so `required`
is true; the `.d.ts` declaration under `"type": "module"` makes `commonjs` false; and
`required && !commonjs` names the subpath.

Both facts are literally true — Node's `require(esm)` loads it, and a `.cts` consumer gets TS1479. But
a package that declares no `require` condition **makes no CommonJS claim**, so asserting it must be
CommonJS-typable asserts something it never promised.

**This is the defect class that started this seam.** `default` matching under require conditions is
not a declaration of CommonJS support — the same trap that broke the second selector, arriving through
a new assertion rather than through the selector.

Your report stated the assertion is green for a scaffold-generated manifest. That is true: a generated
manifest carries an explicit `require` branch with a `.d.cts` declaration. The fleet holds shapes
scaffold does not generate, and the proof reads whatever manifest the workspace has.

## T1 — the bound

The assertion fires only where the entry **declares** CommonJS support — an explicit `require`
condition in its own mapping — and is nonetheless untypable. Not where `default` merely resolves.

**Do not narrow `required`.** Node genuinely reaches that target and the runtime drive that consumes
`required` is correct to run. Only the assertion's predicate is too wide.

**Do not drop the assertion.** It catches a real defect: a package that declares `require` and ships a
declaration no CommonJS consumer can use. That shape passed silently before FIX-S added this.

## Acceptance criteria, in this order

1. `npm run build && npm run build:inventory`; `git diff --stat host.json` shows the digest moved.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over owned TypeScript exits 0.
3. `npx oxfmt --config .oxfmtrc.json --check` over owned TypeScript exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green by explicit project name,
   including the emitted-corpus oxfmt fixed-point test.
7. A test proves the assertion is **silent** for an entry with `types`/`import`/`default` and no
   `require` condition — indexeddb's exact shape — and **fires** for an entry declaring `require` with
   a `.d.mts` declaration over a `.cjs` target. Both in one test or two; each with a firing control.
8. The guide sentence describing the assertion states the declared-claim bound.
9. Name each test for what it proves, never for this brief's labels.

## Owned files

`src/core/templates.ts`, `tests/src/core/templates.test.ts`, `guides/scaffold.md`, `host.json`.

## Off-limits

`.agents/`, `src/core/compilers.ts`, `src/bin/CLI.ts`, `ROADMAP.md`, `tests/distribution.test.ts`,
`tests/guides.test.ts`, everything under `.orkestrel/`.

## Execution and probes

Probes only under `tmp/fix-t/`, never inside `tests/` except the owned test file. Delete before
returning. No tree-wide gate. Scope every run.

Your sandbox denies a grandchild process, a nested install, a loopback listener, and `.agents/` writes.
Report such a reading as an observation with the exact command; never substitute the reachable half.
**Check that every control you write can actually fail** — a control that cannot fire proves nothing.

## Deviation contract

Stop and report if the bound cannot be expressed without touching `required` or a file you do not own.

## Output

- T1: the predicate, and the indexeddb shape shown silent beside the declaring shape shown firing.
- Both firing-control transcripts.
- The guide sentence.
- The gate results in order with real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
