# Audit brief — A.3 over A.1 `d7n-abort-prep` and A.2 `d7n-abort-converge` (the fleet pilot)

## Lanes

Three lanes, blind to each other, clean contexts, one brief. The dispatch names which you hold:

- **Subjective lane** (`reviewer`, Opus 5): abort's guide and README as a reader meets them — the cells, the `Shape` column beside the new `Summary`, the noun-phrase pitch and the opening prose that took the displaced sentences, the titled block under `createAbort`, the `### Classes` heading — and whether the pilot's shape is the one every fleet package can copy.
- **Objective lane** (`reviewer`, Opus 5 — the recorded substitution for the dark Sol bench): what the readers and the gate permit — every table the readers compare heads `Summary`, no fact a cell carried was dropped when its clause moved into the block, the pair equal in body and language, the gate cases in the drop-in's own header with red-first readings that bind, the pin's local predicate, the drop-in's record adaptation exact at every site, no doc block changed outside its paragraph, remarks, or example, and every reader or seed defect the report names ruled on its evidence (the guide's release waits on that ruling).
- **Checker** (`checker`, Sonnet): the mechanical claims — the repair list, the adaptation sites, the header set, the row placement, the pair, the pitch equality, scope honesty, the gate readings quoted from runs, the count ban over both reports.

You run no command and edit nothing. Read the actual diffs and status files first, then the reports, then the tree.

## Evidence

- A.1: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-abort-prep-brief.md`, `d7n-abort-prep-report.md`, `d7n-abort-prep.diff.txt`, `d7n-abort-prep.status.txt`, `instruments/d7/a1/` (the head start and the lockfile logs); committed as `7d8b1dd` on abort's branch.
- A.2: `d7n-abort-converge-brief.md`, `d7n-abort-converge-report.md`, `d7n-abort-converge.diff.txt`, `d7n-abort-converge.status.txt`.
- The plan: `d7-fleet-plan.md` rulings 2 to 5, 7, 10; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P19.
- The tree at `/home/user/fleet/abort` (A.2 committed over `7d8b1dd` as the branch tip; read files, run no command): `guides/abort.md`, `README.md`, `src/core/**`, `tests/guides.test.ts`.
- The reference shapes at the guide's `c25c689`: `/home/user/fleet/guide/tests/guides.test.ts:94-127`, `:196-204`; `/home/user/fleet/guide/guides/guide.md:1-24`, `:202-213`; `/home/user/fleet/guide/README.md:1-12`.
- Rules: `/home/user/scaffold/AGENTS.md` § Writing; `.claude/rules/documentation.md` § Parity; `.claude/rules/tests.md`.

## Numbered falsifiable claims

A.1:

1. Commit `7d8b1dd` changes exactly the P19 repair list, `tests/guides.test.ts`, `tests/src/core/Abort.test.ts`, `package.json` (the `docs` script row and the version), and `package-lock.json` (the root version and the dropped `vite-plugin-dts` subtree); no `@orkestrel/*` range moved.
2. Every `findMissing` and `findUnexampled` call in `tests/guides.test.ts` passes names — each `MethodEntry` and `SourceExample` record mapped to its `name` — and no case's meaning changed; `test:guides` reads 22 passed.
3. The voice site is the brief's edit and no other comment moved.

A.2:

4. Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`: the Factories, Helpers, Validators, and Classes tables `API | Kind | Summary`, the Types table `Type | Kind | Shape | Summary`, the Methods table `Method | Returns | Summary`; `### Entities` became `### Classes`.
5. Every `Summary` cell equals its doc block's description paragraph in the compared form; each Types row's literal stayed in `Shape` and its clause reached the block verb-first; the report names each block rewritten by hand, and no fact a cell carried before A.2 is absent from both its data column and its block after it.
6. Exactly one `@example` is titled, on `createAbort`, with the flattened text of a heading that occurs once, and its body and language equal the fence under that heading; the body carries neither a three-backtick run nor `*/`.
7. The H1 blockquote of `guides/abort.md` and the blockquote under `README.md`'s H1 are one noun phrase with the same line breaks and no link; the displaced sentences sit in the guide's opening prose; the README's onboarding stays.
8. `tests/guides.test.ts` carries the equality case inside the manifest loop's `describe` block, the pin at file scope in the both-sides `string[]` form with a local type predicate, and the README case with two `not.toBeUndefined()` guards; the report records each read red on the unconverged tree with its failing lines, and green after.
9. No doc block under `src/core/**` changed outside its description paragraph, its `@remarks`, or its `@example` title and body; no code token moved.
10. Scope honesty: A.2's diff and status list only `guides/abort.md`, `README.md`, files under `src/core/**`, and `tests/guides.test.ts`.
11. The report's gate readings — `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; the scoped format and lint, `check`, `test:guides`, `test:policy` green — are quoted from runs the report names; every `docs` reading shows a non-zero `rows read`.
12. Report honesty: every `file:line` citation in both reports matches the tree it describes, and neither report states a count in prose.
13. Every reader or seed defect the pilot's report names is real on its evidence, or the report names none; rule each one as blocking the guide's release or not.

## Output

Per claim: PASS, FAIL, or CANNOT RULE with the evidence. Then findings outside the claims, each with what right looks like. Close with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Open with `Lane held: <lane>` as the very first line. No process diary. Perform the assignment directly and spawn nothing.
