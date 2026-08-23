# FIX-L — resolve every condition the driver resolves, and make the emitted prose describe it

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`, rooted at
`/home/user/scaffold` with sandbox `workspace-write`. Do the work yourself. Spawn nothing.

## Objective

The emitted distribution proof resolves an exports map under condition sets that are not the ones its
own drivers use, so for a common published shape it measures a branch no consumer loads. Fix the
condition model, then make the comments in that file describe the model it ends with.

## Why you

You wrote FIX-J and you found this in the audit of your own work — a defect that predates FIX-J and
that round 3 did not see. This is the repair.

## Context

`src/core/templates.ts` holds `ARTIFACT_TEMPLATES.tests.distribution`, a template string scaffold
writes into every target as `tests/distribution.test.ts`, where it runs against that package's packed
tarball. The helpers named below live inside that template string and are exported from nothing.
`tests/distribution.test.ts` in THIS repository is a different, bespoke proof — leave it alone.

Read before acting: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`,
`.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md`, and
`guides/scaffold.md`. No skill is named for this unit.

Host facts: Linux, 4 CPUs, Node v22.22.2, `engines.node` is `>=22.12.0`. `npm` is unauthenticated and
no step needs it. `tmp/` is untracked.

## L1 — the condition model

The proof resolves declarations under `['types','import']` and `['types','require']`, and runtimes
under `['import']` and `['require']`. A real consumer resolves more conditions than that. Reproduced
by the Orchestrator against the walkers copied verbatim from the template, using this legitimate
entry:

```js
{
  node: {
    import:  { types: './node.d.mts', default: './node.mjs' },
    require: { types: './node.d.cts', default: './node.cjs' },
  },
  default: { types: './default.d.ts', default: './default.js' },
}
```

```text
what the proof reads for the import declaration :  ./default.d.ts
what the proof reads for the require declaration:  ./default.d.ts
what the proof drives as the import runtime      :  ./default.js
what the proof drives as the require runtime     :  ./default.js

what a real Node ESM consumer loads              :  ./node.mjs
what a real Node CJS consumer loads              :  ./node.cjs
what a real TS nodenext consumer types against   :  ./node.d.mts
```

Every reading on the left is the `default` fallback. The proof therefore compares runtime names from
a file no Node consumer loads against a declaration no consumer types against, and reports green.

**The property to establish: each thing the proof measures is resolved under the same conditions as
the driver that measures it.** A Node ESM drive resolves what a Node ESM consumer resolves; a Node
CommonJS drive what a Node CommonJS consumer resolves; a browser drive and each compile probe
likewise.

**Design the shape yourself** — you found this and it is objective, constraint-heavy work. Two
constraints the audit already established, which you must honour rather than rediscover:

- Adding `node` to a single shared module field breaks browser resolution. The browser face is a
  different resolver with different conditions, and today `browser` is detected by output-path prefix
  rather than by condition; say what you do about that.
- A `require`-only subpath must keep resolving its types inside `require`. That was FIX-G's repair
  and it must survive.

**Stop and report rather than guessing** if the browser resolver's correct condition set is not
determinable from the code and from Node's and the bundler's documented behaviour. Naming the
unknown is worth more than a plausible set.

## L2 — the emitted comments, made true once

Both audit lanes broke FIX-J on comments describing mechanisms the same commit deleted. This is the
third instance in the campaign. Fix them **after** L1, so they describe the model you end with rather
than an intermediate one. Line numbers will move as you work — these are anchors by text, in
`src/core/templates.ts`:

- The `MODULE_EXTENSIONS` comment, "The extensions a JavaScript runtime loads a file as a module
  through" — gives `.node` no account, and a native addon is not loaded by a JavaScript handler.
- "in the order a declaration is looked for" — nothing is looked for in order any more.
- "the declaration its types condition names", singular — the field is per-format now.
- "its first resolving member wins" — after validation it is the first **valid** resolving member.
- "Every member of a fallback list is one of them: a reader that takes a later member takes a file
  this tree still owes" — validation removes the members Node refuses, so a reader never takes one.
- "Every other extension is an asset a consumer reads rather than imports … which is what separates a
  published `.wasm` from an extensionless module" — `.node` now sits on the other side of that line
  and the sentence does not say so.
- The `readDeclaration` comment, "read under each condition set a consumer's own TypeScript resolves
  types through … so the next set is read rather than that fallthrough returned" — that loop is gone.

Also in the emitted template, `.claude/rules/writing.md` § Code tokens, references, and links
forbids `above` and `below` as directional references. The emitted template carries several, at
"every claim below is read", "Every argument below is a literal", "the walkers below need", "each
drive below retires itself", and "below retire each matching Node drive". Fix every instance **inside
the emitted template**, because those ship into every target. Instances elsewhere in
`src/core/templates.ts` outside the template string are a recorded successor sweep — leave them.

## L3 — three structural findings in FIX-J's own new code

- `DECLARATION_CONDITIONS` is reached by index with unreachable defaults:
  `DECLARATION_CONDITIONS[0] ?? []` and `[1] ?? []`. Neither default can fire for the constant as
  declared, and if it ever shortened the branch would resolve nothing silently. L1 likely dissolves
  this; if any positional access survives L1, replace it with a shape keyed by what each set is for.
- The browser drive reads `entry.declaration.module` and throws when it is `undefined` **after**
  `launchBrowser` and `bundleEntry` have run — a full browser launch and a Vite build to report a
  fact the entry already carried. Move the guard ahead of that work.
- `driveModule` and `driveClassifier` in `tests/src/core/templates.test.ts` do one job by two
  mechanisms, both added or moved by FIX-J: one drives a lifted module in a real Node process over a
  JSON transport where an absent answer arrives as `null`, the other transpiles in-process and uses
  `undefined`. `driveModule`'s own comment claims every assertion after it reads `null`, which is now
  false. Consolidate to one, or state in the code why two are required. `driveClassifier` is also
  synchronous while every call site `await`s it inside an `async` callback FIX-J converted for that
  purpose — remove the ceremony or make the drive asynchronous.

## Owned files

- `src/core/templates.ts`
- `tests/src/core/templates.test.ts`

## Off-limits

- `guides/scaffold.md` — a subjective unit follows you and owns every guide sentence. Return the
  sentences L1 falsifies, with their text, as part of your report. Do not edit them.
- `src/core/compilers.ts`, `src/bin/CLI.ts`, `host.json`, `tests/distribution.test.ts`, and
  everything under `.orkestrel/`.

## Unknowns, named as unknowns

- The correct condition set for the browser resolver is not known to the Orchestrator. Determine it
  or report it as unresolved with what you tried.
- Which existing assertions L1 makes false is not known. Do not grep for them — RUN the suite and
  read the failures. Start with the project covering `tests/src/core/templates.test.ts`.

## Execution and probes

Probes go only under `tmp/fix-l/`, never inside `tests/`. Delete them before returning. Do not run a
tree-wide gate. Scope every run to a named vitest project or an explicit file path.

Your sandbox denies a grandchild process, a nested `npm install`, and a loopback listener. **That
denial hid a real defect from FIX-J**: its own scoped project run died `spawnSync EPERM`, it reported
the reading as an observation, and the host run then found an emitted artifact that was not
formatter-clean. Do exactly the same — report such a reading as an observation naming the exact
command, and the Orchestrator takes it on the host. Never substitute the reachable half.

## Acceptance criteria, in this order

1. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
2. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
3. `npm run check` exits 0.
4. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project
   name. **This includes the emitted-corpus oxfmt fixed-point test.** `oxfmt --check` on
   `src/core/templates.ts` does NOT cover the emitted file: the template is a string literal and the
   formatter does not reach into it. FIX-J shipped an unformatted emitted literal for exactly that
   reason.
5. L1 has a test proving the `node`-condition entry resolves what a real consumer resolves, with a
   firing control: revert the fix alone, show the test reds, restore it, show it greens. Record the
   exact commands and their real output.
6. Each of L3's three items is either closed or reported as deliberately not closed with the reason.
7. `.claude/rules/quality.md` § Instruments is satisfied for any control you add. Name a test for
   what it proves, never for the brief's label.

Report any whole-suite or distribution-proof result as an OBSERVATION with both readings. Your exec
is load, so a timing reading you take is not valid, and the authoritative run is the Orchestrator's
after you exit.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
if the browser resolver's conditions cannot be determined, if L1 cannot be done without editing a
file you do not own, or if L1 and L3 conflict. Do not investigate past that. Where a helper name sits
or how a comment is worded is yours to decide, record, and carry on from.

## Output

- L1: the model you chose, why, and what each driver now resolves under.
- The firing-control transcript for L1.
- L2: each comment, its old text and its new text.
- L3: each item, closed or not, with the reason.
- The `guides/scaffold.md` sentences L1 falsifies, with their text.
- Anything you could not close, named, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
