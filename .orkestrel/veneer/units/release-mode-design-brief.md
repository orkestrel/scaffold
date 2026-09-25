# RELEASE-MODE design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5)
and the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits
nothing, and returns a proposal. The Orchestrator reconciles.

## Law

Read, in order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{workspace,tests,architecture,patterns,portability,quality,typescript}.md`;
`/home/user/scaffold/.agents/orchestration.md` § Publishing the fleet (what a vendored or template change obliges). No
skill applies.

## The defect, measured

The Orchestrator ran each of these on 2026-09-25 on this host (Linux, Node 22.22.2, Vitest 4.1.11), with a probe
test that asserts `import.meta.env.MODE` in a project Vitest calls:

- In Veneer (`/home/user/veneer-read`, `main` at `4cd56a8`):
  `npx vitest run --config vite.config.ts --no-cache --project probe --mode release tmp/probe/mode.test.ts` failed with
  `AssertionError: expected 'test' to be 'release'`. A second probe read `process.env.MODE` as `test`, found no
  environment variable carrying `release`, and read an empty `process.argv` tail.
- In scaffold (`/home/user/scaffold`), the same probe under `--project probe --mode release` failed the same way.
- ER-MECH (a Veneer unit) read the distribution project: under `npm run test:distribution -- --mode release`, the
  release-host case skips as it does in ordinary mode (retained at
  `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/logs/erm-mode-probe.log.txt` and
  `erm-distribution-release-verbose.log.txt` beside it).

So `const RELEASE = import.meta.env.MODE === 'release'` is false in every run, and every `if (RELEASE) throw` branch
in a distribution proof is dead: `prepublishOnly` skips where it must fail. The pattern comes from scaffold:
`src/core/templates.ts` emits the distribution proof with that constant (search `MODE === 'release'`) and the
`vite.config.ts` factories with `mergeOverride`; `src/core/constants.ts` holds `RELEASE_PROOF_COMMAND`
(`npm run test:distribution -- --mode release`); scaffold's own `package.json` `prepublishOnly` ends with that command.
The vendored `tests/config.test.ts` case titled `emits every project as a factory so the release mode reaches its
proof` states, as measured, that a project Vitest calls reads `release`; the case titled `keeps Vitest invocation
fields out of project configurations` forbids a factory from returning `mode`. The first statement is false on this
host today.

## Question

Propose the design that makes a release run's proof know it is a release run, fleet-wide, and every proof that pins
it. Rule on each of these, with the reason from the law or a measurement you name:

1. **The channel.** What carries "this is a release run" into the distribution proof: Vitest's own `provide` and
   `inject`, a dedicated release project, a root configuration that reads the mode, an environment variable set
   portably, or another channel. It must work on Windows and Linux shells, under `npm run`, and inside
   `prepublishOnly`, with no new npm package.
2. **The vendored contract.** What the two `tests/config.test.ts` cases become, so the fleet's gate pins the channel
   that works and would redden if it regressed.
3. **The templates and scaffold's own tree.** What `src/core/templates.ts`, `src/core/constants.ts`, scaffold's own
   `vite.config.ts`, `package.json`, and distribution proof change to, and how the change reaches each fleet package
   (a scaffold release and `repair`, per § Publishing the fleet).
4. **Veneer now.** Veneer's `vite.config.ts` is its own file (scaffold's `dist/host/manifest.json` lists `configs/`,
   not `vite.config.ts`), and Veneer's E-RECEIPTS needs a release-mode distribution run to close its exit. Rule on
   whether Veneer takes the fix ahead of the scaffold release, and how it stays identical to what the template emits.
5. **The proof that closes it.** The failing-first run that shows the defect, and the run after the fix that shows the
   release branch firing, in a form a gate keeps.

## Evidence

Read `/home/user/scaffold/src/core/templates.ts`, `/home/user/scaffold/src/core/constants.ts`,
`/home/user/scaffold/vite.config.ts`, `/home/user/scaffold/package.json`, and scaffold's vendored
`tests/config.test.ts` (in the scaffold tree, and as Veneer receives it at `/home/user/veneer-read/tests/config.test.ts`);
Veneer's `/home/user/veneer-read/vite.config.ts` and `/home/user/veneer-read/tests/distribution.test.ts`; and the
installed Vitest (`/home/user/veneer-read/node_modules/vitest`) for how a project factory receives its invocation
record and what `provide` and `inject` offer. Verify every citation you rely on.

## Constraints

- No new npm package. No count in any sentence you propose.
- Units: name each unit's owned files, its engine per `.agents/orchestration.md` § The engines, its acceptance
  criteria, and its dependencies. A scaffold release is the user's decision and needs the user's one-time code.

## Output

A proposal: a ruling per question with its reason; the units; the risks; and anything in this brief you found false,
with the command and output that shows it. State no count.
