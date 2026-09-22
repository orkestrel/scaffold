#!/usr/bin/env bash
# Unit F4 HOST-OBSERVATIONS run 3 on GPT-6 Astra (`sol` route), the sole writer in the Veneer checkout from 751c3ed; successor of f4-2.sh after run 2 stopped on the absent-class-attribute reading; brief 3 grants the engine file for that one change.
# Brief: veneer/tmp/units/f4-brief.md over the terrain veneer/tmp/units/f4-terrain.md (retained copies under
# scaffold/.orkestrel/veneer/units/). Journal: scaffold/tmp/codex/f4-3.jsonl; last message: tmp/codex/f4-3-last.md;
# exit code: tmp/codex/f4-3.err.
# Sandbox: workspace-write with sandbox_workspace_write.network_access=true, because vitest's browser mode binds a
# loopback listener the default exec sandbox denies (codex-sandbox-probe.log.txt, codex-sandbox-probe-2.log.txt).
# Cap: 10800 s. Observed high mark for an Astra unit of this breadth on this campaign is about 90 minutes
# (the CL-family units); the browser gate chain adds about 5 minutes per run and the unit runs it several times;
# the rest is slack so a cap-kill cannot read as a defect in the work.
VENEER=/home/user/veneer
SCAFFOLD=/home/user/scaffold
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "$SCAFFOLD" || exit 9
timeout 10800 codex exec --json -C "$VENEER" --sandbox workspace-write -c 'sandbox_workspace_write.network_access=true' --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$SCAFFOLD/tmp/codex/f4-3-last.md" "You are the sol role on GPT-6 Astra, the sole writer in this checkout, /home/user/veneer, whose HEAD is $HEAD_SHA on a clean tracked tree. Open and follow ./tmp/units/f4-brief-3.md exactly; it is the effective brief over ./tmp/units/f4-brief-2.md and ./tmp/units/f4-brief.md beneath it, which you also open and follow for every section brief 3 does not change. Read each file in its own command so nothing truncates. Read ./tmp/units/f4-terrain.md FIRST and whole: it is the single home for this unit's measurements, the brief restates none of them, and where the brief and that record disagree the record and the tree win and you stop rather than resolving it. Every path the brief names resolves from this checkout or by its absolute path. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report brief 3 names at ./tmp/units/f4-report-3.md and return its full content as your final message, nothing else." < /dev/null > "$SCAFFOLD/tmp/codex/f4-3.jsonl" 2> "$SCAFFOLD/tmp/codex/f4-3.err"
echo "exit=$?" >> "$SCAFFOLD/tmp/codex/f4-3.err"
