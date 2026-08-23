# FIX-S — complete the ruling's realisation

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, `codex exec`, rooted at `/home/user/scaffold`,
sandbox `workspace-write`. Do the work yourself. Spawn nothing.

**Write limit, named before dispatch:** your sandbox refuses writes under `.agents/`. Nothing here
needs it.

## The ruling is not in question

Both audit lanes attacked FIX-R and **neither attacked the invariant**: compile membership comes from
the resolved declaration, runtime from the target. Every finding below is an incompleteness in
realising it. Do not revisit the ruling. Complete it.

## S1 — resolve the declaration as TypeScript does

**TypeScript performs extension substitution.** It finds a declaration adjacent to the runtime target
with no `types` condition at all. Reproduced by the Orchestrator with a control:

```text
  no types condition, adjacent index.d.cts present   accepts
  control: index.d.cts removed                       TS7016
```

Fixture: `{ ".": { "require": "./index.cjs", "import": "./index.mjs" } }`, `index.d.cts` beside
`index.cjs`, no `types` condition anywhere.

The shipped classifier reads only what `types` resolves, finds nothing, and sends the subpath to
`undeclared` — **a false red on a conventional package shape.** The ruling is right; its
implementation reads a subset of what TypeScript resolves.

Resolve the declaration the way TypeScript does: the `types` condition when present, and otherwise
the adjacent declaration the runtime target substitutes to — `.cjs` to `.d.cts`, `.mjs` to `.d.mts`,
`.js` to `.d.ts`. Then classify the **resolved** declaration's format, which is the ruling unchanged.

The objective lane also reported that a nested `.d.ts` was admitted when `package.json` was a
**directory**, where TypeScript inherited the outer module scope and produced TS1479. Settle that with
the rest.

## S2 — restore Node's real require conditions

Both lanes found this through different doors. The asymmetry is in the constants:

```text
1177:  module: ['node-addons', 'node', 'import', 'module-sync']   ← import side, full set
1183:  COMMONJS_CONDITIONS = ['node', 'require']                  ← require side, missing two
1585:  const required = resolveTarget(entry, COMMONJS_CONDITIONS) !== undefined
```

`COMMONJS_CONDITIONS` is TypeScript's set with `types` removed. It was correct for the job it held in
the previous revision and wrong for the runtime job this one gave it. Node's require resolver matches
`module-sync` and `node-addons` — measured earlier in this campaign against real packages, and again
by both lanes.

So a subpath Node reaches through `module-sync` or `node-addons` has `required` false, its runtime
drive never runs, and its published names are never compared against its declaration — while
`commonjs` is true, so the proof still asserts a typed consumer compiles against it. The proof states
half the CommonJS claim and drops the other half.

Restore `commonjs: ['node-addons', 'node', 'require', 'module-sync']` inside `RUNTIME_CONDITIONS`,
derive `required` from it, and delete `COMMONJS_CONDITIONS` — `required` is its only consumer.

**Bound:** `DECLARATION_CONDITIONS.commonjs` must keep omitting `module-sync`, or the
`module-sync`-first repair reverts. This is the runtime side only.

**This carries the false comment with it.** The comment above that constant claims it is "the
conditions Node's require resolver uses", which is why it is false today. Restoring the real set makes
the sentence true rather than needing a separate prose edit.

## S3 — the mirror assertion

`entry.commonjs` is a second filter in `selectEntries`, so a `.d.mts`-declared entry over a `.cjs`
target is dropped from the compile probe and the TS1479 the compiler would have reported lands
nowhere. The previous revision read the runtime target and reddened on it.

**Do not drop the filter.** It is what keeps a legitimately ESM-only subpath out of the CommonJS
probe, and removing it reddens every ESM-only workspace.

Add the mirror of `undeclared` beside the `unreachable` assertion: name every entry where
`required && !commonjs`. Those subpaths are require-loadable and CommonJS-untypable, which is the
defect class `undeclared` already reports. It is green for every scaffold-generated manifest and red
for exactly the withheld shapes.

## S4 — the guide

Document the substitution rule from S1 and the exact condition set from S2. One sentence added by the
last diff asserts every runtime driver's conditions are one of two named sets, and the require
driver's is neither. Repair it against what S2 leaves.

## S5 — fixture witnesses that discriminate

The staged-walk fixture cannot see three of the four booleans: every expected record carries
`browser: false`, `module: false`, `required: true`. Named mutations that break behaviour and leave
the assertion passing: replacing `required` with a constant; replacing the browser resolution with a
fixed `entry.import` lookup — **which was the previous round's own firing control, and now fires
nowhere**; and dropping the `.d.ts` guard from the declaration classifier.

Add witnesses that discriminate each: an ESM-only entry, an entry whose Vite-condition target sits
under the browser output prefix, an entry whose `require` condition resolves JavaScript with no
`types`, and branch-only `module-sync` and `node-addons` entries. Draw the control from **outside** the
population the fixture already covers.

## S6 — the campaign reports

`.orkestrel/campaign/fix-r-report.md` carries a banned `should`, counts over growable sets, and a
missing blank line before a thematic break that renders a paragraph as a heading — the same defect the
same commit repaired in the sibling file. Most of that prose is the Orchestrator's. Delete each count
rather than correcting it; name the members instead.

## Owned files

`src/core/templates.ts`, `tests/src/core/templates.test.ts`, `tests/guides.test.ts`,
`guides/scaffold.md`, `.orkestrel/campaign/fix-r-report.md`, `host.json` (regenerated, never
hand-edited).

## Off-limits

`.agents/` in every form, `src/core/compilers.ts`, `src/bin/CLI.ts`, `ROADMAP.md`,
`tests/distribution.test.ts`.

## Unknowns, named as unknowns

- Whether extension substitution applies inside a fallback array, and whether it applies when the
  `types` condition resolves a file that does not exist. Determine and say.
- The directory-`package.json` case the objective lane reported. Settle it.

## Execution and probes

Probes only under `tmp/fix-s/`, never inside `tests/` except the two owned test files. Delete before
returning. No tree-wide gate. Scope every run.

Your sandbox denies a grandchild process, a nested install, a loopback listener, and `.agents/` writes.
Eight times in this campaign a reported denial led to a host reading that found something. Report;
never substitute the reachable half.

**A probe that disables a diagnostic its own control depends on proves nothing.** The Orchestrator's
first substitution probe set `noImplicitAny: false` and suppressed the TS7016 the control needed.
Check that every control you write can actually fail.

## Acceptance criteria, in this order

1. `npm run build && npm run build:inventory`; `git diff --stat host.json` shows the digest moved.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over owned TypeScript exits 0.
3. `npx oxfmt --config .oxfmtrc.json --check` over owned TypeScript exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green by explicit project name,
   including the emitted-corpus oxfmt fixed-point test.
7. S1 has a test over the substitution fixture with a firing control that can actually fail.
8. S2 has a test proving a `module-sync`-only and a `node-addons`-only subpath are driven.
9. S3's assertion reds on a `.d.mts`-declared, `.cjs`-target entry and is green for a
   scaffold-generated manifest.
10. S5's witnesses discriminate each boolean; prove it by mutating each and showing the red.
11. Name each test for what it proves, never for this brief's labels.

Report any whole-suite or distribution-proof result as an OBSERVATION. The authoritative runs are the
Orchestrator's, including the indexeddb end-to-end proof.

## Deviation contract

Stop and report if S1 cannot be implemented without re-opening the ruling, or if a criterion needs a
file you do not own. Otherwise decide and carry on.

## Output

- S1: the resolution you implemented, the substitution table, and the fallback and directory answers.
- S2: the restored set and what it changed.
- S3: the assertion and its firing control.
- S4, S5, S6: what changed, with S5's per-boolean mutation transcripts.
- The gate results in order with real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
