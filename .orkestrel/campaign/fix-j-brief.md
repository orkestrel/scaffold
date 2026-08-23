# FIX-J — make the emitted proof resolve exports the way Node resolves them

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`. You are reading this
brief inside that CLI, rooted at `/home/user/scaffold`. Do the work yourself. Spawn nothing.

## Objective

The generated distribution proof resolves a package's `exports` map by rules looser than Node's, in
four places. Make each one match Node, and prove each with a control that fails when the fix is
reverted.

## Why you

You wrote FIX-G, which introduced two of these four. Round 3 broke them with executed controls, and
the Orchestrator reproduced one independently. This is the repair, not a re-litigation.

## Context

`@orkestrel/scaffold` 0.0.50 is a code-generation package. `src/core/templates.ts` holds
`ARTIFACT_TEMPLATES.tests.distribution` — a template string scaffold writes into every target
package as `tests/distribution.test.ts`, where it runs against that package's own packed tarball.
The helpers named below live inside that template string, so they are private to the emitted file
and exported from nothing. `tests/distribution.test.ts` in THIS repository is a different,
bespoke proof and does not carry these walkers; leave it alone.

Read before acting: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`,
`.claude/rules/tests.md`, `.claude/rules/quality.md`, and `guides/scaffold.md`. No skill is named
for this unit.

Host facts: Linux, 4 CPUs, other agents are working in this tree. `npm` is unauthenticated and no
step here needs it. `tmp/` is untracked.

## The four defects, with the evidence that established each

### J1 — a native addon is classified as an asset

`isModule` admits an extensionless name or a final extension in `MODULE_EXTENSIONS`
(`.js`, `.mjs`, `.cjs`). A `.node` target is a native addon that `require` loads through its
`dlopen` handler, populating `module.exports` — it is loaded for its names, which is the property
`isModule` exists to measure. Today it partitions to `excluded`, so a subpath publishing a `.node`
target with no declaration is silently accounted for instead of reported as `undeclared`.

Both audit lanes broke this. The objective lane loaded a real `lightningcss` `.node` addon and
observed `transform`, `transformStyleAttribute`, `bundle`, and `bundleAsync`, with a `.js` control
that made the classifier return `true`.

Fix: add `.node` to `MODULE_EXTENSIONS`. Keep `.json` and `.wasm` as assets — a JSON target is typed
from the file itself under `resolveJsonModule`, so no declaration is owed.

Verified by the Orchestrator, so you need not re-derive it: no package in the Orkestrel fleet
publishes a `.node` subpath, so this fix reddens no propagated target.

### J2 — a dual subpath's `require` declaration is never compiled against

`Entry` carries one `declaration`. `readDeclaration` returns the first of `['types','import']` then
`['types','require']` that resolves a declaration, so a subpath publishing BOTH `import.types` and
`require.types` yields the `import` one and the `require` one is checked for existence and never for
content.

The objective lane built a dual entry whose `require.d.cts` was missing, and a real Node16 `.cts`
consumer reported that `require.cjs` had no declaration — a diagnostic the proof did not surface.
Adding the file made it disappear, which is the control.

Fix: carry the declaration per format rather than one per entry. Resolve the `import` types and the
`require` types independently, keep both on the entry, and compile each format the entry actually
publishes against the declaration that format resolves.

### J3 — the CommonJS compile probe excludes every dual subpath

`src/core/templates.ts:1576` reads:

```ts
const written = stage.entries.filter((entry) => entry.module === module)
```

with `FORMATS` as `[['ts', true], ['cts', false]]`. So the `cts` probe selects entries whose
`module` is `false` — entries with no `import` target at all. A dual entry has `module === true` and
never enters the CommonJS probe, so neither that probe nor its absent-subpath control runs for it.

The asymmetry is visible one screen down: the CommonJS RUNTIME drive at
`src/core/templates.ts:1605` already reads `it.runIf(!entry.browser && entry.commonjs)`, which is
the correct discipline. The compile probe did not follow it.

Fix: select `.ts` entries by `entry.module` and `.cts` entries by `entry.commonjs`, and run each
populated format's control. J2 and J3 are one repair — a per-format declaration is what makes a
per-format probe meaningful — so take them together.

### J4 — the array walker takes a member Node skips

FIX-G added array handling to `resolveTarget` and `collectTargets`. Node's package-target rules
reject a member that does not begin with `./` and fall through to the next; the walkers take the
first member that resolves anything, unvalidated. Reproduced by the Orchestrator with a control
(`scratchpad/audit/r3/arraytarget/run.sh`), against
`{"exports": {".": ["../outside.cjs", "./valid.cjs"]}}`:

```text
=== what does NODE actually resolve for the array fallback? ===
{"from":"valid"}

=== what does the proof's resolveTarget pick? ===
  resolveTarget -> ../outside.cjs
  collectTargets -> ["../outside.cjs","./valid.cjs"]

=== CONTROL: a single valid target — do Node and resolveTarget agree? ===
  node -> {"from":"valid"}
```

So the proof reads its declaration, its browser face, and its `module` flag from a target Node never
loads, and `collectTargets` demands the invalid member exist inside the installed tree — a false red
against a package Node handles correctly.

Fix: validate a member against Node's package-target rules before selecting or inventorying it.

**Scope this precisely.** The fallthrough rule is specific to an ARRAY position: outside an array an
invalid target makes Node throw `ERR_INVALID_PACKAGE_TARGET`, which is a package defect the proof
must keep reporting rather than skip. Confirm that reading against Node's own behaviour before you
implement, and if it does not hold, stop and report rather than guessing which way to go.

## Owned files

- `src/core/templates.ts` — the distribution template only.
- `tests/src/core/templates.test.ts` — its unit tests, including `CLASSIFIER_CASES`.

## Shared, report-only — do not edit

- `guides/scaffold.md`. Its classifier prose becomes false as you land J1 and J2, and a separate
  subjective unit repairs it immediately after you. Return the exact sentences your change falsifies,
  with their line numbers, as part of your report. Do not edit them and do not regenerate `host.json`.

## Off-limits

- `tests/distribution.test.ts` (this repository's own bespoke proof — different instrument).
- `src/core/compilers.ts`, `src/bin/CLI.ts`, `host.json`, everything under `.orkestrel/`.

## Unknowns, named as unknowns

- **Which existing assertions your change makes false is not fully known.** The Orchestrator
  established that `guides/scaffold.md` contains no executed example reaching these helpers (they
  are exported from nothing), and that the `guides` vitest project runs only `tests/guides.test.ts`.
  Beyond that, do not grep for the assertions — RUN the suite and read the failures, per
  `.agents/orchestration.md`. Start with the narrowest project that covers
  `tests/src/core/templates.test.ts` and widen only as failures point you.
- Whether `CLASSIFIER_CASES` needs a `.node` row, a `.d.mts` row, or both is yours to decide from
  `.claude/rules/quality.md` § Instruments. Note that `isModule('./x.d.mts')` returns `false` today
  and that is correct — `.mts` is not in `MODULE_EXTENSIONS`; `.mjs` is.

## Execution and probes

Write probes only under `tmp/fix-j/`, never inside `tests/`. Delete them before you return. Do not
run a tree-wide gate — other agents are in this tree and a tree-wide result would report failures
nobody caused. Scope every run to a named vitest project or an explicit file path.

Your sandbox denies a grandchild process, a nested `npm install`, and a loopback listener. If a proof
needs one, do not work around it: report it as an observation naming the exact command, and the
Orchestrator takes that reading on the host.

## Deviation contract

A conflict with the objective stops you: if J4's array-position reading does not hold against Node,
or if a fix cannot be made without editing a file you do not own, stop and report — expected, found,
exact evidence, done or not done, at most one short hypothesis. Do not investigate past that and do
not alter the plan. Where a paragraph sits or which helper name reads better is yours to decide,
record, and carry on from.

## Acceptance criteria, in this order

Cheap non-timing gates first, so an expensive one cannot hide a cheap one.

1. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
2. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
3. `npm run check` exits 0.
4. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project name.
5. Each of J1, J2, J3, J4 has a test whose name states what it proves — never the control label from
   this brief — and each has a firing control: revert that one fix, show the test reds, restore it,
   show it greens. Record the exact commands and their real output for every one.
6. `.claude/rules/quality.md` § Instruments is satisfied for any control you add.

Report the whole-suite and distribution-proof results as OBSERVATIONS with both readings if you take
them; they are not criteria for you. Your exec is load, so a timing result you take is not valid, and
the Orchestrator takes the authoritative run after you exit.

## Output

- What changed, per defect, with file and line.
- The firing-control transcript for each of J1, J2, J3, J4.
- The exact `guides/scaffold.md` sentences your change falsifies, with line numbers.
- Anything you could not close, named, with the command that would settle it.
- Any claim of your own you would flag as weak.

No process diary.
