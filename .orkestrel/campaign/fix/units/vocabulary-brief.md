# Unit vocabulary — land the breaking phase's naming rulings in `.claude/rules/names.md`

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

`.claude/rules/names.md` in the scaffold repository states, as directives an agent can act on, the
project-wide meaning of every helper prefix the breaking phase uses, and the rule for an option
key, constant, or member that mirrors an external protocol field, format field, or engine pragma.
The file stays one home for each rule, its existing structure stands, and the policy sweep stays
green.

## Context

**Evidence.** The file: `/home/user/scaffold/.claude/rules/names.md`. Its § Standalone helpers
(line 83) already fixes `extract*`, `infer*`, `compute*`, and `matches*` in one sentence at line 91;
its § Fixed derivation/construction forms (line 152) fixes `is*`, `parse*`, and `create*`; its
§ General vocabulary (line 94) already keeps external-spec literals as unions at line 105; its
§ Rejected naming (line 201) lists the generic words. The rulings this text must carry, decided in
`/home/user/scaffold/.orkestrel/campaign/fix/breaking-plan.md` § Rulings on the lanes'
disagreements and § Naming and shape rulings:

- Prefix meanings, each one sentence, each a directive: `build*` constructs a composite value from
  parts and reads no host; `read*` obtains a value from a live host object, a stream position, or a
  byte layout, returns it or throws, and never coerces (coercion to `T | undefined` is `parse*`);
  `resolve*` picks the effective value from options and defaults; `scan*` walks a structure and
  returns its findings; `describe*` renders a finding as a human-readable message; `normalize*`
  returns the canonical form of a value of the same type; `collect*` gathers members into a
  collection; `render*` produces text or markup from a value; `supports*` is a capability predicate
  that narrows no type, because `is*` is reserved for a total guard.
- The external-mirror rule: an option key, constant, or member that transliterates an external
  protocol field, format field, or engine pragma keeps the external wording in this project's
  casing, and its TSDoc names the source it mirrors. The rule never licenses a word this project
  bans outright: `kind` and `type` as member names, and the § Rejected naming generic words.
  Examples the rule decides: `foreignKeys` mirrors `PRAGMA foreign_keys`; `keepAlive` mirrors the
  Ollama `keep_alive` field; a CFB directory entry's object-type byte does not keep `type`.

**Law.** `AGENTS.md` § Writing and § Instruction files (every line a directive; name the trigger
and the action; no count; one home per rule; keep an example only where it disambiguates);
`.claude/rules/writing.md`; `.claude/rules/documentation.md` § Workflow skills does not apply. The
existing file's own conventions: bullet directives under `##` headings, code tokens in backticks
followed by a noun.

**Host.** Linux, bash. Repository `/home/user/scaffold` on branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed.
`.claude/rules/*` is scaffold's published host inventory (`dist/host`), so this edit moves
scaffold's published surface and a scaffold bump is owed at the next release; you do not bump.

**Measurements.** `npm run test:policy` is the vitest `policy` project; it proves every rule file
has a rule-map row and sweeps instruction files. `npm run format:check` covers Markdown through
oxfmt.

**Control identifiers.** none.

**Standing conditions.** `.orkestrel/**` and `tmp/**` in this repository are the Orchestrator's
campaign record and are off-limits. No other writer is live in this checkout.

## Unknowns

Whether a test in `tests/` pins the content or digest of `.claude/rules/names.md`. Run
`rg -l 'names\.md' tests src` first; run every test project a hit belongs to, and report the
hits.

## Scope

**Owned.** `.claude/rules/names.md`.

**Shared (report-only).** none.

**Off-limits.** Every other file: `AGENTS.md`, every other rule file, `src/**`, `tests/**`,
`guides/**`, `package.json`, `package-lock.json`, `.orkestrel/**`, `tmp/**`, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. No tree-wide `format`; run the non-mutating checks only.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Extend the line-91 sentence
in § Standalone helpers into a list carrying every prefix (the existing four and the new ones),
one directive per prefix, so the prefix vocabulary has one home; leave § Fixed
derivation/construction forms as it is. Add the external-mirror directive to § General vocabulary
beside the existing external-spec-literal line. Write no rationale a person would need to be
persuaded; write the trigger and the action. Then run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

plus any test project the Unknowns sweep names.

## Output

Return, as data: the exact added or changed lines, verbatim, as a fenced Markdown block (the
Orchestrator quotes them into every later brief); the Unknowns sweep hits and the projects run;
each command with its exit code and an excerpt for any failure; `git diff --stat` and
`git status --short`. Delivered as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the policy sweep rejects the added text, when a rule you are told to add
contradicts a directive already in the file, or when a test outside your scope pins the file's
content. Decide, record, and carry on from the placement of a bullet within its section and the
wording of a directive.

## Acceptance criteria

1. `rg -n 'build\*|read\*|resolve\*|scan\*|describe\*|normalize\*|collect\*|render\*|supports\*' .claude/rules/names.md` returns one directive per prefix, all in § Standalone helpers.
2. `rg -n 'mirror' .claude/rules/names.md` returns the external-mirror directive in § General vocabulary, naming `kind`, `type`, and the § Rejected naming words as never licensed.
3. No numeral that counts a set appears in the added text.
4. `npm run format:check`, `npm run lint:check`, and `npm run test:policy` exit 0.
5. `git status --short` lists only `.claude/rules/names.md`.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
