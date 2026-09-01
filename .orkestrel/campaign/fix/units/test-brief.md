# Unit breaking-test — apply the deferred breaking repairs in test

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to test — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/test.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/test.md`:

- **s11-36** (rename): Rename PortfolioInterface.states to placements and leave PortfolioOptions.states as the declared registry. — edits: PortfolioInterface.states rename → placements [src/browser/types.ts:81] — guide: guides/test.md PortfolioInterface surface row and portfolio fences
- **s11-37** (rename): Rename the six bare-noun browser readers to readStyle, readToken, readRootToken, readPixels, readContrast, and resolveColor. — edits: rgba rename → resolveColor [src/browser/helpers.ts:1092]; contrast rename → readContrast [src/browser/helpers.ts:1307]; style rename → readStyle [src/browser/helpers.ts:1593]; token rename → readToken [src/browser/helpers.ts:1621]; rootToken rename → readRootToken [src/browser/helpers.ts:1642]; pixels rename → readPixels [src/browser/helpers.ts:1669] — guide: guides/test.md Helpers surface rows for style, token, rootToken, pixels, contrast, and rgba, plus every fence that imports them
- **s11-38** (rename): Rename the exported colorEqual predicate to matchesColor. — edits: colorEqual rename → matchesColor [src/browser/helpers.ts:1128] — guide: guides/test.md colorEqual Helpers row and fences

The fix-round audit findings for this package that this unit also carries:

- s11-31: add a Limits row ruling the outcome triple ships because the package declares no runtime dependency, naming the default divergence from @orkestrel/contract's Result; add the same warning to the Result surface row
- s11-35: add a sentence beside the Core Helpers table naming dropRegistration as the mechanic createSignal's paths share, reachable only by a consumer holding its own registration list

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s11-37: `style` → `readStyle`, `token` → `readToken`, `rootToken` → `readRootToken`, `pixels` → `readPixels`, `contrast` → `readContrast` (a `read*` helper obtains a value from a live host object); `rgba` → `resolveColor` (it resolves a CSS color through a live probe element and returns `Color | undefined`).
- s11-36: `PortfolioInterface.states` → `placements`; `PortfolioOptions.states` stays as the declared registry.
- s11-38: `colorEqual` → `matchesColor` (`matches*` is a predicate).
- The vocabulary these names follow is being landed in scaffold's `.claude/rules/names.md` in the same wave; this checkout's vendored copy predates it. Apply the names above as ruled.

**Vocabulary.** The naming rule text this phase lands in scaffold's `.claude/rules/names.md`; this
checkout's vendored copy predates it, so apply the text as quoted here:

none landed yet — apply the rulings above

External consumers of each moved symbol (for the record
only; their units follow): `.orkestrel/campaign/fix/breaking-radius.json`.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/quality.md`, `.claude/rules/workspace.md`,
`.claude/rules/portability.md` (all vendored in the repository); skill
`orkestrel-harden-package` in its structural lane with `references/centralization.md`; guide
`guides/test.md`.

**Host.** Linux, bash. Repository /home/user/fleet/test on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`.

**Measurements.** none — every dependency this package imports is at its registry version (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/test.md`, `guides/README.md` rows for this package, and the parity `INTERNAL` list
where the package keeps one.

**Shared (report-only).** none.

**Off-limits.** `package.json`, `package-lock.json`, `AGENTS.md`, `.claude/**`, `.agents/**`,
`.codex/**`, `.cursor/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, vendored
dependency guide mirrors (`guides/<other-package>.md`), `.orkestrel/**`, `tmp/**`, and every file
outside the repository.

**What asserts the state this change ends.** Every test that names a renamed or removed symbol,
every guide row and fence that spells it, every `@example`, the parity test's `INTERNAL` list, and
any fixture or snapshot carrying the old name. Derive the set by running the suite after the
rename; the red tests are the list.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` is allowed only to converge after `npm run lint`,
then the non-mutating chain proves the state.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Work row by row in the
listed order (a row's `prerequisite` rows first). For each: re-verify the symbol at its ledger
location, apply the rename or removal with every in-package consumer, rewrite the TSDoc first
sentence in the third-person form where you touch a block, move the guide row and every fence,
and update or remove the tests that named the old surface. TTTDD binds: change `types.ts` first
where the row moves a contract. Where a row removes a capability, delete its tests and guide
rows with it. After the last row, run the centralization sweep from `references/centralization.md`
over the files you touched, then the gate chain:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per row — applied, or refused with the rule text that refuses it, or stopped
with the deviation; the symbols moved (`from → to`, or removed); files touched; the tests
changed; the gate results with an excerpt for any failure; `git diff --stat`; whether the built
`dist/` moves (always yes for a rename). Delivered as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a row's target name collides with an existing export, when two rows move the
same symbol differently, when a rename would require a change in an off-limits file, or when the
gate chain fails for a cause you cannot attribute. Decide, record, and carry on from the placement
of a moved block within its file and the wording of a rewritten TSDoc sentence.

## Acceptance criteria

1. `grep -rn '\b<old-name>\b' src tests guides` returns no hit for any renamed or removed symbol
   (excluding a deliberate "renamed from" note in a commit-facing comment, which this unit does not
   write).
2. `npm run check` exits 0.
3. `npm run lint:check` and `npm run format:check` exit 0.
4. `npm run build` exits 0 and `npm test` exits 0.
5. `guides/test.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
