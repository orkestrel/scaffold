#!/bin/bash
export BENCH_LOCK=.bench-4.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G interpret-prose-checker-luna $B/interpret-prose-audit-brief.md /home/user/fleet/interpret
