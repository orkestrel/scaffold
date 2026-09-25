# RELEASE-MODE design proposal — `planner` on Opus 5.5, subjective lane

Returned to the Orchestrator as the subagent's hand-back; the text follows as delivered.

Lane held: **subjective** (`planner`, Opus 5.5, clean context). I edited nothing and ran nothing. There is no dispatch defect: the brief names no report path and assigns me no command.

## Design

**Recommendation: fix the plumbing and keep the contract.** A project that Vitest calls must run in the mode Vitest was invoked with. The factories already receive that mode, and the shared merge drops it. The fix is to forward `mode`, and only `mode`, from the invocation record in `mergeOverride`. The command, the constant, the proof, the rule text and the guide text stay as they are. After the fix they are all true.

**Root cause, from the installed Vitest (4.1.11 in `/home/user/veneer-read/node_modules/vitest`).**
- Vitest calls each project factory with `mode: vitest.vite.config.mode` (`dist/chunks/cli-api.CnMVyzaz.js:11365-11370`). That root mode is `options.mode || mode` (`cli-api.CnMVyzaz.js:14284`), so under `--mode release` the factory receives `release`.
- `mergeOverride` recognises the record and returns the base unchanged (`/home/user/scaffold/src/core/templates.ts:116`), so the mode is thrown away.
- `initializeProject` then gives the project `options.test?.mode || options.mode || ctx.config.mode` (`cli-api.CnMVyzaz.js:11122`). `ctx.config.mode` is Vitest's own run mode, `test` or `benchmark` (`dist/chunks/coverage.DM_a_rWm.js:156,166`).
- The worker's environment is built last from `project.config.env` (`cli-api.CnMVyzaz.js:3717-3722`, `9299-9302`). That is why `MODE` reads `test` in the proof, even though the root process sets `process.env.MODE ??=` the root mode (`cli-api.CnMVyzaz.js:14240`).

**Ruling 1 — the channel: Vite's own mode, forwarded by `mergeOverride`.**
- When the argument is the invocation record, `mergeOverride` returns the base with `mode` set to the record's `mode`. It carries none of `command`, `isPreview` or `isSsrBuild`.
- Every registered factory already routes through `mergeOverride` (`templates.ts:184` through `614`), so one span in one shared function fixes every project.
- Portability needs no new mechanism:
  - `--mode` is a Vitest CLI flag. npm forwards it after `--` on Windows and Linux alike.
  - `prepublishOnly` already passes it through `RELEASE_PROOF_COMMAND` (`/home/user/scaffold/src/core/constants.ts:340`).
  - No package is added.
- The fleet keeps one term for "which run is this": `import.meta.env.MODE`. The bench guard `MODE === 'benchmark'` (`/home/user/scaffold/.claude/rules/tests.md:115-119`) and the release guard read the same fact.
  - Under `vitest bench` the record's mode is `benchmark`, and under `vitest run` it is `test`. Both are the values projects read today, so ordinary runs do not change.
- Rejected: an environment variable set in the script. `VAR=x cmd` is POSIX-shell syntax. The portability rule requires every script to be "a portable command: a Node invocation or an installed binary" (`/home/user/scaffold/.claude/rules/portability.md`, Scripts and packaging), and `cross-env` would be a new package.

**Ruling 2 — the vendored contract.** Replace the case titled `emits every project as a factory so the release mode reaches its proof` and the case titled `keeps Vitest invocation fields out of project configurations` with these cases, each named for what it proves:
- **`runs every project in the mode Vitest was invoked with`.**
  - Call every root `projects` entry with a sentinel record, `{ command, isPreview, isSsrBuild, mode: 'sentinel-mode', sentinel }`.
  - Assert that each result's `mode` is `'sentinel-mode'` and that `command`, `isPreview`, `isSsrBuild` and `sentinel` are absent.
  - An inline configuration fails this case because it cannot forward the mode. The "every project is a factory" requirement therefore follows from the case instead of being stated as structure.
  - Controls, each of which must fail:
    - a factory that returns its base and ignores the record (this is the defect in the tree today);
    - a factory that spreads the whole record;
    - an inline entry.
- **`fails the distribution proof in release mode when the registry refuses`.** This is the end-to-end pin that catches a Vitest upgrade dropping the `cli-api.CnMVyzaz.js:11122` precedence.
  - Start a fixture server on `127.0.0.1` with `listen(0)` that answers `npm ping` with a server error.
  - Spawn `process.execPath` with Vitest's resolved JavaScript CLI entry: `run --config vite.config.ts --project distribution --mode release`, with `npm_config_registry` pointing at the fixture.
  - Assert a non-zero exit and the text `The release gate requires a reachable npm registry`.
  - Control: the same spawn without `--mode release` exits 0 and reports skips.
  - Run it only when the root configuration registers a `distribution` factory. Cite that as the skip mechanism.
- The vendored file keeps its own helpers and imports only `node:` modules and `vitest` (`/home/user/scaffold/.claude/rules/tests.md:179-181`).

**Ruling 3 — scaffold's templates and tree.**
- `src/core/templates.ts`:
  - Change the `mergeOverride` span and its comment in the `vite` template (`templates.ts:94-116`). The comment must say that the merge returns the base in the record's mode, and why: Vitest otherwise gives a project its own run mode rather than the `--mode` value.
  - In the distribution template, keep the `RELEASE` constant (`templates.ts:1280-1283`). Extend its comment to say that the root factories carry the mode to the project.
- `src/core/constants.ts`: no change. The `RELEASE_PROOF_COMMAND` remarks become true.
- `/home/user/scaffold/vite.config.ts`: apply the same `mergeOverride` span (`vite.config.ts:54-55`).
- `/home/user/scaffold/package.json` and `tests/distribution.test.ts`: no change. They start firing.
- `tests/src/core/compilers.test.ts`: update the pinned `mergeOverride` text (`compilers.test.ts:1654-1655`).
- `guides/scaffold.md`, the release-contract paragraph (`scaffold.md:2115-2122`): add one sentence saying that the root project factories carry the invocation mode into each project.
- How it reaches the fleet:
  - `tests/config.test.ts` is vendored (`/home/user/scaffold/dist/host/manifest.json:1036-1037`). Per `.agents/orchestration.md` § Publishing the fleet, scaffold must bump and publish.
  - Each target then re-pins `@orkestrel/scaffold` and runs `repair`. That writes the vendored case, and it rewrites the target's `vite.config.ts`, because the compiler plan owns that file's content (`/home/user/scaffold/src/core/compilers.ts:928-934`; `src/core/types.ts:24-26`).
  - A target's presence-owned `tests/distribution.test.ts` (`compilers.ts:1333-1336`) needs no edit.
  - No target bumps, because neither file is part of its published surface.

**Ruling 4 — Veneer now: take it ahead of the scaffold release, but only through the packed scaffold tarball and `repair`, never by a hand edit.**
- A hand edit fails on three counts:
  - A Veneer `mergeOverride` that forwards `mode` returns `'sentinel-mode'`. The vendored case that forbids invocation fields (`/home/user/veneer-read/tests/config.test.ts:395-416`) then goes red.
  - Editing that vendored file inside a target is forbidden (`.agents/orchestration.md` § What a bump obliges: "Never edit a vendored file inside a target").
  - `vite.config.ts` is content-owned, so `audit` reports the edit as drift, and a `repair` from the installed scaffold reverts it.
- Follow § Fixing a dependency before it publishes:
  1. Build scaffold from source and pack it.
  2. Install the tarball into Veneer.
  3. Run `repair` there. Veneer's `vite.config.ts` and `tests/config.test.ts` then match what the template emits, because the template wrote them.
- Veneer's `tests/distribution.test.ts:51` then reads `release`, and E-RECEIPTS gets its release-mode run.
- Restore the registry copy before Veneer publishes.

**Ruling 5 — the proof that closes it.**
- **Failing first**, in scaffold, before the fix:
  - `npx vitest run --config vite.config.ts --no-cache --project config -t "mode Vitest was invoked with"` reddens on the ignoring-factory path. Record the failing count.
  - The release-refusal case reddens the same way.
  - The already-measured probe (`--project probe --mode release tmp/probe/mode.test.ts`, `expected 'test' to be 'release'`) is the host corroboration.
- **After the fix:** the same commands pass.
- **Mutation:** remove the forwarding line in `mergeOverride`. Exactly the case titled `runs every project in the mode Vitest was invoked with` and the case titled `fails the distribution proof in release mode when the registry refuses` must redden, and nothing else.
- **Host evidence, retained as a log:**
  - `npm_config_registry=http://127.0.0.1:<closed port>/ npm run test:distribution -- --mode release` exits non-zero with the release-gate message.
  - The same command without `-- --mode release` exits 0 with skips.
- **Where the gate keeps it:** in the replacement vendored cases, which run in `test` in every workspace.

**Found false in the brief.**
- The brief says "Veneer's `vite.config.ts` is its own file (scaffold's `dist/host/manifest.json` lists `configs/`, not `vite.config.ts`)". Both parts are off:
  - `dist/host/manifest.json:634-641` lists only `configs/helpers.ts` and `configs/policy.ts`, not the `configs/` directory.
  - The compiler plan claims `vite.config.ts` as a template artifact with `ownership: 'content'` (`compilers.ts:928-934`), and content ownership means "audit compares them, and a write restores a missing file and replaces a stale one" (`types.ts:24-26`).
  - So the file belongs to scaffold, not Veneer, and a `repair` rewrites it.
  - Evidence: `Grep pattern "ownership: '" in /home/user/scaffold/src/core/compilers.ts` returned `929: path: 'vite.config.ts'` followed by `931: ownership: 'content'`.
  - The Orchestrator settles whether Veneer's selection excludes the `configs` group by running `scaffold audit` in Veneer.

## Alternatives

**Root-provided flag through `provide` and `inject`.**
- How it works: the root default export becomes `defineConfig(({ mode }) => …)` with `test.provide: { release: mode === 'release' }`. Every project inherits it (`cli-api.CnMVyzaz.js:10735-10742`), and the proof reads `inject('release')`.
- Why it loses:
  - It adds a second term for the run's identity beside `import.meta.env.MODE`.
  - It needs an edit to every presence-owned distribution proof in the fleet, which `repair` never rewrites.
  - It turns the root default export into a function. That breaks every vendored case that reads `configuration.test` as an object (`tests/config.test.ts:105,235,374,396,669,796`).
  - It rewrites `tests.md:167-169` and `scaffold.md:2115-2122`.
- What it does better: it rests on Vitest's documented provide inheritance rather than the project-mode precedence.

**A dedicated release project** (a `release` project that sets `provide.release = true`, selected by a `test:release` script).
- Why it loses:
  - It grows the project matrix in `workspace.md` and `tests.md`.
  - It adds a script, and the writable-region predecessor that `repair` accepts for `prepublishOnly` (`compilers.ts:482-488`).
  - It leaves the ordinary `distribution` project unreachable from any gate, which the discovery audit refuses (`tests.md:327-331`).
  - It still edits every proof.

## Constraints

## Refusals

## Measurements

## Units

- **U-PROBE — settle the channel before the brief.** Role: the Orchestrator's own probe, a native tracked command on Opus 5.5, with the instrument retained.
  - Instrument, in the scratchpad or a scaffold `tmp/probe/` config: register `(env) => ({ ...distribution(), mode: env.mode })` over a probe test that asserts `import.meta.env.MODE`.
  - Run it with `--mode release`.
  - Control: the same config without `mode` must read `test`.
  - Acceptance: the case reads `release` and the control reads `test`, from the same command.
  - Dependencies: none.
- **U-SCAFFOLD — templates, own config, vendored contract, prose.** Role: `opus` on Opus 5.5, native.
  - Why native: the `config` project spawns the linter, and the end-to-end case spawns Vitest and npm. Bench law "A bench sandbox spawns a child and denies that child's child" routes such a subject to the native writing lane.
  - Owned files: `src/core/templates.ts` (the `mergeOverride` span and comment, and the `RELEASE` comment in the distribution template), `vite.config.ts`, `tests/config.test.ts`, `tests/src/core/compilers.test.ts`, and the release paragraph in `guides/scaffold.md`.
  - Search bound: the grep for `'command' in override` found only `vite.config.ts`, `templates.ts` and `compilers.test.ts`.
  - Off-limits: `src/core/constants.ts`, `package.json`, `tests/distribution.test.ts`, `.claude/rules/*`, and `dist/`.
  - Dependencies: U-PROBE green.
  - Acceptance, cheapest first:
    1. `npm run check` passes.
    2. `npm run lint:check` passes.
    3. Both replacement cases are red at baseline, with the command and failing count recorded.
    4. `npm run test:config` passes.
    5. `npm run test:src:core` passes.
    6. The mutation of the forwarding line reddens exactly the replacement cases.
    7. The retained host log shows the release branch firing and the ordinary run skipping.
  - Audit: `analyst` on GPT-6 Astra, an engine that did not write the work.
- **U-VENEER-TARBALL — Veneer ahead of the release.** Roles:
  - The Orchestrator's tracked command builds, packs and installs the tarball. Roles may not install.
  - `builder` on Sonnet runs `repair` in Veneer and returns the diff.
  - `verifier` on Sonnet runs `npm run test:config` and returns its reading.
  - The Orchestrator's tracked command takes the release-mode `test:distribution` run for E-RECEIPTS, because it needs the network.
  - Owned files: the files `repair` writes in Veneer. Record the replaced `@orkestrel/scaffold` range.
  - Dependencies: U-SCAFFOLD accepted.
  - Acceptance:
    - The `repair` diff touches only `vite.config.ts` and `tests/config.test.ts`, or the extra paths are named and ruled on.
    - `test:config` is green.
    - The release-mode run either proves the artifact or fails loudly. It never skips.
- **U-PUBLISH — scaffold release.** Role: the Orchestrator with the user, following the `orkestrel-publish` skill. It needs the user's one-time code.
  - Dependencies: U-SCAFFOLD accepted.
  - Acceptance: the registry serves the version that carries the replacement cases.
- **U-FLEET — per-target adoption.** Role: `builder` on Sonnet, one per checkout. The Orchestrator runs the re-pin install.
  - Owned files: what `repair` writes in each target.
  - Dependencies: U-PUBLISH. Veneer also restores its registry copy.
  - Acceptance: each target's gates are green after `repair`, and `npm run test:distribution -- --mode release` fails loudly or proves the artifact. It never skips.

## Tensions

- **The release refusal as a gated case in `test`.** I placed that end-to-end case in the vendored `config` test, which runs in `test`, even though it spawns Vitest. Its reasons: the static case cannot catch a Vitest upgrade that stops honouring a project's `mode`, and the spawn fails fast at `npm ping`. The objective lane can argue for the in-process `createVitest` resolution from `vitest/node` instead. That reads `project.config.env.MODE` without a child process, at the cost of depending on Vitest's programmatic API.
- **Uniform invariant.** I made "every project runs in the invoked mode" apply to every project, not only `distribution`. It is simpler to state, and every factory already shares the merge. The cost is that it refuses an inline root entry for projects that never read the mode.
- **Keeping local skip.** One more option is to delete the `RELEASE` constant and have the proof always fail on missing evidence. That needs no channel at all. I did not choose it, because `tests.md:167-169` and `scaffold.md:2118-2119` keep the local skip as a documented behaviour. Removing it is a scope change for the user.
- **Reading the design needs that the dispatch did not supply.** It supplies the root-cause chain only by my reading of the code, not by a run:
  - U-PROBE's reading that a project `mode` reaches `import.meta.env.MODE`;
  - the time the release-refusal case takes on this host, measured against the `config` project's 60 s `testTimeout`;
  - a Windows reading of `npm run test:distribution -- --mode release`.

## Risks

- **Undocumented precedence.** The design rests on `initializeProject` honouring a project's own `mode` (`cli-api.CnMVyzaz.js:11122`), which Vitest does not document. Evidence: U-PROBE now, and the release-refusal case on every later upgrade.
- **Hidden reds surface.** Once the release branch fires, the next fleet publish meets the evidence that was silently skipped: a publish host with no browser (`templates.ts:2267`) or no registry. Evidence: the first release-mode run in each target during U-FLEET.
- **Unrelated scaffold drift in Veneer.** A tarball `repair` in Veneer also writes any unpublished scaffold change beyond this fix. Evidence: the `repair` diff in U-VENEER-TARBALL. Narrow it with `--groups` if the diff is wider.
- **Targets outside the `configs` group.** A target that excludes the `configs` group, or that holds a customised `vite.config.ts`, does not receive the forwarding. Evidence: `scaffold audit` in each target before U-FLEET.
- **Mode-specific env files.** The `release` mode makes Vite load `.env.release` and `.env.release.local` if they exist. Evidence: a filename-only Glob for `.env.release*` across the fleet, without reading any file.

Files: `/home/user/scaffold/src/core/templates.ts`, `/home/user/scaffold/vite.config.ts`, `/home/user/scaffold/tests/config.test.ts`, `/home/user/scaffold/tests/src/core/compilers.test.ts`, `/home/user/scaffold/src/core/compilers.ts`, `/home/user/scaffold/guides/scaffold.md`, `/home/user/veneer-read/vite.config.ts`, `/home/user/veneer-read/tests/distribution.test.ts`, `/home/user/veneer-read/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js`, `/home/user/veneer-read/node_modules/vitest/dist/chunks/coverage.DM_a_rWm.js`.
