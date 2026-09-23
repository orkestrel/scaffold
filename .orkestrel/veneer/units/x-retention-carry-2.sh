#!/bin/bash
# X-RETENTION-2 on GPT-5.6 Luna (the absorption ladder's second step: the Cursor bench timed out its probe at 22:24 UTC),
# read-only, rooted at /home/user/scaffold: a bounded liveness probe, then the carry check. Cap 1500 s (the brief reads
# register files, the folder listing, and git logs; the earlier carry pass on Grok ran well inside 1800 s).
# Brief: .orkestrel/veneer/units/x-retention-carry-2-brief.md  Journal: tmp/codex/x-retention-carry-2.jsonl
# Last message: tmp/codex/x-retention-carry-2-last.md  Log: tmp/codex/x-retention-carry-2.log.txt
cd /home/user/scaffold || exit 1; mkdir -p tmp/codex; LOG=tmp/codex/x-retention-carry-2.log.txt; : > $LOG
TS=$(date -u +%Y-%m-%d-%H%M)
timeout 180 codex exec --json -C /home/user/scaffold --sandbox read-only --model gpt-5.6-luna -c 'model_reasoning_effort="low"' --output-last-message tmp/codex/probe-luna-$TS-last.md "Reply with the single word ready and nothing else." < /dev/null > tmp/codex/probe-luna-$TS.jsonl 2> tmp/codex/probe-luna-$TS.err
echo "=== probe exit=$? last=[$(tr -d '\n' < tmp/codex/probe-luna-$TS-last.md 2>/dev/null)] ($(date -u +%H:%M:%S))" >> $LOG
grep -qi '^ready' tmp/codex/probe-luna-$TS-last.md 2>/dev/null || { echo "=== Luna dark; lane not launched" >> $LOG; exit 1; }
timeout 1500 codex exec --json -C /home/user/scaffold --sandbox read-only --model gpt-5.6-luna -c 'model_reasoning_effort="medium"' --output-last-message tmp/codex/x-retention-carry-2-last.md "Your working directory is /home/user/scaffold. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/x-retention-carry-2-brief.md exactly. Make your final message the output the brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/x-retention-carry-2.jsonl 2> tmp/codex/x-retention-carry-2.err
echo "=== lane exit=$? last=$(wc -c < tmp/codex/x-retention-carry-2-last.md 2>/dev/null) ($(date -u +%H:%M:%S))" >> $LOG
