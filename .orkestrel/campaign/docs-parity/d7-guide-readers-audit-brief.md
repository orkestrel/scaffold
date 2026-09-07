# Audit brief — round R1 over U0 `d7-guide-headstart` and U1 `d7-guide-readers`

## Lanes

Three lanes, blind to each other, clean contexts, one brief. The dispatch names which you hold:

- **Subjective lane** (`reviewer`, Opus 5): the shape and voice of the widened contract — the `examples` overload paragraphs, the `extractExamples` doc block, the guide sentences — and whether the axis "declaration head against member" reads as one concept in every place it is stated.
- **Objective lane** (`reviewer`, Opus 5 — the recorded substitution for the dark Sol bench): the correctness of the reader change against the key grammar, whether the controls exclude what they claim to exclude, whether the red-first run binds to the widening, whether the `locateComment` and `replaceExample` case proves the seed's `--to source` reach, and whether U0's vendored delta is exactly the measured one.
- **Checker** (`checker`): the mechanical claims — scope honesty from the diff and status, the gate readings from the logs, the P15 list against the commit, the version literal, and the writing rule's count ban over both reports.

You run no command and edit nothing; rule from the evidence named here. Read the files the Orkestrel falsification skill names for a code change: the actual diff and the actual status output, then the report, then the tree.

## Evidence

- U0: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-headstart-brief.md`, `d7-guide-headstart-report.md`, `instruments/d7/u0/u0-headstart.log.txt`, `u0b-headstart.log.txt`, `u0-headstart.sh`, `u0b-headstart.sh`; the commit `cfa1f73` in `/home/user/fleet/guide` (`git show --stat cfa1f73` is recorded in the successor log; read the tree, not git).
- U1: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-readers-brief.md`, `d7-guide-readers-report.md`, `d7-guide-readers.diff.txt` (the actual `git diff` after the unit returned), `d7-guide-readers.status.txt` (the actual `git status --short`).
- Measurements: `orchestrator-measurements.md` § P15 (the repair delta list; the fleet sweep) and § P16.
- The tree: `/home/user/fleet/guide` at the unit's return (uncommitted U1 edits over `cfa1f73`): `src/core/helpers.ts`, `src/core/types.ts`, `src/core/sources/Source.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/sources/`, `guides/guide.md`.
- Rules: `/home/user/scaffold/AGENTS.md` (§ Writing: never state a count), `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.

## Numbered falsifiable claims

U0:

1. Commit `cfa1f73` changes exactly the P15 list (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, `scripts/docs.ts`) plus the three site files (`tests/fixtures/broken/missing-example/module/helpers.ts`, `tests/fixtures/good/tests/widget.test.ts`, `tests/setup.ts`), and no `@orkestrel/*` range in `package.json` moved.
2. The site fixes are the brief's: the `greet` block gains `Greets \`name\`.` and a blank continuation line before `@example`; `Dummy` becomes `Placeholder`; `Require markdown` becomes `Requires markdown`. The `missing-example` fixture still exampled `greet` and not `farewell`.
3. `version` is `0.0.18`, and `package.json:3` was the only tracked site of `0.0.17` (P15).
4. The gate readings in the logs are green as the report states, and re-running only `format:check`, `lint:check`, and `check` after the one-line comment fix in `tests/setup.ts` was sound (the first run's `test:policy`, `test:config`, and `build` cannot move on a comment line).

U1:

5. `extractExamples` collects the `@example` blocks of every head key `collectKeys` reports (a key without `.`), names each from the text past the keyword and its one space, and skips member keys and comments attached to no key. The tests carry the controls the brief names: an untitled class head collected with `title` absent, a member block absent from `extractExamples` and present in `extractExampleMethods`, a `type` head and an `interface` head each collected.
6. The red-first run is recorded with its failing count, the failing case is the titled class-head expectation, and the same command reads green after the change.
7. `findDrift` reports a titled class-head block against a same-titled fence with a differing body and reports nothing when the bodies agree, proven by a case built from inline text.
8. `locateComment(text, 'class Widget')` locates the head's block and `replaceExample` rewrites it, proven by a case, so the seed's `--to source` reaches a head that is not a function.
9. Both `SourceInterface.examples` overload paragraphs, the `extractExamples` doc block and its executed example, and the `#scanExamples` comment state the widened reach verb-first, and the no-argument overload's paragraph — the compared text — describes the widened population without naming the `name` overload.
10. The guide rows for `extractExamples` and `examples` and the sentences at the former `:424`, `:433`, `:466` read true of the widened readers; the EQ row states the reach (a head's own block or a member's block, paired by title; an untitled block presence evidence alone); the dedupe limit (a `type` and a `const` sharing a name contribute the first titled block) sits in § The extraction model; the EX row and every table header are unchanged.
11. Scope honesty: the diff and status list only the owned files (`src/core/helpers.ts`, `src/core/types.ts`, `src/core/sources/Source.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/sources/**`, `guides/guide.md`), and no vendored file, `README.md`, `tests/guides.test.ts`, `tests/setup.ts`, `package.json`, or `tests/fixtures/**` moved.
12. The report's gate readings — `format:check`, `lint:check`, `check`, `test:src:core`, `test:guides` green; `npm run build && npm run docs` at `rows read: 1, disagreements found: 139` — are quoted from runs the report names.
13. Report honesty: every `file:line` citation in both reports matches the tree it describes, and neither report states a count in prose (AGENTS.md § Writing; a number reported with the run that produced it is a value).

## Output

Per claim: PASS, FAIL, or CANNOT RULE, each with the evidence (`file:line` or the log line). Then findings outside the claims, each with what right looks like. Close with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Open with `Lane held: <lane>`. No process diary. Perform the assignment directly and spawn nothing.
