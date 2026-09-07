#!/usr/bin/env bash
# The slice-1 re-repairs (serial, each a test:config run) followed by P23b over template and websocket.
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
bash $SCR/rerepair-s1.sh > $SCR/land/rerepair-s1.out 2>&1
bash $SCR/p23/p23b-parity-controls.sh template websocket table router > $SCR/p23/launcher-k.out 2>&1
echo "== chain done"
