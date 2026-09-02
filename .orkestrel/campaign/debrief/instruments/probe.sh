#!/bin/bash
cd /home/user/scaffold
timeout 150 agent -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" "Reply with the single word READY and nothing else." 2>&1 | tee tmp/cursor/probe.log
echo "probe-exit=${PIPESTATUS[0]}" | tee -a tmp/cursor/probe.log
