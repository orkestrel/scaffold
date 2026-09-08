# Check the ollama landing allowlist

Act as checker. Read scaffold AGENTS.md, .agents/orchestration.md, the portability,
writing, and quality rules, and the orkestrel-falsify skill and required references.
Perform directly and spawn nothing. Do not execute the landing body, edit files,
install, commit, push, or change permissions. Syntax checks and read-only comparison
are allowed. Root authored this bounded mechanical integration; review independently.

Subject: tmp/pass/land-p2.sh after the ollama path amendment, compared with the retained
instruments/d7/windows/land-p2-trailers.sh. The actual diff is saved at
tmp/pass/d7n-landing-ollama-scope.diff.txt. No other active shell runs this file.
Read the ported ollama fix brief's owned files. It explicitly owns comment text in
tests/setup.test.ts and the service-test paths listed by O4; the old landing allowlist
would refuse those owned changes.

L1. The amendment admits only ollama fix-stage changes to tests/setup.test.ts and
tests/service/budget.test.ts, tools.test.ts, lifecycle.test.ts, compaction.test.ts,
and OllamaProvider.test.ts. It grants no such paths to another package or stage.
L2. Existing branch, report, tracked-only, staged-state, allowed-path, no-overwrite,
explicit-path commit, retention, identity, and session-trailer rules are unchanged.
L3. The script grants path admission only; root and the package checker still verify
comment-only changes before landing. The script does not claim to prove token equality.

Return per-claim evidence and a terminal verdict at
tmp/units/d7n-landing-ollama-scope-check-report.md. Preserve existing reports and artifacts.
