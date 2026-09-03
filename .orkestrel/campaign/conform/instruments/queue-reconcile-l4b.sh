#!/bin/bash
# L4 reconcile lanes, second slice, on lock 5.
export BENCH_LOCK=.bench-5.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G worker-reconcile-luna $B/worker-reconcile-brief.md /home/user/fleet/worker
bash $G workflow-reconcile-luna $B/workflow-reconcile-brief.md /home/user/fleet/workflow
