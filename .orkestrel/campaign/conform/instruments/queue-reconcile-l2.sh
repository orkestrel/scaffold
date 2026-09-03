#!/bin/bash
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok4.sh; B=/home/user/scaffold/tmp/cursor
bash $G markdown-reconcile-luna $B/markdown-reconcile-brief.md /home/user/fleet/markdown
bash $G pool-reconcile-luna $B/pool-reconcile-brief.md /home/user/fleet/pool
