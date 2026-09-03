#!/bin/bash
# Luna queue after Grok 4.6 answered resource_exhausted again at 17:28 UTC: the checkers that gate landings first, then the L3 reconcile absorption lanes.
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok4.sh; B=/home/user/scaffold/tmp/cursor
bash $G console-r5-checker-luna $B/console-r5-checker-brief.md /home/user/fleet/console
bash $G database-r2-checker-luna $B/database-r2-checker-brief.md /home/user/fleet/database
bash $G process-tests-checker-luna $B/process-tests-audit-brief.md /home/user/fleet/process
bash $G guide-reconcile-luna $B/guide-reconcile-brief.md /home/user/fleet/guide
bash $G interpret-reconcile-luna $B/interpret-reconcile-brief.md /home/user/fleet/interpret
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
bash $G form-prose-checker-luna $B/form-prose-audit-brief.md /home/user/fleet/form
