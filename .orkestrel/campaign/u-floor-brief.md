# Implementation brief — U-floor

## Role and engine

Sol `implementer`, GPT-5.6 Sol, high effort, sandbox `workspace-write`, rooted at
`/home/user/scaffold`. You are the sole serial writer in this checkout, from a clean committed
baseline at `2b3abca`.

## Objective

Raise `@orkestrel/scaffold`'s declared Node floor to `22.18.0`, and make every workspace it generates
declare a `devEngines.packageManager` floor of `>=11.6.0` with `onFail: "error"`, so an npm that
would crash refuses the install by name instead.

## Why, in one paragraph — do not re-derive this

A generated workspace ships no lockfile, so its first `npm install` resolves from ranges. npm through
`11.5.0` crashes doing that with `TypeError: Cannot read properties of null (reading 'edgesOut')` at
`@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289` inside `#loadPeerSet`, where `node.parent`
is null. `vitest@4.1.11` alone reproduces it. npm `11.6.0` is the first that resolves the graph. The
Orchestrator measured every one of these on this host; the instruments are retained under
`.orkestrel/campaign/evidence/linux-gate/` and the reconciled ruling with its full evidence is
`.orkestrel/campaign/scaffold-fix-design-verdict.md`. **Read that verdict first.**

Two guard mechanisms were measured against the real crashing graph and **rejected**: `engines.npm`
alone crashes and emits no `EBADENGINE`, and `engines.npm` with `engine-strict=true` crashes
identically, because the crash fires during ideal-tree construction ahead of engine validation.
`devEngines.packageManager` is checked before that and refuses cleanly with `EBADDEVENGINES`. Do not
reintroduce either rejected mechanism.

The Node half is separate and genuine: Node `22.18.0` is where type stripping became unflagged, which
the vendored `configs/policy.ts` lint plugin needs. Node 22 and Node 24 both clear it and both stay
supported. **Do not raise the floor past `22.18.0`** — excluding Node 22 or 24 is the outcome this
ruling exists to avoid.

## Owned files

- `src/core/constants.ts` — `MINIMUM_NODE_VERSION` to `'22.18.0'`; add the npm floor constant and its
  derived `devEngines` value beside `DEFAULT_ENGINES`, following that pair's existing naming and TSDoc
  shape.
- `src/core/compilers.ts` — the manifest emit at `:579` currently reads `engines: { node:
  blueprint.engines }`. Emit the `devEngines.packageManager` block alongside it.
- `src/core/factories.ts:47` — the `blueprint.engines` example comment.
- `src/core/helpers.ts:913-915` — the `matchesEngines` TSDoc example cases.
- `src/core/types.ts` — only if the emitted manifest's declared shape requires it. **Do not change
  `Blueprint.engines`**; it stays `readonly engines: string`, the Node range. The ruling refuses a
  nested shape.
- `package.json` — scaffold's own `engines.node`.
- `guides/scaffold.md:778` — the fence reading `blueprint.engines // '>=22.12.0'`.
- `guides/mcp.md:548` — names `node >= 22.12.0` as this package's declared floor in prose; the number
  goes stale with this change.
- `tests/src/core/helpers.test.ts:618-624` — boundary cases. Keep a case each side of the new floor.
- `tests/guides.test.ts:142` — the transcription asserting `blueprint.engines`.
- `tests/src/core/fixtures/setup-false-manifest.txt` and
  `tests/src/core/fixtures/source-manifest.txt` — generated-manifest fixtures, each carrying
  `"node": ">=22.12.0"` at `:77`. Both gain the emitted `devEngines` block.
- Any further test the change makes false. Derive that set by running the suite, not by reading this
  list — this list is where the Orchestrator's search reached, bounded to
  `grep -rn "22\.12\.0" src/ tests/ guides/ configs/ package.json README.md`.

## Off-limits

`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, everything under `configs/`,
`.oxlintrc.json`, `.oxfmtrc.json`, and the other root dotfiles. `src/core/constants.ts:133-151`
vendors each and `scaffold repair` restores them, so an edit there is reverted and reports as drift.
Also off-limits: `package-lock.json`, `.orkestrel/**`, `tmp/**`, and every file under
`/home/user/toolbox` and `/home/user/ollama`.

## Host and sandbox conditions

- **The sandbox denies network.** You cannot run `npm install`, `npm view`, or fetch a tarball. Do not
  attempt one and do not write one into a test you add. The install-boundary proof is the
  Orchestrator's and is taken after you exit.
- **`.git` is mounted read-only.** Reading commands — `status`, `diff`, `log` — work. Anything taking
  the index lock does not. Never write a git command as a mechanism; restore a file you mutated by
  rewriting its original text and prove it with `git diff --exit-code -- <path>`.
- The ambient npm is `10.9.7` on `node v22.22.2`, so this checkout's own `npm install` would be
  refused by the very guard you are adding if you added it to this package's own manifest. **Do not
  add `devEngines` to `/home/user/scaffold/package.json`** — the emitted floor is for generated
  workspaces. Scaffold's own `engines.node` does move.
- A `node_modules` is already installed and current. Do not reinstall.

## Execution

Perform this assignment directly and spawn nothing. You are the sole writer in this checkout.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
if the emitted `devEngines` block cannot be expressed without changing `Blueprint`, if a test you do
not own goes red, or if an acceptance criterion cannot be reached. A conflict with the objective
stops the unit. Where a paragraph sits or which heading a TSDoc block takes is yours to decide,
record, and carry on from.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits `0`.
2. `npm run lint:check` exits `0`.
3. `npm run check` exits `0`.
4. `npm run test:src:core` exits `0`, with `matchesEngines('>=22.12.0')` returning `false` and
   `matchesEngines('>=22.18.0')` returning `true`.
5. `npm run test:guides` exits `0` — this is what proves the guide fence, the factories example, and
   the transcription agree.
6. `npm run test:src:bin`, `npm run test:policy`, `npm run test:config`, `npm run test:setup` each
   exit `0`, invoked singly. The `test` script is an `&&` chain that stops at the first failure, so
   run them separately and report each code.
7. A manifest compiled from a default blueprint carries `engines.node` of `>=22.18.0` and
   `devEngines.packageManager` of `{ name: 'npm', version: '>=11.6.0', onFail: 'error' }`. Prove it by
   compiling one and printing the emitted JSON, not by reading the source.

Report `npm run test:src:server` as an **observation**, not a criterion: it carries one failure this
host cannot avoid, at `tests/src/server/helpers.test.ts:223`, because the container has no IPv6 stack.
That case is another unit's subject. Report its count so the Orchestrator can confirm nothing else
moved.

## Authority

`AGENTS.md` and its design laws; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/documentation.md`,
`.claude/rules/writing.md`; `guides/scaffold.md`. Types-first: the contract precedes the
implementation. Centralize by kind — a constant belongs in `src/core/constants.ts`, not inline at the
emit site.

## Output

Return the touched files with a one-line reason each, the diffstat, each acceptance criterion with
its exact exit code, the emitted manifest fragment from criterion 7, the `test:src:server`
observation, and the deviation state. No process diary.
