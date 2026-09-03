#!/bin/bash
# The L3 reconcile absorption lanes on Luna as a second concurrent bench lane, behind their own lock,
# after Grok 4.6 exhausted mid-lane on mcp at 18:11 UTC. The mcp lane re-runs first.
export BENCH_LOCK=.bench-grok.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G mcp-reconcile-luna $B/mcp-reconcile-brief.md /home/user/fleet/mcp
bash $G qualifier-reconcile-luna $B/qualifier-reconcile-brief.md /home/user/fleet/qualifier
bash $G rater-reconcile-luna $B/rater-reconcile-brief.md /home/user/fleet/rater
bash $G sea-reconcile-luna $B/sea-reconcile-brief.md /home/user/fleet/sea
bash $G server-reconcile-luna $B/server-reconcile-brief.md /home/user/fleet/server
bash $G terminal-reconcile-luna $B/terminal-reconcile-brief.md /home/user/fleet/terminal
bash $G workspace-reconcile-luna $B/workspace-reconcile-brief.md /home/user/fleet/workspace
bash $G lsp-reconcile-luna $B/lsp-reconcile-brief.md /home/user/fleet/lsp
bash $G queue-reconcile-luna $B/queue-reconcile-brief.md /home/user/fleet/queue
bash $G relation-reconcile-luna $B/relation-reconcile-brief.md /home/user/fleet/relation
bash $G scaffold-reconcile-luna $B/scaffold-reconcile-brief.md /home/user/scaffold
