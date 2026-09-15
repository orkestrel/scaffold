# Audit A13 — falsify unit U13b (`@orkestrel/ollama`: a real model drives an agent inside a real Chromium page)




## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b). You cannot launch a browser or reach the
  daemon: read the Orchestrator's captured `test:service` output and the writer's receipts as the
  execution evidence, and name every vector you could not run as `UNRESOLVED` with its exact
  command.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane; **your engine wrote this
  unit** — attack its own decisions first (the import map, the fixture composition, the direct
  case's gate, the retry wording, the guide's contract 13 rewrite).
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every clause of the rewritten
  contract 13 against a named assertion in `tests/service/page.test.ts`; the `## Tests` row; the
  hard-throw gates; helper reuse against the installed `@orkestrel/test` surface; scope.

## Subject

The `ollama` checkout at checkpoint `295fecb` plus U13b's working tree (report `.orkestrel/campaign/U13b-ollama-page-proof-report.md`;
brief `U13b-ollama-page-proof-brief.md`; design `D3-design-planner.md`, `D3-design-astra.md`,
`plan.md` § Re-baseline 3 D3). Assume the unit has one more defect.

**Review evidence:** `tmp/units/A13-diff.patch` (`git diff HEAD`, untracked full text, status);
the Orchestrator's gates `U13b-ollama-gates-orchestrator.log.txt`; the Orchestrator's own
`npm run test:service` output `U13b-ollama-service-full.log.txt` (the authoritative run, per-case
timings); the probe `P5d-collide-after-u13b.log.txt`.

## Numbered falsifiable claims

1. **The published closure evaluates in a real page from an import map** with no page error and
   no console failure, before any agent runs. Falsify with a root entry the page could not load.
2. **The relay case is the receipt**: the model's recorded tool call, the agent's `tool` result,
   the DOM receipt read through `evaluate`, the same receipt inside the next `/inference` and
   `/api/chat` requests, completion with `partial: false`; exactly one page `POST /inference` per
   turn and zero page requests during tool execution; `retryUntil` at most 3 attempts with request
   accounting asserted on every attempt. Falsify with an assertion the receipt does not carry or a
   count that a preflight or a stray request would break.
3. **The positive control proves the recorders can report**: a deliberate `/control` request seen
   by the CDP log, the Resource Timing drain, and the fixture record.
4. **A wrong bearer is refused before the daemon is contacted.**
5. **The direct case** drives `createOllama` from the page behind `requireDaemonOrigin`, asserts
   a `POST /api/chat` on the daemon origin by filtering, never by a total.
6. **Every precondition throws, none skips**: daemon and model, Chromium (resolved on call, never
   at `setupService.ts` load), `dist` present, daemon origin; fresh owned profile, `cdp.discover:
   false`, ephemeral CDP port; teardown registered as acquired, browser destroyed in `finally`.
7. **The fixture extends, never copies**: `createPageFixture` and `createRelayServer` share one
   dispatcher; `buildImportMap` derives the map from `node_modules/@orkestrel/*` manifests;
   `PAGE_TOOL` is one source for the tool across the string boundary; the setup proofs cover the
   new exports.
8. **Nothing re-implements an installed export** (`@orkestrel/test`, `@orkestrel/contract`,
   `@orkestrel/browser`); no deferred, poll, or deadline read where an export exists.
9. **The guide is true**: contract 13 states the gated reading (each clause has an assertion),
   `### Running in the browser` and `### Relaying through your own server` match the proof, and
   `## Tests` names the file and its cases; the retry bound is stated honestly.
10. **Nothing else moved**: only owned files; `src/**`, manifest, lockfile, mirrors untouched;
    `tmp/probe/` empty.
11. **Rules and tests**: no `any`/`as`/`!`/suppression/nested function/mock; tests named for
    what they prove; the three weakest and their mutations.
12. **Would you ship it** (X8 in full, with U5's receipts beside it)?

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line.

## Already established — do not re-run

Verified by the Orchestrator: the ollama gates with build after U13b all exit 0 (`U13b-ollama-gates-orchestrator.log.txt`: core 100, setup 113, policy 90+1, config 172+1, guides 17); the authoritative `npm run test:service` on the host is at `U13b-ollama-service-full.log.txt` (read it for every execution reading). The export-name probe `P5d-collide-after-u13b.log.txt` reports ONE collision: `tests/setupServer.ts:1100` exports `readPage<T>` while the installed `@orkestrel/test/browser` exports `readPage(): string` — a different job under the same name, which the fleet rule (`.claude/rules/tests.md` § Condition, last paragraph) counts as a defect whichever file declares it first; carry it under claim 8 as BROKEN unless the diff already renames it. The daemon was down at launch and U13b started `ollama serve` (recorded); it answers now.
