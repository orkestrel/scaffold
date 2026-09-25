# RELEASE-MODE design verdict (2026-09-25)

The Orchestrator's reconciliation of the RELEASE-MODE design round, on one brief (`units/release-mode-design-brief.md`):
the subjective lane, `planner` on Opus 5.5 (`units/release-mode-design-planner-proposal.md`), and the objective lane,
`analyst` on GPT-6 Astra (`units/release-mode-design-analyst-proposal.md`, journal
`tmp/codex/release-mode-design-analyst.jsonl`, thread `01a0d680-c5e5-71a0-946e-64f2a942b83c`), blind to each other.

## The defect

Under `--mode release`, a project test reads `import.meta.env.MODE` and `process.env.MODE` as `test`, in Veneer and in
scaffold (the Orchestrator's probes of 2026-09-25, recorded in the brief). So every distribution proof's
`RELEASE = import.meta.env.MODE === 'release'` is false and every `if (RELEASE) throw` branch is dead: `prepublishOnly`
skips where it must fail, fleet-wide.

Both lanes traced it to the same place in the installed Vitest 4.1.11: Vitest calls each project factory with the root
mode, the shared `mergeOverride` returns the base unchanged when it receives that invocation record, and project
initialization then falls back to Vitest's own run mode (`options.test?.mode || options.mode || ctx.config.mode`).

## Readings

- The objective lane ran `createVitest` against the installed Vitest: a factory that drops the record reads project
  mode `test`; one that returns `mode: invocation.mode` reads `release`, and a module loaded through the project runner
  evaluates `import.meta.env.MODE === 'release'` as `true`.
- The Orchestrator ran the same question on the host through real workers
  (`units/release-mode-instruments/forward.config.ts` beside `mode.test.ts`): under
  `npx vitest run --config tmp/probe/forward.config.ts --mode release`, the forwarding project's probe passed and the
  dropping project's failed with `expected 'test' to be 'release'` (`Tests 1 failed | 1 passed`).

## Rulings

- **The channel: forward `mode`, and only `mode`, in `mergeOverride`.** Both lanes. When the argument is the invocation
  record, return the base with `mode` set to the record's string `mode`, and carry none of `command`, `isPreview`,
  `isSsrBuild`. The command (`npm run test:distribution -- --mode release`), `RELEASE_PROOF_COMMAND`, the proofs'
  `import.meta.env.MODE` read, and `prepublishOnly` stay as they are and become true. Rejected by both: an environment
  variable (a POSIX-only script form or a new package), a dedicated release project, a root configuration function,
  and `provide`/`inject` (a second term for the run's identity and an edit to every presence-owned proof).
- **The vendored contract.** Both lanes replace the two cases in `tests/config.test.ts`: the case that states, as
  measured, that registration alone carries the mode is false, and the case that forbids a factory from returning
  `mode` forbids the fix. The replacement drives every registered factory with a sentinel record and asserts each
  result carries the record's `mode` and none of its other fields, with controls that must fail: a factory that ignores
  the record, one that spreads it whole, and an inline entry.
- **The end-to-end pin: in scaffold's own distribution proof.** The objective lane's placement is taken: a case in
  scaffold's `tests/distribution.test.ts` that exercises a generated consumer's configuration and distribution proof
  through npm with a local registry fixture that refuses `npm ping`, and asserts the release run fails with the registry
  diagnostic while the ordinary run skips. It catches a Vitest change that stops honouring a project's `mode`, and it
  keeps the vendored file to `node:` modules and `vitest`, as `.claude/rules/tests.md` requires.
- **Scaffold's tree.** `src/core/templates.ts` (the `mergeOverride` span and its comment; the distribution template's
  `RELEASE` comment), scaffold's own `vite.config.ts`, `tests/src/core/compilers.test.ts` (the pinned text), and
  `guides/scaffold.md` (one sentence in the release paragraph) change. `src/core/constants.ts` and `package.json` stay.
- **Ownership, corrected.** Both lanes: the brief was wrong that Veneer owns `vite.config.ts`. The compiler plan emits
  it as a template artifact with `ownership: 'content'`, so `repair` rewrites it, and `tests/config.test.ts` is
  vendored. No target edits either by hand.
- **Veneer: through a packed scaffold and `repair`, never by a hand edit.** The subjective lane's route under
  `.agents/orchestration.md` § Fixing a dependency before it publishes: build scaffold from source, pack it, install the
  tarball into Veneer, run `repair`, and take the release-mode run against it; restore the registry copy before any
  release. The full Veneer landing of the mode waits on the scaffold release and a registry re-pin.
- **Routing.** The scaffold unit's `config` project spawns the linter and its end-to-end case spawns Vitest and npm, a
  child's child a bench sandbox denies (`.agents/orchestration.md` § Bench laws, rule 5), so it runs on `opus` on Opus
  5.5, the native writing lane; its audit runs `analyst` on Astra and `reviewer` on Opus 5.5.

## Units

- **RM-SCAFFOLD** (`opus` on Opus 5.5), in a scaffold worktree from scaffold `main`: the scaffold tree changes above,
  with the replacement vendored cases red at baseline and green after, the forwarding-line mutation reddening exactly
  them and the end-to-end case, and a retained host log of the release run failing and the ordinary run skipping.
  Brief: `units/rm-scaffold-brief.md`.
- **RM-VENEER** (the Orchestrator's tracked commands for build, pack, and install; `builder` on Sonnet for `repair`;
  `verifier` on Sonnet for the gates): after RM-SCAFFOLD is accepted, Veneer runs the packed scaffold's `repair` and
  its release-mode distribution run, which either proves the artifact or fails loudly and never skips.
- **RM-RELEASE** (the Orchestrator with the user's one-time code, per the `orkestrel-publish` skill): scaffold publishes
  after its gates, and each target re-pins and runs `repair` under P1 SCAFFOLD-PROPAGATE.

## Risks

- The fix rests on Vitest honouring a project's own `mode`, which Vitest does not document; the end-to-end pin reddens
  on an upgrade that changes it.
- The first release-mode run in each target meets the evidence that was silently skipped before (a publish host with
  no browser or no registry); P1 reads it target by target.
- A `release` mode makes Vite load `.env.release` files where they exist; no fleet file is read to check, only names.

## Exit

A release-mode distribution run fails loudly on missing evidence in scaffold and in every target, the vendored cases
pin the channel, and the end-to-end pin keeps it.
