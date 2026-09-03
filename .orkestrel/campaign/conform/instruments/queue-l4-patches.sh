#!/bin/bash
export BENCH_LOCK=.bench-3.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G l4-patches-gather-luna $B/l4-patches-gather-brief.md /home/user/scaffold
