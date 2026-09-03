#!/bin/bash
# Successor of queue-reconcile-l3-luna2.sh from its workspace lane: lock 2.
export BENCH_LOCK=.bench-grok.lock
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
G=/home/user/scaffold/tmp/work/grok5.sh; B=/home/user/scaffold/tmp/cursor
bash $G workspace-reconcile-luna $B/workspace-reconcile-brief.md /home/user/fleet/workspace
bash $G lsp-reconcile-luna $B/lsp-reconcile-brief.md /home/user/fleet/lsp
