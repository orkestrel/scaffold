# Audit verdict — unit breaking-ollama

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the subjective lane did not run (the unit carried a refusal, an options type,
and upstream carries — below the wide-unit trigger). Subject: commit `6a92c05`
(`units/ollama.diff`, `units/ollama-report.md` with the Orchestrator's corrections,
`units/ollama-report.json`), then the fix-up at `795782d` (`units/ollama-fixup-brief.md`,
`units/ollama-fixup-report.md`, `units/ollama-fixup.diff`, `units/ollama-fixup.status`, checker
lane `units/ollama-fixup-audit-checker-brief.md`). The unit ran against `agent-f0c4979.tgz` and
the L3 and L4 tips (`stage-l6-ollama.log`, `verify-l6-ollama.log`).

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s18-09 refused; s18-34; the agent, ndjson, and budget carries) | BROKEN (the refusal restated the rule instead of quoting it; the `partial` carry closed silently) | CONFIRMED | — | closed by the report correction: the clause is quoted verbatim, `partial` recorded as a no-op |
| 2 no old name; the new contract in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (no edit plus the mirror TSDoc for s18-09; a named exported options type for s18-34; `channel`, `category`, `fault`, `clear`, `consumer`) | CONFIRMED | CONFIRMED | — | stands; the options type's name is re-ruled in the fix round |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and `@example` fences; no `INTERNAL` list; executed assertions | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | CONFIRMED as quoted | landing chain GREEN at `795782d` (`land-fixup.log`: format:check, lint:check, check, build, test all exit 0; `src:server` 98) | stands |
| 8 nothing hidden | CONFIRMED | CONFIRMED | — | stands; F4 answered by narrowing criterion 1 to the hand-authored files |

Rulings of record: s18-09 stays refused under the external-mirror clause of `names.md` § General
vocabulary, with the mirror TSDoc landed at `src/server/types.ts:90-95` and
`src/server/constants.ts:10-13`; `OllamaErrorOptions` names an entity the package does not
export, so the s18-34 carrier is renamed `OllamaHTTPErrorOptions` (objective referral, the fix
round); the wire member `type: 'function'` on `WireChatRequest` against the vocabulary's "never
`type` as a member name" clause (objective F2) is a `names.md` question for scaffold, recorded in
the findings file rather than changed here; the stale vendored `guides/agent.md`,
`guides/budget.md`, and `guides/ndjson.md` mirrors (objective F3) refresh at the re-pin (the W-END
`mirror-refresh` row, blocked while publishing is held); the supplied diff omitted the untracked
`tests/src/server/errors.test.ts` (objective F1), and `instruments/landbreaking.mjs` marks
untracked files with `git add -N` before rendering the diff from this unit on.

Fix round (`builder` on Sonnet, `795782d`): `OllamaErrorOptions` → `OllamaHTTPErrorOptions` at
`src/server/types.ts:152`, `src/server/errors.ts:6,32`, `guides/ollama.md:69`, and
`tests/src/server/errors.test.ts:1,6,10,12`; the sweep over `src`, `tests`, `guides/ollama.md`, and
`README.md` returns no hit. Landed with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Checker on the fix-up: PASS on every claim.

Recorded for the next change: the `README.md` `guides/src/` links (the `readme-links` second
pass, owed to ollama and toolbox); the wire-member `type` question for `names.md`.

Terminal lines: objective `FAIL 1` closed by the report correction and the fix round; checker
PASS on both rounds; the landing chain GREEN. **Verdict: PASS.** The unit closes **applied** for
s18-34 and the carries and **refused** for s18-09. Tip packed: `ollama-795782d.tgz`.
