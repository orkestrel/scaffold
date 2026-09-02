#!/bin/bash
cd /home/user/scaffold
timeout 150 agent -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Reply with the single word READY and nothing else." > tmp/cursor/probe-json.log 2> tmp/cursor/probe-json.err
echo "probe-json-exit=$?"
head -c 1200 tmp/cursor/probe-json.log; echo; echo "stderr:"; head -c 400 tmp/cursor/probe-json.err
