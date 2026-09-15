# Audit A5c — the composition receipts after U5e (`@orkestrel/mcp`)

Successor of `A5b-audit-brief.md` and `A5b-seam-brief.md`. U5e carried the eleven findings A5b
adopted (`A5b-audit-verdict.md`); this round audits U5e's delta and asks whether the receipts ship.

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  the OBJECTIVE lane and the CROSS-ENGINE lane — Claude Opus 5 wrote U5c, U5d, and U5e, so this
  lane is the only auditor that did not share the writer's engine. The sandbox runs no Chromium and
  no install; name each unexecuted vector `UNRESOLVED` with its exact command and read the
  Orchestrator's own runs under Review evidence. Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE lane — whether each fix is the
  right shape rather than the smallest edit that satisfies the words, and whether the header and
  the guide now describe the file that exists.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier present, the
  gates' exit codes, scope, and the sweeps the unit reports.

Perform the audit directly and spawn nothing. Do not write any file.

## Subject

The mcp checkout at `8d97dd0` plus U5c, U5d, and U5e (uncommitted). Briefs:
`U5c-mcp-distribution-brief.md`, `U5d-mcp-distribution-brief.md`, and
`U5e-mcp-receipt-residue-brief.md`, the last winning where they differ; reports:
`U5c-mcp-distribution-report.md`, `U5d-mcp-distribution-report.md`,
`U5e-mcp-receipt-residue-report.md`. The prior round and what it carried:
`A5b-audit-verdict.md` with `A5b-audit-analyst.md`, `A5b-audit-reviewer.md`,
`A5b-audit-checker.md`, and `A5b-seam-verdicts.md`.

## Review evidence

- `A5c-diff.patch.txt` — U5c through U5e against `8d97dd0`, the three fixtures appended in full;
  the status output at its head.
- `A5c-distribution-orchestrator.log.txt` — the Orchestrator's own
  `npm run test:distribution -- --mode release` after U5e, with its duration beside the readings
  before it: 17.99 s at the baseline, 21.55 s after U5c, 22.21 s after U5d.
- `U5e-mcp-gates-orchestrator.log.txt` and `U5e-mcp-gates-test-full.log.txt` — the gates after U5e.
  The policy project's standing red is expected and is not U5e's: it is the published scaffold
  0.0.68 vendored reader refusing an exported function overload, closed by the 0.0.69 re-pin that
  follows this round. Every other project must be green.
- `A5c-tail-gates.log.txt` — the projects the chain never reaches after that red, run directly,
  plus the `distribution-*` teardown reading.
- `P25-u5d-receipt-probe.md` and `P28-u5e-teardown-probe.md` — the Orchestrator's own mutation
  replays. Read them for the claims they settle rather than the units' own reports.

## Numbered falsifiable claims

1. **The residue is gone.** No hunk in the delta over `tests/distribution.test.ts` changes only a
   line break, apart from the `buildStage` return whose added field forces its expansion. The
   unit's sweep names its method and the paths it covered.
2. **The teardown cannot leak.** A stage that rejects still removes the scratch tree, and the
   removal still runs after the close on the path where the stage opened. Name the construct and
   say what it guarantees on each path.
3. **The field reads as what it reports.** The in-page pair receipt's field name and its asserted
   value agree, and a reader cannot repair the assertion the wrong way.
4. **The header is true of the file.** Its opening enumeration is scoped to what the surface drives
   read, and its composition sentence names what those receipts actually name.
5. **No count of a growable set** survives in any prose this campaign added across the owned files;
   the unit's sweep names its pattern, its paths, and its result. A number that is a value rather
   than a count may stay.
6. **The dead field is evidence or absent.** If asserted, the assertion is true of what the walk
   collects and would redden on a silently shrinking graph; if dropped, the reached set is internal
   and no prose still advertises it.
7. **The duplication is gone.** The page's own run functions share one body and differ only in what
   each supplies, and the scripted turns are authored once for both sides.
8. **The authorization can redden.** A receipt drives a refused credential and pins what the
   installed relay answers, so a relay that stopped enforcing it fails this proof.
9. **The flat-install assumption is checked**, not assumed, and the reading it took is recorded.
10. **The route table reads as data**, each handler declared at module scope and referenced by name.
11. **The prose corrections are true**: the closure comment states what the assertion pins, the
    guide bullet claims no more than the assertion checks, the two-item list drops its serial comma,
    and the cancellation comment names the package's own unforwarded reason as the limit.
12. **Green.** The Orchestrator's release-mode run exits 0 with every receipt including the new
    refusal green; format, lint, check, and build exit 0; the tail projects exit 0; the only red
    anywhere is the policy project's standing one.
13. **Scope.** Only the five owned paths moved; no `src/**`, manifest, or configuration hunk; no
    package added anywhere; no `any`, assertion, nested function, or default export in the hunks.
14. **Ship it as mcp 0.0.31** after the scaffold 0.0.69 re-pin clears the policy sweep and
    `prepublishOnly` runs green? Name what must change first if not, with the vector. Rule on the
    bump's own trigger too: the delta under audit publishes nothing, and `K-dist-compare-mcp-v31.txt`
    reads the rebuilt `dist/` against the published 0.0.30.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence (`file:line`);
findings outside the claims under `outside:` (each tagged required, recommended, or
carry-forward; or `outside: none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim
numbers>`. Nothing else.
