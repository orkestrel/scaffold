# Plan — scaffold as single host, reconciled from the design round

Reconciled by the Orchestrator on 2026-08-27 from the subjective Opus lane
(`design-subjective-report.md`), the objective Opus lane (`design-objective-opus-report.md`), and
the objective Grok lane (`design-objective-grok-report.md`), all run blind on
`design-brief.md`. Every load-bearing mechanism below was verified by the Orchestrator against the
source before adoption.

## Recorded deviations and substitutions

- The Codex bench is dark this session (`codex` CLI absent). Objective design lanes ran on Opus 5
  (per the engine-assignment table) and on Cursor Grok (the user's directed substitution for Sol,
  weighted below Opus and verified). Implementation units route to the Opus `implementer`.
- The `probe` MCP server failed to connect, so the `prove` tool is unavailable. Fallback probes per
  `.claude/rules/tests.md` § Probes stand in, each with its control recorded.
- The plan departs from `PROPOSAL.md` step 1 on membership: `.claude/agents`, `.codex/agents`,
  `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json`, and
  `.claude/settings.json` stay vendored. The mechanical reasons: `Materializer.catalog` throws when
  `.claude/agents/orkestrel.md` is unreadable (`src/server/Materializer.ts:951-954`); with no
  planned directory member, `audit` can never report a foreign finding and `remove` can never act
  (`src/server/Materializer.ts:618-654`); `.mcp.json` registers the `probe` server the root
  contract mandates; and the loading-mechanism decomposition shows these files contribute no bytes
  to the measured context cost, so removing them buys nothing the proposal's goal names. Each Opus
  lane reached this independently.

## Agreements adopted from every lane

- `HOST_PATHS` semantics stay "the set written into a target"; a new staged-only constant carries
  the instruction canon. Staging walks both; `stageHost` sorts entries by storage
  (`src/server/helpers.ts:1464-1465`), so `host.json` and `dist/host` stay byte-identical.
- The pointer pair ships as content-owned `template`-origin `ContentArtifact` beside
  `README.md` — never as a vendored member: `stageHost:1454-1460` refuses two vendored paths at one
  storage name.
- The pointer's `node_modules` fallback names storage paths: `pathToStorage` strips the dot that
  opens each segment, so the staged copies sit at `dist/host/AGENTS.md`,
  `dist/host/agents/orchestration.md`, and `dist/host/claude/rules/`. `PROPOSAL.md:58` is wrong on
  this and the pointer corrects it.
- No deletion mechanism ships. `repair` writes only `missing` and `stale`; the superseded copies
  become unmanaged; the fleet visit performs `git rm -r` and the wave reference documents it.
- `PROPOSAL.md` is retired at acceptance: deleted from the tree, archived here and in git history.

## Rulings on the disagreements

- **Canon membership** (`CANON_PATHS`): `AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md`,
  `.agents/skills`, `.agents/templates`, `.agents/transports`, `.claude/rules`, `.claude/skills`.
  The whole `.agents/` tree leaves (objective lane over subjective): a target holds no partial
  `.agents/` tree, and the pointer's resolution paragraph covers every dangling reference a
  scaffold-supplied file makes. `.claude/rules` is forced out with the pointer conversion: the
  rule-map inspection reddens a target holding rules under a pointer `AGENTS.md` with no rule map.
  `.agents/skills` and `.claude/skills` leave together: the bridge inspection fails a lone side.
- **Live overlay**: the fetch filter in `CLI.#host` and the floor-byte retention in `filesToHost`
  land as a pair. The filter alone would make `filesToHost` return `undefined` on every run
  (`src/server/helpers.ts:1222`) and silently force the floor — the objective lane's finding,
  verified.
- **Superseded advisory** (subjective lane, adopted): `audit` raises a target question naming canon
  members still present in a target, on the `#setupQuestion` precedent (`src/bin/CLI.ts:1359`) —
  detection without deletion, self-extinguishing after the sweep.
- **Policy re-scope**: the vendored skill-family case asserts the relationship against a direct
  read of the family root (binds where the root exists, passes on absence); the path-population
  witness swaps from `.claude/rules/names.md` to `.claude/settings.json`; and a scaffold-side
  mirrored server test asserts the staged inventory carries
  `agents/skills/orkestrel-falsify/SKILL.md` and `claude/rules/names.md`, closing the
  scaffold-trees-vanish hole without a repository-identity branch in a vendored file.
- **ROADMAP**: one sequenced row for the fleet adoption visit (subjective lane over objective; the
  repository keeps a roadmap and the visit outlives this commit).

## Exit criterion

The campaign closes when each of these ends implemented, retained, or intentionally excluded on
evidence:

1. Membership is `HOST_PATHS` plus `CANON_PATHS`; staging carries both; `host.json` is
   byte-identical to a fresh `stageInventory` without regeneration.
2. The pointer pair compiles at `AGENTS.md` and `CLAUDE.md`, content-owned, written by `new` and
   repaired as stale, with storage-correct fallbacks and no `@path` import.
3. The live overlay excludes canon destinations and still overlays planned ones.
4. `audit` raises the superseded advisory; no verb deletes canon leftovers.
5. The vendored policy suite passes on a post-migration target shape and still binds in scaffold;
   the scaffold-side inventory test binds the canon family.
6. `catalog`, `audit`, `repair`, and `overwrite` still act against a generated target.
7. Guide, README, ROADMAP, and every executed fence agree with what shipped; `PROPOSAL.md` is
   retired.
8. The gate chain is green: `format:check`, `lint:check`, `check`, `build`, `test`.

The release and the per-target visit (re-pin, `repair`, sweep, gates) are the follow-up the wave
reference documents; publishing is the user's decision.

## Routing ledger

| Unit | Subject | Role | Engine |
| ---- | ------- | ---- | ------ |
| W1 | Source contract: constants, predicate, templates, compiler, staging, overlay, advisory, and their mirrored tests | `implementer` | Opus 5 (recorded substitution for Sol) |
| W2 | Fixture and proof shadows: `setupServer`, Materializer and distribution tests, vendored policy re-scope, scaffold-side inventory test | `implementer` | Opus 5 (recorded substitution for Sol) |
| W3 | Documentation: guide, README, ROADMAP, wave reference, `PROPOSAL.md` retirement | `implementer` | Opus 5 |
| A1 | Adversarial audit of W1-W3 | `reviewer` + objective lane | Opus 5 + Cursor Grok (user-directed substitution) + `checker` on Sonnet |
| V1 | Authoritative gates | `verifier` | Sonnet |

Orchestrator-owned: serial integration, the build-and-inventory proof between units, reconciliation
of the audit, and acceptance.
