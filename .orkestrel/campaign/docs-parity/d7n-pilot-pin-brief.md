# Brief — `d7n-pilot-pin` (the pilot's drop-in gains the summary pin and the methods pin)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/abort` from its committed tip (clean; the final guide tarball `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-pilot-pin/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Non-negotiable rules, § Design laws, and § Writing; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13, § Ruling 20, and § Ruling 21 (the drop-in's canon: the pilot's bytes from `const root = ` through the manifest loop's closing brace are what every package copies); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` § The drop-in's summary pin; `/home/user/fleet/abort/tests/guides.test.ts` in full, with the case `pairs at least one example title across the guide and the source` as the model; `/home/user/fleet/abort/node_modules/@orkestrel/guide/dist/src/core/index.d.ts` for `GuideInterface` (`surface()`, `methods()`, `sections()`), `SourceInterface` (`surface()`, `methods(name)`), `SurfaceSymbol` (`summary?`), `MethodGroup`, `MethodEntry` (`summary?`), and `findDrift`'s `@remarks` (only a pair present on both sides is compared).

## The defect

The equality case asserts `findDrift` returns nothing. Nothing pins that it compared a non-empty summary population: renaming every `Summary` header retires that half of the gate with every case green (the P23b control G reddens the gate only because one table is renamed, not all). And a `## Methods` table with no ``#### `Interface` `` heading sits outside `guide.methods()`, so its rows never compare and nothing reports it.

## The unit

Add two cases to the pilot's drop-in, each in the form of the title pin (a loop, `continue` on an undefined side, the pair collected, one failure line naming both sides, `expect(...).toEqual([])`), and each placed inside the package-independent region so every package copies it unchanged:

1. **The summary pin** — `compares at least one summary across the guide and the source`, sitting directly after the title pin. Walk `guide.surface()`; skip a symbol whose `summary` is `undefined`; look the name up in `source.surface()` and count the pair where the source symbol's `summary` is also present. Fail with one line `${GUIDE_SPEC} summaries: guide [names with a summary] source [names with a summary]` when no pair exists. Use the own guide and source the title pin builds (`GUIDE_SPEC`, `own.source`), so the pin covers this repository's own guide, the way the title pin does.
2. **The methods pin** — `documents at least one method group where the guide carries a Methods section`, inside the manifest loop beside the `for (const group of guide.methods())` block. Where `guide.sections()` includes a `Methods` heading (read the exact string `sections()` returns for the `## Methods` heading and match it), assert `guide.methods().length` is greater than zero with a failure line naming the spec and the section headings found; where the guide carries no `Methods` section the case passes with nothing to say. A `## Methods` table that lacks its ``#### `Interface` `` heading is the defect this pin catches.

Then:

3. **Red first.** Before writing either case, plant one control in a scratch copy under `tmp/d7n-pilot-pin/` (never in the tracked guide): rename every `Summary` header in a copy of `guides/abort.md` and run the current suite against it through a throwaway Vitest invocation, recording that the equality case stays green (the vacuity); then, with the new cases in place, record the same control reddening the summary pin, and a copy with the ``#### `AbortInterface` `` heading removed reddening the methods pin. Record every command and its exit code. Restore nothing in the tracked tree, because nothing tracked was planted.
4. Update the header comment above each pin the way the title pin's comment explains its own reason, in the same voice, without a count.
5. `npx oxfmt --config .oxfmtrc.json --write tests/guides.test.ts`; `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`; `PATH=/opt/npm11/bin:$PATH npm run test:guides` green; `npm run docs` at zero.
6. Record the new region's line range (from `const root = ` through the manifest loop's closing brace) in the report, because the propagation pass copies exactly that range into every package.

## Scope

Owned: `tests/guides.test.ts`. Off-limits: everything else, including `guides/abort.md`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists `tests/guides.test.ts` only.
2. `grep -c "compares at least one summary across the guide and the source" tests/guides.test.ts` reads 1; `grep -c "documents at least one method group where the guide carries a Methods section" tests/guides.test.ts` reads 1; neither case body declares a helper function, and no nested function declaration is added (an anonymous callback passed directly is the only exception).
3. `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0; `PATH=/opt/npm11/bin:$PATH npm run check` exits 0.
4. The red-first record: the summary control green under the old suite and red under the new pin; the methods control red under the new pin; each with its command and exit code.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` green (record the summary); `npm run docs` reads `rows read: 1, disagreements found: 0`.

## Output

`/home/user/scaffold/tmp/units/d7n-pilot-pin-report.md`: the diff, the red-first record, the region's line range, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if `GuideInterface` or `SourceInterface` lacks a projection the pin needs (name it and what you found), if the summary pin cannot be expressed without a helper the region would carry, or if a gate outside the owned file goes red. Decide the failure lines' exact wording and the comments' wording yourself and record them.
