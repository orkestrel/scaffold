#!/bin/bash
export BENCH_LOCK=.bench-5.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G relation-r2-checker-luna $B/relation-r2-checker-brief.md /home/user/fleet/relation
