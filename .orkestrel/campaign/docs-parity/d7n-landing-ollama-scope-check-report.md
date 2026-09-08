# Ollama landing allowlist check

1. L1 — CONFIRMED

Evidence: `tmp/pass/land-p2.sh:60-65` adds a match only for the `ollama:fix:` tuple and the named `tests/setup.test.ts`, `tests/service/budget.test.ts`, `tests/service/tools.test.ts`, `tests/service/lifecycle.test.ts`, `tests/service/compaction.test.ts`, and `tests/service/OllamaProvider.test.ts` paths. The match uses the package and stage prefix, so another package or stage cannot use these exceptions. All other paths continue to the unchanged stage allowlist at lines 64-70. The supplied diff is limited to this case insertion.

2. L2 — CONFIRMED

Evidence: `tmp/pass/d7n-landing-ollama-scope.diff.txt` contains only the bounded case insertion. The branch, report, staged-state, tracked-only, changed-path, fresh-artifact, retention, identity, and session-trailer logic remains identical to `.orkestrel/campaign/docs-parity/instruments/d7/windows/land-p2-trailers.sh:53-91`, as shown by the retained trailer and the current script.

3. L3 — CONFIRMED

Evidence: `tmp/pass/land-p2.sh:60-71` only decides whether a changed path reaches the existing admission cases; it performs no content or token comparison. The landing body at `tmp/pass/land-p2.sh:77-86` records the diff and status, stages admitted paths, and commits them. The ported Ollama brief assigns comment-only review and source checks to the writer and package checker, so this script does not claim to prove token equality. `bash -n tmp/pass/land-p2.sh` exited 0; the landing body was not executed.

VERDICT: PASS
