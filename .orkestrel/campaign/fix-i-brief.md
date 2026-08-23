# FIX-I — the guide states what the classifier and the advisory now do

## Role and engine

`implementer`, Opus 5. Documentation voice is the subjective work class.

## Objective

Correct every guide statement the successor round falsified, and record the boundaries the fix
round settled. `guides/scaffold.md` is **vendored** and mirrored into every workspace in the fleet,
so a false sentence ships 48 times.

## Read first

- `.orkestrel/campaign/audit-successor2-reconciliation.md` — the round and its rulings.
- `.orkestrel/campaign/fix-g-report.md` and `fix-h-report.md` — each ends with the boundary it
  settled and what the guide must now say.

## What is false

**1. The bundler claim.** The guide says a core-only workspace "declares neither the launcher nor
the bundler" the browser branch imports. Measured: `vite` is declared in **every** workspace,
core-only included, and the real `abort` checkout declares it. What actually blocks unconditional
emission is the absent `configs/browsers.ts` — not planned for a core-only workspace — and the
undeclared `playwright` and `@vitest/browser-playwright`. The ruling's outcome survives; its reason
of record does not, and a reason of record is what the next maintainer reasons from.

**2. Three sentences the previous fix round wrote**, each contradicted by the export-array probe:

- "Classification reads every target the entry names under any condition." An array-valued entry
  yielded no targets at all before FIX-G. State the rule as it now is.
- "Every published subpath lands in exactly one of driven, undeclared, or excluded … so a subpath the
  proof cannot classify reddens instead of disappearing." Say what the partition now guarantees,
  including the set FIX-G added.
- "It is undeclared when it resolves no declaration." A `require`-only subpath that **did** resolve a
  declaration was reported undeclared before FIX-G.

**3. The runtime-target boundary.** The guide says a runtime target is "a `.js`, `.mjs`, or `.cjs`
file". FIX-G re-keyed it: a target is code when its **own file name** carries no extension, or
carries a JavaScript one. An extensionless target loads through `require`; a `.wasm` asset does not,
because it has an extension that is not JavaScript. Reading the basename rather than the whole path
is load-bearing — `./dist/bundle.js/feature` is a module.

State what the rule excludes, which FIX-G recorded honestly: an extensionless file published for a
reader reddens. That is the safe direction and unreachable in every real manifest measured.

**4. Trimmed text, not bytes.** The guide says the setup question fires when a module's **bytes**
differ from its seed. The implementation compares **trimmed** text, which is the right behaviour — a
trailing newline is not authorship — so the guide is what must change.

**5. "Setup helpers", not modules.** `guides/scaffold.md:644` says the question lists "packages whose
setup **helpers** no proof covers". That carries the same export-flavoured over-assertion FIX-H just
removed from the message itself; the predicate's population is setup **modules**.

## What is now undocumented

- A declaration resolves through `['types','import']` and then `['types','require']`, iterating
  rather than coalescing.
- A subpath resolving a declaration but **neither** an `import` nor a `require` target is named by
  the partition claim rather than counted as driven.
- The `./*` subpath pattern reddens rather than being excluded, deliberately: excluding it would
  account for a whole family and never measure it. Say so, so a maintainer meeting the red knows it
  is the honest answer rather than a bug.

## Unknowns

Whether any other guide states something this chain falsified. Check and report; the siblings are
byte-copy mirrors of their own packages and `.claude/rules/documentation.md` forbids rewriting one in
place.

## Scope

**Owned:** `guides/scaffold.md`, `guides/README.md` if it states something now false, and `host.json`
only through regenerating it with the project's scripts.

**Off-limits:** everything under `src/`, `tests/`, `configs/`, `.claude/`, `.agents/`,
`vite.config.ts`, `package.json`, `.orkestrel/`. Record a code defect against its file and line; do
not fix it.

## The vendored order, which has already cost this campaign two red gates

Editing this file restales `host.json`, and `readHostFloor` then refuses to hydrate, turning the
whole `src:server` suite red. **Regenerate before every gate that reads the inventory:**

```text
npm run build && npm run build:inventory
```

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Placement and wording are yours to
settle, record, and carry on from.

## Acceptance criteria

Ordered so regeneration precedes every gate that reads the generated artifact.

1. `npm run format:check` exits 0.
2. `npm run build && npm run build:inventory` exit 0, and `host.json` shows both digests moved.
3. `npm run test:guides` exits 0. No symbol row is removed.
4. `grep -rn "declares neither the launcher nor the bundler\|setup helpers no proof covers" guides/`
   returns nothing.
5. Each of the five false statements is corrected and each of the three undocumented facts is
   stated. Quote all eight in your report.
6. `npm run lint:check` and `npm run check` exit 0.
7. `npm test` exits 0. If it fails, run each link of its `&&` chain separately and report every one.

## Review evidence

Return the actual `git diff --stat` and `git status --short`.

## Output

Return, with no process diary: the diffstat and status; one line per criterion; the eight passages
quoted; the unknown answered; and anything you could not close, named.
