#!/bin/bash
# L5 and L6 reconcile lanes on lock 4.
export BENCH_LOCK=.bench-4.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G agent-reconcile-luna $B/agent-reconcile-brief.md /home/user/fleet/agent
bash $G ollama-reconcile-luna $B/ollama-reconcile-brief.md /home/user/fleet/ollama
bash $G toolbox-reconcile-luna $B/toolbox-reconcile-brief.md /home/user/fleet/toolbox
