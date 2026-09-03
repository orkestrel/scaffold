#!/bin/bash
# The L3 reconcile absorption lanes on Grok 4.6, one at a time behind the Grok lock, beside the Luna queue.
export BENCH_LOCK=.bench-grok.lock
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G mcp-reconcile-grok $B/mcp-reconcile-brief.md /home/user/fleet/mcp
bash $G qualifier-reconcile-grok $B/qualifier-reconcile-brief.md /home/user/fleet/qualifier
bash $G rater-reconcile-grok $B/rater-reconcile-brief.md /home/user/fleet/rater
bash $G sea-reconcile-grok $B/sea-reconcile-brief.md /home/user/fleet/sea
bash $G server-reconcile-grok $B/server-reconcile-brief.md /home/user/fleet/server
bash $G terminal-reconcile-grok $B/terminal-reconcile-brief.md /home/user/fleet/terminal
bash $G workspace-reconcile-grok $B/workspace-reconcile-brief.md /home/user/fleet/workspace
bash $G lsp-reconcile-grok $B/lsp-reconcile-brief.md /home/user/fleet/lsp
bash $G queue-reconcile-grok $B/queue-reconcile-brief.md /home/user/fleet/queue
bash $G relation-reconcile-grok $B/relation-reconcile-brief.md /home/user/fleet/relation
bash $G scaffold-reconcile-grok $B/scaffold-reconcile-brief.md /home/user/scaffold
