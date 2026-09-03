#!/bin/bash
# L4 reconcile lanes, first slice, on lock 1.
export BENCH_LOCK=.bench.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G brief-reconcile-luna $B/brief-reconcile-brief.md /home/user/fleet/brief
bash $G probe-reconcile-luna $B/probe-reconcile-brief.md /home/user/fleet/probe
bash $G program-reconcile-luna $B/program-reconcile-brief.md /home/user/fleet/program
