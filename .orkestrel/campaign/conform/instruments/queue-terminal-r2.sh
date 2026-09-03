#!/bin/bash
export BENCH_LOCK=.bench-grok.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G terminal-r2-distill-luna $B/terminal-r2-distill-brief.md /home/user/fleet/terminal
bash $G terminal-r2-checker-luna $B/terminal-r2-checker-brief.md /home/user/fleet/terminal
