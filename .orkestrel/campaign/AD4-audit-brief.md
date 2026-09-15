# Audit AD4 — close the D4 chain (`@orkestrel/scaffold`: hosted guides, catalog floor, `surface` rule, inventory baseline, prose)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/scaffold`):
  OBJECTIVE lane — correctness, constraints, what the code and contracts permit. The `src:server`,
  `setup`, `policy`, and `guides` Vitest projects run in the sandbox (`npm.cmd run …`); nine
  `Ollama setup` cases fail under the sandbox and are documented; `prove` is unreachable; the
  network is denied (the `catalog` command's live path is UNRESOLVED for you — read the
  Orchestrator's V3 reading). Every evidence file is staged beside this brief in `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — API feel, names, the shape of
  `HostManifest.surface`, `readSurfaceBaseline`, `HostStageOptions`, the `surface` rule's message,
  the rule prose in `names.md` and `workspace.md`, the guide voice (`AGENTS.md` § Writing,
  `.claude/rules/writing.md`, § Instruction files). Read the evidence under
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the tree.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every unit's carriers closed
  at the `file:line` its report names; scope honesty per unit; parity; the gate logs.

Perform the audit directly and spawn nothing. Assume the chain left one defect and go looking for
it.

## Subject

The scaffold checkout at `95f7f18b` plus the working tree after: the Orchestrator's rule edits
(`.claude/rules/tests.md` § Condition, `.agents/templates/brief.md` Installed-primitives row,
`.prettierignore` `host.json` line); D4-1b (`REFERENCE_PATHS`, hosted guides at
`dist/host/guides/<bare>.md`, seed guides keep presence claims, `stageHost` refuses a catalog row
without a guide); D4-2b (`catalog` floor: `'floor'` provenance, `EXIT_DRIFT`, guide-only partial
operation on registry outage with `note`, the `audit` question); D4-3 (the vendored `surface`
policy rule: barrels through `createSource().surface()`, own `tests/setup*.ts` exports minus
vendored, hosted guides minus own guide, bare-name identity, grandfather by own hosted guide, setup
fail-closed, `surface name belongs to one package: NAME (OWNER)`); U14/U14b (`readErrorCode` →
`captureScaffoldCode` on the installed `captureError`); D4-1c and D4-1e (`stageHost` refuses
cross-guide collision growth against the committed inventory: `HostManifest.surface`,
digest-covered; `readSurfaceBaseline`; `HostStageOptions.inventory` and `INVENTORY_NAME`; an absent
inventory establishes the baseline, a present one without `surface` is refused; the one-time seed
of 127 collisions); U15 (`tests/distribution.test.ts` expectations); D4-4 (prose). The design
record is `plan.md` § Re-baseline 3 with its D4-1d addendum; the lane reports
`D4-design-planner.md` and `D4-design-astra.md`; the user's rulings are in § Re-baseline 2.

## Review evidence

- `AD4-diff.patch` — the whole chain (`git diff HEAD`, tracked files; `.orkestrel/` and
  `guides/supervisor.md` excluded).
- The unit reports: `D41b-scaffold-host-guides-report.md`, `D42b-scaffold-catalog-floor-report.md`,
  `D43-scaffold-surface-rule-report.md`, `U14-scaffold-setup-rename-report.md`,
  `U14b-scaffold-setup-rename-report.md`, `D41c-scaffold-growth-refusal-report.md`,
  `D41d-scaffold-inventory-baseline-report.md` (stopped), `D41e-scaffold-inventory-baseline-report.md`,
  `U15-scaffold-distribution-expectations-report.md`, `D44-scaffold-prose-report.md`.
- The Orchestrator's gates: `V3-scaffold-verify-report.md` (the authoritative run: format, lint,
  check, build, test, distribution, the CLI's own audit reading) and the per-unit gate logs
  (`D41b-…`, `D41c-…`, `D41e-…`, `U14b-…-gates-orchestrator.log.txt`).
- The probes: `P6-surface-collisions.txt` (113 names in more than one guide at the time),
  `P7-setup-collisions.txt` (the setup-helper hits across the fleet), the D4-1e seed reading (127).

## Numbered falsifiable claims

1. **Every guide the catalog names is hosted**, at `dist/host/guides/<bare>.md`, and a catalog row
   without a guide refuses the stage; the seed guides `guide.md` and `scaffold.md` are still
   planted by `new`, the rest never are.
2. **The `catalog` floor is honest.** With the registry unreachable the command still refreshes
   guides from the host with `'floor'` provenance, exits `EXIT_DRIFT` where the floor differs from
   the registry's last reading, records a `note`, and `audit` asks whether a mirror differs from
   the hosted guide. Falsify with a path that reports a floor as live or a live reading as a floor.
3. **The `surface` rule reads what it claims and refuses what it cannot read**: barrels through
   the guide tooling's `surface()`, own setup exports through `extractExports` minus the vendored
   set, the comparison population hosted guides minus the target's own guide, bare-name identity
   case-sensitive, grandfather only by the target's own hosted guide, setup exports fail-closed,
   an incomplete barrel population refused loudly, a missing host refused. Falsify with a
   collision it cannot see (a re-export list, a `type`, a namespace) or a false positive (a name
   the target's own guide owns).
4. **The growth refusal is live in the canon checkout.** The baseline is the committed
   `host.json`'s `surface` (D4-1e's build log reads `Inventory Surface baseline: …host.json`);
   growth over that set refuses the stage; a removed collision stages; an absent inventory
   establishes; a present inventory without `surface` or with a malformed one refuses; the digest
   covers `surface` so a hand-edited set fails `readHostManifest`, `isHost`, and the target-side
   verifications in `Materializer` and `Upstream`. Rule whether R4 (no accept path) holds: is there
   any way a new collision reaches a release without a rename?
5. **The seeded set is the grandfathered set.** 127 collisions at the seed vs 113 at P6: account
   for the difference (guides added or changed between the probes) or name a defect in the reading.
6. **`captureScaffoldCode` is one narrowing over the installed `captureError`**, every caller
   renamed, and the `surface` rule's own reading of this checkout is green.
7. **The distribution proof is exact**: `expanded` lists every hosted file literally, `staged`
   contains `REFERENCE_PATHS`, the printed-examples expectation matches the shipped declarations.
8. **The prose is true and homed once.** `names.md` § Fleet name ownership carries R1–R4 as
   directives and nothing else restates them; `workspace.md` § Policy instruments names `surface`
   under its narrowed "rule id" line (rule on the narrowing: acceptable, or restore the line and
   move the bullets); `guides/scaffold.md` states the hosted root, the floor, the audit question,
   the refusals, and the inventory rule as the code has them; `guides/README.md` § Line reference
   is true; parity green.
9. **The vendored surface moved on purpose only.** Every changed byte under the host set
   (`.claude/rules/*`, `.agents/templates/brief.md`, `.prettierignore`, `tests/setupPolicy.ts`,
   `tests/policy.test.ts`, the hosted guides) is one of the named units' — nothing else in
   `dist/host` moved; `host.json` regenerated.
10. **Nothing re-implements an installed export** (`@orkestrel/guide`, `@orkestrel/test`,
    `@orkestrel/contract`); the reuse rulings in the reports hold.
11. **The scaffold release is ready**: bump and publish scaffold first, then re-pin and `repair`
    every target (the vendored set moved: rules, template, the `surface` policy rule,
    `.prettierignore`), knowing each target's `test:policy` will fire the `surface` rule on its own
    setup helpers (P7) until its U14-* cleanup lands. Name what must change first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:`, and ONE terminal
line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
