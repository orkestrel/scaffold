# TSDoc voice wave brief (shared, runs last)

## Role and engine

You are the Opus 5 `implementer` for one package's TSDoc voice unit. You perform the assignment
directly and spawn nothing.

## Objective

Migrate every TSDoc block in the package's published source to the rule's voice, and nothing
else: the first sentence states what the symbol does in the third person with an `-s` verb and
never repeats the symbol's name; a boolean `@returns` reads `True if …; false otherwise`. The
user ruled this migration on 2026-08-28 as the final fix wave.

## The rule, quoted

`.claude/rules/typescript.md` § Comments and API documentation: "The first sentence states what
the symbol does in the third person with an `-s` verb — `Creates`, `Returns`, `Checks whether` —
and never repeats the symbol's name." and, for a boolean return, the `@returns` form
"True if …; false otherwise". Read the section in your repository before editing; the vendored
copy is authoritative for that repository.

## Context

- Your launch prompt names the package and its repository path. The fleet-wide measurement that
  grounded the ruling: doc blocks on exported symbols read imperative (`Create`, `Determine`,
  `Build`, `Narrow`) far more often than third-person; a second variant states no verb at all.
  `.orkestrel/campaign/fix/tsdoc-wave.md` in the scaffold checkout lists the lines the audit
  enumerated for msg, process, brief, abort, emitter, ndjson, timeout, budget, pool, tool, sse,
  sqlite, and ollama; the wave sweeps every package, not only the listed lines.
- Population: every `/** … */` block attached to an exported declaration (functions, classes,
  interfaces and their members, type aliases, constants, enums, overload signatures) and to
  class members (`#` privates included) under `src/` and `app/`. Leave `tests/`, guides, and
  non-TSDoc comments alone.
- Transform rules:
  - Imperative first sentence → third-person `-s` form: `Create a handle` → `Creates a handle`;
    `Determine whether` → `Determines whether`; `Build`, `Narrow`, `Compile`, `Decode`, `Read`,
    `Resolve`, `Validate and normalize` → `Builds`, `Narrows`, `Compiles`, `Decodes`, `Reads`,
    `Resolves`, `Validates and normalizes`.
  - A first sentence with no verb (a bare noun phrase) gains one: `The parsed root.` →
    `Holds the parsed root.` for a property, `Represents …` for a type or interface,
    `Names …` for a literal-union member or constant.
  - A first sentence that repeats the symbol's name is reworded so the name goes.
  - A boolean `@returns` in any other wording (`Whether the value is …`, `` `true` when … ``)
    → `True if …; false otherwise`, keeping the condition's substance.
  - Change the first sentence and the boolean `@returns` line only. Leave `@remarks`,
    `@param`, `@throws`, `@example`, and every later sentence untouched, even where their voice
    differs; they are outside this wave.
  - Keep every code token, link, and backtick exactly as it was.
- Blocks the rule already satisfies stay untouched. Do not "improve" a sentence that is already
  third-person.

## Scope

- Owned: `src/**` and `app/**` TSDoc text in your repository.
- Off-limits: code (any non-comment token), `tests/**`, `guides/**`, `package.json`, lockfiles,
  every vendored instruction and policy file (`AGENTS.md`, `.claude/**`, `.agents/**`,
  `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`), and every file outside your
  repository. Where a guide quotes a TSDoc sentence verbatim and a parity test pins the quote,
  stop and report that pair in `deviations` rather than editing the guide.
- Do not commit, push, stage, or run a `git` command that discards changes.

## Execution

Sweep file by file. Use a search to enumerate candidate blocks (`/\*\*` followed by an
imperative leading word) rather than reading every file top to bottom, then read each hit in
context before rewriting it. After the sweep, run the full gate chain from the repository root:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

If `format:check` fails on files you touched, run `npm run lint` then `npm run format`, then
re-run the non-mutating chain. A gate failure you can attribute to a guide parity test quoting a
rewritten sentence is the deviation named under Scope.

## Deviation contract

Stop and report through `deviations` when a rewrite would change meaning, when a guide parity
test pins a sentence you must change, or when the gate chain fails for a cause you cannot
attribute. Wording choices within the rule are yours: decide, continue.

## Output

Return the structured report the launch schema requires: the count of blocks rewritten by kind
(first sentence, boolean returns, verbless), the files touched, gate results, and deviations.

## Acceptance criteria

- A search for exported-symbol doc blocks whose first word is imperative returns no hits in
  `src/` and `app/`.
- No code token changed: `git diff` shows changes inside comment text only.
- The gate chain ran and each result is recorded.
- The tree is uncommitted.
