#!/bin/bash
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok4.sh; B=/home/user/scaffold/tmp/cursor
bash $G pool-r1-distill-luna $B/pool-r1-distill-brief.md /home/user/fleet/pool
bash $G pool-r1-checker-luna $B/pool-r1-checker-brief.md /home/user/fleet/pool
bash $G markdown-r1-distill-luna $B/markdown-r1-distill-brief.md /home/user/fleet/markdown
bash $G markdown-r1-checker-luna $B/markdown-r1-checker-brief.md /home/user/fleet/markdown
bash $G middleware-r2-distill-luna $B/middleware-r2-distill-brief.md /home/user/fleet/middleware
bash $G middleware-r2-checker-luna $B/middleware-r2-checker-brief.md /home/user/fleet/middleware
