# Plan 2 — the wiring sweep and the one-process deletion

Reconciled from the blind design2 lanes on 2026-08-27: `design2-objective-grok-report.md` (Cursor
Grok, the recorded substitution for Sol) and the subjective lane's report
(`design2-subjective-report.md`, Opus 5). The owner fixed the scope: the harness wiring joins the
canon, the catalog file stays vendored, and one `overwrite` run sweeps a target clean.

## Rulings where the lanes disagreed

1. **The catalog file is planned by the compiler, not listed in `HOST_PATHS`.** The stager
   refuses two staged claims at one storage name, so listing `.claude/agents/orkestrel.md` in
   `HOST_PATHS` beneath a canon `.claude/agents` directory would refuse the build; the objective
   lane's destination-union repair adds a stager law the subjective shape never needs.
   `nameToHostArtifacts` appends `CATALOG_AGENT_PATH` beside its `HOST_PATHS` selection, with the
   reason in its remarks and no new constant (the wrapper test refuses a one-member set).
2. **Superseded canon copies become foreign findings; the `canon` advisory is deleted.** The
   audit's `#derive` snapshot gains each `CANON_PATHS` member present in the target, gated by the
   plan's selected groups through `inferGroup`. Planned paths pair with their artifacts and never
   reach `foreign`. `Materializer.remove` then deletes the tracked ones unchanged — one candidate
   list, one transaction, one `removed` array — and `#canonQuestion` goes, because a second
   channel naming the same files is a duplicate that drifts. The objective lane's rejection of
   this route rested on the advisory staying, which the owner's less-machinery instruction
   overrides; its concerns survive as controls: a non-git target still sees leftovers as audit
   findings, untracked files are never deleted, and a scoped audit stays silent outside its
   groups.
3. **The behavioural consequence is deliberate and documented**: a target holding a superseded
   copy moves from exit 0 with an advisory to exit 1 with a finding. That is the fleet visit's
   mechanical success condition.
4. **The maintainer's seam**: an ignored `.mcp.json` survives every visit (untracked paths are
   outside `remove`'s law and ignored paths are outside the dirty refusal), which is how a target
   restores the `prove` server locally. The limit lands once, in `.claude/rules/quality.md`
   § Instruments; the guide's Limits entry points at the same fact.
5. **Deletion is by path membership, never byte identity** — identity would spare exactly the
   stale copies the sweep exists to take.
6. **Both lanes' shared rulings stand**: the catalog file stays planned (`catalog` skip-on-absence
   would be a silent no-op defect), fetch and hydration are unaffected by
   `isCanonPath('.claude/agents/orkestrel.md')` going true, no policy inspection binds
   `.codex`/`.cursor` presence, and the kept `orkestrel.md` line "Read `.agents/orchestration.md`
   first" is rewritten to the installed storage spelling.

## Units and routing

Serial writers, clean committed baseline each, every implementation unit on the Opus
`implementer` (recorded substitution: the Codex bench is dark).

- **W4 — membership and the plan's second overlap.** `src/core/constants.ts` (the swept members
  move to `CANON_PATHS`), `src/core/compilers.ts` (`nameToHostArtifacts` appends
  `CATALOG_AGENT_PATH`), core tests (disjointness by prefix, the canon-claims set becomes
  `AGENTS.md`, `CLAUDE.md`, `.claude/agents/orkestrel.md`).
- **W5 — the sweep and the advisory's retirement.** `src/server/Materializer.ts` (`#derive`
  canon population), `src/bin/CLI.ts` (`#canonQuestion` deleted), server and bin tests with the
  negative-control table from the design reports, `tests/setupServer.ts` fixtures.
- **W6 — documentation, canon content, inventory.** `guides/scaffold.md`, `README.md`,
  `ROADMAP.md`, the wave reference (visit collapses to re-pin → `scaffold overwrite` → gates),
  `.claude/rules/quality.md` § Instruments, `.claude/agents/orkestrel.md`, regenerated
  `host.json`.
- **A2 — falsify round.** `reviewer` (Opus, subjective) and Cursor Grok (objective, the engine
  that wrote none of it), blind, one brief.
- **V2 — gates.** `verifier` on Sonnet: `format:check`, `lint:check`, `check`, `build`, `test`,
  `test:distribution`.

## Exit criterion

The follow-up closes when the swept wiring paths are canon and unplanned; the plan claims exactly
the pointer pair and the catalog file inside the canon and `catalog` still rewrites a generated
target's table; `audit` reports an unplanned canon path as a group-scoped foreign finding and
exits 1 on one; one `overwrite` run repairs the pointers and deletes every tracked leftover while
sparing planned paths, untracked paths, and `src/`/`app/`; `repair` deletes nothing; no file
scaffold leaves in a target names a path the target lacks; the documentation agrees with what
shipped; and the gates are green.
