#!/bin/bash
export BENCH_LOCK=.bench-4.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G browser-r1-distill-luna $B/browser-r1-distill-brief.md /home/user/fleet/browser
bash $G browser-r1-checker-luna $B/browser-r1-checker-brief.md /home/user/fleet/browser
