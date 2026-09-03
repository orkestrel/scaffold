#!/bin/bash
# Successor of queue-reconcile-l3-luna2.sh: the last three reconcile lanes on lock 3.
export BENCH_LOCK=.bench-3.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G queue-reconcile-luna $B/queue-reconcile-brief.md /home/user/fleet/queue
bash $G relation-reconcile-luna $B/relation-reconcile-brief.md /home/user/fleet/relation
bash $G scaffold-reconcile-luna $B/scaffold-reconcile-brief.md /home/user/scaffold
