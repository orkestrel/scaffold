# TSDoc voice wave — plan (opened 2026-09-02)

The user ruled on 2026-08-28: migrate the fleet to the rule's third-person first sentence and the
boolean `@returns` wording, last, after every other fix unit has landed. Every breaking layer and
W-END have closed, so the wave opens.

## Exit criterion

Every package's `src/` and `app/` TSDoc opens each block with a third-person `-s` verb sentence
that never repeats the symbol's name, and every boolean `@returns` reads `True if …; false
otherwise`; `instruments/voice-scan.mjs` reports zero imperative first sentences and zero boolean
`@returns` in another wording for every package, and the residual verbless bucket is read hit by
hit and ruled (a backtick-led or noun-led sentence the rule permits stays); every unit's gate chain
is green on the Orchestrator's landing run; every tip is committed and pushed on
`claude/orkestrel-npm-audit-deps-14ibta`. Publishing stays held.

## Bench liveness at dispatch

- Sol (`codex`): binary absent — dark. Every Opus-or-Sol lane runs on Opus 5 in a clean context,
  told so; recorded per verdict.
- Grok (`agent` 2026.08.31-4057e58): live — a bounded round trip answered `READY`
  (`tmp/cursor/probe.log`). The wave's absorption is a measurement, not a reading, so the
  Orchestrator's own instrument (`voice-scan.mjs`, before-scan retained as `scan-before.txt`)
  grounds the plan and Grok holds no lane.

## Units and routing ledger

| Unit | Role | Engine | Scope |
| --- | --- | --- | --- |
| `voice-<package>`, every package except `lsp` | `implementer` | Opus 5 | TSDoc text under `src/**` and `app/**` of one checkout |
| `voice-<package>` subjective audit | `reviewer` | Opus 5 (clean context; Sol dark) | meaning kept, verb fit, no over-reach |
| `voice-<package>` checker audit | `checker` | Sonnet | comment-only hunks, tokens intact, status, sweep, gates as quoted |
| `voice-<package>` landing | Orchestrator | — | `instruments/land-fixup.mjs` with `PACK=0`, `UNITS_DIR`, `RETAIN_DIR`; the authoritative gate run; commit and push |
| `voice-<package>` fix round | `builder` | Sonnet | the residues a lane names, in a successor brief |
| acceptance | Orchestrator | — | `voice-scan.mjs` after landing; verdict under `voice/units/<package>-audit-verdict.md` |

The objective lane (`analyst` → Opus `reviewer` holding it) runs when the subjective lane returns
FAIL on meaning (claim 1) or when a checker finds a code token moved.

## Slices

Two writers at a time on disjoint checkouts (4 CPUs); lanes read-only. Slices report as they
finish, smallest first so the pilot proves the brief before the large trees spend Opus:

1. pilot: ndjson codec emitter abort sse timeout sqlite ollama
2. budget worker relation rater pool websocket template tool
3. indexeddb router workspace probe qualifier queue program sea
4. test server csv guide brief html interpret msg
5. middleware form toolbox terminal markdown database process console
6. table agent reason browser workflow mcp contract scaffold

`lsp` is excluded on the scan (zero in every bucket). Each slice runs as one Workflow: per
package, implement → (subjective, checker) in parallel; the Orchestrator lands and re-scans.

## Standing conditions

- Every checkout is committed clean at its handoff tip with the fleet closure staged.
- Parity tests compare `@example` fences and backticked names, never a first sentence; the wave
  leaves both untouched.
- A tree-wide `npm test` under two concurrent writers can miss a deadline; the Orchestrator's
  landing chain is the deciding run.
