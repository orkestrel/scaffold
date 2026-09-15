# Audit A13f — close the U13h round and the U13 chain (`@orkestrel/ollama`: the page proof)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b–U13h). Execute the hermetic setup proofs
  (through a non-writing Node loader if Vitest's writes are refused, as before); live vectors are
  `UNRESOLVED` with the exact command. Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U13h carrier closed at
  the `file:line` the report names; the red readings; scope; the probe; the chain walk (claim 8).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (the Astra
lane reads the staged copies) and the ollama tree at `C:/Users/mikes/WebstormProjects/ollama`.
Perform the audit directly and spawn nothing. This round closes the chain: rule on every claim and
name any remaining defect with its vector, or state the chain is closed. The subjective lane ran
at A13e and its findings are the subject here; it is not re-run (recorded in the ledger).

## Subject

The `ollama` checkout at checkpoint `295fecb` plus the working tree after U13b, U13c, U13e, U13f,
U13g, U13h (brief `U13h-ollama-page-fix-brief.md`, report `U13h-ollama-page-fix-report.md`).
Previous verdicts: `A13e-audit-analyst.md` (`FAIL 1, 3, 4, 6, 8, 9, 11`), `A13e-audit-reviewer.md`
(`FAIL 2, 4, 8, 9`; O1–O7, R1–R3), `A13e-audit-checker.md` (`PASS`); the Orchestrator's probe
`P15-timer-probe.md` and residue readings `K-edge-residue-after-u13g.txt`.

## Review evidence

- `U13h-diff.patch.txt` (`git diff HEAD`), `U13h-page.test.ts.txt` (the untracked page proof),
  `U13h-unit-only.patch.txt` (the unit's own delta against the rebuilt U13g baseline);
  `U13g-diff.patch.txt`, `U13g-page.test.ts.txt`.
- `U13h-ollama-page-fix-report.md` — the writer's report with the red readings and the mutation
  logs.
- `U13h-ollama-gates-orchestrator.log.txt`, `U13h-ollama-gates-test-full.log.txt` — the
  Orchestrator's gates after U13h; `U13h-ollama-service-verbose.log.txt` — the authoritative
  whole-`service` run; `collide3-ollama-after-u13h.txt`; `K-edge-residue-after-u13h.txt`.

## Numbered falsifiable claims

1. **The cancellation ruling is exact at every site** (A13e-O 1, 6): the signal races discovery,
   the port-free check, the launch, and `client.connect()`; the target listing that connection ends
   with (`Target.getTargets`, unraced at the dependency) and every page command after it take a
   per-call `timeout` and are bounded by the attempt race. No sentence claims the signal ends the
   whole connection. Verify against `node_modules/@orkestrel/browser/dist/src/server/index.js`
   (`:1046,1052,1053,1235,1295,1398`).
2. **The ceilings state their slack** (A13e-O 3): `SCHEDULE_SLACK` (`tests/setupServer.test.ts:270`)
   with `nominal ≤ elapsed < nominal + slack` on the parked-acquisition and parked-release cases;
   execute them and read the elapsed values against the bands (`150 ≤ e < 650`; `50 ≤ e < 550`).
3. **The cause chain is asserted** (A13e-R R1): the composed failure's `cause` is the attempt's
   expiry error; the crossed release's `cause` is the deadline's `TimeoutError`; the dropped-cause
   mutation reddened both.
4. **The timer ruling is recorded and true** (A13e-R R2, P15): an armed `AbortSignal.timeout` is
   unref'd on Node 24 and holds neither a worker nor the process; nothing is cleared.
5. **The prose is homed and true**: contract 13 (`guides/ollama.md:124`) states the guarantee and
   the exact ruling once; `:358` names `PAGE_TOOL` under `tests/setup.test.ts`; `:359` states the
   intervals, the slack, and the causes; the count sentence is gone; the completeness clause names
   the fixture start and the port reservation as unbounded by shares.
6. **`PAGE_INTERVALS` and `launches`** (A13e-R O5, O6): the matrix lives beside `PAGE_BOUNDS`,
   exported and proved for its containments; `launches` replaces `attempts` at every reader.
7. **Nothing else moved; nothing re-implements an installed export**: the five owned files; the
   three untouched setup files byte-identical to U13g; the probe clean; no headless Edge.
8. **The chain is whole.** Every FAIL from A13 through A13e names a closing test or a recorded
   ruling in the tree.
9. **The authoritative service run is green**, controls included, within their bounds; the gates
   exit 0.
10. **The ollama tree lands** — commit on `295fecb` after the `guides/agent.md` mirror refresh, no
    version bump on this diff alone (A13e-R 11; the campaign-level bump follows the agent runtime
    edge). Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:` (or `outside:
none — chain closed`), and ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
