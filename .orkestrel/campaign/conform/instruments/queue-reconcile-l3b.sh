#!/bin/bash
# L3 reconcile absorption lanes on Grok 4.6 (the bench probed live at 17:20 UTC); browser ran on Luna already.
G=/home/user/scaffold/tmp/work/grok4.sh; B=/home/user/scaffold/tmp/cursor
bash $G guide-reconcile-grok $B/guide-reconcile-brief.md /home/user/fleet/guide
bash $G interpret-reconcile-grok $B/interpret-reconcile-brief.md /home/user/fleet/interpret
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
