# FIX-E — bring the guide back to what the package now does

## Role and engine

`implementer`, Opus 5. Documentation voice is the subjective work class.

## Objective

Correct every false statement a three-lane adversarial audit found in `guides/scaffold.md`, and
document the two behaviours the fix round added that the guide does not yet record.

This file is **vendored** and mirrored into every workspace in the fleet, so a false sentence here
ships 48 times.

## Read first

- `.orkestrel/campaign/audit-v50-final-reconciliation.md` — the round and its rulings.
- `.orkestrel/campaign/fix-b-report.md`, `fix-c-report.md`, `fix-d-report.md` — each carries drafted
  replacement text for the passage it made false. Use those drafts as the substance; the voice is
  yours.

## What is false, and who found it

**1. "The one proof scaffold writes" — false, and the contradiction is adjacent.** The subjective
lane counted four kinds of test file scaffold writes into a `src: ['core']` plan:
`tests/src/core/index.test.ts` at birth/template, `tests/distribution.test.ts` at presence/template,
and `tests/policy.test.ts` and `tests/config.test.ts` at presence/host. The guide says the
distribution proof is "the one proof scaffold writes" at four places, and three paragraphs above one
of them it says scaffold content-owns `tests/policy.test.ts` and `tests/config.test.ts` and restores
them. Both files open with `describe` and assert real properties, and the guide calls test files
"proofs" everywhere else, so no charitable reading rescues the sentence.

The distinction the rule actually rests on is **generation**, not writing: the distribution proof is
the one scaffold **generates from the workspace's own shape**, and the one test artifact it claims by
presence. The vendored proofs are byte-copied, not derived. Say that.

**2. "Every setup module scaffold seeds is empty" — false.** `ARTIFACT_TEMPLATES.tests.global` seeds
`export function setup(): void {}`. `fix-c-report.md` carries the replacement for both the long
paragraph and its short form later in the file, including the seed-relative comparison and the
per-module pairing.

**3. The categorical setup sentence asserts a whole space from one sample.** The guide states that a
setup proof's assertions "derive from nothing scaffold can read". The design round measured exactly
one candidate — per-export reference coverage — found it red fleet-wide, and generalized. A lane then
produced a different candidate, measured green across every checkout. The ruling that scaffold does
not generate a setup proof **stands**; the sentence claiming nothing derivable exists does not.
Narrow it to what was measured: a setup proof's assertion about **what those helpers do** derives
from nothing scaffold can read.

**4. The presence-ownership table omits the mechanism a core-only caller meets most.** The guide
introduces presence ownership with "a reader needs to know which applies" and then lists verb-owned,
workspace-owned, and plan-owned. A pure-core plan narrows every unhydrated host artifact to
presence — 32 of 43 artifacts in a measured `src: ['core']` plan, including `AGENTS.md`,
`.claude/settings.json`, and the vendored proofs. The reason is sound and documented on `HostArtifact`
itself, but the word hydration appears in the guide once, in a table row. A consumer reading
`ownership === 'presence'` for `AGENTS.md` concludes scaffold never replaces its bytes and is wrong.
Add the missing row.

## What is now undocumented

**5. The generated proof partitions the exports map.** Every published subpath lands in driven,
undeclared, or excluded, with a totality assertion over all three. `fix-b-report.md` carries the
drafted paragraph.

**6. A core-only proof reddens on a browser face published later.** Same draft.

## Unknowns

Whether any other guide under `guides/` states something this chain falsified. The others are
vendored mirrors of sibling packages describing their own files; check and report rather than
assuming.

## Scope

**Owned:** `guides/scaffold.md`, `guides/README.md` if it states something now false, and `host.json`
only through regenerating it with the project's scripts.

**Off-limits:** everything under `src/`, `tests/`, `configs/`, `.claude/`, `.agents/`,
`vite.config.ts`, `package.json`, `.orkestrel/`. This unit changes prose and tables, not code. Record
a code defect against its file and line; do not fix it.

## The vendored-file order, which has already cost this campaign one red gate

`guides/scaffold.md` is vendored: `host.json` declares it and `dist/host/guides` ships it. Editing it
restales the inventory and `readHostFloor` then refuses to hydrate, turning the whole `src:server`
suite red. **Regenerate before running any gate that reads the inventory:**

```text
npm run build && npm run build:inventory
```

`npm run build` already invokes `build:host`; a second invocation fails on a non-vacant staging root,
which is expected.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Where a paragraph sits, which heading a
section takes, and how a sentence is worded are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so the regeneration precedes every gate that reads the generated artifact.

1. `npm run format:check` exits 0.
2. `npm run build && npm run build:inventory` exit 0, and `host.json` shows the guide's digest and
   the inventory digest moved.
3. `npm run test:guides` exits 0. No symbol row is removed; parity checks symbol coverage, so a
   deleted row fails it.
4. `grep -rn "the one proof scaffold writes\|every setup module scaffold seeds is empty\|Emptiness is the whole rule" guides/`
   returns nothing.
5. The guide states the generation-versus-copying distinction, the seed-relative setup comparison
   with per-module pairing, the narrowed categorical sentence, the missing presence-ownership row,
   the partition, and the browser guard. Quote each in your report.
6. `npm run lint:check` and `npm run check` exit 0.
7. `npm test` exits 0. If it fails, run each link of its `&&` chain separately and report every one.

## Review evidence

Return the actual `git diff --stat` and `git status --short`.

## Output

Return, with no process diary: the diffstat and status; one line per criterion with its exit code or
evidence; the six passages quoted; the unknown answered; and anything you could not close, named.
