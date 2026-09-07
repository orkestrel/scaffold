# Unit D4 — scaffold-gate: the equality gate in scaffold's parity test and the rules that describe it

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit (Sol's by the plan's routing, run on Opus with the substitution recorded while the Codex bench is dark). Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Scaffold's own `tests/guides.test.ts` refuses the tree while a guide `Summary` cell, a titled example, or the README pitch disagrees with its source, through the readers `@orkestrel/guide` ships (`findDrift` and `tagline()`), and the rules that describe parity state the equality contract in one home. The gate lands red-first: scaffold's guide and README do not yet agree with its TSDoc, and the unit records the disagreement list as the failing-first evidence D6 closes.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md` (§ the guides project, the row table near line 55), `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md` § Instruments.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md`, `plan.md` (decisions 1 to 8 and every § Re-baseline), `d4-scout-distillate.md` (§ 1, § 5, § 6, § 7), `d1-guide-readers-report.md` § the transform, and `d2-guide-render-report.md` § The names.
3. The code: `tests/guides.test.ts` (the inventory at `:49-54`, the `inspected` records at `:62-73`, `describe('guides')` at `:75-198`), `README.md:1-8`, `guides/scaffold.md:1-8`, and the installed `@orkestrel/guide` declaration at `node_modules/@orkestrel/guide/dist/src/core/index.d.ts` (`findDrift`, `Drift`, `GuideInterface.tagline`).

## What is fixed

- **SQ, MQ, and EQ are one assertion per index row.** Inside `describe('guides')`, after `documents the members of every behavioural declaration`, add `it('keeps every compared summary and example equal to its source', …)` that collects `{ spec: entry.spec, drift }` for every `inspected` record whose `findDrift(guide, source)` is non-empty and asserts the collection `toEqual([])`, the way the file's other collectors assert. Import `findDrift` from `@orkestrel/guide` in the existing import list's order.
- **RQ is the tagline read on both files.** Add `it('opens the README with the guide tagline', …)`: `createGuide(readme).tagline()` over `files['README.md']` equals the `tagline()` of the record whose `entry.spec` is `guides/scaffold.md`, and neither is `undefined`. The README's pitch is therefore the blockquote under its H1, the same form the guide uses; D6 rewrites the README into that form, so this case is red until D6.
- **The rules state the contract in one home.** `.claude/rules/documentation.md` § Parity replaces the bullet `The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.` with these bullets, in this order:

```md
- A guide `Summary` cell equals its export's doc-block description paragraph after the compared
  form, a titled `@example` equals the guide fence under the heading of that title, and the README
  pitch equals the guide's tagline. `tests/guides.test.ts` asserts each through `findDrift` and
  `tagline()` from `@orkestrel/guide`; converge the two sides with `npm run docs`, never by
  weakening the gate.
- The TSDoc voice rule governs a doc block, and a `Summary` cell carries that block's description
  paragraph, so the same voice governs the cell. A guide tagline and a README pitch are noun
  phrases, and each is the blockquote under its file's H1.
```

  `.claude/rules/tests.md`'s `tests/guides.test.ts` row becomes `Every documented API exists, every public API is documented, every compared summary, example, and pitch equals its source, and every executable fence returns what the guide says it returns`. No other rule line moves; `AGENTS.md` § Documentation contract stays as it is.
- **The failing-first evidence.** Before the rule edits, run `npm run test:guides` and record the two new cases red with the drift list the first one prints (the `spec` and the `key` of every `Drift`, and which side is `undefined`), plus the README case's two readings. That list is D6's worklist and goes in the report verbatim.
- **Nothing converges here.** No guide cell, no doc block, no README line, and no fence changes in this unit.

## Standing conditions

- `@orkestrel/guide` in `node_modules` is the head start the Orchestrator installed with `npm install --no-save <guide.tgz>` from the guide checkout's landed tip, so `findDrift` and `tagline()` are present in `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`; confirm with `grep -n "findDrift\|tagline" node_modules/@orkestrel/guide/dist/src/core/index.d.ts` before editing, and stop if either is absent. Never `npm install`: it restores the registry copy over the head start.
- The tree is committed and clean apart from `tmp/` at dispatch; the Orchestrator's dispatch record names the tip.
- `.claude/rules/documentation.md` and `.claude/rules/tests.md` are vendored: `npm run build` regenerates `host.json` from them.
- `npm run test:guides` is red at the end of this unit by design (the two new cases), and every other project is green; `npm test` is red for that reason alone.
- Linux, bash, Node v22.22.2; the host's command classifier refuses `npx scaffold …`, and this unit needs no scaffold command.

## Scope

- Owned: `tests/guides.test.ts`, `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `host.json` (by regeneration alone).
- Off-limits: everything else — `README.md`, `guides/**`, `src/**`, `configs/**`, `tests/setup*.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `package.json`, `package-lock.json`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:policy`, `npm run build`, `npm run build:inventory`. Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Unknowns

- How many index rows `findDrift` reports on and what the keys are; the unit measures and records the list.
- Whether the mirror guides in the index (`guides/guide.md` and the other fetched mirrors) are index rows at all; the scout reads that only `guides/README.md`'s concept-index rows are inspected. Confirm from `parseManifest`'s rows in the test and record which rows the drift assertion covers.

## Acceptance criteria, cheapest first

1. `grep -n "findDrift\|tagline" tests/guides.test.ts` prints the import and the two cases.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:policy` exits 0 (the rule edits keep the sweep green).
4. `npm run build` exits 0; `sha256sum host.json` identical before and after a `npm run build:inventory` re-run.
5. `npm run test:guides` exits 1 with exactly the two new cases red and every other case green; the drift list is in the report.

## Output

Write `/home/user/scaffold/tmp/units/docs-d4-scaffold-gate-report.md`: each edit with `file:line`, the drift list verbatim (every `spec`, `key`, and absent side), the README case's two readings, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when `findDrift` or `tagline` is absent from the installed declaration, when a criterion needs an off-limits file, when `npm run test:guides` reddens any case other than the two new ones, or when a gate fails outside the owned files. Case wording beyond the two titles fixed here and the collector's record shape are yours to decide and record.
