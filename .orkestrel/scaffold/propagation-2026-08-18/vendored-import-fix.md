# Fix round: close the five findings against commit 83f47be

## Role and engine

`implementer` on **GPT-5.6 Sol**. You wrote the change these findings are against. Every prescription
below is the auditor's, reproduced for you to adopt verbatim — so this round closes on mutation
probes rather than a fresh audit. Do not redesign a prescription. If one is wrong, stop and report.

## Where these came from

An Opus 5 `reviewer` lane audited commit 83f47be against ten numbered claims and returned
`VERDICT: FAIL` on five. The Orchestrator independently reproduced the three most material before
writing this brief:

- The guard's directory branch matches **0** files today (measured), so half its population is empty.
- `tests/config.test.ts:596` and `:601` each cap a `spawnSync` at `15_000`, summing to exactly the
  `30_000` project budget (read).
- `createScratch` and `ScratchInterface` resolve to two different contracts inside `tests/`
  (`tests/setupServer.ts:65`, `tests/src/core/templates.test.ts:2,9` import the package's;
  `tests/setupPolicy.ts:54,66` declare yours) (grepped).

The full verdict is in the task record; the five prescriptions are restated below in full, so you do
not need it.

## F1 — rename the vendored scratch pair

`tests/setupPolicy.ts:54,66` declare `ScratchInterface` and `createScratch`. Both names already
belong to `@orkestrel/test/server`, whose versions have a **different contract** — the package's
`createScratch` accepts "a relative or absolute file path contained by the scratch directory", yours
refuses every absolute target. Both are live in `tests/` at once, and `createScratch({ prefix })`
type-checks against both, so a call copied between two files in `tests/` is a silent contract change.

Rename to `createPolicyScratch` and `PolicyScratchInterface`, matching the vocabulary this file
already uses (`PolicySource`, `PolicyControl`, `PolicyViolation`, `normalizePolicyPath`). Update the
five call sites: `tests/config.test.ts:23,566,684,707,745` and `tests/setupPolicy.ts:1477`. Verify
those line numbers yourself; they are the auditor's.

Right looks like: no name in `tests/` resolves to two contracts.

## F2 + F3 — make the guard's coverage match its claim, and give it a control

`tests/src/server/helpers.test.ts:148-165`. Three defects in one instrument.

**Coverage overclaims.** The test is named "keeps every vendored code file independent of Orkestrel
packages" and matches `.ts`, `.js`, `.json` only. `HOST_PATHS` also vendors four `.sh` scripts and
`.codex/config.toml`, and `.mts`, `.cts`, `.mjs`, `.cjs` would be missed for any future file.

**The matcher reports on one spelling and over-matches every other.** `/['"]@orkestrel\/[^'"]+['"]/`
misses a backtick specifier — `` await import(`@orkestrel/test/server`) `` — and fires on any quoted
mention anywhere, including a comment, a data table, or a JSON value. `.mcp.json` and
`.claude/settings.json` are in the population and are command registries, so a vendored `.mcp.json`
registering an Orkestrel MCP server would fail a correct file.

**Nothing proves the matcher can fire.** On a green run the `imported.push` never executes.

The Orchestrator's ruling on how to close all three — adopt it as written:

1. **Narrow the population to what the law actually governs: vendored JavaScript and TypeScript
   modules** — `.ts`, `.mts`, `.cts`, `.js`, `.mjs`, `.cjs`. Only those carry an `import` that must
   resolve. Do **not** widen to `.sh`, `.toml`, or every text file: `guides/guide.md`,
   `guides/scaffold.md`, and `.claude/agents/orkestrel.md` are vendored and legitimately full of
   `@orkestrel/…` package names, so a blunt whole-tree matcher fails on day one.
2. **Rename the test to name that exact population**, so the instrument no longer claims more than it
   checks, and state the extension rule in one comment beside it.
3. **Match import-shaped syntax only**, not any quoted mention: `from '…'`, `import('…')`,
   `require('…')`, and `export … from '…'`, accepting a single quote, a double quote, or a backtick
   as the delimiter. That closes the backtick evasion and the JSON over-match together.
4. **Add a resident negative control** drawn from outside the vendored population: a synthetic source
   string containing `from '@orkestrel/test/server'`, run through the same expression and asserted to
   match. `tests/setupPolicy.ts:44-51` already establishes this discipline through `PolicyControl`.
   Add a backtick control too, since that spelling is the one the old matcher missed.
5. **The directory branch contributes 0 files today.** Either add an anchor covering it or state
   beside the glob that no vendored directory holds an eligible module today. Keep the existing
   `expect(paths.length).toBeGreaterThan(0)` and the `toContain('tests/config.test.ts')` anchor.

## F4 — prove the containment

`createPolicyScratch`'s refusal branch (`tests/setupPolicy.ts:74-79`) is the behaviour the original
brief demanded be preserved, and no test exercises it. Add one case to the vendored sibling
`tests/policy.test.ts` asserting that `write('../escape', '')` throws and that a relative target
succeeds.

## F5 — raise the config budget above the caps it contains

`vite.config.ts:149` and `src/core/templates.ts:319` both read `testTimeout: 30_000`. That equals the
sum of the two `15_000` `spawnSync` caps inside the project's slowest test, so Vitest's timeout fires
at or before the children's own and the test reports a bare timeout instead of the child diagnostic
those caps exist to produce — the same diagnostic-free red the commit set out to remove.

Set both to `45_000`. `tests/src/core/compilers.test.ts:449-458` asserts this repository's
`vite.config.ts` is byte-identical to its generated form, so the two must move together. Update the
comment beside each to say the budget clears the child caps rather than merely exceeding the default.

## Mutation probes — this round's proof, not optional

This round closes on probes instead of a second audit, so each probe is load-bearing. Run and record:

1. **F2/F3 matcher.** With the fix in, reintroduce `import { createScratch } from '@orkestrel/test/server'`
   into `tests/config.test.ts`, run the guard, record it red naming that file, restore, record green.
   Then do it again with a **backtick** dynamic import — the spelling the old matcher missed — and
   record red. That second probe is what proves the fix, not the first.
2. **F4 containment.** Disable the refusal branch, watch the new containment case fail, restore.
3. **F5.** No probe; it is a constant. Record both values and the byte-identity test passing.

## Standing conditions

- The tree is dirty with `tmp/` only; `git status --porcelain` outside `tmp/` is clean at 83f47be.
- **Your sandbox denies loopback `listen`, `spawnSync git`, and `spawnSync oxlint`.** On the last
  round that produced 31 `src:server` failures and 1 `config` failure that were pure sandbox EPERM —
  the Orchestrator re-ran both unsandboxed and got 357/357 and 28/28. Expect the same. Report those
  as sandbox-blocked rather than as failures, and do not try to work around the sandbox.
- This repository formats with **oxfmt**, not prettier. Use
  `npx oxfmt --config .oxfmtrc.json --check <files>`. The previous brief's prettier criterion was an
  error.

## Scope

**Owned files:** `tests/setupPolicy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`,
`tests/src/server/helpers.test.ts`, `vite.config.ts`, `src/core/templates.ts`.

`vite.config.ts` and `src/core/templates.ts` are granted for F5 alone — change the one constant and
its comment in each, nothing else.

**Off-limits:** everything else, and in particular `src/**` beyond `templates.ts`, `package.json`,
`tests/src/core/compilers.test.ts`, `tests/src/core/Compiler.test.ts`, `AGENTS.md`, `.claude/rules/**`
(the rule text passed audit — do not touch it), `.agents/**`, `configs/**`.

**Permissions.** Do not commit, push, install, publish, or run `npm run build`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. `grep -rn "createScratch\|ScratchInterface" tests/setupPolicy.ts tests/config.test.ts` shows only
   the `Policy`-prefixed names.
2. Both mutation probes recorded red-then-green, with counts and exact commands.
3. `npx vitest run --project src:server` — report the count, and report sandbox EPERM separately from
   real failures.
4. `npx vitest run --project config` and `--project policy` — same.
5. `npm run check` exits 0.
6. `npx oxlint --config .oxlintrc.json --deny-warnings tests/` exits 0.
7. `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits 0.

## Output

Per finding F1-F5: what you changed and the evidence it closed. Then the two mutation probes with
their red and green counts and commands. Then each acceptance command's exit status, with
sandbox-blocked results labelled as such. No process diary.

## Deviation contract

Stop and report if a prescription is wrong, if a line number does not match, or if closing one
finding reopens another. Report expected, found, exact evidence, done or not done, and at most one
hypothesis.
