# Audit AD4b — close the D4 chain after the AD4 fix rounds (`@orkestrel/scaffold`)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/scaffold`):
  OBJECTIVE lane. The `setup`, `policy`, `guides`, `src:core`, `src:bin`, and `src:server` Vitest
  projects run in the sandbox (`npm.cmd run …`; nine `Ollama setup` cases fail under the sandbox
  and are documented; `prove` is unreachable; the network is denied — the live `catalog` reading is
  the Orchestrator's `K-catalog-live.json.txt`). Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — the AD4 findings you raised
  (`AD4-audit-reviewer.md`) against what landed; the names, shapes, and prose of D4-5, D4-6, D4-7,
  U16.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every carrier of D4-5, D4-6,
  D4-7, U16 closed at the `file:line` its report names; scope honesty; parity; the gate logs; the
  chain walk (claim 9).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (the Astra
lane reads the staged copies) and the tree. Perform the audit directly and spawn nothing. This
round closes the chain: rule on every claim and name any remaining defect with its vector, or
state the chain is closed.

## Subject

The scaffold checkout at `95f7f18b` plus the working tree after the D4 chain (AD4's subject) and
the AD4 fix rounds: U16 (`captureScaffoldMessage`, `captureScaffoldRejection`), D4-5 (the
reflector's completeness or loud refusal; `HostStageOptions.establish`; `report` silent by default
with the build passing a sink; `readSurfaceBaseline(root, name)` on `HOST_INVENTORY_PATH`;
`readSurfaceCollisions`'s prerequisite as `ScaffoldError`; the vendored policy scratch; the
`_PATTERN` suffix), D4-6 (`SEED_GUIDE_PATHS`; `CatalogResult.membership`; `Question.field` a
field), D4-7 (R4 as the shrink-only invariant; one home per rule; the README; the reflector claim;
the policy setup table), plus the Orchestrator's `@orkestrel/guide` re-pin to `^0.0.19` (with the
three core fixtures), the canon's catalog table refresh, and the `.prettierignore` line. The AD4
verdicts: `AD4-audit-analyst.md` (`FAIL 2 3 4 8 11`), `AD4-audit-reviewer.md` (`FAIL 4 6 8 11`,
F1–F10), `AD4-audit-checker.md`.

## Review evidence

- `AD4b-diff.patch` — the whole chain (`git diff HEAD`); `D45-diff.patch.txt`, `D46-diff.patch.txt`,
  `D47-diff.patch.txt` — the fix rounds' own files.
- The reports: `U16-scaffold-capture-family-report.md`, `D45-scaffold-audit-fixes-report.md`,
  `D46-scaffold-shape-fixes-report.md`, `D47-scaffold-prose-fixes-report.md`.
- `V4-scaffold-verify-report.md` and its `V4-*.out.txt` — the authoritative gates after the chain
  (format, lint, check, build, test, distribution, the CLI's own `audit`, `catalog --help`, the
  post-build status).
- `K-catalog-live.json.txt` — the live catalog reading (provenance `live`, 50 entries).
- `AD4-audit-analyst.md`, `AD4-audit-reviewer.md`, `AD4-audit-checker.md`.

## Numbered falsifiable claims

1. **The `surface` rule accounts for every export or refuses.** Namespace, every declarator of a
   multi-declarator `const`/`let`, enum, class, interface, type, function, export lists, star
   barrels over a namespace are read; an unresolved or unsupported setup export refuses loudly; the
   analyst's two AD4 inputs are pins. Execute the pins; falsify with an export form still passed
   over.
2. **A release build never establishes a baseline silently.** `HostStageOptions.establish`; an
   absent inventory refuses unless asked; the build script passes nothing; the bootstrap and the
   fixtures pass `establish: true`; shrink accepted, growth refused; the digest covers `surface`.
   Rule again on R4 as now stated (shrink-only): is there any route to a wider baseline that the
   `host.json` diff would not show?
3. **The library face is silent by default** and the build passes its sink; the build log still
   carries the baseline line.
4. **The API shape findings landed**: `readSurfaceBaseline(root, name = HOST_INVENTORY_PATH)`,
   `INVENTORY_NAME` gone, `readSurfaceCollisions` refusing a missing `@orkestrel/guide` as
   `ScaffoldError('TARGET')` with the prerequisite in `@remarks`, `SEED_GUIDE_PATHS`,
   `CatalogResult.membership` (one optional entity; the guards derive one fact), `Question.field:
   'guides'` with the path in the message, the vendored policy scratch on `createPolicyScratch`,
   `POLICY_SURFACE_BARREL_PATTERN`, the `capture*` family in one verb.
5. **The prose is true and homed once.** R4 states the invariant the code obeys and names the
   API routes; the identity definition lives in `names.md` alone; `workspace.md` keeps the
   narrowed line and the evidence-location bullet; the `tests.md` paragraph moved to § Shared test
   infrastructure; the README's library-faces and `@orkestrel/guide` sentences and the `catalog`
   pronoun; the reflector claim matches D4-5; the policy setup table's heading and lede; every
   Surface row true; parity green.
6. **The live catalog is honest** (`K-catalog-live.json.txt`: `versions: live`, `guides: live`;
   the declared guides skipped as matching; the agent catalog and the re-pin written) and the floor
   path is the one AD4 confirmed.
7. **Nothing re-implements an installed export**; the reuse rulings hold; `@orkestrel/guide`
   0.0.19 is the installed reading.
8. **The vendored surface moved on purpose only**; `host.json` regenerated by V4's build and
   otherwise untouched; `guides/supervisor.md` is named in the landing pathspec (the Orchestrator's
   ledger row) so a clean clone carries what the inventory declares.
9. **The chain is whole.** Every FAIL and every F1–F10 from AD4 names a closing test, a landed
   change, or a recorded ruling (the Orchestrator's rulings: R4 restated rather than the mechanism
   removed; `@orkestrel/guide` stays a development dependency with the prerequisite documented).
10. **The scaffold release is ready**: bump and publish scaffold first, then re-pin and `repair`
    every target, knowing each target's `test:policy` fires the `surface` rule on its own setup
    helpers (P7) until its U14-* cleanup lands. Name what must change first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:` (or `outside:
none — chain closed`), and ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
